import { dnaManager } from '../../../lib/dna/dna_manager';
import { eventManager } from '../../../lib/core/event_manager';
import { DNASystem } from '../../../lib/dna/dna_system';
import { DNAComponent } from '../../../lib/dna/dna_component';
import { Gfx2SpriteJAS } from '../../../lib/gfx2_sprite/gfx2_sprite_jas';
// ---------------------------------------------------------------------------------------
import { PositionComponent } from './position';
import { HitComponent } from './hit';
import { DrawableComponent } from './drawable';
import { IdleComponent } from './idle';
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
  constructor(name = '', requiredComponent = '', actions = '', animationName = '', specialAttack = null, hits = []) {
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

  onEntityUpdate(ts, entity) {
    const cas = dnaManager.getComponent(entity, 'CAS');
    if (dnaManager.hasComponent(entity, 'Combo')) {
      return;
    }

    if (cas.currentActionAge > 1000) {
      cas.currentActionAge = 0;
      cas.currentAction = '';
    }

    for (let combo of cas.comboComponents) {
      const found = cas.currentAction.indexOf(combo.actions);
      if (found == -1) {
        continue;
      }

      const match = cas.currentAction.endsWith(combo.actions);
      if (match && dnaManager.hasComponent(entity, combo.requiredComponent)) {
        dnaManager.removeComponentIfExist(entity, 'Idle');
        dnaManager.removeComponentIfExist(entity, 'Run');

        const move = dnaManager.getComponent(entity, 'Move');
        move.velocityX = 0;
        cas.currentActionAge = 0;
        cas.currentAction = '';
        dnaManager.addComponent(entity, combo);
      }
    }

    cas.currentActionAge += ts;
  }

  onActionOnce(actionId, entity) {
    const cas = dnaManager.getComponent(entity, 'CAS');
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

  async onEntityBind(entity) {
    const combo = dnaManager.getComponent(entity, 'Combo');
    const drawable = dnaManager.getComponent(entity, 'Drawable');

    if (combo.specialAttack) {
      dnaManager.addComponent(entity, combo.specialAttack);
    }

    drawable.jas.play(combo.animationName, false, true);
    await eventManager.wait(drawable.jas, 'E_FINISHED');

    if (combo.specialAttack) {
      dnaManager.removeComponent(entity, 'SpecialAttack');
    }

    dnaManager.removeComponent(entity, 'Combo');
    dnaManager.addComponent(entity, new IdleComponent());
  }

  onEntityUpdate(ts, entity) {
    const cas = dnaManager.getComponent(entity, 'CAS');
    const combo = dnaManager.getComponent(entity, 'Combo');
    const drawable = dnaManager.getComponent(entity, 'Drawable');
    const position = dnaManager.getComponent(entity, 'Position');
    const move = dnaManager.getComponent(entity, 'Move');

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

      const hitEntity = dnaManager.createEntity();
      dnaManager.addComponent(hitEntity, new PositionComponent(position.x, position.y));
      dnaManager.addComponent(hitEntity, new DrawableComponent({ jas: jas }));
      dnaManager.addComponent(hitEntity, new HitComponent(Object.assign(hit, {
        owner: entity,
        direction: move.direction
      })));
    }
  }
}