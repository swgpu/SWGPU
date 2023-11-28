import { eventManager } from '../core/event_manager';
import { UIWidget } from '../ui/ui_widget';

enum MenuFocus {
  AUTO = 0,
  NONE = 1
};

enum MenuAxis {
  X = 0,
  Y = 1,
  XY = 2
};

/**
 * The `UIMenu` class represents a menu UI widget with customizable options
 * such as axis, rows, columns, disabled item, multiple selection, and selectable items.
 * It support both mouse and keys navigation.
 * It emit 'E_ITEM_FOCUSED', 'E_ITEM_UNFOCUSED', 'E_ITEM_SELECTED', 'E_ITEM_UNSELECTED' and E_UNSELECTED events.
 */
class UIMenu extends UIWidget {
  axis: MenuAxis;
  rows: number;
  columns: number;
  multiple: boolean;
  selectable: boolean;
  togglable: boolean;
  widgets: Array<UIWidget>;
  focusedWidget: UIWidget | undefined;
  selectedWidgets: Array<UIWidget>;

  /**
   * The constructor.
   * @param options - An object containing various options for configuring the behavior of the menu.
   */
  constructor(options: { className?: string, axis?: MenuAxis, rows?: number, columns?: number, multiple?: boolean, selectable?: boolean, togglable?: boolean } = {}) {
    super({
      className: options.className ?? 'UIMenu'
    });

    this.axis = options.axis ?? MenuAxis.Y;
    this.rows = options.rows ?? 0;
    this.columns = options.columns ?? 0;
    this.multiple = options.multiple ?? false;
    this.selectable = options.selectable ?? true;
    this.togglable = options.togglable ?? true;
    this.widgets = [];
    this.selectedWidgets = [];

    if (this.axis == MenuAxis.X) {
      this.rows = 1;
      this.columns = Infinity;
      this.node.style.display = 'flex';
      this.node.style.flexDirection = 'row';
    }
    else if (this.axis == MenuAxis.Y) {
      this.rows = Infinity;
      this.columns = 1;
      this.node.style.display = 'flex';
      this.node.style.flexDirection = 'column';
    }
    else {
      this.node.style.display = 'grid';
      this.node.style.grid = 'repeat(' + this.rows + ', auto) / repeat(' + this.columns + ', auto)';
    }
  }

  /**
   * The "delete" function free all resources.
   * Warning: you need to call this method to free allocation for this object.
   */
  delete(): void {
    for (const widget of this.widgets) {
      widget.delete();
    }

    super.delete();
  }

  /**
   * The "update" function.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    for (const widget of this.widgets) {
      widget.update(ts);
    }
  }

  /**
   * The "focus" function.
   */
  focus(focusIndex = MenuFocus.AUTO): void {
    if (this.widgets.length > 0 && focusIndex == MenuFocus.AUTO) {
      const focusedIndex = this.focusedWidget ? this.widgets.indexOf(this.focusedWidget) : 0;
      this.focusWidget(focusedIndex, true);
    }

    super.focus();
  }

  /**
   * The "addWidget" function adds a UI widget item to the menu.
   * @param {UIWidget} widget - The `widget` item.
   * @param {number} index - The `index` parameter is an optional parameter of type `number` that
   * specifies the position at which the widget should be inserted in the menu. If no index is
   * provided (default value is -1), the widget will be added at the end of the menu.
   */
  addWidget(widget: UIWidget, index: number = -1): void {
    const widgetNode = widget.getNode();

    if (index == -1) {
      this.widgets.push(widget);
      this.node.appendChild(widgetNode);
    }
    else {
      this.widgets.splice(index + 1, 0, widget);
      this.node.insertBefore(widgetNode, this.node.children[index]);
    }

    widgetNode.addEventListener('click', () => this.handleWidgetClicked(widget));
    widgetNode.addEventListener('mousemove', () => this.handleWidgetHover(widget));
  }

  /**
   * The "removeWidget" function removes a UI widget item from the menu.
   * @param {number} index - The index parameter is the position of the widget in the menu to removed.
   */
  removeWidget(index: number): void {
    const widget = this.widgets[index];
    if (!widget) {
      throw new Error('UIMenu::removeWidget(): widget not found !');
    }

    if (this.selectedWidgets.indexOf(widget) != -1) {
      this.selectedWidgets.splice(this.selectedWidgets.indexOf(widget), 1);
    }

    if (this.focusedWidget == widget) {
      this.focusedWidget = undefined;
    }

    this.widgets.splice(this.widgets.indexOf(widget), 1);
    widget.delete();
  }

