[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_mesh/gfx3\_mesh\_nav](../modules/gfx3_mesh_gfx3_mesh_nav.md) / Gfx3MeshNav

# Class: Gfx3MeshNav

[gfx3_mesh/gfx3_mesh_nav](../modules/gfx3_mesh_gfx3_mesh_nav.md).Gfx3MeshNav

The `Gfx3MeshNav` class is responsible for controlling the navigation and collisions in a static mesh.
In collision case, the collision response sliding along the polygon of the map to keep a good
feeling for the player.

## Table of contents

### Methods

- [getLift](gfx3_mesh_gfx3_mesh_nav$Gfx3MeshNav.md#getlift)
- [loadFromJSM](gfx3_mesh_gfx3_mesh_nav$Gfx3MeshNav.md#loadfromjsm)
- [move](gfx3_mesh_gfx3_mesh_nav$Gfx3MeshNav.md#move)
- [setLift](gfx3_mesh_gfx3_mesh_nav$Gfx3MeshNav.md#setlift)

### Properties

- [btree](gfx3_mesh_gfx3_mesh_nav$Gfx3MeshNav.md#btree)
- [frags](gfx3_mesh_gfx3_mesh_nav$Gfx3MeshNav.md#frags)
- [lift](gfx3_mesh_gfx3_mesh_nav$Gfx3MeshNav.md#lift)

### Constructors

- [constructor](gfx3_mesh_gfx3_mesh_nav$Gfx3MeshNav.md#constructor)

## Methods

### getLift

▸ **getLift**(): `number`

The "getLift" function returns the value of the "lift" property.

#### Returns

`number`

The lift property.

___

### loadFromJSM

▸ **loadFromJSM**(`mesh`): `void`

The "loadFromJSM" function creates a binary tree partition based on the vertices of a given mesh.

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | [`Gfx3Mesh`](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md) |

#### Returns

`void`

___

### move

▸ **move**(`center`, `size`, `move`): `NavInfo`

The "move" function calculates the movement of an object in a 3D space, taking into account
collisions with walls and floors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `center` | [`vec3`](../modules/core_global.md#vec3) | The `center` parameter is a 3D vector representing the center point of the object or entity that is being moved. |
| `size` | [`vec3`](../modules/core_global.md#vec3) | The `size` parameter represents the dimensions of the object's bounding box. It is a `vec3` vector that contains the width, height, and depth of the object. |
| `move` | [`vec3`](../modules/core_global.md#vec3) | The `move` parameter is a 3D vector that represents the desired movement of an object. It specifies how much the object should move along the x, y, and z axes. |

#### Returns

`NavInfo`

The NavInfo object.
It contains the response collision move, a boolean to check wall collide and a boolean to check floor collide.

___

### setLift

▸ **setLift**(`lift`): `void`

The "setLift" function sets the value of the "lift" property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lift` | `number` | The lift is used to elevate the virtual bounding box to let passing over little step or micro obstacles on the floor. |

#### Returns

`void`

## Properties

### btree

• **btree**: [`Gfx3TreePartition`](gfx3_gfx3_tree_partition$Gfx3TreePartition.md)

___

### frags

• **frags**: `Frag`[]

___

### lift

• **lift**: `number`

## Constructors

### constructor

• **new Gfx3MeshNav**()

The constructor.
