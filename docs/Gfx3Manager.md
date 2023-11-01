[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3/gfx3\_manager](../modules/gfx3_gfx3_manager.md) / Gfx3Manager

# Class: Gfx3Manager

[gfx3/gfx3_manager](../modules/gfx3_gfx3_manager.md).Gfx3Manager

The `Gfx3Manager` class is a singleton responsible for render all graphics stuff in a 3D graphics system.

## Table of contents

### Methods

- [beginDrawing](gfx3_gfx3_manager$Gfx3Manager.md#begindrawing)
- [beginRender](gfx3_gfx3_manager$Gfx3Manager.md#beginrender)
- [changeView](gfx3_gfx3_manager$Gfx3Manager.md#changeview)
- [createCubeMapFromBitmap](gfx3_gfx3_manager$Gfx3Manager.md#createcubemapfrombitmap)
- [createDynamicGroup](gfx3_gfx3_manager$Gfx3Manager.md#createdynamicgroup)
- [createStaticGroup](gfx3_gfx3_manager$Gfx3Manager.md#createstaticgroup)
- [createTextureFromBitmap](gfx3_gfx3_manager$Gfx3Manager.md#createtexturefrombitmap)
- [createVertexBuffer](gfx3_gfx3_manager$Gfx3Manager.md#createvertexbuffer)
- [createView](gfx3_gfx3_manager$Gfx3Manager.md#createview)
- [destroyVertexBuffer](gfx3_gfx3_manager$Gfx3Manager.md#destroyvertexbuffer)
- [endDrawing](gfx3_gfx3_manager$Gfx3Manager.md#enddrawing)
- [endRender](gfx3_gfx3_manager$Gfx3Manager.md#endrender)
- [getClientHeight](gfx3_gfx3_manager$Gfx3Manager.md#getclientheight)
- [getClientWidth](gfx3_gfx3_manager$Gfx3Manager.md#getclientwidth)
- [getContext](gfx3_gfx3_manager$Gfx3Manager.md#getcontext)
- [getCurrentView](gfx3_gfx3_manager$Gfx3Manager.md#getcurrentview)
- [getDevice](gfx3_gfx3_manager$Gfx3Manager.md#getdevice)
- [getHeight](gfx3_gfx3_manager$Gfx3Manager.md#getheight)
- [getLastRenderTime](gfx3_gfx3_manager$Gfx3Manager.md#getlastrendertime)
- [getNumViews](gfx3_gfx3_manager$Gfx3Manager.md#getnumviews)
- [getPassEncoder](gfx3_gfx3_manager$Gfx3Manager.md#getpassencoder)
- [getPipeline](gfx3_gfx3_manager$Gfx3Manager.md#getpipeline)
- [getVertexBuffer](gfx3_gfx3_manager$Gfx3Manager.md#getvertexbuffer)
- [getView](gfx3_gfx3_manager$Gfx3Manager.md#getview)
- [getWidth](gfx3_gfx3_manager$Gfx3Manager.md#getwidth)
- [handleWindowResize](gfx3_gfx3_manager$Gfx3Manager.md#handlewindowresize)
- [initialize](gfx3_gfx3_manager$Gfx3Manager.md#initialize)
- [loadPipeline](gfx3_gfx3_manager$Gfx3Manager.md#loadpipeline)
- [releaseViews](gfx3_gfx3_manager$Gfx3Manager.md#releaseviews)
- [removeView](gfx3_gfx3_manager$Gfx3Manager.md#removeview)
- [writeVertexBuffer](gfx3_gfx3_manager$Gfx3Manager.md#writevertexbuffer)

### Properties

- [adapter](gfx3_gfx3_manager$Gfx3Manager.md#adapter)
- [canvas](gfx3_gfx3_manager$Gfx3Manager.md#canvas)
- [commandEncoder](gfx3_gfx3_manager$Gfx3Manager.md#commandencoder)
- [ctx](gfx3_gfx3_manager$Gfx3Manager.md#ctx)
- [currentView](gfx3_gfx3_manager$Gfx3Manager.md#currentview)
- [depthTexture](gfx3_gfx3_manager$Gfx3Manager.md#depthtexture)
- [depthView](gfx3_gfx3_manager$Gfx3Manager.md#depthview)
- [device](gfx3_gfx3_manager$Gfx3Manager.md#device)
- [lastRenderStart](gfx3_gfx3_manager$Gfx3Manager.md#lastrenderstart)
- [lastRenderTime](gfx3_gfx3_manager$Gfx3Manager.md#lastrendertime)
- [passEncoder](gfx3_gfx3_manager$Gfx3Manager.md#passencoder)
- [pipelines](gfx3_gfx3_manager$Gfx3Manager.md#pipelines)
- [vertexBuffer](gfx3_gfx3_manager$Gfx3Manager.md#vertexbuffer)
- [vertexSubBuffers](gfx3_gfx3_manager$Gfx3Manager.md#vertexsubbuffers)
- [vertexSubBuffersSize](gfx3_gfx3_manager$Gfx3Manager.md#vertexsubbufferssize)
- [views](gfx3_gfx3_manager$Gfx3Manager.md#views)

### Constructors

- [constructor](gfx3_gfx3_manager$Gfx3Manager.md#constructor)

## Methods

### beginDrawing

▸ **beginDrawing**(`viewIndex`): `void`

The "beginDrawing" function prepare the rendering environment for a specific view.
Warning: You need to call this method before your draw calls.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `viewIndex` | `number` | The `viewIndex` parameter is the index of the view that you want to begin drawing. It is used to retrieve the corresponding view object from the `views` array. |

#### Returns

`void`

___

### beginRender

▸ **beginRender**(): `void`

The "beginRender" function prepare the rendering phase.
Warning: You need to call this method before your render calls.

#### Returns

`void`

___

### changeView

▸ **changeView**(`index`, `view`): `void`

The "changeView" function change the view at a specified index in views array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The position in the views array where the view should be changed. |
| `view` | [`Gfx3View`](gfx3_gfx3_view$Gfx3View.md) | The view. |

#### Returns

`void`

___

### createCubeMapFromBitmap

▸ **createCubeMapFromBitmap**(`bitmaps?`): [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The "createCubeMapFromBitmap" function creates a cube map texture from an array of bitmaps or canvas
elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bitmaps?` | (`HTMLCanvasElement` \| `ImageBitmap`)[] | The `bitmaps` parameter is an array of `ImageBitmap` or `HTMLCanvasElement` objects. These objects represent the six faces of a cube map texture. Each face should have the same size. |

#### Returns

[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The Gfx3Texture.

___

### createDynamicGroup

▸ **createDynamicGroup**(`pipelineId`, `groupIndex`): [`Gfx3DynamicGroup`](gfx3_gfx3_group$Gfx3DynamicGroup.md)

The "createDynamicGroup" function creates a dynamic group for a given pipeline and group index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pipelineId` | `string` | The pipelineId is a string that represents the unique identifier of a pipeline. |
| `groupIndex` | `number` | The `groupIndex` parameter is the index of the uniform group in the shader. |

#### Returns

[`Gfx3DynamicGroup`](gfx3_gfx3_group$Gfx3DynamicGroup.md)

A new instance of Gfx3DynamicGroup.

___

### createStaticGroup

▸ **createStaticGroup**(`pipelineId`, `groupIndex`): [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

The "createStaticGroup" function creates a static group for a given pipeline and group index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pipelineId` | `string` | The pipelineId is a string that represents the unique identifier of a pipeline. |
| `groupIndex` | `number` | The `groupIndex` parameter is the index of the uniform group in the shader. |

#### Returns

[`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

A new instance of Gfx3StaticGroup.

___

### createTextureFromBitmap

▸ **createTextureFromBitmap**(`bitmap?`, `is8bit?`): [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The "createTextureFromBitmap" function creates a GPU texture from a given bitmap image or canvas element.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bitmap?` | `HTMLCanvasElement` \| `ImageBitmap` | `undefined` | The `bitmap` parameter can be either an `ImageBitmap` or an `HTMLCanvasElement`. It represents the source image from which the texture will be created. |
| `is8bit?` | `boolean` | `false` | The `is8bit` parameter is a boolean flag that indicates whether the texture should be treated as an 8-bit texture or not. If `is8bit` is `true`, the texture format will be set to "r8unorm" (8-bit normalized format). If `is |

#### Returns

[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The Gfx3Texture.

___

### createVertexBuffer

▸ **createVertexBuffer**(`size`): [`VertexSubBuffer`](../interfaces/gfx3_gfx3_manager$VertexSubBuffer.md)

The "createVertexBuffer" function creates a vertex sub-buffer of a specified size and returns it.
Nota bene: A sub-buffer is just a reference offset/size pointing to the big one vertex buffer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` | The `size` parameter represents the number of vertices that will be stored in the vertex sub-buffer. |

#### Returns

[`VertexSubBuffer`](../interfaces/gfx3_gfx3_manager$VertexSubBuffer.md)

The vertex sub-buffer.

___

### createView

▸ **createView**(): [`Gfx3View`](gfx3_gfx3_view$Gfx3View.md)

The "createView" function creates a new `Gfx3View` object.

#### Returns

[`Gfx3View`](gfx3_gfx3_view$Gfx3View.md)

A new instance of `Gfx3View`.

___

### destroyVertexBuffer

▸ **destroyVertexBuffer**(`sub`): `void`

The "destroyVertexBuffer" function removes a given vertex sub-buffer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sub` | [`VertexSubBuffer`](../interfaces/gfx3_gfx3_manager$VertexSubBuffer.md) | The vertex sub-buffer. |

#### Returns

`void`

___

### endDrawing

▸ **endDrawing**(): `void`

The "endDrawing" function close the drawing phase.
Warning: You need to call this method after your draw calls.

#### Returns

`void`

___

### endRender

▸ **endRender**(): `void`

The "endRender" function ends the rendering process, submits the command encoder to the device
queue, and calculates the time taken for the rendering.
Warning: You need to call this method after your render calls.

#### Returns

`void`

___

### getClientHeight

▸ **getClientHeight**(): `number`

The "getClientHeight" function returns the client height of the canvas.

#### Returns

`number`

The client height of the canvas.

___

### getClientWidth

▸ **getClientWidth**(): `number`

The "getClientWidth" function returns the client width of the canvas.

#### Returns

`number`

The client width of the canvas.

___

### getContext

▸ **getContext**(): `GPUCanvasContext`

The "getContext" function returns the GPUCanvasContext object.

#### Returns

`GPUCanvasContext`

The WebGPU canvas context.

___

### getCurrentView

▸ **getCurrentView**(): [`Gfx3View`](gfx3_gfx3_view$Gfx3View.md)

The "getCurrentView" function returns the current view.
Nota bene: current view is set by the "beginDraw" function.

#### Returns

[`Gfx3View`](gfx3_gfx3_view$Gfx3View.md)

The current view.

___

### getDevice

▸ **getDevice**(): `GPUDevice`

The "getDevice" function returns the GPU device.

#### Returns

`GPUDevice`

The WebGPU device.

___

### getHeight

▸ **getHeight**(): `number`

The "getHeight" function returns the height of the canvas.

#### Returns

`number`

The height of the canvas.

___

### getLastRenderTime

▸ **getLastRenderTime**(): `number`

The "getLastRenderTime" function returns the last render time.

#### Returns

`number`

The last render time.

___

### getNumViews

▸ **getNumViews**(): `number`

The "getNumViews" function returns the number of views.

#### Returns

`number`

The number of views.

___

### getPassEncoder

▸ **getPassEncoder**(): `GPURenderPassEncoder`

The "getPassEncoder" function returns the GPURenderPassEncoder.

#### Returns

`GPURenderPassEncoder`

The WebGPU render pass encoder.

___

### getPipeline

▸ **getPipeline**(`id`): `GPURenderPipeline`

The "getPipeline" function returns a GPU render pipeline based on the provided ID, throwing an error
if the pipeline is not found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | A string representing the ID of the pipeline to retrieve. |

#### Returns

`GPURenderPipeline`

The GPU render pipeline.

___

### getVertexBuffer

▸ **getVertexBuffer**(): `GPUBuffer`

The "getVertexBuffer" function returns the big one vertex buffer.

#### Returns

`GPUBuffer`

The global vertex buffer.

___

### getView

▸ **getView**(`index`): [`Gfx3View`](gfx3_gfx3_view$Gfx3View.md)

The "getView" function returns the Gfx3View at the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The position of the view in views array. |

#### Returns

[`Gfx3View`](gfx3_gfx3_view$Gfx3View.md)

The Gfx3View.

___

### getWidth

▸ **getWidth**(): `number`

The "getWidth" function returns the width of the canvas.

#### Returns

`number`

The width of the canvas.

___

### handleWindowResize

▸ **handleWindowResize**(): `void`

The "handleWindowResize" function resizes the canvas, recreates the depth texture and view, and
updates the screen size for each view.

#### Returns

`void`

___

### initialize

▸ **initialize**(): `Promise`<`void`\>

The "initialize" function initializes the WebGPU rendering context, checks for browser support,
requests the adapter and device, configures the canvas, creates a depth texture and vertex buffer,
and subscribes to a window resize event.

#### Returns

`Promise`<`void`\>

___

### loadPipeline

▸ **loadPipeline**(`id`, `vertexShader`, `fragmentShader`, `pipelineDesc`): `GPURenderPipeline`

The "loadPipeline" function creates and returns a GPU render pipeline using the provided vertex and
fragment shaders, and caches it for future use.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | A unique identifier for the render pipeline. |
| `vertexShader` | `string` | The `vertexShader` parameter is a string that represents the code for the vertex shader. |
| `fragmentShader` | `string` | The `fragmentShader` parameter is a string that represents the code for the fragment shader. |
| `pipelineDesc` | `GPURenderPipelineDescriptor` | The `pipelineDesc` parameter is of type `GPURenderPipelineDescriptor` and it represents the description of the render pipeline that you want to create. It contains various properties that define the configuration of the pipeline, such as the vertex and fragment shaders, the color and depth formats, the primitive topology |

#### Returns

`GPURenderPipeline`

The GPU render pipeline.

___

### releaseViews

▸ **releaseViews**(): `void`

The "releaseViews" function delete all views.

#### Returns

`void`

___

### removeView

▸ **removeView**(`view`): `void`

The "removeView" function removes a specified view in views array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `view` | [`Gfx3View`](gfx3_gfx3_view$Gfx3View.md) | The view. |

#### Returns

`void`

___

### writeVertexBuffer

▸ **writeVertexBuffer**(`sub`, `vertices`): `void`

The "writeVertexBuffer" function takes a vertex sub-buffer and write on it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sub` | [`VertexSubBuffer`](../interfaces/gfx3_gfx3_manager$VertexSubBuffer.md) | The vertex sub-buffer. |
| `vertices` | `number`[] | The `vertices` parameter is an array of numbers representing the vertex data. |

#### Returns

`void`

## Properties

### adapter

• **adapter**: `GPUAdapter`

___

### canvas

• **canvas**: `HTMLCanvasElement`

___

### commandEncoder

• **commandEncoder**: `GPUCommandEncoder`

___

### ctx

• **ctx**: `GPUCanvasContext`

___

### currentView

• **currentView**: [`Gfx3View`](gfx3_gfx3_view$Gfx3View.md)

___

### depthTexture

• **depthTexture**: `GPUTexture`

___

### depthView

• **depthView**: `GPUTextureView`

___

### device

• **device**: `GPUDevice`

___

### lastRenderStart

• **lastRenderStart**: `number`

___

### lastRenderTime

• **lastRenderTime**: `number`

___

### passEncoder

• **passEncoder**: `GPURenderPassEncoder`

___

### pipelines

• **pipelines**: `Map`<`string`, `GPURenderPipeline`\>

___

### vertexBuffer

• **vertexBuffer**: `GPUBuffer`

___

### vertexSubBuffers

• **vertexSubBuffers**: [`VertexSubBuffer`](../interfaces/gfx3_gfx3_manager$VertexSubBuffer.md)[]

___

### vertexSubBuffersSize

• **vertexSubBuffersSize**: `number`

___

### views

• **views**: [`Gfx3View`](gfx3_gfx3_view$Gfx3View.md)[]

## Constructors

### constructor

• **new Gfx3Manager**()

The constructor.
