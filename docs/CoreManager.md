[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [core/core\_manager](../modules/core_core_manager.md) / CoreManager

# Class: CoreManager

[core/core_manager](../modules/core_core_manager.md).CoreManager

The `CoreManager` class is a singleton responsible for managing the size and resolution of the top-level
HTMLElement container.

## Table of contents

### Methods

- [getResolution](core_core_manager$CoreManager.md#getresolution)
- [getSize](core_core_manager$CoreManager.md#getsize)
- [setSize](core_core_manager$CoreManager.md#setsize)

### Properties

- [container](core_core_manager$CoreManager.md#container)
- [resHeight](core_core_manager$CoreManager.md#resheight)
- [resWidth](core_core_manager$CoreManager.md#reswidth)
- [sizeMode](core_core_manager$CoreManager.md#sizemode)

### Constructors

- [constructor](core_core_manager$CoreManager.md#constructor)

## Methods

### getResolution

▸ **getResolution**(): [`vec2`](../modules/core_global.md#vec2)

The "getResolution" function returns the size resolution of the game.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

An array containing the resolution width and resolution height.

___

### getSize

▸ **getSize**(): [`vec2`](../modules/core_global.md#vec2)

The "getSize" function returns the client-width and client-height of the container element.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

An array containing the width and height of the container.

___

### setSize

▸ **setSize**(`resWidth`, `resHeight`, `sizeMode?`): `void`

The "setSize" function adjusts the size of a container element based on the specified width and
height, and applies different scaling and positioning transformations based on the specified size
mode.
It emit a 'E_RESIZE' event.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `resWidth` | `number` | `undefined` | The width of the container in pixels. |
| `resHeight` | `number` | `undefined` | The height of the container in pixels. |
| `sizeMode` | [`SizeMode`](../enums/core_core_manager$SizeMode.md) | `SizeMode.FIXED` | SizeMode is an optional parameter that determines how the container fit the browser window |

#### Returns

`void`

## Properties

### container

• **container**: `HTMLElement`

___

### resHeight

• **resHeight**: `number`

___

### resWidth

• **resWidth**: `number`

___

### sizeMode

• **sizeMode**: [`SizeMode`](../enums/core_core_manager$SizeMode.md)

## Constructors

### constructor

• **new CoreManager**()

The constructor.
