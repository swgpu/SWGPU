[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx2/gfx2\_tree\_partition](../modules/gfx2_gfx2_tree_partition.md) / Gfx2TreePartition

# Class: Gfx2TreePartition

[gfx2/gfx2_tree_partition](../modules/gfx2_gfx2_tree_partition.md).Gfx2TreePartition

The `Gfx2TreePartition` class implements a binary tree space partition in 2D graphics system.

## Hierarchy

- [`TreePartition`](core_tree_partition$TreePartition.md)<[`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md)\>

  ↳ **`Gfx2TreePartition`**

## Table of contents

### Methods

- [addChild](gfx2_gfx2_tree_partition$Gfx2TreePartition.md#addchild)
- [getMaxChildren](gfx2_gfx2_tree_partition$Gfx2TreePartition.md#getmaxchildren)
- [getMaxDepth](gfx2_gfx2_tree_partition$Gfx2TreePartition.md#getmaxdepth)

### Properties

- [maxChildren](gfx2_gfx2_tree_partition$Gfx2TreePartition.md#maxchildren)
- [maxDepth](gfx2_gfx2_tree_partition$Gfx2TreePartition.md#maxdepth)
- [root](gfx2_gfx2_tree_partition$Gfx2TreePartition.md#root)

### Constructors

- [constructor](gfx2_gfx2_tree_partition$Gfx2TreePartition.md#constructor)

## Methods

### addChild

▸ **addChild**(`object`): `void`

The "addChild" function adds an object as a child to the tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | [`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md) | The parameter `object` is of type T, which means it can be any type. |

#### Returns

`void`

#### Inherited from

[TreePartition](core_tree_partition$TreePartition.md).[addChild](core_tree_partition$TreePartition.md#addchild)

___

### getMaxChildren

▸ **getMaxChildren**(): `number`

The "getMaxChildren" function returns the maximum number of children per nodes.

#### Returns

`number`

The method is returning the value of the property "maxChildren", which is a number.

#### Inherited from

[TreePartition](core_tree_partition$TreePartition.md).[getMaxChildren](core_tree_partition$TreePartition.md#getmaxchildren)

___

### getMaxDepth

▸ **getMaxDepth**(): `number`

The "getMaxDepth" function returns the maximum depth of the partition tree.

#### Returns

`number`

The method is returning the value of the variable "maxDepth", which is of type number.

#### Inherited from

[TreePartition](core_tree_partition$TreePartition.md).[getMaxDepth](core_tree_partition$TreePartition.md#getmaxdepth)

## Properties

### maxChildren

• **maxChildren**: `number`

#### Inherited from

[TreePartition](core_tree_partition$TreePartition.md).[maxChildren](core_tree_partition$TreePartition.md#maxchildren)

___

### maxDepth

• **maxDepth**: `number`

#### Inherited from

[TreePartition](core_tree_partition$TreePartition.md).[maxDepth](core_tree_partition$TreePartition.md#maxdepth)

___

### root

• **root**: [`TreePartitionNode`](core_tree_partition$TreePartitionNode.md)<[`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md)\>

#### Inherited from

[TreePartition](core_tree_partition$TreePartition.md).[root](core_tree_partition$TreePartition.md#root)

## Constructors

### constructor

• **new Gfx2TreePartition**(`maxChildren`, `maxDepth`, `rect?`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxChildren` | `number` | The `maxChildren` parameter specifies the maximum number of children that a node in the tree can have before it needs to be split into multiple nodes. |
| `maxDepth` | `number` | The `maxDepth` parameter specifies the maximum depth of the tree. It determines how many levels the tree can have. |
| `rect` | [`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md) | The top bounding rectangle of the tree partition space. |

#### Overrides

[TreePartition](core_tree_partition$TreePartition.md).[constructor](core_tree_partition$TreePartition.md#constructor)
