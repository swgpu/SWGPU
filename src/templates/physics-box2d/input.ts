import { inputManager } from '@lib/input/input_manager';
import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
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

    if (inputManager.isActiveAction('LEFT')) {
      entity.velocity[0] = -6;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      entity.velocity[0] = +6;
    }

    if (inputManager.isActiveAction('UP')) {
      entity.velocity[1] = -6;
    }

    if (inputManager.isActiveAction('DOWN')) {
      entity.velocity[0] = +6;
    }
  }
}