import { UIWidget } from './ui_widget';
/**
 * Singleton UI manager.
 * It emit 'E_FOCUSED' with data { widget }
 * It emit 'E_UNFOCUSED'
 */
declare class UIManager {
    root: HTMLDivElement;
    fadeLayer: HTMLDivElement;
    overLayer: HTMLDivElement;
    focusedWidget: UIWidget | null;
    widgets: Array<UIWidget>;
    constructor();
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * Returns all widgets.
     */
    getWidgets(): Array<UIWidget>;
    /**
     * Give the focuses to a widget and unfocuses the currently focused (if any).
     * It emit 'E_FOCUSED' event.
     *
     * @param {UIWidget} widget - The widget.
     */
    focus(widget: UIWidget): void;
    /**
     * Remove focus from the currently focused widget (if any).
     * It emit 'E_UNFOCUSED' event.
     */
    unfocus(): void;
    /**
     * Appends an HTML element to the root element.
     *
     * @param {HTMLElement} node - The HTML element.
     * @param {string} [styles] - The CSS styles that you want to apply to the node.
     */
    addNode(node: HTMLElement, styles?: string): void;
    /**
     * Removes an HTML element from the root element.
     *
     * @param {HTMLElement} node - The HTML element.
     */
    removeNode(node: HTMLElement): void;
    /**
     * Add a widget and returns it.
     *
     * @param {UIWidget} widget - The widget.
     * @param {string} [styles] - The CSS styles to be applied to the widget.
     */
    addWidget(widget: UIWidget, styles?: string): UIWidget;
    /**
     * Removes a widget.
     *
     * @param {UIWidget} widget - The  widget.
    */
    removeWidget(widget: UIWidget): boolean;
    /**
     * Remove all nodes and widgets.
     */
    clear(): void;
    /**
     * Fade in the screen.
     *
     * @param {number} delay - The amount of time to wait before starting the fade-in (in milliseconds).
     * @param {number} ms - The duration of the fade-in (in milliseconds).
     * @param {string} [color=#000] - The fade-in color.
     * @param {string} [transitionTimingFunction=linear] - Determines how the intermediate values are calculated during the transition.
     * @param {Function} cb - The callback function that will be executed after the fade-in is complete.
     */
    fadeIn(delay: number, ms: number, color?: string, transitionTimingFunction?: string, cb?: Function): void;
    /**
     * Fade out the screen.
     *
     * @param {number} delay - The amount of time to wait before starting the fade-out (in milliseconds).
     * @param {number} ms - The duration of the fade-out (in milliseconds).
     * @param {string} [transitionTimingFunction=linear] - Determines how the intermediate values are calculated during the transition.
     * @param {Function} cb - The callback function that will be executed after the fade-out is complete.
     */
    fadeOut(delay: number, ms: number, transitionTimingFunction?: string, cb?: Function): void;
    /**
     * Enable the overlayer.
     *
     * @param {boolean} enable - Indicating whether to enable or disable the overlayer.
     */
    enableOverlayer(enable: boolean): void;
    /**
     * Set class to the root ui element.
     *
     * @param {string} className - The list of classes.
     */
    setClassName(className: string): void;
}
export { UIManager };
export declare const uiManager: UIManager;
