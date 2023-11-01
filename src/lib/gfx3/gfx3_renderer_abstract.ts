import { gfx3Manager } from '../gfx3/gfx3_manager';

/**
 * The `Gfx3RendererAbstract` is an abstract class for all gfx3 renderer.
 */
abstract class Gfx3RendererAbstract {
  pipeline: GPURenderPipeline;

  /**
   * The constructor.
   */
  constructor(pipelineName: string, vertexShader: string, fragmentShader: string, pipelineDesc: GPURenderPipelineDescriptor) {
    this.pipeline = gfx3Manager.loadPipeline(pipelineName, vertexShader, fragmentShader, pipelineDesc);
  }
}

export { Gfx3RendererAbstract };