# AIPathGraphSolver

Implements the A* algorithm to find the shortest path between two nodes in a graph.
## Constructors
* **new AIPathGraphSolver**(): AIPathGraphSolver   
## Methods
* **heuristic**(graph: AIPathGraph, nodeA: AIPathNode, nodeB: AIPathNode): number   
  * **graph**: The path graph.
  * **nodeA**: The node A.
  * **nodeB**: The node B.
* **solve**(graph: AIPathGraph, startNode: AIPathNode, endNode: AIPathNode)   
  * **graph**: The path graph.
  * **startNode**: The starting node of the path.
  * **endNode**: The destination node.