  /**
   * The "focusWidget" function is used to focus on a specific widget item, scroll to it if necessary, and
   * emit an 'E_ITEM_FOCUSED' event.
   * @param {number} index - The index position of the widget that you want to focus on.
   * @param {boolean} [preventScroll=false] - A boolean value indicating whether to prevent scrolling to
   * the focused widget if it is not currently visible within the viewport.
   * @param {boolean} [emit=true] - The `emit` parameter is a boolean value that determines whether an
   * event should be emitted after focusing the widget.
   */
  focusWidget(index: number, preventScroll: boolean = false, emit: boolean = true): void {
    const widget = this.widgets[index];
    if (!widget) {
      throw new Error('UIMenu::focusWidget(): widget not found !');
    }

    if (!preventScroll) {
      const rect = this.$getViewRectWidget(index);
      if (rect.top < 0) {
        this.node.scrollTop += rect.top;
      }
      if (rect.bottom > this.node.clientHeight) {
        this.node.scrollTop += rect.bottom - this.node.clientHeight;
      }
    }

    this.widgets.forEach(w => w.unfocus());
    widget.focus();
    this.focusedWidget = widget;

    if (emit) {
      eventManager.emit(this, 'E_ITEM_FOCUSED', { id: widget.getId(), index: index });
    }
  }

  /**
   * The "unfocusWidget" function unfocuses widgets, and emits an 'E_ITEM_UNFOCUSED' event.
   * @param {boolean} [emit=true] - The `emit` parameter is a boolean value that determines whether an
   * event should be emitted after focusing the widget.
   */
  unfocusWidget(emit: boolean = true): void {
    this.widgets.forEach(w => w.unfocus());
    this.focusedWidget = undefined;

    if (emit) {
      eventManager.emit(this, 'E_ITEM_UNFOCUSED');
    }
  }

  /**
   * The "selectWidget" function selects a specific widget item and emits an 'E_ITEM_SELECTED' event.
   * @param {number} index - The index position of the widget that you want to select on.
   * @param {boolean} [emit=true] - The `emit` parameter is a boolean value that determines whether an
   * event should be emitted after selecting the widget.
   */
  selectWidget(index: number, emit: boolean = true): void {
    const widget = this.widgets[index];
    if (!widget) {
      throw new Error('UIMenu::selectWidget(): widget not found !');
    }
    if (!widget.isEnabled()) {
      return;
    }

    if (this.multiple && this.togglable && widget.isSelected()) {
      widget.setSelected(false);
      this.selectedWidgets.splice(this.selectedWidgets.indexOf(widget), 1);
      return;
    }

    if (!this.multiple) {
      this.widgets.forEach(w => w.setSelected(false));
      this.selectedWidgets = [];
    }

    widget.setSelected(true);
    this.selectedWidgets.push(widget);

    if (emit) {
      eventManager.emit(this, 'E_ITEM_SELECTED', { id: widget.getId(), index: index });
    }
  }

  /**
   * The "unselectWidget" function unselects a specific widget item and emits an 'E_ITEM_UNSELECTED' event.
   * @param {number} index - The index position of the widget that you want to unselect on.
   * @param {boolean} [emit=true] - The `emit` parameter is a boolean value that determines whether an
   * event should be emitted after unselecting the widget.
   */
  unselectWidget(index: number, emit: boolean = true): void {
    const widget = this.widgets[index];
    if (!widget) {
      throw new Error('UIMenu::unselectWidget(): widget not found !');
    }
    if (!widget.isSelected()) {
      return;
    }

    widget.setSelected(false);
    this.selectedWidgets.splice(this.selectedWidgets.indexOf(widget), 1);

    if (emit) {
      eventManager.emit(this, 'E_ITEM_UNSELECTED', { id: widget.getId(), index: index });
    }
  }

  /**
   * The "unselectWidgets" function deselects all widgets and emits an 'E_UNSELECTED' event.
   * @param {boolean} [emit=true] - The `emit` parameter is a boolean value that determines whether an
   * event should be emitted after unselecting all widgets.
   */
  unselectWidgets(emit: boolean = true): void {
    this.widgets.forEach(w => w.setSelected(false));
    this.selectedWidgets = [];

    if (emit) {
      eventManager.emit(this, 'E_UNSELECTED');
    }
  }

  /**
   * The "setEnabledWidget" function sets the enabled state of a specific widget item.
   * @param {number} index - The index position of the widget that you want to enabled on.
   * @param {boolean} enabled - The "enabled" parameter is a boolean value that determines whether the
   * widget should be enabled or disabled.
   */
  setEnabledWidget(index: number, enabled: boolean): void {
    const widget = this.widgets[index];
    if (!widget) {
      throw new Error('UIMenu::setEnabledWidget(): widget not found !');
    }

    widget.setEnabled(enabled);
  }

  /**
   * The "setEnabledWidgets" function sets the enabled state of all widget items.
   * @param {boolean} enabled - The "enabled" parameter is a boolean value that determines whether the
   * widgets should be enabled or disabled.
   */
  setEnabledWidgets(enabled: boolean): void {
    this.widgets.forEach(w => w.setEnabled(enabled));
  }

