import { AIPathGrid } from './ai_path_grid';

interface Visited<T> {
  pos: T;
  origin: T | null;
};

/**
 * Implements the A* algorithm to find the shortest path between a start coordinate and an end coordinate on a grid.
 * @typeParam T - The coord type: vec2 or vec3.
 */
class AIPathGridSolver<T extends vec2 | vec3> {
  /**
   * Find the shortest path between a start node and an end node in a given grid and returns the path.
   * 
   * @param grid - A grid representing the pathfinding area. It contains information about the obstacles and the values of each cell (empty = 0, obstacle = 1).
   * @param startCoord - The starting position in the grid.
   * @param endCoord - The destination position in the grid.
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
   * Returns an array of more closest to least close directions to move from point A to point B on a given grid.
   *
   * @param grid - The grid.
   * @param {T} a - The starting position in the grid.
   * @param {T} b - The destination position in the grid.
   */
  heuristic(grid: AIPathGrid<T>, a: T, b: T): Array<T> {
    return grid.getDirections(a, b);
  }
}

export { AIPathGridSolver };