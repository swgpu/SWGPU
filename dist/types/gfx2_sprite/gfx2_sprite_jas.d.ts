import { FormatJAS } from '../core/format_jas';
import { Poolable } from '../core/object_pool';
import { Gfx2Drawable } from '../gfx2/gfx2_drawable';
import { Gfx2BoundingRect } from '../gfx2/gfx2_bounding_rect';
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
    boundingRects: Array<Gfx2BoundingRect>;
}
/**
 * A 2D sprite with animations.
 * It emit 'E_FINISHED'
 */
declare class Gfx2SpriteJAS extends Gfx2Drawable implements Poolable<Gfx2SpriteJAS> {
    animations: Array<JASAnimation>;
    texture: ImageBitmap | HTMLImageElement;
    offsetFactor: vec2;
    currentAnimation: JASAnimation | null;
    currentAnimationFrameIndex: number;
    looped: boolean;
    frameProgress: number;
    constructor();
    /**
     * Loads asynchronously sprite data from a json file (jas).
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
     * The draw function.
     */
    onRender(): void;
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
     * Returns the sprite texture.
     */
    getTexture(): ImageBitmap | HTMLImageElement;
    /**
     * Set the sprite texture.
     *
     * @param {ImageBitmap} texture - The sprite texture.
     */
    setTexture(texture: ImageBitmap): void;
    /**
     * Set the normalized offset value.
     * Note: this offset is independant from the regular drawable pixel based offset.
     *
     * @param {number} offsetXFactor - The normalized x-coordinate offset value.
     * @param {number} offsetYFactor - The normalized y-coordinate offset value.
     */
    setOffsetNormalized(offsetXFactor: number, offsetYFactor: number): void;
    /**
     * Returns the bounding rect.
     *
     * @param {boolean} [dynamicMode=false] - Determines if bounding rect fit the current animation.
     */
    getBoundingRect(dynamicMode?: boolean): Gfx2BoundingRect;
    /**
     * Returns the bounding rect in the world space coordinates.
     *
     * @param {boolean} [dynamicMode=false] - Determines if bounding rect fit the current animation.
     */
    getWorldBoundingRect(dynamicMode?: boolean): Gfx2BoundingRect;
    /**
     * Clone the object.
     *
     * @param {Gfx2SpriteJAS} jas - The copy object.
     */
    clone(jas?: Gfx2SpriteJAS): Gfx2SpriteJAS;
}
export { Gfx2SpriteJAS };
