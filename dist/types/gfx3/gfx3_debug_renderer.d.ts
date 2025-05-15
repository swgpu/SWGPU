/// <reference types="@webgpu/types" />
import { Gfx3RendererAbstract } from './gfx3_renderer_abstract';
import { Gfx3DynamicGroup } from '../gfx3/gfx3_group';
interface Command {
    vertices: Float32Array;
    vertexCount: number;
    matrix: mat4;
}
/**
 * Singleton debug renderer.
 */
declare class Gfx3DebugRenderer extends Gfx3RendererAbstract {
    device: GPUDevice;
    vertexBuffer: GPUBuffer;
    vertexCount: number;
    commands: Array<Command>;
    showDebug: boolean;
    grp0: Gfx3DynamicGroup;
    mvpcMatrix: Float32Array;
    constructor();
    /**
     * The render function.
     */
    render(): void;
    /**
     * Draw a set of vertices in line-list topology.
     *
     * @param vertices - A list of vertices.
     * @param {number} vertexCount - The number of vertices.
     * @param {mat4} matrix - The transformation matrix.
     */
    drawVertices(vertices: Array<number>, vertexCount: number, matrix?: mat4): void;
    /**
     * Draw a wireframe cylinder.
     *
     * @param {mat4} matrix - The transformation matrix.
     * @param {number} radius - The radius of the cylinder.
     * @param {number} height - The height of the cylinder.
     * @param {number} step - The number of divisions or segments in the cylinder.
     * @param {boolean} closed - Indicating whether the cylinder should be closed or not.
     * @param {vec3} color - The color of the cylinder.
     */
    drawCylinder(matrix: mat4, radius: number, height: number, step: number, closed: boolean, color?: vec3): void;
    /**
     * Draw a wireframe grid.
     *
     * @param {mat4} matrix - The transformation matrix.
     * @param {number} [extend=3] - The number of cells in each direction from the center of the grid.
     * For example, if `extend` is set to 3, then there will be 7 cells in each direction (total of 49 cells).
     * @param {number} [spacing=1] - The distance between each grid line.
     * @param {vec3} color - The color of the grid.
     */
    drawGrid(matrix: mat4, extend?: number, spacing?: number, color?: vec3): void;
    /**
     * Draw a gizmo.
     *
     * @param {mat4} matrix - The transformation matrix.
     * @param {number} [size=1] - The length of each axis of the gizmo.
     */
    drawGizmo(matrix: mat4, size?: number): void;
    /**
     * Draw a wireframe circle.
     *
     * @param {mat4} matrix - The transformation matrix.
     * @param {number} [radius=1] - The radius of the circle that will be drawn.
     * @param {number} [step=4] - The level of detail or smoothness of the circle.
     * @param {vec3} color - The color of the circle.
     */
    drawCircle(matrix: mat4, radius?: number, step?: number, color?: vec3): void;
    /**
     * Draw a wireframe rectangle.
     *
     * @param {mat4} matrix - The transformation matrix.
     * @param {vec2} min - The minimum point of the bounding rectangle.
     * @param {vec2} max - The maximum point of the bounding rectangle.
     * @param {vec3} color - The color of the bounding rectangle.
     */
    drawBoundingRect(matrix: mat4, min: vec2, max: vec2, color?: vec3): void;
    /**
     * Draw a wireframe sphere.
     *
     * @param {mat4} matrix - The transformation matrix.
     * @param {number} [radius=1] - The radius of the sphere.
     * @param {number} [step=4] - The level of detail or smoothness of the sphere.
     * @param {vec3} color - The color of sphere.
     */
    drawSphere(matrix: mat4, radius?: number, step?: number, color?: vec3): void;
    /**
     * Draw a wireframe bounding box.
     *
     * @param {mat4} matrix - The transformation matrix.
     * @param {vec3} min - The minimum point of the bounding box.
     * @param {vec3} max - The maximum point of the bounding box.
     * @param {vec3} color - The color of the bounding box.
     */
    drawBoundingBox(matrix: mat4, min: vec3, max: vec3, color?: vec3): void;
    /**
     * Check if debug display is enabled.
     */
    isShowDebug(): boolean;
    /**
     * Set the show debug flag.
     *
     * @param {boolean} showDebug - The showDebug flag.
     */
    setShowDebug(showDebug: boolean): void;
}
export { Gfx3DebugRenderer };
export declare const gfx3DebugRenderer: Gfx3DebugRenderer;
