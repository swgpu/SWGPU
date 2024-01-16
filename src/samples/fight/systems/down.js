import { dnaManager } from '../../../lib/dna/dna_manager';
import { DNASystem } from '../../../lib/dna/dna_system';
import { DNAComponent } from '../../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { IdleComponent } from './idle';
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

  onActionOnce(actionId, entity) {
    if (actionId == 'UP') {
      dnaManager.removeComponent(entity, 'Down');
      dnaManager.addComponent(entity, new IdleComponent());
    }
  }
}

export class DownSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Down');
    super.addRequiredComponentTypename('Move');
    super.addRequiredComponentTypename('Drawable');
  }

  onEntityBind(entity) {
    const move = dnaManager.getComponent(entity, 'Move');
    const drawable = dnaManager.getComponent(entity, 'Drawable');

    dnaManager.removeComponentIfExist(entity, 'Idle');
    dnaManager.removeComponentIfExist(entity, 'Run');
    dnaManager.removeComponentIfExist(entity, 'Jump');

    drawable.jas.play('PAIN_GROUND', false, true);
    move.velocityX = 0;
    move.velocityY = 0;
  }
}