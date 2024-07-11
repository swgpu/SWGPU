import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
// ---------------------------------------------------------------------------------------
import { Velocity } from '../components/velocity';
import { Position } from '../components/position';
import { Drawable } from '../components/drawable';
// ---------------------------------------------------------------------------------------

export class DrawableSystem extends DNASystem {
  constructor() {
    super();
    this.addRequiredComponentTypename('Drawable');
    this.addRequiredComponentTypename('Position');
  }

  onEntityUpdate(ts: number, eid: number) {
    const drawable = dnaManager.getComponent(eid, Drawable);
    const position = dnaManager.getComponent(eid, Position);

    if (dnaManager.hasComponent(eid, Velocity)) {
      const velocity = dnaManager.getComponent(eid, Velocity);
      if (velocity.x > 0.1 && Math.sign(velocity.x) === 1) {
        drawable.sprite.setFlipX(false);
      }
      if (velocity.x < 0.1 && Math.sign(velocity.x) === -1) {
        drawable.sprite.setFlipX(true);
      }
    }

    drawable.sprite.setPosition(position.x, position.y);
    drawable.sprite.update(ts);
  }

  draw() {
    for (const eid of this.eids) {
      const drawable = dnaManager.getComponent(eid, Drawable);
      drawable.sprite.draw();
    }
  }
}