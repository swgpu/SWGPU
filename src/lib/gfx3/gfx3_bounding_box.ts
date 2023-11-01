import { UT } from '../core/utils';

/**
 * The `Gfx3BoundingBox` class represents a 3D bounding box and provides various methods for manipulating
 * and calculating properties of the box.
 */
class Gfx3BoundingBox {
  min: vec3;
  max: vec3;

  /**
   * The constructor.
   * @param {vec2} min - The minimum point of the bounding box.
   * @param {vec2} max - The maximum point of the bounding box.
   */
  constructor(min: vec3 = [0, 0, 0], max: vec3 = [0, 0, 0]) {
    this.min = min;
    this.max = max;
  }

  /**
   * The "createFromCoord" is a static method that creates a new instance of "Gfx3BoundingBox".
   * @param {number} x - The x-coordinate of the bottom-left-front corner of the bounding box.
   * @param {number} y - The y-coordinate of the bottom-left-front corner of the bounding box.
   * @param {number} z - The z-coordinate of the bottom-left-front corner of the bounding box.
   * @param {number} w - The width of the bounding box.
   * @param {number} h - The height of the bounding box.
   * @param {number} d - The depth of the bounding box.
   * @returns a new instance of Gfx3BoundingBox.
   */
  static createFromCoord(x: number, y: number, z: number, w: number, h: number, d: number): Gfx3BoundingBox {
    const aabb = new Gfx3BoundingBox();
    aabb.min[0] = x;
    aabb.min[1] = y;
    aabb.min[2] = z;
    aabb.max[0] = x + w;
    aabb.max[1] = y + h;
    aabb.max[2] = z + d;
    return aabb;
  }

  /**
   * The "createFromCenter" is a static method that creates a new instance of "Gfx3BoundingBox".
   * @param {number} x - The x-coordinate of the center of the bounding box.
   * @param {number} y - The y-coordinate of the center of the bounding box.
   * @param {number} z - The z-coordinate of the center of the bounding box.
   * @param {number} w - The width of the bounding box.
   * @param {number} h - The height of the bounding box.
   * @param {number} d - The depth of the bounding box.
   * @returns a new instance of Gfx3BoundingBox.
   */
  static createFromCenter(x: number, y: number, z: number, w: number, h: number, d: number): Gfx3BoundingBox {
    const box = new Gfx3BoundingBox();
    box.min[0] = x - (w * 0.5);
    box.min[1] = y - (h * 0.5);
    box.min[2] = z - (d * 0.5);
    box.max[0] = x + (w * 0.5);
    box.max[1] = y + (h * 0.5);
    box.max[2] = z + (d * 0.5);
    return box;
  }

  /**
   * The "merge" function takes an array of `Gfx3BoundingBox` objects as input and returns a new `Gfx3BoundingBox`
   * that represents the union of boxes.
   * @param {Array<Gfx3BoundingBox>} aabbs - The `aabbs` parameter is an array of box to merge.
   * @returns The new merged box.
   */
  static merge(aabbs: Array<Gfx3BoundingBox>): Gfx3BoundingBox {
    const min: vec3 = [aabbs[0].min[0], aabbs[0].min[1], aabbs[0].min[2]];
    const max: vec3 = [aabbs[0].max[0], aabbs[0].max[1], aabbs[0].max[2]];

    for (const aabb of aabbs) {
      for (let i = 0; i < 3; i++) {
        min[i] = Math.min(aabb.min[i], min[i]);
        max[i] = Math.max(aabb.max[i], max[i]);
      }
    }

    return new Gfx3BoundingBox(min, max);
  }

  /**
   * The "fromVertices" function takes an array of vertices and calculates the new minimum and maximum values.
   * @param vertices - The `vertices` parameter is an array of numbers representing the coordinates of
   * the points of a shape. Each triplets of numbers represents the x, y and z coordinates of a point.
   */
  fromVertices(vertices: Float32Array | Array<number>, vertexStride: number): void {
    const min: vec3 = [vertices[0], vertices[1], vertices[2]];
    const max: vec3 = [vertices[0], vertices[1], vertices[2]];

    for (let i = 0; i < vertices.length; i += vertexStride) {
      for (let j = 0; j < 3; j++) {
        const v = vertices[i + j];
        min[j] = Math.min(v, min[j]);
        max[j] = Math.max(v, max[j]);
      }
    }

    this.min = min;
    this.max = max;
  }

  /**
   * The "merge" function takes a `Gfx3BoundingBox` object as input and returns a new `Gfx3BoundingBox`
   * that represents the union of the two boxes.
   * @param {Gfx3BoundingBox} aabb - The `aabb` parameter is the box to merge.
   * @returns The new merged box.
   */
  merge(aabb: Gfx3BoundingBox): Gfx3BoundingBox {
    const min: vec3 = [this.min[0], this.min[1], this.min[2]];
    const max: vec3 = [this.max[0], this.max[1], this.max[2]];

    for (let i = 0; i < 3; i++) {
      min[i] = Math.min(aabb.min[i], min[i]);
      max[i] = Math.max(aabb.max[i], max[i]);
    }

    return new Gfx3BoundingBox(min, max);
  }

