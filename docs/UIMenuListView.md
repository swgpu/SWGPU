[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ui\_menu\_list\_view/ui\_menu\_list\_view](../modules/ui_menu_list_view_ui_menu_list_view.md) / UIMenuListView

# Class: UIMenuListView<T\>

[ui_menu_list_view/ui_menu_list_view](../modules/ui_menu_list_view_ui_menu_list_view.md).UIMenuListView

The `UIMenuListView` is a class that extends UIMenu and provides functionality for
automaticaly update display from a datasource event-based called a "collection".

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The item type. |

## Hierarchy

- [`UIMenu`](ui_menu_ui_menu$UIMenu.md)

  ↳ **`UIMenuListView`**

## Table of contents

### Methods

- [$getViewRectWidget](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#$getviewrectwidget)
- [addItem](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#additem)
- [addWidget](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#addwidget)
- [animate](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#animate)
- [appendStyles](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#appendstyles)
- [clear](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#clear)
- [delete](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#delete)
- [focus](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#focus)
- [focusWidget](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#focuswidget)
- [getFocusedItem](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getfocuseditem)
- [getFocusedWidgetId](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getfocusedwidgetid)
- [getFocusedWidgetIndex](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getfocusedwidgetindex)
- [getId](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getid)
- [getNode](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getnode)
- [getPosition](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getposition)
- [getScreenPosition](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getscreenposition)
- [getSelectedItem](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getselecteditem)
- [getSelectedWidgetId](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getselectedwidgetid)
- [getSelectedWidgetIds](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getselectedwidgetids)
- [getSelectedWidgetIndex](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getselectedwidgetindex)
- [getSelectedWidgetIndexes](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getselectedwidgetindexes)
- [getViews](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getviews)
- [getWidgets](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#getwidgets)
- [handleItemAdded](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#handleitemadded)
- [handleItemRemoved](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#handleitemremoved)
- [handleWidgetClicked](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#handlewidgetclicked)
- [handleWidgetHover](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#handlewidgethover)
- [isEnabled](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#isenabled)
- [isFocused](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#isfocused)
- [isSelected](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#isselected)
- [isVisible](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#isvisible)
- [onAction](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#onaction)
- [removeWidget](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#removewidget)
- [selectWidget](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#selectwidget)
- [setCollection](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#setcollection)
- [setEnablePredicate](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#setenablepredicate)
- [setEnabled](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#setenabled)
- [setEnabledWidget](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#setenabledwidget)
- [setEnabledWidgets](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#setenabledwidgets)
- [setFilterPredicate](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#setfilterpredicate)
- [setId](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#setid)
- [setPosition](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#setposition)
- [setSelected](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#setselected)
- [setSortPredicate](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#setsortpredicate)
- [setVisible](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#setvisible)
- [unfocus](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#unfocus)
- [unfocusWidget](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#unfocuswidget)
- [unselectWidget](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#unselectwidget)
- [unselectWidgets](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#unselectwidgets)
- [update](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#update)

### Properties

- [axis](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#axis)
- [className](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#classname)
- [collection](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#collection)
- [columns](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#columns)
- [enablePredicate](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#enablepredicate)
- [filterPredicate](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#filterpredicate)
- [focusedWidget](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#focusedwidget)
- [id](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#id)
- [multiple](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#multiple)
- [node](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#node)
- [rows](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#rows)
- [selectable](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#selectable)
- [selectedWidgets](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#selectedwidgets)
- [sortPredicate](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#sortpredicate)
- [template](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#template)
- [views](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#views)
- [widgets](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#widgets)

### Constructors

- [constructor](ui_menu_list_view_ui_menu_list_view$UIMenuListView.md#constructor)

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

### addItem

▸ **addItem**(`item`, `enabled?`, `index?`): `void`

The "addItem" function is a virtual method called when data is added to the collection.
It create the wanted widget item and add it to the menu.
Warning: please don't forget to overwrite this method otherwise list-view will stay empty ;)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `item` | `T` | `undefined` | The "item" parameter is of type T, which means it can be any type. It represents the item that you want to add to the data-source collection. |
| `enabled?` | `boolean` | `true` | The "enabled" parameter is a boolean value that determines whether the item should be enabled or disabled. By default, it is set to true, meaning the item is enabled. |
| `index` | `number` | `-1` | The index parameter is an optional parameter that specifies the position at which the item should be added in the list. If no index is provided, the item will be added at the end of the list. |

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

#### Overrides

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

### getFocusedItem

▸ **getFocusedItem**(): `T`

The "getFocusedItem" function returns the focused data item.

#### Returns

`T`

The views data associate with the focused widget item.

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

### getSelectedItem

▸ **getSelectedItem**(): `T`

The "getSelectedItem" function returns the selected data item.

#### Returns

`T`

The views data associate with the selected widget item.

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

### getViews

▸ **getViews**(): `T`[]

The "getViews" function returns the list of displayed item data (called as "views").

#### Returns

`T`[]

The list of displayed item data.

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

### handleItemAdded

▸ **handleItemAdded**(`data`): `void`

The "handleItemAdded" function.
Update the list-view when item is added to the collection.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`void`

___

### handleItemRemoved

▸ **handleItemRemoved**(`data`): `void`

The "handleItemRemoved" function.
Update the list-view when item is removed from the collection.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`void`

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

### setCollection

▸ **setCollection**(`collection`): `void`

The "setCollection" function sets a new data-source collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `collection` | [`ArrayCollection`](core_array_collection$ArrayCollection.md)<`T`\> | The data-source collection. |

#### Returns

`void`

___

### setEnablePredicate

▸ **setEnablePredicate**(`enablePredicate`): `void`

The "setEnablePredicate" function sets a new enable predicate to determine whether an item
should be enabled or disabled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enablePredicate` | (`a`: `T`) => `boolean` | A function that takes an argument of type T and returns a boolean value. This function is used to determine whether an item should be enabled or disabled. |

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

### setFilterPredicate

▸ **setFilterPredicate**(`filterPredicate`): `void`

The "setFilterPredicate" function sets a filter predicate to determine whether an item
should be display or hidden.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filterPredicate` | (`a`: `T`) => `boolean` | The filterPredicate is a function that takes an argument of type T (the generic type of the collection) and returns a boolean value. It is used to determine whether an item should be included in the filtered views or not. |

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

### setSortPredicate

▸ **setSortPredicate**(`sortPredicate`): `void`

The "setSortPredicate" function sets the sort predicate to determine the order of items.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sortPredicate` | (`a`: `T`, `b`: `T`) => `number` | A function that takes in two parameters of type T and returns a number. This function is used to determine the sorting order of the items in the list-view. |

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

### collection

• **collection**: [`ArrayCollection`](core_array_collection$ArrayCollection.md)<`T`\>

___

### columns

• **columns**: `number`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[columns](ui_menu_ui_menu$UIMenu.md#columns)

___

### enablePredicate

• **enablePredicate**: (`a`: `T`) => `boolean`

#### Type declaration

▸ (`a`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |

##### Returns

`boolean`

___

### filterPredicate

• **filterPredicate**: (`a`: `T`) => `boolean`

#### Type declaration

▸ (`a`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |

##### Returns

`boolean`

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

### sortPredicate

• **sortPredicate**: (`a`: `T`, `b`: `T`) => `number`

#### Type declaration

▸ (`a`, `b`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |
| `b` | `T` |

##### Returns

`number`

___

### template

• **template**: `string`

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[template](ui_menu_ui_menu$UIMenu.md#template)

___

### views

• **views**: `T`[]

___

### widgets

• **widgets**: [`UIWidget`](ui_ui_widget$UIWidget.md)[]

#### Inherited from

[UIMenu](ui_menu_ui_menu$UIMenu.md).[widgets](ui_menu_ui_menu$UIMenu.md#widgets)

## Constructors

### constructor

• **new UIMenuListView**<`T`\>(`options?`)

The constructor.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | An object containing various options for configuring the behavior of the menu. Nota bene: same options as for UIMenu. |

#### Overrides

[UIMenu](ui_menu_ui_menu$UIMenu.md).[constructor](ui_menu_ui_menu$UIMenu.md#constructor)
