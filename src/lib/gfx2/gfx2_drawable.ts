/**
 * The `Gfx2Drawable` class represents a drawable object in a 2D graphics system.
 */
class Gfx2Drawable {
  position: vec2;
  rotation: number;
  scale: vec2;
  offset: vec2;
  visible: boolean;

  /**
   * The constructor.
   */
  constructor() {
    this.position = [0, 0];
    this.rotation = 0;
    this.scale = [1, 1];
    this.offset = [0, 0];
    this.visible = true;
  }

  /**
   * The "update" is a virtual method used for the update phase.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    // virtual method called during update phase !
  }

  /**
   * The "draw" is a virtual method that is called during the draw phase (after transforms).
   */
  draw(): void {
    // virtual method called during draw phase !
  }

  /**
   * The "getPosition" function returns the position.
   * @returns The position as a 2D vector.
   */
  getPosition(): vec2 {
    return this.position;
  }

  /**
   * The "getPositionX" function returns the x-coordinate of the position.
   * @returns The X coordinate.
   */
  getPositionX(): number {
    return this.position[0];
  }

  /**
   * The "getPositionY" function returns the y-coordinate of the position.
   * @returns The Y coordinate.
   */
  getPositionY(): number {
    return this.position[1];
  }

  /**
   * The "setPosition" function set the position with the given x and y coordinates.
   * @param {number} x - The X coordinate of the position.
   * @param {number} y - The Y coordinate of the position.
   */
  setPosition(x: number, y: number): void {
    this.position[0] = x;
    this.position[1] = y;
  }

  /**
   * The "translate" function translate the position.
   * @param {number} x - The amount of translation in the x-axis direction.
   * @param {number} y - The amount of translation in the y-axis direction.
   */
  translate(x: number, y: number): void {
    this.position[0] += x;
    this.position[1] += y;
  }

  /**
   * The "getRotation" function returns the rotation.
   * @returns The rotation.
   */
  getRotation(): number {
    return this.rotation;
  }

  /**
   * The "setRotation" function sets the rotation angle (in radians).
   * @param {number} rotation - The `rotation` parameter is the rotation angle in radians.
   */
  setRotation(rotation: number): void {
    this.rotation = rotation;
  }

  /**
   * The "rotate" function add rotation value to current angle.
   * @param {number} a - The rotation angle to add in radians.
   */
  rotate(a: number): void {
    this.rotation += a;
  }

  /**
   * The "getScale" function returns the scale as a 2D vector.
   * @returns The scale.
   */
  getScale(): vec2 {
    return this.scale;
  }

  /**
   * The "getScaleX" function returns the scale factor on x-axis.
   * @returns The x-axis scale factor.
   */
  getScaleX(): number {
    return this.scale[0];
  }

  /**
   * The "getScaleY" function returns the scale factor on y-axis.
   * @returns The y-axis scale factor.
   */
  getScaleY(): number {
    return this.scale[1];
  }

  /**
   * The "setScale" function sets the scale with the given x and y factors.
   * @param {number} x - The x factor in the x-axis direction.
   * @param {number} y - The y factor in the y-axis direction.
   */
  setScale(x: number, y: number): void {
    this.scale[0] = x;
    this.scale[1] = y;
  }

  /**
   * The "zoom" function add scale values.
   * @param {number} x - The x factor in the x-axis direction.
   * @param {number} y - The y factor in the y-axis direction.
   */
  zoom(x: number, y: number): void {
    this.scale[0] += x;
    this.scale[1] += y;
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
   * @param {number} x - The x-offset.
   * @param {number} y - The y-offset.
   */
  setOffset(x: number, y: number): void {
    this.offset[0] = x;
    this.offset[1] = y;
  }
}

export { Gfx2Drawable };