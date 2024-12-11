# Gfx3PhysicsJNM

A 3D hit mesh.
## Constructors
* **new Gfx3PhysicsJNM**(): Gfx3PhysicsJNM   
## Methods
* **box**(x: number, y: number, z: number, size: number, height: number, mx: number, my: number, mz: number, lift: number, snapFloor: boolean, snapFloorDistance: number): ResBox   
  * **x**: The x position of the box center.
  * **y**: The y position of the box center.
  * **z**: The z position of the box center.
  * **size**: The size of the box.
  * **height**: The height of the box.
  * **mx**: The movement in the x-axis.
  * **my**: The movement in the y-axis.
  * **mz**: The movement in the z-axis.
  * **lift**: The lift is used to elevate the virtual bounding box to let passing over little step or micro obstacles on the floor.
  * **snapFloor**: Enable or disable floor snapping.
  * **snapFloorDistance**: Minimum distance to snap the floor.
* **draw**(): void   
* **enableDebugBsp**(enabled: boolean): void   
  * **enabled**: The enabled flag.
* **enableDebugMesh**(enabled: boolean): void   
  * **enabled**: The enabled flag.
* **getBinaryTree**(): Gfx3TreePartition   
* **getElevation**(x: number, y: number, z: number, size: number, height: number, mx: number, mz: number)   
  * **x**: The x position of sensor.
  * **y**: The y position of sensor.
  * **z**: The z position of sensor.
  * **size**: The size of sensor area.
  * **height**: The height of sensor area.
  * **mx**: The movement in x-axis.
  * **mz**: The movement in z-axis.
* **getFrag**(fragIndex: number): Frag   
  * **fragIndex**: The frag index.
* **getFragColor**(fragIndex: number): vec3   
  * **fragIndex**: The frag index.
* **isDebugBspEnabled**(): boolean   
* **isDebugMeshEnabled**(): boolean   
* **loadFromBinaryFile**(path: string, bspMaxChildren: number, bspMaxDepth: number): Promise   
  * **path**: The file path.
  * **bspMaxChildren**: The maximum of children per bsp node.
  * **bspMaxDepth**: The maximum depth for bsp tree.
* **loadFromFile**(path: string, bspMaxChildren: number, bspMaxDepth: number): Promise   
  * **path**: The file path.
  * **bspMaxChildren**: The maximum of children per bsp node.
  * **bspMaxDepth**: The maximum depth for bsp tree.
* **raycast**(origin: vec3, dir: vec3, size: number, height: number)   
  * **origin**: The ray origin.
  * **dir**: The ray direction.
  * **size**: The size of ray area.
  * **height**: The height of ray area.
* **update**(ts: number): void   
  * **ts**
