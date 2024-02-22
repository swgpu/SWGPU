import { gfx3Manager } from '../gfx3/gfx3_manager';
import { UT } from '../core/utils';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Skybox } from './gfx3_skybox';
import { PIPELINE_DESC, VERTEX_SHADER, FRAGMENT_SHADER } from './gfx3_skybox_shader';

/**
 * Singleton skybox renderer.
 */
class Gfx3SkyboxRenderer extends Gfx3RendererAbstract {
  skybox: Gfx3Skybox | null;
  grp0: Gfx3StaticGroup;
  vpcInverseMatrix: Float32Array;  

  constructor() {
    super('SKYBOX_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC);
    this.skybox = null;
    this.grp0 = gfx3Manager.createStaticGroup('SKYBOX_PIPELINE', 0);
    this.vpcInverseMatrix = this.grp0.setFloat(0, 'VPC_INVERSE_MATRIX', 16);   
    this.grp0.allocate();
  }

  /**
   * The render function.
   */
  render(): void {
    if (!this.skybox) {
      return;
    }

    const currentView = gfx3Manager.getCurrentView();
    const passEncoder = gfx3Manager.getPassEncoder();
    passEncoder.setPipeline(this.pipeline);

    const viewMatrix = new Float32Array(currentView.getCameraViewMatrix());
    viewMatrix[12] = viewMatrix[13] = viewMatrix[14] = 0;
    const vpcMatrix = UT.MAT4_MULTIPLY(currentView.getProjectionClipMatrix(), viewMatrix);

    this.grp0.beginWrite();
    this.grp0.write(0, UT.MAT4_INVERT(vpcMatrix, this.vpcInverseMatrix) as Float32Array);
    this.grp0.endWrite();
    passEncoder.setBindGroup(0, this.grp0.getBindGroup());

    const grp1 = this.skybox.getGroup01();
    passEncoder.setBindGroup(1, grp1.getBindGroup());

    passEncoder.setVertexBuffer(0, gfx3Manager.getVertexBuffer(), this.skybox.getVertexSubBufferOffset(), this.skybox.getVertexSubBufferSize());
    passEncoder.draw(this.skybox.getVertexCount());
  }

  /**
   * Draw a skybox.
   * 
   * @param {Gfx3Skybox} skybox - The skybox.
   */
  draw(skybox: Gfx3Skybox): void {
    this.skybox = skybox;
  }
}

export { Gfx3SkyboxRenderer };
export const gfx3SkyboxRenderer = new Gfx3SkyboxRenderer();