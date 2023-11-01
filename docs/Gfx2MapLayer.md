[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx2\_map/gfx2\_map\_layer](../modules/gfx2_map_gfx2_map_layer.md) / Gfx2MapLayer

# Class: Gfx2MapLayer

[gfx2_map/gfx2_map_layer](../modules/gfx2_map_gfx2_map_layer.md).Gfx2MapLayer

The `Gfx2MapLayer` class is a subclass of `Gfx2Drawable` that responsible for updating and
rendering a tile layer onto a canvas.

## Hierarchy

- [`Gfx2Drawable`](gfx2_gfx2_drawable$Gfx2Drawable.md)

  ↳ **`Gfx2MapLayer`**

## Table of contents

### Methods

- [draw](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#draw)
- [getOffset](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#getoffset)
- [getOffsetX](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#getoffsetx)
- [getOffsetY](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#getoffsety)
- [getPosition](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#getposition)
- [getPositionX](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#getpositionx)
- [getPositionY](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#getpositiony)
- [getRotation](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#getrotation)
- [getScale](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#getscale)
- [getScaleX](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#getscalex)
- [getScaleY](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#getscaley)
- [isVisible](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#isvisible)
- [paint](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#paint)
- [rotate](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#rotate)
- [setOffset](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#setoffset)
- [setPosition](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#setposition)
- [setRotation](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#setrotation)
- [setScale](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#setscale)
- [setVisible](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#setvisible)
- [translate](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#translate)
- [update](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#update)
- [zoom](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#zoom)

### Properties

- [frameIndex](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#frameindex)
- [frameProgress](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#frameprogress)
- [layerIndex](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#layerindex)
- [map](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#map)
- [offset](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#offset)
- [position](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#position)
- [rotation](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#rotation)
- [scale](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#scale)
- [visible](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#visible)

### Constructors

- [constructor](gfx2_map_gfx2_map_layer$Gfx2MapLayer.md#constructor)

## Methods

### draw

▸ **draw**(): `void`

The "draw" function is responsible for rendering a visual representation on a 2DCanvas.

#### Returns

`void`

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[draw](gfx2_gfx2_drawable$Gfx2Drawable.md#draw)

___

### getOffset

▸ **getOffset**(): [`vec2`](../modules/core_global.md#vec2)

The "getOffset" function returns the origin offset.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The offset.

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[getOffset](gfx2_gfx2_drawable$Gfx2Drawable.md#getoffset)

___

### getOffsetX

▸ **getOffsetX**(): `number`

The "getOffsetX" function returns the offset in x-axis direction.

#### Returns

`number`

The x-offset value.

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[getOffsetX](gfx2_gfx2_drawable$Gfx2Drawable.md#getoffsetx)

___

### getOffsetY

▸ **getOffsetY**(): `number`

The "getOffsetY" function returns the offset in y-axis direction.

#### Returns

`number`

The y-offset value.

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[getOffsetY](gfx2_gfx2_drawable$Gfx2Drawable.md#getoffsety)

___

### getPosition

▸ **getPosition**(): [`vec2`](../modules/core_global.md#vec2)

The "getPosition" function returns the position.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The position as a 2D vector.

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[getPosition](gfx2_gfx2_drawable$Gfx2Drawable.md#getposition)

___

### getPositionX

▸ **getPositionX**(): `number`

The "getPositionX" function returns the x-coordinate of the position.

#### Returns

`number`

The X coordinate.

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[getPositionX](gfx2_gfx2_drawable$Gfx2Drawable.md#getpositionx)

___

### getPositionY

▸ **getPositionY**(): `number`

The "getPositionY" function returns the y-coordinate of the position.

#### Returns

`number`

The Y coordinate.

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[getPositionY](gfx2_gfx2_drawable$Gfx2Drawable.md#getpositiony)

___

### getRotation

▸ **getRotation**(): `number`

The "getRotation" function returns the rotation.

#### Returns

`number`

The rotation.

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[getRotation](gfx2_gfx2_drawable$Gfx2Drawable.md#getrotation)

___

### getScale

▸ **getScale**(): [`vec2`](../modules/core_global.md#vec2)

The "getScale" function returns the scale as a 2D vector.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The scale.

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[getScale](gfx2_gfx2_drawable$Gfx2Drawable.md#getscale)

___

### getScaleX

▸ **getScaleX**(): `number`

The "getScaleX" function returns the scale factor on x-axis.

#### Returns

`number`

The x-axis scale factor.

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[getScaleX](gfx2_gfx2_drawable$Gfx2Drawable.md#getscalex)

___

### getScaleY

▸ **getScaleY**(): `number`

The "getScaleY" function returns the scale factor on y-axis.

#### Returns

`number`

The y-axis scale factor.

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[getScaleY](gfx2_gfx2_drawable$Gfx2Drawable.md#getscaley)

___

### isVisible

▸ **isVisible**(): `boolean`

The "isVisible" function returns a boolean value indicating whether an element is visible or not.

#### Returns

`boolean`

True if visible, false is not.

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[isVisible](gfx2_gfx2_drawable$Gfx2Drawable.md#isvisible)

___

### paint

▸ **paint**(): `void`

The "paint" function is rendering the tilemap layer.

#### Returns

`void`

#### Overrides

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[paint](gfx2_gfx2_drawable$Gfx2Drawable.md#paint)

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

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[rotate](gfx2_gfx2_drawable$Gfx2Drawable.md#rotate)

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

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[setOffset](gfx2_gfx2_drawable$Gfx2Drawable.md#setoffset)

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

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[setPosition](gfx2_gfx2_drawable$Gfx2Drawable.md#setposition)

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

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[setRotation](gfx2_gfx2_drawable$Gfx2Drawable.md#setrotation)

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

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[setScale](gfx2_gfx2_drawable$Gfx2Drawable.md#setscale)

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

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[setVisible](gfx2_gfx2_drawable$Gfx2Drawable.md#setvisible)

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

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[translate](gfx2_gfx2_drawable$Gfx2Drawable.md#translate)

___

### update

▸ **update**(`ts`): `void`

The "update" function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The `ts` parameter stands for "timestep". |

#### Returns

`void`

#### Overrides

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[update](gfx2_gfx2_drawable$Gfx2Drawable.md#update)

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

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[zoom](gfx2_gfx2_drawable$Gfx2Drawable.md#zoom)

## Properties

### frameIndex

• **frameIndex**: `number`

___

### frameProgress

• **frameProgress**: `number`

___

### layerIndex

• **layerIndex**: `number`

___

### map

• **map**: [`Gfx2Map`](gfx2_map_gfx2_map$Gfx2Map.md)

___

### offset

• **offset**: [`vec2`](../modules/core_global.md#vec2)

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[offset](gfx2_gfx2_drawable$Gfx2Drawable.md#offset)

___

### position

• **position**: [`vec2`](../modules/core_global.md#vec2)

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[position](gfx2_gfx2_drawable$Gfx2Drawable.md#position)

___

### rotation

• **rotation**: `number`

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[rotation](gfx2_gfx2_drawable$Gfx2Drawable.md#rotation)

___

### scale

• **scale**: [`vec2`](../modules/core_global.md#vec2)

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[scale](gfx2_gfx2_drawable$Gfx2Drawable.md#scale)

___

### visible

• **visible**: `boolean`

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[visible](gfx2_gfx2_drawable$Gfx2Drawable.md#visible)

## Constructors

### constructor

• **new Gfx2MapLayer**(`map`, `layerIndex`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | [`Gfx2Map`](gfx2_map_gfx2_map$Gfx2Map.md) | The map or level in a game and contains information about the tiles, objects, and other elements present in the map. |
| `layerIndex` | `number` | The `layerIndex` parameter is used to determine which layer to render. manipulate. |

#### Overrides

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[constructor](gfx2_gfx2_drawable$Gfx2Drawable.md#constructor)
