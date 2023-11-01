import { gfx3Manager } from './gfx3_manager';
import { Gfx3Texture } from './gfx3_texture';

/**
 * The `Gfx3TextureManager` class is a singleton responsible for managing, loading, caching, and deleting
 * textures represented as `Gfx3Texture` objects.
 */
class Gfx3TextureManager {
  textures: Map<string, Gfx3Texture>;

  /**
   * The constructor.
   */
  constructor() {
    this.textures = new Map<string, Gfx3Texture>();
  }

  /**
   * The "loadTexture" function asynchronously loads an image from a given path and returns it as an
   * `Gfx3Texture`, caching it for future use.
   * @param {string} path - The file path or URL of the image that you want to load as a texture.
   * @param {GPUSamplerDescriptor} [samplerDescriptor] - The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
   * @returns a Promise that resolves when texture is loaded.
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
   * The "loadTexture8bit" function asynchronously loads an image from a given path and returns it as an
   * 8bits `Gfx3Texture`, caching it for future use.
   * @param {string} path - The file path or URL of the image that you want to load as a texture.
   * @param {GPUSamplerDescriptor} [samplerDescriptor] - The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
   * @returns a Promise that resolves when texture is loaded.
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
   * The "loadCubemapTexture" function asynchronously loads an cubemap image from a given path and returns it as an
   * `Gfx3Texture`, caching it for future use.
   * These objects represent the six faces of a cube map texture. Each face should have the same
   * size.
   * @param {string} path - The file path or URL of the cubemap image that you want to load as a texture.
   * @returns a Promise that resolves when texture is loaded.
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
   * The "deleteTexture" function deletes a texture if it exists, otherwise it throws an error.
   * @param {string} path - The path to the texture file.
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
   * The "getTexture" function returns an `ImageBitmap` object for a given texture path, or throws an
   * error if the texture doesn't exist.
   * @param {string} path - The path to the texture file.
   * @returns an ImageBitmap.
   */
  getTexture(path: string): Gfx3Texture {
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
      const texture = this.textures.get(path)!;
      texture.gpuTexture.destroy();
      this.textures.delete(path);
    }
  }
}

export { Gfx3TextureManager };
export const gfx3TextureManager = new Gfx3TextureManager();