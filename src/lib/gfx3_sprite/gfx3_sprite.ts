import { gfx3Manager } from '../gfx3/gfx3_manager';
import { gfx3SpriteRenderer } from './gfx3_sprite_renderer';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { UT } from '../core/utils.js';
import { Gfx3Drawable } from '../gfx3/gfx3_drawable';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { SHADER_VERTEX_ATTR_COUNT } from './gfx3_sprite_shader';

/**
 * The `Gfx3Sprite` is a subclass of `Gfx2Drawable` that represents a sprite base (abstract) class.
 */
class Gfx3Sprite extends Gfx3Drawable {
  textureChanged: boolean;
  offset: vec2;
  flip: [boolean, boolean];
  pixelsPerUnit: number;
  billboardMode: boolean;
  grp1: Gfx3StaticGroup;
  texture: Gfx3Texture;

  /**
   * The constructor.
   */
  constructor() {
    super(SHADER_VERTEX_ATTR_COUNT);
    this.textureChanged = false;
    this.offset = [0, 0];
    this.flip = [false, false];
    this.pixelsPerUnit = 100;
    this.billboardMode = false;
    this.grp1 = gfx3Manager.createStaticGroup('SPRITE_PIPELINE', 1);
    this.texture = this.grp1.setTexture(0, 'TEXTURE', gfx3Manager.createTextureFromBitmap());
    this.grp1.allocate();    
  }

  /**
   * The "delete" function free all resources.
   * Warning: you need to call this method to free allocation for this object.
   */
  delete(): void {
    this.grp1.destroy();
    super.delete();
  }

  /**
   * The "draw" function.
   */
  draw(): void {
    gfx3SpriteRenderer.drawSprite(this);
  }

  /**
   * The "getTransformMatrix" function returns the transform matrix from position, rotation, scale, origin offset
   * and pixel per unit values.
   * @returns The transform matrix.
   */
  getTransformMatrix(): mat4 {
    const matrix = UT.MAT4_IDENTITY();
    UT.MAT4_MULTIPLY(matrix, UT.MAT4_TRANSLATE(this.position[0], this.position[1], this.position[2]), matrix);
    UT.MAT4_MULTIPLY(matrix, UT.MAT4_ROTATE_Y(this.rotation[1]), matrix);
    UT.MAT4_MULTIPLY(matrix, UT.MAT4_ROTATE_X(this.rotation[0]), matrix); // y -> x -> z
    UT.MAT4_MULTIPLY(matrix, UT.MAT4_ROTATE_Z(this.rotation[2]), matrix);
    UT.MAT4_MULTIPLY(matrix, UT.MAT4_SCALE(this.scale[0], this.scale[1], this.scale[2]), matrix);
    UT.MAT4_MULTIPLY(matrix, UT.MAT4_SCALE(1 / this.pixelsPerUnit, 1 / this.pixelsPerUnit, 1 / this.pixelsPerUnit), matrix);
    UT.MAT4_MULTIPLY(matrix, UT.MAT4_TRANSLATE(-this.offset[0], -this.offset[1], 0), matrix);
    return matrix;
  }

  /**
   * The "getOffset" function returns the origin offset.
   * @returns The offset.
   */
  getOffset(): vec2 {
    return this.offset;
  }

  /**
   * The "getOffsetX" function returns the offset in x-axis direction.
   * @returns The x-offset value.
   */
  getOffsetX(): number {
    return this.offset[0];
  }

  /**
   * The "getOffsetY" function returns the offset in y-axis direction.
   * @returns The y-offset value.
   */
  getOffsetY(): number {
    return this.offset[1];
  }

  /**
   * The "setOffset" function set the origin offset value.
   * @param {number} offsetX - The x-offset.
   * @param {number} offsetY - The y-offset.
   */
  setOffset(offsetX: number, offsetY: number): void {
    this.offset = [offsetX, offsetY];
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
   * The "getPixelsPerUnit" function get the pixelsPerUnit property.
   * @returns - The pixelsPerUnit property.
   */
  getPixelsPerUnit(): number {
    return this.pixelsPerUnit;
  }

  /**
   * The "setPixelsPerUnit" function sets the number of pixels per unit.
   * @param {number} pixelsPerUnit - The `pixelsPerUnit` parameter is a number that represents the number
   * of pixels per unit of measurement. It is used to determine the scale or resolution at which
   * the sprite is displayed.
   */
  setPixelsPerUnit(pixelsPerUnit: number): void {
    this.pixelsPerUnit = pixelsPerUnit;
  }

  /**
   * The "getBillboardMode" function returns the billboardMode property.
   * @returns The billboardMode property.
   */
  getBillboardMode(): boolean {
    return this.billboardMode;
  }

  /**
   * The "setBillboardMode" function sets the billboard mode to either true or false.
   * @param {boolean} billboardMode - A boolean value that determines whether the object should be
   * displayed as a billboard, meaning it always faces the camera regardless of its orientation.
   */
  setBillboardMode(billboardMode: boolean): void {
    this.billboardMode = billboardMode;
  }

  /**
   * The "setTexture" function sets the sprite texture.
   * @param {Gfx3Texture} texture - The sprite texture.
   */
  setTexture(texture: Gfx3Texture): void {
    this.texture = texture;
    this.textureChanged = true;
  }

  /**
   * The "getTexture" function returns the sprite texture.
   * @returns The sprite texture.
   */
  getTexture(): Gfx3Texture {
    return this.texture;
  }

  /**
   * The "getGroup01" function returns the static group index 1.
   * @returns The static group.
   */
  getGroup01(): Gfx3StaticGroup {
    if (this.textureChanged) {
      this.grp1.setTexture(0, 'TEXTURE', this.texture);
      this.grp1.allocate();
      this.textureChanged = false;
    }

    return this.grp1;
  }
}

export { Gfx3Sprite };