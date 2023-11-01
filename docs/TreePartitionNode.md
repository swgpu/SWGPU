[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [core/tree\_partition](../modules/core_tree_partition.md) / TreePartitionNode

# Class: TreePartitionNode<T\>

[core/tree_partition](../modules/core_tree_partition.md).TreePartitionNode

The `TreePartitionNode` class represents a generic node in a binary tree partition data structure, which can be used
to organize and search for objects of type T.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The object type. |

## Table of contents

### Methods

- [addChild](core_tree_partition$TreePartitionNode.md#addchild)
- [createSubNodes](core_tree_partition$TreePartitionNode.md#createsubnodes)
- [getChildren](core_tree_partition$TreePartitionNode.md#getchildren)
- [getDepth](core_tree_partition$TreePartitionNode.md#getdepth)
- [getLeft](core_tree_partition$TreePartitionNode.md#getleft)
- [getMethod](core_tree_partition$TreePartitionNode.md#getmethod)
- [getRight](core_tree_partition$TreePartitionNode.md#getright)
- [reset](core_tree_partition$TreePartitionNode.md#reset)
- [search](core_tree_partition$TreePartitionNode.md#search)
- [setDepth](core_tree_partition$TreePartitionNode.md#setdepth)

### Properties

- [children](core_tree_partition$TreePartitionNode.md#children)
- [depth](core_tree_partition$TreePartitionNode.md#depth)
- [left](core_tree_partition$TreePartitionNode.md#left)
- [method](core_tree_partition$TreePartitionNode.md#method)
- [parent](core_tree_partition$TreePartitionNode.md#parent)
- [right](core_tree_partition$TreePartitionNode.md#right)
- [tree](core_tree_partition$TreePartitionNode.md#tree)

### Constructors

- [constructor](core_tree_partition$TreePartitionNode.md#constructor)

## Methods

### addChild

▸ **addChild**(`object`): `void`

The "addChild" function adds an object to the tree node's children, creating subnodes if maxChildren is exceeded.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | The parameter "object" is of type T, which means it can be any type of object. |

#### Returns

`void`

___

### createSubNodes

▸ **createSubNodes**(): `void`

The "createSubNodes" function split and move children in two sub-nodes.

#### Returns

`void`

___

### getChildren

▸ **getChildren**(): `T`[]

The "getChildren" function returns children of the node.

#### Returns

`T`[]

An array of type T, which represents the children of the node.

___

### getDepth

▸ **getDepth**(): `number`

The "getDepth" function returns the depth of the node.

#### Returns

`number`

The depth.

___

### getLeft

▸ **getLeft**(): ``null`` \| [`TreePartitionNode`](core_tree_partition$TreePartitionNode.md)<`T`\>

The "getLeft" function returns the left node.

#### Returns

``null`` \| [`TreePartitionNode`](core_tree_partition$TreePartitionNode.md)<`T`\>

The method is returning the left node or null.

___

### getMethod

▸ **getMethod**(): [`ITreePartitionMethod`](../interfaces/core_tree_partition$ITreePartitionMethod.md)<`T`\>

The "getMethod" function returns the tree partition method used.

#### Returns

[`ITreePartitionMethod`](../interfaces/core_tree_partition$ITreePartitionMethod.md)<`T`\>

The method being returned is of type ITreePartitionMethod<T>.

___

### getRight

▸ **getRight**(): ``null`` \| [`TreePartitionNode`](core_tree_partition$TreePartitionNode.md)<`T`\>

The "getRight" function returns the right node.

#### Returns

``null`` \| [`TreePartitionNode`](core_tree_partition$TreePartitionNode.md)<`T`\>

The method is returning the right node or null.

___

### reset

▸ **reset**(): `void`

The "reset" function clear the node.

#### Returns

`void`

___

### search

▸ **search**(`...params`): `T`[]

The search function call the search's method and return matching objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...params` | `any`[] | The `params` parameter in the `search` method. |

#### Returns

`T`[]

An array of type T.

___

### setDepth

▸ **setDepth**(`depth`): `void`

The "setDepth" function sets the depth node to a specified value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `depth` | `number` | The depth parameter is a number that represents the depth of the node. |

#### Returns

`void`

## Properties

### children

• **children**: `T`[] = `[]`

___

### depth

• **depth**: `number`

___

### left

• **left**: ``null`` \| [`TreePartitionNode`](core_tree_partition$TreePartitionNode.md)<`T`\> = `null`

___

### method

• **method**: [`ITreePartitionMethod`](../interfaces/core_tree_partition$ITreePartitionMethod.md)<`T`\>

___

### parent

• **parent**: ``null`` \| [`TreePartitionNode`](core_tree_partition$TreePartitionNode.md)<`T`\> = `null`

___

### right

• **right**: ``null`` \| [`TreePartitionNode`](core_tree_partition$TreePartitionNode.md)<`T`\> = `null`

___

### tree

• **tree**: [`TreePartition`](core_tree_partition$TreePartition.md)<`T`\>

## Constructors

### constructor

• **new TreePartitionNode**<`T`\>(`tree`, `depth`, `method`)

This is a constructor.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tree` | [`TreePartition`](core_tree_partition$TreePartition.md)<`T`\> | The `tree` parameter is an instance of the `TreePartition` class, which represents a partitioned tree data structure. It contains the data and structure of the tree. |
| `depth` | `number` | The "depth" parameter represents the maximum depth of the tree partition. It determines how many levels the tree will have. |
| `method` | [`ITreePartitionMethod`](../interfaces/core_tree_partition$ITreePartitionMethod.md)<`T`\> | The `method` parameter is an object that implements the `ITreePartitionMethod` interface. This interface defines a method for partitioning a tree. The `method` object is used to determine how the tree should be partitioned at each level of the tree. |
