[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx3\_mesh/gfx3\_mesh\_material](../modules/gfx3_mesh_gfx3_mesh_material.md) / Gfx3Material

# Class: Gfx3Material

[gfx3_mesh/gfx3_mesh_material](../modules/gfx3_mesh_gfx3_mesh_material.md).Gfx3Material

The `Gfx3Material` class represents the material of a surface and provides method for controlling
texture, light reflection, uv animation, texture scrolling, texture displacement, environment reflection
and opacity of a surface. It used the phong illumination model for a full-artistic freedom.

## Table of contents

### Methods

- [delete](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#delete)
- [enableDecal](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#enabledecal)
- [getDisplacementMap](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#getdisplacementmap)
- [getEnvMap](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#getenvmap)
- [getGroup02](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#getgroup02)
- [getGroup03](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#getgroup03)
- [getNormalMap](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#getnormalmap)
- [getSpecularityMap](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#getspecularitymap)
- [getTexture](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#gettexture)
- [playAnimation](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#playanimation)
- [resetAnimation](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#resetanimation)
- [setAmbient](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#setambient)
- [setDiffuse](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#setdiffuse)
- [setDisplacementMap](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#setdisplacementmap)
- [setEmissive](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#setemissive)
- [setEnvMap](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#setenvmap)
- [setLightning](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#setlightning)
- [setNormalIntensity](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#setnormalintensity)
- [setNormalMap](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#setnormalmap)
- [setOpacity](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#setopacity)
- [setSpecular](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#setspecular)
- [setSpecularity](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#setspecularity)
- [setSpecularityMap](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#setspecularitymap)
- [setTexture](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#settexture)
- [update](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#update)
- [createFromFile](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#createfromfile)

### Properties

- [animations](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#animations)
- [colors](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#colors)
- [currentAnimation](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#currentanimation)
- [currentAnimationFrameIndex](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#currentanimationframeindex)
- [dataChanged](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#datachanged)
- [displacementMap](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#displacementmap)
- [displacementMapScrollAngle](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#displacementmapscrollangle)
- [displacementMapScrollRate](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#displacementmapscrollrate)
- [envMap](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#envmap)
- [frameProgress](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#frameprogress)
- [grp2](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#grp2)
- [grp3](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#grp3)
- [looped](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#looped)
- [normalMap](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#normalmap)
- [params](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#params)
- [specularityMap](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#specularitymap)
- [texture](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#texture)
- [textureScrollAngle](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#texturescrollangle)
- [textureScrollRate](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#texturescrollrate)
- [texturesChanged](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#textureschanged)

### Constructors

- [constructor](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md#constructor)

## Methods

### delete

▸ **delete**(): `void`

The "delete" function free all resources.
Warning: you need to call this method to free allocation for this object.

#### Returns

`void`

___

### enableDecal

▸ **enableDecal**(`enabled`): `void`

The "enableDecal" function enable decals on the material surface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | A boolean value indicating whether the decal should be enabled or disabled. |

#### Returns

`void`

___

### getDisplacementMap

▸ **getDisplacementMap**(): [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The "getDisplacementMap" function returns the displacement map texture.

#### Returns

[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The displacement map texture.

___

### getEnvMap

▸ **getEnvMap**(): [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The "getEnvMap" function returns the environment map texture.

#### Returns

[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The environment map texture.

___

### getGroup02

▸ **getGroup02**(): [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

The "getGroup02" function returns the static group index 2.

#### Returns

[`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

The static group.

___

### getGroup03

▸ **getGroup03**(): [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

The "getGroup03" function returns the static group index 3.

#### Returns

[`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

The static group.

___

### getNormalMap

▸ **getNormalMap**(): [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The "getNormalMap" function returns the normal map texture.

#### Returns

[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The normal map texture.

___

### getSpecularityMap

▸ **getSpecularityMap**(): [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The "getSpecularityMap" function returns the specularity map texture.

#### Returns

[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The specularity map texture.

___

### getTexture

▸ **getTexture**(): [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The "getTexture" function returns the albedo texture.

#### Returns

[`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

The albedo texture.

___

### playAnimation

▸ **playAnimation**(`animationName`, `looped?`, `preventSameAnimation?`): `void`

The "playAnimation" function is used to start playing a specific uv animation, with options for looping and
preventing the same animation from being played again.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `animationName` | `string` | `undefined` | The name of the animation to be played. |
| `looped?` | `boolean` | `false` | The `looped` parameter is a boolean that determines whether the animation should loop or not. |
| `preventSameAnimation?` | `boolean` | `false` | The `preventSameAnimation` parameter is a boolean flag that determines whether the same animation should be prevented from playing again. |

#### Returns

`void`

___

### resetAnimation

▸ **resetAnimation**(): `void`

The "resetAnimation" function stop animation and set current animation to null.

#### Returns

`void`

___

### setAmbient

▸ **setAmbient**(`r`, `g`, `b`): `void`

The "setAmbient" function sets the ambient color of the material surface.
It is the color of the object on it's shadow parts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `r` | `number` | The parameter "r" represents the red component. |
| `g` | `number` | The parameter "g" represents the green component. |
| `b` | `number` | The parameter "b" represents the blue component. |

#### Returns

`void`

___

### setDiffuse

▸ **setDiffuse**(`r`, `g`, `b`): `void`

The "setDiffuse" function sets the diffuse color of the material surface.
It is the color of the object on it's lightning parts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `r` | `number` | The parameter "r" represents the red component. |
| `g` | `number` | The parameter "g" represents the green component. |
| `b` | `number` | The parameter "b" represents the blue component. |

#### Returns

`void`

___

### setDisplacementMap

▸ **setDisplacementMap**(`displacementMap`, `angle?`, `rate?`, `factor?`): `void`

The "setDisplacementMap" function sets the displacement texture map, scroll angle, scroll rate, and factor
for the graphics effect. It is used to displace pixels of the texture base. It is ideal for water shallow effect, magma etc...
1. White pixel of this texture force pixel of the albedo texture to move in the top-left direction.
2. Grey don't move pixels.
3. Black pixel of this texture force pixel of the albedo texture to move in the bottom-right direction.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `displacementMap` | [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md) | `undefined` | The displacementMap texture. |
| `angle?` | `number` | `0` | The `angle` parameter represents the angle at which the texture will be scrolled. It is measured in radians. |
| `rate?` | `number` | `0` | The `rate` is used to specify the scrolling rate of the texture. It determines how fast the texture will scroll when applied to a surface. |
| `factor?` | `number` | `0` | The `factor` parameter in the setDisplacementMap function is used to control the strength or intensity of the displacement effect. It determines how much the pixels of the displacement map will affect the corresponding pixels of the target image. A higher factor value will result in a more pronounced displacement effect. |

#### Returns

`void`

___

### setEmissive

▸ **setEmissive**(`r`, `g`, `b`): `void`

The "setEmissive" function sets the emissive color of the material surface.
It is the color that the object emit.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `r` | `number` | The parameter "r" represents the red component. |
| `g` | `number` | The parameter "g" represents the green component. |
| `b` | `number` | The parameter "b" represents the blue component. |

#### Returns

`void`

___

### setEnvMap

▸ **setEnvMap**(`envMap`): `void`

The "setEnvMap" function sets the environment map texture of the material surface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `envMap` | [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md) | The envMap texture is used to set the environment reflection on the material surface. |

#### Returns

`void`

___

### setLightning

▸ **setLightning**(`lightning`): `void`

The "setLightning" function sets the lightning boolean flag of the material surface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lightning` | `boolean` | The "lightning" parameter is a boolean value that indicates if light is applied or not to the material. |

#### Returns

`void`

___

### setNormalIntensity

▸ **setNormalIntensity**(`normalIntensity`): `void`

The "setNormalIntensity" function sets the normal bumping intensity of the material surface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `normalIntensity` | `number` | The `normalIntensity` increase or decrease the bumping effect. |

#### Returns

`void`

___

### setNormalMap

▸ **setNormalMap**(`normalMap`): `void`

The "setNormalMap" function sets a normal map texture of the material surface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `normalMap` | [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md) | The normalMap is a texture used for controlling the texture granularity and orientations by adding normals informations on it. |

#### Returns

`void`

___

### setOpacity

▸ **setOpacity**(`opacity`): `void`

The "setOpacity" function sets the opacity of the material surface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opacity` | `number` | The "opacity" determines how transparent or opaque the material should be. The value ranges from 0 (completely transparent) to 1 (completely opaque). |

#### Returns

`void`

___

### setSpecular

▸ **setSpecular**(`r`, `g`, `b`): `void`

The "setSpecular" function sets the specular color of the material surface.
It is the color of the object on it's lightning and eye-oriented parts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `r` | `number` | The parameter "r" represents the red component. |
| `g` | `number` | The parameter "g" represents the green component. |
| `b` | `number` | The parameter "b" represents the blue component. |

#### Returns

`void`

___

### setSpecularity

▸ **setSpecularity**(`specularity`): `void`

The "setSpecularity" function sets the specular intensity of the material surface.
It determines how much light is reflected off the surface and can range
from 0 (no specularity) to 1 (maximum specularity).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `specularity` | `number` | The specularity parameter is a number that represents the level of specularity or shininess of the surface. |

#### Returns

`void`

___

### setSpecularityMap

▸ **setSpecularityMap**(`specularityMap`): `void`

The "setSpecularityMap" function sets the specularity map texture of the material surface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `specularityMap` | [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md) | The specularityMap is a texture used for controlling the specularity (shininess) of a material surface. |

#### Returns

`void`

___

### setTexture

▸ **setTexture**(`texture`, `angle?`, `rate?`): `void`

The "setTexture" function sets the texture, texture scroll angle, and texture scroll rate of the material surface.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `texture` | [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md) | `undefined` | The texture that will be applied to the material surface. |
| `angle?` | `number` | `0` | The `angle` parameter represents the angle at which the texture will be scrolled. It is measured in radians. |
| `rate?` | `number` | `0` | The `rate` is used to specify the scrolling rate of the texture. It determines how fast the texture will scroll when applied to a surface. |

#### Returns

`void`

___

### update

▸ **update**(`ts`): `void`

The "update" function.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ts` | `number` |

#### Returns

`void`

___

### createFromFile

▸ `Static` **createFromFile**(`path`): `Promise`<[`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md)\>

The "createFromFile" is a static function asynchronously loads and create material from a json file (mat).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The `path` parameter is the file path. |

#### Returns

`Promise`<[`Gfx3Material`](gfx3_mesh_gfx3_mesh_material$Gfx3Material.md)\>

## Properties

### animations

• **animations**: `MATAnimation`[]

___

### colors

• **colors**: `Float32Array`

___

### currentAnimation

• **currentAnimation**: ``null`` \| `MATAnimation`

___

### currentAnimationFrameIndex

• **currentAnimationFrameIndex**: `number`

___

### dataChanged

• **dataChanged**: `boolean`

___

### displacementMap

• **displacementMap**: [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

___

### displacementMapScrollAngle

• **displacementMapScrollAngle**: `number`

___

### displacementMapScrollRate

• **displacementMapScrollRate**: `number`

___

### envMap

• **envMap**: [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

___

### frameProgress

• **frameProgress**: `number`

___

### grp2

• **grp2**: [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

___

### grp3

• **grp3**: [`Gfx3StaticGroup`](gfx3_gfx3_group$Gfx3StaticGroup.md)

___

### looped

• **looped**: `boolean`

___

### normalMap

• **normalMap**: [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

___

### params

• **params**: `Float32Array`

___

### specularityMap

• **specularityMap**: [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

___

### texture

• **texture**: [`Gfx3Texture`](../interfaces/gfx3_gfx3_texture$Gfx3Texture.md)

___

### textureScrollAngle

• **textureScrollAngle**: `number`

___

### textureScrollRate

• **textureScrollRate**: `number`

___

### texturesChanged

• **texturesChanged**: `boolean`

## Constructors

### constructor

• **new Gfx3Material**(`options`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `MATOptions` | The `options` parameter is an object that contains various properties for configuring the material. |
