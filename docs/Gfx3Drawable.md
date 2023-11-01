[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3/gfx3\_drawable](../modules/gfx3_gfx3_drawable.md) / Gfx3Drawable

# Class: Gfx3Drawable

[gfx3/gfx3_drawable](../modules/gfx3_gfx3_drawable.md).Gfx3Drawable

The `Gfx3Drawable` class represents a drawable object in a 3D graphics system.

## Hierarchy

- [`Gfx3Transformable`](gfx3_gfx3_transformable$Gfx3Transformable.md)

  ↳ **`Gfx3Drawable`**

  ↳↳ [`Gfx3Flare`](gfx3_flare_gfx3_flare$Gfx3Flare.md)

  ↳↳ [`Gfx3Mesh`](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md)

  ↳↳ [`Gfx3Particles`](gfx3_particules_gfx3_particles$Gfx3Particles.md)

  ↳↳ [`Gfx3Skybox`](gfx3_skybox_gfx3_skybox$Gfx3Skybox.md)

  ↳↳ [`Gfx3Sprite`](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md)

## Table of contents

### Methods

- [beginVertices](gfx3_gfx3_drawable$Gfx3Drawable.md#beginvertices)
- [defineVertex](gfx3_gfx3_drawable$Gfx3Drawable.md#definevertex)
- [delete](gfx3_gfx3_drawable$Gfx3Drawable.md#delete)
- [draw](gfx3_gfx3_drawable$Gfx3Drawable.md#draw)
- [endVertices](gfx3_gfx3_drawable$Gfx3Drawable.md#endvertices)
- [getBoundingBox](gfx3_gfx3_drawable$Gfx3Drawable.md#getboundingbox)
- [getLocalAxies](gfx3_gfx3_drawable$Gfx3Drawable.md#getlocalaxies)
- [getPosition](gfx3_gfx3_drawable$Gfx3Drawable.md#getposition)
- [getPositionX](gfx3_gfx3_drawable$Gfx3Drawable.md#getpositionx)
- [getPositionY](gfx3_gfx3_drawable$Gfx3Drawable.md#getpositiony)
- [getPositionZ](gfx3_gfx3_drawable$Gfx3Drawable.md#getpositionz)
- [getRotation](gfx3_gfx3_drawable$Gfx3Drawable.md#getrotation)
- [getRotationQuaternion](gfx3_gfx3_drawable$Gfx3Drawable.md#getrotationquaternion)
- [getRotationX](gfx3_gfx3_drawable$Gfx3Drawable.md#getrotationx)
- [getRotationY](gfx3_gfx3_drawable$Gfx3Drawable.md#getrotationy)
- [getRotationZ](gfx3_gfx3_drawable$Gfx3Drawable.md#getrotationz)
- [getScale](gfx3_gfx3_drawable$Gfx3Drawable.md#getscale)
- [getScaleX](gfx3_gfx3_drawable$Gfx3Drawable.md#getscalex)
- [getScaleY](gfx3_gfx3_drawable$Gfx3Drawable.md#getscaley)
- [getScaleZ](gfx3_gfx3_drawable$Gfx3Drawable.md#getscalez)
- [getTransformMatrix](gfx3_gfx3_drawable$Gfx3Drawable.md#gettransformmatrix)
- [getVertexCount](gfx3_gfx3_drawable$Gfx3Drawable.md#getvertexcount)
- [getVertexSubBufferOffset](gfx3_gfx3_drawable$Gfx3Drawable.md#getvertexsubbufferoffset)
- [getVertexSubBufferSize](gfx3_gfx3_drawable$Gfx3Drawable.md#getvertexsubbuffersize)
- [getVertices](gfx3_gfx3_drawable$Gfx3Drawable.md#getvertices)
- [getWorldBoundingBox](gfx3_gfx3_drawable$Gfx3Drawable.md#getworldboundingbox)
- [rotate](gfx3_gfx3_drawable$Gfx3Drawable.md#rotate)
- [setPosition](gfx3_gfx3_drawable$Gfx3Drawable.md#setposition)
- [setRotation](gfx3_gfx3_drawable$Gfx3Drawable.md#setrotation)
- [setRotationQuaternion](gfx3_gfx3_drawable$Gfx3Drawable.md#setrotationquaternion)
- [setScale](gfx3_gfx3_drawable$Gfx3Drawable.md#setscale)
- [setVertices](gfx3_gfx3_drawable$Gfx3Drawable.md#setvertices)
- [translate](gfx3_gfx3_drawable$Gfx3Drawable.md#translate)
- [update](gfx3_gfx3_drawable$Gfx3Drawable.md#update)
- [zoom](gfx3_gfx3_drawable$Gfx3Drawable.md#zoom)

### Properties

- [boundingBox](gfx3_gfx3_drawable$Gfx3Drawable.md#boundingbox)
- [isTransformMatrixDirty](gfx3_gfx3_drawable$Gfx3Drawable.md#istransformmatrixdirty)
- [position](gfx3_gfx3_drawable$Gfx3Drawable.md#position)
- [rotation](gfx3_gfx3_drawable$Gfx3Drawable.md#rotation)
- [scale](gfx3_gfx3_drawable$Gfx3Drawable.md#scale)
- [transformMatrix](gfx3_gfx3_drawable$Gfx3Drawable.md#transformmatrix)
- [vertexCount](gfx3_gfx3_drawable$Gfx3Drawable.md#vertexcount)
- [vertexStride](gfx3_gfx3_drawable$Gfx3Drawable.md#vertexstride)
- [vertexSubBuffer](gfx3_gfx3_drawable$Gfx3Drawable.md#vertexsubbuffer)
- [vertices](gfx3_gfx3_drawable$Gfx3Drawable.md#vertices)

### Constructors

- [constructor](gfx3_gfx3_drawable$Gfx3Drawable.md#constructor)

## Methods

### beginVertices

▸ **beginVertices**(`vertexCount`): `void`

The "beginVertices" function prepare your vertex buffer to write process.
Warning: You need to call this method before define your vertices.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vertexCount` | `number` | The parameter `vertexCount` represents the number of vertices that will be stored in the vertex buffer. |

#### Returns

`void`

___

### defineVertex

▸ **defineVertex**(`...v`): `void`

The "defineVertex" function takes in an array of numbers representing a vertex.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...v` | `number`[] | An array of numbers representing the attributes of vertex. |

#### Returns

`void`

___

### delete

▸ **delete**(): `void`

The "delete" function free all resources.
Warning: you need to call this method to free allocation for this object.

#### Returns

`void`

___

### draw

▸ **draw**(): `void`

The "draw" is a virtual method used for the draw phase.

#### Returns

`void`

___

### endVertices

▸ **endVertices**(): `void`

The "endVertices" function writes vertex data to the vertex buffer and calculates the bounding box
based on the vertices.

#### Returns

`void`

___

### getBoundingBox

▸ **getBoundingBox**(): [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The "getBoundingBox" function returns the bounding box.

#### Returns

[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The bounding box.

___

### getLocalAxies

▸ **getLocalAxies**(): [`vec3`](../modules/core_global.md#vec3)[]

The "getLocalAxies" function returns an array of three vectors representing the local axes of an
object based on its transformation matrix.

#### Returns

[`vec3`](../modules/core_global.md#vec3)[]

The three axis vector.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getLocalAxies](gfx3_gfx3_transformable$Gfx3Transformable.md#getlocalaxies)

___

### getPosition

▸ **getPosition**(): [`vec3`](../modules/core_global.md#vec3)

The "getPosition" function returns the position.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The position.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getPosition](gfx3_gfx3_transformable$Gfx3Transformable.md#getposition)

___

### getPositionX

▸ **getPositionX**(): `number`

The "getPositionX" function returns the x-coordinate of the position.

#### Returns

`number`

The X coordinate.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getPositionX](gfx3_gfx3_transformable$Gfx3Transformable.md#getpositionx)

___

### getPositionY

▸ **getPositionY**(): `number`

The "getPositionY" function returns the y-coordinate of the position.

#### Returns

`number`

The Y coordinate.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getPositionY](gfx3_gfx3_transformable$Gfx3Transformable.md#getpositiony)

___

### getPositionZ

▸ **getPositionZ**(): `number`

The "getPositionZ" function returns the z-coordinate of the position.

#### Returns

`number`

The Z coordinate.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getPositionZ](gfx3_gfx3_transformable$Gfx3Transformable.md#getpositionz)

___

### getRotation

▸ **getRotation**(): [`vec3`](../modules/core_global.md#vec3)

The "getRotation" function returns the rotation as Euler angles.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The rotation Euler angles (radians).

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getRotation](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotation)

___

### getRotationQuaternion

▸ **getRotationQuaternion**(): [`vec4`](../modules/core_global.md#vec4)

The "getRotationQuaternion" function returns the Quaternion based on the Euler angles provided.

#### Returns

[`vec4`](../modules/core_global.md#vec4)

A quaternion.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getRotationQuaternion](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotationquaternion)

___

### getRotationX

▸ **getRotationX**(): `number`

The "getRotationX" function returns the rotation angle on x-axis.

#### Returns

`number`

The rotation angle on x-axis.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getRotationX](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotationx)

___

### getRotationY

▸ **getRotationY**(): `number`

The "getRotationY" function returns the rotation angle on y-axis.

#### Returns

`number`

The rotation angle on y-axis.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getRotationY](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotationy)

___

### getRotationZ

▸ **getRotationZ**(): `number`

The "getRotationZ" function returns the rotation angle on z-axis.

#### Returns

`number`

The rotation angle on z-axis.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getRotationZ](gfx3_gfx3_transformable$Gfx3Transformable.md#getrotationz)

___

### getScale

▸ **getScale**(): [`vec3`](../modules/core_global.md#vec3)

The "getScale" function returns the scale as a 3D vector.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The scale.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getScale](gfx3_gfx3_transformable$Gfx3Transformable.md#getscale)

___

### getScaleX

▸ **getScaleX**(): `number`

The "getScaleX" function returns the scale factor on x-axis.

#### Returns

`number`

The x-axis scale factor.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getScaleX](gfx3_gfx3_transformable$Gfx3Transformable.md#getscalex)

___

### getScaleY

▸ **getScaleY**(): `number`

The "getScaleY" function returns the scale factor on y-axis.

#### Returns

`number`

The y-axis scale factor.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getScaleY](gfx3_gfx3_transformable$Gfx3Transformable.md#getscaley)

___

### getScaleZ

▸ **getScaleZ**(): `number`

The "getScaleZ" function returns the scale factor on z-axis.

#### Returns

`number`

The z-axis scale factor.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getScaleZ](gfx3_gfx3_transformable$Gfx3Transformable.md#getscalez)

___

### getTransformMatrix

▸ **getTransformMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getTransformMatrix" function returns the transform matrix from position, rotation and scale values.

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The transform matrix.

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[getTransformMatrix](gfx3_gfx3_transformable$Gfx3Transformable.md#gettransformmatrix)

___

### getVertexCount

▸ **getVertexCount**(): `number`

The "getVertexCount" function returns the number of vertices.

#### Returns

`number`

The number of vertices.

___

### getVertexSubBufferOffset

▸ **getVertexSubBufferOffset**(): `number`

The "getVertexSubBufferOffset" function returns the offset of the vertex sub-buffer.
Nota bene: All vertices are stored in one global vertex buffer handled by "Gfx3Manager".
SubBuffer is just a reference offset/size pointing to the big one buffer.

#### Returns

`number`

The offset of the vertex sub-buffer.

___

### getVertexSubBufferSize

▸ **getVertexSubBufferSize**(): `number`

The "getVertexSubBufferSize" function returns the byte length of the vertex sub buffer.
Nota bene: All vertices are stored in one global vertex buffer handled by "Gfx3Manager".
SubBuffer is just a reference offset/size pointing to the big one buffer.

#### Returns

`number`

The byte length of the vertex sub buffer.

___

### getVertices

▸ **getVertices**(): `number`[]

The "getVertices" function returns an array of numbers representing vertices.

#### Returns

`number`[]

The vertices property.

___

### getWorldBoundingBox

▸ **getWorldBoundingBox**(): [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The "getWorldBoundingBox" function returns the world bounding box by transforming its
local bounding box using its transform matrix.

#### Returns

[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The world bounding box.

___

### rotate

▸ **rotate**(`x`, `y`, `z`): `void`

The "rotate" function add rotation values to Euler angles.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The rotation angle on x-axis in radians. |
| `y` | `number` | The rotation angle on y-axis in radians. |
| `z` | `number` | The rotation angle on z-axis in radians. |

#### Returns

`void`

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[rotate](gfx3_gfx3_transformable$Gfx3Transformable.md#rotate)

___

### setPosition

▸ **setPosition**(`x`, `y`, `z`): `void`

The "setPosition" function set the position with the given x, y and z coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The X coordinate of the position. |
| `y` | `number` | The Y coordinate of the position. |
| `z` | `number` | The Z coordinate of the position. |

#### Returns

`void`

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[setPosition](gfx3_gfx3_transformable$Gfx3Transformable.md#setposition)

___

### setRotation

▸ **setRotation**(`x`, `y`, `z`): `void`

The "setRotation" function sets rotation Euler angles (in radians).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The rotation angle on x-axis in radians. |
| `y` | `number` | The rotation angle on y-axis in radians. |
| `z` | `number` | The rotation angle on z-axis in radians. |

#### Returns

`void`

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[setRotation](gfx3_gfx3_transformable$Gfx3Transformable.md#setrotation)

___

### setRotationQuaternion

▸ **setRotationQuaternion**(`quaternion`): `void`

The "setRotationQuaternion" function sets the rotation using Quaternion.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quaternion` | [`vec4`](../modules/core_global.md#vec4) | The quaternion. |

#### Returns

`void`

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[setRotationQuaternion](gfx3_gfx3_transformable$Gfx3Transformable.md#setrotationquaternion)

___

### setScale

▸ **setScale**(`x`, `y`, `z`): `void`

The "setScale" function sets the scale with the given x, y and z factors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x factor in the x-axis direction. |
| `y` | `number` | The y factor in the y-axis direction. |
| `z` | `number` | The z factor in the z-axis direction. |

#### Returns

`void`

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[setScale](gfx3_gfx3_transformable$Gfx3Transformable.md#setscale)

___

### setVertices

▸ **setVertices**(`vertices`): `void`

The "setVertices" function sets the vertices in one pass.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vertices` | `number`[] | An array of numbers representing the vertices of a shape. |

#### Returns

`void`

___

### translate

▸ **translate**(`x`, `y`, `z`): `void`

The "translate" function translate the position.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The amount of translation in the x-axis direction. |
| `y` | `number` | The amount of translation in the y-axis direction. |
| `z` | `number` | The amount of translation in the z-axis direction. |

#### Returns

`void`

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[translate](gfx3_gfx3_transformable$Gfx3Transformable.md#translate)

___

### update

▸ **update**(`ts`): `void`

The "update" is a virtual method used for the update phase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The `ts` parameter stands for "timestep". |

#### Returns

`void`

___

### zoom

▸ **zoom**(`x`, `y`, `z`): `void`

The "zoom" function add scale values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x factor in the x-axis direction. |
| `y` | `number` | The y factor in the y-axis direction. |
| `z` | `number` | The z factor in the z-axis direction. |

#### Returns

`void`

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[zoom](gfx3_gfx3_transformable$Gfx3Transformable.md#zoom)

## Properties

### boundingBox

• **boundingBox**: [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

___

### isTransformMatrixDirty

• **isTransformMatrixDirty**: `boolean`

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[isTransformMatrixDirty](gfx3_gfx3_transformable$Gfx3Transformable.md#istransformmatrixdirty)

___

### position

• **position**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[position](gfx3_gfx3_transformable$Gfx3Transformable.md#position)

___

### rotation

• **rotation**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[rotation](gfx3_gfx3_transformable$Gfx3Transformable.md#rotation)

___

### scale

• **scale**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[scale](gfx3_gfx3_transformable$Gfx3Transformable.md#scale)

___

### transformMatrix

• **transformMatrix**: [`mat4`](../modules/core_global.md#mat4)

#### Inherited from

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[transformMatrix](gfx3_gfx3_transformable$Gfx3Transformable.md#transformmatrix)

___

### vertexCount

• **vertexCount**: `number`

___

### vertexStride

• **vertexStride**: `number`

___

### vertexSubBuffer

• **vertexSubBuffer**: [`VertexSubBuffer`](../interfaces/gfx3_gfx3_manager$VertexSubBuffer.md)

___

### vertices

• **vertices**: `number`[]

## Constructors

### constructor

• **new Gfx3Drawable**(`vertexStride`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vertexStride` | `number` | The `vertexStride` parameter is a number that represents the number of attributes for each vertex. It is used to determine the spacing between consecutive vertices in the vertex buffer. |

#### Overrides

[Gfx3Transformable](gfx3_gfx3_transformable$Gfx3Transformable.md).[constructor](gfx3_gfx3_transformable$Gfx3Transformable.md#constructor)
