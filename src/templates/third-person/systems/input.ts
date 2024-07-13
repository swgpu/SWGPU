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
    let mx = 0;
    let mz = 0;

    const entity = dnaManager.getComponent(eid, EntityComponent);
    const camera = dnaManager.getComponent(eid, CameraComponent);
    const axies = camera.rec.getAxies();

    if (inputManager.isActiveAction('LEFT')) {
      mx += axies[0][0] * -1;
      mz += axies[0][2] * -1;
      moving = true;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      mx += axies[0][0];
      mz += axies[0][2];
      moving = true;
    }

    if (inputManager.isActiveAction('UP')) {
      mx += axies[2][0] * -1;
      mz += axies[2][2] * -1;
      moving = true;
    }

    if (inputManager.isActiveAction('DOWN')) {
      mx += axies[2][0];
      mz += axies[2][2];
      moving = true;
    }

    if (moving) {
      const moveAngle = UT.VEC2_ANGLE([mx, mz]);
      mx = Math.cos(moveAngle) * entity.speed;
      mz = Math.sin(moveAngle) * entity.speed;
    }

    entity.velocity[0] = mx;
    entity.velocity[2] = mz;
  }
}