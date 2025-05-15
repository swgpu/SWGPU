import { Gfx3BoundingBox } from '../gfx3/gfx3_bounding_box';
import { Gfx3TreePartition } from '../gfx3/gfx3_tree_partition';
declare class Frag extends Gfx3BoundingBox {
    index: number;
    v1: vec3;
    v2: vec3;
    v3: vec3;
    n: vec3;
    t: vec3;
    constructor(index: number, a: vec3, b: vec3, c: vec3);
}
interface ResBox {
    move: vec3;
    collideFloor: boolean;
    collideTop: boolean;
    collideWall: boolean;
    fragIndex: number;
}
interface ResRaycast {
    hit: vec3;
    distance: number;
    fragIndex: number;
}
interface ResElevation {
    hit: vec3;
    distance: number;
    fragIndex: number;
}
/**
 * A 3D hit mesh.
 */
declare class Gfx3PhysicsJNM {
    #private;
    boundingBox: Gfx3BoundingBox;
    frags: Array<Frag>;
    fragColors: Array<vec3>;
    btree: Gfx3TreePartition;
    debugMeshEnabled: boolean;
    debugBspEnabled: boolean;
    debugVertices: Array<number>;
    debugVertexCount: number;
    constructor();
    /**
     * Load asynchronously navmesh data from a json file (jnm).
     *
     * @param {string} path - The file path.
     * @param {number} bspMaxChildren - The maximum of children per bsp node.
     * @param {number} bspMaxDepth - The maximum depth for bsp tree.
     */
    loadFromFile(path: string, bspMaxChildren?: number, bspMaxDepth?: number): Promise<void>;
    /**
     * Load asynchronously navmesh data from a binary file (bnm).
     *
     * @param {string} path - The file path.
     * @param {number} bspMaxChildren - The maximum of children per bsp node.
     * @param {number} bspMaxDepth - The maximum depth for bsp tree.
     */
    loadFromBinaryFile(path: string, bspMaxChildren?: number, bspMaxDepth?: number): Promise<void>;
    /**
     * The update function.
     */
    update(ts: number): void;
    /**
     * The draw function.
     */
    draw(): void;
    /**
     * Translate the position.
     *
     * @param {number} x - The amount of translation in the x-axis direction.
     * @param {number} y - The amount of translation in the y-axis direction.
     * @param {number} z - The amount of translation in the z-axis direction.
     */
    translate(x: number, y: number, z: number): void;
    /**
     * Returns a new move with smooth sliding along wall and floor for the given box.
     * Infos are composed to a move vector, a wall collide flag and floor collide flag.
     *
     * @param {number} x - The x position of the box center.
     * @param {number} y - The y position of the box center.
     * @param {number} z - The z position of the box center.
     * @param {number} size - The size of the box.
     * @param {number} height - The height of the box.
     * @param {number} mx - The movement in the x-axis.
     * @param {number} my - The movement in the y-axis.
     * @param {number} mz - The movement in the z-axis.
     * @param {number} lift - The lift is used to elevate the virtual bounding box to let passing over little step or micro obstacles on the floor.
     * @param {number} snapFloor - Enable or disable floor snapping.
     * @param {number} snapFloorDistance - Minimum distance to snap the floor.
     */
    box(x: number, y: number, z: number, size: number, height: number, mx: number, my: number, mz: number, lift?: number, snapFloor?: boolean, snapFloorDistance?: number): ResBox;
    /**
     * Returns the ray hit point or null if no hit occured.
     *
     * @param {vec3} origin - The ray origin.
     * @param {vec3} dir - The ray direction.
     * @param {number} size - The size of ray area.
     * @param {number} height - The height of ray area.
     */
    raycast(origin: vec3, dir: vec3, size: number, height: number): ResRaycast | null;
    /**
     * Returns the field elevation.
     *
     * @param {number} x - The x position of sensor.
     * @param {number} y - The y position of sensor.
     * @param {number} z - The z position of sensor.
     * @param {number} size - The size of sensor area.
     * @param {number} height - The height of sensor area.
     * @param {number} mx - The movement in x-axis.
     * @param {number} mz - The movement in z-axis.
     */
    getElevation(x: number, y: number, z: number, size: number, height: number, mx: number, mz: number): ResElevation | null;
    /**
     * Enable the debug bsp display.
     *
     * @param {boolean} enabled - The enabled flag.
     */
    enableDebugBsp(enabled: boolean): void;
    /**
     * Enable the debug mesh display.
     *
     * @param {boolean} enabled - The enabled flag.
     */
    enableDebugMesh(enabled: boolean): void;
    /**
     * Check if bsp debugging is enabled.
     */
    isDebugBspEnabled(): boolean;
    /**
     * Check if mesh debugging is enabled.
     */
    isDebugMeshEnabled(): boolean;
    /**
     * Returns the btree.
     */
    getBinaryTree(): Gfx3TreePartition;
    /**
     * Return frag.
     *
     * @param {number} fragIndex - The frag index.
     */
    getFrag(fragIndex: number): Frag;
    /**
     * Return frag color.
     *
     * @param {number} fragIndex - The frag index.
     */
    getFragColor(fragIndex: number): vec3;
    /**
     * Return bounding box.
     */
    getBoundingBox(): Gfx3BoundingBox;
}
export { Gfx3PhysicsJNM };
