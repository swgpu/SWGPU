[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3/gfx3\_texture\_manager](../modules/gfx3_gfx3_texture_manager.md) / Gfx3TextureManager

# Class: Gfx3TextureManager

[gfx3/gfx3_texture_manager](../modules/gfx3_gfx3_texture_manager.md).Gfx3TextureManager

The `Gfx3TextureManager` class is a singleton responsible for managing, loading, caching, and deleting
textures represented as `Gfx3Texture` objects.

## Table of contents

### Methods

- [deleteTexture](gfx3_gfx3_texture_manager$Gfx3TextureManager.md#deletetexture)
- [getTexture](gfx3_gfx3_texture_manager$Gfx3TextureManager.md#gettexture)
- [hasTexture](gfx3_gfx3_texture_manager$Gfx3TextureManager.md#hastexture)
- [loadCubemapTexture](gfx3_gfx3_texture_manager$Gfx3TextureManager.md#loadcubemaptexture)
- [loadTexture](gfx3_gfx3_texture_manager$Gfx3TextureManager.md#loadtexture)
- [loadTexture8bit](gfx3_gfx3_texture_manager$Gfx3TextureManager.md#loadtexture8bit)
- [releaseTextures](gfx3_gfx3_texture_manager$Gfx3TextureManager.md#releasetextures)

### Properties

- [textures](gfx3_gfx3_texture_manager$Gfx3TextureManager.md#textures)

### Constructors

- [constructor](gfx3_gfx3_texture_manager$Gfx3TextureManager.md#constructor)

## Methods

### deleteTexture

▸ **deleteTexture**(`path`): `void`

The "deleteTexture" function deletes a texture if it exists, otherwise it throws an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to the texture file. |

#### Returns

`void`

___

### getTexture

▸ **getTexture**(`path`): [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The "getTexture" function returns an `ImageBitmap` object for a given texture path, or throws an
error if the texture doesn't exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to the texture file. |

#### Returns

[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

an ImageBitmap.

___

### hasTexture

▸ **hasTexture**(`path`): `boolean`

The "hasTexture" function checks if a texture exists in the manager.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path of the texture file. |

#### Returns

`boolean`

A boolean value indicating if the texture is found or not.

___

### loadCubemapTexture

▸ **loadCubemapTexture**(`path`, `extension`): `Promise`<[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)\>

The "loadCubemapTexture" function asynchronously loads an cubemap image from a given path and returns it as an
`Gfx3Texture`, caching it for future use.
These objects represent the six faces of a cube map texture. Each face should have the same
size.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The file path or URL of the cubemap image that you want to load as a texture. |
| `extension` | `string` | - |

#### Returns

`Promise`<[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)\>

a Promise that resolves when texture is loaded.

___

### loadTexture

▸ **loadTexture**(`path`): `Promise`<[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)\>

The "loadTexture" function asynchronously loads an image from a given path and returns it as an
`Gfx3Texture`, caching it for future use.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The file path or URL of the image that you want to load as a texture. |

#### Returns

`Promise`<[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)\>

a Promise that resolves when texture is loaded.

___

### loadTexture8bit

▸ **loadTexture8bit**(`path`): `Promise`<[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)\>

The "loadTexture8bit" function asynchronously loads an image from a given path and returns it as an
8bits `Gfx3Texture`, caching it for future use.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The file path or URL of the image that you want to load as a texture. |

#### Returns

`Promise`<[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)\>

a Promise that resolves when texture is loaded.

___

### releaseTextures

▸ **releaseTextures**(): `void`

The "releaseTextures" function deletes all the textures stored in the manager.

#### Returns

`void`

## Properties

### textures

• **textures**: `Map`<`string`, [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)\>

## Constructors

### constructor

• **new Gfx3TextureManager**()

The constructor.
