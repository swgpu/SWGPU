# Gfx2SpriteJSS

A 2D static sprite (without animations).
- inherit from: Gfx2Drawable
## Constructors
* **new Gfx2SpriteJSS**(): Gfx2SpriteJSS   
## Methods
* **clone**(jss: Gfx2SpriteJSS): Gfx2SpriteJSS   
  * **jss**: The copy object.
* **getTexture**()   
* **getTextureRect**(): vec4   
* **getTextureRectHeight**(): number   
* **getTextureRectWidth**(): number   
* **getWorldBoundingRect**(): Gfx2BoundingRect   
* **loadFromFile**(path: string): Promise   
  * **path**: The file path.
* **onRender**(): void   
* **setOffsetNormalized**(offsetXFactor: number, offsetYFactor: number): void   
  * **offsetXFactor**: The normalized x-coordinate offset value.
  * **offsetYFactor**: The normalized y-coordinate offset value.
* **setTexture**(texture): void   
  * **texture**: The sprite texture.
* **setTextureRect**(left: number, top: number, width: number, height: number): void   
  * **left**: The x-coordinate of the top-left texture rectangle corner.
  * **top**: The y-coordinate of the top-left texture rectangle corner.
  * **width**: The width of the texture rectangle.
  * **height**: The height of the texture rectangle.
