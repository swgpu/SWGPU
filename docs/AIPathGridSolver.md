[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ai/ai\_path\_grid\_solver](../modules/ai_ai_path_grid_solver.md) / AIPathGridSolver

# Class: AIPathGridSolver<T\>

[ai/ai_path_grid_solver](../modules/ai_ai_path_grid_solver.md).AIPathGridSolver

The `AIPathGridSolver` class uses the A* algorithm to find the shortest path between a start
coordinate and an end coordinate on a grid.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`vec2`](../modules/core_global.md#vec2) \| [`vec3`](../modules/core_global.md#vec3) | The coord type: vec2 or vec3. |

## Table of contents

### Methods

- [heuristic](ai_ai_path_grid_solver$AIPathGridSolver.md#heuristic)
- [solve](ai_ai_path_grid_solver$AIPathGridSolver.md#solve)

### Constructors

- [constructor](ai_ai_path_grid_solver$AIPathGridSolver.md#constructor)

## Methods

### heuristic

▸ **heuristic**(`grid`, `a`, `b`): `T`[]

The "heuristic" function returns an array of directions to move from point A to point B on a given
grid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `grid` | [`AIPathGrid`](ai_ai_path_grid$AIPathGrid.md)<`T`\> | The `grid` parameter is an instance of the `AIPathGrid` class, which represents a grid used for pathfinding. It contains information about the obstacles and walkable areas in the grid. |
| `a` | `T` | The parameter "a" represents the starting position in the grid. |
| `b` | `T` | The parameter "b" represents the destination position in the grid. |

#### Returns

`T`[]

An array of directions from point a to point b.

___

### solve

▸ **solve**(`grid`, `startCoord`, `endCoord`): ``null`` \| `T`[]

The "solve" function uses the A* algorithm to find the shortest path between a start coordinate and
an end coordinate on a grid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `grid` | [`AIPathGrid`](ai_ai_path_grid$AIPathGrid.md)<`T`\> | A grid representing the pathfinding area. It contains information about the obstacles and the values of each cell (empty = 0, obstacle = 1). |
| `startCoord` | `T` | The `startCoord` parameter represents the starting coordinate of the path. It is the coordinate from where the pathfinding algorithm will begin searching for a path. |
| `endCoord` | `T` | The `endCoord` parameter represents the coordinates of the destination or end point in the grid. It is the position that the algorithm is trying to reach from the `startCoord` position. |

#### Returns

``null`` \| `T`[]

The array of coordinates representing the path from the `startCoord` to the `endCoord`.
If no path is found, it returns `null`.

## Constructors

### constructor

• **new AIPathGridSolver**<`T`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Float32Array` \| `Uint32Array` \| [`number`, `number`] \| [`number`, `number`, `number`] |
