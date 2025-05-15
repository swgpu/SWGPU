import { UIWidget } from '../ui/ui_widget';
import { UIMenuText } from '../ui_menu_text/ui_menu_text';
/**
 * A UI widget displaying prompt with a text content and a menu of actions.
 * It emit 'E_ITEM_SELECTED' with data { id, index }
 */
declare class UIPrompt extends UIWidget {
    #private;
    uiMenu: UIMenuText;
    constructor();
    /**
     * The update function.
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
     * Focus on.
     */
    focus(): void;
    /**
     * Focus off.
     */
    unfocus(): void;
    /**
     * Set the text message.
     *
     * @param {string} text - The text content.
     */
    setText(text: string): void;
    /**
     * Add a new menu button.
     *
     * @param {string} id - The unique identifier.
     * @param {string} text - The text or label.
     */
    addAction(id: string, text: string): void;
    /**
     * Remove a menu button.
     *
     * @param {string} id - The unique identifier.
     */
    removeAction(id: string): void;
    /**
     * Remove all menu buttons.
     */
    clearActions(): void;
}
export { UIPrompt };
