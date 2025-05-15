/**
 * Singleton textures manager.
 */
declare class Gfx2TextureManager {
    textures: Map<string, ImageBitmap>;
    constructor();
    /**
     * Loads asynchronously an image from a given path, caching it for future use and returns it as an `ImageBitmap`.
     *
     * @param {string} path - The file path.
     * @param {string} storePath - The optionnal store file path.
     */
    loadTexture(path: string, storePath?: string): Promise<ImageBitmap>;
    /**
     * Deletes a texture if it exists, otherwise it throws an error.
     *
     * @param {string} path - The file path.
     */
    deleteTexture(path: string): void;
    /**
     * Returns an `ImageBitmap` object for a given texture path, or throws an error if the texture doesn't exist.
     *
     * @param {string} path - The file path.
     */
    getTexture(path: string): ImageBitmap;
    /**
     * Checks if texture exists.
     *
     * @param {string} path - The file path.
     */
    hasTexture(path: string): boolean;
    /**
     * Deletes all stored textures.
     */
    releaseTextures(): void;
}
export { Gfx2TextureManager };
export declare const gfx2TextureManager: Gfx2TextureManager;
