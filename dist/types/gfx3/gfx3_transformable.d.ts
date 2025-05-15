import { Quaternion } from '../core/quaternion';
declare enum Axis {
    FORWARD = "FORWARD",
    BACKWARD = "BACKWARD",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    UP = "UP",
    DOWN = "DOWN"
}
/**
 * A transformable object with position, rotation, scale and more.
 */
declare class Gfx3Transformable {
    position: vec3;
    rotation: vec3;
    scale: vec3;
    quaternion: Quaternion;
    lookTarget: vec3 | null;
    lookUp: vec3;
    transformMatrix: mat4;
    constructor();
    /**
     * Returns the position.
     */
    getPosition(): vec3;
    /**
     * Returns the x-coordinate of the position.
     */
    getPositionX(): number;
    /**
     * Returns the y-coordinate of the position.
     */
    getPositionY(): number;
    /**
     * Returns the z-coordinate of the position.
     */
    getPositionZ(): number;
    /**
      * Set the position with the given x, y and z coordinates.
      *
      * @param {number} x - The X coordinate of the position.
      * @param {number} y - The Y coordinate of the position.
      * @param {number} z - The Z coordinate of the position.
      */
    setPosition(x: number, y: number, z: number): void;
    /**
     * Translate the position.
     *
     * @param {number} x - The amount of translation in the x-axis direction.
     * @param {number} y - The amount of translation in the y-axis direction.
     * @param {number} z - The amount of translation in the z-axis direction.
     */
    translate(x: number, y: number, z: number): void;
    /**
     * Returns the euler rotation in radians.
     */
    getRotation(): vec3;
    /**
     * Returns the euler rotation on x-axis in radians.
     */
    getRotationX(): number;
    /**
     * Returns the euler rotation on y-axis in radians.
     */
    getRotationY(): number;
    /**
     * Returns the euler rotation on z-axis in radians.
     */
    getRotationZ(): number;
    /**
     * Set euler rotation angles in radians.
     *
     * @param {number} x - The rotation angle on x-axis in radians.
     * @param {number} y - The rotation angle on y-axis in radians.
     * @param {number} z - The rotation angle on z-axis in radians.
     */
    setRotation(x: number, y: number, z: number): void;
    /**
     * Add euler rotation values in radians.
     *
     * @param {number} x - The rotation angle on x-axis in radians.
     * @param {number} y - The rotation angle on y-axis in radians.
     * @param {number} z - The rotation angle on z-axis in radians.
     */
    rotate(x: number, y: number, z: number): void;
    /**
     * Sets the Quaternion rotation.
     *
     * @param {Quaternion} quaternion - The quaternion.
     */
    setQuaternion(quaternion: Quaternion): void;
    /**
     * Returns the Quaternion rotation.
     */
    getQuaternion(): Quaternion;
    /**
     * Returns the scale.
     */
    getScale(): vec3;
    /**
     * Returns the scale factor on x-axis.
     */
    getScaleX(): number;
    /**
     * Returns the scale factor on y-axis.
     */
    getScaleY(): number;
    /**
     * Returns the scale factor on z-axis.
     */
    getScaleZ(): number;
    /**
     * Set the scale with the given x, y and z factors.
     *
     * @param {number} x - The x factor in the x-axis direction.
     * @param {number} y - The y factor in the y-axis direction.
     * @param {number} z - The z factor in the z-axis direction.
     */
    setScale(x: number, y: number, z: number): void;
    /**
     * Add scale values.
     *
     * @param {number} x - The x factor in the x-axis direction.
     * @param {number} y - The y factor in the y-axis direction.
     * @param {number} z - The z factor in the z-axis direction.
     */
    zoom(x: number, y: number, z: number): void;
    /**
     * Returns the transformation matrix from position, rotation, scale and quaternion values.
     */
    getTransformMatrix(): mat4;
    /**
     * Rotate to look at the specified coordinates.
     * Note: Avoid euler rotation and quaternion rotation.
     *
     * @param {number} x - The x-coordinate of the target position that the transformable should look at.
     * @param {number} y - The y-coordinate of the target position that the transformable should look at.
     * @param {number} z - The z-coordinate of the target position that the transformable should look at.
     */
    lookAt(x: number, y: number, z: number, up?: vec3): void;
    /**
     * Returns three local axies of the transformable.
     */
    getAxies(): Array<vec3>;
    /**
     * Returns the specified local axis of the transformable.
     */
    getAxis(axis: Axis): vec3;
}
export { Gfx3Transformable, Axis };
