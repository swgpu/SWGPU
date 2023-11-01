[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ui\_menu/ui\_menu](../modules/ui_menu_ui_menu.md) / UIMenu

# Class: UIMenu

[ui_menu/ui_menu](../modules/ui_menu_ui_menu.md).UIMenu

The `UIMenu` class represents a menu UI widget with customizable options
such as axis, rows, columns, disabled item, multiple selection, and selectable items.
It support both mouse and keys navigation.
It emit 'E_ITEM_FOCUSED', 'E_ITEM_UNFOCUSED', 'E_ITEM_SELECTED', 'E_ITEM_UNSELECTED' and E_UNSELECTED events.

## Hierarchy

- [`UIWidget`](ui_ui_widget$UIWidget.md)

  ↳ **`UIMenu`**

  ↳↳ [`UIMenuListView`](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md)

  ↳↳ [`UIMenuText`](ui_menu_text_ui_menu_text$UIMenuText.md)

## Table of contents

### Methods

- [$getViewRectWidget](ui_menu_ui_menu$UIMenu.md#$getviewrectwidget)
- [addWidget](ui_menu_ui_menu$UIMenu.md#addwidget)
- [animate](ui_menu_ui_menu$UIMenu.md#animate)
- [appendStyles](ui_menu_ui_menu$UIMenu.md#appendstyles)
- [clear](ui_menu_ui_menu$UIMenu.md#clear)
- [delete](ui_menu_ui_menu$UIMenu.md#delete)
- [focus](ui_menu_ui_menu$UIMenu.md#focus)
- [focusWidget](ui_menu_ui_menu$UIMenu.md#focuswidget)
- [getFocusedWidgetId](ui_menu_ui_menu$UIMenu.md#getfocusedwidgetid)
- [getFocusedWidgetIndex](ui_menu_ui_menu$UIMenu.md#getfocusedwidgetindex)
- [getId](ui_menu_ui_menu$UIMenu.md#getid)
- [getNode](ui_menu_ui_menu$UIMenu.md#getnode)
- [getPosition](ui_menu_ui_menu$UIMenu.md#getposition)
- [getScreenPosition](ui_menu_ui_menu$UIMenu.md#getscreenposition)
- [getSelectedWidgetId](ui_menu_ui_menu$UIMenu.md#getselectedwidgetid)
- [getSelectedWidgetIds](ui_menu_ui_menu$UIMenu.md#getselectedwidgetids)
- [getSelectedWidgetIndex](ui_menu_ui_menu$UIMenu.md#getselectedwidgetindex)
- [getSelectedWidgetIndexes](ui_menu_ui_menu$UIMenu.md#getselectedwidgetindexes)
- [getWidgets](ui_menu_ui_menu$UIMenu.md#getwidgets)
- [handleWidgetClicked](ui_menu_ui_menu$UIMenu.md#handlewidgetclicked)
- [handleWidgetHover](ui_menu_ui_menu$UIMenu.md#handlewidgethover)
- [isEnabled](ui_menu_ui_menu$UIMenu.md#isenabled)
- [isFocused](ui_menu_ui_menu$UIMenu.md#isfocused)
- [isSelected](ui_menu_ui_menu$UIMenu.md#isselected)
- [isVisible](ui_menu_ui_menu$UIMenu.md#isvisible)
- [onAction](ui_menu_ui_menu$UIMenu.md#onaction)
- [removeWidget](ui_menu_ui_menu$UIMenu.md#removewidget)
- [selectWidget](ui_menu_ui_menu$UIMenu.md#selectwidget)
- [setEnabled](ui_menu_ui_menu$UIMenu.md#setenabled)
- [setEnabledWidget](ui_menu_ui_menu$UIMenu.md#setenabledwidget)
- [setEnabledWidgets](ui_menu_ui_menu$UIMenu.md#setenabledwidgets)
- [setId](ui_menu_ui_menu$UIMenu.md#setid)
- [setPosition](ui_menu_ui_menu$UIMenu.md#setposition)
- [setSelected](ui_menu_ui_menu$UIMenu.md#setselected)
- [setVisible](ui_menu_ui_menu$UIMenu.md#setvisible)
- [unfocus](ui_menu_ui_menu$UIMenu.md#unfocus)
- [unfocusWidget](ui_menu_ui_menu$UIMenu.md#unfocuswidget)
- [unselectWidget](ui_menu_ui_menu$UIMenu.md#unselectwidget)
- [unselectWidgets](ui_menu_ui_menu$UIMenu.md#unselectwidgets)
- [update](ui_menu_ui_menu$UIMenu.md#update)

### Properties

- [axis](ui_menu_ui_menu$UIMenu.md#axis)
- [className](ui_menu_ui_menu$UIMenu.md#classname)
- [columns](ui_menu_ui_menu$UIMenu.md#columns)
- [focusedWidget](ui_menu_ui_menu$UIMenu.md#focusedwidget)
- [id](ui_menu_ui_menu$UIMenu.md#id)
- [multiple](ui_menu_ui_menu$UIMenu.md#multiple)
- [node](ui_menu_ui_menu$UIMenu.md#node)
- [rows](ui_menu_ui_menu$UIMenu.md#rows)
- [selectable](ui_menu_ui_menu$UIMenu.md#selectable)
- [selectedWidgets](ui_menu_ui_menu$UIMenu.md#selectedwidgets)
- [template](ui_menu_ui_menu$UIMenu.md#template)
- [widgets](ui_menu_ui_menu$UIMenu.md#widgets)

### Constructors

- [constructor](ui_menu_ui_menu$UIMenu.md#constructor)

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

The "clear" function remove all widget items.

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

▸ **focus**(`focusIndex?`): `void`

The "focus" function.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `focusIndex` | [`MenuFocus`](../enums/ui_menu_ui_menu$MenuFocus.md) | `MenuFocus.AUTO` |

#### Returns

`void`

#### Overrides

[UIWidget](ui_ui_widget$UIWidget.md).[focus](ui_ui_widget$UIWidget.md#focus)

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

___

### getFocusedWidgetId

▸ **getFocusedWidgetId**(): ``null`` \| `string`

The "getFocusedWidgetId" function returns the ID of the focused widget, or null if there is no
focused widget.

#### Returns

``null`` \| `string`

the ID of the focused widget if it exists, otherwise it returns null.

___

### getFocusedWidgetIndex

▸ **getFocusedWidgetIndex**(): `number`

The "getFocusedWidgetIndex" function returns the index position of the focused widget item, or -1 if no widget is
focused.

#### Returns

`number`

The index position of the focused widget item in the menu.
If there is no focused widget, it returns -1.

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

### getSelectedWidgetId

▸ **getSelectedWidgetId**(): ``null`` \| `string`

The "getSelectedWidgetId" function returns the ID of the first selected widget, or null if no widget
is selected.

#### Returns

``null`` \| `string`

The widget id value if there is a selected widget, otherwise it returns null.

___

### getSelectedWidgetIds

▸ **getSelectedWidgetIds**(): `string`[]

The "getSelectedWidgetIds" function returns an array of string IDs of selected widget items.

#### Returns

`string`[]

An array of string values representing the IDs of the selected widget items.

___

### getSelectedWidgetIndex

▸ **getSelectedWidgetIndex**(): `number`

The "getSelectedWidgetIndex" function returns the index position of the first selected widget item or -1 if no
widget is selected.

#### Returns

`number`

The index position of the selected widget item in the menu.
If there is no selected widget, it returns -1.

___

### getSelectedWidgetIndexes

▸ **getSelectedWidgetIndexes**(): `number`[]

The "getSelectedWidgetIndexes" function returns an array of index position of selected widget items.

#### Returns

`number`[]

An array of index position of the selected widget items.

___

### getWidgets

▸ **getWidgets**(): [`UIWidget`](ui_ui_widget$UIWidget.md)[]

The "getWidgets" function returns the widgets property.

#### Returns

[`UIWidget`](ui_ui_widget$UIWidget.md)[]

The `widgets` property.

___

### handleWidgetClicked

▸ **handleWidgetClicked**(`widget`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `widget` | [`UIWidget`](ui_ui_widget$UIWidget.md) |

#### Returns

`void`

___

### handleWidgetHover

▸ **handleWidgetHover**(`widget`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `widget` | [`UIWidget`](ui_ui_widget$UIWidget.md) |

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionId` | `string` |

#### Returns

`void`

#### Overrides

[UIWidget](ui_ui_widget$UIWidget.md).[onAction](ui_ui_widget$UIWidget.md#onaction)

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

### unfocusWidget

▸ **unfocusWidget**(`emit?`): `void`

The "unfocusWidget" function unfocuses widgets, and emits an 'E_ITEM_UNFOCUSED' event.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `emit?` | `boolean` | `true` | The `emit` parameter is a boolean value that determines whether an event should be emitted after focusing the widget. |

#### Returns

`void`

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

### axis

• **axis**: [`MenuAxis`](../enums/ui_menu_ui_menu$MenuAxis.md)

___

### className

• **className**: `string`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[className](ui_ui_widget$UIWidget.md#classname)

___

### columns

• **columns**: `number`

___

### focusedWidget

• **focusedWidget**: `undefined` \| [`UIWidget`](ui_ui_widget$UIWidget.md)

___

### id

• **id**: `string`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[id](ui_ui_widget$UIWidget.md#id)

___

### multiple

• **multiple**: `boolean`

___

### node

• **node**: `HTMLDivElement`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[node](ui_ui_widget$UIWidget.md#node)

___

### rows

• **rows**: `number`

___

### selectable

• **selectable**: `boolean`

___

### selectedWidgets

• **selectedWidgets**: [`UIWidget`](ui_ui_widget$UIWidget.md)[]

___

### template

• **template**: `string`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[template](ui_ui_widget$UIWidget.md#template)

___

### widgets

• **widgets**: [`UIWidget`](ui_ui_widget$UIWidget.md)[]

## Constructors

### constructor

• **new UIMenu**(`options?`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | An object containing various options for configuring the behavior of the menu. |
| `options.axis?` | [`MenuAxis`](../enums/ui_menu_ui_menu$MenuAxis.md) | - |
| `options.className?` | `string` | - |
| `options.columns?` | `number` | - |
| `options.multiple?` | `boolean` | - |
| `options.rows?` | `number` | - |
| `options.selectable?` | `boolean` | - |

#### Overrides

[UIWidget](ui_ui_widget$UIWidget.md).[constructor](ui_ui_widget$UIWidget.md#constructor)
