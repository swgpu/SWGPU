import { dnaManager } from '../../../lib/dna/dna_manager';
import { DNASystem } from '../../../lib/dna/dna_system';
import { DNAComponent } from '../../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { IdleComponent } from './idle';
import { DownComponent } from './down';
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

  onEntityBind(entity) {
    const dmg = dnaManager.getComponent(entity, 'Damage');
    const fighter = dnaManager.getComponent(entity, 'Fighter');
    const move = dnaManager.getComponent(entity, 'Move');

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

  async onEntityUpdate(ts, entity) {
    if (this.paused) {
      return;
    }

    const dmg = dnaManager.getComponent(entity, 'Damage');
    const move = dnaManager.getComponent(entity, 'Move');
    const drawable = dnaManager.getComponent(entity, 'Drawable');

    if (dmg.age > dmg.maxAge) {
      dnaManager.removeComponent(entity, 'Damage');

      if (!dmg.airDropped) {
        dnaManager.addComponent(entity, new IdleComponent());
      }
      else {
        dnaManager.addComponent(entity, new DownComponent());
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

  onEntityDraw(entity) {
    const dmg = dnaManager.getComponent(entity, 'Damage');
    const fighter = dnaManager.getComponent(entity, 'Fighter');
    const position = dnaManager.getComponent(entity, 'Position');

    if (dmg.spriteAnimation) {
      fighter.dmgSprite.setPosition(position.x, position.y);
      fighter.dmgSprite.draw();
    }
  }
}