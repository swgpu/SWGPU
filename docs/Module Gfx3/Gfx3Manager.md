# Gfx3Manager

Singleton 3D graphics manager.
## Constructors
- **new Gfx3Manager**(): Gfx3Manager   
## Methods
- **$handleWindowResize**(): void   
Resizes the canvas, recreates the depth texture and view, and updates the screen size for each view.

- **beginDrawing**(): void   
Prepare the draw process.
Warning: You need to call this method before your draw calls.

- **beginPassRender**(viewIndex: number): void   
Prepare a render pass.
Warning: You need to call this method before the render calls you want include in this pass.
   - **viewIndex**

- **beginRender**(): void   
Prepare the render process.
Warning: You need to call this method before your render calls.

- **changeView**(index: number, view: Gfx3View): void   
Change the view at a specified index.
   - **index**: The index of the view should be changed.
   - **view**: The view.

- **createCubeMapFromBitmap**(bitmaps): Gfx3Texture   
Creates a cubemap texture from a list of bitmaps or canvas elements.
   - **bitmaps**: The list of six bitmaps.

- **createDynamicGroup**(pipelineId: string, groupIndex: number): Gfx3DynamicGroup   
Creates a dynamic group for a given pipeline and group index.
   - **pipelineId**: The unique identifier of a pipeline.
   - **groupIndex**: The uniform group index in the shader.

- **createEmptyTexture**(width: number, height: number, format: GPUTextureFormat, samplerDescriptor: GPUSamplerDescriptor): Gfx3Texture   
Creates an empty GPU texture with the given size.
   - **width**: The texture width.
   - **height**: The texture height.
   - **format**
   - **samplerDescriptor**: The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.

- **createRenderingTexture**(format: GPUTextureFormat): Gfx3Texture   
Creates a default rendering texture.
   - **format**

- **createStaticGroup**(pipelineId: string, groupIndex: number): Gfx3StaticGroup   
Creates a static group for a given pipeline and group index.
   - **pipelineId**: The unique identifier of a pipeline.
   - **groupIndex**: The uniform group index in the shader.

- **createTextureFromBitmap**(bitmap, is8bit: boolean, samplerDescriptor: GPUSamplerDescriptor): Gfx3Texture   
Creates a GPU texture from a given bitmap image or canvas element.
   - **bitmap**: The source image.
   - **is8bit**: Indicates whether the texture should be treated as an 8-bit texture or not.
   - **samplerDescriptor**: The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.

- **createVertexBuffer**(size: number): VertexSubBuffer   
Creates a vertex sub-buffer and returns it.
Note: A sub-buffer is just a reference offset/size pointing to the big one vertex buffer.
   - **size**: The number of vertices.

- **createView**(): Gfx3View   
Create a new view and return it.

- **deletePipeline**(id: string): void   
Delete a GPU render pipeline.
   - **id**: The identifier of the pipeline.

- **destroyVertexBuffer**(sub: VertexSubBuffer): void   
Removes a vertex sub-buffer.
   - **sub**: The vertex sub-buffer.

- **endDrawing**(): void   
Close the draw process.
Warning: You need to call this method after your draw calls.

- **endPassRender**(): void   
Close a render pass.
Warning: You need to call this method after the render calls you want include in this pass.

- **endRender**(): void   
Close the render process.
Warning: You need to call this method after your render calls.

- **getClientHeight**(): number   
Returns the client height of the canvas.

- **getClientWidth**(): number   
Returns the client width of the canvas.

- **getCommandEncoder**(): GPUCommandEncoder   
Returns the GPUCommandEncoder.

- **getContext**(): GPUCanvasContext   
Returns the GPUCanvasContext object.

- **getCurrentRenderingTexture**(): GPUTexture   
Returns the current rendering texture.
Note: Is the texture used for final rendering.

- **getCurrentView**(): Gfx3View   
Returns the current view.
Note: Current view is set by the "begin" function.

- **getDepthTexture**(): Gfx3Texture   
Returns the depth texture.

- **getDevice**(): GPUDevice   
Returns the GPU device.

- **getHeight**(): number   
Returns the resolution height of the canvas.

- **getIdsTexture**(): Gfx3Texture   
Returns the rendering texture contains ids.

- **getLastRenderTime**(): number   
Returns the last render time.

- **getNormalsTexture**(): Gfx3Texture   
Returns the rendering texture contains normals.

- **getNumViews**(): number   
Returns the number of views.

- **getPassEncoder**(): GPURenderPassEncoder   
Returns the current WebGPU render pass encoder.

- **getPipeline**(id: string): GPURenderPipeline   
Returns a GPU render pipeline.
   - **id**: The identifier of the pipeline.

- **getVertexBuffer**(): GPUBuffer   
Returns the big one vertex buffer.

- **getView**(index: number): Gfx3View   
Returns the view at the specified index.
   - **index**: The index.

- **getWidth**(): number   
Returns the resolution width of the canvas.

- **hasFilter**(): boolean   
Checks if the canvas element has an active filter.

- **initialize**(): Promise   
Initializes the WebGPU rendering context (internal use only).

- **loadPipeline**(id: string, vertexShader: string, fragmentShader: string, pipelineDesc: GPURenderPipelineDescriptor): GPURenderPipeline   
Creates and returns a GPU render pipeline using the provided vertex and fragment shaders, and caches it for future use.
   - **id**: A unique identifier for the render pipeline.
   - **vertexShader**: The code for the vertex shader.
   - **fragmentShader**: The code for the fragment shader.
   - **pipelineDesc**: The configuration of the pipeline, such as the vertex and fragment shaders, the color and depth formats, the primitive topology

- **removeView**(view: Gfx3View): void   
Removes a view.
   - **view**: The view.

- **removeViewAt**(index: number): void   
Removes a view at specified index.
   - **index**: The index of the view.

- **setDestinationTexture**(destinationTexture): void   
The destination texture is used for multi-pass rendering.
Note: If destination texture is set, we render to the destination texture and let post-processing effect renderers used it.
otherwise we are rendering to the screen directly.
   - **destinationTexture**: The destination texture.

- **setFilter**(filter: string): void   
Sets the css filter property of the canvas.
   - **filter**: The filter parameter is a string that represents the CSS filter property's value.
It can be used to apply various visual effects to an element, such as blur, brightness, contrast,
grayscale, etc.

- **writeVertexBuffer**(sub: VertexSubBuffer, vertices: number[]): void   
Write data on vertex sub-buffer.
   - **sub**: The vertex sub-buffer.
   - **vertices**: The vertex data.
