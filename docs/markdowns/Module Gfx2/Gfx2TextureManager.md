# Gfx2TextureManager

Singleton textures manager.
## Constructors
* **new Gfx2TextureManager**(): Gfx2TextureManager   
## Methods
* **deleteTexture**(path: string): void   
  * **path**: The file path.
* **getTexture**(path: string): ImageBitmap   
  * **path**: The file path.
* **hasTexture**(path: string): boolean   
  * **path**: The file path.
* **loadTexture**(path: string, storePath: string): Promise   
  * **path**: The file path.
  * **storePath**: The optionnal store file path.
* **releaseTextures**(): void   
