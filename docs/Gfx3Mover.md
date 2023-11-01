[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_mover/gfx3\_mover](../modules/gfx3_mover_gfx3_mover.md) / Gfx3Mover

# Class: Gfx3Mover

[gfx3_mover/gfx3_mover](../modules/gfx3_mover_gfx3_mover.md).Gfx3Mover

The `Gfx3Mover` class represents a mover object that can move a transformable target along a series of points.

## Table of contents

### Methods

- [draw](gfx3_mover_gfx3_mover$Gfx3Mover.md#draw)
- [loadFromData](gfx3_mover_gfx3_mover$Gfx3Mover.md#loadfromdata)
- [play](gfx3_mover_gfx3_mover$Gfx3Mover.md#play)
- [setTarget](gfx3_mover_gfx3_mover$Gfx3Mover.md#settarget)
- [update](gfx3_mover_gfx3_mover$Gfx3Mover.md#update)

### Properties

- [currentPointIndex](gfx3_mover_gfx3_mover$Gfx3Mover.md#currentpointindex)
- [debugVertexCount](gfx3_mover_gfx3_mover$Gfx3Mover.md#debugvertexcount)
- [debugVertices](gfx3_mover_gfx3_mover$Gfx3Mover.md#debugvertices)
- [finished](gfx3_mover_gfx3_mover$Gfx3Mover.md#finished)
- [looped](gfx3_mover_gfx3_mover$Gfx3Mover.md#looped)
- [points](gfx3_mover_gfx3_mover$Gfx3Mover.md#points)
- [speed](gfx3_mover_gfx3_mover$Gfx3Mover.md#speed)
- [target](gfx3_mover_gfx3_mover$Gfx3Mover.md#target)

### Constructors

- [constructor](gfx3_mover_gfx3_mover$Gfx3Mover.md#constructor)

## Methods

### draw

▸ **draw**(): `void`

The "draw" function.

#### Returns

`void`

___

### loadFromData

▸ **loadFromData**(`data`): `Promise`<`void`\>

The "loadFromData" function asynchronously loads mover data from a object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | The `data` parameter is the data object. |

#### Returns

`Promise`<`void`\>

___

### play

▸ **play**(): `void`

The "play" function start moving the transformable target across the points.

#### Returns

`void`

___

### setTarget

▸ **setTarget**(`target`): `void`

The "setTarget" function sets the transformable moving target.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`Gfx3Transformable`](gfx3_gfx3_transformable$Gfx3Transformable.md) | The target. |

#### Returns

`void`

___

### update

▸ **update**(`ts`): `void`

The "update" function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The `ts` parameter stands for "timestep". |

#### Returns

`void`

## Properties

### currentPointIndex

• **currentPointIndex**: `number`

___

### debugVertexCount

• **debugVertexCount**: `number`

___

### debugVertices

• **debugVertices**: `number`[]

___

### finished

• **finished**: `boolean`

___

### looped

• **looped**: `boolean`

___

### points

• **points**: [`vec3`](../modules/core_global.md#vec3)[]

___

### speed

• **speed**: `number`

___

### target

• **target**: ``null`` \| [`Gfx3Transformable`](gfx3_gfx3_transformable$Gfx3Transformable.md)

## Constructors

### constructor

• **new Gfx3Mover**()

The constructor.
