import { Gfx3BoundingBox } from '../gfx3/gfx3_bounding_box';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { Gfx3Sprite } from './gfx3_sprite';

/**
 * A 3D static sprite (without animations).
 */
class Gfx3SpriteJSS extends Gfx3Sprite {
  textureRect: vec4;

  constructor() {
    super();
    this.textureRect = [0, 0, 1, 1];
  }

  /**
   * Load asynchronously sprite data from a json file (jss).
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    this.textureRect[0] = json['X'];
    this.textureRect[1] = json['Y'];
    this.textureRect[2] = json['Width'];
    this.textureRect[3] = json['Height'];

    this.offset[0] = json['OffsetX'] ?? 0;
    this.offset[1] = json['OffsetY'] ?? 0;

    this.flip[0] = json['FlipX'] ?? false;
    this.flip[1] = json['FlipY'] ?? false;

    this.boundingBox = Gfx3BoundingBox.createFromCoord(
      json['X'],
      json['Y'],
      0,
      json['Width'],
      json['Height'],
      0
    );
  }

  /**
   * The update function.
   */
  update(): void {
    if (!this.texture) {
      return;
    }

    const minX = 0;
    const minY = 0;
    const maxX = this.textureRect[2];
    const maxY = this.textureRect[3];
    const ux = (this.textureRect[0] / this.texture.gpuTexture.width);
    const uy = (this.textureRect[1] / this.texture.gpuTexture.height);
    const vx = (this.textureRect[0] + this.textureRect[2]) / this.texture.gpuTexture.width;
    const vy = (this.textureRect[1] + this.textureRect[3]) / this.texture.gpuTexture.height;
    const fux = this.flip[0] ? 1 - ux : ux;
    const fuy = this.flip[1] ? 1 - uy : uy;
    const fvx = this.flip[0] ? 1 - vx : vx;
    const fvy = this.flip[1] ? 1 - vy : vy;

    this.beginVertices(6);
    this.defineVertex(minX, maxY, 0, fux, fuy);
    this.defineVertex(minX, minY, 0, fux, fvy);
    this.defineVertex(maxX, minY, 0, fvx, fvy);
    this.defineVertex(maxX, minY, 0, fvx, fvy);
    this.defineVertex(maxX, maxY, 0, fvx, fuy);
    this.defineVertex(minX, maxY, 0, fux, fuy);
    this.endVertices();
  }

  /**
   * Returns the texture rectangle.
   */
  getTextureRect(): vec4 {
    return this.textureRect;
  }

  /**
   * Returns the texture rect width.
   */
  getTextureRectWidth(): number {
    return this.textureRect[2];
  }

  /**
   * Returns the texture rect height.
   */
  getTextureRectHeight(): number {
    return this.textureRect[3];
  }

  /**
   * Set the texture rectangle.
   * 
   * @param {number} left - The x-coordinate of the top-left texture rectangle corner.
   * @param {number} top - The y-coordinate of the top-left texture rectangle corner.
   * @param {number} width - The width of the texture rectangle.
   * @param {number} height - The height of the texture rectangle.
   */
  setTextureRect(left: number, top: number, width: number, height: number): void {
    this.textureRect = [left, top, width, height];
  }

  /**
   * Set the normalized offset value.
   * 
   * @param {number} offsetXFactor - The normalized x-coordinate offset value.
   * @param {number} offsetYFactor - The normalized y-coordinate offset value.
   */
  setOffsetNormalized(offsetXFactor: number, offsetYFactor: number) {
    this.offset[0] = this.textureRect[2] * offsetXFactor;
    this.offset[1] = this.textureRect[3] * offsetYFactor;
  }

  /**
   * Set the sprite texture.
   * 
   * @param {Gfx3Texture} texture - The sprite texture.
   */
  setTexture(texture: Gfx3Texture): void {
    if (this.textureRect[2] == 0 && this.textureRect[3] == 0) {
      this.textureRect[2] = texture.gpuTexture.width;
      this.textureRect[3] = texture.gpuTexture.height;
      this.boundingBox = Gfx3BoundingBox.createFromCoord(this.textureRect[0], this.textureRect[1], 0, this.textureRect[2], this.textureRect[3], 0);
    }

    this.texture = texture;
  }
}

export { Gfx3SpriteJSS };