import { dnaManager } from '../../../lib/dna/dna_manager';
import { DNASystem } from '../../../lib/dna/dna_system';
import { DNAComponent } from '../../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class DrawableComponent extends DNAComponent {
  constructor(options = { jas: null, jss: null, zIndex: 0 }) {
    super('Drawable');
    this.jas = options.jas;
    this.jss = options.jss;
    this.zIndex = options.zIndex;
    this.lastAnimationFrameIndex = -1;
    this.updated = true;
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
      const aDrawable = dnaManager.getComponent(a, 'Drawable');
      const bDrawable = dnaManager.getComponent(b, 'Drawable');
      return aDrawable.zIndex - bDrawable.zIndex
    });
  }

  onEntityUpdate(ts, entity) {
    const position = dnaManager.getComponent(entity, 'Position');
    const drawable = dnaManager.getComponent(entity, 'Drawable');

    if (!drawable.updated) {
      return;
    }

    if (drawable.jss) {
      drawable.jss.setPosition(position.x, position.y);
      drawable.jss.update(ts);
    }

    if (drawable.jas) {
      drawable.jas.setPosition(position.x, position.y);
      drawable.jas.update(ts);
    }
  }

  onEntityDraw(entity) {
    const drawable = dnaManager.getComponent(entity, 'Drawable');

    if (drawable.jss) {
      drawable.jss.draw();
    }

    if (drawable.jas) {
      drawable.jas.draw();
    }
  }
}