  /**
   * The "getCenter" function calculates the center point of the box.
   * @returns The center point of the box.
   */
  getCenter(): vec3 {
    const w = this.max[0] - this.min[0];
    const h = this.max[1] - this.min[1];
    const d = this.max[2] - this.min[2];
    const x = this.min[0] + (w * 0.5);
    const y = this.min[1] + (h * 0.5);
    const z = this.min[2] + (d * 0.5);
    return [x, y, z];
  }

  /**
   * The "getSize" function calculates and returns the width, height and depth of the box.
   * @returns The width, height and depth of the box.
   */
  getSize(): vec3 {
    const w = this.max[0] - this.min[0];
    const h = this.max[1] - this.min[1];
    const d = this.max[2] - this.min[2];
    return [w, h, d];
  }

  /**
   * The "getRadius" function calculates the radius of a circumscribed circle to the box.
   * @returns The radius of the circumscribed circle.
   */
  getRadius(): number {
    return UT.VEC3_DISTANCE(this.min, this.max) * 0.5;
  }

  /**
   * The "getPerimeter" function calculates and returns the perimeter of the box.
   * @returns The perimeter of the box.
   */
  getPerimeter(): number {
    const w = this.max[0] - this.min[0];
    const d = this.max[2] - this.min[2];
    return w + w + d + d;
  }

  /**
   * The "getVolume" function calculates the volume of a the box.
   * @returns The volume of the box.
   */
  getVolume(): number {
    const w = this.max[0] - this.min[0];
    const h = this.max[1] - this.min[1];
    const d = this.max[2] - this.min[2];
    return w * h * d;
  }

  /**
   * The "transform" function takes a matrix and transforms the bounding box
   * points, returning a new transformed bounding box.
   * @param {mat4} matrix - The `matrix` parameter is a 4x4 transformation matrix. It is used to
   * transform the points of a bounding box.
   * @returns a new instance of `Gfx2BoundingRect`.
   */
  transform(matrix: mat4): Gfx3BoundingBox {
    const points: Array<[number, number, number]> = [];
    points.push([this.min[0], this.min[1], this.min[2]]);
    points.push([this.max[0], this.min[1], this.min[2]]);
    points.push([this.max[0], this.max[1], this.min[2]]);
    points.push([this.min[0], this.max[1], this.min[2]]);
    points.push([this.min[0], this.max[1], this.max[2]]);
    points.push([this.max[0], this.max[1], this.max[2]]);
    points.push([this.max[0], this.min[1], this.max[2]]);
    points.push([this.min[0], this.min[1], this.max[2]]);

    const transformedPoints = points.map((p) => {
      return UT.MAT4_MULTIPLY_BY_VEC4(matrix, [p[0], p[1], p[2], 1]);
    });

    const min: vec3 = [transformedPoints[0][0], transformedPoints[0][1], transformedPoints[0][2]];
    const max: vec3 = [transformedPoints[0][0], transformedPoints[0][1], transformedPoints[0][2]];

    for (let i = 0; i < transformedPoints.length; i++) {
      for (let j = 0; j < 3; j++) {
        const v = transformedPoints[i][j];
        min[j] = Math.min(v, min[j]);
        max[j] = Math.max(v, max[j]);
      }
    }

    return new Gfx3BoundingBox(min, max);
  }

  /**
   * The "isPointInside" function checks if a given point is inside the box.
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   * @param {number} z - The z-coordinate of the point.
   * @returns True if point is in the box.
   */
  isPointInside(x: number, y: number, z: number): boolean {
    return UT.COLLIDE_POINT_TO_BOX([x, y, z], this.min, this.max);
  }

  /**
   * The "intersectBoundingBox" function checks if two bounding boxes intersect.
   * @param {Gfx3BoundingBox} aabb - The parameter "aabb" is the box to check for intersection.
   * @returns True if bounding box intersect.
   */
  intersectBoundingBox(aabb: Gfx3BoundingBox): boolean {
    return UT.COLLIDE_BOX_TO_BOX(this.min, this.max, aabb.min, aabb.max);
  }

  /**
   * The "reset" function sets the "min" and "max" values to [0, 0, 0].
   */
  reset(): void {
    this.min = [0, 0, 0];
    this.max = [0, 0, 0];
  }

  /**
   * The "setMin" function sets the minimum value.
   * @param {vec3} min - The `min` point of the box.
   */
  setMin(min: vec3): void {
    this.min = min;
  }

  /**
   * The "setMax" function sets the maximum value.
   * @param {vec3} max - The `max`point of the box.
   */
  setMax(max: vec3): void {
    this.max = max;
  }
}

export { Gfx3BoundingBox };