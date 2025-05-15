/**
 * A 2D bounding rectangle.
 */
declare class Gfx2BoundingRect {
    min: vec2;
    max: vec2;
    /**
     * @param {vec2} min - The minimum point of the bounding rectangle.
     * @param {vec2} max - The maximum point of the bounding rectangle.
     */
    constructor(min?: vec2, max?: vec2);
    /**
     * Creates a new instance from min & max.
     *
     * @param {number} minx - The minimum x-coordinate of the bounding rectangle.
     * @param {number} miny - The minimum y-coordinate of the bounding rectangle.
     * @param {number} maxx - The maximum x-coordinate of the bounding rectangle.
     * @param {number} maxy - The maximum y-coordinate of the bounding rectangle.
     */
    static createFrom(minx: number, miny: number, maxx: number, maxy: number): Gfx2BoundingRect;
    /**
     * Creates a new instance from coordinates & size.
     *
     * @param {number} x - The x-coordinate of the top-left corner of the bounding rectangle.
     * @param {number} y - The y-coordinate of the top-left corner of the bounding rectangle.
     * @param {number} w - The width of the bounding rectangle.
     * @param {number} h - The height of the bounding rectangle.
     */
    static createFromCoord(x: number, y: number, w: number, h: number): Gfx2BoundingRect;
    /**
     * Creates a new instance from center coordinates & size.
     *
     * @param {number} x - The x-coordinate of the center of the bounding rectangle.
     * @param {number} y - The y-coordinate of the center of the bounding rectangle.
     * @param {number} w - The width of the bounding rectangle.
     * @param {number} h - The height of the bounding rectangle.
     */
    static createFromCenter(x: number, y: number, w: number, h: number): Gfx2BoundingRect;
    /**
     * Takes a list of vertices and set the new minimum and maximum values.
     *
     * @param vertices - The list of vertices. Each pair of numbers represents the x and y coordinates of a point.
     */
    static createFromVertices(vertices: Array<number>): Gfx2BoundingRect;
    /**
     * Takes a list of vertices and set the new minimum and maximum values.
     *
     * @param vertices - The list of vertices. Each pair of numbers represents the x and y coordinates of a point.
     */
    fromVertices(vertices: Array<number>): void;
    /**
     * Merge and returns the union of two rectangles.
     *
     * @param {Gfx2BoundingRect} rect - The second rectangle.
     */
    merge(rect: Gfx2BoundingRect): Gfx2BoundingRect;
    /**
     * Returns the center point of the rectangle.
     */
    getCenter(): vec2;
    /**
     * Returns the width and height of the rectangle.
     */
    getSize(): vec2;
    /**
     * Returns the width.
     */
    getWidth(): number;
    /**
     * Returns the height.
     */
    getHeight(): number;
    /**
     * Returns the radius of a circumscribed circle to the rectangle.
     */
    getRadius(): number;
    /**
     * Returns the perimeter of the rectangle.
     */
    getPerimeter(): number;
    /**
     * Returns the volume of a the rectangle.
     */
    getVolume(): number;
    /**
     * Returns the transformed bounding rectangle.
     *
     * @param {mat3} matrix - Used to transform the points of the bounding rectangle.
     */
    transform(matrix: mat3): Gfx2BoundingRect;
    /**
     * Split the bounding box on x-axis and returns boxes for each side.
     */
    splitVertical(): Array<Gfx2BoundingRect>;
    /**
     * Split the bounding box on y-axis and returns boxes for each side.
     */
    splitHorizontal(): Array<Gfx2BoundingRect>;
    /**
     * Checks if a given point is inside the rectangle.
     *
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     */
    isPointInside(x: number, y: number): boolean;
    /**
     * Checks if two bounding rectangles intersect.
     *
     * @param {Gfx2BoundingRect} aabr - The second rectangle.
     */
    intersectBoundingRect(aabr: Gfx2BoundingRect): boolean;
    /**
     * Get lines of the bounding rectangle.
     */
    getLines(): {
        l: [vec2, vec2];
        t: [vec2, vec2];
        r: [vec2, vec2];
        b: [vec2, vec2];
    };
}
export { Gfx2BoundingRect };
