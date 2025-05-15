declare enum RenderingMode {
    DIM_2D = "DIM_2D",
    DIM_3D = "DIM_3D",
    DIM_XD = "DIM_XD"
}
/**
 * Singleton managing the main loop engine.
 */
declare class EngineManager {
    #private;
    then: number;
    elapsedTime: number;
    frameRateFixed: boolean;
    frameRateValue: number;
    paused: boolean;
    lastAnimationFrameId: number;
    mode: RenderingMode;
    pauseStartTime: number;
    constructor();
    /**
     * Start the engine with optional parameters and run the main loop.
     *
     * @param {boolean} [enableScanlines=true] - Determines whether scanlines should be enabled or not.
     * @param {boolean} [showDebug=true] - Determines whether to display debug information.
     */
    startup(enableScanlines?: boolean, showDebug?: boolean): void;
    /**
     * The main loop.
     */
    run(timeStamp: number, state?: 'pause' | 'resume' | 'normal'): void;
    /**
     * Set frame rate fixed flag.
     *
     * @param {boolean} fixed - The boolean flag.
     */
    setFrameRateFixed(fixed: boolean): void;
    /**
     * Set the frame rate value.
     *
     * @param {number} value - The fps value.
     */
    setFrameRateValue(value: number): void;
    /**
     * Set the rendering mode among 2D, 3D or 2D-3D.
     *
     * @param {RenderingMode} renderingMode - The rendering mode value.
     */
    setRenderingMode(renderingMode: RenderingMode): void;
    /**
     * Check if the frame rate is fixed or not.
     */
    isFrameRateFixed(): boolean;
    /**
     * Get the frame rate value.
     */
    getFrameRateValue(): number;
    /**
     * Set the delta time.
     */
    getElapsedTime(): number;
    /**
     * Make the update loop paused.
     */
    pause(): void;
    /**
     * Make the update loop running.
     */
    resume(): void;
}
export { EngineManager };
export type { RenderingMode };
export declare const em: EngineManager;
