import { dnaManager } from '@lib/dna/dna_manager';
import { uiManager } from '@lib/ui/ui_manager';
import { DNASystem } from '@lib/dna/dna_system';
// ---------------------------------------------------------------------------------------
import { UIHealthBar } from '../ui/ui_health_bar';
import { MAX_HEALTH } from '../enums';
import { DamageComponent } from './damage';
import { FighterComponent } from './fighter';
// ---------------------------------------------------------------------------------------

export class UISystem extends DNASystem {
  constructor(characters) {
    super();
    super.addRequiredComponentTypename('Damage');
    super.addRequiredComponentTypename('Fighter');

    this.healthBar1 = new UIHealthBar();
    uiManager.addWidget(this.healthBar1, 'position: absolute; left: 0;');
    this.healthBar1.setName('Player 1');
    this.healthBar1.setPicture('templates/fight/chars/' + characters[0] + '/avatar.jpg');
    this.healthBar1.setHealth(MAX_HEALTH);

    this.healthBar2 = new UIHealthBar();
    uiManager.addWidget(this.healthBar2, 'position: absolute; right: 0; flex-direction: row-reverse;');
    this.healthBar2.setName('Player 2');
    this.healthBar2.setPicture('templates/fight/chars/' + characters[1] +  '/avatar.jpg');
    this.healthBar2.setHealth(MAX_HEALTH);
  }

  onEntityBind(eid) {
    const dmg = dnaManager.getComponent(eid, DamageComponent);
    const fighter = dnaManager.getComponent(eid, FighterComponent);

    if (fighter.id == 1) {
      this.healthBar1.setHealth(fighter.health - dmg.damageHP);
    }
    else if (fighter.id == 2) {
      this.healthBar2.setHealth(fighter.health - dmg.damageHP);
    }
  }
}