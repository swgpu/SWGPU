/// <reference types="@webgpu/types" />
import { Gfx3View } from './gfx3_view';
import { Gfx3Texture, Gfx3RenderingTexture } from './gfx3_texture';
import { Gfx3StaticGroup, Gfx3DynamicGroup } from './gfx3_group';
export interface VertexSubBuffer {
    vertices: Float32Array;
    offset: number;
    changed: boolean;
}
/**
 * Singleton 3D graphics manager.
 */
declare class Gfx3Manager {
    #private;
    adapter: GPUAdapter;
    device: GPUDevice;
    canvas: HTMLCanvasElement;
    ctx: GPUCanvasContext;
    renderingTextureView: GPUTextureView | null;
    renderingTextureSampler: GPUSampler | null;
    destinationTexture: Gfx3RenderingTexture | null;
    normalsTexture: Gfx3RenderingTexture;
    idsTexture: Gfx3RenderingTexture;
    depthTexture: Gfx3RenderingTexture;
    commandEncoder: GPUCommandEncoder;
    passEncoder: GPURenderPassEncoder;
    pipelines: Map<string, GPURenderPipeline>;
    vertexBuffer: GPUBuffer;
    vertexSubBuffers: Array<VertexSubBuffer>;
    vertexSubBuffersSize: number;
    views: Array<Gfx3View>;
    currentView: Gfx3View;
    lastRenderStart: number;
    lastRenderTime: number;
    constructor();
    /**
     * Initializes the WebGPU rendering context (internal use only).
     */
    initialize(): Promise<void>;
    /**
     * Prepare the draw process.
     * Warning: You need to call this method before your draw calls.
     */
    beginDrawing(): void;
    /**
     * Close the draw process.
     * Warning: You need to call this method after your draw calls.
     */
    endDrawing(): void;
    /**
     * Prepare the render process.
     * Warning: You need to call this method before your render calls.
     */
    beginRender(): void;
    /**
     * Prepare a render pass.
     * Warning: You need to call this method before the render calls you want include in this pass.
     */
    beginPassRender(viewIndex: number): void;
    /**
     * Close a render pass.
     * Warning: You need to call this method after the render calls you want include in this pass.
     */
    endPassRender(): void;
    /**
     * Close the render process.
     * Warning: You need to call this method after your render calls.
     */
    endRender(): void;
    /**
     * Creates and returns a GPU render pipeline using the provided vertex and fragment shaders, and caches it for future use.
     *
     * @param {string} id - A unique identifier for the render pipeline.
     * @param {string} vertexShader - The code for the vertex shader.
     * @param {string} fragmentShader - The code for the fragment shader.
     * @param {GPURenderPipelineDescriptor} pipelineDesc - The configuration of the pipeline, such as the vertex and fragment shaders, the color and depth formats, the primitive topology
     */
    loadPipeline(id: string, vertexShader: string, fragmentShader: string, pipelineDesc: GPURenderPipelineDescriptor): GPURenderPipeline;
    /**
     * Delete a GPU render pipeline.
     *
     * @param {string} id - The identifier of the pipeline.
     */
    deletePipeline(id: string): void;
    /**
     * Returns a GPU render pipeline.
     *
     * @param {string} id - The identifier of the pipeline.
     */
    getPipeline(id: string): GPURenderPipeline;
    /**
     * Creates a vertex sub-buffer and returns it.
     * Note: A sub-buffer is just a reference offset/size pointing to the big one vertex buffer.
     *
     * @param {number} size - The number of vertices.
     */
    createVertexBuffer(size: number): VertexSubBuffer;
    /**
     * Removes a vertex sub-buffer.
     *
     * @param {VertexSubBuffer} sub - The vertex sub-buffer.
     */
    destroyVertexBuffer(sub: VertexSubBuffer): void;
    /**
     * Flush the main vertex buffer.
     */
    flushVertexBuffers(): void;
    /**
     * Write data on vertex sub-buffer.
     *
     * @param {VertexSubBuffer} sub - The vertex sub-buffer.
     * @param vertices - The vertex data.
     */
    writeVertexBuffer(sub: VertexSubBuffer, vertices: Array<number>): void;
    /**
     * Creates a static group for a given pipeline and group index.
     *
     * @param {string} pipelineId - The unique identifier of a pipeline.
     * @param {number} groupIndex - The uniform group index in the shader.
     */
    createStaticGroup(pipelineId: string, groupIndex: number): Gfx3StaticGroup;
    /**
     * Creates a dynamic group for a given pipeline and group index.
     *
     * @param {string} pipelineId - The unique identifier of a pipeline.
     * @param {number} groupIndex - The uniform group index in the shader.
     */
    createDynamicGroup(pipelineId: string, groupIndex: number): Gfx3DynamicGroup;
    /**
     * Creates a default rendering texture.
     */
    createRenderingTexture(format?: GPUTextureFormat, samplerDescriptor?: GPUSamplerDescriptor, width?: number, height?: number): Gfx3RenderingTexture;
    /**
     * Creates an empty GPU texture with the given size.
     *
     * @param {number} width - The texture width.
     * @param {number} height - The texture height.
     * @param {GPUTextureFormat} format - Indicates the texture colors format.
     * @param {GPUSamplerDescriptor} [samplerDescriptor] - The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
     */
    createEmptyTexture(width: number, height: number, format: GPUTextureFormat, samplerDescriptor?: GPUSamplerDescriptor): Gfx3Texture;
    /**
     * Creates a GPU texture from a given bitmap image or canvas element.
     *
     * @param {ImageBitmap | HTMLCanvasElement} [bitmap] - The source image.
     * @param {boolean} [is8bit=false] - Indicates whether the texture should be treated as an 8-bit texture or not.
     * @param {GPUSamplerDescriptor} [samplerDescriptor] - The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
     */
    createTextureFromBitmap(bitmap?: ImageBitmap | HTMLCanvasElement, is8bit?: boolean, samplerDescriptor?: GPUSamplerDescriptor): Gfx3Texture;
    /**
     * Creates a cubemap texture from a list of bitmaps or canvas elements.
     *
     * @param [bitmaps] - The list of six bitmaps.
     */
    createCubeMapFromBitmap(bitmaps?: Array<ImageBitmap | HTMLCanvasElement>): Gfx3Texture;
    /**
     * Sets the css filter property of the canvas.
     *
     * @param {string} filter - The filter parameter is a string that represents the CSS filter property's value.
     * It can be used to apply various visual effects to an element, such as blur, brightness, contrast,
     * grayscale, etc.
     */
    setFilter(filter: string): void;
    /**
     * Checks if the canvas element has an active filter.
     */
    hasFilter(): boolean;
    /**
     * Returns the client width of the canvas.
     */
    getClientWidth(): number;
    /**
     * Returns the client height of the canvas.
     */
    getClientHeight(): number;
    /**
     * Returns the resolution width of the canvas.
     */
    getWidth(): number;
    /**
     * Returns the resolution height of the canvas.
     */
    getHeight(): number;
    /**
     * Returns the GPUCanvasContext object.
     */
    getContext(): GPUCanvasContext;
    /**
     * Returns the GPU device.
     */
    getDevice(): GPUDevice;
    /**
     * The destination texture is used for multi-pass rendering.
     * Note: If destination texture is set, we render to the destination texture and let post-processing effect renderers used it.
     * otherwise we are rendering to the screen directly.
     *
     * @param {Gfx3RenderingTexture | null} destinationTexture - The destination texture.
     */
    setDestinationTexture(destinationTexture: Gfx3RenderingTexture | null): void;
    /**
     * Returns the current rendering texture.
     * Note: Is the texture used for final rendering.
     */
    getCurrentRenderingTexture(): Gfx3RenderingTexture;
    /**
     * Returns the rendering texture contains normals.
     */
    getNormalsTexture(): Gfx3RenderingTexture;
    /**
     * Returns the rendering texture contains ids.
     */
    getIdsTexture(): Gfx3RenderingTexture;
    /**
     * Returns the depth texture.
     */
    getDepthTexture(): Gfx3RenderingTexture;
    /**
     * Returns the GPUCommandEncoder.
     */
    getCommandEncoder(): GPUCommandEncoder;
    /**
     * Returns the current WebGPU render pass encoder.
     */
    getPassEncoder(): GPURenderPassEncoder;
    /**
     * Returns the view at the specified index.
     *
     * @param {number} index - The index.
     */
    getView(index: number): Gfx3View;
    /**
     * Returns the number of views.
     */
    getNumViews(): number;
    /**
     * Create a new view and return it.
     */
    createView(): Gfx3View;
    /**
     * Change the view at a specified index.
     *
     * @param {number} index - The index of the view should be changed.
     * @param {Gfx3View} view - The view.
     */
    changeView(index: number, view: Gfx3View): void;
    /**
     * Removes a view.
     *
     * @param {Gfx3View} view - The view.
     */
    removeView(view: Gfx3View): void;
    /**
     * Removes a view at specified index.
     *
     * @param {number} index - The index of the view.
     */
    removeViewAt(index: number): void;
    /**
     * Returns the current view.
     * Note: Current view is set by the "begin" function.
     */
    getCurrentView(): Gfx3View;
    /**
     * Returns the big one vertex buffer.
     */
    getVertexBuffer(): GPUBuffer;
    /**
     * Returns the last render time.
     */
    getLastRenderTime(): number;
}
declare const gfx3Manager: Gfx3Manager;
export { Gfx3Manager };
export { gfx3Manager };
