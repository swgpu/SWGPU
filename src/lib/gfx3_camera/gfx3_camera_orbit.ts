import { inputManager } from '../input/input_manager';
import { eventManager } from '../core/event_manager';
import { Gfx3Camera } from './gfx3_camera';
import { UT } from '../core/utils';

/**
 * A 3D camera orbiting around a target.
 */
class Gfx3CameraOrbit extends Gfx3Camera {
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
  constructor(viewIndex: number) {
    super(viewIndex);
    this.rotationSpeed = 2;
    this.frictionCoefficient = 0.99;
    this.maxPitch = Math.PI * 0.5 - 0.01;
    this.minPitch = Math.PI * -0.5 + 0.01;
    this.target = [0, 0, 0];
    this.distance = 10;
    this.zoomSpeed = 0.1;
    this.velocityPhi = 0;
    this.velocityTheta = 0;
    this.phi = Math.PI * 0.5;
    this.theta = 0;
    this.lastDragTimestamp = 0;

    eventManager.subscribe(inputManager, 'E_MOUSE_WHEEL', this, this.$handleMouseWheel);
    eventManager.subscribe(inputManager, 'E_MOUSE_UP', this, this.$handleMouseUp);
    eventManager.subscribe(inputManager, 'E_MOUSE_DOWN', this, this.$handleMouseDown);
    eventManager.subscribe(inputManager, 'E_MOUSE_DRAG', this, this.$handleMouseDrag);
  }

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    eventManager.unsubscribe(inputManager, 'E_MOUSE_WHEEL', this);
    eventManager.unsubscribe(inputManager, 'E_MOUSE_UP', this);
    eventManager.unsubscribe(inputManager, 'E_MOUSE_DOWN', this);
    eventManager.unsubscribe(inputManager, 'E_MOUSE_DRAG', this);
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    const pos = UT.VEC3_ROTATE_AROUND(this.target, this.distance, this.phi, this.theta);
    this.setPosition(pos[0], pos[1], pos[2]);
    this.lookAt(this.target[0], this.target[1], this.target[2]);

    if (!inputManager.isMouseDown()) {
      this.velocityTheta *= Math.pow(1 - this.frictionCoefficient, ts / 1000);
      this.velocityPhi *= Math.pow(1 - this.frictionCoefficient, ts / 1000);
      this.theta -= this.velocityTheta;
      this.phi -= this.velocityPhi;
    }
  }

  /**
   * Set the rotation speed.
   * 
   * @param {number} rotationSpeed - The speed.
   */
  setRotationSpeed(rotationSpeed: number): void {
    this.rotationSpeed = rotationSpeed;
  }

  /**
   * Set the friction coefficient.
   * High value for strong friction.
   * 
   * @param {number} frictionCoefficient - The friction coef.
   */
  setFrictionCoefficient(frictionCoefficient: number): void {
    this.frictionCoefficient = frictionCoefficient;
  }

  /**
   * Set the max rotation angle on x-axis.
   * 
   * @param {number} maxPitch - The max pitch angle.
   */
  setMaxPitch(maxPitch: number): void {
    this.maxPitch = maxPitch;
  }

  /**
   * Set the min rotation angle on x-axis.
   * 
   * @param {number} minPitch - The min pitch angle.
   */
  setMinPitch(minPitch: number): void {
    this.minPitch = minPitch;
  }

  /**
   * Set the target position you want looking for.
   * 
   * @param {vec3} target - The target position.
   */
  setTarget(target: vec3): void {
    this.target = target;
  }

  /**
   * Set the distance between target and camera.
   * 
   * @param {number} distance - The distance.
   */
  setDistance(distance: number): void {
    this.distance = distance;
  }

  /**
   * Set the zoom speed.
   * 
   * @param {number} zoomSpeed - The zoom speed.
   */
  setZoomSpeed(zoomSpeed: number): void {
    this.zoomSpeed = this.zoomSpeed;
  }

  /**
   * Returns the rotation speed.
   */
  getRotationSpeed(): number {
    return this.rotationSpeed;
  }

  /**
   * Returns the friction coefficient.
   */
  getFrictionCoefficient(): number {
    return this.frictionCoefficient;
  }

  /**
   * Returns the max rotation angle on x-axis.
   */
  getMaxPitch(): number {
    return this.maxPitch;
  }

  /**
   * Returns the min rotation angle on x-axis.
   */
  getMinPitch(): number {
    return this.minPitch;
  }

  /**
   * Returns the target position.
   */
  getTarget(): vec3 {
    return this.target;
  }

  /**
   * Returns the distance between target and camera.
   */
  getDistance(): number {
    return this.distance;
  }

  /**
   * Returns the zoom speed.
   */
  getZoomSpeed(): number {
    return this.zoomSpeed;
  }

  $handleMouseUp(): void {
    const delta = Date.now()  - this.lastDragTimestamp;
    if (delta >= 100) {
      this.velocityTheta = 0;
      this.velocityPhi = 0;
    }
  }

  $handleMouseDown(): void {
    this.velocityPhi = 0;
    this.velocityTheta = 0;
  }

  $handleMouseDrag(data: any): void {
    this.velocityTheta = data.movementY * this.rotationSpeed / 1000;
    this.velocityPhi = data.movementX * this.rotationSpeed / 1000;

    this.theta -= this.velocityTheta;
    this.phi -= this.velocityPhi;
    this.theta = UT.CLAMP(this.theta, this.minPitch, this.maxPitch);
    this.lastDragTimestamp = Date.now();
  }

  $handleMouseWheel(data: any): void {
    this.distance *= 1 + data.delta * this.zoomSpeed;
  }
}

export { Gfx3CameraOrbit };