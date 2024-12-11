# AIPathGraph

A Generic abstract path graph.
- parent of: AIPathGraph2D, AIPathGraph3D
## Constructors
* **new AIPathGraph**(nodes: Map): AIPathGraph   
  * **nodes**: The graph data.
## Methods
* **addNode**(nid: string, node: AIPathNode, biRelations: boolean): AIPathNode   
  * **nid**: The unique identifier of the node.
  * **node**: The node.
  * **biRelations**: Determines whether bidirectional relations should be established between the newly added node and its children.
* **findNode**(predicateFn: Function)   
  * **predicateFn**: The predicate function.
* **findNodes**(predicateFn: Function)   
  * **predicateFn**: The predicate function.
* **getDistance**(a: AIPathNode, b: AIPathNode): number   
  * **a**
  * **b**
* **getNode**(nid: string): AIPathNode   
  * **nid**: The unique identifier.
* **getNodeGroupList**(nid: string)   
  * **nid**: The unique identifier.
* **loadFromFile**(path: string): Promise   
  * **path**: The file path.
* **removeNode**(nid: string): void   
  * **nid**: The unique identifier.
* **removeNodeRelation**(nid: string, cnid: string, biRelations: boolean): void   
  * **nid**: The node from which you want to remove a relation.
  * **cnid**: The child to remove.
  * **biRelations**: Determines whether bidirectional relations should be removed.
* **reset**(): void   
* **setNodeProperties**(nid: string, properties: Partial): void   
  * **nid**: The unique identifier.
  * **properties**: The properties dataset.
