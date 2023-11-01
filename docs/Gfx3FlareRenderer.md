[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_flare/gfx3\_flare\_renderer](../modules/gfx3_flare_gfx3_flare_renderer.md) / Gfx3FlareRenderer

# Class: Gfx3FlareRenderer

[gfx3_flare/gfx3_flare_renderer](../modules/gfx3_flare_gfx3_flare_renderer.md).Gfx3FlareRenderer

The `Gfx3FlareRenderer` class is a singleton renderer responsible to display texture on the screen
very quickly. It is ideal for lens-flare effect, rain, snow or every effect on the screen focal.
Nota bene: The top-left corner is at coordinates 0, 0 on the screen.

## Hierarchy

- [`Gfx3RendererAbstract`](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md)

  ↳ **`Gfx3FlareRenderer`**

## Table of contents

### Methods

- [drawFlare](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#drawflare)
- [render](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#render)

### Properties

- [angle](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#angle)
- [color](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#color)
- [flares](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#flares)
- [grp0](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#grp0)
- [grp1](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#grp1)
- [offset](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#offset)
- [pipeline](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#pipeline)
- [resolution](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#resolution)
- [scale](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#scale)
- [size](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#size)
- [translation](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#translation)

### Constructors

- [constructor](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md#constructor)

## Methods

### drawFlare

▸ **drawFlare**(`flare`): `void`

The "drawFlare" function draw a flare object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `flare` | [`Gfx3Flare`](gfx3_flare_gfx3_flare$Gfx3Flare.md) | The flare object. |

#### Returns

`void`

___

### render

▸ **render**(): `void`

The "render" function.

#### Returns

`void`

## Properties

### angle

• **angle**: `Float32Array`

___

### color

• **color**: `Float32Array`

___

### flares

• **flares**: [`Gfx3Flare`](gfx3_flare_gfx3_flare$Gfx3Flare.md)[]

___

### grp0

• **grp0**: [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

___

### grp1

• **grp1**: [`Gfx3DynamicGroup`](gfx3_gfx3_group$Gfx3DynamicGroup.md)

___

### offset

• **offset**: `Float32Array`

___

### pipeline

• **pipeline**: `GPURenderPipeline`

#### Inherited from

[Gfx3RendererAbstract](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md).[pipeline](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md#pipeline)

___

### resolution

• **resolution**: `Float32Array`

___

### scale

• **scale**: `Float32Array`

___

### size

• **size**: `Float32Array`

___

### translation

• **translation**: `Float32Array`

## Constructors

### constructor

• **new Gfx3FlareRenderer**()

The constructor.

#### Overrides

[Gfx3RendererAbstract](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md).[constructor](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md#constructor)
