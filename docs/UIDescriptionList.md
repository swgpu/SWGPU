[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ui\_description\_list/ui\_description\_list](../modules/ui_description_list_ui_description_list.md) / UIDescriptionList

# Class: UIDescriptionList

[ui_description_list/ui_description_list](../modules/ui_description_list_ui_description_list.md).UIDescriptionList

The `UIDescriptionList` class represents a UI widget for displaying a list of items with labels and values,
and provides methods for adding, removing, setting values, and manipulating the visibility of items.

## Hierarchy

- [`UIWidget`](ui_ui_widget$UIWidget.md)

  ↳ **`UIDescriptionList`**

## Table of contents

### Methods

- [addItem](ui_description_list_ui_description_list$UIDescriptionList.md#additem)
- [animate](ui_description_list_ui_description_list$UIDescriptionList.md#animate)
- [appendStyles](ui_description_list_ui_description_list$UIDescriptionList.md#appendstyles)
- [clear](ui_description_list_ui_description_list$UIDescriptionList.md#clear)
- [delete](ui_description_list_ui_description_list$UIDescriptionList.md#delete)
- [focus](ui_description_list_ui_description_list$UIDescriptionList.md#focus)
- [getId](ui_description_list_ui_description_list$UIDescriptionList.md#getid)
- [getItemValue](ui_description_list_ui_description_list$UIDescriptionList.md#getitemvalue)
- [getNode](ui_description_list_ui_description_list$UIDescriptionList.md#getnode)
- [getPosition](ui_description_list_ui_description_list$UIDescriptionList.md#getposition)
- [getScreenPosition](ui_description_list_ui_description_list$UIDescriptionList.md#getscreenposition)
- [isEnabled](ui_description_list_ui_description_list$UIDescriptionList.md#isenabled)
- [isFocused](ui_description_list_ui_description_list$UIDescriptionList.md#isfocused)
- [isItemVisible](ui_description_list_ui_description_list$UIDescriptionList.md#isitemvisible)
- [isSelected](ui_description_list_ui_description_list$UIDescriptionList.md#isselected)
- [isVisible](ui_description_list_ui_description_list$UIDescriptionList.md#isvisible)
- [onAction](ui_description_list_ui_description_list$UIDescriptionList.md#onaction)
- [removeItem](ui_description_list_ui_description_list$UIDescriptionList.md#removeitem)
- [setEnabled](ui_description_list_ui_description_list$UIDescriptionList.md#setenabled)
- [setId](ui_description_list_ui_description_list$UIDescriptionList.md#setid)
- [setItem](ui_description_list_ui_description_list$UIDescriptionList.md#setitem)
- [setItemVisible](ui_description_list_ui_description_list$UIDescriptionList.md#setitemvisible)
- [setPosition](ui_description_list_ui_description_list$UIDescriptionList.md#setposition)
- [setSelected](ui_description_list_ui_description_list$UIDescriptionList.md#setselected)
- [setVisible](ui_description_list_ui_description_list$UIDescriptionList.md#setvisible)
- [unfocus](ui_description_list_ui_description_list$UIDescriptionList.md#unfocus)
- [update](ui_description_list_ui_description_list$UIDescriptionList.md#update)

### Properties

- [className](ui_description_list_ui_description_list$UIDescriptionList.md#classname)
- [id](ui_description_list_ui_description_list$UIDescriptionList.md#id)
- [node](ui_description_list_ui_description_list$UIDescriptionList.md#node)
- [template](ui_description_list_ui_description_list$UIDescriptionList.md#template)

### Constructors

- [constructor](ui_description_list_ui_description_list$UIDescriptionList.md#constructor)

## Methods

### addItem

▸ **addItem**(`id`, `label`, `value`): `void`

The "addItem" function creates a new pair label/value line.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The unique identifier for the item being added. |
| `label` | `string` | The label or name of the item being added. |
| `value` | `string` | The value of the item being added. |

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

### clear

▸ **clear**(): `void`

The "clear" functio remove all items.

#### Returns

`void`

___

### delete

▸ **delete**(): `void`

The "delete" function free all resources.
Warning: you need to call this method to free allocation for this object.

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[delete](ui_ui_widget$UIWidget.md#delete)

___

### focus

▸ **focus**(): `void`

The "focus" function adds `u-focused` class to the `node` HTMLElement.
It emits a 'E_FOCUSED' event and subscribes to input action event.

#### Returns

`void`

#### Inherited from

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

### getItemValue

▸ **getItemValue**(`id`): `string`

The "getItemValue" function retrieves the value of an item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The `id` parameter is a string that represents the unique identifier of the item you want to retrieve the value from. |

#### Returns

`string`

The value.

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

### isItemVisible

▸ **isItemVisible**(`id`): `boolean`

The "isItemVisible" function checks if an item is visible or hidden.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The `id` parameter is a string that represents the unique identifier of the item you want to check the visibility of. |

#### Returns

`boolean`

A boolean value indicating is item is visible or not.

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

### removeItem

▸ **removeItem**(`id`): `void`

The "removeItem" function removes an item based on its identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The `id` parameter is a string that represents the unique identifier of the item to be removed. |

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

### setItem

▸ **setItem**(`id`, `value`): `void`

The "setItem" function sets the value of an item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The unique identifier of the item you want to set the value for. |
| `value` | `string` | The value you want to set. |

#### Returns

`void`

___

### setItemVisible

▸ **setItemVisible**(`id`, `visible`): `void`

The "setItemVisible" function toggles the visibility of an item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The id parameter is a string that represents the unique identifier of the item you want to manipulate. |
| `visible` | `boolean` | The `visible` parameter is a boolean value that determines whether the item should be visible or hidden. |

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

The "unfocus" function removes the `u-focused` class from the `node` HTMLElement.
It emits an 'E_UNFOCUSED' event and unsubscribes the inputManager from input action event.

#### Returns

`void`

#### Inherited from

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

#### Inherited from

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

## Constructors

### constructor

• **new UIDescriptionList**()

The constructor.

#### Overrides

[UIWidget](ui_ui_widget$UIWidget.md).[constructor](ui_ui_widget$UIWidget.md#constructor)
