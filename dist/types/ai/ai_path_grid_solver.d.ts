import { AIPathGrid } from './ai_path_grid';
/**
 * Implements the A* algorithm to find the shortest path between a start coordinate and an end coordinate on a grid.
 * @typeParam T - The coord type: vec2 or vec3.
 */
declare class AIPathGridSolver<T extends vec2 | vec3> {
    /**
     * Find the shortest path between a start node and an end node in a given grid and returns the path.
     *
     * @param grid - A grid representing the pathfinding area. It contains information about the obstacles and the values of each cell (empty = 0, obstacle = 1).
     * @param startCoord - The starting position in the grid.
     * @param endCoord - The destination position in the grid.
     */
    solve(grid: AIPathGrid<T>, startCoord: T, endCoord: T): Array<T> | null;
    /**
     * Returns an array of more closest to least close directions to move from point A to point B on a given grid.
     *
     * @param grid - The grid.
     * @param {T} a - The starting position in the grid.
     * @param {T} b - The destination position in the grid.
     */
    heuristic(grid: AIPathGrid<T>, a: T, b: T): Array<T>;
}
export { AIPathGridSolver };
