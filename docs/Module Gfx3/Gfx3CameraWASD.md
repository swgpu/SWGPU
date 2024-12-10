# Gfx3CameraWASD

A 3D camera implementation that behaves similar to first-person-shooter PC games.
- inherit from: Gfx3Camera
## Constructors
- **new Gfx3CameraWASD**(viewIndex: number): Gfx3CameraWASD   
   - **viewIndex**: The view you want to bind the camera.
## Methods
- **$handleMouseDrag**(delta: any): void   
   - **delta**

- **delete**(): void   
Free all resources.
Warning: You need to call this method to free allocation for this object.

- **getFrictionCoefficient**(): number   
Returns the friction coefficient.

- **getMaxPitch**(): number   
Returns the max rotation angle on x-axis.

- **getMinPitch**(): number   
Returns the min rotation angle on x-axis.

- **getMovementSpeed**(): number   
Returns the move speed.

- **getRotationSpeed**(): number   
Returns the rotation speed.

- **setFrictionCoefficient**(frictionCoefficient: number): void   
Set the friction coefficient.
High value for strong friction.
   - **frictionCoefficient**: The friction coef [0-1].

- **setMaxPitch**(maxPitch: number): void   
Set the max rotation angle on x-axis.
   - **maxPitch**: The max pitch angle.

- **setMinPitch**(minPitch: number): void   
Set the min rotation angle on x-axis.
   - **minPitch**: The min pitch angle.

- **setMovementSpeed**(movementSpeed: number): void   
Set the move speed.
   - **movementSpeed**: The speed.

- **setRotationSpeed**(rotationSpeed: number): void   
Set the rotation speed.
   - **rotationSpeed**: The speed.

- **update**(ts: number): void   
The update function.
   - **ts**: The timestep.
