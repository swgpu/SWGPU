# Gfx3MeshJAM

A 3D animated mesh.
It emit 'E_FINISHED'
- inherit from: Gfx3Mesh
## Constructors
- **new Gfx3MeshJAM**(): Gfx3MeshJAM   
## Methods
- **clone**(jam: Gfx3MeshJAM, transformMatrix: mat4): Gfx3MeshJAM   
Clone the object.
   - **jam**: The copy object.
   - **transformMatrix**: The transformation matrix.

- **getBoundingBox**(dynamicMode: boolean): Gfx3BoundingBox   
Returns the bounding box.
   - **dynamicMode**: Determines if bounding box fit the current animation.

- **getCurrentAnimation**()   
Returns the current animation or null if there is no current animation.

- **getCurrentFrameIndex**(): number   
Returns the current frame index.

- **getFrameProgress**(): number   
Returns the current frame progress.

- **getInterpolationEnabled**(): boolean   
Check if interpolation is enabled.

- **getLooped**(): boolean   
Check if animation is looped.

- **getWorldBoundingBox**(dynamicMode: boolean): Gfx3BoundingBox   
Returns the bounding box in the world space coordinates.
   - **dynamicMode**: Determines if bounding box fit the current animation.

- **loadFromFile**(path: string): Promise   
Load asynchronously animated mesh data from a json file (jam).
   - **path**: The file path.

- **play**(animationName: string, looped: boolean, preventSameAnimation: boolean, interpolationEnabled: boolean): void   
Play a specific animation.
   - **animationName**: The name of the animation to be played.
   - **looped**: Determines whether the animation should loop or not.
   - **preventSameAnimation**: Determines whether the same animation should be prevented from playing again.
   - **interpolationEnabled**: Determines whether the animation interpolation is enabled or not.

- **update**(ts: number): void   
The update function.
   - **ts**: The timestep.
