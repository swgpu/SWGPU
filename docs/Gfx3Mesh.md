[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_mesh/gfx3\_mesh](../modules/gfx3_mesh_gfx3_mesh.md) / Gfx3Mesh

# Class: Gfx3Mesh

[gfx3_mesh/gfx3_mesh](../modules/gfx3_mesh_gfx3_mesh.md).Gfx3Mesh

The `Gfx3Mesh` class is a subclass of `Gfx3Drawable` and represents a mesh object in a 3D graphics engine, with methods for building
vertices, updating and drawing the mesh, and managing its layer and material.

## Hierarchy

- [`Gfx3Drawable`](gfx3_gfx3_drawable$Gfx3Drawable.md)

  ↳ **`Gfx3Mesh`**

  ↳↳ [`Gfx3MeshJAM`](gfx3_mesh_gfx3_mesh_jam$Gfx3MeshJAM.md)

  ↳↳ [`Gfx3MeshJSM`](gfx3_mesh_gfx3_mesh_jsm$Gfx3MeshJSM.md)

  ↳↳ [`Gfx3MeshOBJ`](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md)

## Table of contents

### Methods

- [beginVertices](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#beginvertices)
- [clone](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#clone)
- [defineVertex](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#definevertex)
- [delete](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#delete)
- [draw](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#draw)
- [endVertices](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#endvertices)
- [getBoundingBox](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getboundingbox)
- [getLayer](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getlayer)
- [getLocalAxies](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getlocalaxies)
- [getMaterial](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getmaterial)
- [getPosition](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getposition)
- [getPositionX](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getpositionx)
- [getPositionY](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getpositiony)
- [getPositionZ](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getpositionz)
- [getRotation](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getrotation)
- [getRotationQuaternion](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getrotationquaternion)
- [getRotationX](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getrotationx)
- [getRotationY](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getrotationy)
- [getRotationZ](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getrotationz)
- [getScale](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getscale)
- [getScaleX](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getscalex)
- [getScaleY](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getscaley)
- [getScaleZ](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getscalez)
- [getTransformMatrix](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#gettransformmatrix)
- [getVertexCount](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getvertexcount)
- [getVertexSubBufferOffset](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getvertexsubbufferoffset)
- [getVertexSubBufferSize](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getvertexsubbuffersize)
- [getVertices](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getvertices)
- [getWorldBoundingBox](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getworldboundingbox)
- [rotate](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#rotate)
- [setLayer](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setlayer)
- [setMaterial](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setmaterial)
- [setPosition](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setposition)
- [setRotation](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setrotation)
- [setRotationQuaternion](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setrotationquaternion)
- [setScale](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setscale)
- [setVertices](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setvertices)
- [translate](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#translate)
- [update](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#update)
- [zoom](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#zoom)
- [buildVertices](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#buildvertices)

### Properties

- [boundingBox](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#boundingbox)
- [isTransformMatrixDirty](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#istransformmatrixdirty)
- [layer](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#layer)
- [material](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#material)
- [position](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#position)
- [rotation](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#rotation)
- [scale](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#scale)
- [transformMatrix](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#transformmatrix)
- [vertexCount](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#vertexcount)
- [vertexStride](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#vertexstride)
- [vertexSubBuffer](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#vertexsubbuffer)
- [vertices](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#vertices)

### Accessors

- [mat](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#mat)

### Constructors

- [constructor](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#constructor)

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

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[beginVertices](gfx3_gfx3_drawable$Gfx3Drawable.md#beginvertices)

___

### clone

▸ **clone**(`transformMatrix?`): [`Gfx3Mesh`](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md)

The "clone" function creates a new `Gfx3Mesh` object by applying a transformation matrix to each
vertex of the original mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transformMatrix` | [`mat4`](../modules/core_global.md#mat4) | The `transformMatrix` parameter is a 4x4 matrix that represents a transformation. It is used to transform the vertices of the mesh. The default value is the identity matrix, which means no transformation is applied if no matrix is provided. |

#### Returns

[`Gfx3Mesh`](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md)

a new instance of the Gfx3Mesh class.

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

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[defineVertex](gfx3_gfx3_drawable$Gfx3Drawable.md#definevertex)

___

### delete

▸ **delete**(`keepMat?`): `void`

The "delete" function free all resources.
Warning: you need to call this method to free allocation for this object.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `keepMat` | `boolean` | `false` |

#### Returns

`void`

#### Overrides

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[delete](gfx3_gfx3_drawable$Gfx3Drawable.md#delete)

___

### draw

▸ **draw**(): `void`

The "draw" function.

#### Returns

`void`

#### Overrides

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[draw](gfx3_gfx3_drawable$Gfx3Drawable.md#draw)

___

### endVertices

▸ **endVertices**(): `void`

The "endVertices" function writes vertex data to the vertex buffer and calculates the bounding box
based on the vertices.

#### Returns

`void`

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[endVertices](gfx3_gfx3_drawable$Gfx3Drawable.md#endvertices)

___

### getBoundingBox

▸ **getBoundingBox**(): [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The "getBoundingBox" function returns the bounding box.

#### Returns

[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The bounding box.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getBoundingBox](gfx3_gfx3_drawable$Gfx3Drawable.md#getboundingbox)

___

### getLayer

▸ **getLayer**(): `number`

The "getLayer" function returns the layer number.

#### Returns

`number`

The layer number is being returned.

___

### getLocalAxies

▸ **getLocalAxies**(): [`vec3`](../modules/core_global.md#vec3)[]

The "getLocalAxies" function returns an array of three vectors representing the local axes of an
object based on its transformation matrix.

#### Returns

[`vec3`](../modules/core_global.md#vec3)[]

The three axis vector.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getLocalAxies](gfx3_gfx3_drawable$Gfx3Drawable.md#getlocalaxies)

___

### getMaterial

▸ **getMaterial**(): [`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md)

The "getMaterial" function returns the material.

#### Returns

[`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md)

The material.

___

### getPosition

▸ **getPosition**(): [`vec3`](../modules/core_global.md#vec3)

The "getPosition" function returns the position.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The position.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getPosition](gfx3_gfx3_drawable$Gfx3Drawable.md#getposition)

___

### getPositionX

▸ **getPositionX**(): `number`

The "getPositionX" function returns the x-coordinate of the position.

#### Returns

`number`

The X coordinate.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getPositionX](gfx3_gfx3_drawable$Gfx3Drawable.md#getpositionx)

___

### getPositionY

▸ **getPositionY**(): `number`

The "getPositionY" function returns the y-coordinate of the position.

#### Returns

`number`

The Y coordinate.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getPositionY](gfx3_gfx3_drawable$Gfx3Drawable.md#getpositiony)

___

### getPositionZ

▸ **getPositionZ**(): `number`

The "getPositionZ" function returns the z-coordinate of the position.

#### Returns

`number`

The Z coordinate.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getPositionZ](gfx3_gfx3_drawable$Gfx3Drawable.md#getpositionz)

___

### getRotation

▸ **getRotation**(): [`vec3`](../modules/core_global.md#vec3)

The "getRotation" function returns the rotation as Euler angles.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The rotation Euler angles (radians).

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getRotation](gfx3_gfx3_drawable$Gfx3Drawable.md#getrotation)

___

### getRotationQuaternion

▸ **getRotationQuaternion**(): [`vec4`](../modules/core_global.md#vec4)

The "getRotationQuaternion" function returns the Quaternion based on the Euler angles provided.

#### Returns

[`vec4`](../modules/core_global.md#vec4)

A quaternion.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getRotationQuaternion](gfx3_gfx3_drawable$Gfx3Drawable.md#getrotationquaternion)

___

### getRotationX

▸ **getRotationX**(): `number`

The "getRotationX" function returns the rotation angle on x-axis.

#### Returns

`number`

The rotation angle on x-axis.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getRotationX](gfx3_gfx3_drawable$Gfx3Drawable.md#getrotationx)

___

### getRotationY

▸ **getRotationY**(): `number`

The "getRotationY" function returns the rotation angle on y-axis.

#### Returns

`number`

The rotation angle on y-axis.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getRotationY](gfx3_gfx3_drawable$Gfx3Drawable.md#getrotationy)

___

### getRotationZ

▸ **getRotationZ**(): `number`

The "getRotationZ" function returns the rotation angle on z-axis.

#### Returns

`number`

The rotation angle on z-axis.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getRotationZ](gfx3_gfx3_drawable$Gfx3Drawable.md#getrotationz)

___

### getScale

▸ **getScale**(): [`vec3`](../modules/core_global.md#vec3)

The "getScale" function returns the scale as a 3D vector.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The scale.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getScale](gfx3_gfx3_drawable$Gfx3Drawable.md#getscale)

___

### getScaleX

▸ **getScaleX**(): `number`

The "getScaleX" function returns the scale factor on x-axis.

#### Returns

`number`

The x-axis scale factor.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getScaleX](gfx3_gfx3_drawable$Gfx3Drawable.md#getscalex)

___

### getScaleY

▸ **getScaleY**(): `number`

The "getScaleY" function returns the scale factor on y-axis.

#### Returns

`number`

The y-axis scale factor.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getScaleY](gfx3_gfx3_drawable$Gfx3Drawable.md#getscaley)

___

### getScaleZ

▸ **getScaleZ**(): `number`

The "getScaleZ" function returns the scale factor on z-axis.

#### Returns

`number`

The z-axis scale factor.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getScaleZ](gfx3_gfx3_drawable$Gfx3Drawable.md#getscalez)

___

### getTransformMatrix

▸ **getTransformMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getTransformMatrix" function returns the transform matrix from position, rotation and scale values.

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The transform matrix.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getTransformMatrix](gfx3_gfx3_drawable$Gfx3Drawable.md#gettransformmatrix)

___

### getVertexCount

▸ **getVertexCount**(): `number`

The "getVertexCount" function returns the number of vertices.

#### Returns

`number`

The number of vertices.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getVertexCount](gfx3_gfx3_drawable$Gfx3Drawable.md#getvertexcount)

___

### getVertexSubBufferOffset

▸ **getVertexSubBufferOffset**(): `number`

The "getVertexSubBufferOffset" function returns the offset of the vertex sub-buffer.
Nota bene: All vertices are stored in one global vertex buffer handled by "Gfx3Manager".
SubBuffer is just a reference offset/size pointing to the big one buffer.

#### Returns

`number`

The offset of the vertex sub-buffer.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getVertexSubBufferOffset](gfx3_gfx3_drawable$Gfx3Drawable.md#getvertexsubbufferoffset)

___

### getVertexSubBufferSize

▸ **getVertexSubBufferSize**(): `number`

The "getVertexSubBufferSize" function returns the byte length of the vertex sub buffer.
Nota bene: All vertices are stored in one global vertex buffer handled by "Gfx3Manager".
SubBuffer is just a reference offset/size pointing to the big one buffer.

#### Returns

`number`

The byte length of the vertex sub buffer.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getVertexSubBufferSize](gfx3_gfx3_drawable$Gfx3Drawable.md#getvertexsubbuffersize)

___

### getVertices

▸ **getVertices**(): `number`[]

The "getVertices" function returns an array of numbers representing vertices.

#### Returns

`number`[]

The vertices property.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getVertices](gfx3_gfx3_drawable$Gfx3Drawable.md#getvertices)

___

### getWorldBoundingBox

▸ **getWorldBoundingBox**(): [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The "getWorldBoundingBox" function returns the world bounding box by transforming its
local bounding box using its transform matrix.

#### Returns

[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The world bounding box.

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[getWorldBoundingBox](gfx3_gfx3_drawable$Gfx3Drawable.md#getworldboundingbox)

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

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[rotate](gfx3_gfx3_drawable$Gfx3Drawable.md#rotate)

___

### setLayer

▸ **setLayer**(`layer`): `void`

The "setLayer" function sets the layer property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layer` | `number` | The "layer" parameter is a number that represents the layer identifier. It is used to easily categorized and identified group of drawables. Ex: allow decals for wall only, for character only, etc... |

#### Returns

`void`

___

### setMaterial

▸ **setMaterial**(`material`, `keepMat?`): `void`

The "setMaterial" function sets a new material.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `material` | [`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md) | `undefined` | The new material. |
| `keepMat?` | `boolean` | `true` | The `keepMat` parameter is a boolean flag that determines whether to keep the current material or delete it before assigning the new material. Warning: If keepMat is to `false` then the current material is definitly destroy (included if others drawables potentially used it). |

#### Returns

`void`

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

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[setPosition](gfx3_gfx3_drawable$Gfx3Drawable.md#setposition)

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

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[setRotation](gfx3_gfx3_drawable$Gfx3Drawable.md#setrotation)

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

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[setRotationQuaternion](gfx3_gfx3_drawable$Gfx3Drawable.md#setrotationquaternion)

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

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[setScale](gfx3_gfx3_drawable$Gfx3Drawable.md#setscale)

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

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[setVertices](gfx3_gfx3_drawable$Gfx3Drawable.md#setvertices)

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

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[translate](gfx3_gfx3_drawable$Gfx3Drawable.md#translate)

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

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[update](gfx3_gfx3_drawable$Gfx3Drawable.md#update)

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

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[zoom](gfx3_gfx3_drawable$Gfx3Drawable.md#zoom)

___

### buildVertices

▸ `Static` **buildVertices**(`vertexCount`, `coords`, `texcoords?`, `colors?`, `normals?`, `groups?`): `number`[]

The "buildVertices" function takes various vertex data and returns an array
of vertices with calculated normals, tangents, and binormals in the engine format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vertexCount` | `number` | The total number of vertices in the mesh. |
| `coords` | `number`[] | An array of vertex coordinates. |
| `texcoords?` | `number`[] | An optional array of vertex texture coordinates. |
| `colors?` | `number`[] | An optional array of vertex color. |
| `normals?` | `number`[] | An optional array of vertex normal. |
| `groups?` | [`Group`](../interfaces/gfx3_mesh_gfx3_mesh$Group.md)[] | An optional array of vertex group. A vertex group contains an array of vertex indices. |

#### Returns

`number`[]

The array of vertices in the engine ready-to-used format.

## Properties

### boundingBox

• **boundingBox**: [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[boundingBox](gfx3_gfx3_drawable$Gfx3Drawable.md#boundingbox)

___

### isTransformMatrixDirty

• **isTransformMatrixDirty**: `boolean`

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[isTransformMatrixDirty](gfx3_gfx3_drawable$Gfx3Drawable.md#istransformmatrixdirty)

___

### layer

• **layer**: `number`

___

### material

• **material**: [`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md)

___

### position

• **position**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[position](gfx3_gfx3_drawable$Gfx3Drawable.md#position)

___

### rotation

• **rotation**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[rotation](gfx3_gfx3_drawable$Gfx3Drawable.md#rotation)

___

### scale

• **scale**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[scale](gfx3_gfx3_drawable$Gfx3Drawable.md#scale)

___

### transformMatrix

• **transformMatrix**: [`mat4`](../modules/core_global.md#mat4)

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[transformMatrix](gfx3_gfx3_drawable$Gfx3Drawable.md#transformmatrix)

___

### vertexCount

• **vertexCount**: `number`

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[vertexCount](gfx3_gfx3_drawable$Gfx3Drawable.md#vertexcount)

___

### vertexStride

• **vertexStride**: `number`

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[vertexStride](gfx3_gfx3_drawable$Gfx3Drawable.md#vertexstride)

___

### vertexSubBuffer

• **vertexSubBuffer**: [`VertexSubBuffer`](../interfaces/gfx3_gfx3_manager$VertexSubBuffer.md)

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[vertexSubBuffer](gfx3_gfx3_drawable$Gfx3Drawable.md#vertexsubbuffer)

___

### vertices

• **vertices**: `number`[]

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[vertices](gfx3_gfx3_drawable$Gfx3Drawable.md#vertices)

## Accessors

### mat

• `get` **mat**(): [`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md)

The "mat" getter returns the Gfx3Material property named "mat".

#### Returns

[`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md)

The material as a shortcut.

## Constructors

### constructor

• **new Gfx3Mesh**()

The constructor.

#### Overrides

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[constructor](gfx3_gfx3_drawable$Gfx3Drawable.md#constructor)
