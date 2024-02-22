import { gfx3Manager } from '../gfx3/gfx3_manager';
import { gfx3SpriteRenderer } from './gfx3_sprite_renderer';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { UT } from '../core/utils.js';
import { Gfx3Drawable } from '../gfx3/gfx3_drawable';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { SHADER_VERTEX_ATTR_COUNT } from './gfx3_sprite_shader';

/**
 * A 3D base sprite object.
 */
class Gfx3Sprite extends Gfx3Drawable {
  textureChanged: boolean;
  offset: vec2;
  flip: [boolean, boolean];
  pixelsPerUnit: number;
  billboardMode: boolean;
  grp1: Gfx3StaticGroup;
  texture: Gfx3Texture;

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
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    this.grp1.delete();
    super.delete();
  }

  /**
   * The draw function.
   */
  draw(): void {
    gfx3SpriteRenderer.drawSprite(this);
  }

  /**
   * Returns the transformation matrix.
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
   * Returns the origin offset.
   */
  getOffset(): vec2 {
    return this.offset;
  }

  /**
   * Returns the offset in x-axis direction.
   */
  getOffsetX(): number {
    return this.offset[0];
  }

  /**
   * Returns the offset in y-axis direction.
   */
  getOffsetY(): number {
    return this.offset[1];
  }

  /**
   * Set the origin offset value.
   * 
   * @param {number} offsetX - The x-offset.
   * @param {number} offsetY - The y-offset.
   */
  setOffset(offsetX: number, offsetY: number): void {
    this.offset = [offsetX, offsetY];
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
   * Returns the pixels per unit value.
   */
  getPixelsPerUnit(): number {
    return this.pixelsPerUnit;
  }

  /**
   * Set the number of pixels per unit.
   * 
   * @param {number} pixelsPerUnit - Determine the scale or resolution at which the sprite is displayed.
   */
  setPixelsPerUnit(pixelsPerUnit: number): void {
    this.pixelsPerUnit = pixelsPerUnit;
  }

  /**
   * Returns the billboard mode.
   */
  getBillboardMode(): boolean {
    return this.billboardMode;
  }

  /**
   * Set the billboard mode.
   * 
   * @param {boolean} billboardMode - Determines whether the object should be
   * displayed as a billboard, meaning it always faces the camera regardless of its orientation.
   */
  setBillboardMode(billboardMode: boolean): void {
    this.billboardMode = billboardMode;
  }

  /**
   * Set the sprite texture.
   * 
   * @param {Gfx3Texture} texture - The sprite texture.
   */
  setTexture(texture: Gfx3Texture): void {
    this.texture = texture;
    this.textureChanged = true;
  }

  /**
   * Returns the sprite texture.
   */
  getTexture(): Gfx3Texture {
    return this.texture;
  }

  /**
   * Returns the bindgroup(1).
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