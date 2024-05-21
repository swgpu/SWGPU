import { gfx3Manager } from '../gfx3/gfx3_manager';
import { UT } from '../core/utils';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC } from './gfx3_shadow_volume_shader';
import { Gfx3ShadowVolume } from './gfx3_shadow_volume';

/*
 * Singleton shadow volume renderer.
 */
class Gfx3ShadowVolumeRenderer extends Gfx3RendererAbstract {
  destinationTexture: Gfx3Texture;
  depthTexture: Gfx3Texture;
  shadowVolumes: Array<Gfx3ShadowVolume>;
  grp0: Gfx3DynamicGroup;
  mvpcMatrix: Float32Array;

  constructor() {
    super('SHADOW_VOLUME_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC);
    this.destinationTexture = gfx3Manager.createRenderingTexture('rgba16float');
    this.depthTexture = gfx3Manager.createRenderingTexture('depth24plus');
    this.shadowVolumes = [];

    this.grp0 = gfx3Manager.createDynamicGroup('SHADOW_VOLUME_PIPELINE', 0);
    this.mvpcMatrix = this.grp0.setFloat(0, 'MVPC_MATRIX', 16);
  }

  /**
   * The render function.
   */
  render(): void {
    const currentView = gfx3Manager.getCurrentView();
    const commandEncoder = gfx3Manager.getCommandEncoder();
    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: this.destinationTexture.gpuTexture.createView(),
        clearValue: { r: 1.0, g: 1.0, b: 1.0, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store'
      }],
      depthStencilAttachment: {
        view: this.depthTexture.gpuTexture.createView(),
        depthClearValue: 1.0,
        depthLoadOp: 'clear',
        depthStoreOp: 'store',
      },
    });

    const vpcMatrix = currentView.getViewProjectionClipMatrix();
    passEncoder.setPipeline(this.pipeline);

    if (this.grp0.getSize() < this.shadowVolumes.length) {
      this.grp0.allocate(this.shadowVolumes.length);
    }

    this.grp0.beginWrite();

    for (let i = 0; i < this.shadowVolumes.length; i++) {
      const sv = this.shadowVolumes[i];
      UT.MAT4_MULTIPLY(vpcMatrix, sv.getTransformMatrix(), this.mvpcMatrix);
      this.grp0.write(0, this.mvpcMatrix);
      passEncoder.setBindGroup(0, this.grp0.getBindGroup(i));
      passEncoder.setVertexBuffer(0, gfx3Manager.getVertexBuffer(), sv.getVertexSubBufferOffset(), sv.getVertexSubBufferSize());
      passEncoder.draw(sv.getVertexCount());
    }

    this.grp0.endWrite();

    this.shadowVolumes = [];
    passEncoder.end();
  }

  /**
   * Draw a shadow volume.
   * 
   * @param {Gfx3ShadowVolume} sv - The shadow volume.
   */
  drawShadowVolume(sv: Gfx3ShadowVolume): void {
    this.shadowVolumes.push(sv);
  }

  /**
   * Returns the destination texture.
   */
  getDestinationTexture(): Gfx3Texture {
    return this.destinationTexture;
  }

  /**
   * Returns the depth texture.
   */
  getDepthTexture(): Gfx3Texture {
    return this.depthTexture;
  }
}

export { Gfx3ShadowVolumeRenderer };
export const gfx3ShadowVolumeRenderer = new Gfx3ShadowVolumeRenderer();