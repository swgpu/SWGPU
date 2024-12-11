# UISprite

A UI widget displaying a sprite with animations.
It emit 'E_FINISHED'
- inherit from: UIWidget
## Constructors
* **new UISprite**(options): UISprite   
  * **options**: Contains only class name.
## Methods
* **getAnimations**()   
* **getCurrentAnimation**()   
* **getCurrentAnimationFrameIndex**(): number   
* **loadFromAsepriteFile**(path: string): Promise   
  * **path**: The file path.
* **loadFromData**(data: FormatJAS): void   
  * **data**: The jas formatted data.
* **loadFromFile**(path: string): Promise   
  * **path**: The file path.
* **loadTexture**(imageFile: string): Promise   
  * **imageFile**: The file path.
* **play**(animationName: string, isLooped: boolean, preventSameAnimation: boolean): void   
  * **animationName**: The name of the animation to be played.
  * **isLooped**
  * **preventSameAnimation**: Determines whether the same animation should be prevented from playing again.
* **setAnimations**(animations: JASAnimation[]): void   
  * **animations**: The animations data.
* **update**(ts: number): void   
  * **ts**: The timestep.
