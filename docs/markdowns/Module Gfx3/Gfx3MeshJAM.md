# Gfx3MeshJAM

A 3D animated mesh.
It emit 'E_FINISHED'
- inherit from: Gfx3Mesh
## Constructors
* **new Gfx3MeshJAM**(): Gfx3MeshJAM   
## Methods
* **clone**(jam: Gfx3MeshJAM, transformMatrix: mat4): Gfx3MeshJAM   
  * **jam**: The copy object.
  * **transformMatrix**: The transformation matrix.
* **getBoundingBox**(dynamicMode: boolean): Gfx3BoundingBox   
  * **dynamicMode**: Determines if bounding box fit the current animation.
* **getCurrentAnimation**()   
* **getCurrentFrameIndex**(): number   
* **getFrameProgress**(): number   
* **getInterpolationEnabled**(): boolean   
* **getLooped**(): boolean   
* **getWorldBoundingBox**(dynamicMode: boolean): Gfx3BoundingBox   
  * **dynamicMode**: Determines if bounding box fit the current animation.
* **loadFromBinaryFile**(path: string): Promise   
  * **path**: The file path.
* **loadFromFile**(path: string): Promise   
  * **path**: The file path.
* **play**(animationName: string, looped: boolean, preventSameAnimation: boolean, interpolationEnabled: boolean): void   
  * **animationName**: The name of the animation to be played.
  * **looped**: Determines whether the animation should loop or not.
  * **preventSameAnimation**: Determines whether the same animation should be prevented from playing again.
  * **interpolationEnabled**: Determines whether the animation interpolation is enabled or not.
* **update**(ts: number): void   
  * **ts**: The timestep.
