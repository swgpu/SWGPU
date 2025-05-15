declare enum SizeMode {
    FIT = 0,
    ADJUST = 1,
    FIXED = 2,
    FULL = 3
}
/**
 * Singleton core manager.
 * Used to set the size and resolution of the top-level container.
 * It emit 'E_RESIZE'
 */
declare class CoreManager {
    container: HTMLElement;
    resWidth: number;
    resHeight: number;
    sizeMode: SizeMode;
    constructor();
    /**
     * Set the size strategy of the container. It emit a 'E_RESIZE' event.
     *
     * @param {number} resWidth - The width of the container in pixels.
     * @param {number} resHeight - The height of the container in pixels.
     * @param sizeMode - Determines how the container fit the browser window (in some cases, there is desynchro between container size and resolution size).
     */
    setSize(resWidth: number, resHeight: number, sizeMode?: SizeMode): void;
    /**
     * Returns the client-width and client-height of the container element.
     */
    getSize(): vec2;
    /**
     * Returns the resolution size.
     */
    getResolution(): vec2;
    /**
     * Adds a class to the container element.
     *
     * @param {string} className - The class name.
     */
    addClass(className: string): void;
    /**
     * Removes a class from the container element.
     *
     * @param {string} className - The class name.
     */
    removeClass(className: string): void;
    /**
     * Toggles the presence of a class on the container element.
     *
     * @param {string} className - The class name.
     */
    toggleClass(className: string): void;
    /**
     * Enable scanlines.
     *
     * @param {boolean} enabled - Indicating whether scanlines should be enabled or disable.
     */
    enableScanlines(enabled: boolean): void;
}
declare const coreManager: CoreManager;
export { CoreManager };
export { coreManager, SizeMode };
