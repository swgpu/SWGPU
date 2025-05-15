import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Drawable } from '../gfx3/gfx3_drawable';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
/**
 * A cubemap skybox.
 */
declare class Gfx3Skybox extends Gfx3Drawable {
    cubemapChanged: boolean;
    grp1: Gfx3StaticGroup;
    cubemap: Gfx3Texture;
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
     * Set the cubemap texture.
     *
     * @param {Gfx3Texture} cubemap - The cubemap texture.
     */
    setCubemap(cubemap: Gfx3Texture): void;
    /**
     * Returns the cubemap texture.
     */
    getCubemap(): Gfx3Texture;
    /**
     * Returns the bindgroup(1).
     */
    getGroup01(): Gfx3StaticGroup;
}
export { Gfx3Skybox };
