# Gfx3TextureManager

Singleton 3D textures manager.
## Constructors
* **new Gfx3TextureManager**(): Gfx3TextureManager   
## Methods
* **deleteTexture**(path: string): void   
  * **path**: The file path.
* **getTexture**(path: string): Gfx3Texture   
  * **path**: The file path.
* **hasTexture**(path: string): boolean   
  * **path**: The path file.
* **loadCubemapTexture**(path: string, extension: string, storePath: string): Promise   
  * **path**: The file path excluding directions postfix.
  * **extension**
  * **storePath**: The optionnal store file path.
* **loadTexture**(path: string, samplerDescriptor: GPUSamplerDescriptor, is8bit: boolean, storePath: string): Promise   
  * **path**: The file path.
  * **samplerDescriptor**: The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
  * **is8bit**: Determine if texture is 8bits encoded.
  * **storePath**: The optionnal store file path.
* **loadTextureMips**(path: string, samplerDescriptor: GPUSamplerDescriptor, is8bit: boolean, storePath: string): Promise   
  * **path**: The file path.
  * **samplerDescriptor**: The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
  * **is8bit**: Determine if texture is 8bits encoded.
  * **storePath**: The optionnal store file path.
* **releaseTextures**(): void   
