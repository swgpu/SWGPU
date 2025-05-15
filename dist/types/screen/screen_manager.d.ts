import { Screen } from './screen';
/**
 * Singleton screen manager.
 * Note: requestPush, requestSet and requestPop are all asynchronously method and will be executed safely in the update loop.
 */
declare class ScreenManager {
    requests: Array<Function>;
    screens: Array<Screen>;
    constructor();
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * The draw function.
     */
    draw(): void;
    /**
     * The render function during the 2D phase.
     */
    render2D(): void;
    /**
     * The render function during the 3D phase.
     */
    render3D(): void;
    /**
     * Pushes a new screen to the stack, throwing an error if the screen is already present.
     * Note: The screen is pushed just after the onEnter method done the job.
     *
     * @param {Screen} newScreen - The screen.
     * @param {any} args - Arguments that are passed to the new screen onEnter method.
     */
    requestPushScreen(newScreen: Screen, args?: any): void;
    /**
     * Set a new and unique screen to the stack (all screens are removed).
     * Note: The screen is pushed just after the onEnter method done the job.
     *
     * @param {Screen} newScreen - The screen.
     * @param {any} args - Arguments that are passed to the new screen onEnter method.
     */
    requestSetScreen(newScreen: Screen, args?: any): void;
    /**
     * Remove the top screen from the screen stack, previous screen become the top.
     */
    requestPopScreen(): void;
}
export { ScreenManager };
export declare const screenManager: ScreenManager;
