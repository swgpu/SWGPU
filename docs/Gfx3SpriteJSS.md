[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_sprite/gfx3\_sprite\_jss](../modules/gfx3_sprite_gfx3_sprite_jss.md) / Gfx3SpriteJSS

# Class: Gfx3SpriteJSS

[gfx3_sprite/gfx3_sprite_jss](../modules/gfx3_sprite_gfx3_sprite_jss.md).Gfx3SpriteJSS

The `Gfx3SpriteJSS` is a subclass of `Gfx3Sprite` that represents a static sprite (without animations).

## Hierarchy

- [`Gfx3Sprite`](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md)

  ↳ **`Gfx3SpriteJSS`**

## Table of contents

### Methods

- [beginVertices](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#beginvertices)
- [defineVertex](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#definevertex)
- [delete](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#delete)
- [draw](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#draw)
- [endVertices](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#endvertices)
- [getBillboardMode](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getbillboardmode)
- [getBoundingBox](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getboundingbox)
- [getFlip](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getflip)
- [getGroup01](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getgroup01)
- [getLocalAxies](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getlocalaxies)
- [getOffset](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getoffset)
- [getOffsetX](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getoffsetx)
- [getOffsetY](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getoffsety)
- [getPixelsPerUnit](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getpixelsperunit)
- [getPosition](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getposition)
- [getPositionX](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getpositionx)
- [getPositionY](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getpositiony)
- [getPositionZ](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getpositionz)
- [getRotation](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getrotation)
- [getRotationQuaternion](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getrotationquaternion)
- [getRotationX](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getrotationx)
- [getRotationY](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getrotationy)
- [getRotationZ](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getrotationz)
- [getScale](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getscale)
- [getScaleX](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getscalex)
- [getScaleY](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getscaley)
- [getScaleZ](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getscalez)
- [getTexture](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#gettexture)
- [getTextureRect](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#gettexturerect)
- [getTransformMatrix](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#gettransformmatrix)
- [getVertexCount](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getvertexcount)
- [getVertexSubBufferOffset](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getvertexsubbufferoffset)
- [getVertexSubBufferSize](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getvertexsubbuffersize)
- [getVertices](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getvertices)
- [getWorldBoundingBox](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#getworldboundingbox)
- [rotate](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#rotate)
- [setBillboardMode](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#setbillboardmode)
- [setFlipX](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#setflipx)
- [setFlipY](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#setflipy)
- [setOffset](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#setoffset)
- [setOffsetNormalized](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#setoffsetnormalized)
- [setPixelsPerUnit](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#setpixelsperunit)
- [setPosition](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#setposition)
- [setRotation](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#setrotation)
- [setRotationQuaternion](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#setrotationquaternion)
- [setScale](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#setscale)
- [setTexture](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#settexture)
- [setTextureRect](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#settexturerect)
- [setVertices](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#setvertices)
- [translate](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#translate)
- [update](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#update)
- [zoom](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#zoom)

### Properties

- [billboardMode](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#billboardmode)
- [boundingBox](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#boundingbox)
- [flip](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#flip)
- [grp1](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#grp1)
- [isTransformMatrixDirty](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#istransformmatrixdirty)
- [offset](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#offset)
- [pixelsPerUnit](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#pixelsperunit)
- [position](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#position)
- [rotation](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#rotation)
- [scale](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#scale)
- [texture](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#texture)
- [textureChanged](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#texturechanged)
- [textureRect](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#texturerect)
- [transformMatrix](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#transformmatrix)
- [vertexCount](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#vertexcount)
- [vertexStride](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#vertexstride)
- [vertexSubBuffer](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#vertexsubbuffer)
- [vertices](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#vertices)

### Constructors

- [constructor](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md#constructor)

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

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[beginVertices](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#beginvertices)

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

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[defineVertex](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#definevertex)

___

### delete

▸ **delete**(): `void`

The "delete" function free all resources.
Warning: you need to call this method to free allocation for this object.

#### Returns

`void`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[delete](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#delete)

___

### draw

▸ **draw**(): `void`

The "draw" function.

#### Returns

`void`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[draw](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#draw)

___

### endVertices

▸ **endVertices**(): `void`

The "endVertices" function writes vertex data to the vertex buffer and calculates the bounding box
based on the vertices.

#### Returns

`void`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[endVertices](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#endvertices)

___

### getBillboardMode

▸ **getBillboardMode**(): `boolean`

The "getBillboardMode" function returns the billboardMode property.

#### Returns

`boolean`

The billboardMode property.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getBillboardMode](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getbillboardmode)

___

### getBoundingBox

▸ **getBoundingBox**(): [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The "getBoundingBox" function returns the bounding box.

#### Returns

[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The bounding box.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getBoundingBox](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getboundingbox)

___

### getFlip

▸ **getFlip**(): [`boolean`, `boolean`]

The "getFlip" function returns two booleans, first is the x-axis flip flag, second is the y-axis flip flag.

#### Returns

[`boolean`, `boolean`]

The flip property.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getFlip](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getflip)

___

### getGroup01

▸ **getGroup01**(): [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

The "getGroup01" function returns the static group index 1.

#### Returns

[`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

The static group.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getGroup01](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getgroup01)

___

### getLocalAxies

▸ **getLocalAxies**(): [`vec3`](../modules/core_global.md#vec3)[]

The "getLocalAxies" function returns an array of three vectors representing the local axes of an
object based on its transformation matrix.

#### Returns

[`vec3`](../modules/core_global.md#vec3)[]

The three axis vector.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getLocalAxies](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getlocalaxies)

___

### getOffset

▸ **getOffset**(): [`vec2`](../modules/core_global.md#vec2)

The "getOffset" function returns the origin offset.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The offset.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getOffset](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getoffset)

___

### getOffsetX

▸ **getOffsetX**(): `number`

The "getOffsetX" function returns the offset in x-axis direction.

#### Returns

`number`

The x-offset value.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getOffsetX](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getoffsetx)

___

### getOffsetY

▸ **getOffsetY**(): `number`

The "getOffsetY" function returns the offset in y-axis direction.

#### Returns

`number`

The y-offset value.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getOffsetY](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getoffsety)

___

### getPixelsPerUnit

▸ **getPixelsPerUnit**(): `number`

The "getPixelsPerUnit" function get the pixelsPerUnit property.

#### Returns

`number`

- The pixelsPerUnit property.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getPixelsPerUnit](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getpixelsperunit)

___

### getPosition

▸ **getPosition**(): [`vec3`](../modules/core_global.md#vec3)

The "getPosition" function returns the position.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The position.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getPosition](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getposition)

___

### getPositionX

▸ **getPositionX**(): `number`

The "getPositionX" function returns the x-coordinate of the position.

#### Returns

`number`

The X coordinate.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getPositionX](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getpositionx)

___

### getPositionY

▸ **getPositionY**(): `number`

The "getPositionY" function returns the y-coordinate of the position.

#### Returns

`number`

The Y coordinate.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getPositionY](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getpositiony)

___

### getPositionZ

▸ **getPositionZ**(): `number`

The "getPositionZ" function returns the z-coordinate of the position.

#### Returns

`number`

The Z coordinate.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getPositionZ](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getpositionz)

___

### getRotation

▸ **getRotation**(): [`vec3`](../modules/core_global.md#vec3)

The "getRotation" function returns the rotation as Euler angles.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The rotation Euler angles (radians).

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getRotation](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getrotation)

___

### getRotationQuaternion

▸ **getRotationQuaternion**(): [`vec4`](../modules/core_global.md#vec4)

The "getRotationQuaternion" function returns the Quaternion based on the Euler angles provided.

#### Returns

[`vec4`](../modules/core_global.md#vec4)

A quaternion.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getRotationQuaternion](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getrotationquaternion)

___

### getRotationX

▸ **getRotationX**(): `number`

The "getRotationX" function returns the rotation angle on x-axis.

#### Returns

`number`

The rotation angle on x-axis.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getRotationX](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getrotationx)

___

### getRotationY

▸ **getRotationY**(): `number`

The "getRotationY" function returns the rotation angle on y-axis.

#### Returns

`number`

The rotation angle on y-axis.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getRotationY](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getrotationy)

___

### getRotationZ

▸ **getRotationZ**(): `number`

The "getRotationZ" function returns the rotation angle on z-axis.

#### Returns

`number`

The rotation angle on z-axis.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getRotationZ](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getrotationz)

___

### getScale

▸ **getScale**(): [`vec3`](../modules/core_global.md#vec3)

The "getScale" function returns the scale as a 3D vector.

#### Returns

[`vec3`](../modules/core_global.md#vec3)

The scale.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getScale](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getscale)

___

### getScaleX

▸ **getScaleX**(): `number`

The "getScaleX" function returns the scale factor on x-axis.

#### Returns

`number`

The x-axis scale factor.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getScaleX](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getscalex)

___

### getScaleY

▸ **getScaleY**(): `number`

The "getScaleY" function returns the scale factor on y-axis.

#### Returns

`number`

The y-axis scale factor.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getScaleY](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getscaley)

___

### getScaleZ

▸ **getScaleZ**(): `number`

The "getScaleZ" function returns the scale factor on z-axis.

#### Returns

`number`

The z-axis scale factor.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getScaleZ](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getscalez)

___

### getTexture

▸ **getTexture**(): [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The "getTexture" function returns the sprite texture.

#### Returns

[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The sprite texture.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getTexture](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#gettexture)

___

### getTextureRect

▸ **getTextureRect**(): [`vec4`](../modules/core_global.md#vec4)

The "getTextureRect" function returns the texture rectangle.

#### Returns

[`vec4`](../modules/core_global.md#vec4)

The texture rectangle.

___

### getTransformMatrix

▸ **getTransformMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getTransformMatrix" function returns the transform matrix from position, rotation, scale, origin offset
and pixel per unit values.

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The transform matrix.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getTransformMatrix](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#gettransformmatrix)

___

### getVertexCount

▸ **getVertexCount**(): `number`

The "getVertexCount" function returns the number of vertices.

#### Returns

`number`

The number of vertices.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getVertexCount](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getvertexcount)

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

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getVertexSubBufferOffset](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getvertexsubbufferoffset)

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

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getVertexSubBufferSize](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getvertexsubbuffersize)

___

### getVertices

▸ **getVertices**(): `number`[]

The "getVertices" function returns an array of numbers representing vertices.

#### Returns

`number`[]

The vertices property.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getVertices](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getvertices)

___

### getWorldBoundingBox

▸ **getWorldBoundingBox**(): [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The "getWorldBoundingBox" function returns the world bounding box by transforming its
local bounding box using its transform matrix.

#### Returns

[`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

The world bounding box.

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[getWorldBoundingBox](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getworldboundingbox)

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

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[rotate](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#rotate)

___

### setBillboardMode

▸ **setBillboardMode**(`billboardMode`): `void`

The "setBillboardMode" function sets the billboard mode to either true or false.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `billboardMode` | `boolean` | A boolean value that determines whether the object should be displayed as a billboard, meaning it always faces the camera regardless of its orientation. |

#### Returns

`void`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[setBillboardMode](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setbillboardmode)

___

### setFlipX

▸ **setFlipX**(`x`): `void`

The "setFlipX" function sets the value of the flipX property to the provided boolean value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `boolean` | The x-axis flip flag. |

#### Returns

`void`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[setFlipX](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setflipx)

___

### setFlipY

▸ **setFlipY**(`y`): `void`

The "setFlipY" function sets the value of the flipY property to the provided boolean value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `y` | `boolean` | The y-axis flip flag. |

#### Returns

`void`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[setFlipY](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setflipy)

___

### setOffset

▸ **setOffset**(`offsetX`, `offsetY`): `void`

The "setOffset" function set the origin offset value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `offsetX` | `number` | The x-offset. |
| `offsetY` | `number` | The y-offset. |

#### Returns

`void`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[setOffset](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setoffset)

___

### setOffsetNormalized

▸ **setOffsetNormalized**(`offsetXFactor`, `offsetYFactor`): `void`

The "setOffsetNormalized" function sets the normalized origin offset value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `offsetXFactor` | `number` | The offsetXFactor represent the normalized x-coordinate offset value. |
| `offsetYFactor` | `number` | The offsetYFactor represent the normalized y-coordinate offset value. |

#### Returns

`void`

___

### setPixelsPerUnit

▸ **setPixelsPerUnit**(`pixelsPerUnit`): `void`

The "setPixelsPerUnit" function sets the number of pixels per unit.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pixelsPerUnit` | `number` | The `pixelsPerUnit` parameter is a number that represents the number of pixels per unit of measurement. It is used to determine the scale or resolution at which the sprite is displayed. |

#### Returns

`void`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[setPixelsPerUnit](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setpixelsperunit)

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

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[setPosition](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setposition)

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

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[setRotation](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setrotation)

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

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[setRotationQuaternion](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setrotationquaternion)

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

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[setScale](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setscale)

___

### setTexture

▸ **setTexture**(`texture`): `void`

The "setTexture" function sets the sprite texture.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `texture` | [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md) | The sprite texture. |

#### Returns

`void`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[setTexture](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#settexture)

___

### setTextureRect

▸ **setTextureRect**(`left`, `top`, `width`, `height`): `void`

The "setTextureRect" function sets the texture rectangle with the given left, top, width, and height values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `left` | `number` | The x-coordinate of the top-left texture rectangle corner. |
| `top` | `number` | The y-coordinate of the top-left texture rectangle corner. |
| `width` | `number` | The width of the texture rectangle. |
| `height` | `number` | The height of the texture rectangle. |

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

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[setVertices](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setvertices)

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

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[translate](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#translate)

___

### update

▸ **update**(): `void`

The "update" function.

#### Returns

`void`

#### Overrides

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[update](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#update)

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

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[zoom](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#zoom)

## Properties

### billboardMode

• **billboardMode**: `boolean`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[billboardMode](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#billboardmode)

___

### boundingBox

• **boundingBox**: [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[boundingBox](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#boundingbox)

___

### flip

• **flip**: [`boolean`, `boolean`]

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[flip](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#flip)

___

### grp1

• **grp1**: [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[grp1](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#grp1)

___

### isTransformMatrixDirty

• **isTransformMatrixDirty**: `boolean`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[isTransformMatrixDirty](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#istransformmatrixdirty)

___

### offset

• **offset**: [`vec2`](../modules/core_global.md#vec2)

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[offset](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#offset)

___

### pixelsPerUnit

• **pixelsPerUnit**: `number`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[pixelsPerUnit](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#pixelsperunit)

___

### position

• **position**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[position](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#position)

___

### rotation

• **rotation**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[rotation](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#rotation)

___

### scale

• **scale**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[scale](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#scale)

___

### texture

• **texture**: [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[texture](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#texture)

___

### textureChanged

• **textureChanged**: `boolean`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[textureChanged](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#texturechanged)

___

### textureRect

• **textureRect**: [`vec4`](../modules/core_global.md#vec4)

___

### transformMatrix

• **transformMatrix**: [`mat4`](../modules/core_global.md#mat4)

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[transformMatrix](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#transformmatrix)

___

### vertexCount

• **vertexCount**: `number`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[vertexCount](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#vertexcount)

___

### vertexStride

• **vertexStride**: `number`

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[vertexStride](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#vertexstride)

___

### vertexSubBuffer

• **vertexSubBuffer**: [`VertexSubBuffer`](../interfaces/gfx3_gfx3_manager$VertexSubBuffer.md)

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[vertexSubBuffer](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#vertexsubbuffer)

___

### vertices

• **vertices**: `number`[]

#### Inherited from

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[vertices](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#vertices)

## Constructors

### constructor

• **new Gfx3SpriteJSS**()

The constructor.

#### Overrides

[Gfx3Sprite](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md).[constructor](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#constructor)
