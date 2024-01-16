import { dnaManager } from '../../../lib/dna/dna_manager';
import { inputManager } from '../../../lib/input/input_manager';
import { DNASystem } from '../../../lib/dna/dna_system';
import { DNAComponent } from '../../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { RunComponent } from './run';
import { JumpComponent } from './jump';
// ---------------------------------------------------------------------------------------

export class IdleControlsComponent extends DNAComponent {
  constructor() {
    super('IdleControls');
  }
}

export class IdleComponent extends DNAComponent {
  constructor() {
    super('Idle');
  }
}

export class IdleControlsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('IdleControls');
    super.addRequiredComponentTypename('Idle');
  }

  onEntityUpdate(ts, entity) {
    if (inputManager.isActiveAction('LEFT') || inputManager.isActiveAction('RIGHT')) {
      dnaManager.removeComponent(entity, 'Idle');
      dnaManager.addComponent(entity, new RunComponent(6, 0));
    }
  }

  onActionOnce(actionId, entity) {
    if (actionId == 'UP') {
      dnaManager.removeComponent(entity, 'Idle');
      dnaManager.addComponent(entity, new JumpComponent(-25, 10));
    }
  }
}

export class IdleSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Idle');
  }

  onEntityUpdate(ts, entity) {
    const move = dnaManager.getComponent(entity, 'Move');
    const drawable = dnaManager.getComponent(entity, 'Drawable');
    move.velocityX = 0;
    drawable.jas.play('IDLE', true, true);
  }
}