[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3/gfx3\_group](../modules/gfx3_gfx3_group.md) / Gfx3StaticGroup

# Class: Gfx3StaticGroup

[gfx3/gfx3_group](../modules/gfx3_gfx3_group.md).Gfx3StaticGroup

The `Gfx3StaticGroup` class represents a group of static graphics resources, such as uniforms and
textures, that can be bound to a GPU render pipeline. It is called static because there is only one
possible allocation for this data-set (related to static-size of 1).

## Table of contents

### Methods

- [allocate](gfx3_gfx3_group$Gfx3StaticGroup.md#allocate)
- [beginWrite](gfx3_gfx3_group$Gfx3StaticGroup.md#beginwrite)
- [destroy](gfx3_gfx3_group$Gfx3StaticGroup.md#destroy)
- [endWrite](gfx3_gfx3_group$Gfx3StaticGroup.md#endwrite)
- [getBindGroup](gfx3_gfx3_group$Gfx3StaticGroup.md#getbindgroup)
- [setFloat](gfx3_gfx3_group$Gfx3StaticGroup.md#setfloat)
- [setInteger](gfx3_gfx3_group$Gfx3StaticGroup.md#setinteger)
- [setTexture](gfx3_gfx3_group$Gfx3StaticGroup.md#settexture)
- [write](gfx3_gfx3_group$Gfx3StaticGroup.md#write)

### Properties

- [bindGroup](gfx3_gfx3_group$Gfx3StaticGroup.md#bindgroup)
- [buffer](gfx3_gfx3_group$Gfx3StaticGroup.md#buffer)
- [currentOffset](gfx3_gfx3_group$Gfx3StaticGroup.md#currentoffset)
- [device](gfx3_gfx3_group$Gfx3StaticGroup.md#device)
- [groupIndex](gfx3_gfx3_group$Gfx3StaticGroup.md#groupindex)
- [pipeline](gfx3_gfx3_group$Gfx3StaticGroup.md#pipeline)
- [textures](gfx3_gfx3_group$Gfx3StaticGroup.md#textures)
- [uniforms](gfx3_gfx3_group$Gfx3StaticGroup.md#uniforms)
- [uniformsByteLength](gfx3_gfx3_group$Gfx3StaticGroup.md#uniformsbytelength)

### Constructors

- [constructor](gfx3_gfx3_group$Gfx3StaticGroup.md#constructor)

## Methods

### allocate

▸ **allocate**(): `void`

The "allocate" function creates a bind group with the provided uniforms and textures entries.

#### Returns

`void`

___

### beginWrite

▸ **beginWrite**(): `void`

The "beginWrite" function prepare the uniform buffer to write process.

#### Returns

`void`

___

### destroy

▸ **destroy**(): `void`

The "destroy" function destroys uniforms buffer.
Warning: you need to call this method to free allocation for this object.

#### Returns

`void`

___

### endWrite

▸ **endWrite**(): `void`

The `endWrite` function close the write process.

#### Returns

`void`

___

### getBindGroup

▸ **getBindGroup**(): `GPUBindGroup`

The "getBindGroup" function returns the bind group.

#### Returns

`GPUBindGroup`

The bindgroup.

___

### setFloat

▸ **setFloat**(`binding`, `name`, `length`): `Float32Array`

The "setFloat" function sets a float bindgroup entry and returns a Float32Array of the specified
length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `binding` | `number` | The `binding` parameter is a number that represents the binding index. It is used to identify the specific uniform in the shader program. |
| `name` | `string` | The `name` parameter is a string that represents the name of the uniform variable. It is used for identification purposes and can be any string value. |
| `length` | `number` | The `length` parameter represents the number of float elements in the uniform. |

#### Returns

`Float32Array`

A new Float32Array with the specified length is being returned.

___

### setInteger

▸ **setInteger**(`binding`, `name`, `length`): `Uint32Array`

The "setInteger" function sets a integer bindgroup entry and returns a Uint32Array of the specified
length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `binding` | `number` | The `binding` parameter is a number that represents the binding index. It is used to identify the specific uniform in the shader program. |
| `name` | `string` | The `name` parameter is a string that represents the name of the uniform variable. It is used for identification purposes and can be any string value. |
| `length` | `number` | The `length` parameter represents the number of integer elements in the uniform. |

#### Returns

`Uint32Array`

A new Uint32Array with the specified length is being returned.

___

### setTexture

▸ **setTexture**(`binding`, `name`, `texture`, `createViewDescriptor?`): [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The "setTexture" function sets a texture and sampler resource for a given bindgroup entry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `binding` | `number` | The `binding` parameter is a number that represents the binding index. It is used to identify the specific uniform in the shader program. |
| `name` | `string` | The name of the texture. It is used for identification purposes and can be any string value. |
| `texture` | [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md) | The `texture` parameter is of type `Gfx3Texture`. |
| `createViewDescriptor` | `GPUTextureViewDescriptor` | The `createViewDescriptor` parameter is an optional object that contains properties used to create a GPUTextureViewDescriptor. This descriptor is used to specify how the texture view should be created, such as the format, dimension, and mip level range of the view. |

#### Returns

[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

the `texture` parameter that was passed in.

___

### write

▸ **write**(`index`, `data`): `void`

The "write" function writes data to a buffer and updates the current offset.
Warning: You need to call this method before write your data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The binding index of uniform. It is used for identification purposes and can be any number value. |
| `data` | `Float32Array` \| `Uint32Array` | The `data` parameter can be either a `Float32Array` or a `Uint32Array`. It represents the data that will be written to the buffer. |

#### Returns

`void`

## Properties

### bindGroup

• **bindGroup**: ``null`` \| `GPUBindGroup`

___

### buffer

• **buffer**: `GPUBuffer`

___

### currentOffset

• **currentOffset**: `number`

___

### device

• **device**: `GPUDevice`

___

### groupIndex

• **groupIndex**: `number`

___

### pipeline

• **pipeline**: `GPURenderPipeline`

___

### textures

• **textures**: `Map`<`number`, { `binding`: `number` ; `name`: `string` ; `resource`: `GPUSampler` \| `GPUTextureView`  }\>

___

### uniforms

• **uniforms**: `Map`<`number`, { `alignment`: `number` ; `binding`: `number` ; `name`: `string` ; `size`: `number`  }\>

___

### uniformsByteLength

• **uniformsByteLength**: `number`

## Constructors

### constructor

• **new Gfx3StaticGroup**(`device`, `pipeline`, `groupIndex`)

This constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `device` | `GPUDevice` | The `device` parameter is an instance of the `GPUDevice` class. It represents the GPU device that will be used for rendering. |
| `pipeline` | `GPURenderPipeline` | The `pipeline` parameter is the graphics pipeline that will be used for rendering. |
| `groupIndex` | `number` | The `groupIndex` parameter is used to identify which shader group is used to binding the uniform buffer and textures to the GPU. |
