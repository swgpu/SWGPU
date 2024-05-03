import { UT } from '../core/utils';
import { Gfx3BoundingBox } from './gfx3_bounding_box';

/**
 * A 3D bounding cylinder.
 */
class Gfx3BoundingCylinder {
  position: vec3;
  height: number;
  radius: number;

  /**
   * @param {vec3} position - The bottom-center position.
   * @param {number} height - The height.
   * @param {number} radius - The radius.
   */
  constructor(position: vec3 = [0, 0, 0], height: number = 1, radius: number = 1) {
    this.position = position;
    this.height = height;
    this.radius = radius;
  }

  /**
   * Creates a new instance from center and size.
   * 
   * @param {number} x - The cylinder center.
   * @param {number} y - The cylinder center.
   * @param {number} z - The cylinder center.
   * @param {number} h - The height.
   * @param {number} r - The radius.
   */
  static createFromCenter(x: number, y: number, z: number, h: number, r: number): Gfx3BoundingCylinder {
    const cylinder = new Gfx3BoundingCylinder();
    cylinder.position = [x, y - (h * 0.5), z];
    cylinder.height = h;
    cylinder.radius = r;
    return cylinder;
  }

  /**
   * Creates a new instance from bounding box.
   * 
   * @param {Gfx3BoundingBox} aabb - The bounding box.
   */
  static createFromBoundingBox(aabb: Gfx3BoundingBox): Gfx3BoundingCylinder {
    const cylinder = new Gfx3BoundingCylinder();
    const center = aabb.getCenter();
    cylinder.position = [center[0], aabb.min[1], center[2]];
    cylinder.height = aabb.getHeight();
    cylinder.radius = aabb.getRadius();
    return cylinder;
  }

  /**
   * Checks if a given point is inside.
   * 
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   * @param {number} z - The z-coordinate of the point.
   */
  isPointInside(x: number, y: number, z: number): boolean {
    return UT.COLLIDE_POINT_TO_CYLINDER([x, y, z], this.position, this.height, this.radius);
  }

  /**
   * Checks if two bounding cylinders intersect.
   * 
   * @param {Gfx3BoundingCylinder} cylinder - The second cylinder.
   * @param outVelocity - The out elastic collision velocity.
   */
  intersectBoundingCylinder(cylinder: Gfx3BoundingCylinder, outVelocityImpact: vec2 = [0, 0]): boolean {
    return UT.COLLIDE_CYLINDER_TO_CYLINDER(
      this.position,
      this.radius,
      this.height,
      cylinder.getPosition(),
      cylinder.getRadius(),
      cylinder.getHeight(),
      outVelocityImpact
    );
  }

  /**
   * Reset to default values.
   */
  reset(): void {
    this.position = [0, 0, 0];
    this.height = 1;
    this.radius = 1;
  }

  /**
   * Returns the bottom position.
   */
  getPosition(): vec3 {
    return this.position;
  }

  /**
   * Returns the height.
   */
  getHeight(): number {
    return this.height;
  }

  /**
   * Returns the radius.
   */
  getRadius(): number {
    return this.radius;
  }

  /**
   * Set the position (bottom origin).
   * 
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   */
  setPosition(x: number, y: number, z: number): void {
    this.position = [x, y, z];
  }

  /**
   * Set the height.
   * 
   * @param {number} height - The height.
   */
  setHeight(height: number): void {
    this.height = height;
  }

  /**
   * Set the radius.
   * 
   * @param {number} radius - The radius.
   */
  setRadius(radius: number): void {
    this.radius = radius;
  }
}

export { Gfx3BoundingCylinder };