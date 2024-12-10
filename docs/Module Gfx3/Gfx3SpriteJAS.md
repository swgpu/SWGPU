# Gfx3SpriteJAS

A 3D animated sprite.
It emit 'E_FINISHED'
- inherit from: Gfx3Sprite
## Constructors
- **new Gfx3SpriteJAS**(): Gfx3SpriteJAS   
## Methods
- **clone**(jas: Gfx3SpriteJAS, transformMatrix: mat4): Gfx3SpriteJAS   
Clone the object.
   - **jas**: The copy object.
   - **transformMatrix**: The transformation matrix.

- **getAnimations**()   
Returns the list of animation descriptors.

- **getBoundingRect**(dynamicMode: boolean): Gfx3BoundingBox   
Returns the bounding box.
   - **dynamicMode**: Determines if bounding box fit the current animation.

- **getCurrentAnimation**()   
Returns the current animation or null if there is no current animation.

- **getCurrentAnimationFrameIndex**(): number   
Returns the current animation frame index.

- **getWorldBoundingRect**(dynamicMode: boolean): Gfx3BoundingBox   
Returns the bounding box in the world space coordinates.
   - **dynamicMode**: Determines if bounding box fit the current animation.

- **loadFromFile**(path: string): Promise   
Load asynchronously animated sprite data from a json file (jas).
   - **path**: The file path.

- **play**(animationName: string, looped: boolean, preventSameAnimation: boolean): void   
Play a specific animation.
   - **animationName**: The name of the animation to be played.
   - **looped**: Determines whether the animation should loop or not.
   - **preventSameAnimation**: Determines whether the same animation should be prevented from playing again.

- **setAnimations**(animations: JASAnimation[]): void   
Set the animation descriptors.
   - **animations**: The animations data.

- **setOffsetNormalized**(offsetXFactor: number, offsetYFactor: number): void   
Set the normalized offset value.
   - **offsetXFactor**: The offsetXFactor represent the normalized x-coordinate offset value.
   - **offsetYFactor**: The offsetYFactor represent the normalized y-coordinate offset value.

- **update**(ts: number): void   
The update function.
   - **ts**: The timestep.
