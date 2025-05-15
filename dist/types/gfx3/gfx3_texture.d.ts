/// <reference types="@webgpu/types" />
export interface Gfx3Texture {
    gpuTexture: GPUTexture;
    gpuSampler: GPUSampler;
}
export interface Gfx3RenderingTexture {
    gpuTexture: GPUTexture;
    gpuSampler: GPUSampler;
    gpuTextureView: GPUTextureView;
}
