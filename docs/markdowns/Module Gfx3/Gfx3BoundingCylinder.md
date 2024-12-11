# Gfx3BoundingCylinder

A 3D bounding cylinder.
## Constructors
* **new Gfx3BoundingCylinder**(position: vec3, height: number, radius: number): Gfx3BoundingCylinder   
  * **position**: The bottom-center position.
  * **height**: The height.
  * **radius**: The radius.
## Methods
* **getHeight**(): number   
* **getPosition**(): vec3   
* **getRadius**(): number   
* **intersectBoundingCylinder**(cylinder: Gfx3BoundingCylinder, outVelocityImpact: vec2): boolean   
  * **cylinder**: The second cylinder.
  * **outVelocityImpact**
* **isPointInside**(x: number, y: number, z: number): boolean   
  * **x**: The x-coordinate of the point.
  * **y**: The y-coordinate of the point.
  * **z**: The z-coordinate of the point.
* **reset**(): void   
* **setHeight**(height: number): void   
  * **height**: The height.
* **setPosition**(x: number, y: number, z: number): void   
  * **x**: The x-coordinate.
  * **y**: The y-coordinate.
  * **z**: The z-coordinate.
* **setRadius**(radius: number): void   
  * **radius**: The radius.
* *static* **createFromBoundingBox**(aabb: Gfx3BoundingBox): Gfx3BoundingCylinder   
  * **aabb**: The bounding box.
* *static* **createFromCenter**(x: number, y: number, z: number, h: number, r: number): Gfx3BoundingCylinder   
  * **x**: The cylinder center.
  * **y**: The cylinder center.
  * **z**: The cylinder center.
  * **h**: The height.
  * **r**: The radius.
