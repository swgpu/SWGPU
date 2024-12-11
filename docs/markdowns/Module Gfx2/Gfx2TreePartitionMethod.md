# Gfx2TreePartitionMethod

A 2D binary tree space partition method for quick search intersections.
## Constructors
* **new Gfx2TreePartitionMethod**(rect: Gfx2BoundingRect, axis): Gfx2TreePartitionMethod   
  * **rect**: The partition rectangle.
  * **axis**: The partition split axis.
## Methods
* **draw**(): void   
* **search**(node: TreePartitionNode, target: Gfx2BoundingRect, results: Gfx2BoundingRect[])   
  * **node**
  * **target**: The target object.
  * **results**: All matching objects.
* **split**(objects: Gfx2BoundingRect[]): SplitResult   
  * **objects**: A list of bounding rectangle.
