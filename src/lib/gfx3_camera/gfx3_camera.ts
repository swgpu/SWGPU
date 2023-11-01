import { gfx3Manager } from '../gfx3/gfx3_manager';
import { UT } from '../core/utils';
import { Gfx3View } from '../gfx3/gfx3_view';
import { Gfx3Transformable } from '../gfx3/gfx3_transformable';

/**
 * The `Gfx3Camera` class represents a camera in a 3D graphics system and provides methods for setting
 * its position, rotation, scale, and view, as well as for performing translations, rotations, zooming,
 * and looking at specific coordinates.
 */
class Gfx3Camera extends Gfx3Transformable {
  view: Gfx3View;

  /**
   * The constructor.
   * @param {number} viewIndex - The `viewIndex` is the index of the view you want to bind the camera.
   */
  constructor(viewIndex: number) {
    super();
    this.view = gfx3Manager.getView(viewIndex);
  }

  /**
   * The "setPosition" function set the position with the given x, y and z coordinates.
   * @param {number} x - The X coordinate of the position.
   * @param {number} y - The Y coordinate of the position.
   * @param {number} z - The Z coordinate of the position.
   */
  setPosition(x: number, y: number, z: number): void {
    super.setPosition(x, y, z);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * The "translate" function translate the position.
   * @param {number} x - The amount of translation in the x-axis direction.
   * @param {number} y - The amount of translation in the y-axis direction.
   * @param {number} z - The amount of translation in the z-axis direction.
   */
  translate(x: number, y: number, z: number): void {
    super.translate(x, y, z);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * The "setRotationQuaternion" function sets the rotation using Quaternion.
   * @param {vec4} quaternion - The quaternion.
   */
  setRotationQuaternion(quaternion: vec4) : void {
    super.setRotationQuaternion(quaternion);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * The "setRotation" function sets rotation Euler angles (in radians).
   * @param {number} x - The rotation angle on x-axis in radians.
   * @param {number} y - The rotation angle on y-axis in radians.
   * @param {number} z - The rotation angle on z-axis in radians.
   */
  setRotation(x: number, y: number, z: number): void {
    super.setRotation(x, y, z);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * The "rotate" function add rotation values to Euler angles.
   * @param {number} x - The rotation angle on x-axis in radians.
   * @param {number} y - The rotation angle on y-axis in radians.
   * @param {number} z - The rotation angle on z-axis in radians.
   */
  rotate(x: number, y: number, z: number): void {
    super.rotate(x, y, z);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * The "setScale" function sets the scale with the given x, y and z factors.
   * @param {number} x - The x factor in the x-axis direction.
   * @param {number} y - The y factor in the y-axis direction.
   * @param {number} z - The z factor in the z-axis direction.
   */
  setScale(x: number, y: number, z: number): void {
    super.setScale(x, y, z);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * The "zoom" function add scale values.
   * @param {number} x - The x factor in the x-axis direction.
   * @param {number} y - The y factor in the y-axis direction.
   * @param {number} z - The z factor in the z-axis direction.
   */
  zoom(x: number, y: number, z: number): void {
    super.zoom(x, y, z);
    this.view.setCameraMatrix(this.getTransformMatrix());
  }

  /**
   * The "changeView" function attach camera to another view.
   * @param {number} viewIndex - The index of the view you want to change to.
   */
  changeView(viewIndex: number): void {
    this.view = gfx3Manager.getView(viewIndex);
  }

  /**
   * The "lookAt" function sets the camera matrix to position the camera at the specified coordinates and
   * look towards them.
   * @param {number} x - The x-coordinate of the target position that the camera should look at.
   * @param {number} y - The y-coordinate of the target position that the camera should look at.
   * @param {number} z - The z-coordinate of the target position that the camera should look at.
   */
  lookAt(x: number, y: number, z:number): void {
    const matrix = this.view.getCameraMatrix();
    UT.MAT4_LOOKAT(this.position, [x, y, z], [0, 1, 0], matrix);
    UT.MAT4_MULTIPLY(matrix, UT.MAT4_SCALE(this.scale[0], this.scale[1], this.scale[2]), matrix);
    this.view.setCameraMatrix(matrix);
  }

  /**
   * The "getCameraMatrix" function returns the camera matrix of the view.
   * @returns The camera matrix.
   */
  getCameraMatrix(): mat4 {
    return this.view.getCameraMatrix();
  }

  /**
   * The "getLocalAxies" function returns an array of three vectors representing the local axes of an
   * object based on its transformation matrix.
   * @returns The three axis vector.
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