import { UIWidget } from '../ui/ui_widget';
/**
 * A UI widget displaying a simple text.
 */
declare class UIText extends UIWidget {
    constructor();
    /**
     * Set the text content.
     *
     * @param {string} text - The text content.
     */
    setText(text: string): void;
}
export { UIText };
