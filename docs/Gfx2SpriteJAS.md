[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx2\_sprite/gfx2\_sprite\_jas](../modules/gfx2_sprite_gfx2_sprite_jas.md) / Gfx2SpriteJAS

# Class: Gfx2SpriteJAS

[gfx2_sprite/gfx2_sprite_jas](../modules/gfx2_sprite_gfx2_sprite_jas.md).Gfx2SpriteJAS

The `Gfx2SpriteJAS` is a subclass of `Gfx2Drawable` that represents a sprite with animations.

## Hierarchy

- [`Gfx2Drawable`](gfx2_gfx2_drawable$Gfx2Drawable.md)

  ↳ **`Gfx2SpriteJAS`**

## Table of contents

### Methods

- [draw](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#draw)
- [getAnimations](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getanimations)
- [getCurrentAnimation](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getcurrentanimation)
- [getCurrentAnimationFrameIndex](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getcurrentanimationframeindex)
- [getFlip](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getflip)
- [getOffset](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getoffset)
- [getOffsetX](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getoffsetx)
- [getOffsetY](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getoffsety)
- [getPosition](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getposition)
- [getPositionX](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getpositionx)
- [getPositionY](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getpositiony)
- [getRotation](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getrotation)
- [getScale](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getscale)
- [getScaleX](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getscalex)
- [getScaleY](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#getscaley)
- [getTexture](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#gettexture)
- [isVisible](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#isvisible)
- [loadFromFile](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#loadfromfile)
- [paint](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#paint)
- [play](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#play)
- [rotate](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#rotate)
- [setAnimations](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#setanimations)
- [setFlipX](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#setflipx)
- [setFlipY](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#setflipy)
- [setOffset](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#setoffset)
- [setPosition](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#setposition)
- [setRotation](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#setrotation)
- [setScale](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#setscale)
- [setTexture](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#settexture)
- [setVisible](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#setvisible)
- [translate](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#translate)
- [update](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#update)
- [zoom](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#zoom)

### Properties

- [animations](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#animations)
- [currentAnimation](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#currentanimation)
- [currentAnimationFrameIndex](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#currentanimationframeindex)
- [flip](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#flip)
- [frameProgress](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#frameprogress)
- [looped](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#looped)
- [offset](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#offset)
- [position](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#position)
- [rotation](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#rotation)
- [scale](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#scale)
- [texture](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#texture)
- [visible](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#visible)

### Constructors

- [constructor](gfx2_sprite_gfx2_sprite_jas$Gfx2SpriteJAS.md#constructor)

## Methods

### draw

▸ **draw**(): `void`

The "draw" function is responsible for rendering a visual representation on a 2DCanvas.

#### Returns

`void`

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[draw](gfx2_gfx2_drawable$Gfx2Drawable.md#draw)

___

### getAnimations

▸ **getAnimations**(): `JASAnimation`[]

The "getAnimations" function returns an array of animation descriptors.

#### Returns

`JASAnimation`[]

An array of animation descriptors.

___

### getCurrentAnimation

▸ **getCurrentAnimation**(): ``null`` \| `JASAnimation`

The "getCurrentAnimation" function returns the current animation or null if there is no current
animation.

#### Returns

``null`` \| `JASAnimation`

The current animation or null.

___

### getCurrentAnimationFrameIndex

▸ **getCurrentAnimationFrameIndex**(): `number`

The "getCurrentAnimationFrameIndex" function returns the current animation frame index.

#### Returns

`number`

The current animation frame index.

___

### getFlip

▸ **getFlip**(): [`boolean`, `boolean`]

The "getFlip" function returns two booleans, first is the x-axis flip flag, second is the y-axis flip flag.

#### Returns

[`boolean`, `boolean`]

The flip property.

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

### getTexture

▸ **getTexture**(): `HTMLImageElement` \| `ImageBitmap`

The "getTexture" function returns the sprite texture.

#### Returns

`HTMLImageElement` \| `ImageBitmap`

The sprite texture.

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

### loadFromFile

▸ **loadFromFile**(`path`): `Promise`<`void`\>

The "loadFromFile" function asynchronously loads sprite data from a json file (jas).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The `path` parameter is the file path. |

#### Returns

`Promise`<`void`\>

___

### paint

▸ **paint**(): `void`

The "paint" function is rendering the sprite.

#### Returns

`void`

#### Overrides

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[paint](gfx2_gfx2_drawable$Gfx2Drawable.md#paint)

___

### play

▸ **play**(`animationName`, `looped?`, `preventSameAnimation?`): `void`

The "play" function is used to start playing a specific animation, with options for looping and
preventing the same animation from being played again.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `animationName` | `string` | `undefined` | The name of the animation to be played. |
| `looped?` | `boolean` | `false` | The `looped` parameter is a boolean that determines whether the animation should loop or not. |
| `preventSameAnimation?` | `boolean` | `false` | The `preventSameAnimation` parameter is a boolean flag that determines whether the same animation should be prevented from playing again. |

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

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[rotate](gfx2_gfx2_drawable$Gfx2Drawable.md#rotate)

___

### setAnimations

▸ **setAnimations**(`animations`): `void`

The "setAnimations" function sets the animations property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `animations` | `JASAnimation`[] | The `animations` parameter is an array of animation descriptors. |

#### Returns

`void`

___

### setFlipX

▸ **setFlipX**(`x`): `void`

The "setFlipX" function sets the value of the flipX property to the provided boolean value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `boolean` | The x-axis flip flag. |

#### Returns

`void`

___

### setFlipY

▸ **setFlipY**(`y`): `void`

The "setFlipY" function sets the value of the flipY property to the provided boolean value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `y` | `boolean` | The y-axis flip flag. |

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

### setTexture

▸ **setTexture**(`texture`): `void`

The "setTexture" function sets the sprite texture.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `texture` | `ImageBitmap` | The sprite texture. |

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

### animations

• **animations**: `JASAnimation`[]

___

### currentAnimation

• **currentAnimation**: ``null`` \| `JASAnimation`

___

### currentAnimationFrameIndex

• **currentAnimationFrameIndex**: `number`

___

### flip

• **flip**: [`boolean`, `boolean`]

___

### frameProgress

• **frameProgress**: `number`

___

### looped

• **looped**: `boolean`

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

### texture

• **texture**: `HTMLImageElement` \| `ImageBitmap`

___

### visible

• **visible**: `boolean`

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[visible](gfx2_gfx2_drawable$Gfx2Drawable.md#visible)

## Constructors

### constructor

• **new Gfx2SpriteJAS**()

The constructor.

#### Overrides

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[constructor](gfx2_gfx2_drawable$Gfx2Drawable.md#constructor)
