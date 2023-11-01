[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ai/ai\_path\_grid](../modules/ai_ai_path_grid.md) / AIPathGrid3D

# Class: AIPathGrid3D

[ai/ai_path_grid](../modules/ai_ai_path_grid.md).AIPathGrid3D

## Hierarchy

- [`AIPathGrid`](ai_ai_path_grid$AIPathGrid.md)<[`vec3`](../modules/core_global.md#vec3)\>

  ↳ **`AIPathGrid3D`**

## Table of contents

### Methods

- [getDirections](ai_ai_path_grid$AIPathGrid3D.md#getdirections)
- [getValue](ai_ai_path_grid$AIPathGrid3D.md#getvalue)
- [isInside](ai_ai_path_grid$AIPathGrid3D.md#isinside)
- [isSame](ai_ai_path_grid$AIPathGrid3D.md#issame)
- [loadFromFile](ai_ai_path_grid$AIPathGrid3D.md#loadfromfile)

### Properties

- [grid](ai_ai_path_grid$AIPathGrid3D.md#grid)
- [size](ai_ai_path_grid$AIPathGrid3D.md#size)

### Constructors

- [constructor](ai_ai_path_grid$AIPathGrid3D.md#constructor)

## Methods

### getDirections

▸ **getDirections**(`a`, `b`): [`vec3`](../modules/core_global.md#vec3)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `b` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

[`vec3`](../modules/core_global.md#vec3)[]

#### Overrides

[AIPathGrid](ai_ai_path_grid$AIPathGrid.md).[getDirections](ai_ai_path_grid$AIPathGrid.md#getdirections)

___

### getValue

▸ **getValue**(`pos`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

`number`

#### Overrides

[AIPathGrid](ai_ai_path_grid$AIPathGrid.md).[getValue](ai_ai_path_grid$AIPathGrid.md#getvalue)

___

### isInside

▸ **isInside**(`pos`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

`boolean`

#### Overrides

[AIPathGrid](ai_ai_path_grid$AIPathGrid.md).[isInside](ai_ai_path_grid$AIPathGrid.md#isinside)

___

### isSame

▸ **isSame**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec3`](../modules/core_global.md#vec3) |
| `b` | [`vec3`](../modules/core_global.md#vec3) |

#### Returns

`boolean`

#### Overrides

[AIPathGrid](ai_ai_path_grid$AIPathGrid.md).[isSame](ai_ai_path_grid$AIPathGrid.md#issame)

___

### loadFromFile

▸ **loadFromFile**(`path`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[AIPathGrid](ai_ai_path_grid$AIPathGrid.md).[loadFromFile](ai_ai_path_grid$AIPathGrid.md#loadfromfile)

## Properties

### grid

• **grid**: `number`[]

#### Inherited from

[AIPathGrid](ai_ai_path_grid$AIPathGrid.md).[grid](ai_ai_path_grid$AIPathGrid.md#grid)

___

### size

• **size**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[AIPathGrid](ai_ai_path_grid$AIPathGrid.md).[size](ai_ai_path_grid$AIPathGrid.md#size)

## Constructors

### constructor

• **new AIPathGrid3D**(`size?`, `grid?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`vec3`](../modules/core_global.md#vec3) |
| `grid` | `number`[] |

#### Overrides

[AIPathGrid](ai_ai_path_grid$AIPathGrid.md).[constructor](ai_ai_path_grid$AIPathGrid.md#constructor)
