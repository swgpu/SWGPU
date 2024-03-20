import { gfx3Manager } from '../gfx3/gfx3_manager';
import { Quaternion } from '../core/quaternion';
import { UT } from '../core/utils';
import { Gfx3View } from '../gfx3/gfx3_view';
import { Gfx3Transformable } from '../gfx3/gfx3_transformable';

/**
 * A 3D camera object.
 */
class Gfx3Camera extends Gfx3Transformable {
  view: Gfx3View;

  /**
   * @param {number} viewIndex - The view you want to bind the camera.
   */
  constructor(viewIndex: number) {
    super();
    this.view = gfx3Manager.getView(viewIndex);
  }

  /**
   * Set the position with the given x, y and z coordinates.
   * 
   * @param {number} x - The X coordinate of the position.
   * @param {number} y - The Y coordinate of the position.
   * @param {number} z - The Z coordinate of the position.
   */
  setPosition(x: number, y: number, z: number): void {
    super.setPosition(x, y, z);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * Translate the position.
   * 
   * @param {number} x - The amount of translation in the x-axis direction.
   * @param {number} y - The amount of translation in the y-axis direction.
   * @param {number} z - The amount of translation in the z-axis direction.
   */
  translate(x: number, y: number, z: number): void {
    super.translate(x, y, z);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * Set euler rotation in radians.
   * 
   * @param {number} x - The rotation angle on x-axis in radians.
   * @param {number} y - The rotation angle on y-axis in radians.
   * @param {number} z - The rotation angle on z-axis in radians.
   */
  setRotation(x: number, y: number, z: number): void {
    super.setRotation(x, y, z);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * Add euler rotation in radians.
   * 
   * @param {number} x - The rotation angle on x-axis in radians.
   * @param {number} y - The rotation angle on y-axis in radians.
   * @param {number} z - The rotation angle on z-axis in radians.
   */
  rotate(x: number, y: number, z: number): void {
    super.rotate(x, y, z);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * Set the Quaternion rotation.
   * 
   * @param {vec4} quaternion - The quaternion.
   */
  setQuaternion(quaternion: Quaternion) : void {
    super.setQuaternion(quaternion);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * Set the scale with the given x, y and z factors.
   * 
   * @param {number} x - The x factor in the x-axis direction.
   * @param {number} y - The y factor in the y-axis direction.
   * @param {number} z - The z factor in the z-axis direction.
   */
  setScale(x: number, y: number, z: number): void {
    super.setScale(x, y, z);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * Add scale values.
   * 
   * @param {number} x - The x factor in the x-axis direction.
   * @param {number} y - The y factor in the y-axis direction.
   * @param {number} z - The z factor in the z-axis direction.
   */
  zoom(x: number, y: number, z: number): void {
    super.zoom(x, y, z);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * Change the view attached to the camera.
   * @param {number} viewIndex - The view specified by its index.
   */
  changeView(viewIndex: number): void {
    this.view = gfx3Manager.getView(viewIndex);
  }

  /**
   * Rotate to look at the specified coordinates.
   * 
   * @param {number} x - The x-coordinate of the target position that the transformable should look at.
   * @param {number} y - The y-coordinate of the target position that the transformable should look at.
   * @param {number} z - The z-coordinate of the target position that the transformable should look at.
   */
  lookAt(x: number, y: number, z:number, up: vec3 = [0, 1, 0]): void {
    super.lookAt(x, y, z, up);
    this.view.setCameraMatrix(this.transformMatrix);
  }

  /**
   * Returns the camera matrix.
   */
  getCameraMatrix(): mat4 {
    return this.view.getCameraMatrix();
  }

  /**
   * Returns the three local axes of the transformable.
   */
  getLocalAxies(): Array<vec3> {
    const matrix = this.view.getCameraMatrix();
    return [
      UT.VEC3_CREATE(matrix[0], matrix[1], matrix[2]),
      UT.VEC3_CREATE(matrix[4], matrix[5], matrix[6]),
      UT.VEC3_CREATE(matrix[8], matrix[9], matrix[10])
    ];
  }
}

export { Gfx3Camera };