# Gfx3MipmapManager

## Constructors
* **new Gfx3MipmapManager**(): Gfx3MipmapManager   
## Methods
* **createTextureFromBitmap**(bitmap, is8bit: boolean, samplerDescriptor: GPUSamplerDescriptor): Gfx3Texture   
  * **bitmap**: The source image.
  * **is8bit**: Indicates whether the texture should be treated as an 8-bit texture or not.
  * **samplerDescriptor**: The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
* **generateMipmap**(texture: GPUTexture): void   
  * **texture**: Texture to generate mipmaps for.
