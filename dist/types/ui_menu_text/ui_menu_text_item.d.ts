import { UIWidget } from '../ui/ui_widget';
/**
 * A UI widget displaying a simple menu text item.
 */
declare class UIMenuTextItem extends UIWidget {
    constructor();
    /**
     * Set the text.
     *
     * @param {string} text - The text.
     */
    setText(text: string): void;
}
export { UIMenuTextItem };
