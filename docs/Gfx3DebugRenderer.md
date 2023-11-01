[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3/gfx3\_debug\_renderer](../modules/gfx3_gfx3_debug_renderer.md) / Gfx3DebugRenderer

# Class: Gfx3DebugRenderer

[gfx3/gfx3_debug_renderer](../modules/gfx3_gfx3_debug_renderer.md).Gfx3DebugRenderer

The `Gfx3DebugRenderer` class is a singleton renderer responsible for debug informations shapes.

## Hierarchy

- [`Gfx3RendererAbstract`](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md)

  ↳ **`Gfx3DebugRenderer`**

## Table of contents

### Methods

- [drawBoundingBox](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#drawboundingbox)
- [drawBoundingRect](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#drawboundingrect)
- [drawCircle](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#drawcircle)
- [drawCylinder](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#drawcylinder)
- [drawGizmo](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#drawgizmo)
- [drawGrid](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#drawgrid)
- [drawSphere](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#drawsphere)
- [drawVertices](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#drawvertices)
- [isShowDebug](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#isshowdebug)
- [render](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#render)
- [setShowDebug](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#setshowdebug)

### Properties

- [commands](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#commands)
- [device](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#device)
- [grp0](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#grp0)
- [mvpcMatrix](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#mvpcmatrix)
- [pipeline](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#pipeline)
- [showDebug](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#showdebug)
- [vertexBuffer](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#vertexbuffer)
- [vertexCount](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#vertexcount)

### Constructors

- [constructor](gfx3_gfx3_debug_renderer$Gfx3DebugRenderer.md#constructor)

## Methods

### drawBoundingBox

▸ **drawBoundingBox**(`matrix`, `min`, `max`): `void`

The "drawBoundingBox" function draw a debug bounding box.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`mat4`](../modules/core_global.md#mat4) | The `matrix` parameter is a 4x4 transformation matrix that represents the position, rotation, and scale of the bounding box in 3D space. |
| `min` | [`vec3`](../modules/core_global.md#vec3) | The `min` parameter represents the minimum point of the bounding box. |
| `max` | [`vec3`](../modules/core_global.md#vec3) | The `max` parameter represents the maximum point of the bounding box. |

#### Returns

`void`

___

### drawBoundingRect

▸ **drawBoundingRect**(`matrix`, `min`, `max`): `void`

The "drawBoundingRect" function draw a debug rectangle shape.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`mat4`](../modules/core_global.md#mat4) | The `matrix` parameter is a 4x4 transformation matrix that represents the position, rotation, and scale of the bounding rectangle in 3D space. |
| `min` | [`vec2`](../modules/core_global.md#vec2) | The `min` parameter is the minimum point of the bounding rectangle. |
| `max` | [`vec2`](../modules/core_global.md#vec2) | The `max` parameter is the maximum point of the bounding rectangle. |

#### Returns

`void`

___

### drawCircle

▸ **drawCircle**(`matrix`, `radius?`, `step?`): `void`

The "drawCircle" function draw a debug circle shape.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `matrix` | [`mat4`](../modules/core_global.md#mat4) | `undefined` | The `matrix` parameter is a 4x4 transformation matrix that represents the position, rotation, and scale of the circle in 3D space. |
| `radius?` | `number` | `1` | The `radius` parameter represents the radius of the circle that will be drawn. It determines the size of the circle. |
| `step?` | `number` | `4` | The `step` parameter determines the number of segments or points used to approximate the circle. The higher the value of "step", the smoother and more detailed the circle will appear. |

#### Returns

`void`

___

### drawCylinder

▸ **drawCylinder**(`matrix`, `radius`, `height`, `step`, `closed`): `void`

The "drawCylinder" function draw a debug cylinder shape.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`mat4`](../modules/core_global.md#mat4) | The `matrix` parameter is a 4x4 transformation matrix that represents the position, rotation, and scale of the cylinder in 3D space. |
| `radius` | `number` | The "radius" parameter represents the radius of the cylinder. |
| `height` | `number` | The "height" parameter represents the height of the cylinder. |
| `step` | `number` | The "step" parameter determines the number of divisions or segments in the cylinder. |
| `closed` | `boolean` | A boolean value indicating whether the cylinder should be closed or not. If set to true, the top and bottom faces of the cylinder will be included. If set to false, only the side faces will be drawn. |

#### Returns

`void`

___

### drawGizmo

▸ **drawGizmo**(`matrix`, `size?`): `void`

The "drawGizmo" function draw a debug gizmo.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `matrix` | [`mat4`](../modules/core_global.md#mat4) | `undefined` | The `matrix` parameter is a 4x4 transformation matrix that represents the position, rotation, and scale of the gizmo in 3D space. |
| `size?` | `number` | `1` | The `size` parameter is a number that determines the length of each axis of the gizmo. It is optional and has a default value of 1. |

#### Returns

`void`

___

### drawGrid

▸ **drawGrid**(`matrix`, `extend?`, `spacing?`): `void`

The "drawGrid" function draw a debug grid.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `matrix` | [`mat4`](../modules/core_global.md#mat4) | `undefined` | The `matrix` parameter is a 4x4 transformation matrix that represents the position, rotation, and scale of the grid in 3D space. |
| `extend?` | `number` | `3` | The `extend` parameter determines the number of cells in each direction from the center of the grid. For example, if `extend` is set to 3, then there will be 7 cells in each direction (total of 49 cells). |
| `spacing?` | `number` | `1` | The `spacing` parameter determines the distance between each grid line. It specifies how far apart each line should be from each other. |

#### Returns

`void`

___

### drawSphere

▸ **drawSphere**(`matrix`, `radius?`, `step?`): `void`

The "drawSphere" function draw a debug sphere.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `matrix` | [`mat4`](../modules/core_global.md#mat4) | `undefined` | The `matrix` parameter is a 4x4 transformation matrix that represents the position, rotation, and scale of the sphere in 3D space. |
| `radius?` | `number` | `1` | The `radius` parameter represents the radius of the sphere. It determines the size of the sphere. The default value is 1, but you can provide a different value if you want a larger or smaller sphere. |
| `step?` | `number` | `4` | The "step" parameter determines the level of detail or smoothness of the sphere. It represents the number of divisions or segments along the latitude and longitude lines of the sphere. The higher the value of "step", the more segments there will be and the smoother the sphere will appear. |

#### Returns

`void`

___

### drawVertices

▸ **drawVertices**(`vertices`, `vertexCount`, `matrix`): `void`

The "drawVertices" draw a set of vertices in line-list topology.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vertices` | `number`[] | An array of numbers representing the vertices of a shape. Each vertex is represented by three consecutive numbers, representing its x, y, and z coordinates. |
| `vertexCount` | `number` | The `vertexCount` parameter represents the number of vertices in the array "vertices". |
| `matrix` | [`mat4`](../modules/core_global.md#mat4) | The `matrix` parameter is a 4x4 matrix used to translate, rotate, or scale the vertices before they are drawn. |

#### Returns

`void`

___

### isShowDebug

▸ **isShowDebug**(): `boolean`

The "isShowDebug" function returns if debug information should be displayed.

#### Returns

`boolean`

The showDebug property.

___

### render

▸ **render**(): `void`

The "render" function.

#### Returns

`void`

___

### setShowDebug

▸ **setShowDebug**(`showDebug`): `void`

The "setShowDebug" function sets the value of the showDebug property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `showDebug` | `boolean` | Enable or not to show debug information. |

#### Returns

`void`

## Properties

### commands

• **commands**: `Command`[]

___

### device

• **device**: `GPUDevice`

___

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

### showDebug

• **showDebug**: `boolean`

___

### vertexBuffer

• **vertexBuffer**: `GPUBuffer`

___

### vertexCount

• **vertexCount**: `number`

## Constructors

### constructor

• **new Gfx3DebugRenderer**()

The constructor.

#### Overrides

[Gfx3RendererAbstract](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md).[constructor](gfx3_gfx3_renderer_abstract$Gfx3RendererAbstract.md#constructor)
