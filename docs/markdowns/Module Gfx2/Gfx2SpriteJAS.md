# Gfx2SpriteJAS

A 2D sprite with animations.
It emit 'E_FINISHED'
- inherit from: Gfx2Drawable
## Constructors
* **new Gfx2SpriteJAS**(): Gfx2SpriteJAS   
## Methods
* **clone**(jas: Gfx2SpriteJAS): Gfx2SpriteJAS   
  * **jas**: The copy object.
* **getAnimations**()   
* **getBoundingRect**(dynamicMode: boolean): Gfx2BoundingRect   
  * **dynamicMode**: Determines if bounding rect fit the current animation.
* **getCurrentAnimation**()   
* **getCurrentAnimationFrameIndex**(): number   
* **getTexture**()   
* **getWorldBoundingRect**(dynamicMode: boolean): Gfx2BoundingRect   
  * **dynamicMode**: Determines if bounding rect fit the current animation.
* **loadFromAsepriteFile**(path: string): Promise   
  * **path**: The file path.
* **loadFromData**(data: FormatJAS): void   
  * **data**: The jas formatted data.
* **loadFromFile**(path: string): Promise   
  * **path**: The file path.
* **onRender**(): void   
* **play**(animationName: string, looped: boolean, preventSameAnimation: boolean): void   
  * **animationName**: The name of the animation to be played.
  * **looped**: Determines whether the animation should loop or not.
  * **preventSameAnimation**: Determines whether the same animation should be prevented from playing again.
* **setAnimations**(animations: JASAnimation[]): void   
  * **animations**: The animations data.
* **setOffsetNormalized**(offsetXFactor: number, offsetYFactor: number): void   
  * **offsetXFactor**: The normalized x-coordinate offset value.
  * **offsetYFactor**: The normalized y-coordinate offset value.
* **setTexture**(texture: ImageBitmap): void   
  * **texture**: The sprite texture.
* **update**(ts: number): void   
  * **ts**: The timestep.
