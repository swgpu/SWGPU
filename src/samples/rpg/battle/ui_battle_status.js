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
      <div class="UIBattleStatus-pictures js-pictures"></div>`
    });

    this.battle = null;
  }

  update(ts) {
    if (this.battle) {
      this.node.querySelector('.js-num-turns-value').textContent = this.battle.getNumTurns();
      this.node.querySelector('.js-pictures').innerHTML = '';
      for (let character of this.battle.getCharacterQueue()) {
        this.node.querySelector('.js-pictures').innerHTML += `<img class="UIBattleStatus-pictures-item" src="${character.getPictureFile()}"></img>`;
      }
    }
    else {
      this.node.querySelector('.js-num-turns-value').textContent = '0';
      this.node.querySelector('.js-pictures').innerHTML = '';
    }
  }

  setBattle(battle) {
    this.battle = battle ? battle : null;
  }
}

export { UIBattleStatus };