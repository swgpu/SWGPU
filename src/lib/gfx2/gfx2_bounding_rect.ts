import { UT } from '../core/utils';

/**
 * A 2D bounding rectangle.
 */
class Gfx2BoundingRect {
  min: vec2;
  max: vec2;

  /**
   * @param {vec2} min - The minimum point of the bounding rectangle.
   * @param {vec2} max - The maximum point of the bounding rectangle.
   */
  constructor(min: vec2 = [0, 0], max: vec2 = [0, 0]) {
    this.min = min;
    this.max = max;
  }

  /**
   * Creates a new instance from min & max.
   * 
   * @param {number} minx - The minimum x-coordinate of the bounding rectangle.
   * @param {number} miny - The minimum y-coordinate of the bounding rectangle.
   * @param {number} maxx - The maximum x-coordinate of the bounding rectangle.
   * @param {number} maxy - The maximum y-coordinate of the bounding rectangle.
   */
  static createFrom(minx: number, miny: number, maxx: number, maxy: number): Gfx2BoundingRect {
    const rect = new Gfx2BoundingRect();
    rect.min[0] = minx;
    rect.min[1] = miny;
    rect.max[0] = maxx;
    rect.max[1] = maxy;
    return rect;
  }

  /**
   * Creates a new instance from coordinates & size.
   * 
   * @param {number} x - The x-coordinate of the top-left corner of the bounding rectangle.
   * @param {number} y - The y-coordinate of the top-left corner of the bounding rectangle.
   * @param {number} w - The width of the bounding rectangle.
   * @param {number} h - The height of the bounding rectangle.
   */
  static createFromCoord(x: number, y: number, w: number, h: number): Gfx2BoundingRect {
    const rect = new Gfx2BoundingRect();
    rect.min[0] = x;
    rect.min[1] = y;
    rect.max[0] = x + w;
    rect.max[1] = y + h;
    return rect;
  }

  /**
   * Creates a new instance from center coordinates & size.
   * 
   * @param {number} x - The x-coordinate of the center of the bounding rectangle.
   * @param {number} y - The y-coordinate of the center of the bounding rectangle.
   * @param {number} w - The width of the bounding rectangle.
   * @param {number} h - The height of the bounding rectangle.
   */
  static createFromCenter(x: number, y: number, w: number, h: number): Gfx2BoundingRect {
    const rect = new Gfx2BoundingRect();
    rect.min[0] = x - (w * 0.5);
    rect.min[1] = y - (h * 0.5);
    rect.max[0] = x + (w * 0.5);
    rect.max[1] = y + (h * 0.5);
    return rect;
  }

  /**
   * Takes a list of vertices and set the new minimum and maximum values.
   * 
   * @param vertices - The list of vertices. Each pair of numbers represents the x and y coordinates of a point.
   */
  fromVertices(vertices: Array<number>): void {
    const min: vec2 = [vertices[0], vertices[1]];
    const max: vec2 = [vertices[0], vertices[1]];

    for (let i = 0; i < vertices.length; i += 2) {
      for (let j = 0; j < 2; j++) {
        const v = vertices[i + j];
        min[j] = Math.min(v, min[j]);
        max[j] = Math.max(v, max[j]);
      }
    }

    this.min = min;
    this.max = max;
  }

  /**
   * Merge and returns the union of two rectangles.
   * 
   * @param {Gfx2BoundingRect} rect - The second rectangle.
   */
  merge(rect: Gfx2BoundingRect): Gfx2BoundingRect {
    const min: vec2 = [this.min[0], this.min[1]];
    const max: vec2 = [this.max[0], this.max[2]];

    for (let i = 0; i < 2; i++) {
      min[i] = Math.min(rect.min[i], min[i]);
      max[i] = Math.max(rect.max[i], max[i]);
    }

    return new Gfx2BoundingRect(min, max);
  }

  /**
   * Returns the center point of the rectangle.
   */
  getCenter(): vec2 {
    const w = this.max[0] - this.min[0];
    const h = this.max[1] - this.min[1];
    const x = this.min[0] + (w * 0.5);
    const y = this.min[1] + (h * 0.5);
    return [x, y];
  }

  /**
   * Returns the width and height of the rectangle.
   */
  getSize(): vec2 {
    const w = this.max[0] - this.min[0];
    const h = this.max[1] - this.min[1];
    return [w, h];
  }

  /**
   * Returns the radius of a circumscribed circle to the rectangle.
   */
  getRadius(): number {
    return UT.VEC2_DISTANCE(this.min, this.max) * 0.5;
  }

  /**
   * Returns the perimeter of the rectangle.
   */
  getPerimeter(): number {
    const w = this.max[0] - this.min[0];
    const h = this.max[1] - this.min[1];
    return w + w + h + h;
  }

  /**
   * Returns the volume of a the rectangle.
   */
  getVolume(): number {
    return (this.max[0] - this.min[0]) * (this.max[1] - this.min[1]);
  }

  /**
   * Returns the transformed bounding rectangle.
   * 
   * @param {mat3} matrix - Used to transform the points of the bounding rectangle.
   */
  transform(matrix: mat3): Gfx2BoundingRect {
    const points: Array<[number, number]> = [];
    points.push([this.min[0], this.min[1]]);
    points.push([this.max[0], this.min[1]]);
    points.push([this.max[0], this.max[1]]);
    points.push([this.min[0], this.max[1]]);

    const transformedPoints = points.map((p) => {
      return UT.MAT3_MULTIPLY_BY_VEC3(matrix, [p[0], p[1], 1]);
    });

    const min: vec2 = [transformedPoints[0][0], transformedPoints[0][1]];
    const max: vec2 = [transformedPoints[0][0], transformedPoints[0][1]];

    for (let i = 0; i < transformedPoints.length; i++) {
      for (let j = 0; j < 2; j++) {
        const v = transformedPoints[i][j];
        min[j] = Math.min(v, min[j]);
        max[j] = Math.max(v, max[j]);
      }
    }

    return new Gfx2BoundingRect(min, max);
  }

  /**
   * Split the bounding box on x-axis and returns boxes for each side.
   */
  splitVertical(): Array<Gfx2BoundingRect> {
    const size = this.getSize();
    const center = this.getCenter();
  
    return [
      Gfx2BoundingRect.createFromCoord(this.min[0], this.min[1], size[0] * 0.5, size[1]),
      Gfx2BoundingRect.createFromCoord(center[0], this.min[1], size[0] * 0.5, size[1])
    ];
  }

  /**
   * Split the bounding box on y-axis and returns boxes for each side.
   */
  splitHorizontal(): Array <Gfx2BoundingRect> {
    const size = this.getSize();
    const center = this.getCenter();
  
    return [
      Gfx2BoundingRect.createFromCoord(this.min[0], this.min[1], size[0], size[1] * 0.5),
      Gfx2BoundingRect.createFromCoord(this.min[0], center[1], size[0], size[1] * 0.5)
    ];
  }

  /**
   * Checks if a given point is inside the rectangle.
   * 
   * @param {number} x - The x-coordinate of the point.
   * @param {number} y - The y-coordinate of the point.
   */
  isPointInside(x: number, y: number): boolean {
    return UT.COLLIDE_POINT_TO_RECT([x, y], this.min, this.max);
  }

  /**
   * Checks if two bounding rectangles intersect.
   * 
   * @param {Gfx2BoundingRect} aabr - The second rectangle.
   */
  intersectBoundingRect(aabr: Gfx2BoundingRect): boolean {
    return UT.COLLIDE_RECT_TO_RECT(this.min, this.max, aabr.min, aabr.max);
  }
}

export { Gfx2BoundingRect };