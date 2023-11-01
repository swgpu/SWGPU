[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_sprite/gfx3\_sprite](../modules/gfx3_sprite_gfx3_sprite.md) / Gfx3Sprite

# Class: Gfx3Sprite

[gfx3_sprite/gfx3_sprite](../modules/gfx3_sprite_gfx3_sprite.md).Gfx3Sprite

The `Gfx3Sprite` is a subclass of `Gfx2Drawable` that represents a sprite base (abstract) class.

## Hierarchy

- [`Gfx3Drawable`](gfx3_gfx3_drawable$Gfx3Drawable.md)

  ↳ **`Gfx3Sprite`**

  ↳↳ [`Gfx3SpriteJAS`](gfx3_sprite_gfx3_sprite_jas$Gfx3SpriteJAS.md)

  ↳↳ [`Gfx3SpriteJSS`](gfx3_sprite_gfx3_sprite_jss$Gfx3SpriteJSS.md)

## Table of contents

### Methods

- [beginVertices](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#beginvertices)
- [defineVertex](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#definevertex)
- [delete](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#delete)
- [draw](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#draw)
- [endVertices](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#endvertices)
- [getBillboardMode](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getbillboardmode)
- [getBoundingBox](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getboundingbox)
- [getFlip](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getflip)
- [getGroup01](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getgroup01)
- [getLocalAxies](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getlocalaxies)
- [getOffset](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getoffset)
- [getOffsetX](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getoffsetx)
- [getOffsetY](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getoffsety)
- [getPixelsPerUnit](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getpixelsperunit)
- [getPosition](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getposition)
- [getPositionX](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getpositionx)
- [getPositionY](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getpositiony)
- [getPositionZ](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getpositionz)
- [getRotation](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getrotation)
- [getRotationQuaternion](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getrotationquaternion)
- [getRotationX](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getrotationx)
- [getRotationY](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getrotationy)
- [getRotationZ](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getrotationz)
- [getScale](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getscale)
- [getScaleX](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getscalex)
- [getScaleY](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getscaley)
- [getScaleZ](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getscalez)
- [getTexture](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#gettexture)
- [getTransformMatrix](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#gettransformmatrix)
- [getVertexCount](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getvertexcount)
- [getVertexSubBufferOffset](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getvertexsubbufferoffset)
- [getVertexSubBufferSize](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getvertexsubbuffersize)
- [getVertices](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getvertices)
- [getWorldBoundingBox](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#getworldboundingbox)
- [rotate](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#rotate)
- [setBillboardMode](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setbillboardmode)
- [setFlipX](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setflipx)
- [setFlipY](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setflipy)
- [setOffset](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setoffset)
- [setPixelsPerUnit](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setpixelsperunit)
- [setPosition](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setposition)
- [setRotation](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setrotation)
- [setRotationQuaternion](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setrotationquaternion)
- [setScale](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setscale)
- [setTexture](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#settexture)
- [setVertices](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#setvertices)
- [translate](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#translate)
- [update](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#update)
- [zoom](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#zoom)

### Properties

- [billboardMode](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#billboardmode)
- [boundingBox](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#boundingbox)
- [flip](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#flip)
- [grp1](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#grp1)
- [isTransformMatrixDirty](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#istransformmatrixdirty)
- [offset](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#offset)
- [pixelsPerUnit](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#pixelsperunit)
- [position](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#position)
- [rotation](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#rotation)
- [scale](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#scale)
- [texture](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#texture)
- [textureChanged](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#texturechanged)
- [transformMatrix](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#transformmatrix)
- [vertexCount](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#vertexcount)
- [vertexStride](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#vertexstride)
- [vertexSubBuffer](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#vertexsubbuffer)
- [vertices](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#vertices)

### Constructors

- [constructor](gfx3_sprite_gfx3_sprite$Gfx3Sprite.md#constructor)

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

### getBillboardMode

▸ **getBillboardMode**(): `boolean`

The "getBillboardMode" function returns the billboardMode property.

#### Returns

`boolean`

The billboardMode property.

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

### getFlip

▸ **getFlip**(): [`boolean`, `boolean`]

The "getFlip" function returns two booleans, first is the x-axis flip flag, second is the y-axis flip flag.

#### Returns

[`boolean`, `boolean`]

The flip property.

___

### getGroup01

▸ **getGroup01**(): [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

The "getGroup01" function returns the static group index 1.

#### Returns

[`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

The static group.

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

### getOffset

▸ **getOffset**(): [`vec2`](../modules/core_global.md#vec2)

The "getOffset" function returns the origin offset.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The offset.

___

### getOffsetX

▸ **getOffsetX**(): `number`

The "getOffsetX" function returns the offset in x-axis direction.

#### Returns

`number`

The x-offset value.

___

### getOffsetY

▸ **getOffsetY**(): `number`

The "getOffsetY" function returns the offset in y-axis direction.

#### Returns

`number`

The y-offset value.

___

### getPixelsPerUnit

▸ **getPixelsPerUnit**(): `number`

The "getPixelsPerUnit" function get the pixelsPerUnit property.

#### Returns

`number`

- The pixelsPerUnit property.

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

### getTexture

▸ **getTexture**(): [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The "getTexture" function returns the sprite texture.

#### Returns

[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The sprite texture.

___

### getTransformMatrix

▸ **getTransformMatrix**(): [`mat4`](../modules/core_global.md#mat4)

The "getTransformMatrix" function returns the transform matrix from position, rotation, scale, origin offset
and pixel per unit values.

#### Returns

[`mat4`](../modules/core_global.md#mat4)

The transform matrix.

#### Overrides

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

### setBillboardMode

▸ **setBillboardMode**(`billboardMode`): `void`

The "setBillboardMode" function sets the billboard mode to either true or false.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `billboardMode` | `boolean` | A boolean value that determines whether the object should be displayed as a billboard, meaning it always faces the camera regardless of its orientation. |

#### Returns

`void`

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

### setTexture

▸ **setTexture**(`texture`): `void`

The "setTexture" function sets the sprite texture.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `texture` | [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md) | The sprite texture. |

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

### billboardMode

• **billboardMode**: `boolean`

___

### boundingBox

• **boundingBox**: [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[boundingBox](gfx3_gfx3_drawable$Gfx3Drawable.md#boundingbox)

___

### flip

• **flip**: [`boolean`, `boolean`]

___

### grp1

• **grp1**: [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

___

### isTransformMatrixDirty

• **isTransformMatrixDirty**: `boolean`

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[isTransformMatrixDirty](gfx3_gfx3_drawable$Gfx3Drawable.md#istransformmatrixdirty)

___

### offset

• **offset**: [`vec2`](../modules/core_global.md#vec2)

___

### pixelsPerUnit

• **pixelsPerUnit**: `number`

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

• **new Gfx3Sprite**()

The constructor.

#### Overrides

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[constructor](gfx3_gfx3_drawable$Gfx3Drawable.md#constructor)
