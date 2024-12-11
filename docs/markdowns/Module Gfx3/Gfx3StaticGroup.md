# Gfx3StaticGroup

Interface to bind the uniform buffer and textures to the GPU pipeline.
Note: Used for one bind group.
## Constructors
* **new Gfx3StaticGroup**(device: GPUDevice, pipeline: GPURenderPipeline, groupIndex: number): Gfx3StaticGroup   
  * **device**: The GPU device.
  * **pipeline**: The graphics pipeline.
  * **groupIndex**: The shader group index.
## Methods
* **allocate**(): void   
* **beginWrite**(): void   
* **delete**(): void   
* **endWrite**(): void   
* **getBindGroup**(): GPUBindGroup   
* **setFloat**(binding: number, name: string, length: number): Float32Array   
  * **binding**: The binding index of the uniform in the shader program.
  * **name**: The name of the uniform.
  * **length**: The number of float.
* **setInteger**(binding: number, name: string, length: number): Uint32Array   
  * **binding**: The binding index of the uniform in the shader program.
  * **name**: The name of the uniform.
  * **length**: The number of integer.
* **setSampler**(binding: number, name: string, texture: Gfx3Texture): Gfx3Texture   
  * **binding**: The binding index of the uniform in the shader program.
  * **name**: The name of the uniform.
  * **texture**: The texture.
* **setTexture**(binding: number, name: string, texture: Gfx3Texture, createViewDescriptor: GPUTextureViewDescriptor): Gfx3Texture   
  * **binding**: The binding index of the uniform in the shader program.
  * **name**: The name of the uniform.
  * **texture**: The texture.
  * **createViewDescriptor**: Specify how the texture view should be created, such as the format, dimension, and mip
level range of the view.
* **write**(binding: number, data): void   
  * **binding**: The binding index of the uniform in the shader program.
  * **data**: The data buffer.
