[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ui\_bubble/ui\_bubble](../modules/ui_bubble_ui_bubble.md) / UIBubble

# Class: UIBubble

[ui_bubble/ui_bubble](../modules/ui_bubble_ui_bubble.md).UIBubble

The `UIBubble` class represents a floating dialog widget (looking as a bubble) with text and optional actions.

## Hierarchy

- [`UIWidget`](ui_ui_widget$UIWidget.md)

  ↳ **`UIBubble`**

## Table of contents

### Methods

- [animate](ui_bubble_ui_bubble$UIBubble.md#animate)
- [appendStyles](ui_bubble_ui_bubble$UIBubble.md#appendstyles)
- [delete](ui_bubble_ui_bubble$UIBubble.md#delete)
- [focus](ui_bubble_ui_bubble$UIBubble.md#focus)
- [getId](ui_bubble_ui_bubble$UIBubble.md#getid)
- [getNode](ui_bubble_ui_bubble$UIBubble.md#getnode)
- [getPosition](ui_bubble_ui_bubble$UIBubble.md#getposition)
- [getScreenPosition](ui_bubble_ui_bubble$UIBubble.md#getscreenposition)
- [handleMenuItemSelected](ui_bubble_ui_bubble$UIBubble.md#handlemenuitemselected)
- [isEnabled](ui_bubble_ui_bubble$UIBubble.md#isenabled)
- [isFocused](ui_bubble_ui_bubble$UIBubble.md#isfocused)
- [isSelected](ui_bubble_ui_bubble$UIBubble.md#isselected)
- [isVisible](ui_bubble_ui_bubble$UIBubble.md#isvisible)
- [onAction](ui_bubble_ui_bubble$UIBubble.md#onaction)
- [setActions](ui_bubble_ui_bubble$UIBubble.md#setactions)
- [setAuthor](ui_bubble_ui_bubble$UIBubble.md#setauthor)
- [setEnabled](ui_bubble_ui_bubble$UIBubble.md#setenabled)
- [setId](ui_bubble_ui_bubble$UIBubble.md#setid)
- [setPicture](ui_bubble_ui_bubble$UIBubble.md#setpicture)
- [setPosition](ui_bubble_ui_bubble$UIBubble.md#setposition)
- [setSelected](ui_bubble_ui_bubble$UIBubble.md#setselected)
- [setStepDuration](ui_bubble_ui_bubble$UIBubble.md#setstepduration)
- [setText](ui_bubble_ui_bubble$UIBubble.md#settext)
- [setVisible](ui_bubble_ui_bubble$UIBubble.md#setvisible)
- [setWidth](ui_bubble_ui_bubble$UIBubble.md#setwidth)
- [unfocus](ui_bubble_ui_bubble$UIBubble.md#unfocus)
- [update](ui_bubble_ui_bubble$UIBubble.md#update)

### Properties

- [actions](ui_bubble_ui_bubble$UIBubble.md#actions)
- [className](ui_bubble_ui_bubble$UIBubble.md#classname)
- [currentActionIndex](ui_bubble_ui_bubble$UIBubble.md#currentactionindex)
- [currentActionTextOffset](ui_bubble_ui_bubble$UIBubble.md#currentactiontextoffset)
- [currentTextOffset](ui_bubble_ui_bubble$UIBubble.md#currenttextoffset)
- [finished](ui_bubble_ui_bubble$UIBubble.md#finished)
- [id](ui_bubble_ui_bubble$UIBubble.md#id)
- [node](ui_bubble_ui_bubble$UIBubble.md#node)
- [stepDuration](ui_bubble_ui_bubble$UIBubble.md#stepduration)
- [template](ui_bubble_ui_bubble$UIBubble.md#template)
- [text](ui_bubble_ui_bubble$UIBubble.md#text)
- [timeElapsed](ui_bubble_ui_bubble$UIBubble.md#timeelapsed)
- [uiMenu](ui_bubble_ui_bubble$UIBubble.md#uimenu)

### Constructors

- [constructor](ui_bubble_ui_bubble$UIBubble.md#constructor)

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
It focus `menu` too if actions is set.

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
It emits an event 'E_MENU_ITEM_SELECTED' when a menu item is selected.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

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

The "onAction" function.
It emits an event with the name 'E_OK' if the actionId is 'OK'.

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionId` | `string` |

#### Returns

`void`

#### Overrides

[UIWidget](ui_ui_widget$UIWidget.md).[onAction](ui_ui_widget$UIWidget.md#onaction)

___

### setActions

▸ **setActions**(`actions`): `void`

The "setActions" function sets the actions menu.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actions` | `string`[] | The `actions` parameter is an array of strings that represents a list of actions. |

#### Returns

`void`

___

### setAuthor

▸ **setAuthor**(`author`): `void`

The "setAuthor" function sets the dialog author name's.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `author` | `string` | The `author` parameter is a string that represents the name of the author. |

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

### setPicture

▸ **setPicture**(`pictureFile`): `void`

The "setPicture" function sets the dialog author avatar's.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pictureFile` | `string` | The `pictureFile` parameter is a string that represents the file path or URL of the picture that you want to set. |

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

### setStepDuration

▸ **setStepDuration**(`stepDuration`): `void`

The "setStepDuration" function sets the text speed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stepDuration` | `number` | The `stepDuration` parameter is a number that represents the duration of a text update. Smaller is that value faster text will be displayed. |

#### Returns

`void`

___

### setText

▸ **setText**(`text`): `void`

The "setText" function sets the dialog text.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The dialog text. |

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

### setWidth

▸ **setWidth**(`width`): `void`

The "setWidth" function sets the width of the bubble.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | The width parameter is a number that represents the desired width in pixels. |

#### Returns

`void`

___

### unfocus

▸ **unfocus**(): `void`

The "unfocus" function.
It unfocus `menu` too if actions is set.

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

### actions

• **actions**: `string`[]

___

### className

• **className**: `string`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[className](ui_ui_widget$UIWidget.md#classname)

___

### currentActionIndex

• **currentActionIndex**: `number`

___

### currentActionTextOffset

• **currentActionTextOffset**: `number`

___

### currentTextOffset

• **currentTextOffset**: `number`

___

### finished

• **finished**: `boolean`

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

### stepDuration

• **stepDuration**: `number`

___

### template

• **template**: `string`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[template](ui_ui_widget$UIWidget.md#template)

___

### text

• **text**: `string`

___

### timeElapsed

• **timeElapsed**: `number`

___

### uiMenu

• **uiMenu**: [`UIMenuText`](ui_menu_text_ui_menu_text$UIMenuText.md)

## Constructors

### constructor

• **new UIBubble**()

The constructor.

#### Overrides

[UIWidget](ui_ui_widget$UIWidget.md).[constructor](ui_ui_widget$UIWidget.md#constructor)
