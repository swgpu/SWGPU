[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx2/gfx2\_manager](../modules/gfx2_gfx2_manager.md) / Gfx2Manager

# Class: Gfx2Manager

[gfx2/gfx2_manager](../modules/gfx2_gfx2_manager.md).Gfx2Manager

The `Gfx2Manager` class is a singleton responsible for managing 2D canvas for drawing and provides
functions for camera manipulation and coordinate conversions.

## Table of contents

### Methods

- [beginDrawing](gfx2_gfx2_manager$Gfx2Manager.md#begindrawing)
- [endDrawing](gfx2_gfx2_manager$Gfx2Manager.md#enddrawing)
- [findCanvasPosFromClientPos](gfx2_gfx2_manager$Gfx2Manager.md#findcanvasposfromclientpos)
- [findWorldPosFromClientPos](gfx2_gfx2_manager$Gfx2Manager.md#findworldposfromclientpos)
- [getBgColor](gfx2_gfx2_manager$Gfx2Manager.md#getbgcolor)
- [getCameraPosition](gfx2_gfx2_manager$Gfx2Manager.md#getcameraposition)
- [getCameraPositionX](gfx2_gfx2_manager$Gfx2Manager.md#getcamerapositionx)
- [getCameraPositionY](gfx2_gfx2_manager$Gfx2Manager.md#getcamerapositiony)
- [getCameraRotation](gfx2_gfx2_manager$Gfx2Manager.md#getcamerarotation)
- [getCameraScale](gfx2_gfx2_manager$Gfx2Manager.md#getcamerascale)
- [getCameraScaleX](gfx2_gfx2_manager$Gfx2Manager.md#getcamerascalex)
- [getCameraScaleY](gfx2_gfx2_manager$Gfx2Manager.md#getcamerascaley)
- [getCameraTransform](gfx2_gfx2_manager$Gfx2Manager.md#getcameratransform)
- [getClientHeight](gfx2_gfx2_manager$Gfx2Manager.md#getclientheight)
- [getClientWidth](gfx2_gfx2_manager$Gfx2Manager.md#getclientwidth)
- [getContext](gfx2_gfx2_manager$Gfx2Manager.md#getcontext)
- [getDefaultTexture](gfx2_gfx2_manager$Gfx2Manager.md#getdefaulttexture)
- [getHeight](gfx2_gfx2_manager$Gfx2Manager.md#getheight)
- [getWidth](gfx2_gfx2_manager$Gfx2Manager.md#getwidth)
- [moveCamera](gfx2_gfx2_manager$Gfx2Manager.md#movecamera)
- [setBgColor](gfx2_gfx2_manager$Gfx2Manager.md#setbgcolor)
- [setCameraPosition](gfx2_gfx2_manager$Gfx2Manager.md#setcameraposition)
- [setCameraRotation](gfx2_gfx2_manager$Gfx2Manager.md#setcamerarotation)
- [setCameraScale](gfx2_gfx2_manager$Gfx2Manager.md#setcamerascale)
- [setCameraTransform](gfx2_gfx2_manager$Gfx2Manager.md#setcameratransform)
- [update](gfx2_gfx2_manager$Gfx2Manager.md#update)

### Properties

- [bgColor](gfx2_gfx2_manager$Gfx2Manager.md#bgcolor)
- [cameraPosition](gfx2_gfx2_manager$Gfx2Manager.md#cameraposition)
- [cameraRotation](gfx2_gfx2_manager$Gfx2Manager.md#camerarotation)
- [cameraScale](gfx2_gfx2_manager$Gfx2Manager.md#camerascale)
- [cameraTransform](gfx2_gfx2_manager$Gfx2Manager.md#cameratransform)
- [canvas](gfx2_gfx2_manager$Gfx2Manager.md#canvas)
- [ctx](gfx2_gfx2_manager$Gfx2Manager.md#ctx)

### Constructors

- [constructor](gfx2_gfx2_manager$Gfx2Manager.md#constructor)

## Methods

### beginDrawing

▸ **beginDrawing**(): `void`

The "beginDrawing" function prepares the canvas for drawing by restoring the context, clearing the
canvas, setting the background color, and applying camera transformations.
Warning: You need to call this method before any draw calls.

#### Returns

`void`

___

### endDrawing

▸ **endDrawing**(): `void`

The "endDrawing" function restores the previous state of the canvas context.

#### Returns

`void`

___

### findCanvasPosFromClientPos

▸ **findCanvasPosFromClientPos**(`clientX`, `clientY`): [`vec2`](../modules/core_global.md#vec2)

The "findCanvasPosFromClientPos" function calculates the canvas position from the client's viewport position

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clientX` | `number` | The `clientX` parameter represents the horizontal coordinate (in pixels) of the mouse pointer relative to the client area of the browser window. |
| `clientY` | `number` | The `clientY` parameter represents the vertical coordinate (in pixels) of the mouse pointer relative to the client area of the browser window. |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

an array of two numbers, representing the x and y coordinates on the canvas.

___

### findWorldPosFromClientPos

▸ **findWorldPosFromClientPos**(`clientX`, `clientY`): [`vec2`](../modules/core_global.md#vec2)

The "findWorldPosFromClientPos" function calculates the world position from the client's viewport position by
taking care of the canvas dimensions and camera position.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clientX` | `number` | The clientX parameter represents the x-coordinate of the mouse or touch event relative to the client area of the browser window. |
| `clientY` | `number` | The `clientY` parameter represents the vertical coordinate (in pixels) of the mouse pointer relative to the client area of the browser window. |

#### Returns

[`vec2`](../modules/core_global.md#vec2)

an array of two numbers, representing the x and y coordinates on the canvas.

___

### getBgColor

▸ **getBgColor**(): [`vec4`](../modules/core_global.md#vec4)

The "getBgColor" function returns the background color.

#### Returns

[`vec4`](../modules/core_global.md#vec4)

The background color.

___

### getCameraPosition

▸ **getCameraPosition**(): [`vec2`](../modules/core_global.md#vec2)

The "getCameraPosition" function returns the camera position.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The camera position.

___

### getCameraPositionX

▸ **getCameraPositionX**(): `number`

The "getCameraPositionX" function returns the X coordinate of the camera position.

#### Returns

`number`

The X position of the camera.

___

### getCameraPositionY

▸ **getCameraPositionY**(): `number`

The "getCameraPositionY" function returns the Y coordinate of the camera position.

#### Returns

`number`

The Y position of the camera.

___

### getCameraRotation

▸ **getCameraRotation**(): `number`

The "getCameraRotation" function returns the camera rotation angle in radians.

#### Returns

`number`

The camera rotation angle in radians.

___

### getCameraScale

▸ **getCameraScale**(): [`vec2`](../modules/core_global.md#vec2)

The "getCameraScale" function returns the camera scale.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The camera scale.

___

### getCameraScaleX

▸ **getCameraScaleX**(): `number`

The "getCameraScaleX" function returns the camera scale factor on x-axis.

#### Returns

`number`

The x-axis camera scale factor.

___

### getCameraScaleY

▸ **getCameraScaleY**(): `number`

The "getCameraScaleY" function returns the camera scale factor on y-axis.

#### Returns

`number`

The y-axis camera scale factor.

___

### getCameraTransform

▸ **getCameraTransform**(): [`mat3`](../modules/core_global.md#mat3)

The "getCameraTransform" function returns the transformation matrix apply to the camera.

#### Returns

[`mat3`](../modules/core_global.md#mat3)

a mat3, which is a 3x3 matrix representing a transform matrix.

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

The client width of the canvas element.

___

### getContext

▸ **getContext**(): `CanvasRenderingContext2D`

The "getContext" function returns the 2D rendering context of the canvas element.

#### Returns

`CanvasRenderingContext2D`

the CanvasRenderingContext2D object.

___

### getDefaultTexture

▸ **getDefaultTexture**(): `HTMLImageElement`

The "getDefaultTexture" function returns a default HTMLImageElement.

#### Returns

`HTMLImageElement`

an HTMLImageElement.

___

### getHeight

▸ **getHeight**(): `number`

The "getHeight" function returns the height of the canvas.

#### Returns

`number`

The height of the canvas.

___

### getWidth

▸ **getWidth**(): `number`

The "getWidth" function returns the width of the canvas.

#### Returns

`number`

The width of the canvas element.

___

### moveCamera

▸ **moveCamera**(`x`, `y`): `void`

The "moveCamera" function move the camera.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The move in x-axis direction. |
| `y` | `number` | The move in y-axis direction. |

#### Returns

`void`

___

### setBgColor

▸ **setBgColor**(`r`, `g`, `b`, `a`): `void`

The "setBgColor" function sets the background color using the provided RGBA values (0 - 255).

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

### setCameraPosition

▸ **setCameraPosition**(`x`, `y`): `void`

The "setCameraPosition" function sets the camera position.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x-coordinate. |
| `y` | `number` | The y-coordinate. |

#### Returns

`void`

___

### setCameraRotation

▸ **setCameraRotation**(`cameraRotation`): `void`

The "setCameraRotation" function sets the rotation of the camera.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cameraRotation` | `number` | The `cameraRotation` parameter is the camera rotation angle in radians. |

#### Returns

`void`

___

### setCameraScale

▸ **setCameraScale**(`x`, `y`): `void`

The "setCameraScale" function sets the camera scale.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The `x` parameter represents the scale factor for the camera in the x-axis. |
| `y` | `number` | The `y` parameter represents the scale factor for the camera in the y-axis. |

#### Returns

`void`

___

### setCameraTransform

▸ **setCameraTransform**(`cameraTransform`): `void`

The "setCameraTransform" function add transformation matrix to the camera (before position/rotation/scale).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cameraTransform` | [`mat3`](../modules/core_global.md#mat3) | The `cameraTransform` parameter is a 3x3 matrix (mat3) that represents the transformation applied to the camera. |

#### Returns

`void`

___

### update

▸ **update**(`ts`): `void`

The "update" function is called during the update phase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The `ts` parameter stands for "timestep". |

#### Returns

`void`

## Properties

### bgColor

• **bgColor**: [`vec4`](../modules/core_global.md#vec4)

___

### cameraPosition

• **cameraPosition**: [`vec2`](../modules/core_global.md#vec2)

___

### cameraRotation

• **cameraRotation**: `number`

___

### cameraScale

• **cameraScale**: [`vec2`](../modules/core_global.md#vec2)

___

### cameraTransform

• **cameraTransform**: [`mat3`](../modules/core_global.md#mat3)

___

### canvas

• **canvas**: `HTMLCanvasElement`

___

### ctx

• **ctx**: `CanvasRenderingContext2D`

## Constructors

### constructor

• **new Gfx2Manager**()

The constructor.
