import { dnaManager } from '@lib/dna/dna_manager';
import { inputManager } from '@lib/input/input_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { IdleComponent } from './idle';
import { VelocityComponent } from './velocity';
import { DrawableComponent } from './drawable';
import { MoveComponent } from './move';
// ---------------------------------------------------------------------------------------

export class JumpControlsComponent extends DNAComponent {
  constructor() {
    super('JumpControls');
  }
}

export class JumpComponent extends DNAComponent {
  constructor(accelerationY = -100, doubleJumpGapTime = 10, numJump = 1) {
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
    super.addRequiredComponentTypename('Velocity');
  }

  onEntityUpdate(ts, eid) {
    const velocity = dnaManager.getComponent(eid, VelocityComponent);
    if (inputManager.isActiveAction('LEFT')) {
      velocity.direction = -1;
    }
    else if (inputManager.isActiveAction('RIGHT')) {
      velocity.direction = +1;
    }
  }

  onActionOnce(actionId, eid) {
    const jump = dnaManager.getComponent(eid, JumpComponent);
    const velocity = dnaManager.getComponent(eid, VelocityComponent);
    const age = Date.now() - jump.createdAt;

    if (actionId == 'UP' && age > jump.doubleJumpGapTime && velocity.y < 0 && jump.numJump <= 1) {
      velocity.y = 0;
      dnaManager.removeComponent(eid, JumpComponent);
      dnaManager.addComponent(eid, new JumpComponent(-90, 3, 2));
    }
  }
}

export class JumpSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Jump');
    super.addRequiredComponentTypename('Velocity');
    super.addRequiredComponentTypename('Drawable');
    super.addRequiredComponentTypename('Move');
  }

  onEntityBind(eid) {
    const jump = dnaManager.getComponent(eid, JumpComponent);
    const velocity = dnaManager.getComponent(eid, VelocityComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);
    const move = dnaManager.getComponent(eid, MoveComponent);

    move.onFloor = false;
    velocity.y += jump.accelerationY;
    drawable.jas.play('JUMP', false, true);
  }

  onEntityUpdate(ts, eid) {
    const velocity = dnaManager.getComponent(eid, VelocityComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);
    const move = dnaManager.getComponent(eid, MoveComponent);

    if (velocity.y > 0) {
      drawable.jas.play('FALLOF', false, true);
    }

    if (move.onFloor) {
      dnaManager.removeComponent(eid, JumpComponent);
      dnaManager.addComponent(eid, new IdleComponent());
    }
  }
}