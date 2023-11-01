[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [core/tree\_partition](../modules/core_tree_partition.md) / TreePartition

# Class: TreePartition<T\>

[core/tree_partition](../modules/core_tree_partition.md).TreePartition

The `TreePartition` class represents a generic partition binary tree data structure.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The object type. |

## Hierarchy

- **`TreePartition`**

  ↳ [`Gfx2TreePartition`](gfx2_gfx2_tree_partition$Gfx2TreePartition.md)

  ↳ [`Gfx3TreePartition`](gfx3_gfx3_tree_partition$Gfx3TreePartition.md)

## Table of contents

### Methods

- [addChild](core_tree_partition$TreePartition.md#addchild)
- [getMaxChildren](core_tree_partition$TreePartition.md#getmaxchildren)
- [getMaxDepth](core_tree_partition$TreePartition.md#getmaxdepth)

### Properties

- [maxChildren](core_tree_partition$TreePartition.md#maxchildren)
- [maxDepth](core_tree_partition$TreePartition.md#maxdepth)
- [root](core_tree_partition$TreePartition.md#root)

### Constructors

- [constructor](core_tree_partition$TreePartition.md#constructor)

## Methods

### addChild

▸ **addChild**(`object`): `void`

The "addChild" function adds an object as a child to the tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | The parameter `object` is of type T, which means it can be any type. |

#### Returns

`void`

___

### getMaxChildren

▸ **getMaxChildren**(): `number`

The "getMaxChildren" function returns the maximum number of children per nodes.

#### Returns

`number`

The method is returning the value of the property "maxChildren", which is a number.

___

### getMaxDepth

▸ **getMaxDepth**(): `number`

The "getMaxDepth" function returns the maximum depth of the partition tree.

#### Returns

`number`

The method is returning the value of the variable "maxDepth", which is of type number.

## Properties

### maxChildren

• **maxChildren**: `number`

___

### maxDepth

• **maxDepth**: `number`

___

### root

• **root**: [`TreePartitionNode`](core_tree_partition$TreePartitionNode.md)<`T`\>

## Constructors

### constructor

• **new TreePartition**<`T`\>(`maxChildren`, `maxDepth`, `method`)

The constructor initializes a TreePartition object with the specified maximum number of children,
maximum depth, and partition method.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxChildren` | `number` | The `maxChildren` parameter specifies the maximum number of children that a node in the tree can have. This parameter determines the branching factor of the tree, i.e., the number of child nodes that can be created from a parent node. |
| `maxDepth` | `number` | The `maxDepth` parameter specifies the maximum depth or level of the tree partition. It determines how deep the tree can be divided into smaller partitions. |
| `method` | [`ITreePartitionMethod`](../interfaces/core_tree_partition$ITreePartitionMethod.md)<`T`\> | The `method` parameter is an instance of the `ITreePartitionMethod<T>` interface. This interface defines a method that is responsible for partitioning the tree nodes. The `T` represents the type of data that the tree nodes hold. |
