# Gfx3PhysicsJNM

A 3D navigation mesh.
In collision case, the collision response sliding along wall polygons to keep a good feeling for the player.
## Constructors
- **new Gfx3PhysicsJNM**(): Gfx3PhysicsJNM   
## Methods
- **$getElevation**(frags: Frag[], point: vec3)   
   - **frags**
   - **point**

- **$moveXZ**(center: vec3, frags: Frag[], point: vec3, move: vec2, i: number)   
   - **center**
   - **frags**
   - **point**
   - **move**
   - **i**

- **box**(x: number, y: number, z: number, radius: number, height: number, mx: number, my: number, mz: number, lift: number, snapFloor: boolean, snapFloorDistance: number, marginBox: number): ResBox   
Returns a new move with smooth sliding along wall and floor for the given box.
Infos are composed to a move vector, a wall collide flag and floor collide flag.
   - **x**: The x position of the box center.
   - **y**: The y position of the box center.
   - **z**: The z position of the box center.
   - **radius**: The radius of the box.
   - **height**: The height of the box.
   - **mx**: The movement in the x-axis.
   - **my**: The movement in the y-axis.
   - **mz**: The movement in the z-axis.
   - **lift**: The lift is used to elevate the virtual bounding box to let passing over little step or micro obstacles on the floor.
   - **snapFloor**: Enable or disable floor snapping.
   - **snapFloorDistance**: Minimum distance to snap the floor.
   - **marginBox**: The margin is used to add more space to the virtual bounding box to collide wall collide earlier.

- **draw**(): void   
The draw function.

- **enableDebugBsp**(enabled: boolean): void   
Enable the debug bsp display.
   - **enabled**: The enabled flag.

- **enableDebugMesh**(enabled: boolean): void   
Enable the debug mesh display.
   - **enabled**: The enabled flag.

- **getBinaryTree**(): Gfx3TreePartition   
Returns the btree.

- **getElevation**(x: number, y: number, z: number, radius: number, height: number, mx: number, mz: number): ResElevation   
Returns a new y-move to fix the point on the floor.
Note: Utility used to handle collisions manually for full flexibility.
   - **x**: The x position of sensor.
   - **y**: The y position of sensor.
   - **z**: The z position of sensor.
   - **radius**: The radius of sensor area.
   - **height**: The height of sensor area.
   - **mx**: The movement in x-axis.
   - **mz**: The movement in z-axis.

- **getSectorData**(fragIndex: number): any   
Return frag data.
   - **fragIndex**: The frag index.

- **isDebugBspEnabled**(): boolean   
Check if bsp debugging is enabled.

- **isDebugMeshEnabled**(): boolean   
Check if mesh debugging is enabled.

- **loadFromFile**(path: string, bspMaxChildren: number, bspMaxDepth: number): Promise   
Load asynchronously navmesh data from a json file (jnm).
   - **path**: The file path.
   - **bspMaxChildren**: The maximum of children per bsp node.
   - **bspMaxDepth**: The maximum depth for bsp tree.

- **raycast**(origin: vec3, dir: vec3, radius: number, height: number)   
Returns the ray hit point or null if no hit occured.
Note: Utility used to handle collisions manually for full flexibility.
   - **origin**: The ray origin.
   - **dir**: The ray direction.
   - **radius**: The radius of ray area.
   - **height**: The height of ray area.

- **update**(ts: number): void   
The update function.
   - **ts**
