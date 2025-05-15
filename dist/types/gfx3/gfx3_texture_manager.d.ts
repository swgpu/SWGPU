/// <reference types="@webgpu/types" />
import { Gfx3Texture } from './gfx3_texture';
/**
 * Singleton 3D textures manager.
 */
declare class Gfx3TextureManager {
    textures: Map<string, Gfx3Texture>;
    constructor();
    /**
     * Loads asynchronously an image from a given path and returns it as a texture, caching it for future use.
     *
     * @param {string} path - The file path.
     * @param {GPUSamplerDescriptor} [samplerDescriptor] - The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
     * @param {boolean} [is8bit] - Determine if texture is 8bits encoded.
     * @param {string} storePath - The optionnal store file path.
     */
    loadTexture(path: string, samplerDescriptor?: GPUSamplerDescriptor, is8bit?: boolean, storePath?: string): Promise<Gfx3Texture>;
    /**
     * Load asynchronously an image from a given path and returns a texture with its mipmaps, caching it for future use.
     *
     * @param {string} path - The file path.
     * @param {GPUSamplerDescriptor} [samplerDescriptor] - The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
     * @param {boolean} [is8bit] - Determine if texture is 8bits encoded.
     * @param {string} storePath - The optionnal store file path.
     */
    loadTextureMips(path: string, samplerDescriptor?: GPUSamplerDescriptor, is8bit?: boolean, storePath?: string): Promise<Gfx3Texture>;
    /**
     * Load asynchronously a list of cubemap images from a given path and returns it as an texture, caching it for future use.
     * Note: Six images are required, each names postfixed by: right, left, top, bottom, front and back.
     *
     * @param {string} path - The file path excluding directions postfix.
     * @param {string} storePath - The optionnal store file path.
     */
    loadCubemapTexture(path: string, extension: string, storePath?: string): Promise<Gfx3Texture>;
    /**
     * Deletes a texture if it exists, otherwise it throws an error.
     *
     * @param {string} path - The file path.
     */
    deleteTexture(path: string): void;
    /**
     * Returns a texture or throws an error if doesn't exist.
     *
     * @param {string} path - The file path.
     */
    getTexture(path: string): Gfx3Texture;
    /**
     * Checks if a texture exists.
     *
     * @param {string} path - The path file.
     */
    hasTexture(path: string): boolean;
    /**
     * Deletes all stored textures.
     */
    releaseTextures(): void;
}
export { Gfx3TextureManager };
export declare const gfx3TextureManager: Gfx3TextureManager;
