import { inputManager } from '@lib/input/input_manager';
import { DNAComponent } from '@lib/dna/dna_component';
import { DNASystem } from '@lib/dna/dna_system';
import { dnaManager } from '@lib/dna/dna_manager';
// ---------------------------------------------------------------------------------------

export class InputComponent extends DNAComponent {
  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;

  constructor() {
    super('Input');
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
  }
}

export class InputSystem extends DNASystem {
  camera: any;

  constructor(camera: any) {
    super();
    super.addRequiredComponentTypename('Input');
    this.camera = camera;
  }

  onEntityUpdate(ts: number, eid: number): void {
    const input = dnaManager.getComponent(eid, InputComponent);

    input.moveForward = !!(inputManager.isActiveAction('UP') || inputManager.isActiveAction('MOVE_FORWARD'));
    input.moveBackward = !!(inputManager.isActiveAction('DOWN') || inputManager.isActiveAction('MOVE_BACKWARD'));
    input.moveLeft = !!(inputManager.isActiveAction('LEFT') || inputManager.isActiveAction('MOVE_LEFT'));
    input.moveRight = !!(inputManager.isActiveAction('RIGHT') || inputManager.isActiveAction('MOVE_RIGHT'));

    // Log pour debug
    if (input.moveForward || input.moveBackward || input.moveLeft || input.moveRight) {
      console.log(`Input detected for entity ${eid}: forward=${input.moveForward}, backward=${input.moveBackward}, left=${input.moveLeft}, right=${input.moveRight}`);
    }
  }
}
