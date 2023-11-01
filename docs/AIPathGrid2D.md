[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ai/ai\_path\_grid](../modules/ai_ai_path_grid.md) / AIPathGrid2D

# Class: AIPathGrid2D

[ai/ai_path_grid](../modules/ai_ai_path_grid.md).AIPathGrid2D

## Hierarchy

- [`AIPathGrid`](ai_ai_path_grid$AIPathGrid.md)<[`vec2`](../modules/core_global.md#vec2)\>

  ↳ **`AIPathGrid2D`**

## Table of contents

### Methods

- [getDirections](ai_ai_path_grid$AIPathGrid2D.md#getdirections)
- [getValue](ai_ai_path_grid$AIPathGrid2D.md#getvalue)
- [isInside](ai_ai_path_grid$AIPathGrid2D.md#isinside)
- [isSame](ai_ai_path_grid$AIPathGrid2D.md#issame)
- [loadFromFile](ai_ai_path_grid$AIPathGrid2D.md#loadfromfile)

### Properties

- [grid](ai_ai_path_grid$AIPathGrid2D.md#grid)
- [size](ai_ai_path_grid$AIPathGrid2D.md#size)

### Constructors

- [constructor](ai_ai_path_grid$AIPathGrid2D.md#constructor)

## Methods

### getDirections

▸ **getDirections**(`a`, `b`): [`vec2`](../modules/core_global.md#vec2)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `b` | [`vec2`](../modules/core_global.md#vec2) |

#### Returns

[`vec2`](../modules/core_global.md#vec2)[]

#### Overrides

[AIPathGrid](ai_ai_path_grid$AIPathGrid.md).[getDirections](ai_ai_path_grid$AIPathGrid.md#getdirections)

___

### getValue

▸ **getValue**(`pos`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | [`vec2`](../modules/core_global.md#vec2) |

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
| `pos` | [`vec2`](../modules/core_global.md#vec2) |

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
| `a` | [`vec2`](../modules/core_global.md#vec2) |
| `b` | [`vec2`](../modules/core_global.md#vec2) |

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

• **size**: [`vec2`](../modules/core_global.md#vec2)

#### Inherited from

[AIPathGrid](ai_ai_path_grid$AIPathGrid.md).[size](ai_ai_path_grid$AIPathGrid.md#size)

## Constructors

### constructor

• **new AIPathGrid2D**(`size?`, `grid?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`vec2`](../modules/core_global.md#vec2) |
| `grid` | `number`[] |

#### Overrides

[AIPathGrid](ai_ai_path_grid$AIPathGrid.md).[constructor](ai_ai_path_grid$AIPathGrid.md#constructor)
