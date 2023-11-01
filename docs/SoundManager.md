[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [sound/sound\_manager](../modules/sound_sound_manager.md) / SoundManager

# Class: SoundManager

[sound/sound_manager](../modules/sound_sound_manager.md).SoundManager

The `SoundManager` class is a singleton responsible for managing, loading, caching and playing
sounds.

## Table of contents

### Methods

- [deleteSound](sound_sound_manager$SoundManager.md#deletesound)
- [loadSound](sound_sound_manager$SoundManager.md#loadsound)
- [pauseSound](sound_sound_manager$SoundManager.md#pausesound)
- [playSound](sound_sound_manager$SoundManager.md#playsound)
- [releaseSounds](sound_sound_manager$SoundManager.md#releasesounds)

### Properties

- [sounds](sound_sound_manager$SoundManager.md#sounds)

### Constructors

- [constructor](sound_sound_manager$SoundManager.md#constructor)

## Methods

### deleteSound

▸ **deleteSound**(`path`): `void`

The "deleteSound" function deletes a sound if it exists, otherwise it throws an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to the sound file. |

#### Returns

`void`

___

### loadSound

▸ **loadSound**(`path`): `Promise`<`HTMLAudioElement`\>

The "loadSound" function asynchronously loads a sound from a given path and returns it as an
`HTMLAudioElement`, caching it for future use.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The file path or URL of the sound that you want to load. |

#### Returns

`Promise`<`HTMLAudioElement`\>

a Promise that resolves when sound is loaded.

___

### pauseSound

▸ **pauseSound**(`path`): `void`

The "pauseSound" function pause a sound file if it exists, otherwise it throws an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path parameter is a string that represents the location or path of the sound file that you want to pause. |

#### Returns

`void`

___

### playSound

▸ **playSound**(`path`): `void`

The "playSound" function plays a sound file if it exists, otherwise it throws an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The `path` parameter is a string that represents the file path of the sound file that you want to play. |

#### Returns

`void`

___

### releaseSounds

▸ **releaseSounds**(): `void`

The "releaseSounds" function deletes all the sounds stored in the manager.

#### Returns

`void`

## Properties

### sounds

• **sounds**: `Map`<`string`, `HTMLAudioElement`\>

## Constructors

### constructor

• **new SoundManager**()

The constructor.
