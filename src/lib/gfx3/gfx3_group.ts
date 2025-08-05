import { Gfx3Texture, Gfx3RenderingTexture } from './gfx3_texture';

export const MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT = 256;

/**
 * Interface to bind the uniform buffer and textures to the GPU pipeline.
 * Note: Used for one bind group.
 */
class Gfx3StaticGroup {
  device: GPUDevice;
  pipeline: GPURenderPipeline;
  groupIndex: number;
  usage: GPUBufferUsageFlags;
  uniformsByteLength: number;
  uniforms: Map<number, { binding: number, name: string, size: number, alignment: number }>;
  textures: Map<number, { binding: number, name: string, resource: GPUTextureView | GPUSampler }>;
  buffer: GPUBuffer;
  currentOffset: number;
  bindGroup: GPUBindGroup | null;

  /**
   * @param {GPUDevice} device - The GPU device.
   * @param {GPURenderPipeline} pipeline - The graphics pipeline.
   * @param {number} groupIndex - The shader group index.
   * @param {GPUBufferUsageFlags} usage - The buffer usage type (uniform, storage etc...).
   */
  constructor(device: GPUDevice, pipeline: GPURenderPipeline, groupIndex: number, usage: GPUBufferUsageFlags) {
    this.device = device;
    this.pipeline = pipeline;
    this.groupIndex = groupIndex;
    this.usage = usage;
    this.uniformsByteLength = 0;
    this.uniforms = new Map();
    this.textures = new Map();
    this.buffer = device.createBuffer({ size: 16 * 4, usage: this.usage });
    this.currentOffset = 0;
    this.bindGroup = null;
  }

  /**
   * Destroys the GPU buffer.
   * Warning: you need to call this method to free allocation for this object.
   */
  delete(): void {
    this.buffer.destroy();
  }

  /**
   * Set a float-typed uniform entry and returns a writable buffer.
   * 
   * @param {number} binding - The binding index of the uniform in the shader program.
   * @param {string} name - The name of the uniform.
   * @param {number} length - The number of float.
   */
  setFloat(binding: number, name: string, length: number): Float32Array {
    const byteLength = length * 4;
    const alignment = Math.ceil(byteLength / 256) * MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT;
    this.uniforms.set(binding, { binding: binding, name: name, size: byteLength, alignment: alignment });
    this.uniformsByteLength += alignment;
    return new Float32Array(length);
  }

  setStorageFloat(binding: number, name: string, length: number): Float32Array {
    const byteLength = length * 4;
    this.uniforms.set(binding, { binding, name, size: byteLength, alignment: byteLength });
    this.uniformsByteLength += byteLength;
    return new Float32Array(length);
  }

  /**
   * Set a integer-typed uniform entry and returns a writable buffer.
   * 
   * @param {number} binding - The binding index of the uniform in the shader program.
   * @param {string} name - The name of the uniform.
   * @param {number} length - The number of integer.
   */
  setInteger(binding: number, name: string, length: number): Uint32Array {
    const byteLength = length * 4;
    const alignment = Math.ceil(byteLength / 256) * MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT;
    this.uniforms.set(binding, { binding: binding, name: name, size: byteLength, alignment: alignment });
    this.uniformsByteLength += alignment;
    return new Uint32Array(length);
  }

  setStorageInteger(binding: number, name: string, length: number): Uint32Array {
    const byteLength = length * 4;
    this.uniforms.set(binding, { binding, name, size: byteLength, alignment: byteLength });
    this.uniformsByteLength += byteLength;
    return new Uint32Array(length);
  }

  /**
   * Set a texture resource for uniform entry.
   * 
   * @param {number} binding - The binding index of the uniform in the shader program.
   * @param {string} name - The name of the uniform.
   * @param {Gfx3Texture} texture - The texture.
   * @param {GPUTextureViewDescriptor} createViewDescriptor - Specify how the texture view should be created, such as the format, dimension, and mip
   * level range of the view.
   */
  setTexture(binding: number, name: string, texture: Gfx3Texture, createViewDescriptor: GPUTextureViewDescriptor = {}): Gfx3Texture {
    this.textures.set(binding, { binding: binding, name: name, resource: texture.gpuTexture.createView(createViewDescriptor) });
    return texture;
  }

  setRenderingTexture(binding: number, name: string, texture: Gfx3RenderingTexture): Gfx3RenderingTexture {
    this.textures.set(binding, { binding: binding, name: name, resource: texture.gpuTextureView });
    return texture;
  }

