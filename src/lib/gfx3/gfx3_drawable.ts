import { gfx3Manager, VertexSubBuffer } from './gfx3_manager';
import { Gfx3Transformable } from './gfx3_transformable';
import { Gfx3BoundingBox } from './gfx3_bounding_box';

/**
 * A 3D drawable object.
 */
class Gfx3Drawable extends Gfx3Transformable {
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
    this.boundingBox.reset();
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
   * 
   * @param {boolean} [updateBoundingBox=true] - Determine if boundingbox is up to date with the new vertex set.
   */
  endVertices(updateBoundingBox: boolean = true): void {
    gfx3Manager.writeVertexBuffer(this.vertexSubBuffer, this.vertices);

    if (updateBoundingBox) {
      this.boundingBox.fromVertices(this.vertices, this.vertexStride);
    }
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
}

export { Gfx3Drawable };