/// <reference types="@webgpu/types" />
import { Gfx3Texture } from './gfx3_texture';
declare class Gfx3MipmapManager {
    #private;
    device: GPUDevice;
    sampler: GPUSampler;
    pipelines: Map<string, GPURenderPipeline>;
    shaderModule: GPUShaderModule;
    constructor();
    /**
     * Creates a GPU texture from a given bitmap image or canvas element with mips.
     *
     * @param {ImageBitmap | HTMLCanvasElement} [bitmap] - The source image.
     * @param {boolean} [is8bit=false] - Indicates whether the texture should be treated as an 8-bit texture or not.
     * @param {GPUSamplerDescriptor} [samplerDescriptor] - The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
     */
    createTextureFromBitmap(bitmap: ImageBitmap | HTMLCanvasElement, is8bit?: boolean, samplerDescriptor?: GPUSamplerDescriptor): Gfx3Texture;
    /**
     * Generates mipmaps for the given GPUTexture from the data in level 0.
     *
     * @param {GPUTexture} texture - Texture to generate mipmaps for.
     */
    generateMipmap(texture: GPUTexture): void;
}
export { Gfx3MipmapManager };
export declare const gfx3MipmapManager: Gfx3MipmapManager;
