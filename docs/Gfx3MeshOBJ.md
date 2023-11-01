[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_mesh/gfx3\_mesh\_obj](../modules/gfx3_mesh_gfx3_mesh_obj.md) / Gfx3MeshOBJ

# Class: Gfx3MeshOBJ

[gfx3_mesh/gfx3_mesh_obj](../modules/gfx3_mesh_gfx3_mesh_obj.md).Gfx3MeshOBJ

The `Gfx3MeshOBJ` class is a subclass of Gfx3Mesh that represents a 3D mesh object loaded from an OBJ wavefront file.

OBJ Options:
- Multiple meshes.
- Optionnal Vertex Normals
- Optionnal Vertex Colors
- Smooth Groups

MTL Options:
- Kd => Diffuse
- Ks => Specular
- Ns => Specularity
- Ke => Emissive
- d  => Opacity
- map_Kd => Albedo map
- map_Ns => Specularity map
- map_Bump => Normal map

## Hierarchy

- [`Gfx3Mesh`](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md)

  ↳ **`Gfx3MeshOBJ`**

## Table of contents

### Methods

- [$loadMaterials](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#$loadmaterials)
- [$loadObjects](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#$loadobjects)
- [beginVertices](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#beginvertices)
- [clone](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#clone)
- [defineVertex](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#definevertex)
- [delete](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#delete)
- [draw](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#draw)
- [endVertices](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#endvertices)
- [getBoundingBox](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getboundingbox)
- [getLayer](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getlayer)
- [getLocalAxies](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getlocalaxies)
- [getMaterial](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getmaterial)
- [getMesh](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getmesh)
- [getMeshes](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getmeshes)
- [getObject](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getobject)
- [getPosition](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getposition)
- [getPositionX](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getpositionx)
- [getPositionY](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getpositiony)
- [getPositionZ](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getpositionz)
- [getRotation](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getrotation)
- [getRotationQuaternion](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getrotationquaternion)
- [getRotationX](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getrotationx)
- [getRotationY](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getrotationy)
- [getRotationZ](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getrotationz)
- [getScale](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getscale)
- [getScaleX](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getscalex)
- [getScaleY](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getscaley)
- [getScaleZ](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getscalez)
- [getTransformMatrix](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#gettransformmatrix)
- [getVertexCount](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getvertexcount)
- [getVertexSubBufferOffset](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getvertexsubbufferoffset)
- [getVertexSubBufferSize](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getvertexsubbuffersize)
- [getVertices](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getvertices)
- [getWorldBoundingBox](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#getworldboundingbox)
- [loadFromFile](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#loadfromfile)
- [rotate](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#rotate)
- [setLayer](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#setlayer)
- [setMaterial](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#setmaterial)
- [setPosition](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#setposition)
- [setRotation](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#setrotation)
- [setRotationQuaternion](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#setrotationquaternion)
- [setScale](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#setscale)
- [setVertices](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#setvertices)
- [translate](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#translate)
- [update](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#update)
- [zoom](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#zoom)
- [buildVertices](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#buildvertices)

### Properties

- [boundingBox](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#boundingbox)
- [colors](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#colors)
- [coords](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#coords)
- [isTransformMatrixDirty](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#istransformmatrixdirty)
- [layer](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#layer)
- [material](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#material)
- [materials](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#materials)
- [meshes](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#meshes)
- [normals](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#normals)
- [objects](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#objects)
- [position](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#position)
- [rotation](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#rotation)
- [scale](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#scale)
- [texcoords](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#texcoords)
- [transformMatrix](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#transformmatrix)
- [vertexCount](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#vertexcount)
- [vertexStride](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#vertexstride)
- [vertexSubBuffer](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#vertexsubbuffer)
- [vertices](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#vertices)

### Accessors

- [mat](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#mat)

### Constructors

- [constructor](gfx3_mesh_gfx3_mesh_obj$Gfx3MeshOBJ.md#constructor)

## Methods

### $loadMaterials

▸ **$loadMaterials**(`path`): `Promise`<`void`\>

The "$loadMaterials" function asynchronously loads materials from a specified file (mtl).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The `path` parameter is the `mtl` file path. |

#### Returns

`Promise`<`void`\>

___

### $loadObjects

▸ **$loadObjects**(`path`): `Promise`<`void`\>

The "$loadObjects" function asynchronously loads objects from a specified file (obj).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The `path` parameter is the `obj` file path. |

#### Returns

`Promise`<`void`\>

___

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

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[beginVertices](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#beginvertices)

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

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[clone](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#clone)

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

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[defineVertex](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#definevertex)

___

### delete

▸ **delete**(): `void`

The "delete" function free all resources.
Warning: you need to call this method to free allocation for this object.

#### Returns

`void`

#### Overrides

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[delete](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#delete)

___

### draw

▸ **draw**(): `void`

The "draw" function.

#### Returns

`void`

#### Overrides

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[draw](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#draw)

___

### endVertices

▸ **endVertices**(): `void`

The "endVertices" function writes vertex data to the vertex buffer and calculates the bounding box
based on the vertices.

#### Returns

`void`

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[endVertices](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#endvertices)

___

### getBoundingBox

▸ **getBoundingBox**(): [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The "getBoundingBox" function returns the bounding box.

#### Returns

[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The bounding box.

#### Overrides

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getBoundingBox](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getboundingbox)

___

### getLayer

▸ **getLayer**(): `number`

The "getLayer" function returns the layer number.

#### Returns

`number`

The layer number is being returned.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getLayer](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getlayer)

___

### getLocalAxies

▸ **getLocalAxies**(): [`vec3`](../modules/core_global.md#vec3)[]

The "getLocalAxies" function returns an array of three vectors representing the local axes of an
object based on its transformation matrix.

#### Returns

[`vec3`](../modules/core_global.md#vec3)[]

The three axis vector.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getLocalAxies](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getlocalaxies)

___

### getMaterial

▸ **getMaterial**(): [`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md)

The "getMaterial" function returns the material.

#### Returns

[`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md)

The material.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getMaterial](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getmaterial)

___

### getMesh

▸ **getMesh**(`name`): [`Gfx3Mesh`](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md)

The "getMesh" function returns a `Gfx3Mesh` object with the specified name, or throws an error if
the object doesn't exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | A string representing the name of the mesh object that you want to retrieve. |

#### Returns

[`Gfx3Mesh`](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md)

The mesh.

___

### getMeshes

▸ **getMeshes**(): `IterableIterator`<[`Gfx3Mesh`](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md)\>

The "getMeshes" function returns all `Gfx3Mesh` objects.

#### Returns

`IterableIterator`<[`Gfx3Mesh`](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md)\>

An iterable of Gfx3Mesh objects.

___

### getObject

▸ **getObject**(`name`): `OBJObject`

The "getObject" function returns a `OBJObject` object with the specified name, or throws an error if
the object doesn't exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | A string representing the name of the object that you want to retrieve. |

#### Returns

`OBJObject`

The object data.

___

### getPosition

▸ **getPosition**(): [`vec3`](../modules/core_global.md#vec3)

The "getPosition" function returns the position.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The position.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getPosition](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getposition)

___

### getPositionX

▸ **getPositionX**(): `number`

The "getPositionX" function returns the x-coordinate of the position.

#### Returns

`number`

The X coordinate.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getPositionX](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getpositionx)

___

### getPositionY

▸ **getPositionY**(): `number`

The "getPositionY" function returns the y-coordinate of the position.

#### Returns

`number`

The Y coordinate.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getPositionY](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getpositiony)

___

### getPositionZ

▸ **getPositionZ**(): `number`

The "getPositionZ" function returns the z-coordinate of the position.

#### Returns

`number`

The Z coordinate.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getPositionZ](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getpositionz)

___

### getRotation

▸ **getRotation**(): [`vec3`](../modules/core_global.md#vec3)

The "getRotation" function returns the rotation as Euler angles.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The rotation Euler angles (radians).

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getRotation](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getrotation)

___

### getRotationQuaternion

▸ **getRotationQuaternion**(): [`vec4`](../modules/core_global.md#vec4)

The "getRotationQuaternion" function returns the Quaternion based on the Euler angles provided.

#### Returns

[`vec4`](../modules/core_global.md#vec4)

A quaternion.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getRotationQuaternion](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getrotationquaternion)

___

### getRotationX

▸ **getRotationX**(): `number`

The "getRotationX" function returns the rotation angle on x-axis.

#### Returns

`number`

The rotation angle on x-axis.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getRotationX](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getrotationx)

___

### getRotationY

▸ **getRotationY**(): `number`

The "getRotationY" function returns the rotation angle on y-axis.

#### Returns

`number`

The rotation angle on y-axis.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getRotationY](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getrotationy)

___

### getRotationZ

▸ **getRotationZ**(): `number`

The "getRotationZ" function returns the rotation angle on z-axis.

#### Returns

`number`

The rotation angle on z-axis.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getRotationZ](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getrotationz)

___

### getScale

▸ **getScale**(): [`vec3`](../modules/core_global.md#vec3)

The "getScale" function returns the scale as a 3D vector.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The scale.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getScale](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getscale)

___

### getScaleX

▸ **getScaleX**(): `number`

The "getScaleX" function returns the scale factor on x-axis.

#### Returns

`number`

The x-axis scale factor.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getScaleX](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getscalex)

___

### getScaleY

▸ **getScaleY**(): `number`

The "getScaleY" function returns the scale factor on y-axis.

#### Returns

`number`

The y-axis scale factor.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getScaleY](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getscaley)

___

### getScaleZ

▸ **getScaleZ**(): `number`

The "getScaleZ" function returns the scale factor on z-axis.

#### Returns

`number`

The z-axis scale factor.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getScaleZ](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getscalez)

___

### getTransformMatrix

▸ **getTransformMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getTransformMatrix" function returns the transform matrix from position, rotation and scale values.

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The transform matrix.

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getTransformMatrix](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#gettransformmatrix)

___

### getVertexCount

▸ **getVertexCount**(): `number`

The "getVertexCount" function override `getVertexCount` from `Gfx3Mesh`.

#### Returns

`number`

#### Overrides

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getVertexCount](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getvertexcount)

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

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getVertexSubBufferOffset](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getvertexsubbufferoffset)

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

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getVertexSubBufferSize](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getvertexsubbuffersize)

___

### getVertices

▸ **getVertices**(): `number`[]

The "getVertices" function override `getVertices` from `Gfx3Mesh`.

#### Returns

`number`[]

#### Overrides

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getVertices](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getvertices)

___

### getWorldBoundingBox

▸ **getWorldBoundingBox**(): [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The "getWorldBoundingBox" function returns the world bounding box.

#### Returns

[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The world bounding box.

#### Overrides

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[getWorldBoundingBox](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#getworldboundingbox)

___

### loadFromFile

▸ **loadFromFile**(`objPath`, `mtlPath`): `Promise`<`void`\>

The "loadFromFile" function asynchronously loads `obj` and `mtl` files.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `objPath` | `string` | The `obj` file path. |
| `mtlPath` | `string` | The `mtl` file path. |

#### Returns

`Promise`<`void`\>

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

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[rotate](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#rotate)

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

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[setLayer](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setlayer)

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

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[setMaterial](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setmaterial)

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

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[setPosition](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setposition)

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

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[setRotation](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setrotation)

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

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[setRotationQuaternion](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setrotationquaternion)

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

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[setScale](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setscale)

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

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[setVertices](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#setvertices)

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

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[translate](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#translate)

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

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[update](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#update)

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

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[zoom](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#zoom)

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

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[buildVertices](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#buildvertices)

## Properties

### boundingBox

• **boundingBox**: [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[boundingBox](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#boundingbox)

___

### colors

• **colors**: `number`[]

___

### coords

• **coords**: `number`[]

___

### isTransformMatrixDirty

• **isTransformMatrixDirty**: `boolean`

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[isTransformMatrixDirty](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#istransformmatrixdirty)

___

### layer

• **layer**: `number`

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[layer](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#layer)

___

### material

• **material**: [`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md)

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[material](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#material)

___

### materials

• **materials**: `Map`<`string`, [`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md)\>

___

### meshes

• **meshes**: `Map`<`string`, [`Gfx3Mesh`](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md)\>

___

### normals

• **normals**: `number`[]

___

### objects

• **objects**: `Map`<`string`, `OBJObject`\>

___

### position

• **position**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[position](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#position)

___

### rotation

• **rotation**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[rotation](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#rotation)

___

### scale

• **scale**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[scale](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#scale)

___

### texcoords

• **texcoords**: `number`[]

___

### transformMatrix

• **transformMatrix**: [`mat4`](../modules/core_global.md#mat4)

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[transformMatrix](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#transformmatrix)

___

### vertexCount

• **vertexCount**: `number`

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[vertexCount](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#vertexcount)

___

### vertexStride

• **vertexStride**: `number`

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[vertexStride](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#vertexstride)

___

### vertexSubBuffer

• **vertexSubBuffer**: [`VertexSubBuffer`](../interfaces/gfx3_gfx3_manager$VertexSubBuffer.md)

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[vertexSubBuffer](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#vertexsubbuffer)

___

### vertices

• **vertices**: `number`[]

#### Inherited from

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[vertices](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#vertices)

## Accessors

### mat

• `get` **mat**(): [`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md)

The "mat" getter returns the Gfx3Material property named "mat".

#### Returns

[`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md)

The material as a shortcut.

#### Inherited from

Gfx3Mesh.mat

## Constructors

### constructor

• **new Gfx3MeshOBJ**()

The constructor.

#### Overrides

[Gfx3Mesh](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md).[constructor](gfx3_mesh_gfx3_mesh$Gfx3Mesh.md#constructor)
