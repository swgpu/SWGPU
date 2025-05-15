import { UIWidget } from '../ui/ui_widget';
/**
 * A UI widget displaying a virtual keyboard.
 * It emit 'E_VALUE_CHANGED' with data { value }
 */
declare class UIInputKeyboard extends UIWidget {
    #private;
    value: string;
    row: number;
    column: number;
    constructor();
    /**
     * Focus on.
     */
    focus(): void;
    /**
     * Focus off.
     */
    unfocus(): void;
    /**
     * Set the input value.
     *
     * @param {string} value - The value.
     */
    setValue(value: string): void;
    /**
     * The onAction function.
     * It emits an 'E_VALUE_CHANGED' event when the action is 'OK'.
     */
    onAction(actionId: string): void;
}
export { UIInputKeyboard };
