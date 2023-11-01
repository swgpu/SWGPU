[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_mesh/gfx3\_mesh\_renderer](../modules/gfx3_mesh_gfx3_mesh_renderer.md) / Gfx3MeshRenderer

# Class: Gfx3MeshRenderer

[gfx3_mesh/gfx3_mesh_renderer](../modules/gfx3_mesh_gfx3_mesh_renderer.md).Gfx3MeshRenderer

The `Gfx3MeshRenderer` class is a singleton renderer responsible to display mesh in a 3D graphics system
and provides methods for controlling directionnal light, point light, fog and decals.

## Hierarchy

- [`Gfx3RendererAbstract`](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md)

  ↳ **`Gfx3MeshRenderer`**

## Table of contents

### Methods

- [drawDecal](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#drawdecal)
- [drawMesh](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#drawmesh)
- [drawPointLight](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#drawpointlight)
- [enableDirLight](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#enabledirlight)
- [enableFog](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#enablefog)
- [render](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#render)
- [setDecalAtlas](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#setdecalatlas)

### Properties

- [camPos](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#campos)
- [decalAtlas](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#decalatlas)
- [decalCount](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#decalcount)
- [decals](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#decals)
- [dirLight](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#dirlight)
- [fog](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#fog)
- [grp0](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#grp0)
- [grp1](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#grp1)
- [meshCommands](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#meshcommands)
- [meshLayer](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#meshlayer)
- [meshMatrices](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#meshmatrices)
- [pipeline](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#pipeline)
- [pointLightCount](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#pointlightcount)
- [pointLights](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#pointlights)
- [texturesChanged](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#textureschanged)

### Constructors

- [constructor](gfx3_mesh_gfx3_mesh_renderer$Gfx3MeshRenderer.md#constructor)

## Methods

### drawDecal

▸ **drawDecal**(`layer`, `sx`, `sy`, `sw`, `sh`, `position`, `orientationX`, `orientationY`, `orientationZ`, `size`, `opacity`): `void`

The "drawDecal" function is used to sets a decal projector and draw texture over meshes
with the specified layer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layer` | `number` | The layer target. |
| `sx` | `number` | The x-coordinate of the decal sprite in the atlas texture. |
| `sy` | `number` | The y-coordinate of the decal sprite in the atlas texture. |
| `sw` | `number` | The width of the decal sprite in the atlas texture. |
| `sh` | `number` | The height of the decal sprite in the atlas texture. |
| `position` | [`vec3`](../modules/core_global.md#vec3) | The position of projector (center). |
| `orientationX` | [`vec3`](../modules/core_global.md#vec3) | The x-axis orientation of the projector. |
| `orientationY` | [`vec3`](../modules/core_global.md#vec3) | The y-axis orientation of the projector. |
| `orientationZ` | [`vec3`](../modules/core_global.md#vec3) | The z-axis orientation of the projector. |
| `size` | [`vec3`](../modules/core_global.md#vec3) | The size (width, height, depth) of the projector. |
| `opacity` | `number` | The opacity or transparency of the decal. |

#### Returns

`void`

___

### drawMesh

▸ **drawMesh**(`mesh`, `matrix?`): `void`

The "drawMesh" function draw a mesh.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mesh` | [`Gfx3Mesh`](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md) | `undefined` | The mesh. |
| `matrix?` | ``null`` \| [`mat4`](../modules/core_global.md#mat4) | `null` | The `matrix` parameter is an optional parameter that represents a transformation 4x4 matrix. |

#### Returns

`void`

___

### drawPointLight

▸ **drawPointLight**(`position`, `ambient`, `diffuse`, `specular`, `intensity?`, `constant?`, `linear?`, `exp?`): `void`

The "drawPointLight" function adds a point light with specified properties.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `position` | [`vec3`](../modules/core_global.md#vec3) | `undefined` | The position of the point light in 3D space. |
| `ambient` | [`vec3`](../modules/core_global.md#vec3) | `undefined` | The ambient color of the point light. |
| `diffuse` | [`vec3`](../modules/core_global.md#vec3) | `undefined` | The diffuse color of the point light. |
| `specular` | [`vec3`](../modules/core_global.md#vec3) | `undefined` | The specular color of the point light. |
| `intensity?` | `number` | `1` | The brightness or strength of the point light. |
| `constant?` | `number` | `1` | The constant parameter represents the constant attenuation factor of the point light. It determines how quickly the light intensity diminishes with distance from the light source. A higher constant value will result in a slower decrease in intensity. |
| `linear?` | `number` | `0` | The "linear" parameter represents the linear attenuation factor of the point light. It determines how the intensity of the light decreases as the distance from the light source increases. A higher linear value will cause the light to attenuate more quickly, resulting in a shorter range of influence. |
| `exp?` | `number` | `0` | The "exp" parameter represents the exponent of the attenuation equation for the point light. |

#### Returns

`void`

___

### enableDirLight

▸ **enableDirLight**(`enabled`, `direction`, `ambient`, `diffuse`, `specular`, `intensity?`): `void`

The "enableDirLight" function enables a directional light with specified properties.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `enabled` | `boolean` | `undefined` | A boolean value indicating whether the directional light is enabled or not. |
| `direction` | [`vec3`](../modules/core_global.md#vec3) | `undefined` | The direction of the directional light. |
| `ambient` | [`vec3`](../modules/core_global.md#vec3) | `undefined` | The ambient color of the directional light. |
| `diffuse` | [`vec3`](../modules/core_global.md#vec3) | `undefined` | The diffuse color of the directional light. |
| `specular` | [`vec3`](../modules/core_global.md#vec3) | `undefined` | The specular color of the directional light. |
| `intensity?` | `number` | `1` | The strength or brightness of the directional light. |

#### Returns

`void`

___

### enableFog

▸ **enableFog**(`enabled`, `color?`, `near?`, `far?`): `void`

The "enableFog" function enables the fog with specified properties.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `enabled` | `boolean` | `undefined` | A boolean value indicating whether the fog is enabled or not. |
| `color` | [`vec3`](../modules/core_global.md#vec3) | `undefined` | The fog color. |
| `near?` | `number` | `3.0` | The distance from the camera at which the fog starts to appear. |
| `far?` | `number` | `15.0` | The distance from the camera at which the fog effect should start to fade out. |

#### Returns

`void`

___

### render

▸ **render**(): `void`

The "render" function.

#### Returns

`void`

___

### setDecalAtlas

▸ **setDecalAtlas**(`decalAtlas`): `void`

The "setDecalAtlas" function sets the decal texture atlas that contains all decal sprites.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `decalAtlas` | [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md) | The decal texture atlas. |

#### Returns

`void`

## Properties

### camPos

• **camPos**: `Float32Array`

___

### decalAtlas

• **decalAtlas**: [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

___

### decalCount

• **decalCount**: `Uint32Array`

___

### decals

• **decals**: `Float32Array`

___

### dirLight

• **dirLight**: `Float32Array`

___

### fog

• **fog**: `Float32Array`

___

### grp0

• **grp0**: [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

___

### grp1

• **grp1**: [`Gfx3DynamicGroup`](gfx3_gfx3_group$Gfx3DynamicGroup.md)

___

### meshCommands

• **meshCommands**: `MeshCommand`[]

___

### meshLayer

• **meshLayer**: `Uint32Array`

___

### meshMatrices

• **meshMatrices**: `Float32Array`

___

### pipeline

• **pipeline**: `GPURenderPipeline`

#### Inherited from

[Gfx3RendererAbstract](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md).[pipeline](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md#pipeline)

___

### pointLightCount

• **pointLightCount**: `Uint32Array`

___

### pointLights

• **pointLights**: `Float32Array`

___

### texturesChanged

• **texturesChanged**: `boolean`

## Constructors

### constructor

• **new Gfx3MeshRenderer**()

The constructor.

#### Overrides

[Gfx3RendererAbstract](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md).[constructor](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md#constructor)
