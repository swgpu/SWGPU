import { Poolable } from '../core/object_pool';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Drawable } from '../gfx3/gfx3_drawable';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
/**
 * A 3D base sprite object.
 */
declare class Gfx3Sprite extends Gfx3Drawable implements Poolable<Gfx3Sprite> {
    textureChanged: boolean;
    offset: vec2;
    offsetFactor: vec2;
    flip: [boolean, boolean];
    pixelsPerUnit: number;
    billboardMode: boolean;
    grp1: Gfx3StaticGroup;
    texture: Gfx3Texture;
    constructor();
    /**
     * Free all resources.
     * Warning: You need to call this method to free allocation for this object.
     */
    delete(): void;
    /**
     * The draw function.
     */
    draw(): void;
    /**
     * Returns the transformation matrix.
     */
    getTransformMatrix(): mat4;
    /**
     * Returns the origin offset.
     */
    getOffset(): vec2;
    /**
     * Returns the offset in x-axis direction.
     */
    getOffsetX(): number;
    /**
     * Returns the offset in y-axis direction.
     */
    getOffsetY(): number;
    /**
     * Set the origin offset value.
     *
     * @param {number} offsetX - The x-offset.
     * @param {number} offsetY - The y-offset.
     */
    setOffset(offsetX: number, offsetY: number): void;
    /**
     * Set the normalized offset value.
     *
     * @param {number} offsetXFactor - The normalized x-coordinate offset value.
     * @param {number} offsetYFactor - The normalized y-coordinate offset value.
     */
    setOffsetNormalized(offsetXFactor: number, offsetYFactor: number): void;
    /**
     * Returns two booleans, first is the x-axis flip flag, second is the y-axis flip flag.
     */
    getFlip(): [boolean, boolean];
    /**
     * Set flipX.
     *
     * @param {boolean} x - The x-axis flip flag.
     */
    setFlipX(x: boolean): void;
    /**
      * Set flipY.
      *
      * @param {boolean} y - The y-axis flip flag.
      */
    setFlipY(y: boolean): void;
    /**
     * Returns the pixels per unit value.
     */
    getPixelsPerUnit(): number;
    /**
     * Set the number of pixels per unit.
     *
     * @param {number} pixelsPerUnit - Determine the scale or resolution at which the sprite is displayed.
     */
    setPixelsPerUnit(pixelsPerUnit: number): void;
    /**
     * Returns the billboard mode.
     */
    getBillboardMode(): boolean;
    /**
     * Set the billboard mode.
     *
     * @param {boolean} billboardMode - Determines whether the object should be
     * displayed as a billboard, meaning it always faces the camera regardless of its orientation.
     */
    setBillboardMode(billboardMode: boolean): void;
    /**
     * Set the sprite texture.
     *
     * @param {Gfx3Texture} texture - The sprite texture.
     */
    setTexture(texture: Gfx3Texture): void;
    /**
     * Returns the sprite texture.
     */
    getTexture(): Gfx3Texture;
    /**
     * Returns the bindgroup(1).
     */
    getGroup01(): Gfx3StaticGroup;
    /**
     * Clone the object.
     *
     * @param {Gfx3Sprite} sprite - The copy object.
     * @param {mat4} transformMatrix - The transformation matrix.
     */
    clone(sprite?: Gfx3Sprite, transformMatrix?: mat4): Gfx3Sprite;
}
export { Gfx3Sprite };
