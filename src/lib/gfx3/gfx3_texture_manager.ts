import { gfx3Manager } from './gfx3_manager';
import { Gfx3Texture } from './gfx3_texture';

/**
 * Singleton 3D textures manager.
 */
class Gfx3TextureManager {
  textures: Map<string, Gfx3Texture>;

  constructor() {
    this.textures = new Map<string, Gfx3Texture>();
  }

  /**
   * Loads asynchronously an image from a given path and returns it as a texture, caching it for future use.
   * 
   * @param {string} path - The file path.
   * @param {GPUSamplerDescriptor} [samplerDescriptor] - The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
   */
  async loadTexture(path: string, samplerDescriptor: GPUSamplerDescriptor = {}): Promise<Gfx3Texture> {
    if (this.textures.has(path)) {
      return this.textures.get(path)!;
    }

    const res = await fetch(path);
    const img = await res.blob();
    const bitmap = await createImageBitmap(img);
    const texture = gfx3Manager.createTextureFromBitmap(bitmap, false, samplerDescriptor);

    this.textures.set(path, texture);
    return texture;
  }

  /**
   * Load asynchronously an image from a given path and returns it as an 8bits texture, caching it for future use.
   * 
   * @param {string} path - The file path.
   * @param {GPUSamplerDescriptor} [samplerDescriptor] - The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
   */
  async loadTexture8bit(path: string, samplerDescriptor: GPUSamplerDescriptor = {}): Promise<Gfx3Texture> {
    if (this.textures.has(path)) {
      return this.textures.get(path)!;
    }

    const res = await fetch(path);
    const img = await res.blob();
    const bitmap = await createImageBitmap(img);
    const texture = gfx3Manager.createTextureFromBitmap(bitmap, true, samplerDescriptor);
    this.textures.set(path, texture);
    return texture;
  }

  /**
   * Load asynchronously a list of cubemap images from a given path and returns it as an texture, caching it for future use.
   * Note: Six images are required, each names postfixed by: right, left, top, bottom, front and back.
   * 
   * @param {string} path - The file path excluding directions postfix.
   */
  async loadCubemapTexture(path: string, extension: string): Promise<Gfx3Texture> {
    if (this.textures.has(path)) {
      return this.textures.get(path)!;
    }

    const dirs = ['right', 'left', 'top', 'bottom', 'front', 'back'];
    const bitmaps: Array<ImageBitmap> = [];

    for (const dir of dirs) {
      const res = await fetch(path + dir + '.' + extension);
      const img = await res.blob();
      const bitmap = await createImageBitmap(img);
      bitmaps.push(bitmap);
    }

    const texture = gfx3Manager.createCubeMapFromBitmap(bitmaps);
    this.textures.set(path, texture);
    return texture;
  }

  /**
   * Deletes a texture if it exists, otherwise it throws an error.
   * 
   * @param {string} path - The file path.
   */
  deleteTexture(path: string): void {
    if (!this.textures.has(path)) {
      throw new Error('Gfx3TextureManager::deleteTexture(): The texture file doesn\'t exist, cannot delete !');
    }

    const texture = this.textures.get(path)!;
    texture.gpuTexture.destroy();
    this.textures.delete(path);
  }

  /**
   * Returns a texture or throws an error if doesn't exist.
   * 
   * @param {string} path - The file path.
   */
  getTexture(path: string): Gfx3Texture {
    if (!this.textures.has(path)) {
      throw new Error('Gfx2TextureManager::getTexture(): The texture file doesn\'t exist, cannot get !');
    }

    return this.textures.get(path)!;
  }

  /**
   * Checks if a texture exists.
   * 
   * @param {string} path - The path file.
   */
  hasTexture(path: string): boolean {
    return this.textures.has(path);
  }

  /**
   * Deletes all stored textures.
   */
  releaseTextures(): void {
    for (const path of this.textures.keys()) {
      const texture = this.textures.get(path)!;
      texture.gpuTexture.destroy();
      this.textures.delete(path);
    }
  }
}

export { Gfx3TextureManager };
export const gfx3TextureManager = new Gfx3TextureManager();