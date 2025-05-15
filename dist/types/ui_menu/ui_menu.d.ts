import { UIWidget } from '../ui/ui_widget';
declare enum MenuFocus {
    AUTO = 0,
    NONE = 1
}
declare enum MenuAxis {
    X = 0,
    Y = 1,
    XY = 2
}
/**
 * A UI widget displaying a menu with customizable options.
 * It emit 'E_ITEM_FOCUSED' with data { id, index }
 * It emit 'E_ITEM_UNFOCUSED'
 * It emit 'E_ITEM_SELECTED' with data { id, index }
 * It emit 'E_ITEM_UNSELECTED'
 * It emit 'E_UNSELECTED'
 * It emit 'E_CLOSED'
 */
declare class UIMenu extends UIWidget {
    #private;
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
    constructor(options?: {
        className?: string;
        axis?: MenuAxis;
        rows?: number;
        columns?: number;
        multiple?: boolean;
        selectable?: boolean;
        togglable?: boolean;
    });
    /**
     * Free all resources.
     * Warning: You need to call this method to free allocation for this object.
     */
    delete(): void;
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * Focus on.
     *
     * @param {number} focusIndex - If MenuFocus.AUTO then refocus the child widget too.
     */
    focus(focusIndex?: MenuFocus): void;
    /**
     * Add a UI widget item.
     *
     * @param {UIWidget} widget - The widget.
     * @param {number} index - The position at which the widget should be inserted in the menu. If no index is
     * provided (default value is -1), the widget will be added at the end of the menu.
     */
    addWidget(widget: UIWidget, index?: number): void;
    /**
     * Remove a UI widget item.
     *
     * @param {number} index - The position of the widget.
     */
    removeWidget(index: number): void;
    /**
     * Focus on widget item.
     * It emit an 'E_ITEM_FOCUSED' event.
     *
     * @param {number} index - The index position of the widget.
     * @param {boolean} [preventScroll=false] - Indicating whether to prevent scrolling to the focused widget.
     * @param {boolean} [emit=true] - Determines whether an event should be emitted after focusing the widget.
     */
    focusWidget(index: number, preventScroll?: boolean, emit?: boolean): void;
    /**
     * Focus off widget item (if exist).
     * It emits an 'E_ITEM_UNFOCUSED' event.
     *
     * @param {boolean} [emit=true] - Determines whether an event should be emitted after unfocusing the widget.
     */
    unfocusWidget(emit?: boolean): void;
    /**
     * Select a widget item.
     * It emits an 'E_ITEM_SELECTED' event.
     *
     * @param {number} index - The index position of the widget.
     * @param {boolean} [emit=true] - Determines whether an event should be emitted after selecting the widget.
     */
    selectWidget(index: number, emit?: boolean): void;
    /**
     * Unselects a widget item.
     * It emits an 'E_ITEM_UNSELECTED' event.
     *
     * @param {number} index - The index position of the widget.
     * @param {boolean} [emit=true] - Determines whether an event should be emitted after unselecting the widget.
     */
    unselectWidget(index: number, emit?: boolean): void;
    /**
     * Unselect all widget items.
     * It emits an 'E_UNSELECTED' event.
     *
     * @param {boolean} [emit=true] - Determines whether an event should be emitted after unselecting all widgets.
     */
    unselectWidgets(emit?: boolean): void;
    /**
     * Set enabled flag of a widget item.
     *
     * @param {number} index - The index position of the widget.
     * @param {boolean} enabled - Determines whether the widget should be enabled or disabled.
     */
    setEnabledWidget(index: number, enabled: boolean): void;
    /**
     * Set the enabled flag of all widget items.
     *
     * @param {boolean} enabled - Determines whether the widgets should be enabled or disabled.
     */
    setEnabledWidgets(enabled: boolean): void;
    /**
     * Remove all widget items.
     */
    clear(): void;
    /**
     * Returns the ID of the focused widget, or null if there is no focused widget.
     */
    getFocusedWidgetId(): string | null;
    /**
     * Returns the index position of the focused widget item, or -1 if no widget is focused.
     */
    getFocusedWidgetIndex(): number;
    /**
     * Returns the ID of the first selected widget, or null if no widget is selected.
     */
    getSelectedWidgetId(): string | null;
    /**
     * Returns the index position of the first selected widget item or -1 if no widget is selected.
     */
    getSelectedWidgetIndex(): number;
    /**
     * Returns a list of IDs of selected widget items.
     */
    getSelectedWidgetIds(): Array<string>;
    /**
     * Returns a list of index position of selected widget items.
     */
    getSelectedWidgetIndexes(): Array<number>;
    /**
     * Returns all widgets.
     */
    getWidgets(): UIWidget[];
    /**
     * Returns the widget at the specified index.
     *
     * @param {number} index - The index position of the widget.
     */
    getWidget(index: number): UIWidget;
    /**
     * The onAction function.
     */
    onAction(actionId: string): void;
}
export { UIMenu, MenuFocus, MenuAxis };
