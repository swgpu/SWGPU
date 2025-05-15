/**
 * UI Widget base element.
 * It emit 'E_FOCUSED'
 * It emit 'E_UNFOCUSED'
 * It emit 'E_ANIMATION_FINISHED'
 */
declare class UIWidget {
    id: string;
    className: string;
    template: string;
    node: HTMLDivElement;
    /**
     * @param options - The options like id, class and the most important, template code !
     */
    constructor(options?: {
        id?: string;
        className?: string;
        template?: string;
    });
    /**
     * Virtual update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * Free all resources.
     * Warning: You need to call this method to free allocation for this object.
     */
    delete(): void;
    /**
     * Returns the id.
     */
    getId(): string;
    /**
     * Set the id value.
     *
     * @param {string} id - The unique identifier of a widget.
     */
    setId(id: string): void;
    /**
     * Returns the root HTMLElement of the widget.
     */
    getNode(): HTMLDivElement;
    /**
     * Appends a child element to the root of the widget.
     *
     * @param {HTMLElement} child - The child element.
     */
    appendChild(child: HTMLElement): void;
    /**
     * Removes a child element from the root of the widget.
     *
     * @param {number} index - The position of the child element.
     */
    removeChild(index: number): void;
    /**
     * Appends CSS styles to the root of the widget.
     *
     * @param {string} styles - The CSS styles.
     */
    appendStyles(styles: string): void;
    /**
     * Focus on.
     * It set 'u-focused' class to the root of the widget.
     * It emits a 'E_FOCUSED' event and subscribes to input action event.
     */
    focus(): void;
    /**
     * Focus off.
     * It unset 'u-focused' class to the root of the widget.
     * It emits an 'E_UNFOCUSED' event and unsubscribes the inputManager from input action event.
     */
    unfocus(): void;
    /**
     * Checks if widget is focused.
     */
    isFocused(): boolean;
    /**
     * Set the visibility state.
     * It toggle the `u-hidden` class to the root of the widget.
     *
     * @param {boolean} visible - Determines whether the element should be visible or hidden.
     */
    setVisible(visible: boolean): void;
    /**
     * Checks if the widget is visible.
     */
    isVisible(): boolean;
    /**
     * Set the enabled state flag.
     * It toggle the 'u-disabled' class to the root of the widget.
     *
     * @param {boolean} enabled - Determines whether the widget is enabled or disabled.
     */
    setEnabled(enabled: boolean): void;
    /**
     * Checks if widget is enabled or not.
     */
    isEnabled(): boolean;
    /**
     * Set the selected state flag.
     * It toggle the 'u-selected' class to the root of the widget.
     *
     * @param {boolean} selected - Indicates whether the element should be selected or not.
     */
    setSelected(selected: boolean): void;
    /**
     * Checks if widget is selected or not.
     */
    isSelected(): boolean;
    /**
     * Returns the left and top client-coordinates of the widget on the screen.
     */
    getScreenPosition(): vec2;
    /**
     * Returns the relative x and y coordinates of the widget.
     */
    getPosition(): vec2;
    /**
     * Set the left and top position to the widget.
     * Note: Works only if position is absolute.
     *
     * @param {number} x - The horizontal position of the element on the page.
     * @param {number} y - The vertical position of the element on the page.
     */
    setPosition(x: number, y: number): void;
    /**
     * Trigger animation to the widget root element.
     *
     * @param {string} animation - The name of the animation.
     */
    animate(animation: string): void;
    /**
     * Virtual method that is called when input action event is emitted.
     *
     * @param {string} actionId - The action identifier.
     */
    onAction(actionId: string): void;
}
export { UIWidget };
