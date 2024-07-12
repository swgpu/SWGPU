import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { PositionComponent } from './position';
import { VelocityComponent } from './velocity';
// ---------------------------------------------------------------------------------------

export class DrawableComponent extends DNAComponent {
  constructor(options = { jas: null, jss: null, zIndex: 0 }) {
    super('Drawable');
    this.jas = options.jas;
    this.jss = options.jss;
    this.zIndex = options.zIndex;
    this.lastAnimationFrameIndex = -1;
  }
}

export class DrawableSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Position');
    super.addRequiredComponentTypename('Drawable');
    this.onlySpecialAttack = false;
  }

  onBeforeUpdate(ts) {
    this.eids.sort((a, b) => {
      const aDrawable = dnaManager.getComponent(a, DrawableComponent);
      const bDrawable = dnaManager.getComponent(b, DrawableComponent);
      return aDrawable.zIndex - bDrawable.zIndex
    });
  }

  onEntityUpdate(ts, eid) {
    const position = dnaManager.getComponent(eid, PositionComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);
    const sprite = drawable.jss ?? drawable.jas;

    if (dnaManager.hasComponent(eid, VelocityComponent)) {
      const velocity = dnaManager.getComponent(eid, VelocityComponent);
      if (velocity.x > 0.01) {
        sprite.setFlipX(false);
      }
      if (velocity.x < -0.01) {
        sprite.setFlipX(true);
      }
    }

    sprite.setPosition(position.x, position.y);
    sprite.update(ts);
  }

  onEntityDraw(eid) {
    const drawable = dnaManager.getComponent(eid, DrawableComponent);
    const sprite = drawable.jss ?? drawable.jas;
    sprite.draw();
  }
}