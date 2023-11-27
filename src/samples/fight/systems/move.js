import { dnaManager } from '../../../lib/dna/dna_manager';
import { DNASystem } from '../../../lib/dna/dna_system';
import { DNAComponent } from '../../../lib/dna/dna_component';
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

  onEntityUpdate(ts, entity) {
    const move = dnaManager.getComponent(entity, 'Move');
    const drawable = dnaManager.getComponent(entity, 'Drawable');
    const position = dnaManager.getComponent(entity, 'Position');
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