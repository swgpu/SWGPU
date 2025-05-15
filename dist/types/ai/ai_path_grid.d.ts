/**
 * A general grid representation.
 * @typeParam T - The grid dimensions.
 */
declare abstract class AIPathGrid<T extends vec2 | vec3> {
    grid: Array<number>;
    size: T;
    /**
     * @param size - The grid size.
     * @param grid - The grid data.
     */
    constructor(size: T, grid?: number[]);
    /**
     * Return value of cell.
     *
     * @param pos - The cell position.
     */
    abstract getValue(pos: T): number;
    /**
     * Return all ortho vectors between two positions fitting from nearest to farest the direction.
     *
     * @param a - The cell position A.
     * @param b - The cell position B.
     */
    abstract getDirections(a: T, b: T): Array<T>;
    /**
     * Check if position is inside the grid.
     *
     * @param pos - The cell position.
     */
    abstract isInside(pos: T): boolean;
    /**
     * Check if position A and position B are same.
     *
     * @param a - The cell position A.
     * @param b - The cell position B.
     */
    abstract isSame(a: T, b: T): boolean;
    /**
     * Asynchronously loads path grid data from a json file (grd).
     *
     * @param {string} path - The file path.
     */
    loadFromFile(path: string): Promise<void>;
}
/**
 * A 2D grid representation.
 */
declare class AIPathGrid2D extends AIPathGrid<vec2> {
    /**
     * @param size - The grid size.
     * @param grid - The grid data.
     */
    constructor(size?: vec2, grid?: number[]);
    /**
     * Return value of cell.
     *
     * @param pos - The cell position.
     */
    getValue(pos: vec2): number;
    /**
     * Return all ortho vectors between two positions fitting from nearest to farest the direction.
     *
     * @param a - The cell position A.
     * @param b - The cell position B.
     */
    getDirections(a: vec2, b: vec2): Array<vec2>;
    /**
     * Check if position is inside the grid.
     *
     * @param pos - The cell position.
     */
    isInside(pos: vec2): boolean;
    /**
     * Check if position A and position B are same.
     *
     * @param a - The cell position A.
     * @param b - The cell position B.
     */
    isSame(a: vec2, b: vec2): boolean;
}
/**
 * A 3D grid representation.
 */
declare class AIPathGrid3D extends AIPathGrid<vec3> {
    /**
     * @param size - The grid size.
     * @param grid - The grid data.
     */
    constructor(size?: vec3, grid?: number[]);
    /**
     * Return value of cell.
     *
     * @param pos - The cell position.
     */
    getValue(pos: vec3): number;
    /**
     * Return all ortho vectors between two positions fitting from nearest to farest the direction.
     *
     * @param a - The cell position A.
     * @param b - The cell position B.
     */
    getDirections(a: vec3, b: vec3): Array<vec3>;
    /**
     * Check if position is inside the grid.
     *
     * @param pos - The cell position.
     */
    isInside(pos: vec3): boolean;
    /**
     * Check if position A and position B are same.
     *
     * @param a - The cell position A.
     * @param b - The cell position B.
     */
    isSame(a: vec3, b: vec3): boolean;
}
export { AIPathGrid, AIPathGrid2D, AIPathGrid3D };
