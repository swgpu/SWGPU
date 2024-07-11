import { dnaManager } from '@lib/dna/dna_manager';
import { inputManager } from '@lib/input/input_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { IdleComponent } from './idle';
import { MoveComponent } from './move';
import { DrawableComponent } from './drawable';
import { GravityComponent } from './gravity';
// ---------------------------------------------------------------------------------------

export class JumpControlsComponent extends DNAComponent {
  constructor() {
    super('JumpControls');
  }
}

export class JumpComponent extends DNAComponent {
  constructor(accelerationY = -15, doubleJumpGapTime = 10, numJump = 1) {
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

  onEntityUpdate(ts, eid) {
    const move = dnaManager.getComponent(eid, MoveComponent);
    if (inputManager.isActiveAction('LEFT')) {
      move.direction = -1;
    }
    else if (inputManager.isActiveAction('RIGHT')) {
      move.direction = +1;
    }
  }

  onActionOnce(actionId, eid) {
    const jump = dnaManager.getComponent(eid, JumpComponent);
    const move = dnaManager.getComponent(eid, MoveComponent);
    const age = Date.now() - jump.createdAt;

    if (actionId == 'UP' && age > jump.doubleJumpGapTime && move.velocityY < 0 && jump.numJump <= 1) {
      move.velocityY = 0;
      dnaManager.removeComponent(eid, JumpComponent);
      dnaManager.addComponent(eid, new JumpComponent(-15, 3, 2));
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

  onEntityBind(eid) {
    const jump = dnaManager.getComponent(eid, JumpComponent);
    const move = dnaManager.getComponent(eid, MoveComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);

    move.velocityY += jump.accelerationY;
    drawable.jas.play('JUMP', false, true);
  }

  onEntityUpdate(ts, eid) {
    const move = dnaManager.getComponent(eid, MoveComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);
    const gravity = dnaManager.getComponent(eid, GravityComponent);

    if (move.velocityY > 0) {
      drawable.jas.play('FALLOF', false, true);
    }

    if (move.velocityY == 0 && gravity.onFloor) {
      dnaManager.removeComponent(eid, JumpComponent);
      dnaManager.addComponent(eid, new IdleComponent());
    }
  }
}