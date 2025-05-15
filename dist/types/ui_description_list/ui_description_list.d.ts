import { UIWidget } from '../ui/ui_widget';
/**
 * A UI widget for displaying a list of items with labels and values.
 */
declare class UIDescriptionList extends UIWidget {
    constructor();
    /**
     * Add an item.
     *
     * @param {string} id - The unique identifier of the item.
     * @param {string} label - The label or name.
     * @param {string} value - The value.
     */
    addItem(id: string, label: string, value: string): void;
    /**
     * Removes an item.
     *
     * @param {string} id - The unique identifier of the item.
     */
    removeItem(id: string): void;
    /**
     * Set the value of an item.
     *
     * @param {string} id - The unique identifier of the item.
     * @param {string} value - The value.
     */
    setItem(id: string, value: string): void;
    /**
     * Returns the value of an item.
     *
     * @param {string} id - The unique identifier of the item.
     */
    getItemValue(id: string): string;
    /**
     * Checks if an item is visible.
     *
     * @param {string} id - The unique identifier of the item.
     */
    isItemVisible(id: string): boolean;
    /**
     * Set the visibility of an item.
     *
     * @param {string} id - The unique identifier of the item.
     * @param {boolean} visible - Determines whether the item should be visible or hidden.
     */
    setItemVisible(id: string, visible: boolean): void;
    /**
     * Remove all items.
     */
    clear(): void;
}
export { UIDescriptionList };
