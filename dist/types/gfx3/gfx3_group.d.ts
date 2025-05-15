/// <reference types="@webgpu/types" />
import { Gfx3Texture, Gfx3RenderingTexture } from './gfx3_texture';
export declare const MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT = 256;
/**
 * Interface to bind the uniform buffer and textures to the GPU pipeline.
 * Note: Used for one bind group.
 */
declare class Gfx3StaticGroup {
    device: GPUDevice;
    pipeline: GPURenderPipeline;
    groupIndex: number;
    uniformsByteLength: number;
    uniforms: Map<number, {
        binding: number;
        name: string;
        size: number;
        alignment: number;
    }>;
    textures: Map<number, {
        binding: number;
        name: string;
        resource: GPUTextureView | GPUSampler;
    }>;
    buffer: GPUBuffer;
    currentOffset: number;
    bindGroup: GPUBindGroup | null;
    /**
     * @param {GPUDevice} device - The GPU device.
     * @param {GPURenderPipeline} pipeline - The graphics pipeline.
     * @param {number} groupIndex - The shader group index.
     */
    constructor(device: GPUDevice, pipeline: GPURenderPipeline, groupIndex: number);
    /**
     * Destroys the GPU buffer.
     * Warning: you need to call this method to free allocation for this object.
     */
    delete(): void;
    /**
     * Set a float-typed uniform entry and returns a writable buffer.
     *
     * @param {number} binding - The binding index of the uniform in the shader program.
     * @param {string} name - The name of the uniform.
     * @param {number} length - The number of float.
     */
    setFloat(binding: number, name: string, length: number): Float32Array;
    /**
     * Set a integer-typed uniform entry and returns a writable buffer.
     *
     * @param {number} binding - The binding index of the uniform in the shader program.
     * @param {string} name - The name of the uniform.
     * @param {number} length - The number of integer.
     */
    setInteger(binding: number, name: string, length: number): Uint32Array;
    /**
     * Set a texture resource for uniform entry.
     *
     * @param {number} binding - The binding index of the uniform in the shader program.
     * @param {string} name - The name of the uniform.
     * @param {Gfx3Texture} texture - The texture.
     * @param {GPUTextureViewDescriptor} createViewDescriptor - Specify how the texture view should be created, such as the format, dimension, and mip
     * level range of the view.
     */
    setTexture(binding: number, name: string, texture: Gfx3Texture, createViewDescriptor?: GPUTextureViewDescriptor): Gfx3Texture;
    setRenderingTexture(binding: number, name: string, texture: Gfx3RenderingTexture): Gfx3RenderingTexture;
    /**
     * Set a sampler resource for uniform entry.
     *
     * @param {number} binding - The binding index of the uniform in the shader program.
     * @param {string} name - The name of the uniform.
     * @param {Gfx3Texture} texture - The texture.
     * @param {GPUTextureViewDescriptor} createViewDescriptor - Specify how the texture view should be created, such as the format, dimension, and mip
     * level range of the view.
     */
    setSampler(binding: number, name: string, texture: Gfx3Texture): Gfx3Texture;
    setRenderingSampler(binding: number, name: string, texture: Gfx3RenderingTexture): Gfx3RenderingTexture;
    /**
     * Creates a bind group with the provided uniforms and textures entries.
     */
    allocate(): void;
    /**
     * Prepare to write process.
     * Warning: You need to call this method before write your data.
     */
    beginWrite(): void;
    /**
     * Write data buffer to the uniform buffer.
     *
     * @param {number} binding - The binding index of the uniform in the shader program.
     * @param {Float32Array | Uint32Array} data - The data buffer.
     */
    write(binding: number, data: Float32Array | Uint32Array): void;
    /**
     * Close the write process.
     */
    endWrite(): void;
    /**
     * Returns the bind group.
     */
    getBindGroup(): GPUBindGroup;
}
/**
 * Interface to bind the uniform buffer and textures to the GPU pipeline.
 * Note: Used for multiple bind groups.
 */
declare class Gfx3DynamicGroup {
    device: GPUDevice;
    pipeline: GPURenderPipeline;
    groupIndex: number;
    uniformsByteLength: number;
    uniforms: Map<number, {
        binding: number;
        name: string;
        size: number;
        alignment: number;
    }>;
    buffer: GPUBuffer;
    currentOffset: number;
    bindGroups: Array<GPUBindGroup>;
    size: number;
    /**
     * @param {GPUDevice} device - The GPU device.
     * @param {GPURenderPipeline} pipeline - The graphics pipeline.
     * @param {number} groupIndex - The shader group index.
     */
    constructor(device: GPUDevice, pipeline: GPURenderPipeline, groupIndex: number);
    /**
     * Destroys the GPU buffer.
     * Warning: you need to call this method to free allocation for this object.
     */
    delete(): void;
    /**
     * Set a float-typed uniform entry and returns a writable buffer.
     *
     * @param {number} binding - The binding index of the uniform in the shader program.
     * @param {string} name - The name of the uniform.
     * @param {number} length - The number of float.
     */
    setFloat(binding: number, name: string, length: number): Float32Array;
    /**
     * Set a integer-typed uniform entry and returns a writable buffer.
     *
     * @param {number} binding - The binding index of the uniform in the shader program.
     * @param {string} name - The name of the uniform.
     * @param {number} length - The number of integer.
     */
    setInteger(binding: number, name: string, length: number): Uint32Array;
    /**
     * Creates multiple bind groups with the provided uniforms entries.
     *
     * @param {number} [size=1] - The number of bind groups to allocate/duplicate.
     */
    allocate(size?: number): void;
    /**
      * Prepare to write process.
      * Warning: You need to call this method before write your data.
      */
    beginWrite(): void;
    /**
     * Write data buffer to the uniform buffer.
     *
     * @param {number} binding - The binding index of the uniform in the shader program.
     * @param {Float32Array | Uint32Array} data - The data buffer.
     */
    write(binding: number, data: Float32Array | Uint32Array): void;
    /**
     * Close the write process.
     */
    endWrite(): void;
    /**
     * Returns the bind group at specified index.
     *
     * @param {number} [index=0] - The index.
     */
    getBindGroup(index?: number): GPUBindGroup;
    /**
     * Returns the number of bind groups.
     */
    getSize(): number;
}
export { Gfx3StaticGroup, Gfx3DynamicGroup };
