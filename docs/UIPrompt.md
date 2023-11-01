[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ui\_prompt/ui\_prompt](../modules/ui_prompt_ui_prompt.md) / UIPrompt

# Class: UIPrompt

[ui_prompt/ui_prompt](../modules/ui_prompt_ui_prompt.md).UIPrompt

The `UIPrompt` class represents a user interface prompt with a text content and a menu of actions.

## Hierarchy

- [`UIWidget`](ui_ui_widget$UIWidget.md)

  ↳ **`UIPrompt`**

## Table of contents

### Methods

- [addAction](ui_prompt_ui_prompt$UIPrompt.md#addaction)
- [animate](ui_prompt_ui_prompt$UIPrompt.md#animate)
- [appendStyles](ui_prompt_ui_prompt$UIPrompt.md#appendstyles)
- [clearActions](ui_prompt_ui_prompt$UIPrompt.md#clearactions)
- [delete](ui_prompt_ui_prompt$UIPrompt.md#delete)
- [focus](ui_prompt_ui_prompt$UIPrompt.md#focus)
- [getId](ui_prompt_ui_prompt$UIPrompt.md#getid)
- [getNode](ui_prompt_ui_prompt$UIPrompt.md#getnode)
- [getPosition](ui_prompt_ui_prompt$UIPrompt.md#getposition)
- [getScreenPosition](ui_prompt_ui_prompt$UIPrompt.md#getscreenposition)
- [handleMenuItemSelected](ui_prompt_ui_prompt$UIPrompt.md#handlemenuitemselected)
- [isEnabled](ui_prompt_ui_prompt$UIPrompt.md#isenabled)
- [isFocused](ui_prompt_ui_prompt$UIPrompt.md#isfocused)
- [isSelected](ui_prompt_ui_prompt$UIPrompt.md#isselected)
- [isVisible](ui_prompt_ui_prompt$UIPrompt.md#isvisible)
- [onAction](ui_prompt_ui_prompt$UIPrompt.md#onaction)
- [removeAction](ui_prompt_ui_prompt$UIPrompt.md#removeaction)
- [setEnabled](ui_prompt_ui_prompt$UIPrompt.md#setenabled)
- [setId](ui_prompt_ui_prompt$UIPrompt.md#setid)
- [setPosition](ui_prompt_ui_prompt$UIPrompt.md#setposition)
- [setSelected](ui_prompt_ui_prompt$UIPrompt.md#setselected)
- [setText](ui_prompt_ui_prompt$UIPrompt.md#settext)
- [setVisible](ui_prompt_ui_prompt$UIPrompt.md#setvisible)
- [unfocus](ui_prompt_ui_prompt$UIPrompt.md#unfocus)
- [update](ui_prompt_ui_prompt$UIPrompt.md#update)

### Properties

- [className](ui_prompt_ui_prompt$UIPrompt.md#classname)
- [id](ui_prompt_ui_prompt$UIPrompt.md#id)
- [node](ui_prompt_ui_prompt$UIPrompt.md#node)
- [template](ui_prompt_ui_prompt$UIPrompt.md#template)
- [uiMenu](ui_prompt_ui_prompt$UIPrompt.md#uimenu)

### Constructors

- [constructor](ui_prompt_ui_prompt$UIPrompt.md#constructor)

## Methods

### addAction

▸ **addAction**(`id`, `text`): `void`

The "addAction" function adds a new menu button.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | A string representing the unique identifier for the action. This is used to identify the action when it is selected or triggered. |
| `text` | `string` | The "text" parameter is a string that represents the text or label for the action that you want to add to the UI menu. |

#### Returns

`void`

___

### animate

▸ **animate**(`animation`): `void`

The "animate" function trigger animation to the widget `node` HTMLElement.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `animation` | `string` | The `animation` parameter is a string that represents the name of the animation to be applied to the `node` HTMLElement. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[animate](ui_ui_widget$UIWidget.md#animate)

___

### appendStyles

▸ **appendStyles**(`styles`): `void`

The "appendStyles" function appends CSS styles to the `node` HTMLElement.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `styles` | `string` | The `styles` parameter is a string that represents CSS styles that you want to append to the `cssText` property of the `node` object. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[appendStyles](ui_ui_widget$UIWidget.md#appendstyles)

___

### clearActions

▸ **clearActions**(): `void`

The "clearActions" function remove all menu buttons.

#### Returns

`void`

___

### delete

▸ **delete**(): `void`

The "delete" function free all resources.
Warning: you need to call this method to free allocation for this object.

#### Returns

`void`

#### Overrides

[UIWidget](ui_ui_widget$UIWidget.md).[delete](ui_ui_widget$UIWidget.md#delete)

___

### focus

▸ **focus**(): `void`

The "focus" function.

#### Returns

`void`

#### Overrides

[UIWidget](ui_ui_widget$UIWidget.md).[focus](ui_ui_widget$UIWidget.md#focus)

___

### getId

▸ **getId**(): `string`

The "getId" function returns the `ìd` property.

#### Returns

`string`

The `ìd`property.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[getId](ui_ui_widget$UIWidget.md#getid)

___

### getNode

▸ **getNode**(): `HTMLDivElement`

The "getNode" function returns the root `node` HTMLElement of the widget.

#### Returns

`HTMLDivElement`

The `node` property.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[getNode](ui_ui_widget$UIWidget.md#getnode)

___

### getPosition

▸ **getPosition**(): [`vec2`](../modules/core_global.md#vec2)

The "getPosition" function returns the relative x and y coordinates of the widget `node` HTMLElement.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The x and y coordinates of the node's position.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[getPosition](ui_ui_widget$UIWidget.md#getposition)

___

### getScreenPosition

▸ **getScreenPosition**(): [`vec2`](../modules/core_global.md#vec2)

The "getScreenPosition" function returns the left and top coordinates of the widget `node` HTMLElement on
the screen.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The screen position.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[getScreenPosition](ui_ui_widget$UIWidget.md#getscreenposition)

___

### handleMenuItemSelected

▸ **handleMenuItemSelected**(`data`): `void`

The "handleMenuItemSelected" function.
It emits an 'E_ITEM_SELECTED' event with the data passed as a parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | The `data` parameter is of type `any`, which means it can be any data type. It represents the data associated with the selected menu item. |

#### Returns

`void`

___

### isEnabled

▸ **isEnabled**(): `boolean`

The "isEnabled" function checks if widget is enabled or not.

#### Returns

`boolean`

A boolean value indicating if the widget is enabled or not.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[isEnabled](ui_ui_widget$UIWidget.md#isenabled)

___

### isFocused

▸ **isFocused**(): `boolean`

The "isFocused" function checks if widget is focused.

#### Returns

`boolean`

A boolean value indicating if widget is focused or not.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[isFocused](ui_ui_widget$UIWidget.md#isfocused)

___

### isSelected

▸ **isSelected**(): `boolean`

The "isSelected" function checks if widget is selected or not.

#### Returns

`boolean`

A boolean value indicating if the widget is selected or not.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[isSelected](ui_ui_widget$UIWidget.md#isselected)

___

### isVisible

▸ **isVisible**(): `boolean`

The "isVisible" function checks if the widget is visible.

#### Returns

`boolean`

A boolean value indicating if widget is visible or not.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[isVisible](ui_ui_widget$UIWidget.md#isvisible)

___

### onAction

▸ **onAction**(`actionId`): `void`

The "onAction" function is a virtual method that is called when input action event is emitted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionId` | `string` | The `actionId` parameter is a string that represents the identifier of the action being performed. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[onAction](ui_ui_widget$UIWidget.md#onaction)

___

### removeAction

▸ **removeAction**(`id`): `void`

The "removeAction" function remove the specified menu button.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The `id` parameter is a string that represents the unique identifier of the action to be removed from the UI menu. |

#### Returns

`void`

___

### setEnabled

▸ **setEnabled**(`enabled`): `void`

The "setEnabled" function sets the enabled state flag.
It is just to expose a convenient option to the user, this flag has not effect on the UI manager.
Nota bene: toggle the `u-disabled` class on `node`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | The `enabled` parameter is a boolean value that determines whether the widget is enabled or disabled. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[setEnabled](ui_ui_widget$UIWidget.md#setenabled)

___

### setId

▸ **setId**(`id`): `void`

The "setId" function sets the id property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | A string representing the unique identifier to be set. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[setId](ui_ui_widget$UIWidget.md#setid)

___

### setPosition

▸ **setPosition**(`x`, `y`): `void`

The "setPosition" function sets the left and top position to the widget `node` HTMLElement.
Nota bene: works only if position is `absolute`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The horizontal position of the element on the page. |
| `y` | `number` | The vertical position of the element on the page. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[setPosition](ui_ui_widget$UIWidget.md#setposition)

___

### setSelected

▸ **setSelected**(`selected`): `void`

The "setSelected" function sets the selected state flag.
It is just to expose a convenient option to the user, this flag has not effect on the UI manager.
Nota bene: toggle the `u-selected` class on `node`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selected` | `boolean` | The `selected` parameter is a boolean value that indicates whether the element should be selected or not. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[setSelected](ui_ui_widget$UIWidget.md#setselected)

___

### setText

▸ **setText**(`text`): `void`

The "setText" function sets the text message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The `text` parameter is a string that represents the text content that you want to set. |

#### Returns

`void`

___

### setVisible

▸ **setVisible**(`visible`): `void`

The "setVisible" function sets the visibility state.
Nota bene: toggle the `u-hidden` class on `node`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `visible` | `boolean` | The `visible` parameter is a boolean value that determines whether the element should be visible or hidden. If `visible` is true, the element will be displayed, otherwise it will be hidden. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[setVisible](ui_ui_widget$UIWidget.md#setvisible)

___

### unfocus

▸ **unfocus**(): `void`

The "unfocus" function.

#### Returns

`void`

#### Overrides

[UIWidget](ui_ui_widget$UIWidget.md).[unfocus](ui_ui_widget$UIWidget.md#unfocus)

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

#### Overrides

[UIWidget](ui_ui_widget$UIWidget.md).[update](ui_ui_widget$UIWidget.md#update)

## Properties

### className

• **className**: `string`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[className](ui_ui_widget$UIWidget.md#classname)

___

### id

• **id**: `string`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[id](ui_ui_widget$UIWidget.md#id)

___

### node

• **node**: `HTMLDivElement`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[node](ui_ui_widget$UIWidget.md#node)

___

### template

• **template**: `string`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[template](ui_ui_widget$UIWidget.md#template)

___

### uiMenu

• **uiMenu**: [`UIMenuText`](ui_menu_text_ui_menu_text$UIMenuText.md)

## Constructors

### constructor

• **new UIPrompt**()

The constructor.

#### Overrides

[UIWidget](ui_ui_widget$UIWidget.md).[constructor](ui_ui_widget$UIWidget.md#constructor)
