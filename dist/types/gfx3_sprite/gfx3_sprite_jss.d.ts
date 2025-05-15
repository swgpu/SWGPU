import { Poolable } from '../core/object_pool';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { Gfx3Sprite } from './gfx3_sprite';
/**
 * A 3D static sprite (without animations).
 */
declare class Gfx3SpriteJSS extends Gfx3Sprite implements Poolable<Gfx3SpriteJSS> {
    textureRect: vec4;
    constructor();
    /**
     * Load asynchronously sprite data from a json file (jss).
     *
     * @param {string} path - The file path.
     */
    loadFromFile(path: string): Promise<void>;
    /**
     * The update function.
     */
    update(): void;
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
     * Set the sprite texture.
     *
     * @param {Gfx3Texture} texture - The sprite texture.
     */
    setTexture(texture: Gfx3Texture): void;
    /**
     * Clone the object.
     *
     * @param {Gfx3SpriteJSS} jss - The copy object.
     * @param {mat4} transformMatrix - The transformation matrix.
     */
    clone(jss?: Gfx3SpriteJSS, transformMatrix?: mat4): Gfx3SpriteJSS;
}
export { Gfx3SpriteJSS };
