import { gfx2Manager } from './gfx2_manager';

/**
 * A 2D drawable object.
 */
class Gfx2Drawable {
  position: vec2;
  rotation: number;
  scale: vec2;
  offset: vec2;
  visible: boolean;
  opacity: number;
  z: number;
  elevation: number;

  constructor() {
    this.position = [0, 0];
    this.rotation = 0;
    this.scale = [1, 1];
    this.offset = [0, 0];
    this.visible = true;
    this.opacity = 1;
    this.z = 0;
    this.elevation = 0;
  }

  /**
   * The draw function.
   */
  draw(): void {
    if (!this.visible) {
      return;
    }

    const ctx = gfx2Manager.getContext();

    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(-this.offset[0], -this.offset[1]);
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale[0], this.scale[1]);
    this.paint();
    ctx.globalAlpha = 1.0;
    ctx.restore();
  }

  /**
   * Virtual update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {}

  /**
   * Virtual method that is called during the draw phase (after transforms).
   */
  paint() {}

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
}

export { Gfx2Drawable };
