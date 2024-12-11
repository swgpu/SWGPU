# Gfx3DynamicGroup

Interface to bind the uniform buffer and textures to the GPU pipeline.
Note: Used for multiple bind groups.
## Constructors
* **new Gfx3DynamicGroup**(device: GPUDevice, pipeline: GPURenderPipeline, groupIndex: number): Gfx3DynamicGroup   
  * **device**: The GPU device.
  * **pipeline**: The graphics pipeline.
  * **groupIndex**: The shader group index.
## Methods
* **allocate**(size: number): void   
  * **size**: The number of bind groups to allocate/duplicate.
* **beginWrite**(): void   
* **delete**(): void   
* **endWrite**(): void   
* **getBindGroup**(index: number): GPUBindGroup   
  * **index**: The index.
* **getSize**(): number   
* **setFloat**(binding: number, name: string, length: number): Float32Array   
  * **binding**: The binding index of the uniform in the shader program.
  * **name**: The name of the uniform.
  * **length**: The number of float.
* **setInteger**(binding: number, name: string, length: number): Uint32Array   
  * **binding**: The binding index of the uniform in the shader program.
  * **name**: The name of the uniform.
  * **length**: The number of integer.
* **write**(binding: number, data): void   
  * **binding**: The binding index of the uniform in the shader program.
  * **data**: The data buffer.
