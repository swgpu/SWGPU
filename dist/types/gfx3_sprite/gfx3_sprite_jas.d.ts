import { FormatJAS } from '../core/format_jas';
import { Poolable } from '../core/object_pool';
import { Gfx3BoundingBox } from '../gfx3/gfx3_bounding_box';
import { Gfx3Sprite } from './gfx3_sprite';
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
    boundingBoxes: Array<Gfx3BoundingBox>;
}
/**
 * A 3D animated sprite.
 * It emit 'E_FINISHED'
 */
declare class Gfx3SpriteJAS extends Gfx3Sprite implements Poolable<Gfx3SpriteJAS> {
    animations: Array<JASAnimation>;
    currentAnimation: JASAnimation | null;
    currentAnimationFrameIndex: number;
    looped: boolean;
    frameProgress: number;
    constructor();
    /**
     * Load asynchronously animated sprite data from a json file (jas).
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
    play(animationName: string, looped?: boolean, preventSameAnimation?: boolean): void;
    /**
     * Returns the list of animation descriptors.
     */
    getAnimations(): Array<JASAnimation>;
    /**
     * Set the animation descriptors.
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
    /**
     * Returns the bounding box.
     *
     * @param {boolean} [dynamicMode=false] - Determines if bounding box fit the current animation.
     */
    getBoundingRect(dynamicMode?: boolean): Gfx3BoundingBox;
    /**
     * Returns the bounding box in the world space coordinates.
     *
     * @param {boolean} [dynamicMode=false] - Determines if bounding box fit the current animation.
     */
    getWorldBoundingRect(dynamicMode?: boolean): Gfx3BoundingBox;
    /**
     * Clone the object.
     *
     * @param {Gfx3SpriteJAS} jas - The copy object.
     * @param {mat4} transformMatrix - The transformation matrix.
     */
    clone(jas?: Gfx3SpriteJAS, transformMatrix?: mat4): Gfx3SpriteJAS;
}
export { Gfx3SpriteJAS };
