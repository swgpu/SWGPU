[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_jwm/gfx3\_jwm](../modules/gfx3_jwm_gfx3_jwm.md) / Gfx3JWM

# Class: Gfx3JWM

[gfx3_jwm/gfx3_jwm](../modules/gfx3_jwm_gfx3_jwm.md).Gfx3JWM

The `Gfx3JWM` is a class that represents a walkmesh and provides methods for loading
data, updating and drawing, adding and moving walkers, and clearing walkers.
In collision case, the collision response sliding along the edges of the walkmesh to keep a good
feeling for the player.

## Hierarchy

- [`Gfx3Transformable`](gfx3_gfx3_transformable$Gfx3Transformable.md)

  ↳ **`Gfx3JWM`**

## Table of contents

### Methods

- [$utilsCreatePoint](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#$utilscreatepoint)
- [$utilsFindLocationInfo](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#$utilsfindlocationinfo)
- [$utilsMove](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#$utilsmove)
- [addWalker](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#addwalker)
- [clearWalkers](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#clearwalkers)
- [draw](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#draw)
- [getLocalAxies](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getlocalaxies)
- [getPosition](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getposition)
- [getPositionX](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getpositionx)
- [getPositionY](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getpositiony)
- [getPositionZ](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getpositionz)
- [getRotation](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getrotation)
- [getRotationQuaternion](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getrotationquaternion)
- [getRotationX](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getrotationx)
- [getRotationY](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getrotationy)
- [getRotationZ](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getrotationz)
- [getScale](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getscale)
- [getScaleX](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getscalex)
- [getScaleY](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getscaley)
- [getScaleZ](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#getscalez)
- [getTransformMatrix](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#gettransformmatrix)
- [loadFromFile](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#loadfromfile)
- [moveWalker](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#movewalker)
- [rotate](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#rotate)
- [setPosition](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#setposition)
- [setRotation](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#setrotation)
- [setRotationQuaternion](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#setrotationquaternion)
- [setScale](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#setscale)
- [translate](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#translate)
- [update](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#update)
- [zoom](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#zoom)

### Properties

- [debugVertexCount](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#debugvertexcount)
- [debugVertices](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#debugvertices)
- [isTransformMatrixDirty](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#istransformmatrixdirty)
- [neighborPool](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#neighborpool)
- [position](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#position)
- [rotation](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#rotation)
- [scale](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#scale)
- [sectors](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#sectors)
- [sharedPool](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#sharedpool)
- [transformMatrix](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#transformmatrix)
- [walkers](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#walkers)

### Constructors

- [constructor](gfx3_jwm_gfx3_jwm$Gfx3JWM.md#constructor)

## Methods

### $utilsCreatePoint

▸ **$utilsCreatePoint**(`x`, `z`): `WalkerPoint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

`WalkerPoint`

___

### $utilsFindLocationInfo

▸ **$utilsFindLocationInfo**(`x`, `z`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `elev` | `number` |
| `sectorIndex` | `number` |

___

### $utilsMove

▸ **$utilsMove**(`sectorIndex`, `x`, `z`, `mx`, `mz`, `i?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `sectorIndex` | `number` | `undefined` |
| `x` | `number` | `undefined` |
| `z` | `number` | `undefined` |
| `mx` | `number` | `undefined` |
| `mz` | `number` | `undefined` |
| `i` | `number` | `0` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `elevation` | `number` |
| `mx` | `number` |
| `mz` | `number` |
| `sectorIndex` | `number` |

___

### addWalker

▸ **addWalker**(`id`, `x`, `z`, `radius`): `Walker`

The "addWalker" function adds a new walker identified by a unique identifier of your choice.
A walker is the representation of a moving entity inside a walkmesh context. It is a square
of `radius` size moving along the floor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | A unique identifier for the walker. |
| `x` | `number` | The x-coordinate of the walker's starting position. |
| `z` | `number` | The z-coordinate of the walker's starting position. |
| `radius` | `number` | The radius parameter represents the size of the walker. |

#### Returns

`Walker`

a Walker object.

___

### clearWalkers

▸ **clearWalkers**(): `void`

The "clearWalkers" function remove all walker instances.

#### Returns

`void`

___

### draw

▸ **draw**(): `void`

The "draw" function.

#### Returns

`void`

___

### getLocalAxies

▸ **getLocalAxies**(): [`vec3`](../modules/core_global.md#vec3)[]

The "getLocalAxies" function returns an array of three vectors representing the local axes of an
object based on its transformation matrix.

#### Returns

[`vec3`](../modules/core_global.md#vec3)[]

The three axis vector.

#### Inherited from

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

### loadFromFile

▸ **loadFromFile**(`path`): `Promise`<`void`\>

The "loadFromFile" function asynchronously loads walkmesh data from a json file (jwm).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The `path` parameter is the file path. |

#### Returns

`Promise`<`void`\>

___

### moveWalker

▸ **moveWalker**(`id`, `mx`, `mz`): [`vec3`](../modules/core_global.md#vec3)

The "moveWalker" function move the specified walker based on the provided movement values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The `id` parameter is a string that represents the unique identifier of the walker. |
| `mx` | `number` | The parameter `mx` represents the movement in the x-axis (horizontal movement) for the walker. |
| `mz` | `number` | The parameter `mz` represents the movement in the z-axis (vertical movement) for the walker. |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The projected move if walker collide on edges of the walkmesh, otherwise simply the original move.

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

#### Inherited from

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

#### Inherited from

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

#### Inherited from

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

#### Inherited from

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

#### Inherited from

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

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[translate](gfx3_gfx3_transformable$Gfx3Transformable.md#translate)

___

### update

▸ **update**(): `void`

The "update" function.

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

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[zoom](gfx3_gfx3_transformable$Gfx3Transformable.md#zoom)

## Properties

### debugVertexCount

• **debugVertexCount**: `number`

___

### debugVertices

• **debugVertices**: `number`[]

___

### isTransformMatrixDirty

• **isTransformMatrixDirty**: `boolean`

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[isTransformMatrixDirty](gfx3_gfx3_transformable$Gfx3Transformable.md#istransformmatrixdirty)

___

### neighborPool

• **neighborPool**: `Neighbor`[]

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

### sectors

• **sectors**: `Sector`[]

___

### sharedPool

• **sharedPool**: `Shared`[]

___

### transformMatrix

• **transformMatrix**: [`mat4`](../modules/core_global.md#mat4)

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[transformMatrix](gfx3_gfx3_transformable$Gfx3Transformable.md#transformmatrix)

___

### walkers

• **walkers**: `Walker`[]

## Constructors

### constructor

• **new Gfx3JWM**()

The constructor.

#### Overrides

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[constructor](gfx3_gfx3_transformable$Gfx3Transformable.md#constructor)
