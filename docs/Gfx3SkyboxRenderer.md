[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_skybox/gfx3\_skybox\_renderer](../modules/gfx3_skybox_gfx3_skybox_renderer.md) / Gfx3SkyboxRenderer

# Class: Gfx3SkyboxRenderer

[gfx3_skybox/gfx3_skybox_renderer](../modules/gfx3_skybox_gfx3_skybox_renderer.md).Gfx3SkyboxRenderer

The `Gfx3SkyboxRenderer` class is a singleton renderer responsible to display skybox.

## Hierarchy

- [`Gfx3RendererAbstract`](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md)

  ↳ **`Gfx3SkyboxRenderer`**

## Table of contents

### Methods

- [draw](gfx3_skybox_gfx3_skybox_renderer$Gfx3SkyboxRenderer.md#draw)
- [render](gfx3_skybox_gfx3_skybox_renderer$Gfx3SkyboxRenderer.md#render)

### Properties

- [grp0](gfx3_skybox_gfx3_skybox_renderer$Gfx3SkyboxRenderer.md#grp0)
- [pipeline](gfx3_skybox_gfx3_skybox_renderer$Gfx3SkyboxRenderer.md#pipeline)
- [skybox](gfx3_skybox_gfx3_skybox_renderer$Gfx3SkyboxRenderer.md#skybox)
- [vpcInverseMatrix](gfx3_skybox_gfx3_skybox_renderer$Gfx3SkyboxRenderer.md#vpcinversematrix)

### Constructors

- [constructor](gfx3_skybox_gfx3_skybox_renderer$Gfx3SkyboxRenderer.md#constructor)

## Methods

### draw

▸ **draw**(`skybox`): `void`

The "draw" function draw a skybox.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `skybox` | [`Gfx3Skybox`](gfx3_skybox_gfx3_skybox$Gfx3Skybox.md) | The skybox. |

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

• **grp0**: [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

___

### pipeline

• **pipeline**: `GPURenderPipeline`

#### Inherited from

[Gfx3RendererAbstract](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md).[pipeline](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md#pipeline)

___

### skybox

• **skybox**: ``null`` \| [`Gfx3Skybox`](gfx3_skybox_gfx3_skybox$Gfx3Skybox.md)

___

### vpcInverseMatrix

• **vpcInverseMatrix**: `Float32Array`

## Constructors

### constructor

• **new Gfx3SkyboxRenderer**()

The constructor.

#### Overrides

[Gfx3RendererAbstract](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md).[constructor](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md#constructor)
