import { AIPathGrid } from './ai_path_grid';

interface Visited<T> {
  pos: T;
  origin: T | null;
};

/**
 * The `AIPathGridSolver` class uses the A* algorithm to find the shortest path between a start
 * coordinate and an end coordinate on a grid.
 * @typeParam T - The coord type: vec2 or vec3.
 */
class AIPathGridSolver<T extends vec2 | vec3> {
  /**
   * The "solve" function uses the A* algorithm to find the shortest path between a start coordinate and
   * an end coordinate on a grid.
   * @param {AIPathGrid<T>} grid - A grid representing the pathfinding area. It contains information
   * about the obstacles and the values of each cell (empty = 0, obstacle = 1).
   * @param {T} startCoord - The `startCoord` parameter represents the starting coordinate of the path.
   * It is the coordinate from where the pathfinding algorithm will begin searching for a path.
   * @param {T} endCoord - The `endCoord` parameter represents the coordinates of the destination or end
   * point in the grid. It is the position that the algorithm is trying to reach from the `startCoord`
   * position.
   * @returns The array of coordinates representing the path from the `startCoord` to the `endCoord`.
   * If no path is found, it returns `null`.
   */
  solve(grid: AIPathGrid<T>, startCoord: T, endCoord: T): Array<T> | null {
    const visitedMap = new Map<string, Visited<T>>();
    const frontierCoordList: Array<T> = [];
    let find = false;

    frontierCoordList.push(startCoord);
    visitedMap.set(startCoord.join(';'), { pos: startCoord, origin: null });

    while (!find) {
      const frontierCoord = frontierCoordList.shift();
      if (!frontierCoord) {
        return null;
      }

      const dirs = this.heuristic(grid, frontierCoord, endCoord);

      for (const dir of dirs) {
        const nextCoord = dir.map((value, idx) => frontierCoord[idx] + value) as T;
        const strNextCoord = nextCoord.join(';');

        if (!grid.isInside(nextCoord) || grid.getValue(nextCoord) == 1 || visitedMap.get(strNextCoord)) {
          continue;
        }

        frontierCoordList.push(nextCoord);
        visitedMap.set(strNextCoord, { pos: nextCoord, origin: frontierCoord });

        if (grid.isSame(nextCoord, endCoord)) {
          find = true;
          break;
        }
      }
    }

    const path: Array<T> = [];
    let visited = visitedMap.get(endCoord.join(';'));

    while (visited) {
      path.unshift(visited.pos);
      visited = visitedMap.get(visited.origin ? visited.origin.join(';') : '');
    }

    return path;
  }

  /**
   * The "heuristic" function returns an array of directions to move from point A to point B on a given
   * grid.
   * @param grid - The `grid` parameter is an instance of the `AIPathGrid` class, which represents a grid
   * used for pathfinding. It contains information about the obstacles and walkable areas in the grid.
   * @param {T} a - The parameter "a" represents the starting position in the grid.
   * @param {T} b - The parameter "b" represents the destination position in the grid.
   * @returns An array of directions from point a to point b.
   */
  heuristic(grid: AIPathGrid<T>, a: T, b: T): Array<T> {
    return grid.getDirections(a, b);
  }
}

export { AIPathGridSolver };