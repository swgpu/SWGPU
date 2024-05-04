import { eventManager } from '../../../lib/core/event_manager';
import { UIWidget } from '../../../lib/ui/ui_widget';
// ---------------------------------------------------------------------------------------

class UIBattleStatus extends UIWidget {
  constructor() {
    super({
      className: 'UIBattleStatus',
      template: `
      <div class="UIBattleStatus-numTurns">
        <div class="UIBattleStatus-numTurns-label">Turn: </div>
        <div class="UIBattleStatus-numTurns-value js-num-turns-value"></div>
      </div>
      <div class="UIBattleStatus-pictures js-pictures">
        <img class="UIBattleStatus-pictures-item js-p0" src=""/>
        <img class="UIBattleStatus-pictures-item js-p1" src=""/>
        <img class="UIBattleStatus-pictures-item js-p2" src=""/>
        <img class="UIBattleStatus-pictures-item js-p3" src=""/>
      </div>`
    });

    this.battle = null;
  }

  update(ts) {
    if (this.battle) {
      this.node.querySelector('.js-num-turns-value').textContent = this.battle.getNumTurns();
    }
    else {
      this.node.querySelector('.js-num-turns-value').textContent = '0';
      this.node.querySelector('.js-pictures').innerHTML = '';
    }
  }

  setBattle(battle) {
    if (battle) {
      eventManager.subscribe(battle, 'E_CHAR_READY', this, this.handleCharReady);
      this.battle = battle;
    }
    else {
      eventManager.unsubscribe(this.battle, 'E_NEW_TURN', this);
      this.battle = null;
    }
  }

  handleCharReady() {
    this.node.querySelector('.js-pictures').innerHTML = '';
    for (const character of this.battle.getCharacterQueue()) {
      this.node.querySelector('.js-pictures').innerHTML += `<img class="UIBattleStatus-pictures-item" src="${character.getPictureFile()}"/>`;
    }
  }
}

export { UIBattleStatus };