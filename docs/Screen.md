[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [screen/screen](../modules/screen_screen.md) / Screen

# Class: Screen

[screen/screen](../modules/screen_screen.md).Screen

The `Screen` is a class that represents a screen in a game, ex: "start-screen", "menu-screen", "game-screen" or "pause-screen.
It is your top-level classes with methods for updating, drawing, entering, exiting.

## Table of contents

### Methods

- [draw](screen_screen$Screen.md#draw)
- [isBlocking](screen_screen$Screen.md#isblocking)
- [onBringToBack](screen_screen$Screen.md#onbringtoback)
- [onBringToFront](screen_screen$Screen.md#onbringtofront)
- [onEnter](screen_screen$Screen.md#onenter)
- [onExit](screen_screen$Screen.md#onexit)
- [setBlocking](screen_screen$Screen.md#setblocking)
- [update](screen_screen$Screen.md#update)

### Properties

- [blocking](screen_screen$Screen.md#blocking)

### Constructors

- [constructor](screen_screen$Screen.md#constructor)

## Methods

### draw

▸ **draw**(): `void`

The "draw" is a virtual method used for the draw phase.

#### Returns

`void`

___

### isBlocking

▸ **isBlocking**(): `boolean`

The "isBlocking" function returns the `blocking` property.

#### Returns

`boolean`

The `blocking`property.

___

### onBringToBack

▸ **onBringToBack**(`newScreen`): `void`

The "onBringToBack" function is a virtual method that is called when the top state level is lost.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newScreen` | [`Screen`](screen_screen$Screen.md) | The new screen that represents the new top level screen. |

#### Returns

`void`

___

### onBringToFront

▸ **onBringToFront**(`oldScreen`): `void`

The "onBringToFront" function is a virtual method that is called when the top state level is
obtained.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `oldScreen` | [`Screen`](screen_screen$Screen.md) | The old screen that represents the previous top level screen. |

#### Returns

`void`

___

### onEnter

▸ **onEnter**(`args`): `Promise`<`void`\>

The "onEnter" function is an asynchronous method that is called during the enter phase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `any` | The "args" parameter is of type "any", which means it can accept any data type. It is used to pass any additional arguments or data to the "onEnter" method. |

#### Returns

`Promise`<`void`\>

___

### onExit

▸ **onExit**(): `void`

The "onExit" function is a virtual method that is called during the exit phase.

#### Returns

`void`

___

### setBlocking

▸ **setBlocking**(`blocking`): `void`

The "setBlocking" function sets the blocking property whether determine if the screen run the
update and draw phases.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blocking` | `boolean` | The `blocking` parameter is a boolean value that determines whether the screen execution should be blocked or not. |

#### Returns

`void`

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

## Properties

### blocking

• **blocking**: `boolean`

## Constructors

### constructor

• **new Screen**()

The constructor.