  /**
   * The "clear" function remove all widget items.
   */
  clear(): void {
    this.widgets.forEach(w => w.delete());
    this.widgets = [];
    this.focusedWidget = undefined;
    this.selectedWidgets = [];
    this.node.innerHTML = '';
  }

  /**
   * The "getFocusedWidgetId" function returns the ID of the focused widget, or null if there is no
   * focused widget.
   * @returns the ID of the focused widget if it exists, otherwise it returns null.
   */
  getFocusedWidgetId(): string | null {
    return this.focusedWidget ? this.focusedWidget.getId() : null;
  }

  /**
   * The "getFocusedWidgetIndex" function returns the index position of the focused widget item, or -1 if no widget is
   * focused.
   * @returns The index position of the focused widget item in the menu.
   * If there is no focused widget, it returns -1.
   */
  getFocusedWidgetIndex(): number {
    return this.focusedWidget ? this.widgets.indexOf(this.focusedWidget) : -1;
  }

  /**
   * The "getSelectedWidgetId" function returns the ID of the first selected widget, or null if no widget
   * is selected.
   * @returns The widget id value if there is a selected widget, otherwise it returns null.
   */
  getSelectedWidgetId(): string | null {
    return this.selectedWidgets[0] ? this.selectedWidgets[0].getId() : null;
  }

  /**
   * The "getSelectedWidgetIndex" function returns the index position of the first selected widget item or -1 if no
   * widget is selected.
   * @returns The index position of the selected widget item in the menu.
   * If there is no selected widget, it returns -1.
   */
  getSelectedWidgetIndex(): number {
    return this.selectedWidgets[0] ? this.widgets.indexOf(this.selectedWidgets[0]) : -1;
  }

  /**
   * The "getSelectedWidgetIds" function returns an array of string IDs of selected widget items.
   * @returns An array of string values representing the IDs of the selected widget items.
   */
  getSelectedWidgetIds(): Array<string> {
    return this.selectedWidgets.map(w => w.getId());
  }

  /**
   * The "getSelectedWidgetIndexes" function returns an array of index position of selected widget items.
   * @returns An array of index position of the selected widget items.
   */
  getSelectedWidgetIndexes(): Array<number> {
    return this.selectedWidgets.map(w => this.widgets.indexOf(w));
  }

  /**
   * The "getWidgets" function returns the widgets property.
   * @returns The `widgets` property.
   */
  getWidgets() {
    return this.widgets;
  }

  /**
   * The "getWidget" function returns the UIWidget at the specified index.
   * @param {number} index - The index parameter is a number that represents the position of the widget
   * in an array or collection.
   * @returns The UIWidget at the specified index.
   */
  getWidget(index: number): UIWidget {
    return this.widgets[index];
  }

  /**
   * The "onAction" function.
   */
  onAction(actionId: string) {
    if (actionId == 'BACK') {
      eventManager.emit(this, 'E_CLOSED');
    }
    else if (actionId == 'OK') {
      const focusedIndex = this.getFocusedWidgetIndex();
      this.selectWidget(focusedIndex);
    }
    else if (actionId == 'LEFT') {
      const focusedIndex = this.getFocusedWidgetIndex();
      const prevIndex = (focusedIndex - 1 < 0) ? this.widgets.length - 1 : focusedIndex - 1;
      this.focusWidget(prevIndex);
    }
    else if (actionId == 'RIGHT') {
      const focusedIndex = this.getFocusedWidgetIndex();
      const nextIndex = (focusedIndex + 1 > this.widgets.length - 1) ? 0 : focusedIndex + 1;
      this.focusWidget(nextIndex);
    }
    else if (actionId == 'UP') {
      const focusedIndex = this.getFocusedWidgetIndex();
      const prevIndex = (focusedIndex - this.columns < 0) ? this.widgets.length - 1 : focusedIndex - this.columns;
      this.focusWidget(prevIndex);
    }
    else if (actionId == 'DOWN') {
      const focusedIndex = this.getFocusedWidgetIndex();
      const nextIndex = (focusedIndex + this.columns > this.widgets.length - 1) ? 0 : focusedIndex + this.columns;
      this.focusWidget(nextIndex);
    }
  }

  handleWidgetClicked(widget: UIWidget) {
    if (!this.isFocused()) {
      return;
    }

    this.selectWidget(this.widgets.indexOf(widget), true);
  }

  handleWidgetHover(widget: UIWidget) {
    if (!this.isFocused()) {
      return;
    }

    this.focusWidget(this.widgets.indexOf(widget), false, true);
  }

  $getViewRectWidget(index: number): { top: number, bottom: number } {
    const el = this.node.children[index] as HTMLElement;
    const top = el.offsetTop - this.node.scrollTop;
    const bottom = top + el.offsetHeight;
    return { top, bottom };
  }
}

export { UIMenu, MenuFocus, MenuAxis };