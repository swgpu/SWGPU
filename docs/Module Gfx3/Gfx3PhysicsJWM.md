# Gfx3PhysicsJWM

A 3D walkmesh.
In collision case, the collision response sliding along the edges of the walkmesh to keep a good feeling for the player.
## Constructors
- **new Gfx3PhysicsJWM**(): Gfx3PhysicsJWM   
## Methods
- **$utilsCreatePoint**(x: number, z: number): Point   
   - **x**
   - **z**

- **$utilsFindLocationInfo**(x: number, z: number)   
   - **x**
   - **z**

- **$utilsMove**(sectorIndex: number, x: number, z: number, mx: number, mz: number, i: number)   
   - **sectorIndex**
   - **x**
   - **z**
   - **mx**
   - **mz**
   - **i**

- **addPoint**(id: string, x: number, z: number): void   
Add a single point.
   - **id**: A unique identifier.
   - **x**: The x-coordinate of the point position.
   - **z**: The z-coordinate of the point position.

- **addWalker**(id: string, x: number, z: number, radius: number): Walker   
Add a walker.
Note: A walker is a square composed by 5 rigid points.
   - **id**: A unique identifier.
   - **x**: The x-coordinate of the walker's starting position.
   - **z**: The z-coordinate of the walker's starting position.
   - **radius**: The radius.

- **clearWalkers**(): void   
Delete all walkers.

- **draw**(): void   
The draw function.

- **getPoint**(id: string): Point   
Returns a point.
   - **id**: A unique identifier.

- **getSectorData**(sectorIndex: number): any   
Return sector data.
   - **sectorIndex**: The sector index.

- **getWalker**(id: string): Walker   
Returns a walker.
   - **id**: A unique identifier.

- **loadFromFile**(path: string): Promise   
Load asynchronously walkmesh data from a json file (jwm).
   - **path**: The file path.

- **movePoint**(point: Point, mx: number, mz: number): ResMovePoint   
Move a point.
   - **point**: The point reference.
   - **mx**: The movement in the x-axis.
   - **mz**: The movement in the z-axis.

- **moveWalker**(walker: Walker, mx: number, mz: number): ResMoveWalker   
Move a walker.
   - **walker**: The walker reference.
   - **mx**: The movement in the x-axis.
   - **mz**: The movement in the z-axis.

- **removePoint**(id: string): void   
Remove a point.
   - **id**: A unique identifier.

- **removeWalker**(id: string): void   
Remove a walker.
   - **id**: A unique identifier.

- **update**(): void   
The update function.
