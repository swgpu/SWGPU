import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { eventManager } from '@lib/core/event_manager';
import { UT } from '@lib/core/utils';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { DamageComponent } from './damage';
import { PositionComponent } from './position';
import { DrawableComponent } from './drawable';
import { FighterComponent } from './fighter';
import { RunComponent } from './run';
import { IdleComponent } from './idle';
import { JumpComponent } from './jump';
// ---------------------------------------------------------------------------------------

export class HitComponent extends DNAComponent {
  constructor(options = {}) {
    super('Hit');
    this.w = options.w;
    this.h = options.h;
    this.frameIndex = options.frameIndex;
    this.maxAge = options.maxAge;
    this.relativeX = options.relativeX;
    this.relativeY = options.relativeY;
    this.velocityTween = options.velocityTween ?? null;
    
    this.isCollide = options.isCollide ?? true;
    this.damageHP = options.damageHP ?? 1;
    this.damageMaxAge = options.damageMaxAge ?? 1;
    this.damageSpriteAnimation = options.damageSpriteAnimation ?? null;
    this.damageSpriteOffset = options.damageSpriteOffset ?? [0, 0];

    this.spriteAnimationOnLaunch = options.spriteAnimationOnLaunch ?? null;
    this.spriteAnimationOnImpact = options.spriteAnimationOnImpact ?? null;
    this.spriteOffsetX = options.spriteOffsetX ?? 0;
    this.spriteOffsetY = options.spriteOffsetY ?? 0;
    this.owner = options.owner ?? -1;
    this.direction = options.direction ?? 0;
    this.velocityImpact = options.velocityImpact ?? null;
    this.marked = false;
    this.age = 0;
  }
}

export class HitSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Hit');
    super.addRequiredComponentTypename('Position');
    super.addRequiredComponentTypename('Drawable');
  }

  onEntityBind(eid) {
    const hit = dnaManager.getComponent(eid, HitComponent);
    const position = dnaManager.getComponent(eid, PositionComponent);

    position.x += hit.relativeX * hit.direction;
    position.y += hit.relativeY;

    if (hit.spriteAnimationOnLaunch) {
      const drawable = dnaManager.getComponent(eid, DrawableComponent);
      drawable.jas.setVisible(true);
      drawable.jas.setOffset(hit.spriteOffsetX, hit.spriteOffsetY);
      drawable.jas.play(hit.spriteAnimationOnLaunch, false, false);
    }
  }

  async onEntityUpdate(ts, eid) {
    const hit = dnaManager.getComponent(eid, HitComponent);
    if (hit.marked) {
      return;
    }

    const position = dnaManager.getComponent(eid, PositionComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);

    if (hit.isCollide) {
      const fighters = dnaManager.findEntities(FighterComponent);
      const enemies = fighters.filter(f => f != hit.owner);

      for (let enemyId of enemies) {
        const enemyFighter = dnaManager.getComponent(enemyId, FighterComponent);
        const enemyPosition = dnaManager.getComponent(enemyId, PositionComponent);

        const min1 = [position.x - (hit.w / 2), position.y - (hit.h / 2)];
        const max1 = [position.x + (hit.w / 2), position.y + (hit.h / 2)];
        const min2 = [enemyPosition.x - (enemyFighter.w / 2), enemyPosition.y - (enemyFighter.h / 2)];
        const max2 = [enemyPosition.x + (enemyFighter.w / 2), enemyPosition.y + (enemyFighter.h / 2)];
  
        if (UT.COLLIDE_RECT_TO_RECT(min1, max1, min2, max2)) {
          hit.marked = true;
          dnaManager.removeComponentIfExist(enemyId, DamageComponent);
          dnaManager.removeComponentIfExist(enemyId, RunComponent);
          dnaManager.removeComponentIfExist(enemyId, IdleComponent);
          dnaManager.removeComponentIfExist(enemyId, JumpComponent);

          dnaManager.addComponent(enemyId, new DamageComponent(
            [hit.velocityImpact[0] * hit.direction, hit.velocityImpact[1]],
            hit.damageHP,
            hit.damageMaxAge,
            hit.damageSpriteAnimation,
            hit.damageSpriteOffset
          ));

          if (hit.spriteAnimationOnImpact) {
            drawable.jas.setVisible(true);
            drawable.jas.setOffset(hit.spriteOffsetX, hit.spriteOffsetY);
            drawable.jas.play(hit.spriteAnimationOnImpact, false, false);
            await eventManager.wait(drawable.jas, 'E_FINISHED');
            drawable.jas.setVisible(false);
          }
  
          dnaManager.removeEntity(eid);
          return;
        }
      }
    }

    if (hit.age > hit.maxAge) {
      dnaManager.removeEntity(eid);
      return;
    }

    if (hit.velocityTween) {
      const v = hit.velocityTween.interpolate(hit.age);
      position.x += v[0] * hit.direction * (ts / 100);
      position.y += v[1] * (ts / 100);
    }

    hit.age += ts / 1000;
  }

  onEntityDraw(eid) {
    const hit = dnaManager.getComponent(eid, HitComponent);
    const position = dnaManager.getComponent(eid, PositionComponent);
    const ctx = gfx2Manager.getContext();
    ctx.fillStyle = 'red';
    ctx.fillRect(position.x - (hit.w / 2), position.y - (hit.h / 2), hit.w, hit.h);
  }
}