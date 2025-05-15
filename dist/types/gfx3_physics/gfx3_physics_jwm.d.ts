import { Gfx2BoundingRect } from '../gfx2/gfx2_bounding_rect';
import { Gfx2TreePartition } from '../gfx2/gfx2_tree_partition';
declare class Sector extends Gfx2BoundingRect {
    index: number;
    v1: vec3;
    v2: vec3;
    v3: vec3;
    n: vec3;
    t: vec3;
    constructor(index: number, a: vec3, b: vec3, c: vec3);
}
interface Neighbor {
    s1: number;
    s2: number;
    s3: number;
}
interface Shared {
    sectorIds: Array<number>;
}
interface Point {
    sectorIndex: number;
    x: number;
    y: number;
    z: number;
}
interface Walker {
    id: string;
    points: Array<Point>;
}
interface ResMoveWalker {
    walker: Walker;
    move: vec3;
    collide: boolean;
}
interface ResMovePoint {
    point: Point;
    move: vec3;
    collide: boolean;
}
/**
 * A 3D walkmesh.
 * In collision case, the collision response sliding along the edges of the walkmesh to keep a good feeling for the player.
 */
declare class Gfx3PhysicsJWM {
    #private;
    boundingRect: Gfx2BoundingRect;
    sectors: Array<Sector>;
    sectorColors: Array<vec3>;
    neighborPool: Array<Neighbor>;
    sharedPool: Array<Shared>;
    btree: Gfx2TreePartition;
    points: Map<string, Point>;
    walkers: Map<string, Walker>;
    debugVertices: Array<number>;
    debugVertexCount: number;
    constructor();
    /**
     * Load asynchronously walkmesh data from a json file (jwm).
     *
     * @param {string} path - The file path.
     * @param {number} bspMaxChildren - The maximum of children per bsp node.
     * @param {number} bspMaxDepth - The maximum depth for bsp tree.
     */
    loadFromFile(path: string, bspMaxChildren?: number, bspMaxDepth?: number): Promise<void>;
    /**
     * Load asynchronously walkmesh data from a binary file (bwm).
     *
     * @param {string} path - The file path.
     * @param {number} bspMaxChildren - The maximum of children per bsp node.
     * @param {number} bspMaxDepth - The maximum depth for bsp tree.
     */
    loadFromBinaryFile(path: string, bspMaxChildren?: number, bspMaxDepth?: number): Promise<void>;
    /**
     * The update function.
     */
    update(): void;
    /**
     * The draw function.
     */
    draw(): void;
    /**
     * Add a single point.
     *
     * @param {string} id - A unique identifier.
     * @param {number} x - The x-coordinate of the point position.
     * @param {number} z - The z-coordinate of the point position.
     */
    addPoint(id: string, x: number, z: number): void;
    /**
     * Remove a point.
     *
     * @param {string} id - A unique identifier.
     */
    removePoint(id: string): void;
    /**
     * Returns a point.
     *
     * @param {string} id - A unique identifier.
     */
    getPoint(id: string): Point;
    /**
     * Move a point.
     *
     * @param {Point} point - The point reference.
     * @param {number} mx - The movement in the x-axis.
     * @param {number} mz - The movement in the z-axis.
     */
    movePoint(point: Point, mx: number, mz: number): ResMovePoint;
    /**
     * Add a walker.
     * Note: A walker is a square composed by 5 rigid points.
     *
     * @param {string} id - A unique identifier.
     * @param {number} x - The x-coordinate of the walker's starting position.
     * @param {number} z - The z-coordinate of the walker's starting position.
     * @param {number} size - The size.
     */
    addWalker(id: string, x: number, z: number, size: number): Walker;
    /**
     * Remove a walker.
     *
     * @param {string} id - A unique identifier.
     */
    removeWalker(id: string): void;
    /**
     * Returns a walker.
     *
     * @param {string} id - A unique identifier.
     */
    getWalker(id: string): Walker;
    /**
     * Move a walker.
     *
     * @param {Walker} walker - The walker reference.
     * @param {number} mx - The movement in the x-axis.
     * @param {number} mz - The movement in the z-axis.
     */
    moveWalker(walker: Walker, mx: number, mz: number): ResMoveWalker;
    /**
     * Delete all walkers.
     */
    clearWalkers(): void;
    /**
     * Return sector.
     *
     * @param {number} sectorIndex - The sector index.
     */
    getSector(sectorIndex: number): Sector;
    /**
     * Return sector color.
     *
     * @param {number} sectorIndex - The sector index.
     */
    getSectorColor(sectorIndex: number): vec3;
    /**
     * Return the binary tree.
     */
    getBinaryTree(): Gfx2TreePartition;
}
export { Gfx3PhysicsJWM };
