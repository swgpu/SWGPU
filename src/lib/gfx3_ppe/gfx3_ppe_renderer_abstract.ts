import { coreManager } from '../core/core_manager';
import { eventManager } from '../core/event_manager';
import { gfx3Manager } from '../gfx3/gfx3_manager';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Texture } from '../gfx3/gfx3_texture';

export const SHADER_VERTEX_ATTR_COUNT = 4;

export const PIPELINE_DESC: any = {
  label: 'PPE pipeline',
  layout: 'auto',
  vertex: {
    entryPoint: 'main',
    buffers: [{
      arrayStride: SHADER_VERTEX_ATTR_COUNT * 4,
      attributes: [{
        shaderLocation: 0, /*position*/
        offset: 0,
        format: 'float32x2'
      }, {
        shaderLocation: 1, /*uv*/
        offset: 2 * 4,
        format: 'float32x2'
      }]
    }]
  },
  fragment: {
    entryPoint: 'main',
    targets: [{
      format: navigator.gpu.getPreferredCanvasFormat()
    }]
  },
  primitive: {
    topology: 'triangle-list'
  }
};

/**
 * An abstract post-processing effects renderer.
 */
class Gfx3PPERendererAbstract extends Gfx3RendererAbstract {
  device: GPUDevice;
  vertexBuffer: GPUBuffer;
  grp0: Gfx3StaticGroup;
  params: Float32Array;
  sourceTexture: Gfx3Texture;

  /**
   * @param {string} pipelineId - A unique identifier for the render pipeline.
   * @param {string} vertexShader - The code for the vertex shader.
   * @param {string} fragmentShader - The code for the fragment shader.
   * @param {Float32Array} params - The params uniform.
   */
  constructor(pipelineId: string, vertexShader: string, fragmentShader: string, params: Float32Array) {
    super(pipelineId, vertexShader, fragmentShader, PIPELINE_DESC);
    this.device = gfx3Manager.getDevice();
    this.vertexBuffer = this.device.createBuffer({ size: 6 * SHADER_VERTEX_ATTR_COUNT * 4, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC });

    this.grp0 = gfx3Manager.createStaticGroup('PPE_PIPELINE', 0);
    this.params = this.grp0.setFloat(0, 'PARAMS', params.length);
    this.params = params.slice();
    this.sourceTexture = this.grp0.setTexture(1, 'SOURCE_TEXTURE', gfx3Manager.createRenderingTexture());
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
    this.grp0.endWrite();
    passEncoder.setBindGroup(0, this.grp0.getBindGroup());
    passEncoder.setVertexBuffer(0, this.vertexBuffer);
    passEncoder.draw(6);
    passEncoder.end();
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
    this.params[1] = gfx3Manager.getWidth();
    this.params[2] = gfx3Manager.getHeight();
    this.sourceTexture.gpuTexture.destroy();
    this.sourceTexture = this.grp0.setTexture(1, 'SOURCE_TEXTURE', gfx3Manager.createRenderingTexture());
    this.grp0.allocate();
  }
}

export { Gfx3PPERendererAbstract };