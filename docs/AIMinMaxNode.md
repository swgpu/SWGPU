[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ai/ai\_minmax\_tree](../modules/ai_ai_minmax_tree.md) / AIMinMaxNode

# Class: AIMinMaxNode

[ai/ai_minmax_tree](../modules/ai_ai_minmax_tree.md).AIMinMaxNode

## Hierarchy

- [`AIMinMaxTreeAbstract`](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md)

  ↳ **`AIMinMaxNode`**

## Table of contents

### Methods

- [addChild](ai_ai_minmax_tree$AIMinMaxNode.md#addchild)
- [getChildren](ai_ai_minmax_tree$AIMinMaxNode.md#getchildren)
- [getData](ai_ai_minmax_tree$AIMinMaxNode.md#getdata)
- [getValue](ai_ai_minmax_tree$AIMinMaxNode.md#getvalue)
- [isVisited](ai_ai_minmax_tree$AIMinMaxNode.md#isvisited)
- [setData](ai_ai_minmax_tree$AIMinMaxNode.md#setdata)
- [setValue](ai_ai_minmax_tree$AIMinMaxNode.md#setvalue)
- [setVisited](ai_ai_minmax_tree$AIMinMaxNode.md#setvisited)

### Properties

- [children](ai_ai_minmax_tree$AIMinMaxNode.md#children)
- [data](ai_ai_minmax_tree$AIMinMaxNode.md#data)
- [value](ai_ai_minmax_tree$AIMinMaxNode.md#value)
- [visited](ai_ai_minmax_tree$AIMinMaxNode.md#visited)

### Constructors

- [constructor](ai_ai_minmax_tree$AIMinMaxNode.md#constructor)

## Methods

### addChild

▸ **addChild**(`child`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `child` | [`AIMinMaxTreeAbstract`](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md) |

#### Returns

`void`

___

### getChildren

▸ **getChildren**(): [`AIMinMaxTreeAbstract`](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md)[]

#### Returns

[`AIMinMaxTreeAbstract`](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md)[]

___

### getData

▸ **getData**(): `any`

#### Returns

`any`

#### Inherited from

[AIMinMaxTreeAbstract](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md).[getData](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md#getdata)

___

### getValue

▸ **getValue**(): `number`

#### Returns

`number`

#### Inherited from

[AIMinMaxTreeAbstract](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md).[getValue](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md#getvalue)

___

### isVisited

▸ **isVisited**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[AIMinMaxTreeAbstract](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md).[isVisited](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md#isvisited)

___

### setData

▸ **setData**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`void`

#### Inherited from

[AIMinMaxTreeAbstract](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md).[setData](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md#setdata)

___

### setValue

▸ **setValue**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

[AIMinMaxTreeAbstract](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md).[setValue](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md#setvalue)

___

### setVisited

▸ **setVisited**(`visited`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `visited` | `boolean` |

#### Returns

`void`

#### Inherited from

[AIMinMaxTreeAbstract](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md).[setVisited](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md#setvisited)

## Properties

### children

• **children**: [`AIMinMaxTreeAbstract`](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md)[]

___

### data

• **data**: `any`

#### Inherited from

[AIMinMaxTreeAbstract](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md).[data](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md#data)

___

### value

• **value**: `number`

#### Inherited from

[AIMinMaxTreeAbstract](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md).[value](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md#value)

___

### visited

• **visited**: `boolean`

#### Inherited from

[AIMinMaxTreeAbstract](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md).[visited](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md#visited)

## Constructors

### constructor

• **new AIMinMaxNode**(`children?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `children` | [`AIMinMaxTreeAbstract`](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md)[] | `[]` |

#### Overrides

[AIMinMaxTreeAbstract](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md).[constructor](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md#constructor)
