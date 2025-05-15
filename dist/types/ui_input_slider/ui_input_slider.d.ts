import { UIWidget } from '../ui/ui_widget';
/**
 * A UI widget displaying a slider input.
 * It emit 'E_VALUE_CHANGED' with data { value }
 */
declare class UIInputSlider extends UIWidget {
    value: number;
    min: number;
    max: number;
    step: number;
    constructor();
    /**
     * Set the input value.
     *
     * @param {number} value - The value.
     */
    setValue(value: number): void;
    /**
     * Set the minimum value for the range input.
     *
     * @param {number} min - The minimum value.
     */
    setMin(min: number): void;
    /**
     * Set the maximum value for the range input.
     *
     * @param {number} max - The maximum value.
     */
    setMax(max: number): void;
    /**
     * Set the step value.
     *
     * @param {number} step - The increment or decrement value for the range input.
     */
    setStep(step: number): void;
    /**
     * The onAction function.
     * It emits an 'E_VALUE_CHANGED' event if the action is 'LEFT' or 'RIGHT'.
     */
    onAction(actionId: string): void;
}
export { UIInputSlider };
