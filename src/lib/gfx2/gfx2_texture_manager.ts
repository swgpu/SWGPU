/**
 * Singleton textures manager.
 */
class Gfx2TextureManager {
  textures: Map<string, ImageBitmap>;

  constructor() {
    this.textures = new Map<string, ImageBitmap>();
  }

  /**
   * Loads asynchronously an image from a given path, caching it for future use and returns it as an `ImageBitmap`.
   * 
   * @param {string} path - The file path.
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
   * Deletes a texture if it exists, otherwise it throws an error.
   * 
   * @param {string} path - The file path.
   */
  deleteTexture(path: string): void {
    if (!this.textures.has(path)) {
      throw new Error('Gfx2TextureManager::deleteTexture(): The texture file doesn\'t exist, cannot delete !');
    }

    this.textures.delete(path);
  }

  /**
   * Returns an `ImageBitmap` object for a given texture path, or throws an error if the texture doesn't exist.
   * 
   * @param {string} path - The file path.
   */
  getTexture(path: string): ImageBitmap {
    if (!this.textures.has(path)) {
      throw new Error('Gfx2TextureManager::getTexture(): The texture file doesn\'t exist, cannot get !');
    }

    return this.textures.get(path)!;
  }

  /**
   * Checks if texture exists.
   * 
   * @param {string} path - The file path.
   */
  hasTexture(path: string): boolean {
    return this.textures.has(path);
  }

  /**
   * Deletes all stored textures.
   */
  releaseTextures(): void {
    for (const path of this.textures.keys()) {
      this.textures.delete(path);
    }
  }
}

export { Gfx2TextureManager };
export const gfx2TextureManager = new Gfx2TextureManager();