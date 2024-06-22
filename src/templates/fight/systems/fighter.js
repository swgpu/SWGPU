import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
import { PositionComponent } from './position';
import { MoveComponent } from './move';
// ---------------------------------------------------------------------------------------

export class FighterComponent extends DNAComponent {
  constructor(id, health, dmgSprite, w, h) {
    super('Fighter');
    this.id = id;
    this.health = health;
    this.dmgSprite = dmgSprite;
    this.w = w;
    this.h = h;
  }
}

export class FighterSystem extends DNASystem {
  constructor(bgWidth, bgHeight) {
    super();
    this.bgWidth = bgWidth;
    this.bgHeight = bgHeight;
    super.addRequiredComponentTypename('Fighter');
    super.addRequiredComponentTypename('Position');
    super.addRequiredComponentTypename('Move');
  }

  onEntityUpdate(ts, eid) {
    const fighter = dnaManager.getComponent(eid, FighterComponent);
    const position = dnaManager.getComponent(eid, PositionComponent);
    const move = dnaManager.getComponent(eid, MoveComponent);

    const nextPositionX = position.x + move.velocityX;
    const halfWidth = fighter.w * 0.5;

    if (nextPositionX - halfWidth < 0) {
      move.velocityX = 0;
    }
    else if (nextPositionX + halfWidth > this.bgWidth) {
      move.velocityX = 0;
    }
  }

  onEntityDraw(eid) {
    const fighter = dnaManager.getComponent(eid, FighterComponent);
    const position = dnaManager.getComponent(eid, PositionComponent);

    const ctx = gfx2Manager.getContext();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = '#000';
    ctx.fillRect(position.x - (fighter.w / 2), position.y - (fighter.h / 2), fighter.w, fighter.h);
    ctx.globalAlpha = 1.0;
  }
}