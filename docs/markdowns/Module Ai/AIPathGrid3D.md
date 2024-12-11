# AIPathGrid3D

A 3D grid representation.
- inherit from: AIPathGrid
## Constructors
* **new AIPathGrid3D**(size: vec3, grid: number[]): AIPathGrid3D   
  * **size**: The grid size.
  * **grid**: The grid data.
## Methods
* **getDirections**(a: vec3, b: vec3)   
  * **a**: The cell position A.
  * **b**: The cell position B.
* **getValue**(pos: vec3): number   
  * **pos**: The cell position.
* **isInside**(pos: vec3): boolean   
  * **pos**: The cell position.
* **isSame**(a: vec3, b: vec3): boolean   
  * **a**: The cell position A.
  * **b**: The cell position B.
