import { gfx3Manager, VertexSubBuffer } from './gfx3_manager';
import { Gfx3Transformable } from './gfx3_transformable';
import { Gfx3BoundingBox } from './gfx3_bounding_box';

/**
 * The `Gfx3Drawable` class represents a drawable object in a 3D graphics system.
 */
class Gfx3Drawable extends Gfx3Transformable {
  vertexSubBuffer: VertexSubBuffer;
  vertices: Array<number>;
  vertexCount: number;
  vertexStride: number;
  boundingBox: Gfx3BoundingBox;

  /**
   * The constructor.
   * @param {number} vertexStride - The `vertexStride` parameter is a number that represents the number of
   * attributes for each vertex. It is used to determine the spacing between consecutive vertices in the vertex
   * buffer.
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
   * The "delete" function free all resources.
   * Warning: you need to call this method to free allocation for this object.
   */
  delete(): void {
    gfx3Manager.destroyVertexBuffer(this.vertexSubBuffer);
  }

  /**
   * The "update" is a virtual method used for the update phase.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    // virtual method called during update phase !
  }

  /**
   * The "draw" is a virtual method used for the draw phase.
   */
  draw(): void {
    // virtual method called during draw phase !
  }

  /**
   * The "beginVertices" function prepare your vertex buffer to write process.
   * Warning: You need to call this method before define your vertices.
   * @param {number} vertexCount - The parameter `vertexCount` represents the number of vertices that
   * will be stored in the vertex buffer.
   */
  beginVertices(vertexCount: number): void {
    gfx3Manager.destroyVertexBuffer(this.vertexSubBuffer);
    this.vertexSubBuffer = gfx3Manager.createVertexBuffer(vertexCount * this.vertexStride * 4);
    this.vertices = [];
    this.vertexCount = vertexCount;
    this.boundingBox.reset();
  }

  /**
   * The "defineVertex" function takes in an array of numbers representing a vertex.
   * @param v - An array of numbers representing the attributes of vertex.
   */
  defineVertex(...v: Array<number>) {
    this.vertices.push(...v);
  }

  /**
   * The "setVertices" function sets the vertices in one pass.
   * @param vertices - An array of numbers representing the vertices of a shape.
   */
  setVertices(vertices: Array<number>) {
    this.vertices = vertices;
  }

  /**
   * The "endVertices" function writes vertex data to the vertex buffer and calculates the bounding box
   * based on the vertices.
   */
  endVertices(): void {
    gfx3Manager.writeVertexBuffer(this.vertexSubBuffer, this.vertices);
    this.boundingBox.fromVertices(this.vertices, this.vertexStride);
  }

  /**
   * The "getVertexSubBufferOffset" function returns the offset of the vertex sub-buffer.
   * Nota bene: All vertices are stored in one global vertex buffer handled by "Gfx3Manager".
   * SubBuffer is just a reference offset/size pointing to the big one buffer.
   * @returns The offset of the vertex sub-buffer.
   */
  getVertexSubBufferOffset(): number {
    return this.vertexSubBuffer.offset;
  }

  /**
   * The "getVertexSubBufferSize" function returns the byte length of the vertex sub buffer.
   * Nota bene: All vertices are stored in one global vertex buffer handled by "Gfx3Manager".
   * SubBuffer is just a reference offset/size pointing to the big one buffer.
   * @returns The byte length of the vertex sub buffer.
   */
  getVertexSubBufferSize(): number {
    return this.vertexSubBuffer.vertices.byteLength;
  }

  /**
   * The "getVertices" function returns an array of numbers representing vertices.
   * @returns The vertices property.
   */
  getVertices(): Array<number> {
    return this.vertices;
  }

  /**
   * The "getVertexCount" function returns the number of vertices.
   * @returns The number of vertices.
   */
  getVertexCount(): number {
    return this.vertexCount;
  }

  /**
   * The "getBoundingBox" function returns the bounding box.
   * @returns The bounding box.
   */
  getBoundingBox(): Gfx3BoundingBox {
    return this.boundingBox;
  }

  /**
   * The "getWorldBoundingBox" function returns the world bounding box by transforming its
   * local bounding box using its transform matrix.
   * @returns The world bounding box.
   */
  getWorldBoundingBox(): Gfx3BoundingBox {
    return this.boundingBox.transform(this.getTransformMatrix());
  }
}

export { Gfx3Drawable };