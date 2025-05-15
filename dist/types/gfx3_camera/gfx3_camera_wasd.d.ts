import { Gfx3Camera } from './gfx3_camera';
/**
 * A 3D camera implementation that behaves similar to first-person-shooter PC games.
 */
declare class Gfx3CameraWASD extends Gfx3Camera {
    #private;
    movementSpeed: number;
    rotationSpeed: number;
    frictionCoefficient: number;
    velocity: vec3;
    maxPitch: number;
    minPitch: number;
    /**
     * @param {number} viewIndex - The view you want to bind the camera.
     */
    constructor(viewIndex: number);
    /**
     * Free all resources.
     * Warning: You need to call this method to free allocation for this object.
     */
    delete(): void;
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * Set the move speed.
     *
     * @param {number} movementSpeed - The speed.
     */
    setMovementSpeed(movementSpeed: number): void;
    /**
     * Set the rotation speed.
     *
     * @param {number} rotationSpeed - The speed.
     */
    setRotationSpeed(rotationSpeed: number): void;
    /**
     * Set the friction coefficient.
     * High value for strong friction.
     *
     * @param {number} frictionCoefficient - The friction coef [0-1].
     */
    setFrictionCoefficient(frictionCoefficient: number): void;
    /**
     * Set the max rotation angle on x-axis.
     *
     * @param {number} maxPitch - The max pitch angle.
     */
    setMaxPitch(maxPitch: number): void;
    /**
     * Set the min rotation angle on x-axis.
     *
     * @param {number} minPitch - The min pitch angle.
     */
    setMinPitch(minPitch: number): void;
    /**
     * Returns the move speed.
     */
    getMovementSpeed(): number;
    /**
     * Returns the rotation speed.
     */
    getRotationSpeed(): number;
    /**
     * Returns the friction coefficient.
     */
    getFrictionCoefficient(): number;
    /**
     * Returns the max rotation angle on x-axis.
     */
    getMaxPitch(): number;
    /**
     * Returns the min rotation angle on x-axis.
     */
    getMinPitch(): number;
}
export { Gfx3CameraWASD };
