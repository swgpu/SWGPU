import { eventManager } from '../../../lib/core/event_manager';
import { UIWidget } from '../../../lib/ui/ui_widget';
// ---------------------------------------------------------------------------------------
import { UICard } from '../ui/ui_card';
import { GameState } from '../core/game_state';

//
// @Events:
// E_CARD_SELECTED
//
class UIHands extends UIWidget {
  gameState: GameState;
  uiCards: Array<Array<UICard>>;
  focusedCardNums: vec2;
  focusedPlayerNum: number;

  constructor(gameState: GameState) {
    super({
      className: 'UIHands',
      template: `
      <div class="UIHands-left js-hand-left"></div>
      <div class="UIHands-right js-hand-right"></div>`
    });

    this.gameState = gameState;
    this.uiCards = [[], []];
    this.focusedCardNums = [0, 0];
    this.focusedPlayerNum = 0;

    eventManager.subscribe(gameState, 'E_HAND_CARD_ADDED', this, this.handleHandCardAdded);
    eventManager.subscribe(gameState, 'E_HAND_CARD_REMOVED', this, this.handleHandCardRemoved);
  }

  delete(): void {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < this.uiCards[i].length; j++) {
        this.uiCards[i][j].delete();
      }
    }

    super.delete();
  }

  getFocusedCardNum(playerNum: number): number {
    return this.focusedCardNums[playerNum];
  }

  focusPlayer(playerNum: number): void {
    const card = this.uiCards[playerNum][this.focusedCardNums[playerNum]];
    if (!card) {
      throw new Error('UIHands::focusPlayer(): card not found !');
    }

    for (let i = 0; i < 2; i++) {
      for (const uiCard of this.uiCards[i]) {
        uiCard.unfocus();
      }
    }

    card.focus();
    this.focusedPlayerNum = playerNum;
  }

  focusCard(cardNum: number): void {
    const card = this.uiCards[this.focusedPlayerNum][cardNum];
    if (!card) {
      throw new Error('UIHands::focusCard(): card not found !');
    }

    const previousCard = this.uiCards[this.focusedPlayerNum][this.focusedCardNums[this.focusedPlayerNum]];
    if (previousCard) {
      previousCard.unfocus();
    }

    card.focus();
    this.focusedCardNums[this.focusedPlayerNum] = cardNum;
  }

  selectCard(): void {
    const card = this.uiCards[this.focusedPlayerNum][this.focusedCardNums[this.focusedPlayerNum]];
    if (!card) {
      throw new Error('UIHands::selectCard(): card not found !');
    }

    eventManager.emit(this, 'E_CARD_SELECTED', { playerNum: this.focusedPlayerNum, cardNum: this.focusedCardNums[this.focusedPlayerNum] });
  }

  onAction(actionId: string): void {
    const focusedCardNum = this.focusedCardNums[this.focusedPlayerNum];
    const nbPlayerCards = this.uiCards[this.focusedPlayerNum].length;

    if (actionId == 'UP' || actionId == 'LEFT') {
      this.focusCard(focusedCardNum == 0 ? nbPlayerCards - 1 : focusedCardNum - 1);
    }
    else if (actionId == 'DOWN' || actionId == 'RIGHT') {
      this.focusCard(focusedCardNum == nbPlayerCards - 1 ? 0 : focusedCardNum + 1);
    }
    else if (actionId == 'OK') {
      this.selectCard();
    }
  }

  handleHandCardAdded(data: any): void {
    const uiCard = new UICard();
    uiCard.setCard(data.card);

    if (data.playerNum == 0) {
      this.uiCards[0].push(uiCard);
      this.node.querySelector<HTMLElement>('.js-hand-left')!.appendChild(uiCard.getNode());
    }
    else {
      this.uiCards[1].push(uiCard);
      this.node.querySelector<HTMLElement>('.js-hand-right')!.appendChild(uiCard.getNode());
    }
  }

  handleHandCardRemoved(data: any): void {
    this.uiCards[data.playerNum][data.cardNum].delete();
    this.uiCards[data.playerNum].splice(data.cardNum, 1);
  }
}

export { UIHands };