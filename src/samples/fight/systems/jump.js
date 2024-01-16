import { dnaManager } from '../../../lib/dna/dna_manager';
import { inputManager } from '../../../lib/input/input_manager';
import { DNASystem } from '../../../lib/dna/dna_system';
import { DNAComponent } from '../../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { IdleComponent } from './idle';
// ---------------------------------------------------------------------------------------

export class JumpControlsComponent extends DNAComponent {
  constructor() {
    super('JumpControls');
  }
}

export class JumpComponent extends DNAComponent {
  constructor(accelerationY, doubleJumpGapTime = 5, numJump = 1) {
    super('Jump');
    this.doubleJumpGapTime = doubleJumpGapTime;
    this.numJump = numJump;
    this.accelerationY = accelerationY;
    this.createdAt = Date.now();
  }
}

export class JumpControlsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('JumpControls');
    super.addRequiredComponentTypename('Jump');    
  }

  onEntityUpdate(ts, entity) {
    const move = dnaManager.getComponent(entity, 'Move');
    if (inputManager.isActiveAction('LEFT')) {
      move.direction = -1;
    }
    else if (inputManager.isActiveAction('RIGHT')) {
      move.direction = +1;
    }
  }

  onActionOnce(actionId, entity) {
    const jump = dnaManager.getComponent(entity, 'Jump');
    const move = dnaManager.getComponent(entity, 'Move');
    const age = Date.now() - jump.createdAt;

    if (actionId == 'UP' && age > jump.doubleJumpGapTime && move.velocityY < 0 && jump.numJump <= 1) {
      move.velocityY = 0;
      dnaManager.removeComponent(entity, 'Jump');
      dnaManager.addComponent(entity, new JumpComponent(-15, 3, 2));
    }
  }
}

export class JumpSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Jump');
    super.addRequiredComponentTypename('Move');
    super.addRequiredComponentTypename('Drawable');
    super.addRequiredComponentTypename('Gravity');
  }

  onEntityBind(entity) {
    const jump = dnaManager.getComponent(entity, 'Jump');
    const move = dnaManager.getComponent(entity, 'Move');
    const drawable = dnaManager.getComponent(entity, 'Drawable');

    move.velocityY += jump.accelerationY;
    drawable.jas.play('JUMP', false, true);
  }

  onEntityUpdate(ts, entity) {
    const move = dnaManager.getComponent(entity, 'Move');
    const drawable = dnaManager.getComponent(entity, 'Drawable');
    const gravity = dnaManager.getComponent(entity, 'Gravity');

    if (move.velocityY > 0) {
      drawable.jas.play('FALLOF', false, true);
    }

    if (move.velocityY == 0 && gravity.onFloor) {
      dnaManager.removeComponent(entity, 'Jump');
      dnaManager.addComponent(entity, new IdleComponent());
    }
  }
}