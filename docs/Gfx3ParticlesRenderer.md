[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_particules/gfx3\_particles\_renderer](../modules/gfx3_particules_gfx3_particles_renderer.md) / Gfx3ParticlesRenderer

# Class: Gfx3ParticlesRenderer

[gfx3_particules/gfx3_particles_renderer](../modules/gfx3_particules_gfx3_particles_renderer.md).Gfx3ParticlesRenderer

The `Gfx3ParticlesRenderer` class is a singleton renderer responsible to display particles.

## Hierarchy

- [`Gfx3RendererAbstract`](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md)

  ↳ **`Gfx3ParticlesRenderer`**

## Table of contents

### Methods

- [drawParticles](gfx3_particules_gfx3_particles_renderer$Gfx3ParticlesRenderer.md#drawparticles)
- [render](gfx3_particules_gfx3_particles_renderer$Gfx3ParticlesRenderer.md#render)

### Properties

- [grp0](gfx3_particules_gfx3_particles_renderer$Gfx3ParticlesRenderer.md#grp0)
- [grp1](gfx3_particules_gfx3_particles_renderer$Gfx3ParticlesRenderer.md#grp1)
- [mvpcMatrix](gfx3_particules_gfx3_particles_renderer$Gfx3ParticlesRenderer.md#mvpcmatrix)
- [particlesList](gfx3_particules_gfx3_particles_renderer$Gfx3ParticlesRenderer.md#particleslist)
- [pipeline](gfx3_particules_gfx3_particles_renderer$Gfx3ParticlesRenderer.md#pipeline)
- [vMatrix](gfx3_particules_gfx3_particles_renderer$Gfx3ParticlesRenderer.md#vmatrix)

### Constructors

- [constructor](gfx3_particules_gfx3_particles_renderer$Gfx3ParticlesRenderer.md#constructor)

## Methods

### drawParticles

▸ **drawParticles**(`particles`): `void`

The "drawParticles" function draw a particles cloud.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `particles` | [`Gfx3Particles`](gfx3_particules_gfx3_particles$Gfx3Particles.md) | The particles cloud. |

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

### grp1

• **grp1**: [`Gfx3DynamicGroup`](gfx3_gfx3_group$Gfx3DynamicGroup.md)

___

### mvpcMatrix

• **mvpcMatrix**: `Float32Array`

___

### particlesList

• **particlesList**: [`Gfx3Particles`](gfx3_particules_gfx3_particles$Gfx3Particles.md)[]

___

### pipeline

• **pipeline**: `GPURenderPipeline`

#### Inherited from

[Gfx3RendererAbstract](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md).[pipeline](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md#pipeline)

___

### vMatrix

• **vMatrix**: `Float32Array`

## Constructors

### constructor

• **new Gfx3ParticlesRenderer**()

The constructor.

#### Overrides

[Gfx3RendererAbstract](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md).[constructor](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md#constructor)
