import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { UT } from '@lib/core/utils';
import { Tween } from '@lib/core/tween';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
import { Gfx2Drawable } from '@lib/gfx2/gfx2_drawable';
// ---------------------------------------------------------------------------------------

export class SpecialAttackComponent extends DNAComponent {
  constructor(name, bgJSS, avatarJSS, duration = 3) {
    super('SpecialAttack');
    this.gfx = new GfxSpecialAttack(bgJSS, avatarJSS, name, duration);
    this.duration = duration;
  }
}

export class SpecialAttackSystem extends DNASystem {
  constructor(gameScreen) {
    super();
    super.addRequiredComponentTypename('SpecialAttack');
    this.gameScreen = gameScreen;
  }

  async onEntityBind(eid) {
    const uiRoot = document.querySelector('#UI_ROOT');
    uiRoot.style.display = 'none';

    for (const system of dnaManager.getSystems()) {
      if (system != this) {
        system.pause();
      }
    }

    const specialAttack = dnaManager.getComponent(eid, SpecialAttackComponent);
    specialAttack.gfx.reset();

    setTimeout(() => this.handleTimeout(eid), specialAttack.duration * 1000);
  }

  onEntityUpdate(ts, eid) {
    const specialAttack = dnaManager.getComponent(eid, SpecialAttackComponent);
    specialAttack.gfx.update(ts);
  }

  onEntityDraw(eid) {
    const specialAttack = dnaManager.getComponent(eid, SpecialAttackComponent);
    specialAttack.gfx.draw();
  }

  handleTimeout(eid) {
    const uiRoot = document.querySelector('#UI_ROOT');
    uiRoot.style.display = 'block';

    for (const system of dnaManager.getSystems()) {
      if (system != this) {
        system.resume();
      }
    }

    dnaManager.removeComponent(eid, SpecialAttackComponent);
  }
}

class GfxSpecialAttack extends Gfx2Drawable {
  constructor(bgJSS, avatarJSS, text, duration) {
    super();
    this.bgJSS = bgJSS;
    this.avatarJSS = avatarJSS;
    this.text = text;
    this.duration = duration;
    this.textX = 0;
    this.opacity = 0;
    this.age = 0;
    this.tweenOpacity = new Tween([0, 0.5, this.duration - 0.5, this.duration], [0, 1, 1, 0]);
    this.textTweenX = new Tween([0, 0.5], [-300, 300]);
    this.avatarTweenX = new Tween([0, 0.5], [600, 0], UT.EASE_OUT_QUAD);
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

  reset() {
    this.textX = 0;
    this.opacity = 0;
    this.age = 0;
  }
}