  /**
   * Set a sampler resource for uniform entry.
   * 
   * @param {number} binding - The binding index of the uniform in the shader program.
   * @param {string} name - The name of the uniform.
   * @param {Gfx3Texture} texture - The texture.
   * @param {GPUTextureViewDescriptor} createViewDescriptor - Specify how the texture view should be created, such as the format, dimension, and mip
   * level range of the view.
   */
  setSampler(binding: number, name: string, texture: Gfx3Texture): Gfx3Texture {
    this.textures.set(binding, { binding: binding, name: name, resource: texture.gpuSampler });
    return texture;
  }

  setRenderingSampler(binding: number, name: string, texture: Gfx3RenderingTexture): Gfx3RenderingTexture {
    this.textures.set(binding, { binding: binding, name: name, resource: texture.gpuSampler });
    return texture;
  }

  /**
   * Creates a bind group with the provided uniforms and textures entries.
   */
  allocate(): void {
    if (this.buffer.size != this.uniformsByteLength) {
      this.buffer.destroy();
      this.buffer = this.device.createBuffer({ size: this.uniformsByteLength, usage: this.usage });
    }

    let entries: Array<GPUBindGroupEntry> = [];
    let offset = 0;

    for (const uniform of this.uniforms.values()) {
      entries[uniform.binding] = { binding: uniform.binding, resource: { buffer: this.buffer, offset: offset, size: uniform.size } };
      offset += uniform.alignment;
    }

    for (const texture of this.textures.values()) {
      entries[texture.binding] = { binding: texture.binding, resource: texture.resource };
    }

    this.bindGroup = this.device.createBindGroup({ layout: this.pipeline.getBindGroupLayout(this.groupIndex), entries: entries });
  }

  /**
   * Prepare to write process.
   * Warning: You need to call this method before write your data.
   */
  beginWrite(): void {
    this.currentOffset = 0;
  }

  /**
   * Write data buffer to the uniform buffer.
   * 
   * @param {number} binding - The binding index of the uniform in the shader program.
   * @param {Float32Array | Uint32Array} data - The data buffer.
   */
  write(binding: number, data: Float32Array | Uint32Array): void {
    this.device.queue.writeBuffer(this.buffer, this.currentOffset, data);
    this.currentOffset += Math.ceil(data.byteLength / 256) * MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT;
  }

  writeStorage(binding: number, data: Float32Array | Uint32Array): void {
    this.device.queue.writeBuffer(this.buffer, this.currentOffset, data);
    this.currentOffset += data.byteLength;
  }

  /**
   * Close the write process.
   */
  endWrite(): void {
    this.currentOffset = 0;
  }

  /**
   * Returns the bind group.
   */
  getBindGroup(): GPUBindGroup {
    return this.bindGroup!;
  }

  /**
   * Set a new pipeline.
   * Of course, you need to call allocate() after setPipeline().
   * 
   * @param {GPURenderPipeline} pipeline - The new pipeline.
   */
  setPipeline(pipeline: GPURenderPipeline): void {
    this.pipeline = pipeline;
  }
}

/**
 * Interface to bind the uniform buffer and textures to the GPU pipeline.
 * Note: Used for multiple bind groups.
 */
class Gfx3DynamicGroup {
  device: GPUDevice;
  pipeline: GPURenderPipeline;
  groupIndex: number;
  usage: GPUBufferUsageFlags;
  uniformsByteLength: number;
  uniforms: Map<number, { binding: number, name: string, size: number, alignment: number }>;
  buffer: GPUBuffer;
  currentOffset: number;
  bindGroups: Array<GPUBindGroup>;
  size: number;

  /**
   * @param {GPUDevice} device - The GPU device.
   * @param {GPURenderPipeline} pipeline - The graphics pipeline.
   * @param {number} groupIndex - The shader group index.
   * @param {GPUBufferUsageFlags} usage - The buffer usage type (uniform, storage etc...).
   */
  constructor(device: GPUDevice, pipeline: GPURenderPipeline, groupIndex: number, usage: GPUBufferUsageFlags) {
    this.device = device;
    this.pipeline = pipeline;
    this.groupIndex = groupIndex;
    this.usage = usage;
    this.uniformsByteLength = 0;
    this.uniforms = new Map();
    this.buffer = device.createBuffer({ size: 16 * 4, usage: this.usage });
    this.currentOffset = 0;    
    this.bindGroups = [];
    this.size = 0;
  }

