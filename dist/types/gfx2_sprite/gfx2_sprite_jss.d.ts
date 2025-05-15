import { Poolable } from '../core/object_pool';
import { Gfx2Drawable } from '../gfx2/gfx2_drawable';
import { Gfx2BoundingRect } from '../gfx2/gfx2_bounding_rect';
export declare enum FileType {
    JSS = 0,
    Asprite = 1,
    TileKit = 2
}
/**
 * A 2D static sprite (without animations).
 */
declare class Gfx2SpriteJSS extends Gfx2Drawable implements Poolable<Gfx2SpriteJSS> {
    texture: ImageBitmap | HTMLImageElement;
    textureRect: vec4;
    offsetFactor: vec2;
    constructor();
    /**
     * Load asynchronously sprite data from a json file (jss).
     *
     * @param {string} path - The file path.
     */
    loadFromFile(path: string): Promise<void>;
    /**
     * The paint function.
     */
    onRender(): void;
    /**
     * Returns the texture rectangle.
     */
    getTextureRect(): vec4;
    /**
     * Returns the texture rect width.
     */
    getTextureRectWidth(): number;
    /**
     * Returns the texture rect height.
     */
    getTextureRectHeight(): number;
    /**
     * Set the texture rectangle.
     *
     * @param {number} left - The x-coordinate of the top-left texture rectangle corner.
     * @param {number} top - The y-coordinate of the top-left texture rectangle corner.
     * @param {number} width - The width of the texture rectangle.
     * @param {number} height - The height of the texture rectangle.
     */
    setTextureRect(left: number, top: number, width: number, height: number): void;
    /**
     * Set the normalized offset value.
     * Note: this offset is independant from the regular drawable pixel based offset.
     *
     * @param {number} offsetXFactor - The normalized x-coordinate offset value.
     * @param {number} offsetYFactor - The normalized y-coordinate offset value.
     */
    setOffsetNormalized(offsetXFactor: number, offsetYFactor: number): void;
    /**
     * Set the sprite texture.
     *
     * @param {ImageBitmap | HTMLImageElement} texture - The sprite texture.
     */
    setTexture(texture: ImageBitmap | HTMLImageElement): void;
    /**
     * Returns the sprite texture.
     */
    getTexture(): ImageBitmap | HTMLImageElement;
    /**
     * Returns the bounding rect in the world space coordinates.
     */
    getWorldBoundingRect(): Gfx2BoundingRect;
    /**
     * Clone the object.
     *
     * @param {Gfx2SpriteJSS} jss - The copy object.
     */
    clone(jss?: Gfx2SpriteJSS): Gfx2SpriteJSS;
}
export { Gfx2SpriteJSS };
