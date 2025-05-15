/**
 * A 3D bounding box.
 */
declare class Gfx3BoundingBox {
    min: vec3;
    max: vec3;
    /**
     * @param {vec2} min - The minimum point of the bounding box.
     * @param {vec2} max - The maximum point of the bounding box.
     */
    constructor(min?: vec3, max?: vec3);
    /**
     * Creates a new instance from coordinates and size.
     *
     * @param {number} x - The x-coordinate of the bottom-left-front corner of the bounding box.
     * @param {number} y - The y-coordinate of the bottom-left-front corner of the bounding box.
     * @param {number} z - The z-coordinate of the bottom-left-front corner of the bounding box.
     * @param {number} w - The width of the bounding box.
     * @param {number} h - The height of the bounding box.
     * @param {number} d - The depth of the bounding box.
     */
    static createFromCoord(x: number, y: number, z: number, w: number, h: number, d: number): Gfx3BoundingBox;
    /**
     * Creates a new instance from center and size.
     *
     * @param {number} x - The x-coordinate of the center of the bounding box.
     * @param {number} y - The y-coordinate of the center of the bounding box.
     * @param {number} z - The z-coordinate of the center of the bounding box.
     * @param {number} w - The width of the bounding box.
     * @param {number} h - The height of the bounding box.
     * @param {number} d - The depth of the bounding box.
     */
    static createFromCenter(x: number, y: number, z: number, w: number, h: number, d: number): Gfx3BoundingBox;
    /**
     * Creates a new instance from vertices.
     *
     * @param vertices - The list of vertices.
     * @param vertexStride - The vertex stride (will take always first tree values).
     */
    static createFromVertices(vertices: Float32Array | Array<number>, vertexStride: number): Gfx3BoundingBox;
    /**
     * Merge and returns the union of some boxes.
     *
     * @param {Array<Gfx3BoundingBox>} aabbs - The list of boxes.
     */
    static merge(aabbs: Array<Gfx3BoundingBox>): Gfx3BoundingBox;
    /**
     * Takes a list of vertices and set the new minimum and maximum values.
     *
     * @param vertices - The list of vertices.
     * @param vertexStride - The vertex stride (will take always first tree values).
     */
    fromVertices(vertices: Float32Array | Array<number>, vertexStride: number): void;
    /**
     * Merge and returns the union of two boxes.
     *
     * @param {Gfx3BoundingBox} aabb - The second box.
     */
    merge(aabb: Gfx3BoundingBox): Gfx3BoundingBox;
    /**
     * Returns the center point of the box.
     */
    getCenter(): vec3;
    /**
     * Returns the width, height and depth of the box.
     */
    getSize(): vec3;
    /**
     * Returns the width.
     */
    getWidth(): number;
    /**
     * Returns the height.
     */
    getHeight(): number;
    /**
     * Returns the depth.
     */
    getDepth(): number;
    /**
     * Returns the radius of a circumscribed circle to the box.
     */
    getRadius(): number;
    /**
     * Returns the perimeter of the box.
     */
    getPerimeter(): number;
    /**
     * Returns the volume of a the box.
     */
    getVolume(): number;
    /**
     * Returns the transformed bounding box.
     *
     * @param {mat4} matrix - Used to transform the points of the bounding box.
     */
    transform(matrix: mat4): Gfx3BoundingBox;
    /**
     * Split the bounding box on x-axis and returns boxes for each side.
     */
    splitVertical(): Array<Gfx3BoundingBox>;
    /**
     * Split the bounding box on y-axis and returns boxes for each side.
     */
    splitHorizontal(): Array<Gfx3BoundingBox>;
    /**
     * Split the bounding box on z-axis and returns boxes for each side.
     */
    splitDepth(): Array<Gfx3BoundingBox>;
    /**
     * Checks if a given point is inside the box.
     *
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @param {number} z - The z-coordinate of the point.
     */
    isPointInside(x: number, y: number, z: number): boolean;
    /**
     * Checks if two bounding boxes intersect.
     *
     * @param {Gfx3BoundingBox} aabb - The second box.
     */
    intersectBoundingBox(aabb: Gfx3BoundingBox): boolean;
    /**
     * Reset min & max values (set to 0).
     */
    reset(): void;
    /**
     * Set the minimum value.
     *
     * @param {vec3} min - The min point of the box.
     */
    setMin(min: vec3): void;
    /**
     * Set the maximum value.
     *
     * @param {vec3} max - The max point of the box.
     */
    setMax(max: vec3): void;
}
export { Gfx3BoundingBox };
