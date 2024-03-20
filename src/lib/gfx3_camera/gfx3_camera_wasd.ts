import { inputManager } from '../input/input_manager';
import { eventManager } from '../core/event_manager';
import { Gfx3Camera } from './gfx3_camera';
import { UT } from '../core/utils';

/**
 * A 3D camera implementation that behaves similar to first-person-shooter PC games.
 */
class Gfx3CameraWASD extends Gfx3Camera {
  movementSpeed: number;
  rotationSpeed: number;
  frictionCoefficient: number;
  velocity: vec3;
  dragStartRotation: vec2;

  /**
   * @param {number} viewIndex - The view you want to bind the camera.
   */
  constructor(viewIndex: number) {
    super(viewIndex);
    this.movementSpeed = 10;
    this.rotationSpeed = 2;
    this.frictionCoefficient = 0.99;
    this.velocity = [0, 0, 0];
    this.dragStartRotation = [0, 0];

    eventManager.subscribe(inputManager, 'E_MOUSE_DOWN', this, this.$handleMouseDown);
    eventManager.subscribe(inputManager, 'E_MOUSE_DRAG', this, this.$handleMouseDrag);
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    const cameraAxies = this.getLocalAxies();
    let move: vec3 = [0, 0, 0];
  
    if (inputManager.isActiveAction('LEFT')) {
      move = UT.VEC3_ADD_SCALED(move, cameraAxies[0], -this.movementSpeed);
    }
  
    if (inputManager.isActiveAction('RIGHT')) {
      move = UT.VEC3_ADD_SCALED(move, cameraAxies[0], +this.movementSpeed);
    }
  
    if (inputManager.isActiveAction('UP')) {
      move = UT.VEC3_ADD_SCALED(move, cameraAxies[2], -this.movementSpeed);
    }
  
    if (inputManager.isActiveAction('DOWN')) {
      move = UT.VEC3_ADD_SCALED(move, cameraAxies[2], +this.movementSpeed);
    }

    this.velocity = UT.LINEAR_VEC3(Math.pow(1 - this.frictionCoefficient, ts / 1000), move, this.velocity);
    const finalMove = UT.VEC3_SCALE(this.velocity, ts / 1000);

    this.translate(finalMove[0], finalMove[1], finalMove[2]);
  }

  /**
   * Set the move speed.
   * 
   * @param {number} movementSpeed - The speed.
   */
  setMovementSpeed(movementSpeed: number): void {
    this.movementSpeed = movementSpeed;
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
   * Returns the move speed.
   */
  getMovementSpeed(): number {
    return this.movementSpeed;
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

  $handleMouseDown(): void {
    this.dragStartRotation[0] = this.getRotationX();
    this.dragStartRotation[1] = this.getRotationY();
  }

  $handleMouseDrag(): void {
    const dragMove = inputManager.getDragMove();
    let newRotationX = this.dragStartRotation[0] + (dragMove[1] / 1000 * this.rotationSpeed);
    let newRotationY = this.dragStartRotation[1] + (dragMove[0] / 1000 * this.rotationSpeed);

    newRotationY = newRotationY % (Math.PI * 2);
    newRotationX = UT.CLAMP(newRotationX, -Math.PI / 2, Math.PI / 2);
    this.setRotation(newRotationX, newRotationY, 0);
  }
}

export { Gfx3CameraWASD };