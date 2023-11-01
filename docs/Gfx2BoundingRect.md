[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx2/gfx2\_bounding\_rect](../modules/gfx2_gfx2_bounding_rect.md) / Gfx2BoundingRect

# Class: Gfx2BoundingRect

[gfx2/gfx2_bounding_rect](../modules/gfx2_gfx2_bounding_rect.md).Gfx2BoundingRect

The `Gfx2BoundingRect` class represents a bounding rectangle in a 2D graphics system and provides
various methods for manipulating and calculating properties of the rectangle.

## Table of contents

### Methods

- [fromVertices](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#fromvertices)
- [getCenter](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#getcenter)
- [getPerimeter](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#getperimeter)
- [getRadius](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#getradius)
- [getSize](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#getsize)
- [getVolume](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#getvolume)
- [intersectBoundingRect](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#intersectboundingrect)
- [isPointInside](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#ispointinside)
- [merge](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#merge)
- [transform](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#transform)
- [createFrom](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#createfrom)
- [createFromCenter](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#createfromcenter)
- [createFromCoord](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#createfromcoord)

### Properties

- [max](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#max)
- [min](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#min)

### Constructors

- [constructor](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md#constructor)

## Methods

### fromVertices

▸ **fromVertices**(`vertices`): `void`

The "fromVertices" function takes an array of vertices and calculates the new minimum and maximum values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vertices` | `number`[] | The `vertices` parameter is an array of numbers representing the coordinates of the points of a shape. Each pair of numbers represents the x and y coordinates of a point. |

#### Returns

`void`

___

### getCenter

▸ **getCenter**(): [`vec2`](../modules/core_global.md#vec2)

The "getCenter" function calculates the center point of the rectangle.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The center point of the rectangle.

___

### getPerimeter

▸ **getPerimeter**(): `number`

The "getPerimeter" function calculates and returns the perimeter of the rectangle.

#### Returns

`number`

The perimeter of the rectangle.

___

### getRadius

▸ **getRadius**(): `number`

The "getRadius" function calculates the radius of a circumscribed circle to the rectangle.

#### Returns

`number`

The radius of the circumscribed circle.

___

### getSize

▸ **getSize**(): [`vec2`](../modules/core_global.md#vec2)

The "getSize" function calculates and returns the width and height of the rectangle.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The width and height of the rectangle.

___

### getVolume

▸ **getVolume**(): `number`

The "getVolume" function calculates the volume of a the rectangle.

#### Returns

`number`

The volume of the rectangle.

___

### intersectBoundingRect

▸ **intersectBoundingRect**(`aabr`): `boolean`

The "intersectBoundingRect" function checks if two bounding rectangles intersect.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `aabr` | [`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md) | The parameter "aabr" is the rect to check for intersection. |

#### Returns

`boolean`

True if bounding rect intersect.

___

### isPointInside

▸ **isPointInside**(`x`, `y`): `boolean`

The "isPointInside" function checks if a given point is inside the rectangle.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x-coordinate of the point. |
| `y` | `number` | The y-coordinate of the point. |

#### Returns

`boolean`

True if the point is in the box.

___

### merge

▸ **merge**(`rect`): [`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md)

The "merge" function takes a `Gfx2BoundingRect` object as input and returns a new `Gfx2BoundingRect`
that represents the union of the two rectangles.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rect` | [`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md) | The `rect` parameter is the rect to merge. |

#### Returns

[`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md)

The new merged rectangle.

___

### transform

▸ **transform**(`matrix`): [`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md)

The "transform" function takes a matrix and transforms the bounding rectangle
points, returning a new transformed bounding rectangle.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`mat3`](../modules/core_global.md#mat3) | The `matrix` parameter is a 3x3 transformation matrix. It is used to transform the points of a bounding rectangle. |

#### Returns

[`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md)

a new instance of `Gfx2BoundingRect`.

___

### createFrom

▸ `Static` **createFrom**(`minx`, `miny`, `maxx`, `maxy`): [`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md)

The "createFrom" is a static method that creates a new instance of "Gfx2BoundingRect".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `minx` | `number` | The minimum x-coordinate of the bounding rectangle. |
| `miny` | `number` | The minimum y-coordinate of the bounding rectangle. |
| `maxx` | `number` | The maximum x-coordinate of the bounding rectangle. |
| `maxy` | `number` | The maximum y-coordinate of the bounding rectangle. |

#### Returns

[`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md)

an instance of the Gfx2BoundingRect class.

___

### createFromCenter

▸ `Static` **createFromCenter**(`x`, `y`, `w`, `h`): [`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md)

The "createFromCenter" is a static method that creates a new instance of "Gfx2BoundingRect".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x-coordinate of the center of the bounding rectangle. |
| `y` | `number` | The y-coordinate of the center of the bounding rectangle. |
| `w` | `number` | The width of the bounding rectangle. |
| `h` | `number` | The height of the bounding rectangle. |

#### Returns

[`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md)

an instance of the Gfx2BoundingRect class.

___

### createFromCoord

▸ `Static` **createFromCoord**(`x`, `y`, `w`, `h`): [`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md)

The "createFromCoord" is a static method that creates a new instance of "Gfx2BoundingRect".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x-coordinate of the top-left corner of the bounding rectangle. |
| `y` | `number` | The y-coordinate of the top-left corner of the bounding rectangle. |
| `w` | `number` | The width of the bounding rectangle. |
| `h` | `number` | The height of the bounding rectangle. |

#### Returns

[`Gfx2BoundingRect`](gfx2_gfx2_bounding_rect$Gfx2BoundingRect.md)

an instance of the Gfx2BoundingRect class.

## Properties

### max

• **max**: [`vec2`](../modules/core_global.md#vec2)

___

### min

• **min**: [`vec2`](../modules/core_global.md#vec2)

## Constructors

### constructor

• **new Gfx2BoundingRect**(`min?`, `max?`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `min` | [`vec2`](../modules/core_global.md#vec2) | The minimum point of the bounding rectangle. |
| `max` | [`vec2`](../modules/core_global.md#vec2) | The maximum point of the bounding rectangle. |
