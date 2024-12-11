# Gfx3TreePartitionMethod

A 3D binary tree partition method for quick search intersections.
## Constructors
* **new Gfx3TreePartitionMethod**(box: Gfx3BoundingBox, axis): Gfx3TreePartitionMethod   
  * **box**: The position and size of the partition box.
  * **axis**: The split axis of the partition.
## Methods
* **draw**(): void   
* **search**(node: TreePartitionNode, target: Gfx3BoundingBox, results: Gfx3BoundingBox[])   
  * **node**
  * **target**: The target object.
  * **results**: All matching objects.
* **split**(objects: Gfx3BoundingBox[]): SplitResult   
  * **objects**: A list of bounding box.
