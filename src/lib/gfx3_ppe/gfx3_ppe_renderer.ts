import { coreManager } from '../core/core_manager';
import { eventManager } from '../core/event_manager';
import { gfx3Manager } from '../gfx3/gfx3_manager';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC, SHADER_VERTEX_ATTR_COUNT } from './gfx3_ppe_shader';

enum PPEParam {
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
  OUTLINE_B = 15
};

/**
 * Singleton post-processing effects renderer.
 */
class Gfx3PPERenderer extends Gfx3RendererAbstract {
  device: GPUDevice;
  vertexBuffer: GPUBuffer;
  grp0: Gfx3StaticGroup;
  params: Float32Array;
  size: Float32Array;
  sourceTexture: Gfx3Texture;
  normalsTexture: Gfx3Texture;
  idsTexture: Gfx3Texture;
  depthTexture: Gfx3Texture;

  constructor() {
    super('PPE_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC);
    this.device = gfx3Manager.getDevice();
    this.vertexBuffer = this.device.createBuffer({ size: 6 * SHADER_VERTEX_ATTR_COUNT * 4, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC });

    this.grp0 = gfx3Manager.createStaticGroup('PPE_PIPELINE', 0);
    this.params = this.grp0.setFloat(0, 'PARAMS', 16);
    this.params[PPEParam.ENABLED] = 1.0;
    this.params[PPEParam.PIXELATION_ENABLED] = 0.0;
    this.params[PPEParam.PIXELATION_WIDTH] = 400.0;
    this.params[PPEParam.PIXELATION_HEIGHT] = 400.0;
    this.params[PPEParam.COLOR_ENABLED] = 0.0;
    this.params[PPEParam.COLOR_PRECISION] = 32.0;
    this.params[PPEParam.DITHER_ENABLED] = 0.0;
    this.params[PPEParam.DITHER_PATTERN_INDEX] = 0.0;
    this.params[PPEParam.DITHER_THRESHOLD] = 1.0;
    this.params[PPEParam.DITHER_SCALE_X] = 1.0;
    this.params[PPEParam.DITHER_SCALE_Y] = 1.0;
    this.params[PPEParam.OUTLINE_ENABLED] = 0.0;
    this.params[PPEParam.OUTLINE_THICKNESS] = 120.0;
    this.params[PPEParam.OUTLINE_R] = 0.0;
    this.params[PPEParam.OUTLINE_G] = 0.0;
    this.params[PPEParam.OUTLINE_B] = 0.0;
    this.size = this.grp0.setFloat(1, 'SIZE', 2);
    this.size[0] = gfx3Manager.getWidth();
    this.size[1] = gfx3Manager.getHeight();
    this.sourceTexture = this.grp0.setTexture(2, 'SOURCE_TEXTURE', gfx3Manager.createRenderingTexture());
    this.sourceTexture = this.grp0.setSampler(3, 'SOURCE_SAMPLER', this.sourceTexture);
    this.normalsTexture = this.grp0.setTexture(4, 'NORMALS_TEXTURE', gfx3Manager.getNormalsTexture());
    this.normalsTexture = this.grp0.setSampler(5, 'NORMALS_SAMPLER', this.normalsTexture);
    this.idsTexture = this.grp0.setTexture(6, 'IDS_TEXTURE', gfx3Manager.getIdsTexture());
    this.idsTexture = this.grp0.setSampler(7, 'IDS_SAMPLER', this.idsTexture);
    this.depthTexture = this.grp0.setTexture(8, 'DEPTH_TEXTURE', gfx3Manager.getDepthTexture());
    this.depthTexture = this.grp0.setSampler(9, 'DEPTH_SAMPLER', this.depthTexture);

    this.grp0.allocate();

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
  render(destinationTexture: GPUTexture): void {
    const commandEncoder = gfx3Manager.getCommandEncoder();
    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: destinationTexture.createView(),
        loadOp: 'clear',
        storeOp: 'store'
      }]
    });

    passEncoder.setPipeline(this.pipeline);
    this.grp0.beginWrite();
    this.grp0.write(0, this.params);
    this.grp0.write(1, this.size);
    this.grp0.endWrite();
    passEncoder.setBindGroup(0, this.grp0.getBindGroup());
    passEncoder.setVertexBuffer(0, this.vertexBuffer);
    passEncoder.draw(6);
    passEncoder.end();
  }

  /**
   * Load a new ppe pipeline, pretty cool when you want your own post-process effects.
   * Note: Please, be careful to include these uniforms in your fragment shader, they are required:
   * 
   * struct Params {
   * // the place for your params
   * };
   * 
   * @group(0) @binding(0) var<uniform> PARAMS: Params;
   * @group(0) @binding(1) var<uniform> SIZE: vec2<f32>;
   * @group(0) @binding(2) var SOURCE_TEXTURE: texture_2d<f32>;
   * @group(0) @binding(3) var SOURCE_SAMPLER: sampler;
   * @group(0) @binding(4) var NORMALS_TEXTURE: texture_2d<f32>;
   * @group(0) @binding(5) var NORMALS_SAMPLER: sampler;
   * @group(0) @binding(6) var IDS_TEXTURE: texture_2d<f32>;
   * @group(0) @binding(7) var IDS_SAMPLER: sampler;
   * @group(0) @binding(8) var DEPTH_TEXTURE: texture_2d<f32>;
   * @group(0) @binding(9) var DEPTH_SAMPLER: sampler;
   * 
   * @param {string} fragmentShader - The fragment shader code.
   * @param {Array<number>} params - The params values.
   */
  loadPipeline(fragmentShader: string, params: Array<number>) {
    gfx3Manager.deletePipeline('PPE_PIPELINE');
    this.pipeline = gfx3Manager.loadPipeline('PPE_PIPELINE', VERTEX_SHADER, fragmentShader, PIPELINE_DESC);

    this.grp0 = gfx3Manager.createStaticGroup('PPE_PIPELINE', 0);
    this.params = this.grp0.setFloat(0, 'PARAMS', params.length);

    for (let i = 0; i < params.length; i++) {
      this.params[i] = params[i];
    }

    this.size = this.grp0.setFloat(1, 'SIZE', 2);
    this.size[0] = gfx3Manager.getWidth();
    this.size[1] = gfx3Manager.getHeight();

    this.sourceTexture = this.grp0.setTexture(2, 'SOURCE_TEXTURE', gfx3Manager.createRenderingTexture());
    this.sourceTexture = this.grp0.setSampler(3, 'SOURCE_SAMPLER', this.sourceTexture);
    this.normalsTexture = this.grp0.setTexture(4, 'NORMALS_TEXTURE', gfx3Manager.getNormalsTexture());
    this.normalsTexture = this.grp0.setSampler(5, 'NORMALS_SAMPLER', this.normalsTexture);
    this.idsTexture = this.grp0.setTexture(6, 'IDS_TEXTURE', gfx3Manager.getIdsTexture());
    this.idsTexture = this.grp0.setSampler(7, 'IDS_SAMPLER', this.idsTexture);
    this.depthTexture = this.grp0.setTexture(8, 'DEPTH_TEXTURE', gfx3Manager.getDepthTexture());
    this.depthTexture = this.grp0.setSampler(9, 'DEPTH_SAMPLER', this.depthTexture);

    this.grp0.allocate();
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
    this.size[0] = gfx3Manager.getWidth();
    this.size[1] = gfx3Manager.getHeight();

    this.sourceTexture.gpuTexture.destroy();
    this.sourceTexture = this.grp0.setTexture(2, 'SOURCE_TEXTURE', gfx3Manager.createRenderingTexture());
    this.normalsTexture = this.grp0.setTexture(4, 'NORMALS_TEXTURE', gfx3Manager.getNormalsTexture());
    this.idsTexture = this.grp0.setTexture(6, 'IDS_TEXTURE', gfx3Manager.getIdsTexture());
    this.depthTexture = this.grp0.setTexture(8, 'DEPTH_TEXTURE', gfx3Manager.getDepthTexture());
    this.grp0.allocate();
  }
}

export { Gfx3PPERenderer, PPEParam };
export const gfx3PPERenderer = new Gfx3PPERenderer();