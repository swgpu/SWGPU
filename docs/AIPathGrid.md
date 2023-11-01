[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ai/ai\_path\_grid](../modules/ai_ai_path_grid.md) / AIPathGrid

# Class: AIPathGrid<T\>

[ai/ai_path_grid](../modules/ai_ai_path_grid.md).AIPathGrid

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`vec2`](../modules/core_global.md#vec2) \| [`vec3`](../modules/core_global.md#vec3) |

## Hierarchy

- **`AIPathGrid`**

  ↳ [`AIPathGrid2D`](ai_ai_path_grid$AIPathGrid2D.md)

  ↳ [`AIPathGrid3D`](ai_ai_path_grid$AIPathGrid3D.md)

## Table of contents

### Methods

- [getDirections](ai_ai_path_grid$AIPathGrid.md#getdirections)
- [getValue](ai_ai_path_grid$AIPathGrid.md#getvalue)
- [isInside](ai_ai_path_grid$AIPathGrid.md#isinside)
- [isSame](ai_ai_path_grid$AIPathGrid.md#issame)
- [loadFromFile](ai_ai_path_grid$AIPathGrid.md#loadfromfile)

### Properties

- [grid](ai_ai_path_grid$AIPathGrid.md#grid)
- [size](ai_ai_path_grid$AIPathGrid.md#size)

### Constructors

- [constructor](ai_ai_path_grid$AIPathGrid.md#constructor)

## Methods

### getDirections

▸ `Abstract` **getDirections**(`a`, `b`): `T`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |
| `b` | `T` |

#### Returns

`T`[]

___

### getValue

▸ `Abstract` **getValue**(`pos`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `T` |

#### Returns

`number`

___

### isInside

▸ `Abstract` **isInside**(`pos`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `T` |

#### Returns

`boolean`

___

### isSame

▸ `Abstract` **isSame**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |
| `b` | `T` |

#### Returns

`boolean`

___

### loadFromFile

▸ **loadFromFile**(`path`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Promise`<`void`\>

## Properties

### grid

• **grid**: `number`[]

___

### size

• **size**: `T`

## Constructors

### constructor

• **new AIPathGrid**<`T`\>(`size`, `grid?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Float32Array` \| `Uint32Array` \| [`number`, `number`] \| [`number`, `number`, `number`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `T` |
| `grid` | `number`[] |
