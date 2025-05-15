import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { Gfx3Flare } from './gfx3_flare';
/**
 * A lens flare handler.
 */
declare class Gfx3FlareLens {
    spacing: number;
    flares: Array<Gfx3Flare>;
    items: Array<{
        texture: Gfx3Texture;
        scale: number;
    }>;
    sunWorldPos: vec3;
    scaleStepFactor: number;
    maxDistanceBrightness: number;
    constructor();
    /**
     * Free all resources.
     *
     * @param {number} spacing - The space between flares
     */
    startup(spacing: number): Promise<void>;
    /**
     * The draw function.
     */
    draw(): void;
    /**
     * Set the sun position.
     *
     * @param {number} x - The x position.
     * @param {number} y - The y position.
     * @param {number} z - The z position.
     */
    setSunWorldPosition(x: number, y: number, z: number): void;
    /**
     * Set the scale step factor.
     *
     * @param {number} scaleStepFactor - The scale value.
     */
    setScaleStepFactor(scaleStepFactor: number): void;
    /**
     * Set the maximum distance for brightness.
     *
     * @param {number} maxDistanceBrightness - The distance max.
     */
    setMaxDistanceBrightness(maxDistanceBrightness: number): void;
}
export { Gfx3FlareLens };
