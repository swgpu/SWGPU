import { dnaManager } from '../../../lib/dna/dna_manager';
import { uiManager } from '../../../lib/ui/ui_manager';
import { DNASystem } from '../../../lib/dna/dna_system';
// ---------------------------------------------------------------------------------------
import { Config } from '../config';
import { UIHealthBar } from '../ui/ui_health_bar';
import { MAX_HEALTH } from '../enums';
// ---------------------------------------------------------------------------------------

export class UISystem extends DNASystem {
  constructor(characters) {
    super();
    super.addRequiredComponentTypename('Damage');
    super.addRequiredComponentTypename('Fighter');

    this.healthBar1 = new UIHealthBar();
    uiManager.addWidget(this.healthBar1, 'position: absolute; left: 0;');
    this.healthBar1.setName('Player 1');
    this.healthBar1.setPicture(Config.PATH_CHARS + characters[0] + '/avatar.jpg');
    this.healthBar1.setHealth(MAX_HEALTH);

    this.healthBar2 = new UIHealthBar();
    uiManager.addWidget(this.healthBar2, 'position: absolute; right: 0; flex-direction: row-reverse;');
    this.healthBar2.setName('Player 2');
    this.healthBar2.setPicture(Config.PATH_CHARS + characters[1] +  '/avatar.jpg');
    this.healthBar2.setHealth(MAX_HEALTH);
  }

  onEntityBind(entity) {
    const dmg = dnaManager.getComponent(entity, 'Damage');
    const fighter = dnaManager.getComponent(entity, 'Fighter');

    if (fighter.id == 1) {
      this.healthBar1.setHealth(fighter.health - dmg.damageHP);
    }
    else if (fighter.id == 2) {
      this.healthBar2.setHealth(fighter.health - dmg.damageHP);
    }
  }
}