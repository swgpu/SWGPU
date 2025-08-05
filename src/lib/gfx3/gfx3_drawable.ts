import { gfx3Manager, VertexSubBuffer } from './gfx3_manager';
import { UT } from '../core/utils';
import { Poolable } from '../core/object_pool';
import { Gfx3Transformable } from './gfx3_transformable';
import { Gfx3BoundingBox } from './gfx3_bounding_box';
import { Quaternion } from '../core/quaternion';

enum MeshEffect {
  NONE = 0,
  PIXELATION = 2,
  COLOR_LIMITATION = 4,
  DITHER = 8,
  OUTLINE = 16,
  SHADOW_VOLUME = 32,
  CHANNEL1 = 64
};

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
    this.vertexSubBuffer = gfx3Manager.createVertexBuffer(vertexCount * this.vertexStride);
    this.vertices = [];
    this.vertexCount = vertexCount;
  }

  /**
   * Delete all values from vertex buffer but keep the allocation alive.
   */
  flushVertices(): void {
    this.vertices = [];
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
   * Note: SWGPU use some specials ID's in its internal pipeline, check the table below:
   * ■ R: The red channel.
   * ■ G: The green channel.
   * ■ A: The alpha channel [0, 1]
   * ■ B: The blue channel for effects
   *  ■ pixelation: 2
   *  ■ color limitation: 4
   *  ■ dither: 8
   *  ■ outline: 16
   *  ■ shadow volume: 32
   *  ■ channel1: 64
   * 
   * @param {number} r - The red channel.
   * @param {number} g - The green channel.
   * @param {MeshEffect|number} b - The blue channel for effects.
   * @param {number} a - The alpha channel.
   */
  setId(r: number, g: number = 0, b: MeshEffect = 0, a: number = 1): void {
    this.id = [r, g, b, a];
  }

  /**
   * Set the effects.
   * 
   * @param {MeshEffecta|number} effects - The effects.
   */
  setEffects(effects: number): void {
    this.id[2] = effects;
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
    drawable.id = this.id;
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

export { Gfx3Drawable, MeshEffect };