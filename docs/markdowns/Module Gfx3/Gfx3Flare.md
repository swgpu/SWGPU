# Gfx3Flare

A flare drawable object.
- inherit from: Gfx3Drawable
## Constructors
* **new Gfx3Flare**(): Gfx3Flare   
## Methods
* **delete**(): void   
* **draw**(): void   
* **getColor**(): vec4   
* **getGroup02**(): Gfx3StaticGroup   
* **getOffset2D**(): vec2   
* **getPosition2D**(): vec2   
* **getRotation2D**(): number   
* **getScale2D**(): vec2   
* **getSize2D**(): vec2   
* **getTexture**(): Gfx3Texture   
* **setColor**(r: number, g: number, b: number, a: number): void   
  * **r**: The parameter "r" represents the red component.
  * **g**: The parameter "g" represents the green component.
  * **b**: The parameter "b" represents the blue component.
  * **a**: The parameter "a" represents the alpha value.
* **setOffset2D**(x: number, y: number): void   
  * **x**: The x offset.
  * **y**: The y offset.
* **setOffset2DNormalized**(x: number, y: number): void   
  * **x**: The x offset.
  * **y**: The y offset.
* **setPosition2D**(x: number, y: number): void   
  * **x**: The X coordinate of the position.
  * **y**: The Y coordinate of the position.
* **setRotation2D**(angle: number): void   
  * **angle**: The rotation angle in radians.
* **setScale2D**(x: number, y: number): void   
  * **x**: The x factor in the x-axis direction.
  * **y**: The y factor in the y-axis direction.
* **setSize2D**(w: number, h: number): void   
  * **w**: The width of the flare.
  * **h**: The height of the flare.
* **setTexture**(texture: Gfx3Texture): void   
  * **texture**: The texture of the flare.
