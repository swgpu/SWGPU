import { dnaManager } from '../../../lib/dna/dna_manager';
import { gfx2Manager } from '../../../lib/gfx2/gfx2_manager';
import { UT } from '../../../lib/core/utils';
import { TweenNumber } from '../../../lib/core/tween';
import { DNASystem } from '../../../lib/dna/dna_system';
import { DNAComponent } from '../../../lib/dna/dna_component';
import { Gfx2Drawable } from '../../../lib/gfx2/gfx2_drawable';
// ---------------------------------------------------------------------------------------
import { DrawableComponent } from './drawable';
import { PositionComponent } from './position';
// ---------------------------------------------------------------------------------------

export class SpecialAttackComponent extends DNAComponent {
  constructor(name, bgJSS, avatarJSS) {
    super('SpecialAttack');
    this.name = name;
    this.bgJSS = bgJSS;
    this.avatarJSS = avatarJSS;
  }
}

export class SpecialAttackSystem extends DNASystem {
  constructor(gameScreen) {
    super();
    this.gameScreen = gameScreen;
    this.duration = 3;
    super.addRequiredComponentTypename('SpecialAttack');
  }

  async onEntityBind(entity) {
    const specialAttack = dnaManager.getComponent(entity, 'SpecialAttack');

    const gfx = new GfxSpecialAttack(this.duration);
    gfx.setBackgroundJSS(specialAttack.bgJSS);
    gfx.setAvatarJSS(specialAttack.avatarJSS);
    gfx.setText(specialAttack.name);

    const effectEntity = dnaManager.createEntity();
    dnaManager.addComponent(effectEntity, new PositionComponent(0, 0));
    dnaManager.addComponent(effectEntity, new DrawableComponent({ jss: gfx, zIndex: 1 }));

    const uiRoot = document.querySelector('#UI_ROOT');
    uiRoot.style.display = 'none';

    for (const [eid, components] of dnaManager.entities.entries()) {
      const drawable = components.get('Drawable');
      if (drawable && eid != effectEntity) {
        drawable.updated = false;
      }
    }

    this.gameScreen.pause();
    setTimeout(() => this.handleTimeout(effectEntity), this.duration * 1000);
  }

  handleTimeout(effectEntity) {
    const uiRoot = document.querySelector('#UI_ROOT');
    uiRoot.style.display = 'block';

    for (const [eid, components] of dnaManager.entities.entries()) {
      const drawable = components.get('Drawable');
      if (drawable) {
        drawable.updated = true;
      }
    }

    this.gameScreen.resume();
    dnaManager.removeEntity(effectEntity);
  }
}

class GfxSpecialAttack extends Gfx2Drawable {
  constructor(duration) {
    super();
    this.duration = duration;
    this.text = '';
    this.textX = 0;
    this.opacity = 0;
    this.bgJSS = null;
    this.avatarJSS = null;
    this.age = 0;
    this.tweenOpacity = new TweenNumber([0, 0.5, this.duration - 0.5, this.duration], [0, 1, 1, 0]);
    this.textTweenX = new TweenNumber([0, 0.5], [-300, 300]);
    this.avatarTweenX = new TweenNumber([0, 0.5], [600, 0], UT.EASE_OUT_QUAD);
  }

  setBackgroundJSS(backgroundJSS) {
    this.bgJSS = backgroundJSS;
  }

  setAvatarJSS(avatarJSS) {
    this.avatarJSS = avatarJSS;
  }

  setText(text) {
    this.text = text;
  }

  update(ts) {
    this.opacity = this.tweenOpacity.interpolate(this.age);
    this.bgJSS.setOpacity(this.opacity);

    const avatarX = this.avatarTweenX.interpolate(this.age);
    this.avatarJSS.setPosition(avatarX, 0);
    this.avatarJSS.setOpacity(this.opacity);

    this.textX = this.textTweenX.interpolate(this.age);
    this.age += ts / 1000;
  }

  paint() {
    const ctx = gfx2Manager.getContext();
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    this.bgJSS.draw();
    this.avatarJSS.draw();
    ctx.globalAlpha = this.opacity;
    ctx.font = '48px Ninja Naruto';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'orange';
    ctx.fillText(this.text, this.textX, 60, 600);
    ctx.globalAlpha = 1;

    ctx.restore();
  }
}