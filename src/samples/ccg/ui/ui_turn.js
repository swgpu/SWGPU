import { UIWidget } from '../../../lib/ui/ui_widget';
// ---------------------------------------------------------------------------------------

class UITurn extends UIWidget {
  constructor() {
    super({
      className: 'UITurn'
    });

    this.duel = null;
  }

  update() {
    this.node.innerHTML = '';

    if (this.duel && this.duel.getCurrentTurn()) {
      let currentTurn = this.duel.getCurrentTurn();
      for (let phase of currentTurn.getPhases()) {
        this.node.innerHTML += `<div class="UITurn-phase ${currentTurn.getCurrentPhase() == phase ? 'u-active' : ''}">${phase.getName()}</div>`;
      }
    }
  }

  setDuel(duel) {
    this.duel = duel ? duel : null;
  }
}

export { UITurn };