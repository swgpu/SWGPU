import { UIWidget } from '../ui/ui_widget';
import { UIMenuText } from '../ui_menu_text/ui_menu_text';
/**
 * A floating dialog widget (looking as a bubble) with text and optional actions.
 * It emit 'E_PRINT_FINISHED'
 * It emit 'E_MENU_ITEM_SELECTED' with data { id, index }
 * It emit 'E_OK'
 */
declare class UIBubble extends UIWidget {
    #private;
    uiMenu: UIMenuText;
    text: string;
    actions: Array<string>;
    stepDuration: number;
    currentTextOffset: number;
    currentActionTextOffset: number;
    currentActionIndex: number;
    timeElapsed: number;
    finished: boolean;
    constructor();
    /**
     * The "update" function.
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
     * Note: It focus `menu` too if actions is set.
     */
    focus(): void;
    /**
     * Focus off.
     * Note: It unfocus `menu` too if actions is set.
     */
    unfocus(): void;
    /**
     * Set the dialog author avatar's.
     *
     * @param {string} pictureFile - The file path of the picture.
     */
    setPicture(pictureFile: string): void;
    /**
     * Set the dialog author name's.
     *
     * @param {string} author - The name of the author.
     */
    setAuthor(author: string): void;
    /**
     * Set the width of the bubble.
     *
     * @param {number} width - The width in pixels.
     */
    setWidth(width: number): void;
    /**
     * Set the dialog text.
     *
     * @param {string} text - The dialog text.
     */
    setText(text: string): void;
    /**
     * Set the actions menu.
     *
     * @param actions - The list of actions.
     */
    setActions(actions: Array<string>): void;
    /**
     * Set the text speed.
     *
     * @param {number} stepDuration - The duration of a text update.
     */
    setStepDuration(stepDuration: number): void;
    /**
     * The "onAction" function.
     * Note: It emits an 'E_OK' event if the actionId is 'OK' and text is finished.
     */
    onAction(actionId: string): void;
}
export { UIBubble };
