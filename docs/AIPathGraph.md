[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ai/ai\_path\_graph](../modules/ai_ai_path_graph.md) / AIPathGraph

# Class: AIPathGraph<T\>

[ai/ai_path_graph](../modules/ai_ai_path_graph.md).AIPathGraph

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`AIPathGraph`**

  ↳ [`AIPathGraph2D`](ai_ai_path_graph$AIPathGraph2D.md)

  ↳ [`AIPathGraph3D`](ai_ai_path_graph$AIPathGraph3D.md)

## Table of contents

### Methods

- [addNode](ai_ai_path_graph$AIPathGraph.md#addnode)
- [findNode](ai_ai_path_graph$AIPathGraph.md#findnode)
- [findNodes](ai_ai_path_graph$AIPathGraph.md#findnodes)
- [getDistance](ai_ai_path_graph$AIPathGraph.md#getdistance)
- [getNode](ai_ai_path_graph$AIPathGraph.md#getnode)
- [loadFromFile](ai_ai_path_graph$AIPathGraph.md#loadfromfile)
- [removeNode](ai_ai_path_graph$AIPathGraph.md#removenode)
- [removeNodeRelation](ai_ai_path_graph$AIPathGraph.md#removenoderelation)
- [reset](ai_ai_path_graph$AIPathGraph.md#reset)
- [setNodeProperties](ai_ai_path_graph$AIPathGraph.md#setnodeproperties)

### Properties

- [nodes](ai_ai_path_graph$AIPathGraph.md#nodes)

### Constructors

- [constructor](ai_ai_path_graph$AIPathGraph.md#constructor)

## Methods

### addNode

▸ **addNode**(`nid`, `node`, `biRelations?`): [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `nid` | `string` | `undefined` |
| `node` | [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\> | `undefined` |
| `biRelations` | `boolean` | `true` |

#### Returns

[`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\>

___

### findNode

▸ **findNode**(`predicateFn`): ``null`` \| [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicateFn` | `Function` |

#### Returns

``null`` \| [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\>

___

### findNodes

▸ **findNodes**(`predicateFn`): [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicateFn` | `Function` |

#### Returns

[`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\>[]

___

### getDistance

▸ `Abstract` **getDistance**(`a`, `b`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\> |
| `b` | [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\> |

#### Returns

`number`

___

### getNode

▸ **getNode**(`nid`): [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `nid` | `string` |

#### Returns

[`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\>

___

### loadFromFile

▸ **loadFromFile**(`path`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Promise`<`void`\>

___

### removeNode

▸ **removeNode**(`nid`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nid` | `string` |

#### Returns

`void`

___

### removeNodeRelation

▸ **removeNodeRelation**(`nid`, `cnid`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nid` | `string` |
| `cnid` | `string` |

#### Returns

`void`

___

### reset

▸ **reset**(): `void`

#### Returns

`void`

___

### setNodeProperties

▸ **setNodeProperties**(`nid`, `properties`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nid` | `string` |
| `properties` | `Partial`<[`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\>\> |

#### Returns

`void`

## Properties

### nodes

• **nodes**: `Map`<`string`, [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\>\>

## Constructors

### constructor

• **new AIPathGraph**<`T`\>(`nodes?`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `Map`<`string`, [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\>\> |
