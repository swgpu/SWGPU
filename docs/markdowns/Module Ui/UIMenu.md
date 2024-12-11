# UIMenu

A UI widget displaying a menu with customizable options.
It emit 'E_ITEM_FOCUSED' with data { id, index }
It emit 'E_ITEM_UNFOCUSED'
It emit 'E_ITEM_SELECTED' with data { id, index }
It emit 'E_ITEM_UNSELECTED'
It emit 'E_UNSELECTED'
It emit 'E_CLOSED'
- inherit from: UIWidget
- parent of: UIMenuListView, UIMenuText
## Constructors
* **new UIMenu**(options): UIMenu   
  * **options**: Various options for configuring the behavior of the menu.
## Methods
* **addWidget**(widget: UIWidget, index: number): void   
  * **widget**: The widget.
  * **index**: The position at which the widget should be inserted in the menu. If no index is
provided (default value is -1), the widget will be added at the end of the menu.
* **clear**(): void   
* **delete**(): void   
* **focus**(focusIndex: MenuFocus): void   
  * **focusIndex**: If MenuFocus.AUTO then refocus the child widget too.
* **focusWidget**(index: number, preventScroll: boolean, emit: boolean): void   
  * **index**: The index position of the widget.
  * **preventScroll**: Indicating whether to prevent scrolling to the focused widget.
  * **emit**: Determines whether an event should be emitted after focusing the widget.
* **getFocusedWidgetId**()   
* **getFocusedWidgetIndex**(): number   
* **getSelectedWidgetId**()   
* **getSelectedWidgetIds**()   
* **getSelectedWidgetIndex**(): number   
* **getSelectedWidgetIndexes**()   
* **getWidget**(index: number): UIWidget   
  * **index**: The index position of the widget.
* **getWidgets**()   
* **onAction**(actionId: string): void   
  * **actionId**
* **removeWidget**(index: number): void   
  * **index**: The position of the widget.
* **selectWidget**(index: number, emit: boolean): void   
  * **index**: The index position of the widget.
  * **emit**: Determines whether an event should be emitted after selecting the widget.
* **setEnabledWidget**(index: number, enabled: boolean): void   
  * **index**: The index position of the widget.
  * **enabled**: Determines whether the widget should be enabled or disabled.
* **setEnabledWidgets**(enabled: boolean): void   
  * **enabled**: Determines whether the widgets should be enabled or disabled.
* **unfocusWidget**(emit: boolean): void   
  * **emit**: Determines whether an event should be emitted after unfocusing the widget.
* **unselectWidget**(index: number, emit: boolean): void   
  * **index**: The index position of the widget.
  * **emit**: Determines whether an event should be emitted after unselecting the widget.
* **unselectWidgets**(emit: boolean): void   
  * **emit**: Determines whether an event should be emitted after unselecting all widgets.
* **update**(ts: number): void   
  * **ts**: The timestep.
