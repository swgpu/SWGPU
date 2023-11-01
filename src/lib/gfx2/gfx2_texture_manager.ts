/**
 * The `Gfx2TextureManager` class is a singleton responsible for managing, loading, caching, and deleting
 * textures represented as `ImageBitmap` objects.
 */
class Gfx2TextureManager {
  textures: Map<string, ImageBitmap>;

  /**
   * The constructor.
   */
  constructor() {
    this.textures = new Map<string, ImageBitmap>();
  }

  /**
   * The "loadTexture" function asynchronously loads an image from a given path and returns it as an
   * `ImageBitmap`, caching it for future use.
   * @param {string} path - The file path or URL of the image that you want to load as a texture.
   * @returns a Promise that resolves when texture is loaded.
   */
  async loadTexture(path: string): Promise<ImageBitmap> {
    if (this.textures.has(path)) {
      return this.textures.get(path)!;
    }

    const res = await fetch(path);
    const img = await res.blob();
    const bitmap = await createImageBitmap(img);
    this.textures.set(path, bitmap);
    return bitmap;
  }

  /**
   * The "deleteTexture" function deletes a texture if it exists, otherwise it throws an error.
   * @param {string} path - The path to the texture file.
   */
  deleteTexture(path: string): void {
    if (!this.textures.has(path)) {
      throw new Error('Gfx2TextureManager::deleteTexture(): The texture file doesn\'t exist, cannot delete !');
    }

    this.textures.delete(path);
  }

  /**
   * The "getTexture" function returns an `ImageBitmap` object for a given texture path, or throws an
   * error if the texture doesn't exist.
   * @param {string} path - The path to the texture file.
   * @returns an ImageBitmap.
   */
  getTexture(path: string): ImageBitmap {
    if (!this.textures.has(path)) {
      throw new Error('Gfx2TextureManager::getTexture(): The texture file doesn\'t exist, cannot get !');
    }

    return this.textures.get(path)!;
  }

  /**
   * The "hasTexture" function checks if a texture exists in the manager.
   * @param {string} path - The path of the texture file.
   * @returns A boolean value indicating if the texture is found or not.
   */
  hasTexture(path: string): boolean {
    return this.textures.has(path);
  }

  /**
   * The "releaseTextures" function deletes all the textures stored in the manager.
   */
  releaseTextures(): void {
    for (const path of this.textures.keys()) {
      this.textures.delete(path);
    }
  }
}

export { Gfx2TextureManager };
export const gfx2TextureManager = new Gfx2TextureManager();