  /**
   * Destroys the GPU buffer.
   * Warning: you need to call this method to free allocation for this object.
   */
  delete(): void {
    this.buffer.destroy();
    this.bindGroups = [];
  }

  /**
   * Set a float-typed uniform entry and returns a writable buffer.
   * 
   * @param {number} binding - The binding index of the uniform in the shader program.
   * @param {string} name - The name of the uniform.
   * @param {number} length - The number of float.
   */
  setFloat(binding: number, name: string, length: number): Float32Array {
    const byteLength = length * 4;
    const alignment = Math.ceil(byteLength / 256) * MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT;
    this.uniforms.set(binding, { binding: binding, name: name, size: byteLength, alignment: alignment });
    this.uniformsByteLength += alignment;
    return new Float32Array(length);
  }

  setStorageFloat(binding: number, name: string, length: number): Float32Array {
    const byteLength = length * 4;
    this.uniforms.set(binding, { binding, name, size: byteLength, alignment: byteLength });
    this.uniformsByteLength += byteLength;
    return new Float32Array(length);
  }

  /**
   * Set a integer-typed uniform entry and returns a writable buffer.
   * 
   * @param {number} binding - The binding index of the uniform in the shader program.
   * @param {string} name - The name of the uniform.
   * @param {number} length - The number of integer.
   */
  setInteger(binding: number, name: string, length: number): Uint32Array {
    const byteLength = length * 4;
    const alignment = Math.ceil(byteLength / 256) * MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT;
    this.uniforms.set(binding, { binding: binding, name: name, size: byteLength, alignment: alignment });
    this.uniformsByteLength += alignment;
    return new Uint32Array(length);
  }

  setStorageInteger(binding: number, name: string, length: number): Uint32Array {
    const byteLength = length * 4;
    this.uniforms.set(binding, { binding, name, size: byteLength, alignment: byteLength });
    this.uniformsByteLength += byteLength;
    return new Uint32Array(length);
  }

  /**
   * Creates multiple bind groups with the provided uniforms entries.
   * 
   * @param {number} [size=1] - The number of bind groups to allocate/duplicate.
   */
  allocate(size: number = 1): void {    
    this.bindGroups = [];

    if (this.buffer.size != size * this.uniformsByteLength) {
      this.buffer.destroy();
      this.buffer = this.device.createBuffer({ size: size * this.uniformsByteLength, usage: this.usage });
    }

    for (let i = 0, offset = 0, entries: Array<GPUBindGroupEntry> = []; i < size; i++) {
      for (const uniform of this.uniforms.values()) {
        entries[uniform.binding] = { binding: uniform.binding, resource: { buffer: this.buffer, offset: offset, size: uniform.size } };
        offset += uniform.alignment;
      }

      this.bindGroups.push(this.device.createBindGroup({ layout: this.pipeline.getBindGroupLayout(this.groupIndex), entries: entries }));
    }

    this.size = size;
  }

 /**
   * Prepare to write process.
   * Warning: You need to call this method before write your data.
   */
  beginWrite(): void {
    this.currentOffset = 0;
  }

  /**
   * Write data buffer to the uniform buffer.
   * 
   * @param {number} binding - The binding index of the uniform in the shader program.
   * @param {Float32Array | Uint32Array} data - The data buffer.
   */
  write(binding: number, data: Float32Array | Uint32Array): void {
    this.device.queue.writeBuffer(this.buffer, this.currentOffset, data);
    this.currentOffset += Math.ceil(data.byteLength / 256) * MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT;
  }

  writeStorage(binding: number, data: Float32Array | Uint32Array): void {
    this.device.queue.writeBuffer(this.buffer, this.currentOffset, data);
    this.currentOffset += data.byteLength;
  }

  /**
   * Close the write process.
   */
  endWrite(): void {
    this.currentOffset = 0;
  }

  /**
   * Returns the bind group at specified index.
   * 
   * @param {number} [index=0] - The index.
   */
  getBindGroup(index: number = 0): GPUBindGroup {
    return this.bindGroups[index];
  }

  /**
   * Returns the number of bind groups.
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Set a new pipeline.
   * Of course, you need to call allocate() after setPipeline().
   * 
   * @param {GPURenderPipeline} pipeline - The new pipeline.
   */
  setPipeline(pipeline: GPURenderPipeline): void {
    this.pipeline = pipeline;
  }
}

export { Gfx3StaticGroup, Gfx3DynamicGroup };