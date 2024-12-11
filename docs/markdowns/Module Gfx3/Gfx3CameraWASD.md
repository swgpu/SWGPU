# Gfx3CameraWASD

A 3D camera implementation that behaves similar to first-person-shooter PC games.
- inherit from: Gfx3Camera
## Constructors
* **new Gfx3CameraWASD**(viewIndex: number): Gfx3CameraWASD   
  * **viewIndex**: The view you want to bind the camera.
## Methods
* **delete**(): void   
* **getFrictionCoefficient**(): number   
* **getMaxPitch**(): number   
* **getMinPitch**(): number   
* **getMovementSpeed**(): number   
* **getRotationSpeed**(): number   
* **setFrictionCoefficient**(frictionCoefficient: number): void   
  * **frictionCoefficient**: The friction coef [0-1].
* **setMaxPitch**(maxPitch: number): void   
  * **maxPitch**: The max pitch angle.
* **setMinPitch**(minPitch: number): void   
  * **minPitch**: The min pitch angle.
* **setMovementSpeed**(movementSpeed: number): void   
  * **movementSpeed**: The speed.
* **setRotationSpeed**(rotationSpeed: number): void   
  * **rotationSpeed**: The speed.
* **update**(ts: number): void   
  * **ts**: The timestep.
