import { UT } from '../core/utils';
import { Quaternion } from '../core/quaternion';

/**
 * A transformable object with position, rotation, scale and more.
 */
class Gfx3Transformable {
  position: vec3;
  rotation: vec3;
  scale: vec3;
  quaternion: Quaternion;
  transformMatrix: mat4;

  constructor() {
    this.position = [0.0, 0.0, 0.0];
    this.rotation = [0.0, 0.0, 0.0];
    this.scale = [1.0, 1.0, 1.0];
    this.quaternion = new Quaternion();
    this.transformMatrix = UT.MAT4_IDENTITY();
  }

  /**
   * Returns the position.
   */
  getPosition(): vec3 {
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
   * Returns the z-coordinate of the position.
   */
  getPositionZ(): number {
    return this.position[2];
  }

 /**
   * Set the position with the given x, y and z coordinates.
   * 
   * @param {number} x - The X coordinate of the position.
   * @param {number} y - The Y coordinate of the position.
   * @param {number} z - The Z coordinate of the position.
   */
  setPosition(x: number, y: number, z: number): void {
    this.position[0] = x;
    this.position[1] = y;
    this.position[2] = z;
  }

  /**
   * Translate the position.
   * 
   * @param {number} x - The amount of translation in the x-axis direction.
   * @param {number} y - The amount of translation in the y-axis direction.
   * @param {number} z - The amount of translation in the z-axis direction.
   */
  translate(x: number, y: number, z: number): void {
    this.position[0] += x;
    this.position[1] += y;
    this.position[2] += z;
  }

  /**
   * Returns the euler rotation in radians.
   */
  getRotation(): vec3 {
    return this.rotation;
  }

  /**
   * Returns the euler rotation on x-axis in radians.
   */
  getRotationX(): number {
    return this.rotation[0];
  }

  /**
   * Returns the euler rotation on y-axis in radians.
   */
  getRotationY(): number {
    return this.rotation[1];
  }

  /**
   * Returns the euler rotation on z-axis in radians.
   */
  getRotationZ(): number {
    return this.rotation[2];
  }

  /**
   * Set euler rotation angles in radians.
   * 
   * @param {number} x - The rotation angle on x-axis in radians.
   * @param {number} y - The rotation angle on y-axis in radians.
   * @param {number} z - The rotation angle on z-axis in radians.
   */
  setRotation(x: number, y: number, z: number): void {
    this.rotation[0] = x;
    this.rotation[1] = y;
    this.rotation[2] = z;
  }

  /**
   * Add euler rotation values in radians.
   * 
   * @param {number} x - The rotation angle on x-axis in radians.
   * @param {number} y - The rotation angle on y-axis in radians.
   * @param {number} z - The rotation angle on z-axis in radians.
   */
  rotate(x: number, y: number, z: number): void {
    this.rotation[0] += x;
    this.rotation[1] += y;
    this.rotation[2] += z;
  }

  /**
   * Sets the Quaternion rotation.
   * 
   * @param {Quaternion} quaternion - The quaternion.
   */
  setQuaternion(quaternion: Quaternion) : void {
    this.quaternion = quaternion.clone();
  }

  /**
   * Returns the Quaternion rotation.
   */
  getQuaternion(): Quaternion {
    return this.quaternion;
  }

  /**
   * Returns the scale.
   */
  getScale(): vec3 {
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
   * Returns the scale factor on z-axis.
   */
  getScaleZ(): number {
    return this.scale[2];
  }

  /**
   * Set the scale with the given x, y and z factors.
   * 
   * @param {number} x - The x factor in the x-axis direction.
   * @param {number} y - The y factor in the y-axis direction.
   * @param {number} z - The z factor in the z-axis direction.
   */
  setScale(x: number, y: number, z: number): void {
    this.scale[0] = x;
    this.scale[1] = y;
    this.scale[2] = z;
  }

  /**
   * Add scale values.
   * 
   * @param {number} x - The x factor in the x-axis direction.
   * @param {number} y - The y factor in the y-axis direction.
   * @param {number} z - The z factor in the z-axis direction.
   */
  zoom(x: number, y: number, z: number): void {
    this.scale[0] += x;
    this.scale[1] += y;
    this.scale[2] += z;
  }

  /**
   * Returns the transformation matrix from position, rotation, scale and quaternion values.
   */
  getTransformMatrix(): mat4 {
    UT.MAT4_TRANSFORM(this.position, this.rotation, this.scale, this.quaternion, this.transformMatrix);
    return this.transformMatrix;
  }

  /**
   * Rotate to look at the specified coordinates.
   * Note: Avoid euler rotation and quaternion rotation.
   * 
   * @param {number} x - The x-coordinate of the target position that the transformable should look at.
   * @param {number} y - The y-coordinate of the target position that the transformable should look at.
   * @param {number} z - The z-coordinate of the target position that the transformable should look at.
   */
  lookAt(x: number, y: number, z:number, up: vec3 = [0, 1, 0]): void {
    UT.MAT4_LOOKAT(this.position, [x, y, z], up, this.transformMatrix);
    UT.MAT4_MULTIPLY(this.transformMatrix, UT.MAT4_SCALE(this.scale[0], this.scale[1], this.scale[2]), this.transformMatrix);
    this.rotation[0] = -Math.asin(y);
    this.rotation[1] = Math.atan2(x, z);
    this.rotation[2] = 0;
  }

  /**
   * Returns the three local axes of the transformable.
   */
  getLocalAxies(): Array<vec3> {
    const matrix = this.getTransformMatrix();
    return [
      [matrix[0], matrix[1], matrix[2]],
      [matrix[4], matrix[5], matrix[6]],
      [matrix[8], matrix[9], matrix[10]]
    ];
  }
}

export { Gfx3Transformable };