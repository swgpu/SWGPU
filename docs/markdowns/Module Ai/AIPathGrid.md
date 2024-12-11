# AIPathGrid

A general grid representation.
- parent of: AIPathGrid2D, AIPathGrid3D
## Constructors
* **new AIPathGrid**(size: T, grid: number[]): AIPathGrid   
  * **size**: The grid size.
  * **grid**: The grid data.
## Methods
* **getDirections**(a: T, b: T)   
  * **a**: The cell position A.
  * **b**: The cell position B.
* **getValue**(pos: T): number   
  * **pos**: The cell position.
* **isInside**(pos: T): boolean   
  * **pos**: The cell position.
* **isSame**(a: T, b: T): boolean   
  * **a**: The cell position A.
  * **b**: The cell position B.
* **loadFromFile**(path: string): Promise   
  * **path**: The file path.
