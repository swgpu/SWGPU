import { Gfx3Camera } from './gfx3_camera';
/**
 * A 3D camera orbiting around a target.
 */
declare class Gfx3CameraOrbit extends Gfx3Camera {
    #private;
    rotationSpeed: number;
    frictionCoefficient: number;
    maxPitch: number;
    minPitch: number;
    target: vec3;
    distance: number;
    zoomSpeed: number;
    velocityPhi: number;
    velocityTheta: number;
    phi: number;
    theta: number;
    lastDragTimestamp: number;
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
     * Set the rotation speed.
     *
     * @param {number} rotationSpeed - The speed.
     */
    setRotationSpeed(rotationSpeed: number): void;
    /**
     * Set the friction coefficient.
     * High value for strong friction.
     *
     * @param {number} frictionCoefficient - The friction coef.
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
     * Set the target position you want looking for.
     *
     * @param {vec3} target - The target position.
     */
    setTarget(target: vec3): void;
    /**
     * Set the distance between target and camera.
     *
     * @param {number} distance - The distance.
     */
    setDistance(distance: number): void;
    /**
     * Set the zoom speed.
     *
     * @param {number} zoomSpeed - The zoom speed.
     */
    setZoomSpeed(zoomSpeed: number): void;
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
    /**
     * Returns the target position.
     */
    getTarget(): vec3;
    /**
     * Returns the distance between target and camera.
     */
    getDistance(): number;
    /**
     * Returns the zoom speed.
     */
    getZoomSpeed(): number;
    /**
     * Returns the theta angle (vertical).
     */
    getTheta(): number;
    /**
     * Returns the phi angle (horizontal).
     */
    getPhi(): number;
}
export { Gfx3CameraOrbit };
