export function makeDebugDraw(ctx: CanvasRenderingContext2D, pixelsPerMeter: number, box2D: typeof Box2D & EmscriptenModule): Box2D.JSDraw & {
    /**
     * @param {number} vert1_p pointer to {@link Box2D.b2Vec2}
     * @param {number} vert2_p pointer to {@link Box2D.b2Vec2}
     * @param {number} color_p pointer to {@link Box2D.b2Color}
     * @returns {void}
     */
    DrawSegment(vert1_p: number, vert2_p: number, color_p: number): void;
    /**
     * @param {number} vertices_p pointer to Array<{@link Box2D.b2Vec2}>
     * @param {number} vertexCount
     * @param {number} color_p pointer to {@link Box2D.b2Color}
     * @returns {void}
     */
    DrawPolygon(vertices_p: number, vertexCount: number, color_p: number): void;
    /**
     * @param {number} vertices_p pointer to Array<{@link Box2D.b2Vec2}>
     * @param {number} vertexCount
     * @param {number} color_p pointer to {@link Box2D.b2Color}
     * @returns {void}
     */
    DrawSolidPolygon(vertices_p: number, vertexCount: number, color_p: number): void;
    /**
     * @param {number} center_p pointer to {@link Box2D.b2Vec2}
     * @param {number} radius
     * @param {number} color_p pointer to {@link Box2D.b2Color}
     * @returns {void}
     */
    DrawCircle(center_p: number, radius: number, color_p: number): void;
    /**
     * @param {number} center_p pointer to {@link Box2D.b2Vec2}
     * @param {number} radius
     * @param {number} axis_p pointer to {@link Box2D.b2Vec2}
     * @param {number} color_p pointer to {@link Box2D.b2Color}
     * @returns {void}
     */
    DrawSolidCircle(center_p: number, radius: number, axis_p: number, color_p: number): void;
    /**
     * @param {number} transform_p pointer to {@link Box2D.b2Transform}
     * @returns {void}
     */
    DrawTransform(transform_p: number): void;
    /**
     * @param {number} vertex_p pointer to {@link Box2D.b2Vec2}
     * @param {number} sizeMetres
     * @param {number} pointer to {@link Box2D.b2Color}
     * @returns {void}
     */
    DrawPoint(vertex_p: number, sizeMetres: number, color_p: any): void;
};
/**
 * Forked from Box2D.js
 */
export type Box2DFactory = (moduleOverrides?: Partial<typeof Box2D & EmscriptenModule> | undefined) => Promise<typeof Box2D & EmscriptenModule>;
