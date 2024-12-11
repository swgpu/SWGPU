# Gfx3SpriteJAS

A 3D animated sprite.
It emit 'E_FINISHED'
- inherit from: Gfx3Sprite
## Constructors
* **new Gfx3SpriteJAS**(): Gfx3SpriteJAS   
## Methods
* **clone**(jas: Gfx3SpriteJAS, transformMatrix: mat4): Gfx3SpriteJAS   
  * **jas**: The copy object.
  * **transformMatrix**: The transformation matrix.
* **getAnimations**()   
* **getBoundingRect**(dynamicMode: boolean): Gfx3BoundingBox   
  * **dynamicMode**: Determines if bounding box fit the current animation.
* **getCurrentAnimation**()   
* **getCurrentAnimationFrameIndex**(): number   
* **getWorldBoundingRect**(dynamicMode: boolean): Gfx3BoundingBox   
  * **dynamicMode**: Determines if bounding box fit the current animation.
* **loadFromAsepriteFile**(path: string): Promise   
  * **path**: The file path.
* **loadFromData**(data: FormatJAS): void   
  * **data**: The jas formatted data.
* **loadFromFile**(path: string): Promise   
  * **path**: The file path.
* **play**(animationName: string, looped: boolean, preventSameAnimation: boolean): void   
  * **animationName**: The name of the animation to be played.
  * **looped**: Determines whether the animation should loop or not.
  * **preventSameAnimation**: Determines whether the same animation should be prevented from playing again.
* **setAnimations**(animations: JASAnimation[]): void   
  * **animations**: The animations data.
* **update**(ts: number): void   
  * **ts**: The timestep.
