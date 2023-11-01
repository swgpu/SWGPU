[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3/gfx3\_view](../modules/gfx3_gfx3_view.md) / Gfx3View

# Class: Gfx3View

[gfx3/gfx3_view](../modules/gfx3_gfx3_view.md).Gfx3View

The `Gfx3View` class represents a view in a 3D graphics application, providing methods to manipulate
camera settings, projection mode, background color, and calculate screen positions of 3D points.

## Table of contents

### Methods

- [getBgColor](gfx3_gfx3_view$Gfx3View.md#getbgcolor)
- [getCameraMatrix](gfx3_gfx3_view$Gfx3View.md#getcameramatrix)
- [getCameraPosition](gfx3_gfx3_view$Gfx3View.md#getcameraposition)
- [getCameraViewMatrix](gfx3_gfx3_view$Gfx3View.md#getcameraviewmatrix)
- [getClientScreenPosition](gfx3_gfx3_view$Gfx3View.md#getclientscreenposition)
- [getClipMatrix](gfx3_gfx3_view$Gfx3View.md#getclipmatrix)
- [getClipOffset](gfx3_gfx3_view$Gfx3View.md#getclipoffset)
- [getClipOffsetX](gfx3_gfx3_view$Gfx3View.md#getclipoffsetx)
- [getClipOffsetY](gfx3_gfx3_view$Gfx3View.md#getclipoffsety)
- [getOrthographicDepth](gfx3_gfx3_view$Gfx3View.md#getorthographicdepth)
- [getOrthographicSize](gfx3_gfx3_view$Gfx3View.md#getorthographicsize)
- [getPerspectiveFar](gfx3_gfx3_view$Gfx3View.md#getperspectivefar)
- [getPerspectiveFovy](gfx3_gfx3_view$Gfx3View.md#getperspectivefovy)
- [getPerspectiveNear](gfx3_gfx3_view$Gfx3View.md#getperspectivenear)
- [getProjectionClipMatrix](gfx3_gfx3_view$Gfx3View.md#getprojectionclipmatrix)
- [getProjectionMatrix](gfx3_gfx3_view$Gfx3View.md#getprojectionmatrix)
- [getProjectionMode](gfx3_gfx3_view$Gfx3View.md#getprojectionmode)
- [getScreenNormalizedPosition](gfx3_gfx3_view$Gfx3View.md#getscreennormalizedposition)
- [getScreenSize](gfx3_gfx3_view$Gfx3View.md#getscreensize)
- [getViewProjectionClipMatrix](gfx3_gfx3_view$Gfx3View.md#getviewprojectionclipmatrix)
- [getViewport](gfx3_gfx3_view$Gfx3View.md#getviewport)
- [getViewportClientSize](gfx3_gfx3_view$Gfx3View.md#getviewportclientsize)
- [getViewportSize](gfx3_gfx3_view$Gfx3View.md#getviewportsize)
- [setBgColor](gfx3_gfx3_view$Gfx3View.md#setbgcolor)
- [setCameraMatrix](gfx3_gfx3_view$Gfx3View.md#setcameramatrix)
- [setClipOffset](gfx3_gfx3_view$Gfx3View.md#setclipoffset)
- [setOrthographicDepth](gfx3_gfx3_view$Gfx3View.md#setorthographicdepth)
- [setOrthographicSize](gfx3_gfx3_view$Gfx3View.md#setorthographicsize)
- [setPerspectiveFar](gfx3_gfx3_view$Gfx3View.md#setperspectivefar)
- [setPerspectiveFovy](gfx3_gfx3_view$Gfx3View.md#setperspectivefovy)
- [setPerspectiveNear](gfx3_gfx3_view$Gfx3View.md#setperspectivenear)
- [setProjectionMode](gfx3_gfx3_view$Gfx3View.md#setprojectionmode)
- [setScreenSize](gfx3_gfx3_view$Gfx3View.md#setscreensize)
- [setViewport](gfx3_gfx3_view$Gfx3View.md#setviewport)

### Properties

- [bgColor](gfx3_gfx3_view$Gfx3View.md#bgcolor)
- [cameraMatrix](gfx3_gfx3_view$Gfx3View.md#cameramatrix)
- [clipOffset](gfx3_gfx3_view$Gfx3View.md#clipoffset)
- [orthographicDepth](gfx3_gfx3_view$Gfx3View.md#orthographicdepth)
- [orthographicSize](gfx3_gfx3_view$Gfx3View.md#orthographicsize)
- [perspectiveFar](gfx3_gfx3_view$Gfx3View.md#perspectivefar)
- [perspectiveFovy](gfx3_gfx3_view$Gfx3View.md#perspectivefovy)
- [perspectiveNear](gfx3_gfx3_view$Gfx3View.md#perspectivenear)
- [projectionMode](gfx3_gfx3_view$Gfx3View.md#projectionmode)
- [screenSize](gfx3_gfx3_view$Gfx3View.md#screensize)
- [viewport](gfx3_gfx3_view$Gfx3View.md#viewport)

### Constructors

- [constructor](gfx3_gfx3_view$Gfx3View.md#constructor)

## Methods

### getBgColor

▸ **getBgColor**(): [`vec4`](../modules/core_global.md#vec4)

The "getBgColor" function returns the background color.

#### Returns

[`vec4`](../modules/core_global.md#vec4)

The `bgColor` property, which is the background color.

___

### getCameraMatrix

▸ **getCameraMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getCameraMatrix" function returns the camera matrix.

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The camera matrix.

___

### getCameraPosition

▸ **getCameraPosition**(): [`vec3`](../modules/core_global.md#vec3)

The "getCameraPosition" function returns the position of the camera.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The position of camera.

___

### getCameraViewMatrix

▸ **getCameraViewMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getCameraViewMatrix" function returns the camera view matrix (inverted camera matrix).

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The camera view matrix.

___

### getClientScreenPosition

▸ **getClientScreenPosition**(`x`, `y`, `z`): [`vec2`](../modules/core_global.md#vec2)

The "getClientScreenPosition" function calculates the client screen position of a 3D point given its world
coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x world coordinate. |
| `y` | `number` | The y world coordinate. |
| `z` | `number` | The z world coordinate. |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The client screen position.

___

### getClipMatrix

▸ **getClipMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getClipMatrix" function returns a the clip matrix.

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The clip matrix.

___

### getClipOffset

▸ **getClipOffset**(): [`vec2`](../modules/core_global.md#vec2)

The "getClipOffset" function returns the clip offset.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The clip offset.

___

### getClipOffsetX

▸ **getClipOffsetX**(): `number`

The "getClipOffsetX" function returns the x-coordinate of the clip offset.

#### Returns

`number`

The X coordinate of clip offset.

___

### getClipOffsetY

▸ **getClipOffsetY**(): `number`

The "getClipOffsetY" function returns the y-coordinate of the clip offset.

#### Returns

`number`

The Y coordinate of clip offset.

___

### getOrthographicDepth

▸ **getOrthographicDepth**(): `number`

The "getOrthographicDepth" function returns the `orthographicDepth`property.

#### Returns

`number`

The orthographic depth property.

___

### getOrthographicSize

▸ **getOrthographicSize**(): `number`

The "getOrthographicSize" function returns the value of the "orthographicSize" property.

#### Returns

`number`

The orthographic size property.

___

### getPerspectiveFar

▸ **getPerspectiveFar**(): `number`

The "getPerspectiveFar" function returns the value of the perspectiveFar property.

#### Returns

`number`

The perspective far property.

___

### getPerspectiveFovy

▸ **getPerspectiveFovy**(): `number`

The "getPerspectiveFovy" function returns the fovy angle (perspective eye-angle).

#### Returns

`number`

The fovy angle.

___

### getPerspectiveNear

▸ **getPerspectiveNear**(): `number`

The "getPerspectiveNear" function returns the perspective near property.

#### Returns

`number`

The perspective near property.

___

### getProjectionClipMatrix

▸ **getProjectionClipMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getProjectionClipMatrix" function returns the result of multiplying the clip matrix and the projection matrix.

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The result of multiplying the clip matrix and the projection matrix together.

___

### getProjectionMatrix

▸ **getProjectionMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getProjectionMatrix" function returns a projection matrix based on the current projection mode.

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The projection matrix.

___

### getProjectionMode

▸ **getProjectionMode**(): [`ProjectionMode`](../enums/gfx3_gfx3_view$ProjectionMode.md)

The "getProjectionMode" function returns the current projection mode.

#### Returns

[`ProjectionMode`](../enums/gfx3_gfx3_view$ProjectionMode.md)

The projection mode property.

___

### getScreenNormalizedPosition

▸ **getScreenNormalizedPosition**(`x`, `y`, `z`): [`vec2`](../modules/core_global.md#vec2)

The "getScreenNormalizedPosition" function calculates the normalized screen position of a 3D point given its world
coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x world coordinate. |
| `y` | `number` | The y world coordinate. |
| `z` | `number` | The z world coordinate. |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The normalized screen position.

___

### getScreenSize

▸ **getScreenSize**(): [`vec2`](../modules/core_global.md#vec2)

The "getScreenSize" function returns the screen size property.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The screen size property.

___

### getViewProjectionClipMatrix

▸ **getViewProjectionClipMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getViewProjectionClipMatrix" function returns the result of multiplying the clip matrix,
projection matrix, and camera view matrix together.

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The result of multiplying the clip matrix, projection matrix and camera view matrix together.

___

### getViewport

▸ **getViewport**(): [`Gfx3Viewport`](../interfaces/gfx3_gfx3_view$Gfx3Viewport.md)

The "getViewport" function returns the viewport of the view.

#### Returns

[`Gfx3Viewport`](../interfaces/gfx3_gfx3_view$Gfx3Viewport.md)

The viewport property.

___

### getViewportClientSize

▸ **getViewportClientSize**(): [`vec2`](../modules/core_global.md#vec2)

The "getViewportClientSize" function calculates the size of the viewport in client coordinates space.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The size of the viewport client area.

___

### getViewportSize

▸ **getViewportSize**(): [`vec2`](../modules/core_global.md#vec2)

The "getViewportSize" function calculates and returns the size of the viewport in pixels.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The size of the viewport in pixels.

___

### setBgColor

▸ **setBgColor**(`r`, `g`, `b`, `a`): `void`

The "setBgColor" function sets the background color ranging from 0 to 1.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `r` | `number` | The parameter "r" represents the red component. |
| `g` | `number` | The parameter "g" represents the green component. |
| `b` | `number` | The parameter "b" represents the blue component. |
| `a` | `number` | The parameter "a" represents the alpha value. |

#### Returns

`void`

___

### setCameraMatrix

▸ **setCameraMatrix**(`cameraMatrix`): `void`

The "setCameraMatrix" function sets the camera matrix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cameraMatrix` | [`mat4`](../modules/core_global.md#mat4) | The cameraMatrix parameter is a 4x4 matrix that represents the transformation applied to the camera. It is typically used to define the position, orientation, and scale of the camera in the scene. |

#### Returns

`void`

___

### setClipOffset

▸ **setClipOffset**(`x`, `y`): `void`

The "setClipOffset" function set the clip offset with the given x and y coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The X coordinate of the clip offset. |
| `y` | `number` | The Y coordinate of the clip offset. |

#### Returns

`void`

___

### setOrthographicDepth

▸ **setOrthographicDepth**(`orthographicDepth`): `void`

The "setOrthographicDepth" function sets the `orthographicDepth`property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orthographicDepth` | `number` | The `orthographicDepth` parameter is the depth of the orthographic view. |

#### Returns

`void`

___

### setOrthographicSize

▸ **setOrthographicSize**(`orthographicSize`): `void`

The  "setOrthographicSize" function sets the `orthographicSize` property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `orthographicSize` | `number` | The orthographicSize parameter is the size of the orthographic camera view. It determines how much of the scene is visible within the camera's view frustum. |

#### Returns

`void`

___

### setPerspectiveFar

▸ **setPerspectiveFar**(`perspectiveFar`): `void`

The "setPerspectiveFar" function sets the value of the perspectiveFar property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `perspectiveFar` | `number` | The parameter `perspectiveFar` is the far clipping plane of a perspective projection. It determines the maximum distance from the camera at which objects will be rendered. |

#### Returns

`void`

___

### setPerspectiveFovy

▸ **setPerspectiveFovy**(`perspectiveFovy`): `void`

The "setPerspectiveFovy" function sets the fovy angle property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `perspectiveFovy` | `number` | The `perspectiveFovy` parameter represents the field of view angle in the vertical direction for a perspective projection. |

#### Returns

`void`

___

### setPerspectiveNear

▸ **setPerspectiveNear**(`perspectiveNear`): `void`

The "setPerspectiveNear" function sets the value of the perspectiveNear property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `perspectiveNear` | `number` | The parameter `perspectiveNear` represents the distance to the near clipping plane of a perspective projection. |

#### Returns

`void`

___

### setProjectionMode

▸ **setProjectionMode**(`projectionMode`): `void`

The "setProjectionMode" function sets the projection mode property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `projectionMode` | [`ProjectionMode`](../enums/gfx3_gfx3_view$ProjectionMode.md) | The projection mode. |

#### Returns

`void`

___

### setScreenSize

▸ **setScreenSize**(`width`, `height`): `void`

The "setScreenSize" function sets the screen width and height property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | The width of the screen size. |
| `height` | `number` | The height of the screen size. |

#### Returns

`void`

___

### setViewport

▸ **setViewport**(`viewport`): `void`

The "setViewport" function sets the viewport of the view.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `viewport` | [`Gfx3Viewport`](../interfaces/gfx3_gfx3_view$Gfx3Viewport.md) | The `viewport` parameter represents the dimensions and position of the viewport on canvas. |

#### Returns

`void`

## Properties

### bgColor

• **bgColor**: [`vec4`](../modules/core_global.md#vec4)

___

### cameraMatrix

• **cameraMatrix**: [`mat4`](../modules/core_global.md#mat4)

___

### clipOffset

• **clipOffset**: [`vec2`](../modules/core_global.md#vec2)

___

### orthographicDepth

• **orthographicDepth**: `number`

___

### orthographicSize

• **orthographicSize**: `number`

___

### perspectiveFar

• **perspectiveFar**: `number`

___

### perspectiveFovy

• **perspectiveFovy**: `number`

___

### perspectiveNear

• **perspectiveNear**: `number`

___

### projectionMode

• **projectionMode**: [`ProjectionMode`](../enums/gfx3_gfx3_view$ProjectionMode.md)

___

### screenSize

• **screenSize**: [`vec2`](../modules/core_global.md#vec2)

___

### viewport

• **viewport**: [`Gfx3Viewport`](../interfaces/gfx3_gfx3_view$Gfx3Viewport.md)

## Constructors

### constructor

• **new Gfx3View**()

The constructor.
