[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_particules/gfx3\_particles](../modules/gfx3_particules_gfx3_particles.md) / Gfx3Particles

# Class: Gfx3Particles

[gfx3_particules/gfx3_particles](../modules/gfx3_particules_gfx3_particles.md).Gfx3Particles

The `Gfx3Particles` class is a subclass of `Gfx2Drawable` that responsible for updating and
rendering a particle system in 3D space with various properties such as position,
velocity, size, opacity, acceleration, color, angle, and age.

## Hierarchy

- [`Gfx3Drawable`](gfx3_gfx3_drawable$Gfx3Drawable.md)

  ↳ **`Gfx3Particles`**

## Table of contents

### Methods

- [beginVertices](gfx3_particules_gfx3_particles$Gfx3Particles.md#beginvertices)
- [createParticle](gfx3_particules_gfx3_particles$Gfx3Particles.md#createparticle)
- [defineVertex](gfx3_particules_gfx3_particles$Gfx3Particles.md#definevertex)
- [delete](gfx3_particules_gfx3_particles$Gfx3Particles.md#delete)
- [draw](gfx3_particules_gfx3_particles$Gfx3Particles.md#draw)
- [endVertices](gfx3_particules_gfx3_particles$Gfx3Particles.md#endvertices)
- [getBoundingBox](gfx3_particules_gfx3_particles$Gfx3Particles.md#getboundingbox)
- [getGroup02](gfx3_particules_gfx3_particles$Gfx3Particles.md#getgroup02)
- [getLocalAxies](gfx3_particules_gfx3_particles$Gfx3Particles.md#getlocalaxies)
- [getPosition](gfx3_particules_gfx3_particles$Gfx3Particles.md#getposition)
- [getPositionX](gfx3_particules_gfx3_particles$Gfx3Particles.md#getpositionx)
- [getPositionY](gfx3_particules_gfx3_particles$Gfx3Particles.md#getpositiony)
- [getPositionZ](gfx3_particules_gfx3_particles$Gfx3Particles.md#getpositionz)
- [getRotation](gfx3_particules_gfx3_particles$Gfx3Particles.md#getrotation)
- [getRotationQuaternion](gfx3_particules_gfx3_particles$Gfx3Particles.md#getrotationquaternion)
- [getRotationX](gfx3_particules_gfx3_particles$Gfx3Particles.md#getrotationx)
- [getRotationY](gfx3_particules_gfx3_particles$Gfx3Particles.md#getrotationy)
- [getRotationZ](gfx3_particules_gfx3_particles$Gfx3Particles.md#getrotationz)
- [getScale](gfx3_particules_gfx3_particles$Gfx3Particles.md#getscale)
- [getScaleX](gfx3_particules_gfx3_particles$Gfx3Particles.md#getscalex)
- [getScaleY](gfx3_particules_gfx3_particles$Gfx3Particles.md#getscaley)
- [getScaleZ](gfx3_particules_gfx3_particles$Gfx3Particles.md#getscalez)
- [getTexture](gfx3_particules_gfx3_particles$Gfx3Particles.md#gettexture)
- [getTransformMatrix](gfx3_particules_gfx3_particles$Gfx3Particles.md#gettransformmatrix)
- [getVertexCount](gfx3_particules_gfx3_particles$Gfx3Particles.md#getvertexcount)
- [getVertexSubBufferOffset](gfx3_particules_gfx3_particles$Gfx3Particles.md#getvertexsubbufferoffset)
- [getVertexSubBufferSize](gfx3_particules_gfx3_particles$Gfx3Particles.md#getvertexsubbuffersize)
- [getVertices](gfx3_particules_gfx3_particles$Gfx3Particles.md#getvertices)
- [getWorldBoundingBox](gfx3_particules_gfx3_particles$Gfx3Particles.md#getworldboundingbox)
- [rotate](gfx3_particules_gfx3_particles$Gfx3Particles.md#rotate)
- [setPosition](gfx3_particules_gfx3_particles$Gfx3Particles.md#setposition)
- [setRotation](gfx3_particules_gfx3_particles$Gfx3Particles.md#setrotation)
- [setRotationQuaternion](gfx3_particules_gfx3_particles$Gfx3Particles.md#setrotationquaternion)
- [setScale](gfx3_particules_gfx3_particles$Gfx3Particles.md#setscale)
- [setTexture](gfx3_particules_gfx3_particles$Gfx3Particles.md#settexture)
- [setVertices](gfx3_particules_gfx3_particles$Gfx3Particles.md#setvertices)
- [translate](gfx3_particules_gfx3_particles$Gfx3Particles.md#translate)
- [update](gfx3_particules_gfx3_particles$Gfx3Particles.md#update)
- [updateGeometry](gfx3_particules_gfx3_particles$Gfx3Particles.md#updategeometry)
- [updateLifeCycle](gfx3_particules_gfx3_particles$Gfx3Particles.md#updatelifecycle)
- [zoom](gfx3_particules_gfx3_particles$Gfx3Particles.md#zoom)

### Properties

- [accelerationBase](gfx3_particules_gfx3_particles$Gfx3Particles.md#accelerationbase)
- [accelerationSpread](gfx3_particules_gfx3_particles$Gfx3Particles.md#accelerationspread)
- [accelerationTween](gfx3_particules_gfx3_particles$Gfx3Particles.md#accelerationtween)
- [angleAccelerationBase](gfx3_particules_gfx3_particles$Gfx3Particles.md#angleaccelerationbase)
- [angleAccelerationSpread](gfx3_particules_gfx3_particles$Gfx3Particles.md#angleaccelerationspread)
- [angleBase](gfx3_particules_gfx3_particles$Gfx3Particles.md#anglebase)
- [angleSpread](gfx3_particules_gfx3_particles$Gfx3Particles.md#anglespread)
- [angleVelocityBase](gfx3_particules_gfx3_particles$Gfx3Particles.md#anglevelocitybase)
- [angleVelocitySpread](gfx3_particules_gfx3_particles$Gfx3Particles.md#anglevelocityspread)
- [boundingBox](gfx3_particules_gfx3_particles$Gfx3Particles.md#boundingbox)
- [colorBase](gfx3_particules_gfx3_particles$Gfx3Particles.md#colorbase)
- [colorSpread](gfx3_particules_gfx3_particles$Gfx3Particles.md#colorspread)
- [colorTween](gfx3_particules_gfx3_particles$Gfx3Particles.md#colortween)
- [emitterAge](gfx3_particules_gfx3_particles$Gfx3Particles.md#emitterage)
- [emitterAlive](gfx3_particules_gfx3_particles$Gfx3Particles.md#emitteralive)
- [emitterDeathAge](gfx3_particules_gfx3_particles$Gfx3Particles.md#emitterdeathage)
- [grp2](gfx3_particules_gfx3_particles$Gfx3Particles.md#grp2)
- [isTransformMatrixDirty](gfx3_particules_gfx3_particles$Gfx3Particles.md#istransformmatrixdirty)
- [opacityBase](gfx3_particules_gfx3_particles$Gfx3Particles.md#opacitybase)
- [opacitySpread](gfx3_particules_gfx3_particles$Gfx3Particles.md#opacityspread)
- [opacityTween](gfx3_particules_gfx3_particles$Gfx3Particles.md#opacitytween)
- [particleAlivedCount](gfx3_particules_gfx3_particles$Gfx3Particles.md#particlealivedcount)
- [particleArray](gfx3_particules_gfx3_particles$Gfx3Particles.md#particlearray)
- [particleDeathAge](gfx3_particules_gfx3_particles$Gfx3Particles.md#particledeathage)
- [particleQuantity](gfx3_particules_gfx3_particles$Gfx3Particles.md#particlequantity)
- [particlesPerSecond](gfx3_particules_gfx3_particles$Gfx3Particles.md#particlespersecond)
- [position](gfx3_particules_gfx3_particles$Gfx3Particles.md#position)
- [positionBase](gfx3_particules_gfx3_particles$Gfx3Particles.md#positionbase)
- [positionRadiusSpread](gfx3_particules_gfx3_particles$Gfx3Particles.md#positionradiusspread)
- [positionSphereRadiusBase](gfx3_particules_gfx3_particles$Gfx3Particles.md#positionsphereradiusbase)
- [positionSpread](gfx3_particules_gfx3_particles$Gfx3Particles.md#positionspread)
- [positionStyle](gfx3_particules_gfx3_particles$Gfx3Particles.md#positionstyle)
- [rotation](gfx3_particules_gfx3_particles$Gfx3Particles.md#rotation)
- [scale](gfx3_particules_gfx3_particles$Gfx3Particles.md#scale)
- [sizeBase](gfx3_particules_gfx3_particles$Gfx3Particles.md#sizebase)
- [sizeSpread](gfx3_particules_gfx3_particles$Gfx3Particles.md#sizespread)
- [sizeTween](gfx3_particules_gfx3_particles$Gfx3Particles.md#sizetween)
- [texture](gfx3_particules_gfx3_particles$Gfx3Particles.md#texture)
- [textureChanged](gfx3_particules_gfx3_particles$Gfx3Particles.md#texturechanged)
- [transformMatrix](gfx3_particules_gfx3_particles$Gfx3Particles.md#transformmatrix)
- [velocityBase](gfx3_particules_gfx3_particles$Gfx3Particles.md#velocitybase)
- [velocityExplodeSpeedBase](gfx3_particules_gfx3_particles$Gfx3Particles.md#velocityexplodespeedbase)
- [velocityExplodeSpeedSpread](gfx3_particules_gfx3_particles$Gfx3Particles.md#velocityexplodespeedspread)
- [velocitySpread](gfx3_particules_gfx3_particles$Gfx3Particles.md#velocityspread)
- [velocityStyle](gfx3_particules_gfx3_particles$Gfx3Particles.md#velocitystyle)
- [vertexCount](gfx3_particules_gfx3_particles$Gfx3Particles.md#vertexcount)
- [vertexStride](gfx3_particules_gfx3_particles$Gfx3Particles.md#vertexstride)
- [vertexSubBuffer](gfx3_particules_gfx3_particles$Gfx3Particles.md#vertexsubbuffer)
- [vertices](gfx3_particules_gfx3_particles$Gfx3Particles.md#vertices)

### Constructors

- [constructor](gfx3_particules_gfx3_particles$Gfx3Particles.md#constructor)

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

### createParticle

▸ **createParticle**(): `Particle`

The "createParticle" function creates a particle with various properties such as position, velocity, size, opacity,
acceleration, color, angle, and age.

#### Returns

`Particle`

a Particle object.

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

### getGroup02

▸ **getGroup02**(): [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

The "getGroup02" function returns the static group index 2.

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

▸ **getTexture**(): ``null`` \| [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The "getTexture" function returns the particle texture.

#### Returns

``null`` \| [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The texture.

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

The "setTexture" function sets the particle texture.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `texture` | [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md) | The texture. |

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

### updateGeometry

▸ **updateGeometry**(`ts`): `void`

The "updateGeometry" function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The `ts` parameter stands for "timestep". |

#### Returns

`void`

___

### updateLifeCycle

▸ **updateLifeCycle**(`ts`): `void`

The "updateLifeCycle" function.

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

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[zoom](gfx3_gfx3_drawable$Gfx3Drawable.md#zoom)

## Properties

### accelerationBase

• **accelerationBase**: [`vec3`](../modules/core_global.md#vec3)

___

### accelerationSpread

• **accelerationSpread**: [`vec3`](../modules/core_global.md#vec3)

___

### accelerationTween

• **accelerationTween**: [`TweenVEC3`](core_tween$TweenVEC3.md)

___

### angleAccelerationBase

• **angleAccelerationBase**: `number`

___

### angleAccelerationSpread

• **angleAccelerationSpread**: `number`

___

### angleBase

• **angleBase**: `number`

___

### angleSpread

• **angleSpread**: `number`

___

### angleVelocityBase

• **angleVelocityBase**: `number`

___

### angleVelocitySpread

• **angleVelocitySpread**: `number`

___

### boundingBox

• **boundingBox**: [`Gfx3BoundingBox`](gfx3_gfx3_bounding_box$Gfx3BoundingBox.md)

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[boundingBox](gfx3_gfx3_drawable$Gfx3Drawable.md#boundingbox)

___

### colorBase

• **colorBase**: [`vec3`](../modules/core_global.md#vec3)

___

### colorSpread

• **colorSpread**: [`vec3`](../modules/core_global.md#vec3)

___

### colorTween

• **colorTween**: [`TweenVEC3`](core_tween$TweenVEC3.md)

___

### emitterAge

• **emitterAge**: `number`

___

### emitterAlive

• **emitterAlive**: `boolean`

___

### emitterDeathAge

• **emitterDeathAge**: `number`

___

### grp2

• **grp2**: [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

___

### isTransformMatrixDirty

• **isTransformMatrixDirty**: `boolean`

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[isTransformMatrixDirty](gfx3_gfx3_drawable$Gfx3Drawable.md#istransformmatrixdirty)

___

### opacityBase

• **opacityBase**: `number`

___

### opacitySpread

• **opacitySpread**: `number`

___

### opacityTween

• **opacityTween**: [`TweenNumber`](core_tween$TweenNumber.md)

___

### particleAlivedCount

• **particleAlivedCount**: `number`

___

### particleArray

• **particleArray**: `Particle`[]

___

### particleDeathAge

• **particleDeathAge**: `number`

___

### particleQuantity

• **particleQuantity**: `number`

___

### particlesPerSecond

• **particlesPerSecond**: `number`

___

### position

• **position**: [`vec3`](../modules/core_global.md#vec3)

#### Inherited from

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[position](gfx3_gfx3_drawable$Gfx3Drawable.md#position)

___

### positionBase

• **positionBase**: [`vec3`](../modules/core_global.md#vec3)

___

### positionRadiusSpread

• **positionRadiusSpread**: `number`

___

### positionSphereRadiusBase

• **positionSphereRadiusBase**: `number`

___

### positionSpread

• **positionSpread**: [`vec3`](../modules/core_global.md#vec3)

___

### positionStyle

• **positionStyle**: [`PositionStyle`](../enums/gfx3_particules_gfx3_particles$PositionStyle.md)

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

### sizeBase

• **sizeBase**: `number`

___

### sizeSpread

• **sizeSpread**: `number`

___

### sizeTween

• **sizeTween**: [`TweenNumber`](core_tween$TweenNumber.md)

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

### velocityBase

• **velocityBase**: [`vec3`](../modules/core_global.md#vec3)

___

### velocityExplodeSpeedBase

• **velocityExplodeSpeedBase**: `number`

___

### velocityExplodeSpeedSpread

• **velocityExplodeSpeedSpread**: `number`

___

### velocitySpread

• **velocitySpread**: [`vec3`](../modules/core_global.md#vec3)

___

### velocityStyle

• **velocityStyle**: [`VelocityStyle`](../enums/gfx3_particules_gfx3_particles$VelocityStyle.md)

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

• **new Gfx3Particles**(`options`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<[`ParticlesOptions`](../interfaces/gfx3_particules_gfx3_particles$ParticlesOptions.md)\> | An object containing various options for configuring the behavior of the particles cloud. |

#### Overrides

[Gfx3Drawable](gfx3_gfx3_drawable$Gfx3Drawable.md).[constructor](gfx3_gfx3_drawable$Gfx3Drawable.md#constructor)
