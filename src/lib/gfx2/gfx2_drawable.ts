import { Poolable } from '../core/object_pool';
import { UT } from '../core/utils';
import { Gfx2BoundingRect } from '../gfx2/gfx2_bounding_rect';
import { gfx2Manager } from './gfx2_manager';

/**
 * A 2D drawable object.
 */
class Gfx2Drawable implements Poolable<Gfx2Drawable> {
  position: vec2;
  rotation: number;
  scale: vec2;
  flip: [boolean, boolean];
  offset: vec2;
  visible: boolean;
  opacity: number;
  z: number;
  elevation: number;
  boundingRect: Gfx2BoundingRect;

  constructor() {
    this.position = [0, 0];
    this.rotation = 0;
    this.scale = [1, 1];
    this.flip = [false, false];
    this.offset = [0, 0];
    this.visible = true;
    this.opacity = 1;
    this.z = 0;
    this.elevation = 0;
    this.boundingRect = new Gfx2BoundingRect();
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {}

  /**
   * This method is called during the render phase (after transforms).
   */
  onRender(): void {}

  /**
   * The render function.
   */
  render(): void {
    if (!this.isVisible()) {
      return;
    }

    const ctx = gfx2Manager.getContext();

    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(-this.offset[0], -this.offset[1]);
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale[0], this.scale[1]);
    this.onRender();
    ctx.globalAlpha = 1.0;
    ctx.restore();  
  }

  /**
   * The draw function.
   */
  draw(): void {
    gfx2Manager.draw(this);
  }

  /**
   * Returns the position.
   */
  getPosition(): vec2 {
    return this.position;
  }

  /**
   * Returns the x-coordinate of the position.
   */
  getPositionX(): number {
    return this.position[0];
  }

  /**
   * Returns the y-coordinate of the position.
   */
  getPositionY(): number {
    return this.position[1];
  }

  /**
   * Set the position with the given x and y coordinates.
   * 
   * @param {number} x - The X coordinate of the position.
   * @param {number} y - The Y coordinate of the position.
   */
  setPosition(x: number, y: number): void {
    this.position[0] = x;
    this.position[1] = y;
  }

  /**
   * Translate the position.
   * 
   * @param {number} x - The amount of translation in the x-axis direction.
   * @param {number} y - The amount of translation in the y-axis direction.
   */
  translate(x: number, y: number): void {
    this.position[0] += x;
    this.position[1] += y;
  }

  /**
   * Returns the rotation.
   */
  getRotation(): number {
    return this.rotation;
  }

  /**
   * Sets the rotation angle (in radians).
   * 
   * @param {number} rotation - The rotation angle in radians.
   */
  setRotation(rotation: number): void {
    this.rotation = rotation;
  }

  /**
   * Add rotation value to current angle.
   * 
   * @param {number} a - The rotation angle to add in radians.
   */
  rotate(a: number): void {
    this.rotation += a;
  }

  /**
   * Returns the scale as a 2D vector.
   */
  getScale(): vec2 {
    return this.scale;
  }

  /**
   * Returns the scale factor on x-axis.
   */
  getScaleX(): number {
    return this.scale[0];
  }

  /**
   * Returns the scale factor on y-axis.
   */
  getScaleY(): number {
    return this.scale[1];
  }

  /**
   * Sets the scale with the given x and y factors.
   * 
   * @param {number} x - The x factor in the x-axis direction.
   * @param {number} y - The y factor in the y-axis direction.
   */
  setScale(x: number, y: number): void {
    this.scale[0] = x;
    this.scale[1] = y;
  }

  /**
   * Add scale values.
   * 
   * @param {number} x - The x factor in the x-axis direction.
   * @param {number} y - The y factor in the y-axis direction.
   */
  zoom(x: number, y: number): void {
    this.scale[0] += x;
    this.scale[1] += y;
  }

  /**
   * Returns the flip flag on x-axis.
   */
  getFlipX(): boolean {
    return this.flip[0];
  }

  /**
   * Returns the flip flag on y-axis.
   */
  getFlipY(): boolean {
    return this.flip[1];
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
   * @param {number} x - The x-offset.
   * @param {number} y - The y-offset.
   */
  setOffset(x: number, y: number): void {
    this.offset[0] = x;
    this.offset[1] = y;
  }

  /**
   * Check if is visible or not.
   */
  isVisible(): boolean {
    return this.visible;
  }

  /**
   * Set the visibility.
   * 
   * @param {boolean} visible - The visibility.
   */
  setVisible(visible: boolean): void {
    this.visible = visible;
  }

  /**
   * Returns the opacity value.
   */
  getOpacity(): number {
    return this.opacity;
  }

  /**
   * Sets the opacity.
   * 
   * @param {number} opacity - The opacity value.
   */
  setOpacity(opacity: number): void {
    this.opacity = opacity;
  }

  /**
   * Set the z-depth value.
   * 
   * @param {number} z - The z-depth value.
   */
  setPositionZ(z: number): void {
    this.z = z;
  }

  /**
   * Returns the z-depth value.
   */
  getPositionZ(): number {
    return this.z;
  }

  /**
   * Set the elevation.
   * Only used for rendering 2D isometric tiles.
   * 
   * @param {number} elevation - The elevation value.
   */
  setElevation(elevation: number): void {
    this.elevation = elevation;
  }

  /**
   * Returns the elevation.
   * Only used for rendering 2D isometric tiles.
   */
  getElevation(): number {
    return this.elevation;
  }

  /**
   * Set the bounding rect.
   * 
   * @param {Gfx2BoundingRect} boundingRect - The bounding rectangle.
   */
  setBoundingRect(boundingRect: Gfx2BoundingRect): void {
    this.boundingRect = boundingRect;
  }

  /**
   * Returns the bounding rect.
   */
  getBoundingRect(): Gfx2BoundingRect {
    return this.boundingRect;
  }

  /**
   * Returns the bounding rect in the world space coordinates.
   */
  getWorldBoundingRect(): Gfx2BoundingRect {
    return this.boundingRect.transform(UT.MAT3_TRANSFORM(this.position, this.offset, this.rotation, this.scale));
  }

  /**
   * Clone the object.
   * 
   * @param {Gfx2Drawable} drawable - The copy object.
   */
  clone(drawable: Gfx2Drawable = new Gfx2Drawable()): Gfx2Drawable {
    drawable.position = [this.position[0], this.position[1]];
    drawable.rotation = this.rotation;
    drawable.scale = [this.scale[0], this.scale[1]];
    drawable.offset = [this.offset[0], this.offset[1]];
    drawable.visible = this.visible;
    drawable.opacity = this.opacity;
    drawable.z = this.z;
    drawable.elevation = this.elevation;
    drawable.boundingRect = new Gfx2BoundingRect(this.boundingRect.min, this.boundingRect.max);
    return drawable;
  }
}

export { Gfx2Drawable };