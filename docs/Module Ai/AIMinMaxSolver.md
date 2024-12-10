# AIMinMaxSolver

Solves an MinMax tree.
## Constructors
- **new AIMinMaxSolver**(): AIMinMaxSolver   
## Methods
- **$generateValues**(parentNode: AIMinMaxTreeAbstract, isMaxPlayer: boolean, alpha: number, beta: number): AIMinMaxTreeAbstract   
Bubbling the nodes values and returns the MinMax tree.
   - **parentNode**: The scored graph.
   - **isMaxPlayer**: A boolean value indicating whether the current player is the maximizing player or not.
   - **alpha**: The alpha.
   - **beta**: The beta.

- **solve**(node: AIMinMaxNode): AIMinMaxTreeAbstract   
Solves MinMax tree and return the node with the maximum value among its direct children.
   - **node**: The scored graph.
