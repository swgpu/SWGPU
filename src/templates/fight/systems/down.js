import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { IdleComponent } from './idle';
import { VelocityComponent } from './velocity';
import { DrawableComponent } from './drawable';
import { RunComponent } from './run';
import { JumpComponent } from './jump';
// ---------------------------------------------------------------------------------------

export class DownControlsComponent extends DNAComponent {
  constructor() {
    super('DownControls');
  }
}

export class DownComponent extends DNAComponent {
  constructor() {
    super('Down');
  }
}

export class DownControlsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('DownControls');
    super.addRequiredComponentTypename('Down');
  }

  onActionOnce(actionId, eid) {
    if (actionId == 'UP') {
      dnaManager.removeComponent(eid, DownComponent);
      dnaManager.addComponent(eid, new IdleComponent());
    }
  }
}

export class DownSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Down');
    super.addRequiredComponentTypename('Velocity');
    super.addRequiredComponentTypename('Drawable');
  }

  onEntityBind(eid) {
    const velocity = dnaManager.getComponent(eid, VelocityComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);

    dnaManager.removeComponentIfExist(eid, IdleComponent);
    dnaManager.removeComponentIfExist(eid, RunComponent);
    dnaManager.removeComponentIfExist(eid, JumpComponent);

    drawable.jas.play('PAIN_GROUND', false, true);
    velocity.x = 0;
    velocity.y = 0;
  }
}