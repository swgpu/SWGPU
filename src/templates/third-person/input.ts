import { inputManager } from '@lib/input/input_manager';
import { dnaManager } from '@lib/dna/dna_manager';
import { UT } from '@lib/core/utils';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
import { CameraComponent } from './camera';
// ---------------------------------------------------------------------------------------

export class InputComponent extends DNAComponent {
  constructor() {
    super('Input');
  }
}

export class InputSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Input');
    super.addRequiredComponentTypename('Camera');
    super.addRequiredComponentTypename('Entity');
  }

  onEntityUpdate(ts: number, eid: number) {
    let moving = false;
    let moveAngle = 0;

    if (inputManager.isActiveAction('LEFT')) {
      moveAngle = -Math.PI / 2;
      moving = true;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      moveAngle = Math.PI / 2;
      moving = true;
    }

    if (inputManager.isActiveAction('UP')) {
      moveAngle = 0;
      moving = true;
    }

    if (inputManager.isActiveAction('DOWN')) {
      moveAngle = -Math.PI;
      moving = true;
    }

    const entity = dnaManager.getComponent<EntityComponent>(eid, 'Entity');
    let mx = 0;
    let mz = 0;

    if (moving) {
      const camera = dnaManager.getComponent<CameraComponent>(eid, 'Camera');
      const phi = camera.rec.getPhi();
      mx = -Math.cos(phi + moveAngle) * entity.speed * (ts / 1000);
      mz = -Math.sin(phi + moveAngle) * entity.speed * (ts / 1000);
      entity.rotation = UT.VEC2_ANGLE([mx, mz]);
    }

    entity.velocity[0] = mx;
    entity.velocity[2] = mz;
  }
}