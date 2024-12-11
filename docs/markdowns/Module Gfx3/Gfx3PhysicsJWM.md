# Gfx3PhysicsJWM

A 3D walkmesh.
In collision case, the collision response sliding along the edges of the walkmesh to keep a good feeling for the player.
## Constructors
* **new Gfx3PhysicsJWM**(): Gfx3PhysicsJWM   
## Methods
* **addPoint**(id: string, x: number, z: number): void   
  * **id**: A unique identifier.
  * **x**: The x-coordinate of the point position.
  * **z**: The z-coordinate of the point position.
* **addWalker**(id: string, x: number, z: number, size: number): Walker   
  * **id**: A unique identifier.
  * **x**: The x-coordinate of the walker's starting position.
  * **z**: The z-coordinate of the walker's starting position.
  * **size**: The size.
* **clearWalkers**(): void   
* **draw**(): void   
* **getBinaryTree**(): Gfx2TreePartition   
* **getPoint**(id: string): Point   
  * **id**: A unique identifier.
* **getSector**(sectorIndex: number): Sector   
  * **sectorIndex**: The sector index.
* **getSectorColor**(sectorIndex: number): vec3   
  * **sectorIndex**: The sector index.
* **getWalker**(id: string): Walker   
  * **id**: A unique identifier.
* **loadFromBinaryFile**(path: string, bspMaxChildren: number, bspMaxDepth: number): Promise   
  * **path**: The file path.
  * **bspMaxChildren**: The maximum of children per bsp node.
  * **bspMaxDepth**: The maximum depth for bsp tree.
* **loadFromFile**(path: string, bspMaxChildren: number, bspMaxDepth: number): Promise   
  * **path**: The file path.
  * **bspMaxChildren**: The maximum of children per bsp node.
  * **bspMaxDepth**: The maximum depth for bsp tree.
* **movePoint**(point: Point, mx: number, mz: number): ResMovePoint   
  * **point**: The point reference.
  * **mx**: The movement in the x-axis.
  * **mz**: The movement in the z-axis.
* **moveWalker**(walker: Walker, mx: number, mz: number): ResMoveWalker   
  * **walker**: The walker reference.
  * **mx**: The movement in the x-axis.
  * **mz**: The movement in the z-axis.
* **removePoint**(id: string): void   
  * **id**: A unique identifier.
* **removeWalker**(id: string): void   
  * **id**: A unique identifier.
* **update**(): void   
