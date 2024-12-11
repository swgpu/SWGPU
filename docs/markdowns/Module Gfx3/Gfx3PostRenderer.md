# Gfx3PostRenderer

Singleton post-processing effects renderer.
- inherit from: Gfx3RendererAbstract
## Constructors
* **new Gfx3PostRenderer**(): Gfx3PostRenderer   
## Methods
* **getCustomParam**(name: string): number   
  * **name**: The param name.
* **getParam**(index: number): number   
  * **index**
* **getSourceTexture**(): GPUTexture   
* **render**(ts: number, destinationTexture: GPUTexture): void   
  * **ts**
  * **destinationTexture**
* **setCustomParam**(name: string, value: number): void   
  * **name**: The param name.
  * **value**: The param value.
* **setCustomTextures**(textures): void   
  * **textures**: The textures list.
* **setParam**(index: number, value: number): void   
  * **index**: The param index.
  * **value**: The value.
* **setSourceTexture**(sourceTexture: Gfx3Texture): void   
  * **sourceTexture**: The source texture.
