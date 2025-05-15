import { Quaternion } from '../core/quaternion';
import { Gfx3View } from '../gfx3/gfx3_view';
import { Gfx3Transformable } from '../gfx3/gfx3_transformable';
/**
 * A 3D camera object.
 */
declare class Gfx3Camera extends Gfx3Transformable {
    view: Gfx3View;
    /**
     * @param {number} viewIndex - The view you want to bind the camera.
     */
    constructor(viewIndex: number);
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
     * Set euler rotation in radians.
     *
     * @param {number} x - The rotation angle on x-axis in radians.
     * @param {number} y - The rotation angle on y-axis in radians.
     * @param {number} z - The rotation angle on z-axis in radians.
     */
    setRotation(x: number, y: number, z: number): void;
    /**
     * Add euler rotation in radians.
     *
     * @param {number} x - The rotation angle on x-axis in radians.
     * @param {number} y - The rotation angle on y-axis in radians.
     * @param {number} z - The rotation angle on z-axis in radians.
     */
    rotate(x: number, y: number, z: number): void;
    /**
     * Set the Quaternion rotation.
     *
     * @param {vec4} quaternion - The quaternion.
     */
    setQuaternion(quaternion: Quaternion): void;
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
     * Change the view attached to the camera.
     * @param {number} viewIndex - The view specified by its index.
     */
    changeView(viewIndex: number): void;
    /**
     * Rotate to look at the specified coordinates.
     *
     * @param {number} x - The x-coordinate of the target position that the transformable should look at.
     * @param {number} y - The y-coordinate of the target position that the transformable should look at.
     * @param {number} z - The z-coordinate of the target position that the transformable should look at.
     */
    lookAt(x: number, y: number, z: number, up?: vec3): void;
    /**
     * Returns the camera matrix.
     */
    getCameraMatrix(): mat4;
}
export { Gfx3Camera };
