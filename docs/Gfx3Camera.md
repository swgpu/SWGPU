[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_camera/gfx3\_camera](../modules/gfx3_camera_gfx3_camera.md) / Gfx3Camera

# Class: Gfx3Camera

[gfx3_camera/gfx3_camera](../modules/gfx3_camera_gfx3_camera.md).Gfx3Camera

The `Gfx3Camera` class represents a camera in a 3D graphics system and provides methods for setting
its position, rotation, scale, and view, as well as for performing translations, rotations, zooming,
and looking at specific coordinates.

## Hierarchy

- [`Gfx3Transformable`](gfx3_gfx3_transformable$Gfx3Transformable.md)

  ↳ **`Gfx3Camera`**

## Table of contents

### Methods

- [changeView](gfx3_camera_gfx3_camera$Gfx3Camera.md#changeview)
- [getCameraMatrix](gfx3_camera_gfx3_camera$Gfx3Camera.md#getcameramatrix)
- [getLocalAxies](gfx3_camera_gfx3_camera$Gfx3Camera.md#getlocalaxies)
- [getPosition](gfx3_camera_gfx3_camera$Gfx3Camera.md#getposition)
- [getPositionX](gfx3_camera_gfx3_camera$Gfx3Camera.md#getpositionx)
- [getPositionY](gfx3_camera_gfx3_camera$Gfx3Camera.md#getpositiony)
- [getPositionZ](gfx3_camera_gfx3_camera$Gfx3Camera.md#getpositionz)
- [getRotation](gfx3_camera_gfx3_camera$Gfx3Camera.md#getrotation)
- [getRotationQuaternion](gfx3_camera_gfx3_camera$Gfx3Camera.md#getrotationquaternion)
- [getRotationX](gfx3_camera_gfx3_camera$Gfx3Camera.md#getrotationx)
- [getRotationY](gfx3_camera_gfx3_camera$Gfx3Camera.md#getrotationy)
- [getRotationZ](gfx3_camera_gfx3_camera$Gfx3Camera.md#getrotationz)
- [getScale](gfx3_camera_gfx3_camera$Gfx3Camera.md#getscale)
- [getScaleX](gfx3_camera_gfx3_camera$Gfx3Camera.md#getscalex)
- [getScaleY](gfx3_camera_gfx3_camera$Gfx3Camera.md#getscaley)
- [getScaleZ](gfx3_camera_gfx3_camera$Gfx3Camera.md#getscalez)
- [getTransformMatrix](gfx3_camera_gfx3_camera$Gfx3Camera.md#gettransformmatrix)
- [lookAt](gfx3_camera_gfx3_camera$Gfx3Camera.md#lookat)
- [rotate](gfx3_camera_gfx3_camera$Gfx3Camera.md#rotate)
- [setPosition](gfx3_camera_gfx3_camera$Gfx3Camera.md#setposition)
- [setRotation](gfx3_camera_gfx3_camera$Gfx3Camera.md#setrotation)
- [setRotationQuaternion](gfx3_camera_gfx3_camera$Gfx3Camera.md#setrotationquaternion)
- [setScale](gfx3_camera_gfx3_camera$Gfx3Camera.md#setscale)
- [translate](gfx3_camera_gfx3_camera$Gfx3Camera.md#translate)
- [zoom](gfx3_camera_gfx3_camera$Gfx3Camera.md#zoom)

### Properties

- [isTransformMatrixDirty](gfx3_camera_gfx3_camera$Gfx3Camera.md#istransformmatrixdirty)
- [position](gfx3_camera_gfx3_camera$Gfx3Camera.md#position)
- [rotation](gfx3_camera_gfx3_camera$Gfx3Camera.md#rotation)
- [scale](gfx3_camera_gfx3_camera$Gfx3Camera.md#scale)
- [transformMatrix](gfx3_camera_gfx3_camera$Gfx3Camera.md#transformmatrix)
- [view](gfx3_camera_gfx3_camera$Gfx3Camera.md#view)

### Constructors

- [constructor](gfx3_camera_gfx3_camera$Gfx3Camera.md#constructor)

## Methods

### changeView

▸ **changeView**(`viewIndex`): `void`

The "changeView" function attach camera to another view.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `viewIndex` | `number` | The index of the view you want to change to. |

#### Returns

`void`

___

### getCameraMatrix

▸ **getCameraMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getCameraMatrix" function returns the camera matrix of the view.

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The camera matrix.

___

### getLocalAxies

▸ **getLocalAxies**(): [`vec3`](../modules/core_global.md#vec3)[]

The "getLocalAxies" function returns an array of three vectors representing the local axes of an
object based on its transformation matrix.

#### Returns

[`vec3`](../modules/core_global.md#vec3)[]

The three axis vector.

#### Overrides

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getLocalAxies](gfx3_gfx3_transformable$Gfx3Transformable.md#getlocalaxies)

___

### getPosition

▸ **getPosition**(): [`vec3`](../modules/core_global.md#vec3)

The "getPosition" function returns the position.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The position.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getPosition](gfx3_gfx3_transformable$Gfx3Transformable.md#getposition)

___

### getPositionX

▸ **getPositionX**(): `number`

The "getPositionX" function returns the x-coordinate of the position.

#### Returns

`number`

The X coordinate.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getPositionX](gfx3_gfx3_transformable$Gfx3Transformable.md#getpositionx)

___

### getPositionY

▸ **getPositionY**(): `number`

The "getPositionY" function returns the y-coordinate of the position.

#### Returns

`number`

The Y coordinate.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getPositionY](gfx3_gfx3_transformable$Gfx3Transformable.md#getpositiony)

___

### getPositionZ

▸ **getPositionZ**(): `number`

The "getPositionZ" function returns the z-coordinate of the position.

#### Returns

`number`

The Z coordinate.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getPositionZ](gfx3_gfx3_transformable$Gfx3Transformable.md#getpositionz)

___

### getRotation

▸ **getRotation**(): [`vec3`](../modules/core_global.md#vec3)

The "getRotation" function returns the rotation as Euler angles.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The rotation Euler angles (radians).

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getRotation](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotation)

___

### getRotationQuaternion

▸ **getRotationQuaternion**(): [`vec4`](../modules/core_global.md#vec4)

The "getRotationQuaternion" function returns the Quaternion based on the Euler angles provided.

#### Returns

[`vec4`](../modules/core_global.md#vec4)

A quaternion.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getRotationQuaternion](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotationquaternion)

___

### getRotationX

▸ **getRotationX**(): `number`

The "getRotationX" function returns the rotation angle on x-axis.

#### Returns

`number`

The rotation angle on x-axis.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getRotationX](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotationx)

___

### getRotationY

▸ **getRotationY**(): `number`

The "getRotationY" function returns the rotation angle on y-axis.

#### Returns

`number`

The rotation angle on y-axis.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getRotationY](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotationy)

___

### getRotationZ

▸ **getRotationZ**(): `number`

The "getRotationZ" function returns the rotation angle on z-axis.

#### Returns

`number`

The rotation angle on z-axis.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getRotationZ](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotationz)

___

### getScale

▸ **getScale**(): [`vec3`](../modules/core_global.md#vec3)

The "getScale" function returns the scale as a 3D vector.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The scale.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getScale](gfx3_gfx3_transformable$Gfx3Transformable.md#getscale)

___

### getScaleX

▸ **getScaleX**(): `number`

The "getScaleX" function returns the scale factor on x-axis.

#### Returns

`number`

The x-axis scale factor.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getScaleX](gfx3_gfx3_transformable$Gfx3Transformable.md#getscalex)

___

### getScaleY

▸ **getScaleY**(): `number`

The "getScaleY" function returns the scale factor on y-axis.

#### Returns

`number`

The y-axis scale factor.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getScaleY](gfx3_gfx3_transformable$Gfx3Transformable.md#getscaley)

___

### getScaleZ

▸ **getScaleZ**(): `number`

The "getScaleZ" function returns the scale factor on z-axis.

#### Returns

`number`

The z-axis scale factor.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getScaleZ](gfx3_gfx3_transformable$Gfx3Transformable.md#getscalez)

___

### getTransformMatrix

▸ **getTransformMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getTransformMatrix" function returns the transform matrix from position, rotation and scale values.

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The transform matrix.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getTransformMatrix](gfx3_gfx3_transformable$Gfx3Transformable.md#gettransformmatrix)

___

### lookAt

▸ **lookAt**(`x`, `y`, `z`): `void`

The "lookAt" function sets the camera matrix to position the camera at the specified coordinates and
look towards them.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x-coordinate of the target position that the camera should look at. |
| `y` | `number` | The y-coordinate of the target position that the camera should look at. |
| `z` | `number` | The z-coordinate of the target position that the camera should look at. |

#### Returns

`void`

___

### rotate

▸ **rotate**(`x`, `y`, `z`): `void`

The "rotate" function add rotation values to Euler angles.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The rotation angle on x-axis in radians. |
| `y` | `number` | The rotation angle on y-axis in radians. |
| `z` | `number` | The rotation angle on z-axis in radians. |

#### Returns

`void`

#### Overrides

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[rotate](gfx3_gfx3_transformable$Gfx3Transformable.md#rotate)

___

### setPosition

▸ **setPosition**(`x`, `y`, `z`): `void`

The "setPosition" function set the position with the given x, y and z coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The X coordinate of the position. |
| `y` | `number` | The Y coordinate of the position. |
| `z` | `number` | The Z coordinate of the position. |

#### Returns

`void`

#### Overrides

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[setPosition](gfx3_gfx3_transformable$Gfx3Transformable.md#setposition)

___

### setRotation

▸ **setRotation**(`x`, `y`, `z`): `void`

The "setRotation" function sets rotation Euler angles (in radians).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The rotation angle on x-axis in radians. |
| `y` | `number` | The rotation angle on y-axis in radians. |
| `z` | `number` | The rotation angle on z-axis in radians. |

#### Returns

`void`

#### Overrides

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[setRotation](gfx3_gfx3_transformable$Gfx3Transformable.md#setrotation)

___

### setRotationQuaternion

▸ **setRotationQuaternion**(`quaternion`): `void`

The "setRotationQuaternion" function sets the rotation using Quaternion.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quaternion` | [`vec4`](../modules/core_global.md#vec4) | The quaternion. |

#### Returns

`void`

#### Overrides

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[setRotationQuaternion](gfx3_gfx3_transformable$Gfx3Transformable.md#setrotationquaternion)

___

### setScale

▸ **setScale**(`x`, `y`, `z`): `void`

The "setScale" function sets the scale with the given x, y and z factors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x factor in the x-axis direction. |
| `y` | `number` | The y factor in the y-axis direction. |
| `z` | `number` | The z factor in the z-axis direction. |

#### Returns

`void`

#### Overrides

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[setScale](gfx3_gfx3_transformable$Gfx3Transformable.md#setscale)

___

### translate

▸ **translate**(`x`, `y`, `z`): `void`

The "translate" function translate the position.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The amount of translation in the x-axis direction. |
| `y` | `number` | The amount of translation in the y-axis direction. |
| `z` | `number` | The amount of translation in the z-axis direction. |

#### Returns

`void`

#### Overrides

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[translate](gfx3_gfx3_transformable$Gfx3Transformable.md#translate)

___

### zoom

▸ **zoom**(`x`, `y`, `z`): `void`

The "zoom" function add scale values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x factor in the x-axis direction. |
| `y` | `number` | The y factor in the y-axis direction. |
| `z` | `number` | The z factor in the z-axis direction. |

#### Returns

`void`

#### Overrides

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[zoom](gfx3_gfx3_transformable$Gfx3Transformable.md#zoom)

## Properties

### isTransformMatrixDirty

• **isTransformMatrixDirty**: `boolean`

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[isTransformMatrixDirty](gfx3_gfx3_transformable$Gfx3Transformable.md#istransformmatrixdirty)

___

### position

• **position**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[position](gfx3_gfx3_transformable$Gfx3Transformable.md#position)

___

### rotation

• **rotation**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[rotation](gfx3_gfx3_transformable$Gfx3Transformable.md#rotation)

___

### scale

• **scale**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[scale](gfx3_gfx3_transformable$Gfx3Transformable.md#scale)

___

### transformMatrix

• **transformMatrix**: [`mat4`](../modules/core_global.md#mat4)

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[transformMatrix](gfx3_gfx3_transformable$Gfx3Transformable.md#transformmatrix)

___

### view

• **view**: [`Gfx3View`](gfx3_gfx3_view$Gfx3View.md)

## Constructors

### constructor

• **new Gfx3Camera**(`viewIndex`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `viewIndex` | `number` | The `viewIndex` is the index of the view you want to bind the camera. |

#### Overrides

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[constructor](gfx3_gfx3_transformable$Gfx3Transformable.md#constructor)
