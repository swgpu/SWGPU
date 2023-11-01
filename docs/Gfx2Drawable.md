[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx2/gfx2\_drawable](../modules/gfx2_gfx2_drawable.md) / Gfx2Drawable

# Class: Gfx2Drawable

[gfx2/gfx2_drawable](../modules/gfx2_gfx2_drawable.md).Gfx2Drawable

The `Gfx2Drawable` class represents a drawable object in a 2D graphics system.

## Hierarchy

- **`Gfx2Drawable`**

  ↳ [`Gfx2MapLayer`](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md)

  ↳ [`Gfx2Particles`](gfx2_particles_gfx2_particles$Gfx2Particles.md)

  ↳ [`Gfx2SpriteJAS`](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md)

## Table of contents

### Methods

- [draw](gfx2_gfx2_drawable$Gfx2Drawable.md#draw)
- [getOffset](gfx2_gfx2_drawable$Gfx2Drawable.md#getoffset)
- [getOffsetX](gfx2_gfx2_drawable$Gfx2Drawable.md#getoffsetx)
- [getOffsetY](gfx2_gfx2_drawable$Gfx2Drawable.md#getoffsety)
- [getPosition](gfx2_gfx2_drawable$Gfx2Drawable.md#getposition)
- [getPositionX](gfx2_gfx2_drawable$Gfx2Drawable.md#getpositionx)
- [getPositionY](gfx2_gfx2_drawable$Gfx2Drawable.md#getpositiony)
- [getRotation](gfx2_gfx2_drawable$Gfx2Drawable.md#getrotation)
- [getScale](gfx2_gfx2_drawable$Gfx2Drawable.md#getscale)
- [getScaleX](gfx2_gfx2_drawable$Gfx2Drawable.md#getscalex)
- [getScaleY](gfx2_gfx2_drawable$Gfx2Drawable.md#getscaley)
- [isVisible](gfx2_gfx2_drawable$Gfx2Drawable.md#isvisible)
- [paint](gfx2_gfx2_drawable$Gfx2Drawable.md#paint)
- [rotate](gfx2_gfx2_drawable$Gfx2Drawable.md#rotate)
- [setOffset](gfx2_gfx2_drawable$Gfx2Drawable.md#setoffset)
- [setPosition](gfx2_gfx2_drawable$Gfx2Drawable.md#setposition)
- [setRotation](gfx2_gfx2_drawable$Gfx2Drawable.md#setrotation)
- [setScale](gfx2_gfx2_drawable$Gfx2Drawable.md#setscale)
- [setVisible](gfx2_gfx2_drawable$Gfx2Drawable.md#setvisible)
- [translate](gfx2_gfx2_drawable$Gfx2Drawable.md#translate)
- [update](gfx2_gfx2_drawable$Gfx2Drawable.md#update)
- [zoom](gfx2_gfx2_drawable$Gfx2Drawable.md#zoom)

### Properties

- [offset](gfx2_gfx2_drawable$Gfx2Drawable.md#offset)
- [position](gfx2_gfx2_drawable$Gfx2Drawable.md#position)
- [rotation](gfx2_gfx2_drawable$Gfx2Drawable.md#rotation)
- [scale](gfx2_gfx2_drawable$Gfx2Drawable.md#scale)
- [visible](gfx2_gfx2_drawable$Gfx2Drawable.md#visible)

### Constructors

- [constructor](gfx2_gfx2_drawable$Gfx2Drawable.md#constructor)

## Methods

### draw

▸ **draw**(): `void`

The "draw" function is responsible for rendering a visual representation on a 2DCanvas.

#### Returns

`void`

___

### getOffset

▸ **getOffset**(): [`vec2`](../modules/core_global.md#vec2)

The "getOffset" function returns the origin offset.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The offset.

___

### getOffsetX

▸ **getOffsetX**(): `number`

The "getOffsetX" function returns the offset in x-axis direction.

#### Returns

`number`

The x-offset value.

___

### getOffsetY

▸ **getOffsetY**(): `number`

The "getOffsetY" function returns the offset in y-axis direction.

#### Returns

`number`

The y-offset value.

___

### getPosition

▸ **getPosition**(): [`vec2`](../modules/core_global.md#vec2)

The "getPosition" function returns the position.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The position as a 2D vector.

___

### getPositionX

▸ **getPositionX**(): `number`

The "getPositionX" function returns the x-coordinate of the position.

#### Returns

`number`

The X coordinate.

___

### getPositionY

▸ **getPositionY**(): `number`

The "getPositionY" function returns the y-coordinate of the position.

#### Returns

`number`

The Y coordinate.

___

### getRotation

▸ **getRotation**(): `number`

The "getRotation" function returns the rotation.

#### Returns

`number`

The rotation.

___

### getScale

▸ **getScale**(): [`vec2`](../modules/core_global.md#vec2)

The "getScale" function returns the scale as a 2D vector.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The scale.

___

### getScaleX

▸ **getScaleX**(): `number`

The "getScaleX" function returns the scale factor on x-axis.

#### Returns

`number`

The x-axis scale factor.

___

### getScaleY

▸ **getScaleY**(): `number`

The "getScaleY" function returns the scale factor on y-axis.

#### Returns

`number`

The y-axis scale factor.

___

### isVisible

▸ **isVisible**(): `boolean`

The "isVisible" function returns a boolean value indicating whether an element is visible or not.

#### Returns

`boolean`

True if visible, false is not.

___

### paint

▸ **paint**(): `void`

The "paint" is a virtual method that is called during the draw phase (after transforms).

#### Returns

`void`

___

### rotate

▸ **rotate**(`a`): `void`

The "rotate" function add rotation value to current angle.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `number` | The rotation angle to add in radians. |

#### Returns

`void`

___

### setOffset

▸ **setOffset**(`x`, `y`): `void`

The "setOffset" function set the origin offset value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x-offset. |
| `y` | `number` | The y-offset. |

#### Returns

`void`

___

### setPosition

▸ **setPosition**(`x`, `y`): `void`

The "setPosition" function set the position with the given x and y coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The X coordinate of the position. |
| `y` | `number` | The Y coordinate of the position. |

#### Returns

`void`

___

### setRotation

▸ **setRotation**(`rotation`): `void`

The "setRotation" function sets the rotation angle (in radians).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rotation` | `number` | The `rotation` parameter is the rotation angle in radians. |

#### Returns

`void`

___

### setScale

▸ **setScale**(`x`, `y`): `void`

The "setScale" function sets the scale with the given x and y factors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x factor in the x-axis direction. |
| `y` | `number` | The y factor in the y-axis direction. |

#### Returns

`void`

___

### setVisible

▸ **setVisible**(`visible`): `void`

The "setVisible" function set the visibility.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `visible` | `boolean` | The "visible" parameter is a boolean value that determines whether an element should be visible or not. |

#### Returns

`void`

___

### translate

▸ **translate**(`x`, `y`): `void`

The "translate" function translate the position.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The amount of translation in the x-axis direction. |
| `y` | `number` | The amount of translation in the y-axis direction. |

#### Returns

`void`

___

### update

▸ **update**(`ts`): `void`

The "update" is a virtual method used for the update phase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The `ts` parameter stands for "timestep". |

#### Returns

`void`

___

### zoom

▸ **zoom**(`x`, `y`): `void`

The "zoom" function add scale values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x factor in the x-axis direction. |
| `y` | `number` | The y factor in the y-axis direction. |

#### Returns

`void`

## Properties

### offset

• **offset**: [`vec2`](../modules/core_global.md#vec2)

___

### position

• **position**: [`vec2`](../modules/core_global.md#vec2)

___

### rotation

• **rotation**: `number`

___

### scale

• **scale**: [`vec2`](../modules/core_global.md#vec2)

___

### visible

• **visible**: `boolean`

## Constructors

### constructor

• **new Gfx2Drawable**()

The constructor.
