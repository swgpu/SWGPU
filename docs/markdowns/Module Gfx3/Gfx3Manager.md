# Gfx3Manager

Singleton 3D graphics manager.
## Constructors
* **new Gfx3Manager**(): Gfx3Manager   
## Methods
* **beginDrawing**(): void   
* **beginPassRender**(viewIndex: number): void   
  * **viewIndex**
* **beginRender**(): void   
* **changeView**(index: number, view: Gfx3View): void   
  * **index**: The index of the view should be changed.
  * **view**: The view.
* **createCubeMapFromBitmap**(bitmaps): Gfx3Texture   
  * **bitmaps**: The list of six bitmaps.
* **createDynamicGroup**(pipelineId: string, groupIndex: number): Gfx3DynamicGroup   
  * **pipelineId**: The unique identifier of a pipeline.
  * **groupIndex**: The uniform group index in the shader.
* **createEmptyTexture**(width: number, height: number, format: GPUTextureFormat, samplerDescriptor: GPUSamplerDescriptor): Gfx3Texture   
  * **width**: The texture width.
  * **height**: The texture height.
  * **format**
  * **samplerDescriptor**: The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
* **createRenderingTexture**(format: GPUTextureFormat): Gfx3Texture   
  * **format**
* **createStaticGroup**(pipelineId: string, groupIndex: number): Gfx3StaticGroup   
  * **pipelineId**: The unique identifier of a pipeline.
  * **groupIndex**: The uniform group index in the shader.
* **createTextureFromBitmap**(bitmap, is8bit: boolean, samplerDescriptor: GPUSamplerDescriptor): Gfx3Texture   
  * **bitmap**: The source image.
  * **is8bit**: Indicates whether the texture should be treated as an 8-bit texture or not.
  * **samplerDescriptor**: The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
* **createVertexBuffer**(size: number): VertexSubBuffer   
  * **size**: The number of vertices.
* **createView**(): Gfx3View   
* **deletePipeline**(id: string): void   
  * **id**: The identifier of the pipeline.
* **destroyVertexBuffer**(sub: VertexSubBuffer): void   
  * **sub**: The vertex sub-buffer.
* **endDrawing**(): void   
* **endPassRender**(): void   
* **endRender**(): void   
* **getClientHeight**(): number   
* **getClientWidth**(): number   
* **getCommandEncoder**(): GPUCommandEncoder   
* **getContext**(): GPUCanvasContext   
* **getCurrentRenderingTexture**(): GPUTexture   
* **getCurrentView**(): Gfx3View   
* **getDepthTexture**(): Gfx3Texture   
* **getDevice**(): GPUDevice   
* **getHeight**(): number   
* **getIdsTexture**(): Gfx3Texture   
* **getLastRenderTime**(): number   
* **getNormalsTexture**(): Gfx3Texture   
* **getNumViews**(): number   
* **getPassEncoder**(): GPURenderPassEncoder   
* **getPipeline**(id: string): GPURenderPipeline   
  * **id**: The identifier of the pipeline.
* **getVertexBuffer**(): GPUBuffer   
* **getView**(index: number): Gfx3View   
  * **index**: The index.
* **getWidth**(): number   
* **hasFilter**(): boolean   
* **initialize**(): Promise   
* **loadPipeline**(id: string, vertexShader: string, fragmentShader: string, pipelineDesc: GPURenderPipelineDescriptor): GPURenderPipeline   
  * **id**: A unique identifier for the render pipeline.
  * **vertexShader**: The code for the vertex shader.
  * **fragmentShader**: The code for the fragment shader.
  * **pipelineDesc**: The configuration of the pipeline, such as the vertex and fragment shaders, the color and depth formats, the primitive topology
* **removeView**(view: Gfx3View): void   
  * **view**: The view.
* **removeViewAt**(index: number): void   
  * **index**: The index of the view.
* **setDestinationTexture**(destinationTexture): void   
  * **destinationTexture**: The destination texture.
* **setFilter**(filter: string): void   
  * **filter**: The filter parameter is a string that represents the CSS filter property's value.
It can be used to apply various visual effects to an element, such as blur, brightness, contrast,
grayscale, etc.
* **writeVertexBuffer**(sub: VertexSubBuffer, vertices: number[]): void   
  * **sub**: The vertex sub-buffer.
  * **vertices**: The vertex data.
