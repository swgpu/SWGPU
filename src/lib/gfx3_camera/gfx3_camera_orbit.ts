import { inputManager } from '../input/input_manager';
import { eventManager } from '../core/event_manager';
import { Gfx3Camera } from './gfx3_camera';

class Gfx3CameraOrbit extends Gfx3Camera {
  distance: number;
  angularVelocity: number;
  zoomSpeed: number;
  rotationSpeed: number;
  frictionCoefficient: number;
  dragStartRotation: vec2;

  constructor(viewIndex: number) {
    super(viewIndex);
    this.distance = 0;
    this.angularVelocity = 0;
    this.zoomSpeed = 0.1;
    this.rotationSpeed = 1;
    this.frictionCoefficient = 0.99;
    this.dragStartRotation = [0, 0];

    eventManager.subscribe(inputManager, 'E_MOUSE_DOWN', this, this.handleMouseDown);
    eventManager.subscribe(inputManager, 'E_MOUSE_DRAG', this, this.handleMouseDrag);
  }

  update(ts: number): void {
  }

  handleMouseDown(): void {

  }

  handleMouseDrag(): void {

  }
}

export { Gfx3CameraOrbit };