# Gfx3DebugRenderer

Singleton debug renderer.
- inherit from: Gfx3RendererAbstract
## Constructors
* **new Gfx3DebugRenderer**(): Gfx3DebugRenderer   
## Methods
* **drawBoundingBox**(matrix: mat4, min: vec3, max: vec3, color: vec3): void   
  * **matrix**: The transformation matrix.
  * **min**: The minimum point of the bounding box.
  * **max**: The maximum point of the bounding box.
  * **color**: The color of the bounding box.
* **drawBoundingRect**(matrix: mat4, min: vec2, max: vec2, color: vec3): void   
  * **matrix**: The transformation matrix.
  * **min**: The minimum point of the bounding rectangle.
  * **max**: The maximum point of the bounding rectangle.
  * **color**: The color of the bounding rectangle.
* **drawCircle**(matrix: mat4, radius: number, step: number, color: vec3): void   
  * **matrix**: The transformation matrix.
  * **radius**: The radius of the circle that will be drawn.
  * **step**: The level of detail or smoothness of the circle.
  * **color**: The color of the circle.
* **drawCylinder**(matrix: mat4, radius: number, height: number, step: number, closed: boolean, color: vec3): void   
  * **matrix**: The transformation matrix.
  * **radius**: The radius of the cylinder.
  * **height**: The height of the cylinder.
  * **step**: The number of divisions or segments in the cylinder.
  * **closed**: Indicating whether the cylinder should be closed or not.
  * **color**: The color of the cylinder.
* **drawGizmo**(matrix: mat4, size: number): void   
  * **matrix**: The transformation matrix.
  * **size**: The length of each axis of the gizmo.
* **drawGrid**(matrix: mat4, extend: number, spacing: number, color: vec3): void   
  * **matrix**: The transformation matrix.
  * **extend**: The number of cells in each direction from the center of the grid.
For example, if `extend` is set to 3, then there will be 7 cells in each direction (total of 49 cells).
  * **spacing**: The distance between each grid line.
  * **color**: The color of the grid.
* **drawSphere**(matrix: mat4, radius: number, step: number, color: vec3): void   
  * **matrix**: The transformation matrix.
  * **radius**: The radius of the sphere.
  * **step**: The level of detail or smoothness of the sphere.
  * **color**: The color of sphere.
* **drawVertices**(vertices: number[], vertexCount: number, matrix: mat4): void   
  * **vertices**: A list of vertices.
  * **vertexCount**: The number of vertices.
  * **matrix**: The transformation matrix.
* **isShowDebug**(): boolean   
* **render**(): void   
* **setShowDebug**(showDebug: boolean): void   
  * **showDebug**: The showDebug flag.
