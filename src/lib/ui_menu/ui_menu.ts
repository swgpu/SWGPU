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
 * A UI widget displaying a menu with customizable options.
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
   * @param options - Various options for configuring the behavior of the menu.
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
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    for (const widget of this.widgets) {
      widget.delete();
    }

    super.delete();
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    for (const widget of this.widgets) {
      widget.update(ts);
    }
  }

  /**
   * Focus on.
   * 
   * @param {number} focusIndex - If MenuFocus.AUTO then refocus the child widget too.
   */
  focus(focusIndex = MenuFocus.AUTO): void {
    if (this.widgets.length > 0 && focusIndex == MenuFocus.AUTO) {
      const focusedIndex = this.focusedWidget ? this.widgets.indexOf(this.focusedWidget) : 0;
      this.focusWidget(focusedIndex, true);
    }

    super.focus();
  }

  /**
   * Add a UI widget item.
   * 
   * @param {UIWidget} widget - The widget.
   * @param {number} index - The position at which the widget should be inserted in the menu. If no index is
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

    widgetNode.addEventListener('click', () => this.$handleWidgetClicked(widget));
    widgetNode.addEventListener('mousemove', () => this.$handleWidgetHover(widget));
  }

  /**
   * Remove a UI widget item.
   * 
   * @param {number} index - The position of the widget.
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
   * Focus on widget item.
   * It emit an 'E_ITEM_FOCUSED' event.
   * 
   * @param {number} index - The index position of the widget.
   * @param {boolean} [preventScroll=false] - Indicating whether to prevent scrolling to the focused widget.
   * @param {boolean} [emit=true] - Determines whether an event should be emitted after focusing the widget.
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
   * Focus off widget item (if exist).
   * It emits an 'E_ITEM_UNFOCUSED' event.
   * 
   * @param {boolean} [emit=true] - Determines whether an event should be emitted after unfocusing the widget.
   */
  unfocusWidget(emit: boolean = true): void {
    this.widgets.forEach(w => w.unfocus());
    this.focusedWidget = undefined;

    if (emit) {
      eventManager.emit(this, 'E_ITEM_UNFOCUSED');
    }
  }

  /**
   * Select a widget item.
   * It emits an 'E_ITEM_SELECTED' event.
   * 
   * @param {number} index - The index position of the widget.
   * @param {boolean} [emit=true] - Determines whether an event should be emitted after selecting the widget.
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
   * Unselects a widget item.
   * It emits an 'E_ITEM_UNSELECTED' event.
   * 
   * @param {number} index - The index position of the widget.
   * @param {boolean} [emit=true] - Determines whether an event should be emitted after unselecting the widget.
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
   * Unselect all widget items.
   * It emits an 'E_UNSELECTED' event.
   * 
   * @param {boolean} [emit=true] - Determines whether an event should be emitted after unselecting all widgets.
   */
  unselectWidgets(emit: boolean = true): void {
    this.widgets.forEach(w => w.setSelected(false));
    this.selectedWidgets = [];

    if (emit) {
      eventManager.emit(this, 'E_UNSELECTED');
    }
  }

  /**
   * Set enabled flag of a widget item.
   * 
   * @param {number} index - The index position of the widget.
   * @param {boolean} enabled - Determines whether the widget should be enabled or disabled.
   */
  setEnabledWidget(index: number, enabled: boolean): void {
    const widget = this.widgets[index];
    if (!widget) {
      throw new Error('UIMenu::setEnabledWidget(): widget not found !');
    }

    widget.setEnabled(enabled);
  }

  /**
   * Set the enabled flag of all widget items.
   * 
   * @param {boolean} enabled - Determines whether the widgets should be enabled or disabled.
   */
  setEnabledWidgets(enabled: boolean): void {
    this.widgets.forEach(w => w.setEnabled(enabled));
  }

  /**
   * Remove all widget items.
   */
  clear(): void {
    this.widgets.forEach(w => w.delete());
    this.widgets = [];
    this.focusedWidget = undefined;
    this.selectedWidgets = [];
    this.node.innerHTML = '';
  }

  /**
   * Returns the ID of the focused widget, or null if there is no focused widget.
   */
  getFocusedWidgetId(): string | null {
    return this.focusedWidget ? this.focusedWidget.getId() : null;
  }

  /**
   * Returns the index position of the focused widget item, or -1 if no widget is focused.
   */
  getFocusedWidgetIndex(): number {
    return this.focusedWidget ? this.widgets.indexOf(this.focusedWidget) : -1;
  }

  /**
   * Returns the ID of the first selected widget, or null if no widget is selected.
   */
  getSelectedWidgetId(): string | null {
    return this.selectedWidgets[0] ? this.selectedWidgets[0].getId() : null;
  }

  /**
   * Returns the index position of the first selected widget item or -1 if no widget is selected.
   */
  getSelectedWidgetIndex(): number {
    return this.selectedWidgets[0] ? this.widgets.indexOf(this.selectedWidgets[0]) : -1;
  }

  /**
   * Returns a list of IDs of selected widget items.
   */
  getSelectedWidgetIds(): Array<string> {
    return this.selectedWidgets.map(w => w.getId());
  }

  /**
   * Returns a list of index position of selected widget items.
   */
  getSelectedWidgetIndexes(): Array<number> {
    return this.selectedWidgets.map(w => this.widgets.indexOf(w));
  }

  /**
   * Returns all widgets.
   */
  getWidgets() {
    return this.widgets;
  }

  /**
   * Returns the widget at the specified index.
   * 
   * @param {number} index - The index position of the widget.
   */
  getWidget(index: number): UIWidget {
    return this.widgets[index];
  }

  /**
   * The onAction function.
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

  $handleWidgetClicked(widget: UIWidget) {
    if (!this.isFocused()) {
      return;
    }

    this.selectWidget(this.widgets.indexOf(widget), true);
  }

  $handleWidgetHover(widget: UIWidget) {
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