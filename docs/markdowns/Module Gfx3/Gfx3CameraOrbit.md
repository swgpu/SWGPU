# Gfx3CameraOrbit

A 3D camera orbiting around a target.
- inherit from: Gfx3Camera
## Constructors
* **new Gfx3CameraOrbit**(viewIndex: number): Gfx3CameraOrbit   
  * **viewIndex**: The view you want to bind the camera.
## Methods
* **delete**(): void   
* **getDistance**(): number   
* **getFrictionCoefficient**(): number   
* **getMaxPitch**(): number   
* **getMinPitch**(): number   
* **getPhi**(): number   
* **getRotationSpeed**(): number   
* **getTarget**(): vec3   
* **getTheta**(): number   
* **getZoomSpeed**(): number   
* **setDistance**(distance: number): void   
  * **distance**: The distance.
* **setFrictionCoefficient**(frictionCoefficient: number): void   
  * **frictionCoefficient**: The friction coef.
* **setMaxPitch**(maxPitch: number): void   
  * **maxPitch**: The max pitch angle.
* **setMinPitch**(minPitch: number): void   
  * **minPitch**: The min pitch angle.
* **setRotationSpeed**(rotationSpeed: number): void   
  * **rotationSpeed**: The speed.
* **setTarget**(target: vec3): void   
  * **target**: The target position.
* **setZoomSpeed**(zoomSpeed: number): void   
  * **zoomSpeed**: The zoom speed.
* **update**(ts: number): void   
  * **ts**: The timestep.
