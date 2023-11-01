[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ai/ai\_path\_graph](../modules/ai_ai_path_graph.md) / AIPathGraph3D

# Class: AIPathGraph3D

[ai/ai_path_graph](../modules/ai_ai_path_graph.md).AIPathGraph3D

## Hierarchy

- [`AIPathGraph`](ai_ai_path_graph$AIPathGraph.md)<[`vec3`](../modules/core_global.md#vec3)\>

  ↳ **`AIPathGraph3D`**

## Table of contents

### Methods

- [addNode](ai_ai_path_graph$AIPathGraph3D.md#addnode)
- [findNode](ai_ai_path_graph$AIPathGraph3D.md#findnode)
- [findNodes](ai_ai_path_graph$AIPathGraph3D.md#findnodes)
- [getDistance](ai_ai_path_graph$AIPathGraph3D.md#getdistance)
- [getNode](ai_ai_path_graph$AIPathGraph3D.md#getnode)
- [loadFromFile](ai_ai_path_graph$AIPathGraph3D.md#loadfromfile)
- [removeNode](ai_ai_path_graph$AIPathGraph3D.md#removenode)
- [removeNodeRelation](ai_ai_path_graph$AIPathGraph3D.md#removenoderelation)
- [reset](ai_ai_path_graph$AIPathGraph3D.md#reset)
- [setNodeProperties](ai_ai_path_graph$AIPathGraph3D.md#setnodeproperties)

### Properties

- [nodes](ai_ai_path_graph$AIPathGraph3D.md#nodes)

### Constructors

- [constructor](ai_ai_path_graph$AIPathGraph3D.md#constructor)

## Methods

### addNode

▸ **addNode**(`nid`, `node`, `biRelations?`): [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `nid` | `string` | `undefined` |
| `node` | [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\> | `undefined` |
| `biRelations` | `boolean` | `true` |

#### Returns

[`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\>

#### Inherited from

[AIPathGraph](ai_ai_path_graph$AIPathGraph.md).[addNode](ai_ai_path_graph$AIPathGraph.md#addnode)

___

### findNode

▸ **findNode**(`predicateFn`): ``null`` \| [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicateFn` | `Function` |

#### Returns

``null`` \| [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\>

#### Inherited from

[AIPathGraph](ai_ai_path_graph$AIPathGraph.md).[findNode](ai_ai_path_graph$AIPathGraph.md#findnode)

___

### findNodes

▸ **findNodes**(`predicateFn`): [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicateFn` | `Function` |

#### Returns

[`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\>[]

#### Inherited from

[AIPathGraph](ai_ai_path_graph$AIPathGraph.md).[findNodes](ai_ai_path_graph$AIPathGraph.md#findnodes)

___

### getDistance

▸ **getDistance**(`a`, `b`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\> |
| `b` | [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\> |

#### Returns

`number`

#### Overrides

[AIPathGraph](ai_ai_path_graph$AIPathGraph.md).[getDistance](ai_ai_path_graph$AIPathGraph.md#getdistance)

___

### getNode

▸ **getNode**(`nid`): [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `nid` | `string` |

#### Returns

[`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\>

#### Inherited from

[AIPathGraph](ai_ai_path_graph$AIPathGraph.md).[getNode](ai_ai_path_graph$AIPathGraph.md#getnode)

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

[AIPathGraph](ai_ai_path_graph$AIPathGraph.md).[loadFromFile](ai_ai_path_graph$AIPathGraph.md#loadfromfile)

___

### removeNode

▸ **removeNode**(`nid`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nid` | `string` |

#### Returns

`void`

#### Inherited from

[AIPathGraph](ai_ai_path_graph$AIPathGraph.md).[removeNode](ai_ai_path_graph$AIPathGraph.md#removenode)

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

#### Inherited from

[AIPathGraph](ai_ai_path_graph$AIPathGraph.md).[removeNodeRelation](ai_ai_path_graph$AIPathGraph.md#removenoderelation)

___

### reset

▸ **reset**(): `void`

#### Returns

`void`

#### Inherited from

[AIPathGraph](ai_ai_path_graph$AIPathGraph.md).[reset](ai_ai_path_graph$AIPathGraph.md#reset)

___

### setNodeProperties

▸ **setNodeProperties**(`nid`, `properties`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nid` | `string` |
| `properties` | `Partial`<[`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\>\> |

#### Returns

`void`

#### Inherited from

[AIPathGraph](ai_ai_path_graph$AIPathGraph.md).[setNodeProperties](ai_ai_path_graph$AIPathGraph.md#setnodeproperties)

## Properties

### nodes

• **nodes**: `Map`<`string`, [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\>\>

#### Inherited from

[AIPathGraph](ai_ai_path_graph$AIPathGraph.md).[nodes](ai_ai_path_graph$AIPathGraph.md#nodes)

## Constructors

### constructor

• **new AIPathGraph3D**(`nodes`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `Map`<`string`, [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<[`vec3`](../modules/core_global.md#vec3)\>\> |

#### Overrides

[AIPathGraph](ai_ai_path_graph$AIPathGraph.md).[constructor](ai_ai_path_graph$AIPathGraph.md#constructor)
