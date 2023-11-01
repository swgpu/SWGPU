[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3/gfx3\_tree\_partition](../modules/gfx3_gfx3_tree_partition.md) / Gfx3TreePartition

# Class: Gfx3TreePartition

[gfx3/gfx3_tree_partition](../modules/gfx3_gfx3_tree_partition.md).Gfx3TreePartition

The `Gfx3TreePartition` class implements a binary tree space partition in 3D graphics system.

## Hierarchy

- [`TreePartition`](core_tree_partition$TreePartition.md)<[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)\>

  ↳ **`Gfx3TreePartition`**

## Table of contents

### Methods

- [addChild](gfx3_gfx3_tree_partition$Gfx3TreePartition.md#addchild)
- [getMaxChildren](gfx3_gfx3_tree_partition$Gfx3TreePartition.md#getmaxchildren)
- [getMaxDepth](gfx3_gfx3_tree_partition$Gfx3TreePartition.md#getmaxdepth)

### Properties

- [maxChildren](gfx3_gfx3_tree_partition$Gfx3TreePartition.md#maxchildren)
- [maxDepth](gfx3_gfx3_tree_partition$Gfx3TreePartition.md#maxdepth)
- [root](gfx3_gfx3_tree_partition$Gfx3TreePartition.md#root)

### Constructors

- [constructor](gfx3_gfx3_tree_partition$Gfx3TreePartition.md#constructor)

## Methods

### addChild

▸ **addChild**(`object`): `void`

The "addChild" function adds an object as a child to the tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md) | The parameter `object` is of type T, which means it can be any type. |

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

• **root**: [`TreePartitionNode`](core_tree_partition$TreePartitionNode.md)<[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)\>

#### Inherited from

[TreePartition](core_tree_partition$TreePartition.md).[root](core_tree_partition$TreePartition.md#root)

## Constructors

### constructor

• **new Gfx3TreePartition**(`maxChildren`, `maxDepth`, `aabb?`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxChildren` | `number` | The `maxChildren` parameter specifies the maximum number of children that a node in the tree can have before it needs to be split into multiple nodes. |
| `maxDepth` | `number` | The `maxDepth` parameter specifies the maximum depth of the tree. It determines how many levels the tree can have. |
| `aabb` | [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md) | The top bounding box of the tree partition space. |

#### Overrides

[TreePartition](core_tree_partition$TreePartition.md).[constructor](core_tree_partition$TreePartition.md#constructor)
