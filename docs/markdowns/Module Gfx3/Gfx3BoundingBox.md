# Gfx3BoundingBox

A 3D bounding box.
## Constructors
* **new Gfx3BoundingBox**(min: vec3, max: vec3): Gfx3BoundingBox   
  * **min**: The minimum point of the bounding box.
  * **max**: The maximum point of the bounding box.
## Methods
* **fromVertices**(vertices, vertexStride: number): void   
  * **vertices**: The list of vertices.
  * **vertexStride**: The vertex stride (will take always first tree values).
* **getCenter**(): vec3   
* **getDepth**(): number   
* **getHeight**(): number   
* **getPerimeter**(): number   
* **getRadius**(): number   
* **getSize**(): vec3   
* **getVolume**(): number   
* **getWidth**(): number   
* **intersectBoundingBox**(aabb: Gfx3BoundingBox): boolean   
  * **aabb**: The second box.
* **isPointInside**(x: number, y: number, z: number): boolean   
  * **x**: The x-coordinate of the point.
  * **y**: The y-coordinate of the point.
  * **z**: The z-coordinate of the point.
* **merge**(aabb: Gfx3BoundingBox): Gfx3BoundingBox   
  * **aabb**: The second box.
* **reset**(): void   
* **setMax**(max: vec3): void   
  * **max**: The max point of the box.
* **setMin**(min: vec3): void   
  * **min**: The min point of the box.
* **splitDepth**()   
* **splitHorizontal**()   
* **splitVertical**()   
* **transform**(matrix: mat4): Gfx3BoundingBox   
  * **matrix**: Used to transform the points of the bounding box.
* *static* **createFromCenter**(x: number, y: number, z: number, w: number, h: number, d: number): Gfx3BoundingBox   
  * **x**: The x-coordinate of the center of the bounding box.
  * **y**: The y-coordinate of the center of the bounding box.
  * **z**: The z-coordinate of the center of the bounding box.
  * **w**: The width of the bounding box.
  * **h**: The height of the bounding box.
  * **d**: The depth of the bounding box.
* *static* **createFromCoord**(x: number, y: number, z: number, w: number, h: number, d: number): Gfx3BoundingBox   
  * **x**: The x-coordinate of the bottom-left-front corner of the bounding box.
  * **y**: The y-coordinate of the bottom-left-front corner of the bounding box.
  * **z**: The z-coordinate of the bottom-left-front corner of the bounding box.
  * **w**: The width of the bounding box.
  * **h**: The height of the bounding box.
  * **d**: The depth of the bounding box.
* *static* **createFromVertices**(vertices, vertexStride: number): Gfx3BoundingBox   
  * **vertices**: The list of vertices.
  * **vertexStride**: The vertex stride (will take always first tree values).
* *static* **merge**(aabbs: Gfx3BoundingBox[]): Gfx3BoundingBox   
  * **aabbs**: The list of boxes.
