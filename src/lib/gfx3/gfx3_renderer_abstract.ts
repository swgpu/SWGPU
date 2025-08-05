import { gfx3Manager } from '../gfx3/gfx3_manager';

/**
 * Abstract class for all 3D renderer.
 */
abstract class Gfx3RendererAbstract {
  pipeline: GPURenderPipeline;
  pipelineId: string;
  data: any;

  /**
   * @param {string} pipelineId - A unique identifier for the render pipeline.
   * @param {Function} vertexShader - The code for the vertex shader.
   * @param {Function} fragmentShader - The code for the fragment shader.
   * @param {GPURenderPipelineDescriptor} pipelineDesc - The configuration of the pipeline, such as the vertex and fragment shaders, the color and depth formats, the primitive topology
   * @param {any} data - The custom data used by the shader template.
   */
  constructor(pipelineId: string, vertexShader: (data: any) => string, fragmentShader: (data: any) => string, pipelineDesc: GPURenderPipelineDescriptor, data: any = {}) {
    this.pipeline = gfx3Manager.loadPipeline(pipelineId, vertexShader(data), fragmentShader(data), pipelineDesc);
    this.pipelineId = pipelineId;
    this.data = data;
  }

  /**
   * Reload the pipeline.
   * 
   * @param {Function} vertexShader - The code for the vertex shader.
   * @param {Function} fragmentShader - The code for the fragment shader.
   * @param {GPURenderPipelineDescriptor} pipelineDesc - The configuration of the pipeline, such as the vertex and fragment shaders, the color and depth formats, the primitive topology
   * @param {any} data - The custom data used by the shader template.
   */
  reload(vertexShader: (options: any) => string, fragmentShader: (options: any) => string, pipelineDesc: GPURenderPipelineDescriptor, data: any = {}): void {
    gfx3Manager.deletePipeline(this.pipelineId);
    this.pipeline = gfx3Manager.loadPipeline(this.pipelineId, vertexShader(data), fragmentShader(data), pipelineDesc);
    this.data = data;
  }
}

export { Gfx3RendererAbstract };