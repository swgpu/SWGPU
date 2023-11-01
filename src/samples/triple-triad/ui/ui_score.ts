import { eventManager } from '../../../lib/core/event_manager';
import { UIWidget } from '../../../lib/ui/ui_widget';
// ---------------------------------------------------------------------------------------
import { GameState } from '../core/game_state';

class UIScore extends UIWidget {
  gameState: GameState;

  constructor(gameState: GameState) {
    super({
      className: 'UIScore',
      template: `
      <div class="UIScore-points-p1 js-p1">8</div>
      <div class="UIScore-points-p2 js-p2">8</div>`
    });

    this.gameState = gameState;
    eventManager.subscribe(this.gameState, 'E_BATTLE_PERFORMED', this, this.handleBattlePerformed);
  }

  handleBattlePerformed(data: any): void {
    this.node.querySelector<HTMLElement>('.js-p1')!.textContent = data.score.toString();
    this.node.querySelector<HTMLElement>('.js-p2')!.textContent = (16 - data.score).toString();
  }
}

export { UIScore };