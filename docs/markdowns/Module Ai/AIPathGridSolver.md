# AIPathGridSolver

Implements the A* algorithm to find the shortest path between a start coordinate and an end coordinate on a grid.
## Constructors
* **new AIPathGridSolver**(): AIPathGridSolver   
## Methods
* **heuristic**(grid: AIPathGrid, a: T, b: T)   
  * **grid**: The grid.
  * **a**: The starting position in the grid.
  * **b**: The destination position in the grid.
* **solve**(grid: AIPathGrid, startCoord: T, endCoord: T)   
  * **grid**: A grid representing the pathfinding area. It contains information about the obstacles and the values of each cell (empty = 0, obstacle = 1).
  * **startCoord**: The starting position in the grid.
  * **endCoord**: The destination position in the grid.
