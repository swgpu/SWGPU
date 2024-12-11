# TreePartitionNode

The node in a binary tree partition data structure.
## Constructors
* **new TreePartitionNode**(tree: TreePartition, depth: number, method: ITreePartitionMethod): TreePartitionNode   
  * **tree**: The root partition binary tree.
  * **depth**: The depth of that node.
  * **method**: Defines a method that is responsible for partitioning the tree nodes.
## Methods
* **addChild**(object: T): void   
  * **object**: The object.
* **draw**(): void   
* **getChildren**()   
* **getDepth**(): number   
* **getLeft**()   
* **getMethod**(): ITreePartitionMethod   
* **getRight**()   
* **reset**(): void   
* **search**(target: T, results: T[])   
  * **target**: The target object.
  * **results**: All matching objects.
* **setDepth**(depth: number): void   
  * **depth**: The depth value.
