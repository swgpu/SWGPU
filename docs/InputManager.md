[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [input/input\_manager](../modules/input_input_manager.md) / InputManager

# Class: InputManager

[input/input_manager](../modules/input_input_manager.md).InputManager

The `InputManager` class is a singleton responsible for managing input from various sources such as keyboard and
gamepad, registering actions, and emitting events based on user input.

## Table of contents

### Methods

- [$updatePadsStatus](input_input_manager$InputManager.md#$updatepadsstatus)
- [addPad](input_input_manager$InputManager.md#addpad)
- [findActionIds](input_input_manager$InputManager.md#findactionids)
- [getPad](input_input_manager$InputManager.md#getpad)
- [handleGamePadConnected](input_input_manager$InputManager.md#handlegamepadconnected)
- [handleGamePadDisconnected](input_input_manager$InputManager.md#handlegamepaddisconnected)
- [handleKeyDown](input_input_manager$InputManager.md#handlekeydown)
- [handleKeyUp](input_input_manager$InputManager.md#handlekeyup)
- [isActiveAction](input_input_manager$InputManager.md#isactiveaction)
- [registerAction](input_input_manager$InputManager.md#registeraction)
- [removePad](input_input_manager$InputManager.md#removepad)
- [unregisterAction](input_input_manager$InputManager.md#unregisteraction)

### Properties

- [actionRegister](input_input_manager$InputManager.md#actionregister)
- [actionmap](input_input_manager$InputManager.md#actionmap)
- [keymap](input_input_manager$InputManager.md#keymap)
- [pads](input_input_manager$InputManager.md#pads)
- [padsInterval](input_input_manager$InputManager.md#padsinterval)

### Constructors

- [constructor](input_input_manager$InputManager.md#constructor)

## Methods

### $updatePadsStatus

▸ **$updatePadsStatus**(): `void`

#### Returns

`void`

___

### addPad

▸ **addPad**(`pad`): `void`

The "addPad" function adds a pad to the manager.
It update the pads' status every 50ms.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pad` | `Pad` | The new pad. |

#### Returns

`void`

___

### findActionIds

▸ **findActionIds**(`inputSource`, `eventKey`): `string`[]

The "findActionIds" function takes an input source and an event key, and returns an array of action
IDs that match the given input source and event key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputSource` | `string` | The `inputSource` parameter is a string that represents the source of the input. It could be a device, such as a keyboard or mouse, or any other input source. |
| `eventKey` | `string` | The `eventKey` parameter is a string that represents the key of the event. It is used to filter the actions based on the event key. |

#### Returns

`string`[]

an array of strings, which are the action IDs that match the given inputSource and
eventKey.

___

### getPad

▸ **getPad**(`index`): `undefined` \| `Pad`

The "getPad" function returns the specified Pad.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The `index` parameter is a number that represents the index of the pad we want to retrieve. |

#### Returns

`undefined` \| `Pad`

The pad or undefined if not found.

___

### handleGamePadConnected

▸ **handleGamePadConnected**(`e`): `void`

The "handleGamePadConnected" function.
It adds a gamepad to the system when it is connected.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `GamepadEvent` | GamepadEvent - The event object that is triggered when a gamepad is connected. |

#### Returns

`void`

___

### handleGamePadDisconnected

▸ **handleGamePadDisconnected**(`e`): `void`

The "handleGamePadDisconnected" function.
It removes a gamepad from the system when it is disconnected.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `GamepadEvent` | GamepadEvent - This is an event object that contains information about the gamepad that was disconnected. |

#### Returns

`void`

___

### handleKeyDown

▸ **handleKeyDown**(`e`): `boolean`

The "handleKeyDown" function.
It handles keydown events by emitting action events and updating the keymap and actionmap.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `KeyboardEvent` | The parameter "e" is of type KeyboardEvent, which represents a keyboard event that occurs when a key is pressed or released. |

#### Returns

`boolean`

___

### handleKeyUp

▸ **handleKeyUp**(`e`): `void`

The "handleKeyUp" function.
It handles key up events by emitting an action released event and updating the keymap and
actionmap.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `KeyboardEvent` | KeyboardEvent - The event object that contains information about the keyboard event that occurred. |

#### Returns

`void`

___

### isActiveAction

▸ **isActiveAction**(`actionId`): `undefined` \| `boolean`

The "isActiveAction" function checks if an action is currently active.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionId` | `string` | A string representing the ID of the action. |

#### Returns

`undefined` \| `boolean`

a boolean value indicating if action is active or not.

___

### registerAction

▸ **registerAction**(`inputSource`, `eventKey`, `actionId`): `void`

The "registerAction" function registers an action with a unique ID, input source, and event key, and
adds it to the action register if it doesn't already exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputSource` | `string` | The input source refers to the device or method from which the input is received. It could be a keyboard, mouse, gamepad, or any other input device. |
| `eventKey` | `string` | The `eventKey` parameter represents the key or button that triggers the action. It could be a keyboard key, a mouse button, or a gamepad button. |
| `actionId` | `string` | The `actionId` parameter is a string that represents the unique identifier for the action being registered. |

#### Returns

`void`

void, which means it does not return any value.

___

### removePad

▸ **removePad**(`id`): `void`

The "removePad" function removes a pad from the manager.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The `id` parameter is a string that represents the unique identifier of the pad that needs to be removed. |

#### Returns

`void`

___

### unregisterAction

▸ **unregisterAction**(`inputSource`, `eventKey`, `actionId`): `void`

The "unregisterAction" function removes an action for the specific input source and event key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputSource` | `string` | The input source refers to the device or method from which the input is received. It could be a keyboard, mouse, touch screen, or any other input device. |
| `eventKey` | `string` | The eventKey parameter is a string that represents the key or event that triggers the action. It could be a keyboard key, a mouse button, or any other input event. |
| `actionId` | `string` | The `actionId` parameter is a string that represents the unique identifier of the action that needs to be unregistered. |

#### Returns

`void`

## Properties

### actionRegister

• **actionRegister**: `Action`[]

___

### actionmap

• **actionmap**: `Map`<`string`, `boolean`\>

___

### keymap

• **keymap**: `Map`<`string`, `boolean`\>

___

### pads

• **pads**: `Pad`[]

___

### padsInterval

• **padsInterval**: `undefined` \| `number`

## Constructors

### constructor

• **new InputManager**()

The constructor.
