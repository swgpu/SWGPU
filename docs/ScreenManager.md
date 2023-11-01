[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [screen/screen\_manager](../modules/screen_screen_manager.md) / ScreenManager

# Class: ScreenManager

[screen/screen_manager](../modules/screen_screen_manager.md).ScreenManager

The `ScreenManager` class is a singleton responsible for manages a stack of screens.
Nota bene: requestPush, requestSet and requestPop are all asynchronously method and will be
executed safely in the update loop.

## Table of contents

### Methods

- [draw](screen_screen_manager$ScreenManager.md#draw)
- [requestPopScreen](screen_screen_manager$ScreenManager.md#requestpopscreen)
- [requestPushScreen](screen_screen_manager$ScreenManager.md#requestpushscreen)
- [requestSetScreen](screen_screen_manager$ScreenManager.md#requestsetscreen)
- [update](screen_screen_manager$ScreenManager.md#update)

### Properties

- [requests](screen_screen_manager$ScreenManager.md#requests)
- [screens](screen_screen_manager$ScreenManager.md#screens)

### Constructors

- [constructor](screen_screen_manager$ScreenManager.md#constructor)

## Methods

### draw

▸ **draw**(): `void`

The "draw" function.

#### Returns

`void`

___

### requestPopScreen

▸ **requestPopScreen**(): `void`

The "requestPopScreen" function pops the top screen from the screen stack.
Nota bene: it call the `onExit` virtual method on the popped screen.

#### Returns

`void`

___

### requestPushScreen

▸ **requestPushScreen**(`newScreen`, `args?`): `void`

The "requestPushScreen" function pushes a new screen to the stack, throwing an error if the
screen is already present.
Nota bene: it call `onEnter` virtual method on the new screen.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newScreen` | [`Screen`](screen_screen$Screen.md) | The new screen that you want to push onto the stack. |
| `args` | `any` | args is an optional parameter of type any. It is used to pass additional arguments to the new screen when it is being pushed onto the stack. The default value is an empty object ({}). |

#### Returns

`void`

___

### requestSetScreen

▸ **requestSetScreen**(`newScreen`, `args?`): `void`

The "requestSetScreen" function remove all screens and sets a unique new screen to the stack.
Nota bene: it call the `onEnter` virtual method on the new screen.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newScreen` | [`Screen`](screen_screen$Screen.md) | The new screen that you want to set as the current screen. |
| `args` | `any` | The `args` parameter is an optional object that can be passed to the `onEnter` method of the `newScreen` object. It allows you to pass any additional data or configuration that the `newScreen` may need when it is being entered. |

#### Returns

`void`

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

## Properties

### requests

• **requests**: `Function`[]

___

### screens

• **screens**: [`Screen`](screen_screen$Screen.md)[]

## Constructors

### constructor

• **new ScreenManager**()

The constructor.
