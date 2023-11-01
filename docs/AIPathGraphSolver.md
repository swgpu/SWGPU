[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ai/ai\_path\_graph\_solver](../modules/ai_ai_path_graph_solver.md) / AIPathGraphSolver

# Class: AIPathGraphSolver<T\>

[ai/ai_path_graph_solver](../modules/ai_ai_path_graph_solver.md).AIPathGraphSolver

The `AIPathGraphSolver` class implements the A* algorithm to find the shortest path between two
nodes in a graph.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`vec2`](../modules/core_global.md#vec2) \| [`vec3`](../modules/core_global.md#vec3) | The coord type: vec2 or vec3. |

## Table of contents

### Methods

- [heuristic](ai_ai_path_graph_solver$AIPathGraphSolver.md#heuristic)
- [solve](ai_ai_path_graph_solver$AIPathGraphSolver.md#solve)

### Constructors

- [constructor](ai_ai_path_graph_solver$AIPathGraphSolver.md#constructor)

## Methods

### heuristic

▸ **heuristic**(`graph`, `nodeA`, `nodeB`): `number`

The "heuristic" function calculates the distance between two nodes in a graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `graph` | [`AIPathGraph`](ai_ai_path_graph$AIPathGraph.md)<`T`\> | The graph data structure used for pathfinding. It contains information about the nodes and edges in the graph. |
| `nodeA` | [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\> | The starting node for calculating the distance between two nodes in the graph. |
| `nodeB` | [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\> | The ending node. |

#### Returns

`number`

the distance between nodeA and nodeB in the given graph.

___

### solve

▸ **solve**(`graph`, `startNode`, `endNode`): [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\>[]

The "solve" function uses the A* algorithm to find the shortest path between a start node and an end
node in a given graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `graph` | [`AIPathGraph`](ai_ai_path_graph$AIPathGraph.md)<`T`\> | A graph data structure used for pathfinding. It contains nodes and edges that define the connections between them. |
| `startNode` | [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\> | The `startNode` parameter is the node from which the pathfinding algorithm will start searching for a path. It represents the starting point of the path. |
| `endNode` | [`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\> | The `endNode` parameter in the `solve` function represents the destination node in the graph. It is the node where the pathfinding algorithm is trying to reach from the `startNode`. |

#### Returns

[`AIPathNode`](../interfaces/ai_ai_path_graph$AIPathNode.md)<`T`\>[]

an array of AIPathNode<T> objects, representing the path from the startNode to the endNode
in the given graph.

## Constructors

### constructor

• **new AIPathGraphSolver**<`T`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Float32Array` \| `Uint32Array` \| [`number`, `number`] \| [`number`, `number`, `number`] |
