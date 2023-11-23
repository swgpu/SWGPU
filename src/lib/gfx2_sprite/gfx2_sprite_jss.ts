import { gfx2Manager } from '../gfx2/gfx2_manager';
import { Gfx2Drawable } from '../gfx2/gfx2_drawable';

/**
 * The `Gfx2SpriteJSS` is a subclass of `Gfx2Drawable` that represents a static sprite (without animations).
 */
class Gfx2SpriteJSS extends Gfx2Drawable {
  texture: ImageBitmap | HTMLImageElement;
  textureRect: vec4;
  flip: [boolean, boolean];

  /**
   * The constructor.
   */
  constructor() {
    super();
    this.texture = gfx2Manager.getDefaultTexture();
    this.textureRect = [0, 0, 0, 0];
    this.flip = [false, false];
  }

  /**
   * The "paint" function is rendering the sprite.
   */
  paint(): void {
    const ctx = gfx2Manager.getContext();
    ctx.scale(this.flip[0] ? -1 : 1, this.flip[1] ? -1 : 1);
    ctx.drawImage(
      this.texture,
      this.textureRect[0],
      this.textureRect[1],
      this.textureRect[2],
      this.textureRect[3],
      this.flip[0] ? this.textureRect[2] * -1 : 0,
      this.flip[1] ? this.textureRect[3] * -1 : 0,
      this.textureRect[2],
      this.textureRect[3]
    );
  }

  /**
   * The "loadFromFile" function asynchronously loads sprite data from a json file (jss).
   * @param {string} path - The `path` parameter is the file path.
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

  /**
   * The "getFlip" function returns two booleans, first is the x-axis flip flag, second is the y-axis flip flag.
   * @returns The flip property.
   */
  getFlip(): [boolean, boolean] {
    return this.flip;
  }

  /**
   * The "setFlipX" function sets the value of the flipX property to the provided boolean value.
   * @param {boolean} x - The x-axis flip flag.
   */
  setFlipX(x: boolean): void {
    this.flip[0] = x;
  }

  /**
   * The "setFlipY" function sets the value of the flipY property to the provided boolean value.
   * @param {boolean} y - The y-axis flip flag.
   */
  setFlipY(y: boolean): void {
    this.flip[1] = y;
  }

  /**
   * The "setTexture" function sets the sprite texture.
   * @param {ImageBitmap | HTMLImageElement} texture - The sprite texture.
   */
  setTexture(texture: ImageBitmap | HTMLImageElement): void {
    if (this.textureRect[2] == 0 && this.textureRect[3] == 0) {
      this.textureRect[2] = texture.width;
      this.textureRect[3] = texture.height;
    }

    this.texture = texture;
  }

  /**
   * The "getTexture" function returns the sprite texture.
   * @returns The sprite texture.
   */
  getTexture(): ImageBitmap | HTMLImageElement {
    return this.texture;
  }
}

export { Gfx2SpriteJSS };
