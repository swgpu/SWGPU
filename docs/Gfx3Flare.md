[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_flare/gfx3\_flare](../modules/gfx3_flare_gfx3_flare.md) / Gfx3Flare

# Class: Gfx3Flare

[gfx3_flare/gfx3_flare](../modules/gfx3_flare_gfx3_flare.md).Gfx3Flare

The `Gfx3Flare` class represents a drawable flare object in a graphics system, with properties such as
position, scale, rotation, color, and texture.
It is Ideal for lens-flare effect, rain, snow or every effect on the screen focal.

## Hierarchy

- [`Gfx3Drawable`](gfx3_gfx3_drawable$Gfx3Drawable.md)

  ↳ **`Gfx3Flare`**

## Table of contents

### Methods

- [beginVertices](gfx3_flare_gfx3_flare$Gfx3Flare.md#beginvertices)
- [defineVertex](gfx3_flare_gfx3_flare$Gfx3Flare.md#definevertex)
- [delete](gfx3_flare_gfx3_flare$Gfx3Flare.md#delete)
- [draw](gfx3_flare_gfx3_flare$Gfx3Flare.md#draw)
- [endVertices](gfx3_flare_gfx3_flare$Gfx3Flare.md#endvertices)
- [getBoundingBox](gfx3_flare_gfx3_flare$Gfx3Flare.md#getboundingbox)
- [getColor](gfx3_flare_gfx3_flare$Gfx3Flare.md#getcolor)
- [getGroup02](gfx3_flare_gfx3_flare$Gfx3Flare.md#getgroup02)
- [getLocalAxies](gfx3_flare_gfx3_flare$Gfx3Flare.md#getlocalaxies)
- [getOffset2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#getoffset2d)
- [getPosition](gfx3_flare_gfx3_flare$Gfx3Flare.md#getposition)
- [getPosition2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#getposition2d)
- [getPositionX](gfx3_flare_gfx3_flare$Gfx3Flare.md#getpositionx)
- [getPositionY](gfx3_flare_gfx3_flare$Gfx3Flare.md#getpositiony)
- [getPositionZ](gfx3_flare_gfx3_flare$Gfx3Flare.md#getpositionz)
- [getRotation](gfx3_flare_gfx3_flare$Gfx3Flare.md#getrotation)
- [getRotation2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#getrotation2d)
- [getRotationQuaternion](gfx3_flare_gfx3_flare$Gfx3Flare.md#getrotationquaternion)
- [getRotationX](gfx3_flare_gfx3_flare$Gfx3Flare.md#getrotationx)
- [getRotationY](gfx3_flare_gfx3_flare$Gfx3Flare.md#getrotationy)
- [getRotationZ](gfx3_flare_gfx3_flare$Gfx3Flare.md#getrotationz)
- [getScale](gfx3_flare_gfx3_flare$Gfx3Flare.md#getscale)
- [getScale2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#getscale2d)
- [getScaleX](gfx3_flare_gfx3_flare$Gfx3Flare.md#getscalex)
- [getScaleY](gfx3_flare_gfx3_flare$Gfx3Flare.md#getscaley)
- [getScaleZ](gfx3_flare_gfx3_flare$Gfx3Flare.md#getscalez)
- [getSize2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#getsize2d)
- [getTexture](gfx3_flare_gfx3_flare$Gfx3Flare.md#gettexture)
- [getTransformMatrix](gfx3_flare_gfx3_flare$Gfx3Flare.md#gettransformmatrix)
- [getVertexCount](gfx3_flare_gfx3_flare$Gfx3Flare.md#getvertexcount)
- [getVertexSubBufferOffset](gfx3_flare_gfx3_flare$Gfx3Flare.md#getvertexsubbufferoffset)
- [getVertexSubBufferSize](gfx3_flare_gfx3_flare$Gfx3Flare.md#getvertexsubbuffersize)
- [getVertices](gfx3_flare_gfx3_flare$Gfx3Flare.md#getvertices)
- [getWorldBoundingBox](gfx3_flare_gfx3_flare$Gfx3Flare.md#getworldboundingbox)
- [rotate](gfx3_flare_gfx3_flare$Gfx3Flare.md#rotate)
- [setColor](gfx3_flare_gfx3_flare$Gfx3Flare.md#setcolor)
- [setOffset2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#setoffset2d)
- [setPosition](gfx3_flare_gfx3_flare$Gfx3Flare.md#setposition)
- [setPosition2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#setposition2d)
- [setRotation](gfx3_flare_gfx3_flare$Gfx3Flare.md#setrotation)
- [setRotation2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#setrotation2d)
- [setRotationQuaternion](gfx3_flare_gfx3_flare$Gfx3Flare.md#setrotationquaternion)
- [setScale](gfx3_flare_gfx3_flare$Gfx3Flare.md#setscale)
- [setScale2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#setscale2d)
- [setSize2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#setsize2d)
- [setTexture](gfx3_flare_gfx3_flare$Gfx3Flare.md#settexture)
- [setVertices](gfx3_flare_gfx3_flare$Gfx3Flare.md#setvertices)
- [translate](gfx3_flare_gfx3_flare$Gfx3Flare.md#translate)
- [update](gfx3_flare_gfx3_flare$Gfx3Flare.md#update)
- [zoom](gfx3_flare_gfx3_flare$Gfx3Flare.md#zoom)

### Properties

- [boundingBox](gfx3_flare_gfx3_flare$Gfx3Flare.md#boundingbox)
- [color](gfx3_flare_gfx3_flare$Gfx3Flare.md#color)
- [grp2](gfx3_flare_gfx3_flare$Gfx3Flare.md#grp2)
- [isTransformMatrixDirty](gfx3_flare_gfx3_flare$Gfx3Flare.md#istransformmatrixdirty)
- [offset2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#offset2d)
- [position](gfx3_flare_gfx3_flare$Gfx3Flare.md#position)
- [position2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#position2d)
- [rotation](gfx3_flare_gfx3_flare$Gfx3Flare.md#rotation)
- [rotation2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#rotation2d)
- [scale](gfx3_flare_gfx3_flare$Gfx3Flare.md#scale)
- [scale2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#scale2d)
- [size2D](gfx3_flare_gfx3_flare$Gfx3Flare.md#size2d)
- [texture](gfx3_flare_gfx3_flare$Gfx3Flare.md#texture)
- [textureChanged](gfx3_flare_gfx3_flare$Gfx3Flare.md#texturechanged)
- [transformMatrix](gfx3_flare_gfx3_flare$Gfx3Flare.md#transformmatrix)
- [vertexCount](gfx3_flare_gfx3_flare$Gfx3Flare.md#vertexcount)
- [vertexStride](gfx3_flare_gfx3_flare$Gfx3Flare.md#vertexstride)
- [vertexSubBuffer](gfx3_flare_gfx3_flare$Gfx3Flare.md#vertexsubbuffer)
- [vertices](gfx3_flare_gfx3_flare$Gfx3Flare.md#vertices)

### Constructors

- [constructor](gfx3_flare_gfx3_flare$Gfx3Flare.md#constructor)

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

▸ **delete**(): `void`

The "delete" function free all resources.
Warning: you need to call this method to free allocation for this object.

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

### getColor

▸ **getColor**(): [`vec4`](../modules/core_global.md#vec4)

The "getColor" function returns the color overlay.

#### Returns

[`vec4`](../modules/core_global.md#vec4)

The color overlay.

___

### getGroup02

▸ **getGroup02**(): [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

The "getGroup02" function returns the bindgroup index 2 after setting its texture if it has changed.

#### Returns

[`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

The Gfx3StaticGroup index 2.

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

### getOffset2D

▸ **getOffset2D**(): [`vec2`](../modules/core_global.md#vec2)

The "getOffset2D" function returns the origin offset as a 2D vector.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The origin offset.

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

### getPosition2D

▸ **getPosition2D**(): [`vec2`](../modules/core_global.md#vec2)

The "getPosition2D" function returns the position in screen coordinates.
Top-left corner is at coordinates 0;0.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The position in screen coordinates.

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

### getRotation2D

▸ **getRotation2D**(): `number`

The "getRotation2D" function returns the value of the "rotation2D" angle property (in radians).

#### Returns

`number`

The rotation angle exprimed in radians.

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

### getScale2D

▸ **getScale2D**(): [`vec2`](../modules/core_global.md#vec2)

The "getScale2D" function returns the scale as a 2D vector.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The scale.

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

### getSize2D

▸ **getSize2D**(): [`vec2`](../modules/core_global.md#vec2)

The "getSize2D" function returns the size of the flare on the screen.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The size of the texture on the screen in pixels.

___

### getTexture

▸ **getTexture**(): [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The "getTexture" function returns the texture of the flare.

#### Returns

[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The texture of the flare.

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

### setColor

▸ **setColor**(`r`, `g`, `b`, `a`): `void`

The "setColor" function sets the color overlay ranging from 0 to 1.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `r` | `number` | The parameter "r" represents the red component. |
| `g` | `number` | The parameter "g" represents the green component. |
| `b` | `number` | The parameter "b" represents the blue component. |
| `a` | `number` | The parameter "a" represents the alpha value. |

#### Returns

`void`

___

### setOffset2D

▸ **setOffset2D**(`x`, `y`): `void`

The "setOffset2D" function sets the origin offset.
Default origin is top-left corner. Ex: An offset of 10;10 set the origin of the flare to 10;10.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x offset. |
| `y` | `number` | The y offset. |

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

### setPosition2D

▸ **setPosition2D**(`x`, `y`): `void`

The "setPosition2D" function sets the position in screen coordinates.
Top-left corner is at coordinates 0;0.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The X coordinate of the position. |
| `y` | `number` | The Y coordinate of the position. |

#### Returns

`void`

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

### setRotation2D

▸ **setRotation2D**(`angle`): `void`

The "setRotation2D" function sets the rotation angle (in radians).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `angle` | `number` | The `angle` parameter is the rotation angle in radians. |

#### Returns

`void`

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

### setScale2D

▸ **setScale2D**(`x`, `y`): `void`

The "setScale2D" function sets the scale with the given x and y factors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The x factor in the x-axis direction. |
| `y` | `number` | The y factor in the y-axis direction. |

#### Returns

`void`

___

### setSize2D

▸ **setSize2D**(`w`, `h`): `void`

The "setSize2D" function sets the size of the flare on the screen.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `w` | `number` | The parameter "w" represents the width of the flare. |
| `h` | `number` | The parameter "h" represents the height of the flare. |

#### Returns

`void`

___

### setTexture

▸ **setTexture**(`texture`): `void`

The "setTexture" function sets the texture of the flare.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `texture` | [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md) | The texture of the flare. |

#### Returns

`void`

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

The "update" is a virtual method used for the update phase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The `ts` parameter stands for "timestep". |

#### Returns

`void`

#### Inherited from

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

## Properties

### boundingBox

• **boundingBox**: [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[boundingBox](gfx3_gfx3_drawable$Gfx3Drawable.md#boundingbox)

___

### color

• **color**: [`vec4`](../modules/core_global.md#vec4)

___

### grp2

• **grp2**: [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

___

### isTransformMatrixDirty

• **isTransformMatrixDirty**: `boolean`

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[isTransformMatrixDirty](gfx3_gfx3_drawable$Gfx3Drawable.md#istransformmatrixdirty)

___

### offset2D

• **offset2D**: [`vec2`](../modules/core_global.md#vec2)

___

### position

• **position**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[position](gfx3_gfx3_drawable$Gfx3Drawable.md#position)

___

### position2D

• **position2D**: [`vec2`](../modules/core_global.md#vec2)

___

### rotation

• **rotation**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[rotation](gfx3_gfx3_drawable$Gfx3Drawable.md#rotation)

___

### rotation2D

• **rotation2D**: `number`

___

### scale

• **scale**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[scale](gfx3_gfx3_drawable$Gfx3Drawable.md#scale)

___

### scale2D

• **scale2D**: [`vec2`](../modules/core_global.md#vec2)

___

### size2D

• **size2D**: [`vec2`](../modules/core_global.md#vec2)

___

### texture

• **texture**: [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

___

### textureChanged

• **textureChanged**: `boolean`

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

## Constructors

### constructor

• **new Gfx3Flare**()

The constructor.

#### Overrides

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[constructor](gfx3_gfx3_drawable$Gfx3Drawable.md#constructor)
