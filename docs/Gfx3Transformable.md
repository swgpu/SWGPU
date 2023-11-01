[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3/gfx3\_transformable](../modules/gfx3_gfx3_transformable.md) / Gfx3Transformable

# Class: Gfx3Transformable

[gfx3/gfx3_transformable](../modules/gfx3_gfx3_transformable.md).Gfx3Transformable

The `Gfx3Transformable` class represents an object with position, rotation, and scale properties, and
provides methods for manipulating and retrieving these properties.

## Hierarchy

- **`Gfx3Transformable`**

  ↳ [`Gfx3Drawable`](gfx3_gfx3_drawable$Gfx3Drawable.md)

  ↳ [`Gfx3Camera`](gfx3_camera_gfx3_camera$Gfx3Camera.md)

  ↳ [`Gfx3JWM`](gfx3_jwm_gfx3_jwm$Gfx3JWM.md)

## Table of contents

### Methods

- [getLocalAxies](gfx3_gfx3_transformable$Gfx3Transformable.md#getlocalaxies)
- [getPosition](gfx3_gfx3_transformable$Gfx3Transformable.md#getposition)
- [getPositionX](gfx3_gfx3_transformable$Gfx3Transformable.md#getpositionx)
- [getPositionY](gfx3_gfx3_transformable$Gfx3Transformable.md#getpositiony)
- [getPositionZ](gfx3_gfx3_transformable$Gfx3Transformable.md#getpositionz)
- [getRotation](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotation)
- [getRotationQuaternion](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotationquaternion)
- [getRotationX](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotationx)
- [getRotationY](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotationy)
- [getRotationZ](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotationz)
- [getScale](gfx3_gfx3_transformable$Gfx3Transformable.md#getscale)
- [getScaleX](gfx3_gfx3_transformable$Gfx3Transformable.md#getscalex)
- [getScaleY](gfx3_gfx3_transformable$Gfx3Transformable.md#getscaley)
- [getScaleZ](gfx3_gfx3_transformable$Gfx3Transformable.md#getscalez)
- [getTransformMatrix](gfx3_gfx3_transformable$Gfx3Transformable.md#gettransformmatrix)
- [rotate](gfx3_gfx3_transformable$Gfx3Transformable.md#rotate)
- [setPosition](gfx3_gfx3_transformable$Gfx3Transformable.md#setposition)
- [setRotation](gfx3_gfx3_transformable$Gfx3Transformable.md#setrotation)
- [setRotationQuaternion](gfx3_gfx3_transformable$Gfx3Transformable.md#setrotationquaternion)
- [setScale](gfx3_gfx3_transformable$Gfx3Transformable.md#setscale)
- [translate](gfx3_gfx3_transformable$Gfx3Transformable.md#translate)
- [zoom](gfx3_gfx3_transformable$Gfx3Transformable.md#zoom)

### Properties

- [isTransformMatrixDirty](gfx3_gfx3_transformable$Gfx3Transformable.md#istransformmatrixdirty)
- [position](gfx3_gfx3_transformable$Gfx3Transformable.md#position)
- [rotation](gfx3_gfx3_transformable$Gfx3Transformable.md#rotation)
- [scale](gfx3_gfx3_transformable$Gfx3Transformable.md#scale)
- [transformMatrix](gfx3_gfx3_transformable$Gfx3Transformable.md#transformmatrix)

### Constructors

- [constructor](gfx3_gfx3_transformable$Gfx3Transformable.md#constructor)

## Methods

### getLocalAxies

▸ **getLocalAxies**(): [`vec3`](../modules/core_global.md#vec3)[]

The "getLocalAxies" function returns an array of three vectors representing the local axes of an
object based on its transformation matrix.

#### Returns

[`vec3`](../modules/core_global.md#vec3)[]

The three axis vector.

___

### getPosition

▸ **getPosition**(): [`vec3`](../modules/core_global.md#vec3)

The "getPosition" function returns the position.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The position.

___

### getPositionX

▸ **getPositionX**(): `number`

The "getPositionX" function returns the x-coordinate of the position.

#### Returns

`number`

The X coordinate.

___

### getPositionY

▸ **getPositionY**(): `number`

The "getPositionY" function returns the y-coordinate of the position.

#### Returns

`number`

The Y coordinate.

___

### getPositionZ

▸ **getPositionZ**(): `number`

The "getPositionZ" function returns the z-coordinate of the position.

#### Returns

`number`

The Z coordinate.

___

### getRotation

▸ **getRotation**(): [`vec3`](../modules/core_global.md#vec3)

The "getRotation" function returns the rotation as Euler angles.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The rotation Euler angles (radians).

___

### getRotationQuaternion

▸ **getRotationQuaternion**(): [`vec4`](../modules/core_global.md#vec4)

The "getRotationQuaternion" function returns the Quaternion based on the Euler angles provided.

#### Returns

[`vec4`](../modules/core_global.md#vec4)

A quaternion.

___

### getRotationX

▸ **getRotationX**(): `number`

The "getRotationX" function returns the rotation angle on x-axis.

#### Returns

`number`

The rotation angle on x-axis.

___

### getRotationY

▸ **getRotationY**(): `number`

The "getRotationY" function returns the rotation angle on y-axis.

#### Returns

`number`

The rotation angle on y-axis.

___

### getRotationZ

▸ **getRotationZ**(): `number`

The "getRotationZ" function returns the rotation angle on z-axis.

#### Returns

`number`

The rotation angle on z-axis.

___

### getScale

▸ **getScale**(): [`vec3`](../modules/core_global.md#vec3)

The "getScale" function returns the scale as a 3D vector.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The scale.

___

### getScaleX

▸ **getScaleX**(): `number`

The "getScaleX" function returns the scale factor on x-axis.

#### Returns

`number`

The x-axis scale factor.

___

### getScaleY

▸ **getScaleY**(): `number`

The "getScaleY" function returns the scale factor on y-axis.

#### Returns

`number`

The y-axis scale factor.

___

### getScaleZ

▸ **getScaleZ**(): `number`

The "getScaleZ" function returns the scale factor on z-axis.

#### Returns

`number`

The z-axis scale factor.

___

### getTransformMatrix

▸ **getTransformMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getTransformMatrix" function returns the transform matrix from position, rotation and scale values.

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The transform matrix.

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

## Properties

### isTransformMatrixDirty

• **isTransformMatrixDirty**: `boolean`

___

### position

• **position**: [`vec3`](../modules/core_global.md#vec3)

___

### rotation

• **rotation**: [`vec3`](../modules/core_global.md#vec3)

___

### scale

• **scale**: [`vec3`](../modules/core_global.md#vec3)

___

### transformMatrix

• **transformMatrix**: [`mat4`](../modules/core_global.md#mat4)

## Constructors

### constructor

• **new Gfx3Transformable**()

The constructor.
