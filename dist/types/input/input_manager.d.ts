/// <reference types="node" />
interface Pad {
    index: number;
    id: string;
    nButtons: number;
    nAxes: number;
    axes: Array<number>;
    pressed: Array<boolean>;
}
interface Action {
    id: string;
    inputSource: InputSource;
    eventKey: string;
}
type InputSource = 'keyboard' | 'gamepad0' | 'gamepad1' | 'gamepad2' | 'gamepad3';
/**
 * Singleton input manager.
 * Handle various sources such as keyboard, mouse and gamepad.
 * It emit 'E_ACTION_ONCE' with data { actionId }.
 * It emit 'E_ACTION' with data { actionId }.
 * It emit 'E_ACTION_RELEASED' with data { actionId }
 * It emit 'E_MOUSE_DOWN' with data { buttons }
 * It emit 'E_MOUSE_UP'
 * It emit 'E_MOUSE_MOVE' with data { movementX, movementY }
 * It emit 'E_MOUSE_DRAG' with data { movementX, movementY }
 * It emit 'E_MOUSE_WHEEL' with data { delta }
 * It emit 'E_POINTER_LOCK_CHANGED' with data { lockChanged }
 * It emit 'E_GAMEPAD_CONNECTED' with data { id }
 * It emit 'E_GAMEPAD_DISCONNECTED' with data { id }
 * It emit 'E_GAMEPAD_REMOVED' with data { id }
 *
 * Default actions table:
 * ■ ACTION => KEYBOARD => GAMEPAD
 * ■ OK => Enter => 0
 * ■ BACK => Escape => 1
 * ■ SELECT => Space => BtnSelect
 * ■ LEFT => ArrowLeft => PadLeft
 * ■ RIGHT => ArrowRight => PadRight
 * ■ UP => ArrowUp => PadTop
 * ■ DOWN => ArrowDown => PadBottom
 */
declare class InputManager {
    #private;
    keyMap: Map<string, boolean>;
    actionMap: Map<string, boolean>;
    actionOnceMap: Map<string, number>;
    actionRegister: Map<string, Action>;
    pads: Array<Pad>;
    padsInterval: NodeJS.Timeout | number | undefined;
    mouseDown: boolean;
    mousePosition: vec2;
    mouseWheel: number;
    dragStartPosition: vec2;
    pointerLockEnabled: boolean;
    pointerLockCaptured: boolean;
    constructor();
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * Add an action mapping.
     *
     * @param {string} inputSource - The device from which the input is received.
     * @param {string} eventKey - The key or button that triggers the action.
     * @param {string} actionId - The unique action identifier.
     */
    registerAction(inputSource: InputSource, eventKey: string, actionId: string): void;
    /**
     * Remove an action mapping.
     *
     * @param {string} inputSource - The device from which the input is received.
     * @param {string} eventKey - The key or button that triggers the action.
     */
    unregisterAction(inputSource: InputSource, eventKey: string): void;
    /**
     * Checks if an action is currently active.
     *
     * @param {string} actionId - The action identifier.
     */
    isActiveAction(actionId: string): boolean | undefined;
    /**
     * Checks if an action is just active.
     *
     * @param {string} actionId - The action identifier.
     */
    isJustActiveAction(actionId: string): boolean;
    /**
     * Checks if all specified actions is currently active.
     *
     * @param {Array<string>} actionIds - The action identifier.
     */
    isActiveActions(actionIds: Array<string>): boolean;
    /**
     * Checks if all specified actions is just active.
     *
     * @param {Array<string>} actionIds - The action identifier.
     */
    isJustActiveActions(actionIds: Array<string>): boolean;
    /**
     * Checks if mouse click is currently active.
     */
    isMouseDown(): boolean;
    /**
     * Returns the mouse position.
     */
    getMousePosition(): vec2;
    /**
     * Returns the mouse wheel value.
     */
    getMouseWheel(): number;
    /**
     * Checks if pointer lock is enabled.
     */
    isPointerLockEnabled(): boolean;
    /**
     * Checks if pointer lock is captured.
     */
    isPointerLockCaptured(): boolean;
    /**
     * Enable pointer lock state.
     *
     * @param {boolean} enabled - The enabled flag.
     */
    setPointerLockEnabled(enabled: boolean): void;
    /**
     * Returns the current drag movement.
     */
    getDragDelta(): vec2;
    /**
     * Returns a pad or undefined if not found.
     * Note: Pads are automatically added on plug-in.
     *
     * @param {number} index - The index of the pad.
     */
    getPad(index: number): Pad | undefined;
    /**
     * Returns a pad axis value or zero if not found.
     *
     * @param {number} index - The index of the pad.
     * @param {number} axis - The index of the pad.
     */
    getPadAxis(index: number, axis: number): number;
    /**
     * Removes a pad.
     *
     * @param {string} id - The unique identifier of the pad
     */
    removePad(id: string): void;
}
export { InputManager };
export declare const inputManager: InputManager;
