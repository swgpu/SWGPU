import { UIMenu } from '../ui_menu/ui_menu';
import { MenuAxis } from '../ui_menu/ui_menu';
/**
 * A UI widget displaying a simple text menu.
 * It send same events as UIMenu.
 */
declare class UIMenuText extends UIMenu {
    /**
     * @param options - Various options for configuring the behavior of the menu.
     */
    constructor(options?: {
        axis?: MenuAxis;
        className?: string;
    });
    /**
     * Add text item.
     *
     * @param {string} id - The unique identifier of the item.
     * @param {string} text - The text content.
     */
    add(id: string, text: string): void;
    /**
     * Set the text of a menu item.
     *
     * @param {string} id - The unique identifier of the item.
     * @param {string} text - The text content.
     */
    set(id: string, text: string): void;
    /**
     * Removes an item.
     *
     * @param {string} id - The unique identifier of the item.
     */
    remove(id: string): void;
    /**
     * Returns the selected widget ID as a string or null.
     */
    getSelectedId(): string | null;
}
export { UIMenuText };
