[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ui/ui\_manager](../modules/ui_ui_manager.md) / UIManager

# Class: UIManager

[ui/ui_manager](../modules/ui_ui_manager.md).UIManager

The `UIManager` is a singleton class manages the user interface by adding, removing, updating, focus and unfocus UI widgets.
It controlling screen fade-in/fade-out and overlayer too.

## Table of contents

### Methods

- [addNode](ui_ui_manager$UIManager.md#addnode)
- [addWidget](ui_ui_manager$UIManager.md#addwidget)
- [clear](ui_ui_manager$UIManager.md#clear)
- [enableOverlayer](ui_ui_manager$UIManager.md#enableoverlayer)
- [fadeIn](ui_ui_manager$UIManager.md#fadein)
- [fadeOut](ui_ui_manager$UIManager.md#fadeout)
- [focus](ui_ui_manager$UIManager.md#focus)
- [getWidgets](ui_ui_manager$UIManager.md#getwidgets)
- [removeNode](ui_ui_manager$UIManager.md#removenode)
- [removeWidget](ui_ui_manager$UIManager.md#removewidget)
- [unfocus](ui_ui_manager$UIManager.md#unfocus)
- [update](ui_ui_manager$UIManager.md#update)

### Properties

- [fadeLayer](ui_ui_manager$UIManager.md#fadelayer)
- [focusedWidget](ui_ui_manager$UIManager.md#focusedwidget)
- [overLayer](ui_ui_manager$UIManager.md#overlayer)
- [root](ui_ui_manager$UIManager.md#root)
- [widgets](ui_ui_manager$UIManager.md#widgets)

### Constructors

- [constructor](ui_ui_manager$UIManager.md#constructor)

## Methods

### addNode

▸ **addNode**(`node`, `styles?`): `void`

The "addNode" function appends an HTML element to the root element and applies optional CSS styles to
it.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `node` | `HTMLElement` | `undefined` | The `node` parameter is an HTMLElement object that represents the element you want to add to the DOM (Document Object Model). It can be any valid HTML element such as `<div>`, `<p>`, `<span>`, etc. |
| `styles?` | `string` | `''` | The `styles` parameter is a string that represents CSS styles that you want to apply to the `node`. It is optional and has a default value of an empty string. |

#### Returns

`void`

___

### addWidget

▸ **addWidget**(`widget`, `styles?`): [`UIWidget`](ui_ui_widget$UIWidget.md)

The "addWidget" function add a UIWidget to the UIManager. It appends the node widget to the root element,
applies optional styles and returns the widget.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `widget` | [`UIWidget`](ui_ui_widget$UIWidget.md) | `undefined` | The `widget` parameter is an instance of the `UIWidget` class. It represents the widget that you want to add to the UI. |
| `styles?` | `string` | `''` | The `styles` parameter is a string that represents the CSS styles to be applied to the widget. It is optional and has a default value of an empty string. |

#### Returns

[`UIWidget`](ui_ui_widget$UIWidget.md)

The added widget.

___

### clear

▸ **clear**(): `void`

The "clear" function remove nodes element and deletes all
widgets.

#### Returns

`void`

___

### enableOverlayer

▸ **enableOverlayer**(`enable`): `void`

The "enableOverlayer" function display the over-layer if enable is true, and 0 if enable is false.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enable` | `boolean` | A boolean value indicating whether to enable or disable the overlayer. |

#### Returns

`void`

___

### fadeIn

▸ **fadeIn**(`delay`, `ms`, `transitionTimingFunction?`, `cb?`): `void`

The "fadeIn" function gradually increases the opacity of the fade-layer over a specified duration and
delay, using a specified transition timing function, and executes a callback function after the
animation is complete.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `delay` | `number` | `undefined` | The delay parameter is the amount of time in milliseconds to wait before starting the fade-in animation. |
| `ms` | `number` | `undefined` | The `ms` parameter represents the duration of the fade-in animation in milliseconds. |
| `transitionTimingFunction?` | `string` | `'linear'` | The `transitionTimingFunction` parameter is a string that specifies the timing function to be used for the transition. It determines how the intermediate property values are calculated during the transition. Some common values for this parameter are: |
| `cb` | `Function` | `undefined` | The `cb` parameter is a callback function that will be executed after the fade animation is complete. It is optional and defaults to an empty arrow function `() => { }`. You can pass a custom callback function to perform any additional actions after the fade animation finishes. |

#### Returns

`void`

___

### fadeOut

▸ **fadeOut**(`delay`, `ms`, `transitionTimingFunction?`, `cb?`): `void`

The "fadeOut" function fades out the fade-layer over a specified duration with a specified delay and
transition timing function.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `delay` | `number` | `undefined` | The delay parameter is the amount of time in milliseconds to wait before starting the fade out animation. |
| `ms` | `number` | `undefined` | The `ms` parameter represents the duration of the fade-out animation in milliseconds. |
| `transitionTimingFunction?` | `string` | `'linear'` | The `transitionTimingFunction` parameter is a string that specifies the timing function to be used for the fade-out animation. It determines how the intermediate property values are calculated during the transition. Some common values for this parameter are: |
| `cb` | `Function` | `undefined` | The `cb` parameter is a callback function that will be executed after the fade out animation is complete. It is an optional parameter and if not provided, a default empty function will be used. |

#### Returns

`void`

___

### focus

▸ **focus**(`widget`): `void`

The "focus" function takes a UIWidget as a parameter, focuses the new widget, unfocuses the
currently focused widget (if any) and emits an event indicating that a widget has been focused.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `widget` | [`UIWidget`](ui_ui_widget$UIWidget.md) | The widget to focus. |

#### Returns

`void`

___

### getWidgets

▸ **getWidgets**(): [`UIWidget`](ui_ui_widget$UIWidget.md)[]

The "getWidgets" function returns all active widgets.

#### Returns

[`UIWidget`](ui_ui_widget$UIWidget.md)[]

All active widgets.

___

### removeNode

▸ **removeNode**(`node`): `void`

The "removeNode" function removes a specified HTML element from the root element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `HTMLElement` | The `node` parameter is an `HTMLElement` object that represents the node to be removed from the DOM (Document Object Model). |

#### Returns

`void`

___

### removeWidget

▸ **removeWidget**(`widget`): `boolean`

The "removeWidget" function removes a UIWidget from the UIManager.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `widget` | [`UIWidget`](ui_ui_widget$UIWidget.md) | The widget to be removed from the UI. |

#### Returns

`boolean`

- A boolean value that indicating if it is removed or not.

___

### unfocus

▸ **unfocus**(): `void`

The "unfocus" function is used to remove focus from a widget and emit an event.

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

### fadeLayer

• **fadeLayer**: `HTMLDivElement`

___

### focusedWidget

• **focusedWidget**: ``null`` \| [`UIWidget`](ui_ui_widget$UIWidget.md)

___

### overLayer

• **overLayer**: `HTMLDivElement`

___

### root

• **root**: `HTMLDivElement`

___

### widgets

• **widgets**: [`UIWidget`](ui_ui_widget$UIWidget.md)[]

## Constructors

### constructor

• **new UIManager**()

The constructor.
