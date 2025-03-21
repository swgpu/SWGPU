import { dnaManager } from '@lib/dna/dna_manager';
import { eventManager } from '@lib/core/event_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
import { Gfx2SpriteJAS } from '@lib/gfx2_sprite/gfx2_sprite_jas';
// ---------------------------------------------------------------------------------------
import { spawnHit } from '../entities/hit';
import { PositionComponent } from './position';
import { DrawableComponent } from './drawable';
import { IdleComponent } from './idle';
import { RunComponent } from './run';
import { VelocityComponent } from './velocity';
// ---------------------------------------------------------------------------------------

export class CASComponent extends DNAComponent {
  constructor(animations, texture, comboComponents = []) {
    super('CAS');
    this.animations = animations;
    this.texture = texture;
    this.comboComponents = comboComponents;
    this.currentAction = '';
    this.currentActionAge = 0;
  }
}

export class ComboComponent extends DNAComponent {
  constructor(name = '', requiredComponent = null, actions = '', animationName = '', specialAttack = null, hits = []) {
    super('Combo');
    this.name = name;
    this.requiredComponent = requiredComponent;
    this.actions = actions;
    this.animationName = animationName;
    this.specialAttack = specialAttack;
    this.hits = hits;
    this.currentAttack = null;
  }
}

export class CASSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('CAS');
  }

  onEntityUpdate(ts, eid) {
    const cas = dnaManager.getComponent(eid, CASComponent);
    if (dnaManager.hasComponent(eid, ComboComponent)) {
      return;
    }

    if (cas.currentActionAge > 1000) {
      cas.currentActionAge = 0;
      cas.currentAction = '';
    }

    for (const combo of cas.comboComponents) {
      const found = cas.currentAction.indexOf(combo.actions);
      if (found == -1) {
        continue;
      }

      const match = cas.currentAction.endsWith(combo.actions);
      if (match && dnaManager.hasComponent(eid, combo.requiredComponent)) {
        dnaManager.removeComponentIfExist(eid, IdleComponent);
        dnaManager.removeComponentIfExist(eid, RunComponent);

        const velocity = dnaManager.getComponent(eid, VelocityComponent);
        velocity.x = 0;
        cas.currentActionAge = 0;
        cas.currentAction = '';
        dnaManager.addComponent(eid, combo);
      }
    }

    cas.currentActionAge += ts;
  }

  onActionOnce(actionId, eid) {
    const cas = dnaManager.getComponent(eid, CASComponent);
    cas.currentAction += actionId;
    cas.currentActionAge = 0;
  }
}

export class ComboSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('CAS');
    super.addRequiredComponentTypename('Combo');
    super.addRequiredComponentTypename('Drawable');
    super.addRequiredComponentTypename('Position');
    super.addRequiredComponentTypename('Move');
  }

  async onEntityBind(eid) {
    const combo = dnaManager.getComponent(eid, ComboComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);

    if (combo.specialAttack) {
      dnaManager.addComponent(eid, combo.specialAttack);
    }

    drawable.jas.play(combo.animationName, false, true);
    await eventManager.wait(drawable.jas, 'E_FINISHED');

    dnaManager.removeComponent(eid, ComboComponent);
    dnaManager.addComponent(eid, new IdleComponent());
  }

  onEntityUpdate(ts, eid) {
    const cas = dnaManager.getComponent(eid, CASComponent);
    const combo = dnaManager.getComponent(eid, ComboComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);
    const position = dnaManager.getComponent(eid, PositionComponent);
    const velocity = dnaManager.getComponent(eid, VelocityComponent);

    if (drawable.jas.getCurrentAnimationFrameIndex() == drawable.lastAnimationFrameIndex) {
      return;
    }

    drawable.lastAnimationFrameIndex = drawable.jas.getCurrentAnimationFrameIndex();

    const hits = combo.hits.filter(h => h.frameIndex == drawable.jas.getCurrentAnimationFrameIndex());
    if (hits.length == 0) {
      return;
    }

    for (const hit of hits) {
      const jas = new Gfx2SpriteJAS();
      jas.setAnimations(cas.animations);
      jas.setTexture(cas.texture);
      spawnHit(hit, position.x, position.y, jas, eid, velocity.direction);
    }
  }
}