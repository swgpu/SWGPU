# Gfx3CameraOrbit

A 3D camera orbiting around a target.
- inherit from: Gfx3Camera
## Constructors
- **new Gfx3CameraOrbit**(viewIndex: number): Gfx3CameraOrbit   
   - **viewIndex**: The view you want to bind the camera.
## Methods
- **$handleMouseDown**(): void   

- **$handleMouseDrag**(data: any): void   
   - **data**

- **$handleMouseUp**(): void   

- **$handleMouseWheel**(data: any): void   
   - **data**

- **delete**(): void   
Free all resources.
Warning: You need to call this method to free allocation for this object.

- **getDistance**(): number   
Returns the distance between target and camera.

- **getFrictionCoefficient**(): number   
Returns the friction coefficient.

- **getMaxPitch**(): number   
Returns the max rotation angle on x-axis.

- **getMinPitch**(): number   
Returns the min rotation angle on x-axis.

- **getPhi**(): number   
Returns the phi angle (horizontal).

- **getRotationSpeed**(): number   
Returns the rotation speed.

- **getTarget**(): vec3   
Returns the target position.

- **getTheta**(): number   
Returns the theta angle (vertical).

- **getZoomSpeed**(): number   
Returns the zoom speed.

- **setDistance**(distance: number): void   
Set the distance between target and camera.
   - **distance**: The distance.

- **setFrictionCoefficient**(frictionCoefficient: number): void   
Set the friction coefficient.
High value for strong friction.
   - **frictionCoefficient**: The friction coef.

- **setMaxPitch**(maxPitch: number): void   
Set the max rotation angle on x-axis.
   - **maxPitch**: The max pitch angle.

- **setMinPitch**(minPitch: number): void   
Set the min rotation angle on x-axis.
   - **minPitch**: The min pitch angle.

- **setRotationSpeed**(rotationSpeed: number): void   
Set the rotation speed.
   - **rotationSpeed**: The speed.

- **setTarget**(target: vec3): void   
Set the target position you want looking for.
   - **target**: The target position.

- **setZoomSpeed**(zoomSpeed: number): void   
Set the zoom speed.
   - **zoomSpeed**: The zoom speed.

- **update**(ts: number): void   
The update function.
   - **ts**: The timestep.
