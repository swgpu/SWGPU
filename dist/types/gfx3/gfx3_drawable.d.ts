import { VertexSubBuffer } from './gfx3_manager';
import { Poolable } from '../core/object_pool';
import { Gfx3Transformable } from './gfx3_transformable';
import { Gfx3BoundingBox } from './gfx3_bounding_box';
/**
 * A 3D drawable object.
 */
declare class Gfx3Drawable extends Gfx3Transformable implements Poolable<Gfx3Drawable> {
    id: vec4;
    vertexSubBuffer: VertexSubBuffer;
    vertices: Array<number>;
    vertexCount: number;
    vertexStride: number;
    boundingBox: Gfx3BoundingBox;
    /**
     * @param {number} vertexStride - The number of attributes for each vertex.
     */
    constructor(vertexStride: number);
    /**
     * Free all resources.
     * Warning: You need to call this method to free allocation for this object.
     */
    delete(): void;
    /**
     * Virtual update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * Virtual draw function.
     */
    draw(): void;
    /**
     * Prepare your vertex buffer to write process.
     * Warning: You need to call this method before define your vertices.
     *
     * @param {number} vertexCount - The number of vertices.
     */
    beginVertices(vertexCount: number): void;
    /**
     * Add a vertex.
     *
     * @param v - The attributes data of the vertex.
     */
    defineVertex(...v: Array<number>): void;
    /**
     * Set vertices.
     *
     * @param vertices - The list of vertices.
     */
    setVertices(vertices: Array<number>): void;
    /**
     * Close your vertex buffer to write process.
     */
    endVertices(): void;
    /**
     * Returns the vertex sub-buffer offset in the global vertex buffer.
     * Nota bene: All vertices are stored in one global vertex buffer handled by "Gfx3Manager".
     * SubBuffer is just a reference offset/size pointing to the big one buffer.
     */
    getVertexSubBufferOffset(): number;
    /**
     * Returns the byte length of the vertex sub buffer.
     */
    getVertexSubBufferSize(): number;
    /**
     * Returns vertices.
     */
    getVertices(): Array<number>;
    /**
     * Returns the number of vertices.
     */
    getVertexCount(): number;
    /**
     * Set an identifier based on three components.
     * Note: WARME use some specials ID's in its internal pipeline, check the table below:
     * ■ decals group: g = n
     * ■ lights group: b = n
     * ■ pixelation: a = 1
     * ■ color limitation: a = 2
     * ■ dither: a = 4
     * ■ outline: a = 8
     * ■ shadow volume: a = 16
     *
     * @param {number} r - The pur identifier you can use for custom stuff.
     * @param {number} g - The decals group.
     * @param {number} b - The lights group.
     * @param {number} a - The flags value for specials effects.
     */
    setId(r: number, g: number, b: number, a: number): void;
    /**
     * Set a single identifier component.
     *
     * @param {number} index - The component index.
     * @param {number} value - The identifier value.
     */
    setSingleId(index: number, value: number): void;
    /**
     * Returns the identifier.
     */
    getId(): vec4;
    /**
     * Returns the identifier as string.
     */
    getStringId(): string;
    /**
     * Set the bounding box.
     *
     * @param {Gfx3BoundingBox} boundingBox - The bounding box.
     */
    setBoundingBox(boundingBox: Gfx3BoundingBox): void;
    /**
     * Returns the bounding box.
     */
    getBoundingBox(): Gfx3BoundingBox;
    /**
     * Returns the bounding box in the world space coordinates.
     */
    getWorldBoundingBox(): Gfx3BoundingBox;
    /**
     * Clone the object.
     *
     * @param {Gfx3Drawable} drawable - The copy object.
     * @param {mat4} transformMatrix - The transformation matrix.
     */
    clone(drawable?: Gfx3Drawable, transformMatrix?: mat4): Gfx3Drawable;
}
export { Gfx3Drawable };
