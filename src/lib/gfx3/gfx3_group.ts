import { Gfx3Texture } from './gfx3_texture';

export const MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT = 256;

/**
 * The `Gfx3StaticGroup` class represents a group of static graphics resources, such as uniforms and
 * textures, that can be bound to a GPU render pipeline. It is called static because there is only one
 * possible allocation for this data-set (related to static-size of 1).
 */
class Gfx3StaticGroup {
  device: GPUDevice;
  pipeline: GPURenderPipeline;
  groupIndex: number;
  uniformsByteLength: number;
  uniforms: Map<number, { binding: number, name: string, size: number, alignment: number }>;
  textures: Map<number, { binding: number, name: string, resource: GPUTextureView | GPUSampler }>;
  buffer: GPUBuffer;
  currentOffset: number;
  bindGroup: GPUBindGroup | null;

  /**
   * This constructor.
   * @param {GPUDevice} device - The `device` parameter is an instance of the `GPUDevice` class. It
   * represents the GPU device that will be used for rendering.
   * @param {GPURenderPipeline} pipeline - The `pipeline` parameter is the graphics pipeline that will be used for rendering.
   * @param {number} groupIndex - The `groupIndex` parameter is used to identify which shader group is used
   * to binding the uniform buffer and textures to the GPU.
   */
  constructor(device: GPUDevice, pipeline: GPURenderPipeline, groupIndex: number) {
    this.device = device;
    this.pipeline = pipeline;
    this.groupIndex = groupIndex;
    this.uniformsByteLength = 0;
    this.uniforms = new Map();
    this.textures = new Map();
    this.buffer = device.createBuffer({ size: 16 * 4, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    this.currentOffset = 0;
    this.bindGroup = null;
  }

  /**
   * The "destroy" function destroys uniforms buffer.
   * Warning: you need to call this method to free allocation for this object.
   */
  destroy(): void {
    this.buffer.destroy();
  }

  /**
   * The "setFloat" function sets a float bindgroup entry and returns a Float32Array of the specified
   * length.
   * @param {number} binding - The `binding` parameter is a number that represents the binding index.
   * It is used to identify the specific uniform in the shader program.
   * @param {string} name - The `name` parameter is a string that represents the name of the uniform variable.
   * It is used for identification purposes and can be any string value.
   * @param {number} length - The `length` parameter represents the number of float elements in the
   * uniform.
   * @returns A new Float32Array with the specified length is being returned.
   */
  setFloat(binding: number, name: string, length: number): Float32Array {
    let byteLength = length * 4;
    let alignment = Math.ceil(byteLength / 256) * MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT;
    this.uniforms.set(binding, { binding: binding, name: name, size: byteLength, alignment: alignment });
    this.uniformsByteLength += alignment;
    return new Float32Array(length);
  }

  /**
   * The "setInteger" function sets a integer bindgroup entry and returns a Uint32Array of the specified
   * length.
   * @param {number} binding - The `binding` parameter is a number that represents the binding index.
   * It is used to identify the specific uniform in the shader program.
   * @param {string} name - The `name` parameter is a string that represents the name of the uniform variable.
   * It is used for identification purposes and can be any string value.
   * @param {number} length - The `length` parameter represents the number of integer elements in the
   * uniform.
   * @returns A new Uint32Array with the specified length is being returned.
   */
  setInteger(binding: number, name: string, length: number): Uint32Array {
    let byteLength = length * 4;
    let alignment = Math.ceil(byteLength / 256) * MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT;
    this.uniforms.set(binding, { binding: binding, name: name, size: byteLength, alignment: alignment });
    this.uniformsByteLength += alignment;
    return new Uint32Array(length);
  }

  /**
   * The "setTexture" function sets a texture and sampler resource for a given bindgroup entry.
   * @param {number} binding - The `binding` parameter is a number that represents the binding index.
   * It is used to identify the specific uniform in the shader program.
   * @param {string} name - The name of the texture. It is used for identification purposes and can be
   * any string value.
   * @param {Gfx3Texture} texture - The `texture` parameter is of type `Gfx3Texture`.
   * @param {GPUTextureViewDescriptor} createViewDescriptor - The `createViewDescriptor` parameter is an
   * optional object that contains properties used to create a GPUTextureViewDescriptor. This descriptor
   * is used to specify how the texture view should be created, such as the format, dimension, and mip
   * level range of the view.
   * @returns the `texture` parameter that was passed in.
   */
  setTexture(binding: number, name: string, texture: Gfx3Texture, createViewDescriptor: GPUTextureViewDescriptor = {}): Gfx3Texture {
    this.textures.set(binding, { binding: binding, name: name, resource: texture.gpuTexture.createView(createViewDescriptor) });
    this.textures.set(binding + 1, { binding: binding + 1, name: name, resource: texture.gpuSampler });
    return texture;
  }

  /**
   * The "allocate" function creates a bind group with the provided uniforms and textures entries.
   */
  allocate(): void {
    if (this.buffer.size != this.uniformsByteLength) {
      this.buffer.destroy();
      this.buffer = this.device.createBuffer({ size: this.uniformsByteLength, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
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
   * The "beginWrite" function prepare the uniform buffer to write process.
   */
  beginWrite(): void {
    this.currentOffset = 0;
  }

  /**
   * The "write" function writes data to a buffer and updates the current offset.
   * Warning: You need to call this method before write your data.
   * @param {number} index - The binding index of uniform. It is used for identification purposes and can be
   * any number value.
   * @param {Float32Array | Uint32Array} data - The `data` parameter can be either a `Float32Array` or a
   * `Uint32Array`. It represents the data that will be written to the buffer.
   */
  write(index: number, data: Float32Array | Uint32Array): void {
    this.device.queue.writeBuffer(this.buffer, this.currentOffset, data);
    this.currentOffset += Math.ceil(data.byteLength / 256) * MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT;
  }

  /**
   * The `endWrite` function close the write process.
   */
  endWrite(): void {
    this.currentOffset = 0;
  }

  /**
   * The "getBindGroup" function returns the bind group.
   * @returns The bindgroup.
   */
  getBindGroup(): GPUBindGroup {
    return this.bindGroup!;
  }
}

/**
 * The `Gfx3DynamicGroup` class represents a group of dynamic graphics resources, such as uniforms
 * that can be bound to a GPU render pipeline. It is called dynamic because we are not limited to one
 * possible allocation like static-group but as many you need for this data-set (related to dynamic-size of n).
 */
class Gfx3DynamicGroup {
  device: GPUDevice;
  pipeline: GPURenderPipeline;
  groupIndex: number;
  uniformsByteLength: number;
  uniforms: Map<number, { binding: number, name: string, size: number, alignment: number }>;
  buffer: GPUBuffer;
  currentOffset: number;
  bindGroups: Array<GPUBindGroup>;
  size: number;

  /**
   * This constructor.
   * @param {GPUDevice} device - The `device` parameter is an instance of the `GPUDevice` class. It
   * represents the GPU device that will be used for rendering.
   * @param {GPURenderPipeline} pipeline - The `pipeline` parameter is the graphics pipeline that will be used for rendering.
   * @param {number} groupIndex - The `groupIndex` parameter is used to identify which shader group is used
   * to binding the uniform buffer and textures to the GPU.
   */
  constructor(device: GPUDevice, pipeline: GPURenderPipeline, groupIndex: number) {
    this.device = device;
    this.pipeline = pipeline;
    this.groupIndex = groupIndex;
    this.uniformsByteLength = 0;
    this.uniforms = new Map();
    this.buffer = device.createBuffer({ size: 16 * 4, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    this.currentOffset = 0;    
    this.bindGroups = [];
    this.size = 0;
  }

  /**
   * The "destroy" function destroys uniforms buffer.
   * Warning: you need to call this method to free allocation for this object.
   */
  delete(): void {
    this.buffer.destroy();
    this.bindGroups = [];
  }

  /**
   * The "setFloat" function sets a float bindgroup entry and returns a Float32Array of the specified
   * length.
   * @param {number} binding - The `binding` parameter is a number that represents the binding index.
   * It is used to identify the specific uniform in the shader program.
   * @param {string} name - The `name` parameter is a string that represents the name of the uniform variable.
   * It is used for identification purposes and can be any string value.
   * @param {number} length - The `length` parameter represents the number of float elements in the
   * uniform.
   * @returns A new Float32Array with the specified length is being returned.
   */
  setFloat(binding: number, name: string, length: number): Float32Array {
    let byteLength = length * 4;
    let alignment = Math.ceil(byteLength / 256) * MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT;
    this.uniforms.set(binding, { binding: binding, name: name, size: byteLength, alignment: alignment });
    this.uniformsByteLength += alignment;
    return new Float32Array(length);
  }

  /**
   * The "setInteger" function sets a integer bindgroup entry and returns a Uint32Array of the specified
   * length.
   * @param {number} binding - The `binding` parameter is a number that represents the binding index.
   * It is used to identify the specific uniform in the shader program.
   * @param {string} name - The `name` parameter is a string that represents the name of the uniform variable.
   * It is used for identification purposes and can be any string value.
   * @param {number} length - The `length` parameter represents the number of integer elements in the
   * uniform.
   * @returns A new Uint32Array with the specified length is being returned.
   */
  setInteger(binding: number, name: string, length: number): Uint32Array {
    let byteLength = length * 4;
    let alignment = Math.ceil(byteLength / 256) * MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT;
    this.uniforms.set(binding, { binding: binding, name: name, size: byteLength, alignment: alignment });
    this.uniformsByteLength += alignment;
    return new Uint32Array(length);
  }

  /**
   * The `allocate` function creates n-size bind groups with the provided uniforms entries.
   * @param {number} [size=1] - The `size` parameter in the `allocate` function is the number of bind
   * groups to allocate. It determines how many bind groups will be created and stored in the
   * `bindGroups` array. Each bind group represents a set of resources that can be bound to a shader
   * pipeline for rendering.
   */
  allocate(size: number = 1): void {    
    this.bindGroups = [];

    if (this.buffer.size != size * this.uniformsByteLength) {
      this.buffer.destroy();
      this.buffer = this.device.createBuffer({ size: size * this.uniformsByteLength, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
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
   * The "beginWrite" function prepare the uniform buffer to write process.
   */
  beginWrite(): void {
    this.currentOffset = 0;
  }

  /**
   * The "write" function writes data to a buffer and updates the current offset.
   * Warning: You need to call this method before write your data.
   * @param {number} index - The binding index of uniform. It is used for identification purposes and can be
   * any number value.
   * @param {Float32Array | Uint32Array} data - The `data` parameter can be either a `Float32Array` or a
   * `Uint32Array`. It represents the data that will be written to the buffer.
   */
  write(index: number, data: Float32Array | Uint32Array): void {
    this.device.queue.writeBuffer(this.buffer, this.currentOffset, data);
    this.currentOffset += Math.ceil(data.byteLength / 256) * MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT;
  }

  /**
   * The `endWrite` function close the write process.
   */
  endWrite(): void {
    this.currentOffset = 0;
  }

  /**
   * The getBindGroup function returns the bind group at index i.
   * @param {number} [i=0] - The bind group index.
   * @returns The bind group.
   */
  getBindGroup(i: number = 0): GPUBindGroup {
    return this.bindGroups[i];
  }

  /**
   * The "getSize" function returns the number of bindgroups.
   * @returns The number of bindgroups.
   */
  getSize(): number {
    return this.size;
  }
}

export { Gfx3StaticGroup, Gfx3DynamicGroup };