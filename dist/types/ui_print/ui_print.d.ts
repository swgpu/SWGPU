import { UIWidget } from '../ui/ui_widget';
/**
 * A UI widget displaying a full screen dialog print with text.
 * It is ideal for long-text reading.
 * It emit 'E_PRINT_FINISHED'
 * It emit 'E_OK'
 */
declare class UIPrint extends UIWidget {
    #private;
    text: string;
    stepDuration: number;
    currentTextOffset: number;
    timeElapsed: number;
    finished: boolean;
    constructor();
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * Set the dialog text.
     *
     * @param {string} text - The dialog text.
     */
    setText(text: string): void;
    /**
     * Set the text speed.
     *
     * @param {number} stepDuration - The duration of a text update.
     */
    setStepDuration(stepDuration: number): void;
    /**
     * The onAction function.
     * Note: It emits an 'E_OK' event if the actionId is 'OK' and text is finished.
     */
    onAction(actionId: string): void;
}
export { UIPrint };
