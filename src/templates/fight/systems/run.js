import { dnaManager } from '@lib/dna/dna_manager';
import { inputManager } from '@lib/input/input_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { JumpComponent } from './jump';
import { IdleComponent } from './idle';
import { VelocityComponent } from './velocity';
import { DrawableComponent } from './drawable';
// ---------------------------------------------------------------------------------------

export class RunControlsComponent extends DNAComponent {
  constructor() {
    super('RunControls');
  }
}

export class RunComponent extends DNAComponent {
  constructor(speed = 20) {
    super('Run');
    this.speed = speed;
  }
}

export class RunControlsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('RunControls');
    super.addRequiredComponentTypename('Run');
    super.addRequiredComponentTypename('Velocity');
  }

  onEntityUpdate(ts, eid) {
    const velocity = dnaManager.getComponent(eid, VelocityComponent);
    const leftActive = inputManager.isActiveAction('LEFT');
    const rightActive = inputManager.isActiveAction('RIGHT');
    const upJustActive = inputManager.isJustActiveAction('UP');

    if (leftActive) {
      velocity.direction = -1;
    }
    else if (rightActive) {
      velocity.direction = +1;
    }

    if (upJustActive) {
      dnaManager.removeComponent(eid, RunComponent);
      dnaManager.addComponent(eid, new JumpComponent());
    }

    if (!leftActive && !rightActive && !upJustActive) {
      dnaManager.removeComponent(eid, RunComponent);
      dnaManager.addComponent(eid, new IdleComponent());
    }
  }
}

export class RunSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Run');
    super.addRequiredComponentTypename('Drawable');
    super.addRequiredComponentTypename('Velocity');
  }

  onEntityBind(eid) {
    const drawable = dnaManager.getComponent(eid, DrawableComponent);
    drawable.jas.play('RUN', true, true);
  }

  onEntityUpdate(ts, eid) {
    const run = dnaManager.getComponent(eid, RunComponent);
    const velocity = dnaManager.getComponent(eid, VelocityComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);

    drawable.jas.play('RUN', true, true);
    velocity.x = run.speed * velocity.direction;
  }
}