import { gfx3Manager, VertexSubBuffer } from './gfx3_manager';
import { UT } from '../core/utils';
import { Poolable } from '../core/object_pool';
import { Gfx3Transformable } from './gfx3_transformable';
import { Gfx3BoundingBox } from './gfx3_bounding_box';
import { Quaternion } from '../core/quaternion';

/**
 * A 3D drawable object.
 */
class Gfx3Drawable extends Gfx3Transformable implements Poolable<Gfx3Drawable> {
  id: vec4;
  vertexSubBuffer: VertexSubBuffer;
  vertices: Array<number>;
  vertexCount: number;
  vertexStride: number;
  boundingBox: Gfx3BoundingBox;

  /**
   * @param {number} vertexStride - The number of attributes for each vertex.
   */
  constructor(vertexStride: number) {
    super();
    this.id = [0, 0, 0, 1];
    this.vertexSubBuffer = gfx3Manager.createVertexBuffer(0);
    this.vertices = [];
    this.vertexCount = 0;
    this.vertexStride = vertexStride;
    this.boundingBox = new Gfx3BoundingBox();
  }

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    gfx3Manager.destroyVertexBuffer(this.vertexSubBuffer);
  }

  /**
   * Virtual update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {}

  /**
   * Virtual draw function.
   */
  draw(): void {}

  /**
   * Prepare your vertex buffer to write process.
   * Warning: You need to call this method before define your vertices.
   * 
   * @param {number} vertexCount - The number of vertices.
   */
  beginVertices(vertexCount: number): void {
    gfx3Manager.destroyVertexBuffer(this.vertexSubBuffer);
    this.vertexSubBuffer = gfx3Manager.createVertexBuffer(vertexCount * this.vertexStride * 4);
    this.vertices = [];
    this.vertexCount = vertexCount;
  }

  /**
   * Add a vertex.
   * 
   * @param v - The attributes data of the vertex.
   */
  defineVertex(...v: Array<number>) {
    this.vertices.push(...v);
  }

  /**
   * Set vertices.
   * 
   * @param vertices - The list of vertices.
   */
  setVertices(vertices: Array<number>) {
    this.vertices = vertices;
  }

  /**
   * Close your vertex buffer to write process.
   */
  endVertices(): void {
    gfx3Manager.writeVertexBuffer(this.vertexSubBuffer, this.vertices);
  }

  /**
   * Returns the vertex sub-buffer offset in the global vertex buffer.
   * Nota bene: All vertices are stored in one global vertex buffer handled by "Gfx3Manager".
   * SubBuffer is just a reference offset/size pointing to the big one buffer.
   */
  getVertexSubBufferOffset(): number {
    return this.vertexSubBuffer.offset;
  }

  /**
   * Returns the byte length of the vertex sub buffer.
   */
  getVertexSubBufferSize(): number {
    return this.vertexSubBuffer.vertices.byteLength;
  }

  /**
   * Returns vertices.
   */
  getVertices(): Array<number> {
    return this.vertices;
  }

  /**
   * Returns the number of vertices.
   */
  getVertexCount(): number {
    return this.vertexCount;
  }

  /**
   * Set an identifier based on three components.
   * Note: WARME use some specials ID's in its internal pipeline, check the table below:
   * 
   * - decals group: g = n
   * - pixelation: r = -1
   * - color limitation: g = -1
   * - dither: b = -1
   * - outline: a = -1
   * 
   * @param {number} r - The r integer value.
   * @param {number} g - The g integer value. Used by decals for group identification.
   * @param {number} b - The b integer value.
   * @param {number} a - The a integer value.
   */
  setId(r: number, g: number, b: number, a: number): void {
    this.id = [r, g, b, a];
  }

  /**
   * Returns the identifier.
   */
  getId(): vec4 {
    return this.id;
  }

  /**
   * Returns the identifier as string.
   */
  getStringId(): string {
    return '' + this.id[0] + '' + this.id[1] + '' + this.id[2] + '' + this.id[3] + '';
  }

  /**
   * Set the bounding box.
   * 
   * @param {Gfx3BoundingBox} boundingBox - The bounding box.
   */
  setBoundingBox(boundingBox: Gfx3BoundingBox): void {
    this.boundingBox = boundingBox;
  }

  /**
   * Returns the bounding box.
   */
  getBoundingBox(): Gfx3BoundingBox {
    return this.boundingBox;
  }

  /**
   * Returns the bounding box in the world space coordinates.
   */
  getWorldBoundingBox(): Gfx3BoundingBox {
    return this.boundingBox.transform(this.getTransformMatrix());
  }

  /**
   * Clone the object.
   * 
   * @param {Gfx3Drawable} drawable - The copy object.
   * @param {mat4} transformMatrix - The transformation matrix.
   */
  clone(drawable: Gfx3Drawable = new Gfx3Drawable(this.vertexStride), transformMatrix: mat4 = UT.MAT4_IDENTITY()): Gfx3Drawable {
    drawable.position = [this.position[0], this.position[1], this.position[2]];
    drawable.rotation = [this.rotation[0], this.rotation[1], this.rotation[2]];
    drawable.scale = [this.scale[0], this.scale[1], this.scale[2]];
    drawable.quaternion = new Quaternion(this.quaternion.w, this.quaternion.x, this.quaternion.y, this.quaternion.z);
    drawable.boundingBox = new Gfx3BoundingBox(this.boundingBox.min, this.boundingBox.max);

    drawable.beginVertices(this.vertexCount);

    for (let i = 0; i < this.vertices.length; i += this.vertexStride) {
      const v = UT.MAT4_MULTIPLY_BY_VEC4(transformMatrix, [this.vertices[i + 0], this.vertices[i + 1], this.vertices[i + 2], 1.0]);
      drawable.defineVertex(v[0], v[1], v[2], ...this.vertices.slice(3, this.vertexStride));
    }

    drawable.endVertices();
    return drawable;
  }
}

export { Gfx3Drawable };