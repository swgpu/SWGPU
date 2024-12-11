# Gfx3SpriteJSS

A 3D static sprite (without animations).
- inherit from: Gfx3Sprite
## Constructors
* **new Gfx3SpriteJSS**(): Gfx3SpriteJSS   
## Methods
* **clone**(jss: Gfx3SpriteJSS, transformMatrix: mat4): Gfx3SpriteJSS   
  * **jss**: The copy object.
  * **transformMatrix**: The transformation matrix.
* **getTextureRect**(): vec4   
* **getTextureRectHeight**(): number   
* **getTextureRectWidth**(): number   
* **loadFromFile**(path: string): Promise   
  * **path**: The file path.
* **setTexture**(texture: Gfx3Texture): void   
  * **texture**: The sprite texture.
* **setTextureRect**(left: number, top: number, width: number, height: number): void   
  * **left**: The x-coordinate of the top-left texture rectangle corner.
  * **top**: The y-coordinate of the top-left texture rectangle corner.
  * **width**: The width of the texture rectangle.
  * **height**: The height of the texture rectangle.
* **update**(): void   
