[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ai/ai\_minmax\_solver](../modules/ai_ai_minmax_solver.md) / AIMinMaxSolver

# Class: AIMinMaxSolver

[ai/ai_minmax_solver](../modules/ai_ai_minmax_solver.md).AIMinMaxSolver

The `AIMinMaxSolver` class solves an AI MinMax tree by generating values for each node and finding
the child node with the maximum value from a scored graph.

## Table of contents

### Methods

- [generateValues](ai_ai_minmax_solver$AIMinMaxSolver.md#generatevalues)
- [solve](ai_ai_minmax_solver$AIMinMaxSolver.md#solve)

### Constructors

- [constructor](ai_ai_minmax_solver$AIMinMaxSolver.md#constructor)

## Methods

### generateValues

▸ **generateValues**(`parentNode`, `isMaxPlayer`, `alpha?`, `beta?`): [`AIMinMaxTreeAbstract`](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md)

The "generateValues" function generates values for nodes in a minimax tree, considering whether the current player is
maximizing or minimizing, and using alpha-beta pruning to optimize the search.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `parentNode` | [`AIMinMaxTreeAbstract`](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md) | `undefined` | The scored graph. |
| `isMaxPlayer` | `boolean` | `undefined` | A boolean value indicating whether the current player is the maximizing player or not. If it is true, then the current player is the maximizing player. If it is false, then the current player is the minimizing player. |
| `alpha` | `number` | `-Infinity` | The alpha parameter is used in the alpha-beta pruning algorithm. It represents the best value that the maximizing player (isMaxPlayer = true) has found so far. Initially, it is set to negative infinity. |
| `beta` | `number` | `Infinity` | The parameter "beta" represents the upper bound for the minimax algorithm. It is used to prune branches of the tree that are guaranteed to not affect the final decision. If the value of a node exceeds or equals beta during the evaluation, the algorithm can stop evaluating further children of that node, as |

#### Returns

[`AIMinMaxTreeAbstract`](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md)

the updated `parentNode` after generating values for its children nodes.

___

### solve

▸ **solve**(`node`): [`AIMinMaxTreeAbstract`](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md)

The "solve" function solves an AI MinMax tree by generating values for each node, finding the child node
with the maximum value, and returning it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`AIMinMaxNode`](ai_ai_minmax_tree$AIMinMaxNode.md) | The scored graph. |

#### Returns

[`AIMinMaxTreeAbstract`](ai_ai_minmax_tree$AIMinMaxTreeAbstract.md)

the node with the maximum value among its children.

## Constructors

### constructor

• **new AIMinMaxSolver**()
