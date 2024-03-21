import { UT } from '../core/utils';

/**
 * A 3D bounding box.
 */
class Gfx3BoundingBox {
  min: vec3;
  max: vec3;

  /**
   * @param {vec2} min - The minimum point of the bounding box.
   * @param {vec2} max - The maximum point of the bounding box.
   */
  constructor(min: vec3 = [0, 0, 0], max: vec3 = [0, 0, 0]) {
    this.min = min;
    this.max = max;
  }

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
   * Creates a new instance from center and size.
   * 
   * @param {number} x - The x-coordinate of the center of the bounding box.
   * @param {number} y - The y-coordinate of the center of the bounding box.
   * @param {number} z - The z-coordinate of the center of the bounding box.
   * @param {number} w - The width of the bounding box.
   * @param {number} h - The height of the bounding box.
   * @param {number} d - The depth of the bounding box.
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
   * Merge and returns the union of some boxes.
   * 
   * @param {Array<Gfx3BoundingBox>} aabbs - The list of boxes.
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
   * Takes a list of vertices and set the new minimum and maximum values.
   * 
   * @param vertices - The list of vertices. Each triplets of numbers represents the x, y and z coordinates of a point.
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
   * Merge and returns the union of two boxes.
   * 
   * @param {Gfx3BoundingBox} aabb - The second box.
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
   * Returns the center point of the box.
   */
  getCenter(): vec3 {
    const x = (this.min[0] + this.max[0]) * 0.5;
    const y = (this.min[1] + this.max[1]) * 0.5;
    const z = (this.min[2] + this.max[2]) * 0.5;
    return [x, y, z];
  }

  /**
   * Returns the width, height and depth of the box.
   */
  getSize(): vec3 {
    const w = this.max[0] - this.min[0];
    const h = this.max[1] - this.min[1];
    const d = this.max[2] - this.min[2];
    return [w, h, d];
  }

  /**
   * Returns the radius of a circumscribed circle to the box.
   */
  getRadius(): number {
    return UT.VEC3_DISTANCE(this.min, this.max) * 0.5;
  }

  /**
   * Returns the perimeter of the box.
   */
  getPerimeter(): number {
    const w = this.max[0] - this.min[0];
    const d = this.max[2] - this.min[2];
    return w + w + d + d;
  }

  /**
   * Returns the volume of a the box.
   */
  getVolume(): number {
    const w = this.max[0] - this.min[0];
    const h = this.max[1] - this.min[1];
    const d = this.max[2] - this.min[2];
    return w * h * d;
  }

  /**
   * Returns the transformed bounding box.
   * 
   * @param {mat4} matrix - Used to transform the points of the bounding box.
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
   * Split the bounding box on x-axis and returns boxes for each side.
   */
  splitVertical(): Array<Gfx3BoundingBox> {
    const size = this.getSize();
    const center = this.getCenter();
  
    return [
      Gfx3BoundingBox.createFromCoord(this.min[0], this.min[1], this.min[2], size[0] * 0.5, size[1], size[2]),
      Gfx3BoundingBox.createFromCoord(center[0], this.min[1], this.min[2], size[0] * 0.5, size[1], size[2])
    ];
  }
  
  /**
   * Split the bounding box on y-axis and returns boxes for each side.
   */
  splitHorizontal(): Array<Gfx3BoundingBox> {
    const size = this.getSize();
    const center = this.getCenter();
  
    return [
      Gfx3BoundingBox.createFromCoord(this.min[0], this.min[1], this.min[2], size[0], size[1] * 0.5, size[2]),
      Gfx3BoundingBox.createFromCoord(this.min[0], center[1], this.min[2], size[0], size[1] * 0.5, size[2])
    ];
  }

  /**
   * Split the bounding box on z-axis and returns boxes for each side.
   */
  splitDepth(): Array<Gfx3BoundingBox> {
    const size = this.getSize();
    const center = this.getCenter();
  
    return [
      Gfx3BoundingBox.createFromCoord(this.min[0], this.min[1], this.min[2], size[0], size[1], size[2] * 0.5),
      Gfx3BoundingBox.createFromCoord(this.min[0], this.min[1], center[2], size[0], size[1], size[2] * 0.5)
    ];
  }

  /**
   * Checks if a given point is inside the box.
   * 
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   * @param {number} z - The z-coordinate of the point.
   */
  isPointInside(x: number, y: number, z: number): boolean {
    return UT.COLLIDE_POINT_TO_BOX([x, y, z], this.min, this.max);
  }

  /**
   * Checks if two bounding boxes intersect.
   * 
   * @param {Gfx3BoundingBox} aabb - The second box.
   */
  intersectBoundingBox(aabb: Gfx3BoundingBox): boolean {
    return UT.COLLIDE_BOX_TO_BOX(this.min, this.max, aabb.min, aabb.max);
  }

  /**
   * Reset min & max values (set to 0).
   */
  reset(): void {
    this.min = [0, 0, 0];
    this.max = [0, 0, 0];
  }

  /**
   * Set the minimum value.
   * 
   * @param {vec3} min - The min point of the box.
   */
  setMin(min: vec3): void {
    this.min = min;
  }

  /**
   * Set the maximum value.
   * 
   * @param {vec3} max - The max point of the box.
   */
  setMax(max: vec3): void {
    this.max = max;
  }
}

export { Gfx3BoundingBox };