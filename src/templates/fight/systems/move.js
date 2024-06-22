import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { DrawableComponent } from './drawable';
import { PositionComponent } from './position';
// ---------------------------------------------------------------------------------------

export class MoveComponent extends DNAComponent {
  constructor(direction) {
    super('Move');
    this.velocityX = 0;
    this.velocityY = 0;
    this.direction = direction;
  }
}

export class MoveSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Move');
    super.addRequiredComponentTypename('Drawable');
    super.addRequiredComponentTypename('Position');
  }

  onEntityUpdate(ts, eid) {
    const move = dnaManager.getComponent(eid, MoveComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);
    const position = dnaManager.getComponent(eid, PositionComponent);
    position.x += move.velocityX;
    position.y += move.velocityY;

    if (move.direction == -1) {
      drawable.jas.setFlipX(true);
    }
    else if (move.direction == +1) {
      drawable.jas.setFlipX(false);
    }
  }
}