# Gfx2BoundingRect

A 2D bounding rectangle.
## Constructors
* **new Gfx2BoundingRect**(min: vec2, max: vec2): Gfx2BoundingRect   
  * **min**: The minimum point of the bounding rectangle.
  * **max**: The maximum point of the bounding rectangle.
## Methods
* **fromVertices**(vertices: number[]): void   
  * **vertices**: The list of vertices. Each pair of numbers represents the x and y coordinates of a point.
* **getCenter**(): vec2   
* **getHeight**(): number   
* **getLines**()   
* **getPerimeter**(): number   
* **getRadius**(): number   
* **getSize**(): vec2   
* **getVolume**(): number   
* **getWidth**(): number   
* **intersectBoundingRect**(aabr: Gfx2BoundingRect): boolean   
  * **aabr**: The second rectangle.
* **isPointInside**(x: number, y: number): boolean   
  * **x**: The x-coordinate of the point.
  * **y**: The y-coordinate of the point.
* **merge**(rect: Gfx2BoundingRect): Gfx2BoundingRect   
  * **rect**: The second rectangle.
* **splitHorizontal**()   
* **splitVertical**()   
* **transform**(matrix: mat3): Gfx2BoundingRect   
  * **matrix**: Used to transform the points of the bounding rectangle.
* *static* **createFrom**(minx: number, miny: number, maxx: number, maxy: number): Gfx2BoundingRect   
  * **minx**: The minimum x-coordinate of the bounding rectangle.
  * **miny**: The minimum y-coordinate of the bounding rectangle.
  * **maxx**: The maximum x-coordinate of the bounding rectangle.
  * **maxy**: The maximum y-coordinate of the bounding rectangle.
* *static* **createFromCenter**(x: number, y: number, w: number, h: number): Gfx2BoundingRect   
  * **x**: The x-coordinate of the center of the bounding rectangle.
  * **y**: The y-coordinate of the center of the bounding rectangle.
  * **w**: The width of the bounding rectangle.
  * **h**: The height of the bounding rectangle.
* *static* **createFromCoord**(x: number, y: number, w: number, h: number): Gfx2BoundingRect   
  * **x**: The x-coordinate of the top-left corner of the bounding rectangle.
  * **y**: The y-coordinate of the top-left corner of the bounding rectangle.
  * **w**: The width of the bounding rectangle.
  * **h**: The height of the bounding rectangle.
* *static* **createFromVertices**(vertices: number[]): Gfx2BoundingRect   
  * **vertices**: The list of vertices. Each pair of numbers represents the x and y coordinates of a point.
