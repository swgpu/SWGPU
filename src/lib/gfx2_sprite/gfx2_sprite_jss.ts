import { gfx2Manager } from '../gfx2/gfx2_manager';
import { Gfx2Drawable } from '../gfx2/gfx2_drawable';

/**
 * A 2D static sprite (without animations).
 */
class Gfx2SpriteJSS extends Gfx2Drawable {
  texture: ImageBitmap | HTMLImageElement;
  textureRect: vec4;
  flip: [boolean, boolean];

  constructor() {
    super();
    this.texture = gfx2Manager.getDefaultTexture();
    this.textureRect = [0, 0, 0, 0];
    this.flip = [false, false];
  }

  /**
   * The paint function.
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
  }

  /**
   * Returns the texture rectangle.
   */
  getTextureRect(): vec4 {
    return this.textureRect;
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
   * Returns two booleans, first is the x-axis flip flag, second is the y-axis flip flag.
   */
  getFlip(): [boolean, boolean] {
    return this.flip;
  }

  /**
   * Set flipX.
   * 
   * @param {boolean} x - The x-axis flip flag.
   */
  setFlipX(x: boolean): void {
    this.flip[0] = x;
  }

  /**
   * Set flipY.
   * 
   * @param {boolean} y - The y-axis flip flag.
   */
  setFlipY(y: boolean): void {
    this.flip[1] = y;
  }

  /**
   * Set the sprite texture.
   * 
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
   * Returns the sprite texture.
   */
  getTexture(): ImageBitmap | HTMLImageElement {
    return this.texture;
  }
}

export { Gfx2SpriteJSS };
