import { eventManager } from '../../lib/core/event_manager';
import { uiManager } from '../../lib/ui/ui_manager';
import { coreManager, SizeMode } from '../../lib/core/core_manager';
import { Screen } from '../../lib/screen/screen';
// ---------------------------------------------------------------------------------------
import { GameState } from './core/game_state';
import { UIHands } from './ui/ui_hands';
import { UIBackground } from './ui/ui_background';
import { UIDamier } from './ui/ui_damier';
import { UIScore } from './ui/ui_score';

class TripleTriadScreen extends Screen {
  gameState: GameState;
  uiBackground: UIBackground;
  uiScore: UIScore;
  uiHands: UIHands;
  uiDamier: UIDamier;

  constructor() {
    super();
    this.gameState = new GameState();
    this.uiBackground = new UIBackground();
    this.uiScore = new UIScore(this.gameState);
    this.uiHands = new UIHands(this.gameState);
    this.uiDamier = new UIDamier(this.gameState);
  }

  async onEnter(): Promise<void> {
    coreManager.setSize(600, 600, SizeMode.FIXED);

    uiManager.addWidget(this.uiBackground);
    uiManager.addWidget(this.uiScore);
    uiManager.addWidget(this.uiHands);
    uiManager.addWidget(this.uiDamier);

    this.gameState.startup();

    uiManager.focus(this.uiHands);
    this.uiHands.focusPlayer(this.gameState.getCurrentPlayerNum());

    eventManager.subscribe(this.uiHands, 'E_CARD_SELECTED', this, this.handleHandsCardSelected);
    eventManager.subscribe(this.uiDamier, 'E_CELL_SELECTED', this, this.handleDamierCellSelected);
    eventManager.subscribe(this.uiDamier, 'E_CANCEL', this, this.handleDamierCancel);
  }

  onExit(): void {
    uiManager.removeWidget(this.uiBackground);
    uiManager.removeWidget(this.uiHands);
    uiManager.removeWidget(this.uiScore);
    uiManager.removeWidget(this.uiDamier);
  }

  handleHandsCardSelected(): void {
    this.uiDamier.focusFirstEmptyCell();
    uiManager.focus(this.uiDamier);
  }

  handleDamierCellSelected(data: any): void {
    const selectedHandCardNum = this.uiHands.getFocusedCardNum(this.gameState.getCurrentPlayerNum());
    this.gameState.placeHandCardOnBoard(this.gameState.getCurrentPlayerNum(), selectedHandCardNum, data.pos);
    this.gameState.performBattle(data.pos);
    this.gameState.changePlayer();

    uiManager.focus(this.uiHands);
    this.uiHands.focusCard(0);
    this.uiHands.focusPlayer(this.gameState.getCurrentPlayerNum());
  }

  handleDamierCancel(): void {
    this.uiHands.focusPlayer(this.gameState.getCurrentPlayerNum());
    uiManager.focus(this.uiHands);
  }
}

export { TripleTriadScreen };