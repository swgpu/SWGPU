import { coreManager } from '../core/core_manager';
import { eventManager } from '../core/event_manager';
import { gfx3Manager } from '../gfx3/gfx3_manager';
import { gfx3ShadowVolumeRenderer } from '../gfx3_shadow_volume/gfx3_shadow_volume_renderer';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC, SHADER_VERTEX_ATTR_COUNT } from './gfx3_ppe_shader';

enum PostParam {
  ENABLED = 0,
  PIXELATION_ENABLED = 1,
  PIXELATION_WIDTH = 2,
  PIXELATION_HEIGHT = 3,
  COLOR_ENABLED = 4,
  COLOR_PRECISION = 5,
  DITHER_ENABLED = 6,
  DITHER_PATTERN_INDEX = 7,
  DITHER_THRESHOLD = 8,
  DITHER_SCALE_X = 9,
  DITHER_SCALE_Y = 10,
  OUTLINE_ENABLED = 11,
  OUTLINE_THICKNESS = 12,
  OUTLINE_R = 13,
  OUTLINE_G = 14,
  OUTLINE_B = 15,
  OUTLINE_CONSTANT = 16,
  SHADOW_VOLUME_ENABLED = 17,
  S00 = 18,
  S01 = 19,
  S02 = 20,
  S03 = 21,
  S10 = 22,
  S11 = 23,
  S12 = 24,
  S13 = 25,
  S20 = 26,
  S21 = 27,
  S22 = 28,
  S23 = 29,
  S30 = 30,
  S31 = 31,
  S32 = 32,
  S33 = 33
};

/**
 * Singleton post-processing effects renderer.
 */
class Gfx3PPERenderer extends Gfx3RendererAbstract {
  device: GPUDevice;
  vertexBuffer: GPUBuffer;
  grp0: Gfx3StaticGroup;
  params: Float32Array;
  infos: Float32Array;
  sourceTexture: Gfx3Texture;
  normalsTexture: Gfx3Texture;
  idsTexture: Gfx3Texture;
  depthTexture: Gfx3Texture;
  grp1: Gfx3StaticGroup;
  shadowFactorTexture: Gfx3Texture;
  shadowDepthCWTexture: Gfx3Texture;
  shadowDepthCCWTexture: Gfx3Texture;

