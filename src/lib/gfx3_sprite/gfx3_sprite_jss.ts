import { Gfx3Sprite } from './gfx3_sprite';

/**
 * The `Gfx3SpriteJSS` is a subclass of `Gfx3Sprite` that represents a static sprite (without animations).
 */
class Gfx3SpriteJSS extends Gfx3Sprite {
  textureRect: vec4;

  /**
   * The constructor.
   */
  constructor() {
    super();
    this.textureRect = [0, 0, 1, 1];
  }

  /**
   * The "update" function.
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
   * The "getTextureRect" function returns the texture rectangle.
   * @returns The texture rectangle.
   */
  getTextureRect(): vec4 {
    return this.textureRect;
  }

  /**
   * The "setTextureRect" function sets the texture rectangle with the given left, top, width, and height values.
   * @param {number} left - The x-coordinate of the top-left texture rectangle corner.
   * @param {number} top - The y-coordinate of the top-left texture rectangle corner.
   * @param {number} width - The width of the texture rectangle.
   * @param {number} height - The height of the texture rectangle.
   */
  setTextureRect(left: number, top: number, width: number, height: number): void {
    this.textureRect = [left, top, width, height];
  }

  /**
   * The "setOffsetNormalized" function sets the normalized origin offset value.
   * @param {number} offsetXFactor - The offsetXFactor represent the normalized x-coordinate offset value.
   * @param {number} offsetYFactor - The offsetYFactor represent the normalized y-coordinate offset value.
   */
  setOffsetNormalized(offsetXFactor: number, offsetYFactor: number) {
    this.offset[0] = this.textureRect[2] * offsetXFactor;
    this.offset[1] = this.textureRect[3] * offsetYFactor;
  }
}

export { Gfx3SpriteJSS };