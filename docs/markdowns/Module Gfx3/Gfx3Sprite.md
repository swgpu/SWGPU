# Gfx3Sprite

A 3D base sprite object.
- inherit from: Gfx3Drawable
- parent of: Gfx3SpriteJAS, Gfx3SpriteJSS
## Constructors
* **new Gfx3Sprite**(): Gfx3Sprite   
## Methods
* **clone**(sprite: Gfx3Sprite, transformMatrix: mat4): Gfx3Sprite   
  * **sprite**: The copy object.
  * **transformMatrix**: The transformation matrix.
* **delete**(): void   
* **draw**(): void   
* **getBillboardMode**(): boolean   
* **getFlip**()   
* **getGroup01**(): Gfx3StaticGroup   
* **getOffset**(): vec2   
* **getOffsetX**(): number   
* **getOffsetY**(): number   
* **getPixelsPerUnit**(): number   
* **getTexture**(): Gfx3Texture   
* **getTransformMatrix**(): mat4   
* **setBillboardMode**(billboardMode: boolean): void   
  * **billboardMode**: Determines whether the object should be
displayed as a billboard, meaning it always faces the camera regardless of its orientation.
* **setFlipX**(x: boolean): void   
  * **x**: The x-axis flip flag.
* **setFlipY**(y: boolean): void   
  * **y**: The y-axis flip flag.
* **setOffset**(offsetX: number, offsetY: number): void   
  * **offsetX**: The x-offset.
  * **offsetY**: The y-offset.
* **setOffsetNormalized**(offsetXFactor: number, offsetYFactor: number): void   
  * **offsetXFactor**: The normalized x-coordinate offset value.
  * **offsetYFactor**: The normalized y-coordinate offset value.
* **setPixelsPerUnit**(pixelsPerUnit: number): void   
  * **pixelsPerUnit**: Determine the scale or resolution at which the sprite is displayed.
* **setTexture**(texture: Gfx3Texture): void   
  * **texture**: The sprite texture.
