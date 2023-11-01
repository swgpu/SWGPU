[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_sprite/gfx3\_sprite\_renderer](../modules/gfx3_sprite_gfx3_sprite_renderer.md) / Gfx3SpriteRenderer

# Class: Gfx3SpriteRenderer

[gfx3_sprite/gfx3_sprite_renderer](../modules/gfx3_sprite_gfx3_sprite_renderer.md).Gfx3SpriteRenderer

The `Gfx3SpriteRenderer` class is a singleton renderer responsible to display sprite.

## Hierarchy

- [`Gfx3RendererAbstract`](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md)

  ↳ **`Gfx3SpriteRenderer`**

## Table of contents

### Methods

- [drawSprite](gfx3_sprite_gfx3_sprite_renderer$Gfx3SpriteRenderer.md#drawsprite)
- [render](gfx3_sprite_gfx3_sprite_renderer$Gfx3SpriteRenderer.md#render)

### Properties

- [grp0](gfx3_sprite_gfx3_sprite_renderer$Gfx3SpriteRenderer.md#grp0)
- [mvpcMatrix](gfx3_sprite_gfx3_sprite_renderer$Gfx3SpriteRenderer.md#mvpcmatrix)
- [pipeline](gfx3_sprite_gfx3_sprite_renderer$Gfx3SpriteRenderer.md#pipeline)
- [sprites](gfx3_sprite_gfx3_sprite_renderer$Gfx3SpriteRenderer.md#sprites)

### Constructors

- [constructor](gfx3_sprite_gfx3_sprite_renderer$Gfx3SpriteRenderer.md#constructor)

## Methods

### drawSprite

▸ **drawSprite**(`sprite`): `void`

The "drawSprite" function draw a sprite.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sprite` | [`Gfx3Sprite`](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md) | The sprite. |

#### Returns

`void`

___

### render

▸ **render**(): `void`

The "render" function.

#### Returns

`void`

## Properties

### grp0

• **grp0**: [`Gfx3DynamicGroup`](gfx3_gfx3_group$Gfx3DynamicGroup.md)

___

### mvpcMatrix

• **mvpcMatrix**: `Float32Array`

___

### pipeline

• **pipeline**: `GPURenderPipeline`

#### Inherited from

[Gfx3RendererAbstract](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md).[pipeline](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md#pipeline)

___

### sprites

• **sprites**: [`Gfx3Sprite`](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md)[]

## Constructors

### constructor

• **new Gfx3SpriteRenderer**()

The constructor.

#### Overrides

[Gfx3RendererAbstract](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md).[constructor](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md#constructor)
