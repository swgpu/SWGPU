# Gfx2SpriteJAS

A 2D sprite with animations.
It emit 'E_FINISHED'
- inherit from: Gfx2Drawable
## Constructors
- **new Gfx2SpriteJAS**(): Gfx2SpriteJAS   
## Methods
- **clone**(jas: Gfx2SpriteJAS): Gfx2SpriteJAS   
Clone the object.
   - **jas**: The copy object.

- **getAnimations**()   
Returns the list of animation descriptors.

- **getBoundingRect**(dynamicMode: boolean): Gfx2BoundingRect   
Returns the bounding rect.
   - **dynamicMode**: Determines if bounding rect fit the current animation.

- **getCurrentAnimation**()   
Returns the current animation or null if there is no current animation.

- **getCurrentAnimationFrameIndex**(): number   
Returns the current animation frame index.

- **getFlip**()   
Returns two booleans, first is the x-axis flip flag, second is the y-axis flip flag.

- **getTexture**()   
Returns the sprite texture.

- **getWorldBoundingRect**(dynamicMode: boolean): Gfx2BoundingRect   
Returns the bounding rect in the world space coordinates.
   - **dynamicMode**: Determines if bounding rect fit the current animation.

- **loadFromFile**(path: string): Promise   
Loads asynchronously sprite data from a json file (jas).
   - **path**: The file path.

- **paint**(): void   
The paint function.

- **play**(animationName: string, looped: boolean, preventSameAnimation: boolean): void   
Play a specific animation.
   - **animationName**: The name of the animation to be played.
   - **looped**: Determines whether the animation should loop or not.
   - **preventSameAnimation**: Determines whether the same animation should be prevented from playing again.

- **setAnimations**(animations: JASAnimation[]): void   
Set the animation descriptors.
   - **animations**: The animations data.

- **setFlipX**(x: boolean): void   
Set flipX.
   - **x**: The x-axis flip flag.

- **setFlipY**(y: boolean): void   
Set flipY.
   - **y**: The y-axis flip flag.

- **setTexture**(texture: ImageBitmap): void   
Set the sprite texture.
   - **texture**: The sprite texture.

- **update**(ts: number): void   
The update function.
   - **ts**: The timestep.
