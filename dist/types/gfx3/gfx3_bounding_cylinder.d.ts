import { Gfx3BoundingBox } from './gfx3_bounding_box';
/**
 * A 3D bounding cylinder.
 */
declare class Gfx3BoundingCylinder {
    position: vec3;
    height: number;
    radius: number;
    /**
     * @param {vec3} position - The bottom-center position.
     * @param {number} height - The height.
     * @param {number} radius - The radius.
     */
    constructor(position?: vec3, height?: number, radius?: number);
    /**
     * Creates a new instance from center and size.
     *
     * @param {number} x - The cylinder center.
     * @param {number} y - The cylinder center.
     * @param {number} z - The cylinder center.
     * @param {number} h - The height.
     * @param {number} r - The radius.
     */
    static createFromCenter(x: number, y: number, z: number, h: number, r: number): Gfx3BoundingCylinder;
    /**
     * Creates a new instance from bounding box.
     *
     * @param {Gfx3BoundingBox} aabb - The bounding box.
     */
    static createFromBoundingBox(aabb: Gfx3BoundingBox): Gfx3BoundingCylinder;
    /**
     * Checks if a given point is inside.
     *
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @param {number} z - The z-coordinate of the point.
     */
    isPointInside(x: number, y: number, z: number): boolean;
    /**
     * Checks if two bounding cylinders intersect.
     *
     * @param {Gfx3BoundingCylinder} cylinder - The second cylinder.
     * @param outVelocity - The out elastic collision velocity.
     */
    intersectBoundingCylinder(cylinder: Gfx3BoundingCylinder, outVelocityImpact?: vec2): boolean;
    /**
     * Reset to default values.
     */
    reset(): void;
    /**
     * Returns the bottom position.
     */
    getPosition(): vec3;
    /**
     * Returns the height.
     */
    getHeight(): number;
    /**
     * Returns the radius.
     */
    getRadius(): number;
    /**
     * Set the position (bottom origin).
     *
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {number} z - The z-coordinate.
     */
    setPosition(x: number, y: number, z: number): void;
    /**
     * Set the height.
     *
     * @param {number} height - The height.
     */
    setHeight(height: number): void;
    /**
     * Set the radius.
     *
     * @param {number} radius - The radius.
     */
    setRadius(radius: number): void;
}
export { Gfx3BoundingCylinder };