  constructor() {
    super('PPE_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC);
    this.device = gfx3Manager.getDevice();
    this.vertexBuffer = this.device.createBuffer({ size: 6 * SHADER_VERTEX_ATTR_COUNT * 4, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC });

    this.grp0 = gfx3Manager.createStaticGroup('PPE_PIPELINE', 0);
    this.params = this.grp0.setFloat(0, 'PARAMS', 34);
    this.params[PostParam.ENABLED] = 1.0;
    this.params[PostParam.PIXELATION_ENABLED] = 0.0;
    this.params[PostParam.PIXELATION_WIDTH] = 400.0;
    this.params[PostParam.PIXELATION_HEIGHT] = 400.0;
    this.params[PostParam.COLOR_ENABLED] = 0.0;
    this.params[PostParam.COLOR_PRECISION] = 32.0;
    this.params[PostParam.DITHER_ENABLED] = 0.0;
    this.params[PostParam.DITHER_PATTERN_INDEX] = 0.0;
    this.params[PostParam.DITHER_THRESHOLD] = 1.0;
    this.params[PostParam.DITHER_SCALE_X] = 1.0;
    this.params[PostParam.DITHER_SCALE_Y] = 1.0;
    this.params[PostParam.OUTLINE_ENABLED] = 0.0;
    this.params[PostParam.OUTLINE_THICKNESS] = 120.0;
    this.params[PostParam.OUTLINE_R] = 0.0;
    this.params[PostParam.OUTLINE_G] = 0.0;
    this.params[PostParam.OUTLINE_B] = 0.0;
    this.params[PostParam.OUTLINE_CONSTANT] = 0.0;
    this.params[PostParam.SHADOW_VOLUME_ENABLED] = 1.0;
    this.infos = this.grp0.setFloat(1, 'INFOS', 4);
    this.infos[0] = gfx3Manager.getWidth();
    this.infos[1] = gfx3Manager.getHeight();
    this.sourceTexture = this.grp0.setTexture(2, 'SOURCE_TEXTURE', gfx3Manager.createRenderingTexture());
    this.sourceTexture = this.grp0.setSampler(3, 'SOURCE_SAMPLER', this.sourceTexture);
    this.normalsTexture = this.grp0.setTexture(4, 'NORMALS_TEXTURE', gfx3Manager.getNormalsTexture());
    this.normalsTexture = this.grp0.setSampler(5, 'NORMALS_SAMPLER', this.normalsTexture);
    this.idsTexture = this.grp0.setTexture(6, 'IDS_TEXTURE', gfx3Manager.getIdsTexture());
    this.idsTexture = this.grp0.setSampler(7, 'IDS_SAMPLER', this.idsTexture);
    this.depthTexture = this.grp0.setTexture(8, 'DEPTH_TEXTURE', gfx3Manager.getDepthTexture());
    this.depthTexture = this.grp0.setSampler(9, 'DEPTH_SAMPLER', this.depthTexture);
    this.grp0.allocate();

    this.grp1 = gfx3Manager.createStaticGroup('PPE_PIPELINE', 1);
    this.shadowFactorTexture = this.grp1.setTexture(0, 'SHADOW_FACTOR_TEXTURE', gfx3ShadowVolumeRenderer.getFactorTexture());
    this.shadowFactorTexture = this.grp1.setSampler(1, 'SHADOW_FACTOR_SAMPLER', this.shadowFactorTexture);
    this.shadowDepthCCWTexture = this.grp1.setTexture(2, 'SHADOW_DEPTH_CCW_TEXTURE', gfx3ShadowVolumeRenderer.getDepthCCWTexture());
    this.shadowDepthCCWTexture = this.grp1.setSampler(3, 'SHADOW_DEPTH_CCW_SAMPLER', this.shadowDepthCCWTexture);
    this.shadowDepthCWTexture = this.grp1.setTexture(4, 'SHADOW_DEPTH_CW_TEXTURE', gfx3ShadowVolumeRenderer.getDepthCWTexture());
    this.shadowDepthCWTexture = this.grp1.setSampler(5, 'SHADOW_DEPTH_CW_SAMPLER', this.shadowDepthCWTexture);
    this.grp1.allocate();

    this.device.queue.writeBuffer(this.vertexBuffer, 0, new Float32Array([
      -1.0, 1.0, 0.0, 0.0, // first tri -> top left
      1.0, 1.0, 1.0, 0.0, // first tri -> top right
      -1.0, -1.0, 0.0, 1.0, // first tri -> bottom left
      -1.0, -1.0, 0.0, 1.0, // second tri -> bottom left
      1.0, 1.0, 1.0, 0.0, // second tri -> top right
      1.0, -1.0, 1.0, 1.0 // second tri -> bottom right
    ]));

    eventManager.subscribe(coreManager, 'E_RESIZE', this, this.$handleWindowResize);
  }

  /**
   * The render function.
   */
  render(ts: number, destinationTexture: GPUTexture): void {    
    const commandEncoder = gfx3Manager.getCommandEncoder();
    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: destinationTexture.createView(),
        loadOp: 'clear',
        storeOp: 'store'
      }]
    });

    this.infos[2] = ts / 1000;
    this.infos[3] += this.infos[2];

    passEncoder.setPipeline(this.pipeline);
    this.grp0.beginWrite();
    this.grp0.write(0, this.params);
    this.grp0.write(1, this.infos);
    this.grp0.endWrite();
    passEncoder.setBindGroup(0, this.grp0.getBindGroup());
    passEncoder.setBindGroup(1, this.grp1.getBindGroup());
    passEncoder.setVertexBuffer(0, this.vertexBuffer);
    passEncoder.draw(6);
    passEncoder.end();
  }

  /**
   * Set a parameter value.
   * 
   * @param {number} index - The param index.
   * @param {number} value - The value.
   */
  setParam(index: number, value: number): void {
    this.params[index] = value;
  }

  /**
   * Returns the specified param value.
   */
  getParam(index: number): number {
    return this.params[index];
  }

  /**
   * Returns the source texture.
   * Note: This instance is responsible to create the source texture used to rendering the previous pass.
   * This way, it is easy to chain multiple effects.
   */
  getSourceTexture(): GPUTexture {
    return this.sourceTexture.gpuTexture;
  }

  $handleWindowResize(): void {
    this.infos[0] = gfx3Manager.getWidth();
    this.infos[1] = gfx3Manager.getHeight();

    this.sourceTexture.gpuTexture.destroy();
    this.sourceTexture = this.grp0.setTexture(2, 'SOURCE_TEXTURE', gfx3Manager.createRenderingTexture());
    this.normalsTexture = this.grp0.setTexture(4, 'NORMALS_TEXTURE', gfx3Manager.getNormalsTexture());
    this.idsTexture = this.grp0.setTexture(6, 'IDS_TEXTURE', gfx3Manager.getIdsTexture());
    this.depthTexture = this.grp0.setTexture(8, 'DEPTH_TEXTURE', gfx3Manager.getDepthTexture());
    this.grp0.allocate();

    this.shadowFactorTexture = this.grp1.setTexture(0, 'SHADOW_FACTOR_TEXTURE', gfx3ShadowVolumeRenderer.getFactorTexture());
    this.shadowDepthCCWTexture = this.grp1.setTexture(2, 'SHADOW_DEPTH_CCW_TEXTURE', gfx3ShadowVolumeRenderer.getDepthCCWTexture());
    this.shadowDepthCWTexture = this.grp1.setTexture(4, 'SHADOW_DEPTH_CW_TEXTURE', gfx3ShadowVolumeRenderer.getDepthCWTexture());
    this.grp1.allocate();
  }
}

export { Gfx3PPERenderer, PostParam };
export const gfx3PPERenderer = new Gfx3PPERenderer();