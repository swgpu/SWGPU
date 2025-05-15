import { FormatJAS } from '../core/format_jas';
import { UIWidget } from '../ui/ui_widget';
interface JASFrame {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface JASAnimation {
    name: string;
    frames: Array<JASFrame>;
    frameDuration: number;
}
/**
 * A UI widget displaying a sprite with animations.
 * It emit 'E_FINISHED'
 */
declare class UISprite extends UIWidget {
    animations: Array<JASAnimation>;
    currentAnimation: JASAnimation | null;
    currentAnimationFrameIndex: number;
    isLooped: boolean;
    timeElapsed: number;
    /**
     * @param options - Contains only class name.
     */
    constructor(options?: {
        className?: string;
    });
    /**
     * Load asynchronously an image file.
     *
     * @param {string} imageFile - The file path.
     */
    loadTexture(imageFile: string): Promise<void>;
    /**
     * Load asynchronously sprite data from a json file (jas).
     *
     * @param {string} path - The file path.
     */
    loadFromFile(path: string): Promise<void>;
    /**
     * Loads asynchronously sprite data from a aseprite file (ase).
     *
     * @param {string} path - The file path.
     */
    loadFromAsepriteFile(path: string): Promise<void>;
    /**
     * Loads sprite data from a jas formatted data.
     *
     * @param {FormatJAS} data - The jas formatted data.
     */
    loadFromData(data: FormatJAS): void;
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * Play a specific animation.
     *
     * @param {string} animationName - The name of the animation to be played.
     * @param {boolean} [looped=false] - Determines whether the animation should loop or not.
     * @param {boolean} [preventSameAnimation=false] - Determines whether the same animation should be prevented from playing again.
     */
    play(animationName: string, isLooped?: boolean, preventSameAnimation?: boolean): void;
    /**
     * Returns the list of animation descriptors.
     */
    getAnimations(): Array<JASAnimation>;
    /**
     * Set the animations descriptors.
     *
     * @param animations - The animations data.
     */
    setAnimations(animations: Array<JASAnimation>): void;
    /**
     * Returns the current animation or null if there is no current animation.
     */
    getCurrentAnimation(): JASAnimation | null;
    /**
     * Returns the current animation frame index.
     */
    getCurrentAnimationFrameIndex(): number;
}
export { UISprite };
