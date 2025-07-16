import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
import { PositionComponent } from './position';
import { ColliderComponent } from './collider';
// ---------------------------------------------------------------------------------------

export class FighterComponent extends DNAComponent {
  constructor(id, health, dmgSprite) {
    super('Fighter');
    this.id = id;
    this.health = health;
    this.dmgSprite = dmgSprite;
  }
}

export class FighterSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Fighter');
    super.addRequiredComponentTypename('Position');
    super.addRequiredComponentTypename('Velocity');
    super.addRequiredComponentTypename('Collider');
  }

  onEntityDraw(eid) {
    const position = dnaManager.getComponent(eid, PositionComponent);
    const collider = dnaManager.getComponent(eid, ColliderComponent);
    const bounds = collider.getBounds(position.x, position.y);

    gfx2Manager.drawCommand((ctx) => {
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#000';
      ctx.fillRect(bounds.left, bounds.top, collider.width, collider.height);
      ctx.globalAlpha = 1.0;
    });
  }
}