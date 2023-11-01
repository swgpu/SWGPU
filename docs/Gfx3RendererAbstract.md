[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3/gfx3\_renderer\_abstract](../modules/gfx3_gfx3_renderer_abstract.md) / Gfx3RendererAbstract

# Class: Gfx3RendererAbstract

[gfx3/gfx3_renderer_abstract](../modules/gfx3_gfx3_renderer_abstract.md).Gfx3RendererAbstract

The `Gfx3RendererAbstract` is an abstract class for all gfx3 renderer.

## Hierarchy

- **`Gfx3RendererAbstract`**

  ↳ [`Gfx3DebugRenderer`](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md)

  ↳ [`Gfx3FlareRenderer`](gfx3_flare_gfx3_flare_renderer$Gfx3FlareRenderer.md)

  ↳ [`Gfx3MeshRenderer`](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md)

  ↳ [`Gfx3ParticlesRenderer`](gfx3_particules_gfx3_particles_renderer$Gfx3ParticlesRenderer.md)

  ↳ [`Gfx3SkyboxRenderer`](gfx3_skybox_gfx3_skybox_renderer$Gfx3SkyboxRenderer.md)

  ↳ [`Gfx3SpriteRenderer`](gfx3_sprite_gfx3_sprite_renderer$Gfx3SpriteRenderer.md)

## Table of contents

### Properties

- [pipeline](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md#pipeline)

### Constructors

- [constructor](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md#constructor)

## Properties

### pipeline

• **pipeline**: `GPURenderPipeline`

## Constructors

### constructor

• **new Gfx3RendererAbstract**(`pipelineName`, `vertexShader`, `fragmentShader`, `pipelineDesc`)

The constructor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pipelineName` | `string` |
| `vertexShader` | `string` |
| `fragmentShader` | `string` |
| `pipelineDesc` | `GPURenderPipelineDescriptor` |
