[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3/gfx3\_group](../modules/gfx3_gfx3_group.md) / Gfx3DynamicGroup

# Class: Gfx3DynamicGroup

[gfx3/gfx3_group](../modules/gfx3_gfx3_group.md).Gfx3DynamicGroup

The `Gfx3DynamicGroup` class represents a group of dynamic graphics resources, such as uniforms
that can be bound to a GPU render pipeline. It is called dynamic because we are not limited to one
possible allocation like static-group but as many you need for this data-set (related to dynamic-size of n).

## Table of contents

### Methods

- [allocate](gfx3_gfx3_group$Gfx3DynamicGroup.md#allocate)
- [beginWrite](gfx3_gfx3_group$Gfx3DynamicGroup.md#beginwrite)
- [delete](gfx3_gfx3_group$Gfx3DynamicGroup.md#delete)
- [endWrite](gfx3_gfx3_group$Gfx3DynamicGroup.md#endwrite)
- [getBindGroup](gfx3_gfx3_group$Gfx3DynamicGroup.md#getbindgroup)
- [getSize](gfx3_gfx3_group$Gfx3DynamicGroup.md#getsize)
- [setFloat](gfx3_gfx3_group$Gfx3DynamicGroup.md#setfloat)
- [setInteger](gfx3_gfx3_group$Gfx3DynamicGroup.md#setinteger)
- [write](gfx3_gfx3_group$Gfx3DynamicGroup.md#write)

### Properties

- [bindGroups](gfx3_gfx3_group$Gfx3DynamicGroup.md#bindgroups)
- [buffer](gfx3_gfx3_group$Gfx3DynamicGroup.md#buffer)
- [currentOffset](gfx3_gfx3_group$Gfx3DynamicGroup.md#currentoffset)
- [device](gfx3_gfx3_group$Gfx3DynamicGroup.md#device)
- [groupIndex](gfx3_gfx3_group$Gfx3DynamicGroup.md#groupindex)
- [pipeline](gfx3_gfx3_group$Gfx3DynamicGroup.md#pipeline)
- [size](gfx3_gfx3_group$Gfx3DynamicGroup.md#size)
- [uniforms](gfx3_gfx3_group$Gfx3DynamicGroup.md#uniforms)
- [uniformsByteLength](gfx3_gfx3_group$Gfx3DynamicGroup.md#uniformsbytelength)

### Constructors

- [constructor](gfx3_gfx3_group$Gfx3DynamicGroup.md#constructor)

## Methods

### allocate

▸ **allocate**(`size?`): `void`

The `allocate` function creates n-size bind groups with the provided uniforms entries.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `size?` | `number` | `1` | The `size` parameter in the `allocate` function is the number of bind groups to allocate. It determines how many bind groups will be created and stored in the `bindGroups` array. Each bind group represents a set of resources that can be bound to a shader pipeline for rendering. |

#### Returns

`void`

___

### beginWrite

▸ **beginWrite**(): `void`

The "beginWrite" function prepare the uniform buffer to write process.

#### Returns

`void`

___

### delete

▸ **delete**(): `void`

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

▸ **getBindGroup**(`i?`): `GPUBindGroup`

The getBindGroup function returns the bind group at index i.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `i?` | `number` | `0` | The bind group index. |

#### Returns

`GPUBindGroup`

The bind group.

___

### getSize

▸ **getSize**(): `number`

The "getSize" function returns the number of bindgroups.

#### Returns

`number`

The number of bindgroups.

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

### bindGroups

• **bindGroups**: `GPUBindGroup`[]

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

### size

• **size**: `number`

___

### uniforms

• **uniforms**: `Map`<`number`, { `alignment`: `number` ; `binding`: `number` ; `name`: `string` ; `size`: `number`  }\>

___

### uniformsByteLength

• **uniformsByteLength**: `number`

## Constructors

### constructor

• **new Gfx3DynamicGroup**(`device`, `pipeline`, `groupIndex`)

This constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `device` | `GPUDevice` | The `device` parameter is an instance of the `GPUDevice` class. It represents the GPU device that will be used for rendering. |
| `pipeline` | `GPURenderPipeline` | The `pipeline` parameter is the graphics pipeline that will be used for rendering. |
| `groupIndex` | `number` | The `groupIndex` parameter is used to identify which shader group is used to binding the uniform buffer and textures to the GPU. |
