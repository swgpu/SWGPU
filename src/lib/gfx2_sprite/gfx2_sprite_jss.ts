import { gfx2Manager } from '../gfx2/gfx2_manager';
import { UT } from '../core/utils';
import { Poolable } from '../core/object_pool';
import { Gfx2Drawable } from '../gfx2/gfx2_drawable';
import { Gfx2BoundingRect } from '../gfx2/gfx2_bounding_rect';

/**
 * A 2D static sprite (without animations).
 */
class Gfx2SpriteJSS extends Gfx2Drawable implements Poolable<Gfx2SpriteJSS> {
  texture: ImageBitmap | HTMLImageElement;
  textureRect: vec4;
  offsetFactor: vec2;

  constructor() {
    super();
    this.texture = gfx2Manager.getDefaultTexture();
    this.textureRect = [0, 0, 0, 0];
    this.offsetFactor = [0, 0];
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

    this.offsetFactor[0] = json['OffsetFactorX'] ?? 0;
    this.offsetFactor[1] = json['OffsetFactorY'] ?? 0;

    this.boundingRect = Gfx2BoundingRect.createFromCoord(
      json['X'],
      json['Y'],
      json['Width'],
      json['Height']
    );
  }

  /**
   * The paint function.
   */
  onDraw(): void {
    const ctx = gfx2Manager.getContext();
    ctx.scale(this.flip[0] ? -1 : 1, this.flip[1] ? -1 : 1);

    if (this.offsetFactor[0] != 0) {
      ctx.translate(-this.textureRect[2] * this.offsetFactor[0], 0);
    }

    if (this.offsetFactor[1] != 0) {
      ctx.translate(0, -this.textureRect[3] * this.offsetFactor[1]);
    }

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
    this.boundingRect = Gfx2BoundingRect.createFromCoord(this.textureRect[0], this.textureRect[1], this.textureRect[2], this.textureRect[3]);
  }

  /**
   * Set the normalized offset value.
   * Note: this offset is independant from the regular drawable pixel based offset.
   * 
   * @param {number} offsetXFactor - The normalized x-coordinate offset value.
   * @param {number} offsetYFactor - The normalized y-coordinate offset value.
   */
  setOffsetNormalized(offsetXFactor: number, offsetYFactor: number) {
    this.offsetFactor[0] = offsetXFactor;
    this.offsetFactor[1] = offsetYFactor;
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
      this.boundingRect = Gfx2BoundingRect.createFromCoord(this.textureRect[0], this.textureRect[1], this.textureRect[2], this.textureRect[3]);
    }

    this.texture = texture;
  }

  /**
   * Returns the sprite texture.
   */
  getTexture(): ImageBitmap | HTMLImageElement {
    return this.texture;
  }

  /**
   * Returns the bounding rect in the world space coordinates.
   */
  getWorldBoundingRect(): Gfx2BoundingRect {
    const x = this.position[0] - this.textureRect[2] * this.offsetFactor[0];
    const y = this.position[1] - this.textureRect[3] * this.offsetFactor[1];
    return this.boundingRect.transform(UT.MAT3_TRANSFORM([x, y], this.offset, this.rotation, this.scale));
  }

  /**
   * Clone the object.
   * 
   * @param {Gfx2SpriteJSS} jss - The copy object.
   */
  clone(jss: Gfx2SpriteJSS = new Gfx2SpriteJSS()): Gfx2SpriteJSS {
    super.clone(jss);
    jss.texture = this.texture;
    jss.textureRect = [this.textureRect[0], this.textureRect[1], this.textureRect[2], this.textureRect[3]]
    jss.flip = [this.flip[0], this.flip[1]];
    return jss;
  }
}

export { Gfx2SpriteJSS };