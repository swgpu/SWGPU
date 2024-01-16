import { dnaManager } from '../../../lib/dna/dna_manager';
import { inputManager } from '../../../lib/input/input_manager';
import { DNASystem } from '../../../lib/dna/dna_system';
import { DNAComponent } from '../../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { JumpComponent } from './jump';
import { IdleComponent } from './idle';
// ---------------------------------------------------------------------------------------

export class RunControlsComponent extends DNAComponent {
  constructor() {
    super('RunControls');
  }
}

export class RunComponent extends DNAComponent {
  constructor(speed) {
    super('Run');
    this.speed = speed;
  }
}

export class RunControlsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('RunControls');
    super.addRequiredComponentTypename('Run');
    super.addRequiredComponentTypename('Move');
  }

  onEntityUpdate(ts, entity) {
    const move = dnaManager.getComponent(entity, 'Move');
    let action = false;

    if (inputManager.isActiveAction('LEFT')) {
      action = true;
      move.direction = -1;
    }
    else if (inputManager.isActiveAction('RIGHT')) {
      action = true;
      move.direction = +1;
    }

    if (inputManager.isActiveAction('UP')) {
      action = true;
      dnaManager.removeComponent(entity, 'Run');
      dnaManager.addComponent(entity, new JumpComponent(-25, 10));
    }

    if (!action) {
      dnaManager.removeComponent(entity, 'Run');
      dnaManager.addComponent(entity, new IdleComponent());
    }
  }
}

export class RunSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Run');
    super.addRequiredComponentTypename('Drawable');
    super.addRequiredComponentTypename('Move');
  }

  onEntityBind(entity) {
    const drawable = dnaManager.getComponent(entity, 'Drawable');
    drawable.jas.play('RUN', true, true);
  }

  onEntityUpdate(ts, entity) {
    const run = dnaManager.getComponent(entity, 'Run');
    const move = dnaManager.getComponent(entity, 'Move');
    const drawable = dnaManager.getComponent(entity, 'Drawable');
    let velocity = 0;

    if (move.velocityY > 0) {
      drawable.jas.play('FALLOF', false, true);
    }
    else {
      drawable.jas.play('RUN', true, true);
    }

    if (move.direction == -1) {
      velocity += run.speed * move.direction;
      move.velocityX = velocity;
    }
    else if (move.direction == +1) {
      velocity += run.speed * move.direction;
      move.velocityX = velocity;
    }
  }
}