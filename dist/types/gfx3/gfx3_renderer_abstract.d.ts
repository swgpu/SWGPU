/// <reference types="@webgpu/types" />
/**
 * Abstract class for all 3D renderer.
 */
declare abstract class Gfx3RendererAbstract {
    pipeline: GPURenderPipeline;
    /**
     * @param {string} pipelineId - A unique identifier for the render pipeline.
     * @param {string} vertexShader - The code for the vertex shader.
     * @param {string} fragmentShader - The code for the fragment shader.
     * @param {GPURenderPipelineDescriptor} pipelineDesc - The configuration of the pipeline, such as the vertex and fragment shaders, the color and depth formats, the primitive topology
     */
    constructor(pipelineId: string, vertexShader: string, fragmentShader: string, pipelineDesc: GPURenderPipelineDescriptor);
}
export { Gfx3RendererAbstract };
