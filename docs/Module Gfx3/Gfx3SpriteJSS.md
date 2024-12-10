# Gfx3SpriteJSS

A 3D static sprite (without animations).
- inherit from: Gfx3Sprite
## Constructors
- **new Gfx3SpriteJSS**(): Gfx3SpriteJSS   
## Methods
- **clone**(jss: Gfx3SpriteJSS, transformMatrix: mat4): Gfx3SpriteJSS   
Clone the object.
   - **jss**: The copy object.
   - **transformMatrix**: The transformation matrix.

- **getTextureRect**(): vec4   
Returns the texture rectangle.

- **getTextureRectHeight**(): number   
Returns the texture rect height.

- **getTextureRectWidth**(): number   
Returns the texture rect width.

- **loadFromFile**(path: string): Promise   
Load asynchronously sprite data from a json file (jss).
   - **path**: The file path.

- **setOffsetNormalized**(offsetXFactor: number, offsetYFactor: number): void   
Set the normalized offset value.
   - **offsetXFactor**: The normalized x-coordinate offset value.
   - **offsetYFactor**: The normalized y-coordinate offset value.

- **setTexture**(texture: Gfx3Texture): void   
Set the sprite texture.
   - **texture**: The sprite texture.

- **setTextureRect**(left: number, top: number, width: number, height: number): void   
Set the texture rectangle.
   - **left**: The x-coordinate of the top-left texture rectangle corner.
   - **top**: The y-coordinate of the top-left texture rectangle corner.
   - **width**: The width of the texture rectangle.
   - **height**: The height of the texture rectangle.

- **update**(): void   
The update function.
