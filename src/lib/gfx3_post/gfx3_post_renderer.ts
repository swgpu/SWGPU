import { coreManager } from '../core/core_manager';
import { eventManager } from '../core/event_manager';
import { gfx3Manager } from '../gfx3/gfx3_manager';
import { gfx3ShadowVolumeRenderer } from '../gfx3_shadow_volume/gfx3_shadow_volume_renderer';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC, SHADER_VERTEX_ATTR_COUNT } from './gfx3_post_shader';

enum PostShadowVolumeBlendMode {
  MUL = 0,
  ADD = 1
};

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
  SHADOW_VOLUME_BLEND_MODE = 18
};

/**
 * Singleton post-processing effects renderer.
 */
class Gfx3PostRenderer extends Gfx3RendererAbstract {
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
  shadowVolFactorTexture: Gfx3Texture;
  shadowVolDepthCWTexture: Gfx3Texture;
  shadowVolDepthCCWTexture: Gfx3Texture;
  grp2: Gfx3StaticGroup;
  s0Texture: Gfx3Texture;
  s1Texture: Gfx3Texture;

  constructor() {
    super('POST_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC);
    this.device = gfx3Manager.getDevice();
    this.vertexBuffer = this.device.createBuffer({ size: 6 * SHADER_VERTEX_ATTR_COUNT * 4, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC });

    this.grp0 = gfx3Manager.createStaticGroup('POST_PIPELINE', 0);
    this.params = this.grp0.setFloat(0, 'PARAMS', 35);
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
    this.params[PostParam.SHADOW_VOLUME_BLEND_MODE] = PostShadowVolumeBlendMode.MUL;
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

    this.grp1 = gfx3Manager.createStaticGroup('POST_PIPELINE', 1);
    this.shadowVolFactorTexture = this.grp1.setTexture(0, 'SHADOW_VOL_TEXTURE', gfx3ShadowVolumeRenderer.getShadowTexture());
    this.shadowVolFactorTexture = this.grp1.setSampler(1, 'SHADOW_VOL_SAMPLER', this.shadowVolFactorTexture);
    this.shadowVolDepthCCWTexture = this.grp1.setTexture(2, 'SHADOW_VOL_DEPTH_CCW_TEXTURE', gfx3ShadowVolumeRenderer.getDepthCCWTexture());
    this.shadowVolDepthCCWTexture = this.grp1.setSampler(3, 'SHADOW_VOL_DEPTH_CCW_SAMPLER', this.shadowVolDepthCCWTexture);
    this.shadowVolDepthCWTexture = this.grp1.setTexture(4, 'SHADOW_VOL_DEPTH_CW_TEXTURE', gfx3ShadowVolumeRenderer.getDepthCWTexture());
    this.shadowVolDepthCWTexture = this.grp1.setSampler(5, 'SHADOW_VOL_DEPTH_CW_SAMPLER', this.shadowVolDepthCWTexture);
    this.grp1.allocate();

    this.grp2 = gfx3Manager.createStaticGroup('POST_PIPELINE', 2);
    this.s0Texture = this.grp2.setTexture(0, 'S0_TEXTURE', gfx3Manager.createTextureFromBitmap());
    this.s0Texture = this.grp2.setSampler(1, 'S0_SAMPLER', this.s0Texture);
    this.s1Texture = this.grp2.setTexture(2, 'S1_TEXTURE', gfx3Manager.createTextureFromBitmap());
    this.s1Texture = this.grp2.setSampler(3, 'S1_SAMPLER', this.s1Texture);
    this.grp2.allocate();

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
    passEncoder.setBindGroup(2, this.grp2.getBindGroup());
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
   * Set a custom parameter value.
   * 
   * @param {number} index - The param index.
   * @param {number} value - The value.
   */
  setCustomParam(index: number, value: number): void {
    this.params[19 + index] = value;
  }

  /**
   * Returns the specified custom param value.
   */
  getCustomParam(index: number): number {
    return this.params[19 + index];
  }

  /**
   * Set custom textures.
   * 
   * @param {any} textures - The textures list.
   */
  setCustomTextures(textures: {0?: Gfx3Texture, 1?: Gfx3Texture }): void {
    if (textures[0]) {
      this.s0Texture = this.grp2.setTexture(0, 'S0_TEXTURE', textures[0]);
    }

    if (textures[1]) {
      this.s1Texture = this.grp2.setTexture(2, 'S1_TEXTURE', textures[1]);
    }

    this.grp2.allocate();
  }

  /**
   * Returns the source texture.
   * Note: This instance is responsible to create the source texture used to rendering the previous pass.
   * This way, it is easy to chain multiple effects.
   */
  getSourceTexture(): GPUTexture {
    return this.sourceTexture.gpuTexture;
  }

  /**
   * Set the source texture.
   * 
   * @param {Gfx3Texture} sourceTexture - The source texture.
   */
  setSourceTexture(sourceTexture: Gfx3Texture): void {
    this.sourceTexture.gpuTexture.destroy();
    this.sourceTexture = this.grp0.setTexture(2, 'SOURCE_TEXTURE', sourceTexture);
    this.sourceTexture = this.grp0.setSampler(3, 'SOURCE_SAMPLER', this.sourceTexture);
    this.grp0.allocate();
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

    this.shadowVolFactorTexture = this.grp1.setTexture(0, 'SHADOW_VOL_TEXTURE', gfx3ShadowVolumeRenderer.getShadowTexture());
    this.shadowVolDepthCCWTexture = this.grp1.setTexture(2, 'SHADOW_VOL_DEPTH_CCW_TEXTURE', gfx3ShadowVolumeRenderer.getDepthCCWTexture());
    this.shadowVolDepthCWTexture = this.grp1.setTexture(4, 'SHADOW_VOL_DEPTH_CW_TEXTURE', gfx3ShadowVolumeRenderer.getDepthCWTexture());
    this.grp1.allocate();
  }
}

export { Gfx3PostRenderer, PostParam, PostShadowVolumeBlendMode };
export const gfx3PostRenderer = new Gfx3PostRenderer();