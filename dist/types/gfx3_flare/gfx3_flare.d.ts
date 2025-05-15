import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Drawable } from '../gfx3/gfx3_drawable';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
/**
 * A flare drawable object.
 */
declare class Gfx3Flare extends Gfx3Drawable {
    textureChanged: boolean;
    size2D: vec2;
    position2D: vec2;
    scale2D: vec2;
    rotation2D: number;
    offset2D: vec2;
    color: vec4;
    grp2: Gfx3StaticGroup;
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
     * Set the position in screen coordinates.
     * Top-left corner is at coordinates 0;0.
     *
     * @param {number} x - The X coordinate of the position.
     * @param {number} y - The Y coordinate of the position.
     */
    setPosition2D(x: number, y: number): void;
    /**
     * Returns the position in screen coordinates.
     * Top-left corner is at coordinates 0;0.
     */
    getPosition2D(): vec2;
    /**
     * Set the scale with the given x and y factors.
     *
     * @param {number} x - The x factor in the x-axis direction.
     * @param {number} y - The y factor in the y-axis direction.
     */
    setScale2D(x: number, y: number): void;
    /**
     * Returns the scale.
     */
    getScale2D(): vec2;
    /**
     * Set the rotation angle (in radians).
     *
     * @param {number} angle - The rotation angle in radians.
     */
    setRotation2D(angle: number): void;
    /**
     * Returns the rotation angle (in radians).
     */
    getRotation2D(): number;
    /**
     * Set the origin offset in pixel.
     * Default origin is top-left corner. Ex: An offset of 10;10 set the origin of the flare to 10;10.
     *
     * @param {number} x - The x offset.
     * @param {number} y - The y offset.
     */
    setOffset2D(x: number, y: number): void;
    /**
     * Set the origin offset in normalized value.
     *
     * @param {number} x - The x offset.
     * @param {number} y - The y offset.
     */
    setOffset2DNormalized(x: number, y: number): void;
    /**
     * Returns the origin offset in pixel.
     */
    getOffset2D(): vec2;
    /**
     * Set the color blend (from 0 to 1).
     *
     * @param {number} r - The parameter "r" represents the red component.
     * @param {number} g - The parameter "g" represents the green component.
     * @param {number} b - The parameter "b" represents the blue component.
     * @param {number} a - The parameter "a" represents the alpha value.
     */
    setColor(r: number, g: number, b: number, a: number): void;
    /**
     * Returns the color blend.
     */
    getColor(): vec4;
    /**
     * Set the texture.
     *
     * @param {Gfx3Texture} texture - The texture of the flare.
     */
    setTexture(texture: Gfx3Texture): void;
    /**
     * Returns the texture.
     */
    getTexture(): Gfx3Texture;
    /**
     * Returns the size in pixels.
     */
    getSize2D(): vec2;
    /**
     * Set the size in pixels.
     *
     * @param {number} w - The width of the flare.
     * @param {number} h - The height of the flare.
     */
    setSize2D(w: number, h: number): void;
    /**
     * Returns the bindgroup(2).
     */
    getGroup02(): Gfx3StaticGroup;
}
export { Gfx3Flare };
