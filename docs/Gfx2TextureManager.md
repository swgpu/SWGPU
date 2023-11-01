[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx2/gfx2\_texture\_manager](../modules/gfx2_gfx2_texture_manager.md) / Gfx2TextureManager

# Class: Gfx2TextureManager

[gfx2/gfx2_texture_manager](../modules/gfx2_gfx2_texture_manager.md).Gfx2TextureManager

The `Gfx2TextureManager` class is a singleton responsible for managing, loading, caching, and deleting
textures represented as `ImageBitmap` objects.

## Table of contents

### Methods

- [deleteTexture](gfx2_gfx2_texture_manager$Gfx2TextureManager.md#deletetexture)
- [getTexture](gfx2_gfx2_texture_manager$Gfx2TextureManager.md#gettexture)
- [hasTexture](gfx2_gfx2_texture_manager$Gfx2TextureManager.md#hastexture)
- [loadTexture](gfx2_gfx2_texture_manager$Gfx2TextureManager.md#loadtexture)
- [releaseTextures](gfx2_gfx2_texture_manager$Gfx2TextureManager.md#releasetextures)

### Properties

- [textures](gfx2_gfx2_texture_manager$Gfx2TextureManager.md#textures)

### Constructors

- [constructor](gfx2_gfx2_texture_manager$Gfx2TextureManager.md#constructor)

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

▸ **getTexture**(`path`): `ImageBitmap`

The "getTexture" function returns an `ImageBitmap` object for a given texture path, or throws an
error if the texture doesn't exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to the texture file. |

#### Returns

`ImageBitmap`

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

### loadTexture

▸ **loadTexture**(`path`): `Promise`<`ImageBitmap`\>

The "loadTexture" function asynchronously loads an image from a given path and returns it as an
`ImageBitmap`, caching it for future use.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The file path or URL of the image that you want to load as a texture. |

#### Returns

`Promise`<`ImageBitmap`\>

a Promise that resolves when texture is loaded.

___

### releaseTextures

▸ **releaseTextures**(): `void`

The "releaseTextures" function deletes all the textures stored in the manager.

#### Returns

`void`

## Properties

### textures

• **textures**: `Map`<`string`, `ImageBitmap`\>

## Constructors

### constructor

• **new Gfx2TextureManager**()

The constructor.
