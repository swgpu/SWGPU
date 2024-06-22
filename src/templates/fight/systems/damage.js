import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { IdleComponent } from './idle';
import { DownComponent } from './down';
import { FighterComponent } from './fighter';
import { MoveComponent } from './move';
import { DrawableComponent } from './drawable';
import { PositionComponent } from './position';
// ---------------------------------------------------------------------------------------

export class DamageComponent extends DNAComponent {
  constructor(velocityImpact = null, damageHP = 1, maxAge = 1, spriteAnimation = null, spriteOffset = [0, 0]) {
    super('Damage');
    this.velocityImpact = velocityImpact;
    this.damageHP = damageHP;
    this.maxAge = maxAge;
    this.spriteAnimation = spriteAnimation;
    this.spriteOffset = spriteOffset;
    this.airDropped = false;
    this.age = 0;
  }
}

export class DamageSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Damage');
    super.addRequiredComponentTypename('Position');
    super.addRequiredComponentTypename('Move');
    super.addRequiredComponentTypename('Drawable');
    this.paused = false;
    this.frictionX = 0.5;
  }

  onEntityBind(eid) {
    const dmg = dnaManager.getComponent(eid, DamageComponent);
    const fighter = dnaManager.getComponent(eid, FighterComponent);
    const move = dnaManager.getComponent(eid, MoveComponent);

    if (dmg.velocityImpact) {
      move.velocityX = dmg.velocityImpact[0];
      move.velocityY = dmg.velocityImpact[1];
    }

    fighter.health -= dmg.damageHP;

    if (dmg.spriteAnimation) {
      fighter.dmgSprite.setOffset(dmg.spriteOffset[0], dmg.spriteOffset[1]);
      fighter.dmgSprite.play(dmg.spriteAnimation, true, true);
    }
  }

  async onEntityUpdate(ts, eid) {
    if (this.paused) {
      return;
    }

    const dmg = dnaManager.getComponent(eid, DamageComponent);
    const move = dnaManager.getComponent(eid, MoveComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);

    if (dmg.age > dmg.maxAge) {
      dnaManager.removeComponent(eid, DamageComponent);

      if (!dmg.airDropped) {
        dnaManager.addComponent(eid, new IdleComponent());
      }
      else {
        dnaManager.addComponent(eid, new DownComponent());
      }

      return;
    }

    if (move.velocityY < 0) {
      dmg.airDropped = true;
      drawable.jas.play('PAIN_UP', false, true);
    }
    else if (move.velocityY > 0) {
      dmg.airDropped = true;
      drawable.jas.play('PAIN_DOWN', false, true);
    }

    if (move.velocityY == 0 && dmg.airDropped) {
      drawable.jas.play('PAIN_GROUND', false, true);
    }
    else if (move.velocityY == 0) {
      drawable.jas.play('PAIN', false, false);
    }

    if (move.velocityX > 0) {
      move.velocityX = Math.max(move.velocityX - this.frictionX, 0);
    }

    if (move.velocityX < 0) {
      move.velocityX = Math.min(move.velocityX + this.frictionX, 0);
    }

    dmg.age += ts / 1000.0;
  }

  onEntityDraw(eid) {
    const dmg = dnaManager.getComponent(eid, DamageComponent);
    const fighter = dnaManager.getComponent(eid, FighterComponent);
    const position = dnaManager.getComponent(eid, PositionComponent);

    if (dmg.spriteAnimation) {
      fighter.dmgSprite.setPosition(position.x, position.y);
      fighter.dmgSprite.draw();
    }
  }
}