[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ui/ui\_widget](../modules/ui_ui_widget.md) / UIWidget

# Class: UIWidget

[ui/ui_widget](../modules/ui_ui_widget.md).UIWidget

The `UIWidget` class represents a UI element base class with various properties and
methods for managing its behavior and appearance.
It contains methods to set focus, visibility, enabled flag, selected flag, position, animation and
capture action events.

## Hierarchy

- **`UIWidget`**

  ↳ [`UIBubble`](ui_bubble_ui_bubble$UIBubble.md)

  ↳ [`UIDescriptionList`](ui_description_list_ui_description_list$UIDescriptionList.md)

  ↳ [`UIDialog`](ui_dialog_ui_dialog$UIDialog.md)

  ↳ [`UIInputKeyboard`](ui_input_keyboard_ui_input_keyboard$UIInputKeyboard.md)

  ↳ [`UIInputSlider`](ui_input_slider_ui_input_slider$UIInputSlider.md)

  ↳ [`UIMenu`](ui_menu_ui_menu$UIMenu.md)

  ↳ [`UIMenuTextItem`](ui_menu_text_ui_menu_text_item$UIMenuTextItem.md)

  ↳ [`UIMessage`](ui_message_ui_message$UIMessage.md)

  ↳ [`UIPrint`](ui_print_ui_print$UIPrint.md)

  ↳ [`UIPrompt`](ui_prompt_ui_prompt$UIPrompt.md)

  ↳ [`UISprite`](ui_sprite_ui_sprite$UISprite.md)

  ↳ [`UIText`](ui_text_ui_text$UIText.md)

## Table of contents

### Methods

- [animate](ui_ui_widget$UIWidget.md#animate)
- [appendStyles](ui_ui_widget$UIWidget.md#appendstyles)
- [delete](ui_ui_widget$UIWidget.md#delete)
- [focus](ui_ui_widget$UIWidget.md#focus)
- [getId](ui_ui_widget$UIWidget.md#getid)
- [getNode](ui_ui_widget$UIWidget.md#getnode)
- [getPosition](ui_ui_widget$UIWidget.md#getposition)
- [getScreenPosition](ui_ui_widget$UIWidget.md#getscreenposition)
- [isEnabled](ui_ui_widget$UIWidget.md#isenabled)
- [isFocused](ui_ui_widget$UIWidget.md#isfocused)
- [isSelected](ui_ui_widget$UIWidget.md#isselected)
- [isVisible](ui_ui_widget$UIWidget.md#isvisible)
- [onAction](ui_ui_widget$UIWidget.md#onaction)
- [setEnabled](ui_ui_widget$UIWidget.md#setenabled)
- [setId](ui_ui_widget$UIWidget.md#setid)
- [setPosition](ui_ui_widget$UIWidget.md#setposition)
- [setSelected](ui_ui_widget$UIWidget.md#setselected)
- [setVisible](ui_ui_widget$UIWidget.md#setvisible)
- [unfocus](ui_ui_widget$UIWidget.md#unfocus)
- [update](ui_ui_widget$UIWidget.md#update)

### Properties

- [className](ui_ui_widget$UIWidget.md#classname)
- [id](ui_ui_widget$UIWidget.md#id)
- [node](ui_ui_widget$UIWidget.md#node)
- [template](ui_ui_widget$UIWidget.md#template)

### Constructors

- [constructor](ui_ui_widget$UIWidget.md#constructor)

## Methods

### animate

▸ **animate**(`animation`): `void`

The "animate" function trigger animation to the widget `node` HTMLElement.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `animation` | `string` | The `animation` parameter is a string that represents the name of the animation to be applied to the `node` HTMLElement. |

#### Returns

`void`

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

___

### delete

▸ **delete**(): `void`

The "delete" function free all resources.
Warning: you need to call this method to free allocation for this object.

#### Returns

`void`

___

### focus

▸ **focus**(): `void`

The "focus" function adds `u-focused` class to the `node` HTMLElement.
It emits a 'E_FOCUSED' event and subscribes to input action event.

#### Returns

`void`

___

### getId

▸ **getId**(): `string`

The "getId" function returns the `ìd` property.

#### Returns

`string`

The `ìd`property.

___

### getNode

▸ **getNode**(): `HTMLDivElement`

The "getNode" function returns the root `node` HTMLElement of the widget.

#### Returns

`HTMLDivElement`

The `node` property.

___

### getPosition

▸ **getPosition**(): [`vec2`](../modules/core_global.md#vec2)

The "getPosition" function returns the relative x and y coordinates of the widget `node` HTMLElement.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The x and y coordinates of the node's position.

___

### getScreenPosition

▸ **getScreenPosition**(): [`vec2`](../modules/core_global.md#vec2)

The "getScreenPosition" function returns the left and top coordinates of the widget `node` HTMLElement on
the screen.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The screen position.

___

### isEnabled

▸ **isEnabled**(): `boolean`

The "isEnabled" function checks if widget is enabled or not.

#### Returns

`boolean`

A boolean value indicating if the widget is enabled or not.

___

### isFocused

▸ **isFocused**(): `boolean`

The "isFocused" function checks if widget is focused.

#### Returns

`boolean`

A boolean value indicating if widget is focused or not.

___

### isSelected

▸ **isSelected**(): `boolean`

The "isSelected" function checks if widget is selected or not.

#### Returns

`boolean`

A boolean value indicating if the widget is selected or not.

___

### isVisible

▸ **isVisible**(): `boolean`

The "isVisible" function checks if the widget is visible.

#### Returns

`boolean`

A boolean value indicating if widget is visible or not.

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

___

### unfocus

▸ **unfocus**(): `void`

The "unfocus" function removes the `u-focused` class from the `node` HTMLElement.
It emits an 'E_UNFOCUSED' event and unsubscribes the inputManager from input action event.

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

### className

• **className**: `string`

___

### id

• **id**: `string`

___

### node

• **node**: `HTMLDivElement`

___

### template

• **template**: `string`

## Constructors

### constructor

• **new UIWidget**(`options?`)

The constructor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.className?` | `string` |
| `options.id?` | `string` |
| `options.template?` | `string` |
