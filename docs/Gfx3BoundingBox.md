[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3/gfx3\_bounding\_box](../modules/gfx3_gfx3_bounding_box.md) / Gfx3BoundingBox

# Class: Gfx3BoundingBox

[gfx3/gfx3_bounding_box](../modules/gfx3_gfx3_bounding_box.md).Gfx3BoundingBox

The `Gfx3BoundingBox` class represents a 3D bounding box and provides various methods for manipulating
and calculating properties of the box.

## Table of contents

### Methods

- [fromVertices](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#fromvertices)
- [getCenter](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#getcenter)
- [getPerimeter](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#getperimeter)
- [getRadius](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#getradius)
- [getSize](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#getsize)
- [getVolume](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#getvolume)
- [intersectBoundingBox](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#intersectboundingbox)
- [isPointInside](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#ispointinside)
- [merge](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#merge)
- [reset](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#reset)
- [setMax](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#setmax)
- [setMin](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#setmin)
- [transform](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#transform)
- [createFromCenter](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#createfromcenter)
- [createFromCoord](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#createfromcoord)
- [merge](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#merge-1)

### Properties

- [max](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#max)
- [min](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#min)

### Constructors

- [constructor](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md#constructor)

## Methods

### fromVertices

▸ **fromVertices**(`vertices`, `vertexStride`): `void`

The "fromVertices" function takes an array of vertices and calculates the new minimum and maximum values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vertices` | `Float32Array` \| `number`[] | The `vertices` parameter is an array of numbers representing the coordinates of the points of a shape. Each triplets of numbers represents the x, y and z coordinates of a point. |
| `vertexStride` | `number` | - |

#### Returns

`void`

___

### getCenter

▸ **getCenter**(): [`vec3`](../modules/core_global.md#vec3)

The "getCenter" function calculates the center point of the box.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The center point of the box.

___

### getPerimeter

▸ **getPerimeter**(): `number`

The "getPerimeter" function calculates and returns the perimeter of the box.

#### Returns

`number`

The perimeter of the box.

___

### getRadius

▸ **getRadius**(): `number`

The "getRadius" function calculates the radius of a circumscribed circle to the box.

#### Returns

`number`

The radius of the circumscribed circle.

___

### getSize

▸ **getSize**(): [`vec3`](../modules/core_global.md#vec3)

The "getSize" function calculates and returns the width, height and depth of the box.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The width, height and depth of the box.

___

### getVolume

▸ **getVolume**(): `number`

The "getVolume" function calculates the volume of a the box.

#### Returns

`number`

The volume of the box.

___

### intersectBoundingBox

▸ **intersectBoundingBox**(`aabb`): `boolean`

The "intersectBoundingBox" function checks if two bounding boxes intersect.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `aabb` | [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md) | The parameter "aabb" is the box to check for intersection. |

#### Returns

`boolean`

True if bounding box intersect.

___

### isPointInside

▸ **isPointInside**(`x`, `y`, `z`): `boolean`

The "isPointInside" function checks if a given point is inside the box.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x-coordinate of the point. |
| `y` | `number` | The y-coordinate of the point. |
| `z` | `number` | The z-coordinate of the point. |

#### Returns

`boolean`

True if point is in the box.

___

### merge

▸ **merge**(`aabb`): [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The "merge" function takes a `Gfx3BoundingBox` object as input and returns a new `Gfx3BoundingBox`
that represents the union of the two boxes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `aabb` | [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md) | The `aabb` parameter is the box to merge. |

#### Returns

[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The new merged box.

___

### reset

▸ **reset**(): `void`

The "reset" function sets the "min" and "max" values to [0, 0, 0].

#### Returns

`void`

___

### setMax

▸ **setMax**(`max`): `void`

The "setMax" function sets the maximum value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `max` | [`vec3`](../modules/core_global.md#vec3) | The `max`point of the box. |

#### Returns

`void`

___

### setMin

▸ **setMin**(`min`): `void`

The "setMin" function sets the minimum value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `min` | [`vec3`](../modules/core_global.md#vec3) | The `min` point of the box. |

#### Returns

`void`

___

### transform

▸ **transform**(`matrix`): [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The "transform" function takes a matrix and transforms the bounding box
points, returning a new transformed bounding box.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`mat4`](../modules/core_global.md#mat4) | The `matrix` parameter is a 4x4 transformation matrix. It is used to transform the points of a bounding box. |

#### Returns

[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

a new instance of `Gfx2BoundingRect`.

___

### createFromCenter

▸ `Static` **createFromCenter**(`x`, `y`, `z`, `w`, `h`, `d`): [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The "createFromCenter" is a static method that creates a new instance of "Gfx3BoundingBox".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x-coordinate of the center of the bounding box. |
| `y` | `number` | The y-coordinate of the center of the bounding box. |
| `z` | `number` | The z-coordinate of the center of the bounding box. |
| `w` | `number` | The width of the bounding box. |
| `h` | `number` | The height of the bounding box. |
| `d` | `number` | The depth of the bounding box. |

#### Returns

[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

a new instance of Gfx3BoundingBox.

___

### createFromCoord

▸ `Static` **createFromCoord**(`x`, `y`, `z`, `w`, `h`, `d`): [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The "createFromCoord" is a static method that creates a new instance of "Gfx3BoundingBox".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x-coordinate of the bottom-left-front corner of the bounding box. |
| `y` | `number` | The y-coordinate of the bottom-left-front corner of the bounding box. |
| `z` | `number` | The z-coordinate of the bottom-left-front corner of the bounding box. |
| `w` | `number` | The width of the bounding box. |
| `h` | `number` | The height of the bounding box. |
| `d` | `number` | The depth of the bounding box. |

#### Returns

[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

a new instance of Gfx3BoundingBox.

___

### merge

▸ `Static` **merge**(`aabbs`): [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The "merge" function takes an array of `Gfx3BoundingBox` objects as input and returns a new `Gfx3BoundingBox`
that represents the union of boxes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `aabbs` | [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)[] | The `aabbs` parameter is an array of box to merge. |

#### Returns

[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The new merged box.

## Properties

### max

• **max**: [`vec3`](../modules/core_global.md#vec3)

___

### min

• **min**: [`vec3`](../modules/core_global.md#vec3)

## Constructors

### constructor

• **new Gfx3BoundingBox**(`min?`, `max?`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `min` | [`vec3`](../modules/core_global.md#vec3) | The minimum point of the bounding box. |
| `max` | [`vec3`](../modules/core_global.md#vec3) | The maximum point of the bounding box. |
