[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx2\_particles/gfx2\_particles](../modules/gfx2_particles_gfx2_particles.md) / Gfx2Particles

# Class: Gfx2Particles

[gfx2_particles/gfx2_particles](../modules/gfx2_particles_gfx2_particles.md).Gfx2Particles

The `Gfx2Particles` class is a subclass of `Gfx2Drawable` that responsible for updating and
rendering a particle system onto a canvas with various properties such as position,
velocity, size, opacity, acceleration, angle, and age.

## Hierarchy

- [`Gfx2Drawable`](gfx2_gfx2_drawable$Gfx2Drawable.md)

  ↳ **`Gfx2Particles`**

## Table of contents

### Methods

- [createParticle](gfx2_particles_gfx2_particles$Gfx2Particles.md#createparticle)
- [draw](gfx2_particles_gfx2_particles$Gfx2Particles.md#draw)
- [getOffset](gfx2_particles_gfx2_particles$Gfx2Particles.md#getoffset)
- [getOffsetX](gfx2_particles_gfx2_particles$Gfx2Particles.md#getoffsetx)
- [getOffsetY](gfx2_particles_gfx2_particles$Gfx2Particles.md#getoffsety)
- [getPosition](gfx2_particles_gfx2_particles$Gfx2Particles.md#getposition)
- [getPositionX](gfx2_particles_gfx2_particles$Gfx2Particles.md#getpositionx)
- [getPositionY](gfx2_particles_gfx2_particles$Gfx2Particles.md#getpositiony)
- [getRotation](gfx2_particles_gfx2_particles$Gfx2Particles.md#getrotation)
- [getScale](gfx2_particles_gfx2_particles$Gfx2Particles.md#getscale)
- [getScaleX](gfx2_particles_gfx2_particles$Gfx2Particles.md#getscalex)
- [getScaleY](gfx2_particles_gfx2_particles$Gfx2Particles.md#getscaley)
- [getTexture](gfx2_particles_gfx2_particles$Gfx2Particles.md#gettexture)
- [isVisible](gfx2_particles_gfx2_particles$Gfx2Particles.md#isvisible)
- [paint](gfx2_particles_gfx2_particles$Gfx2Particles.md#paint)
- [rotate](gfx2_particles_gfx2_particles$Gfx2Particles.md#rotate)
- [setOffset](gfx2_particles_gfx2_particles$Gfx2Particles.md#setoffset)
- [setPosition](gfx2_particles_gfx2_particles$Gfx2Particles.md#setposition)
- [setRotation](gfx2_particles_gfx2_particles$Gfx2Particles.md#setrotation)
- [setScale](gfx2_particles_gfx2_particles$Gfx2Particles.md#setscale)
- [setTexture](gfx2_particles_gfx2_particles$Gfx2Particles.md#settexture)
- [setVisible](gfx2_particles_gfx2_particles$Gfx2Particles.md#setvisible)
- [translate](gfx2_particles_gfx2_particles$Gfx2Particles.md#translate)
- [update](gfx2_particles_gfx2_particles$Gfx2Particles.md#update)
- [zoom](gfx2_particles_gfx2_particles$Gfx2Particles.md#zoom)

### Properties

- [accelerationBase](gfx2_particles_gfx2_particles$Gfx2Particles.md#accelerationbase)
- [accelerationSpread](gfx2_particles_gfx2_particles$Gfx2Particles.md#accelerationspread)
- [accelerationTween](gfx2_particles_gfx2_particles$Gfx2Particles.md#accelerationtween)
- [angleAccelerationBase](gfx2_particles_gfx2_particles$Gfx2Particles.md#angleaccelerationbase)
- [angleAccelerationSpread](gfx2_particles_gfx2_particles$Gfx2Particles.md#angleaccelerationspread)
- [angleBase](gfx2_particles_gfx2_particles$Gfx2Particles.md#anglebase)
- [angleSpread](gfx2_particles_gfx2_particles$Gfx2Particles.md#anglespread)
- [angleVelocityBase](gfx2_particles_gfx2_particles$Gfx2Particles.md#anglevelocitybase)
- [angleVelocitySpread](gfx2_particles_gfx2_particles$Gfx2Particles.md#anglevelocityspread)
- [emitterAge](gfx2_particles_gfx2_particles$Gfx2Particles.md#emitterage)
- [emitterAlive](gfx2_particles_gfx2_particles$Gfx2Particles.md#emitteralive)
- [emitterDeathAge](gfx2_particles_gfx2_particles$Gfx2Particles.md#emitterdeathage)
- [offset](gfx2_particles_gfx2_particles$Gfx2Particles.md#offset)
- [opacityBase](gfx2_particles_gfx2_particles$Gfx2Particles.md#opacitybase)
- [opacitySpread](gfx2_particles_gfx2_particles$Gfx2Particles.md#opacityspread)
- [opacityTween](gfx2_particles_gfx2_particles$Gfx2Particles.md#opacitytween)
- [particleAlivedCount](gfx2_particles_gfx2_particles$Gfx2Particles.md#particlealivedcount)
- [particleArray](gfx2_particles_gfx2_particles$Gfx2Particles.md#particlearray)
- [particleDeathAge](gfx2_particles_gfx2_particles$Gfx2Particles.md#particledeathage)
- [particleQuantity](gfx2_particles_gfx2_particles$Gfx2Particles.md#particlequantity)
- [particlesPerSecond](gfx2_particles_gfx2_particles$Gfx2Particles.md#particlespersecond)
- [position](gfx2_particles_gfx2_particles$Gfx2Particles.md#position)
- [positionBase](gfx2_particles_gfx2_particles$Gfx2Particles.md#positionbase)
- [positionCircleRadiusBase](gfx2_particles_gfx2_particles$Gfx2Particles.md#positioncircleradiusbase)
- [positionRadiusSpread](gfx2_particles_gfx2_particles$Gfx2Particles.md#positionradiusspread)
- [positionSpread](gfx2_particles_gfx2_particles$Gfx2Particles.md#positionspread)
- [positionStyle](gfx2_particles_gfx2_particles$Gfx2Particles.md#positionstyle)
- [rotation](gfx2_particles_gfx2_particles$Gfx2Particles.md#rotation)
- [scale](gfx2_particles_gfx2_particles$Gfx2Particles.md#scale)
- [sizeBase](gfx2_particles_gfx2_particles$Gfx2Particles.md#sizebase)
- [sizeSpread](gfx2_particles_gfx2_particles$Gfx2Particles.md#sizespread)
- [sizeTween](gfx2_particles_gfx2_particles$Gfx2Particles.md#sizetween)
- [texture](gfx2_particles_gfx2_particles$Gfx2Particles.md#texture)
- [velocityBase](gfx2_particles_gfx2_particles$Gfx2Particles.md#velocitybase)
- [velocityExplodeSpeedBase](gfx2_particles_gfx2_particles$Gfx2Particles.md#velocityexplodespeedbase)
- [velocityExplodeSpeedSpread](gfx2_particles_gfx2_particles$Gfx2Particles.md#velocityexplodespeedspread)
- [velocitySpread](gfx2_particles_gfx2_particles$Gfx2Particles.md#velocityspread)
- [velocityStyle](gfx2_particles_gfx2_particles$Gfx2Particles.md#velocitystyle)
- [visible](gfx2_particles_gfx2_particles$Gfx2Particles.md#visible)

### Constructors

- [constructor](gfx2_particles_gfx2_particles$Gfx2Particles.md#constructor)

## Methods

### createParticle

▸ **createParticle**(): `Particle`

The "createParticle" function creates a particle with various properties such as position, velocity, size, opacity,
acceleration, angle, and age.

#### Returns

`Particle`

a Particle object.

___

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

### getTexture

▸ **getTexture**(): ``null`` \| `HTMLImageElement` \| `ImageBitmap`

The "getTexture" function returns the particle texture.

#### Returns

``null`` \| `HTMLImageElement` \| `ImageBitmap`

The texture.

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

The "paint" function is rendering the particles cloud.

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

### setTexture

▸ **setTexture**(`texture`): `void`

The "setTexture" function sets the particle texture.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `texture` | `HTMLImageElement` \| `ImageBitmap` | The texture. |

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

### accelerationBase

• **accelerationBase**: [`vec2`](../modules/core_global.md#vec2)

___

### accelerationSpread

• **accelerationSpread**: [`vec2`](../modules/core_global.md#vec2)

___

### accelerationTween

• **accelerationTween**: [`TweenVEC2`](core_tween$TweenVEC2.md)

___

### angleAccelerationBase

• **angleAccelerationBase**: `number`

___

### angleAccelerationSpread

• **angleAccelerationSpread**: `number`

___

### angleBase

• **angleBase**: `number`

___

### angleSpread

• **angleSpread**: `number`

___

### angleVelocityBase

• **angleVelocityBase**: `number`

___

### angleVelocitySpread

• **angleVelocitySpread**: `number`

___

### emitterAge

• **emitterAge**: `number`

___

### emitterAlive

• **emitterAlive**: `boolean`

___

### emitterDeathAge

• **emitterDeathAge**: `number`

___

### offset

• **offset**: [`vec2`](../modules/core_global.md#vec2)

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[offset](gfx2_gfx2_drawable$Gfx2Drawable.md#offset)

___

### opacityBase

• **opacityBase**: `number`

___

### opacitySpread

• **opacitySpread**: `number`

___

### opacityTween

• **opacityTween**: [`TweenNumber`](core_tween$TweenNumber.md)

___

### particleAlivedCount

• **particleAlivedCount**: `number`

___

### particleArray

• **particleArray**: `Particle`[]

___

### particleDeathAge

• **particleDeathAge**: `number`

___

### particleQuantity

• **particleQuantity**: `number`

___

### particlesPerSecond

• **particlesPerSecond**: `number`

___

### position

• **position**: [`vec2`](../modules/core_global.md#vec2)

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[position](gfx2_gfx2_drawable$Gfx2Drawable.md#position)

___

### positionBase

• **positionBase**: [`vec2`](../modules/core_global.md#vec2)

___

### positionCircleRadiusBase

• **positionCircleRadiusBase**: `number`

___

### positionRadiusSpread

• **positionRadiusSpread**: `number`

___

### positionSpread

• **positionSpread**: [`vec2`](../modules/core_global.md#vec2)

___

### positionStyle

• **positionStyle**: [`PositionStyle`](../enums/gfx2_particles_gfx2_particles$PositionStyle.md)

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

### sizeBase

• **sizeBase**: `number`

___

### sizeSpread

• **sizeSpread**: `number`

___

### sizeTween

• **sizeTween**: [`TweenNumber`](core_tween$TweenNumber.md)

___

### texture

• **texture**: `HTMLImageElement` \| `ImageBitmap`

___

### velocityBase

• **velocityBase**: [`vec2`](../modules/core_global.md#vec2)

___

### velocityExplodeSpeedBase

• **velocityExplodeSpeedBase**: `number`

___

### velocityExplodeSpeedSpread

• **velocityExplodeSpeedSpread**: `number`

___

### velocitySpread

• **velocitySpread**: [`vec2`](../modules/core_global.md#vec2)

___

### velocityStyle

• **velocityStyle**: [`VelocityStyle`](../enums/gfx2_particles_gfx2_particles$VelocityStyle.md)

___

### visible

• **visible**: `boolean`

#### Inherited from

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[visible](gfx2_gfx2_drawable$Gfx2Drawable.md#visible)

## Constructors

### constructor

• **new Gfx2Particles**(`options`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<[`ParticlesOptions`](../interfaces/gfx2_particles_gfx2_particles$ParticlesOptions.md)\> | An object containing various options for configuring the behavior of the particles cloud. |

#### Overrides

[Gfx2Drawable](gfx2_gfx2_drawable$Gfx2Drawable.md).[constructor](gfx2_gfx2_drawable$Gfx2Drawable.md#constructor)
