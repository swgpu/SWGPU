import { inputManager } from '@lib/input/input_manager';
import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
import { PhysicsComponent } from './physics';
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
    super.addRequiredComponentTypename('Physics');
    super.addRequiredComponentTypename('Entity');
  }

  onEntityUpdate(ts: number, eid: number) {
    const entity = dnaManager.getComponent(eid, EntityComponent);
    const physics = dnaManager.getComponent(eid, PhysicsComponent);

    if (!physics.body) {
      return;
    }

    let dt = ts / 1000;
    let angle = 0;
    let accel = 0;

    if (inputManager.isActiveAction('LEFT')) {
      angle = -6;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      angle = 6;
    }

    if (inputManager.isActiveAction('UP')) {
      accel = 1;
    }

    if (inputManager.isActiveAction('DOWN')) {
      accel = -1;
    }

    if (accel != 0) {
      entity.rotation += angle * dt;
      entity.velocity[0] = Math.cos(entity.rotation) * entity.speed * accel * dt;
      entity.velocity[2] = Math.sin(entity.rotation) * entity.speed * accel * dt;
    }
    else {
      entity.velocity[0] = 0;
      entity.velocity[2] = 0;
    }
  }
}