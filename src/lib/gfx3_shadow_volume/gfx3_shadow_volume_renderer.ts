import { coreManager } from '../core/core_manager';
import { eventManager } from '../core/event_manager';
import { gfx3Manager } from '../gfx3/gfx3_manager';
import { UT } from '../core/utils';
import { Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_CW_DESC, PIPELINE_CCW_DESC } from './gfx3_shadow_volume_shader';
import { Gfx3ShadowVolume } from './gfx3_shadow_volume';

interface Pipeline {
  gpu: GPURenderPipeline;
  grp0: Gfx3DynamicGroup;
  shadowTexture: Gfx3Texture;
  depthTexture: Gfx3Texture;
};

/*
 * Singleton shadow volume renderer.
 */
class Gfx3ShadowVolumeRenderer {
  pipelineCW: Pipeline;
  pipelineCCW: Pipeline;
  shadowVolumes: Array<Gfx3ShadowVolume>;
  mvpcMatrix: Float32Array;

  constructor() {
    this.pipelineCW = {
      gpu: gfx3Manager.loadPipeline('SHADOW_VOLUME_CW_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_CW_DESC),
      grp0: gfx3Manager.createDynamicGroup('SHADOW_VOLUME_CW_PIPELINE', 0),
      shadowTexture: gfx3Manager.createRenderingTexture('rgba16float'),
      depthTexture: gfx3Manager.createRenderingTexture('depth24plus')
    };

    this.pipelineCCW = {
      gpu: gfx3Manager.loadPipeline('SHADOW_VOLUME_CCW_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_CCW_DESC),
      grp0: gfx3Manager.createDynamicGroup('SHADOW_VOLUME_CCW_PIPELINE', 0),
      shadowTexture: gfx3Manager.createRenderingTexture('rgba16float'),
      depthTexture: gfx3Manager.createRenderingTexture('depth24plus')
    };

    this.shadowVolumes = [];
    this.mvpcMatrix = this.pipelineCW.grp0.setFloat(0, 'MVPC_MATRIX', 16);
    this.mvpcMatrix = this.pipelineCCW.grp0.setFloat(0, 'MVPC_MATRIX', 16);

    this.pipelineCW.grp0.allocate();
    this.pipelineCCW.grp0.allocate();

    eventManager.subscribe(coreManager, 'E_RESIZE', this, this.#handleWindowResize);
  }

  /**
   * The render function.
   */
  render(): void {
    this.#renderPipeline(this.pipelineCW);
    this.#renderPipeline(this.pipelineCCW);
    this.shadowVolumes = [];
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
   * Returns the shadow texture.
   */
  getShadowTexture(): Gfx3Texture {
    return this.pipelineCCW.shadowTexture;
  }

  /**
   * Returns the depth texture for cw faces.
   */
  getDepthCWTexture(): Gfx3Texture {
    return this.pipelineCW.depthTexture;
  }

  /**
   * Returns the depth texture for ccw faces.
   */
  getDepthCCWTexture(): Gfx3Texture {
    return this.pipelineCCW.depthTexture;
  }

  #renderPipeline(pipeline: Pipeline): void {
    const currentView = gfx3Manager.getCurrentView();
    const commandEncoder = gfx3Manager.getCommandEncoder();
    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: pipeline.shadowTexture.gpuTexture.createView(),
        clearValue: { r: 1.0, g: 1.0, b: 1.0, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store'
      }],
      depthStencilAttachment: {
        view: pipeline.depthTexture.gpuTexture.createView(),
        depthClearValue: 1.0,
        depthLoadOp: 'clear',
        depthStoreOp: 'store',
      },
    });

    const vpcMatrix = currentView.getViewProjectionClipMatrix();
    passEncoder.setPipeline(pipeline.gpu);

    if (pipeline.grp0.getSize() < this.shadowVolumes.length) {
      pipeline.grp0.allocate(this.shadowVolumes.length);
    }

    pipeline.grp0.beginWrite();

    for (let i = 0; i < this.shadowVolumes.length; i++) {
      const sv = this.shadowVolumes[i];
      UT.MAT4_MULTIPLY(vpcMatrix, sv.getTransformMatrix(), this.mvpcMatrix);
      pipeline.grp0.write(0, this.mvpcMatrix);
      passEncoder.setBindGroup(0, pipeline.grp0.getBindGroup(i));
      passEncoder.setVertexBuffer(0, gfx3Manager.getVertexBuffer(), sv.getVertexSubBufferOffset(), sv.getVertexSubBufferSize());
      passEncoder.draw(sv.getVertexCount());
    }

    pipeline.grp0.endWrite();
    passEncoder.end();
  }

  #handleWindowResize(): void {
    this.pipelineCCW.shadowTexture.gpuTexture.destroy();
    this.pipelineCCW.shadowTexture = gfx3Manager.createRenderingTexture('rgba16float');
    this.pipelineCCW.depthTexture.gpuTexture.destroy();
    this.pipelineCCW.depthTexture = gfx3Manager.createRenderingTexture('depth24plus');

    this.pipelineCW.shadowTexture.gpuTexture.destroy();
    this.pipelineCW.shadowTexture = gfx3Manager.createRenderingTexture('rgba16float');
    this.pipelineCW.depthTexture.gpuTexture.destroy();
    this.pipelineCW.depthTexture = gfx3Manager.createRenderingTexture('depth24plus');
  }
}

export { Gfx3ShadowVolumeRenderer };
export const gfx3ShadowVolumeRenderer = new Gfx3ShadowVolumeRenderer();