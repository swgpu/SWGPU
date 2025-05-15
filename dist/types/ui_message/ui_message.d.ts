import { UIWidget } from '../ui/ui_widget';
/**
 * A UI widget displaying a bottom fixed dialog widget with picture, text and author name.
 * It emit 'E_PRINT_FINISHED'
 * It emit 'E_OK'
 */
declare class UIMessage extends UIWidget {
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
     * Set the dialog author avatar's.
     *
     * @param {string} pictureFile - The file path of the picture that you want to set.
     */
    setPicture(pictureFile: string): void;
    /**
     * Set the dialog author name's.
     *
     * @param {string} author - The name of the author.
     */
    setAuthor(author: string): void;
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
export { UIMessage };
