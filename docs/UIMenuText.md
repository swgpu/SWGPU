[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ui\_menu\_text/ui\_menu\_text](../modules/ui_menu_text_ui_menu_text.md) / UIMenuText

# Class: UIMenuText

[ui_menu_text/ui_menu_text](../modules/ui_menu_text_ui_menu_text.md).UIMenuText

The `UIMenuText` class is a subclass of UIMenu that provides methods for adding, setting, and removing
text items from a UI menu.

## Hierarchy

- [`UIMenu`](ui_menu_ui_menu$UIMenu.md)

  ↳ **`UIMenuText`**

## Table of contents

### Methods

- [$getViewRectWidget](ui_menu_text_ui_menu_text$UIMenuText.md#$getviewrectwidget)
- [add](ui_menu_text_ui_menu_text$UIMenuText.md#add)
- [addWidget](ui_menu_text_ui_menu_text$UIMenuText.md#addwidget)
- [animate](ui_menu_text_ui_menu_text$UIMenuText.md#animate)
- [appendStyles](ui_menu_text_ui_menu_text$UIMenuText.md#appendstyles)
- [clear](ui_menu_text_ui_menu_text$UIMenuText.md#clear)
- [delete](ui_menu_text_ui_menu_text$UIMenuText.md#delete)
- [focus](ui_menu_text_ui_menu_text$UIMenuText.md#focus)
- [focusWidget](ui_menu_text_ui_menu_text$UIMenuText.md#focuswidget)
- [getFocusedWidgetId](ui_menu_text_ui_menu_text$UIMenuText.md#getfocusedwidgetid)
- [getFocusedWidgetIndex](ui_menu_text_ui_menu_text$UIMenuText.md#getfocusedwidgetindex)
- [getId](ui_menu_text_ui_menu_text$UIMenuText.md#getid)
- [getNode](ui_menu_text_ui_menu_text$UIMenuText.md#getnode)
- [getPosition](ui_menu_text_ui_menu_text$UIMenuText.md#getposition)
- [getScreenPosition](ui_menu_text_ui_menu_text$UIMenuText.md#getscreenposition)
- [getSelectedId](ui_menu_text_ui_menu_text$UIMenuText.md#getselectedid)
- [getSelectedWidgetId](ui_menu_text_ui_menu_text$UIMenuText.md#getselectedwidgetid)
- [getSelectedWidgetIds](ui_menu_text_ui_menu_text$UIMenuText.md#getselectedwidgetids)
- [getSelectedWidgetIndex](ui_menu_text_ui_menu_text$UIMenuText.md#getselectedwidgetindex)
- [getSelectedWidgetIndexes](ui_menu_text_ui_menu_text$UIMenuText.md#getselectedwidgetindexes)
- [getWidgets](ui_menu_text_ui_menu_text$UIMenuText.md#getwidgets)
- [handleWidgetClicked](ui_menu_text_ui_menu_text$UIMenuText.md#handlewidgetclicked)
- [handleWidgetHover](ui_menu_text_ui_menu_text$UIMenuText.md#handlewidgethover)
- [isEnabled](ui_menu_text_ui_menu_text$UIMenuText.md#isenabled)
- [isFocused](ui_menu_text_ui_menu_text$UIMenuText.md#isfocused)
- [isSelected](ui_menu_text_ui_menu_text$UIMenuText.md#isselected)
- [isVisible](ui_menu_text_ui_menu_text$UIMenuText.md#isvisible)
- [onAction](ui_menu_text_ui_menu_text$UIMenuText.md#onaction)
- [remove](ui_menu_text_ui_menu_text$UIMenuText.md#remove)
- [removeWidget](ui_menu_text_ui_menu_text$UIMenuText.md#removewidget)
- [selectWidget](ui_menu_text_ui_menu_text$UIMenuText.md#selectwidget)
- [set](ui_menu_text_ui_menu_text$UIMenuText.md#set)
- [setEnabled](ui_menu_text_ui_menu_text$UIMenuText.md#setenabled)
- [setEnabledWidget](ui_menu_text_ui_menu_text$UIMenuText.md#setenabledwidget)
- [setEnabledWidgets](ui_menu_text_ui_menu_text$UIMenuText.md#setenabledwidgets)
- [setId](ui_menu_text_ui_menu_text$UIMenuText.md#setid)
- [setPosition](ui_menu_text_ui_menu_text$UIMenuText.md#setposition)
- [setSelected](ui_menu_text_ui_menu_text$UIMenuText.md#setselected)
- [setVisible](ui_menu_text_ui_menu_text$UIMenuText.md#setvisible)
- [unfocus](ui_menu_text_ui_menu_text$UIMenuText.md#unfocus)
- [unfocusWidget](ui_menu_text_ui_menu_text$UIMenuText.md#unfocuswidget)
- [unselectWidget](ui_menu_text_ui_menu_text$UIMenuText.md#unselectwidget)
- [unselectWidgets](ui_menu_text_ui_menu_text$UIMenuText.md#unselectwidgets)
- [update](ui_menu_text_ui_menu_text$UIMenuText.md#update)

### Properties

- [axis](ui_menu_text_ui_menu_text$UIMenuText.md#axis)
- [className](ui_menu_text_ui_menu_text$UIMenuText.md#classname)
- [columns](ui_menu_text_ui_menu_text$UIMenuText.md#columns)
- [focusedWidget](ui_menu_text_ui_menu_text$UIMenuText.md#focusedwidget)
- [id](ui_menu_text_ui_menu_text$UIMenuText.md#id)
- [multiple](ui_menu_text_ui_menu_text$UIMenuText.md#multiple)
- [node](ui_menu_text_ui_menu_text$UIMenuText.md#node)
- [rows](ui_menu_text_ui_menu_text$UIMenuText.md#rows)
- [selectable](ui_menu_text_ui_menu_text$UIMenuText.md#selectable)
- [selectedWidgets](ui_menu_text_ui_menu_text$UIMenuText.md#selectedwidgets)
- [template](ui_menu_text_ui_menu_text$UIMenuText.md#template)
- [widgets](ui_menu_text_ui_menu_text$UIMenuText.md#widgets)

### Constructors

- [constructor](ui_menu_text_ui_menu_text$UIMenuText.md#constructor)

## Methods

### $getViewRectWidget

▸ **$getViewRectWidget**(`index`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `bottom` | `number` |
| `top` | `number` |

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[$getViewRectWidget](ui_menu_ui_menu$UIMenu.md#$getviewrectwidget)

___

### add

▸ **add**(`id`, `text`): `void`

The "add" function creates a new UIMenuTextItem with the given id and text, and adds it to the menu.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The "id" parameter is a string that represents the unique identifier for the menu item. It is used to distinguish between different menu items. |
| `text` | `string` | The "text" parameter is a string that represents the text content of the menu item. It is the text that will be displayed on the menu item when it is rendered. |

#### Returns

`void`

___

### addWidget

▸ **addWidget**(`widget`, `index?`): `void`

The "addWidget" function adds a UI widget item to the menu.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `widget` | [`UIWidget`](ui_ui_widget$UIWidget.md) | `undefined` | The `widget` item. |
| `index` | `number` | `-1` | The `index` parameter is an optional parameter of type `number` that specifies the position at which the widget should be inserted in the menu. If no index is provided (default value is -1), the widget will be added at the end of the menu. |

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[addWidget](ui_menu_ui_menu$UIMenu.md#addwidget)

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

[UIMenu](ui_menu_ui_menu$UIMenu.md).[animate](ui_menu_ui_menu$UIMenu.md#animate)

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

[UIMenu](ui_menu_ui_menu$UIMenu.md).[appendStyles](ui_menu_ui_menu$UIMenu.md#appendstyles)

___

### clear

▸ **clear**(): `void`

The "clear" function remove all widget items.

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[clear](ui_menu_ui_menu$UIMenu.md#clear)

___

### delete

▸ **delete**(): `void`

The "delete" function free all resources.
Warning: you need to call this method to free allocation for this object.

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[delete](ui_menu_ui_menu$UIMenu.md#delete)

___

### focus

▸ **focus**(`focusIndex?`): `void`

The "focus" function.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `focusIndex` | [`MenuFocus`](../enums/ui_menu_ui_menu$MenuFocus.md) | `MenuFocus.AUTO` |

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[focus](ui_menu_ui_menu$UIMenu.md#focus)

___

### focusWidget

▸ **focusWidget**(`index`, `preventScroll?`, `emit?`): `void`

The "focusWidget" function is used to focus on a specific widget item, scroll to it if necessary, and
emit an 'E_ITEM_FOCUSED' event.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `index` | `number` | `undefined` | The index position of the widget that you want to focus on. |
| `preventScroll?` | `boolean` | `false` | A boolean value indicating whether to prevent scrolling to the focused widget if it is not currently visible within the viewport. |
| `emit?` | `boolean` | `true` | The `emit` parameter is a boolean value that determines whether an event should be emitted after focusing the widget. |

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[focusWidget](ui_menu_ui_menu$UIMenu.md#focuswidget)

___

### getFocusedWidgetId

▸ **getFocusedWidgetId**(): ``null`` \| `string`

The "getFocusedWidgetId" function returns the ID of the focused widget, or null if there is no
focused widget.

#### Returns

``null`` \| `string`

the ID of the focused widget if it exists, otherwise it returns null.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[getFocusedWidgetId](ui_menu_ui_menu$UIMenu.md#getfocusedwidgetid)

___

### getFocusedWidgetIndex

▸ **getFocusedWidgetIndex**(): `number`

The "getFocusedWidgetIndex" function returns the index position of the focused widget item, or -1 if no widget is
focused.

#### Returns

`number`

The index position of the focused widget item in the menu.
If there is no focused widget, it returns -1.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[getFocusedWidgetIndex](ui_menu_ui_menu$UIMenu.md#getfocusedwidgetindex)

___

### getId

▸ **getId**(): `string`

The "getId" function returns the `ìd` property.

#### Returns

`string`

The `ìd`property.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[getId](ui_menu_ui_menu$UIMenu.md#getid)

___

### getNode

▸ **getNode**(): `HTMLDivElement`

The "getNode" function returns the root `node` HTMLElement of the widget.

#### Returns

`HTMLDivElement`

The `node` property.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[getNode](ui_menu_ui_menu$UIMenu.md#getnode)

___

### getPosition

▸ **getPosition**(): [`vec2`](../modules/core_global.md#vec2)

The "getPosition" function returns the relative x and y coordinates of the widget `node` HTMLElement.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The x and y coordinates of the node's position.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[getPosition](ui_menu_ui_menu$UIMenu.md#getposition)

___

### getScreenPosition

▸ **getScreenPosition**(): [`vec2`](../modules/core_global.md#vec2)

The "getScreenPosition" function returns the left and top coordinates of the widget `node` HTMLElement on
the screen.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The screen position.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[getScreenPosition](ui_menu_ui_menu$UIMenu.md#getscreenposition)

___

### getSelectedId

▸ **getSelectedId**(): ``null`` \| `string`

The "getSelectedId" function returns the selected widget ID as a string or null.

#### Returns

``null`` \| `string`

a string or null value.

___

### getSelectedWidgetId

▸ **getSelectedWidgetId**(): ``null`` \| `string`

The "getSelectedWidgetId" function returns the ID of the first selected widget, or null if no widget
is selected.

#### Returns

``null`` \| `string`

The widget id value if there is a selected widget, otherwise it returns null.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[getSelectedWidgetId](ui_menu_ui_menu$UIMenu.md#getselectedwidgetid)

___

### getSelectedWidgetIds

▸ **getSelectedWidgetIds**(): `string`[]

The "getSelectedWidgetIds" function returns an array of string IDs of selected widget items.

#### Returns

`string`[]

An array of string values representing the IDs of the selected widget items.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[getSelectedWidgetIds](ui_menu_ui_menu$UIMenu.md#getselectedwidgetids)

___

### getSelectedWidgetIndex

▸ **getSelectedWidgetIndex**(): `number`

The "getSelectedWidgetIndex" function returns the index position of the first selected widget item or -1 if no
widget is selected.

#### Returns

`number`

The index position of the selected widget item in the menu.
If there is no selected widget, it returns -1.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[getSelectedWidgetIndex](ui_menu_ui_menu$UIMenu.md#getselectedwidgetindex)

___

### getSelectedWidgetIndexes

▸ **getSelectedWidgetIndexes**(): `number`[]

The "getSelectedWidgetIndexes" function returns an array of index position of selected widget items.

#### Returns

`number`[]

An array of index position of the selected widget items.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[getSelectedWidgetIndexes](ui_menu_ui_menu$UIMenu.md#getselectedwidgetindexes)

___

### getWidgets

▸ **getWidgets**(): [`UIWidget`](ui_ui_widget$UIWidget.md)[]

The "getWidgets" function returns the widgets property.

#### Returns

[`UIWidget`](ui_ui_widget$UIWidget.md)[]

The `widgets` property.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[getWidgets](ui_menu_ui_menu$UIMenu.md#getwidgets)

___

### handleWidgetClicked

▸ **handleWidgetClicked**(`widget`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `widget` | [`UIWidget`](ui_ui_widget$UIWidget.md) |

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[handleWidgetClicked](ui_menu_ui_menu$UIMenu.md#handlewidgetclicked)

___

### handleWidgetHover

▸ **handleWidgetHover**(`widget`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `widget` | [`UIWidget`](ui_ui_widget$UIWidget.md) |

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[handleWidgetHover](ui_menu_ui_menu$UIMenu.md#handlewidgethover)

___

### isEnabled

▸ **isEnabled**(): `boolean`

The "isEnabled" function checks if widget is enabled or not.

#### Returns

`boolean`

A boolean value indicating if the widget is enabled or not.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[isEnabled](ui_menu_ui_menu$UIMenu.md#isenabled)

___

### isFocused

▸ **isFocused**(): `boolean`

The "isFocused" function checks if widget is focused.

#### Returns

`boolean`

A boolean value indicating if widget is focused or not.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[isFocused](ui_menu_ui_menu$UIMenu.md#isfocused)

___

### isSelected

▸ **isSelected**(): `boolean`

The "isSelected" function checks if widget is selected or not.

#### Returns

`boolean`

A boolean value indicating if the widget is selected or not.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[isSelected](ui_menu_ui_menu$UIMenu.md#isselected)

___

### isVisible

▸ **isVisible**(): `boolean`

The "isVisible" function checks if the widget is visible.

#### Returns

`boolean`

A boolean value indicating if widget is visible or not.

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[isVisible](ui_menu_ui_menu$UIMenu.md#isvisible)

___

### onAction

▸ **onAction**(`actionId`): `void`

The "onAction" function.

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionId` | `string` |

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[onAction](ui_menu_ui_menu$UIMenu.md#onaction)

___

### remove

▸ **remove**(`id`): `void`

The "remove" function removes a widget from the menu.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The `id` parameter is a string that represents the unique identifier of the widget that needs to be removed. |

#### Returns

`void`

___

### removeWidget

▸ **removeWidget**(`index`): `void`

The "removeWidget" function removes a UI widget item from the menu.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index parameter is the position of the widget in the menu to removed. |

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[removeWidget](ui_menu_ui_menu$UIMenu.md#removewidget)

___

### selectWidget

▸ **selectWidget**(`index`, `emit?`): `void`

The "selectWidget" function selects a specific widget item and emits an 'E_ITEM_SELECTED' event.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `index` | `number` | `undefined` | The index position of the widget that you want to select on. |
| `emit?` | `boolean` | `true` | The `emit` parameter is a boolean value that determines whether an event should be emitted after selecting the widget. |

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[selectWidget](ui_menu_ui_menu$UIMenu.md#selectwidget)

___

### set

▸ **set**(`id`, `text`): `void`

The "set" function sets the text of a UIMenuTextItem identified by its id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The `id` parameter is a string that represents the unique identifier of the widget. It is used to find the widget in the `widgets` array. |
| `text` | `string` | The `text` parameter is a string that represents the new text value that you want to set for the `UIMenuTextItem`. |

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

[UIMenu](ui_menu_ui_menu$UIMenu.md).[setEnabled](ui_menu_ui_menu$UIMenu.md#setenabled)

___

### setEnabledWidget

▸ **setEnabledWidget**(`index`, `enabled`): `void`

The "setEnabledWidget" function sets the enabled state of a specific widget item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index position of the widget that you want to enabled on. |
| `enabled` | `boolean` | The "enabled" parameter is a boolean value that determines whether the widget should be enabled or disabled. |

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[setEnabledWidget](ui_menu_ui_menu$UIMenu.md#setenabledwidget)

___

### setEnabledWidgets

▸ **setEnabledWidgets**(`enabled`): `void`

The "setEnabledWidgets" function sets the enabled state of all widget items.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | The "enabled" parameter is a boolean value that determines whether the widgets should be enabled or disabled. |

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[setEnabledWidgets](ui_menu_ui_menu$UIMenu.md#setenabledwidgets)

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

[UIMenu](ui_menu_ui_menu$UIMenu.md).[setId](ui_menu_ui_menu$UIMenu.md#setid)

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

[UIMenu](ui_menu_ui_menu$UIMenu.md).[setPosition](ui_menu_ui_menu$UIMenu.md#setposition)

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

[UIMenu](ui_menu_ui_menu$UIMenu.md).[setSelected](ui_menu_ui_menu$UIMenu.md#setselected)

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

[UIMenu](ui_menu_ui_menu$UIMenu.md).[setVisible](ui_menu_ui_menu$UIMenu.md#setvisible)

___

### unfocus

▸ **unfocus**(): `void`

The "unfocus" function removes the `u-focused` class from the `node` HTMLElement.
It emits an 'E_UNFOCUSED' event and unsubscribes the inputManager from input action event.

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[unfocus](ui_menu_ui_menu$UIMenu.md#unfocus)

___

### unfocusWidget

▸ **unfocusWidget**(`emit?`): `void`

The "unfocusWidget" function unfocuses widgets, and emits an 'E_ITEM_UNFOCUSED' event.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `emit?` | `boolean` | `true` | The `emit` parameter is a boolean value that determines whether an event should be emitted after focusing the widget. |

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[unfocusWidget](ui_menu_ui_menu$UIMenu.md#unfocuswidget)

___

### unselectWidget

▸ **unselectWidget**(`index`, `emit?`): `void`

The "unselectWidget" function unselects a specific widget item and emits an 'E_ITEM_UNSELECTED' event.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `index` | `number` | `undefined` | The index position of the widget that you want to unselect on. |
| `emit?` | `boolean` | `true` | The `emit` parameter is a boolean value that determines whether an event should be emitted after unselecting the widget. |

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[unselectWidget](ui_menu_ui_menu$UIMenu.md#unselectwidget)

___

### unselectWidgets

▸ **unselectWidgets**(`emit?`): `void`

The "unselectWidgets" function deselects all widgets and emits an 'E_UNSELECTED' event.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `emit?` | `boolean` | `true` | The `emit` parameter is a boolean value that determines whether an event should be emitted after unselecting all widgets. |

#### Returns

`void`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[unselectWidgets](ui_menu_ui_menu$UIMenu.md#unselectwidgets)

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

[UIMenu](ui_menu_ui_menu$UIMenu.md).[update](ui_menu_ui_menu$UIMenu.md#update)

## Properties

### axis

• **axis**: [`MenuAxis`](../enums/ui_menu_ui_menu$MenuAxis.md)

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[axis](ui_menu_ui_menu$UIMenu.md#axis)

___

### className

• **className**: `string`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[className](ui_menu_ui_menu$UIMenu.md#classname)

___

### columns

• **columns**: `number`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[columns](ui_menu_ui_menu$UIMenu.md#columns)

___

### focusedWidget

• **focusedWidget**: `undefined` \| [`UIWidget`](ui_ui_widget$UIWidget.md)

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[focusedWidget](ui_menu_ui_menu$UIMenu.md#focusedwidget)

___

### id

• **id**: `string`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[id](ui_menu_ui_menu$UIMenu.md#id)

___

### multiple

• **multiple**: `boolean`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[multiple](ui_menu_ui_menu$UIMenu.md#multiple)

___

### node

• **node**: `HTMLDivElement`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[node](ui_menu_ui_menu$UIMenu.md#node)

___

### rows

• **rows**: `number`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[rows](ui_menu_ui_menu$UIMenu.md#rows)

___

### selectable

• **selectable**: `boolean`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[selectable](ui_menu_ui_menu$UIMenu.md#selectable)

___

### selectedWidgets

• **selectedWidgets**: [`UIWidget`](ui_ui_widget$UIWidget.md)[]

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[selectedWidgets](ui_menu_ui_menu$UIMenu.md#selectedwidgets)

___

### template

• **template**: `string`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[template](ui_menu_ui_menu$UIMenu.md#template)

___

### widgets

• **widgets**: [`UIWidget`](ui_ui_widget$UIWidget.md)[]

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[widgets](ui_menu_ui_menu$UIMenu.md#widgets)

## Constructors

### constructor

• **new UIMenuText**(`options?`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | An object containing various options for configuring the behavior of the menu. |
| `options.axis?` | [`MenuAxis`](../enums/ui_menu_ui_menu$MenuAxis.md) | - |
| `options.className?` | `string` | - |

#### Overrides

[UIMenu](ui_menu_ui_menu$UIMenu.md).[constructor](ui_menu_ui_menu$UIMenu.md#constructor)
