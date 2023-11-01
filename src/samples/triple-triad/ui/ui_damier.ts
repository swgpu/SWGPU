import { eventManager } from '../../../lib/core/event_manager';
import { UIWidget } from '../../../lib/ui/ui_widget';
// ---------------------------------------------------------------------------------------
import { GameState, SIZE_BOARD } from '../core/game_state';
import { UIWall, WallPosition } from './ui_wall';
import { UICard } from './ui_card';

//
// @Events:
// E_CELL_SELECTED
// E_CANCEL
//
class UIDamier extends UIWidget {
  gameState: GameState;
  uiCards: Array<Array<UICard | null>>;
  uiVWalls: Array<Array<UIWall | null>>;
  uiHWalls: Array<Array<UIWall | null>>;
  focusedCellPos: vec2;

  constructor(gameState: GameState) {
    super({
      className: 'UIDamier',
      template: `
      <div class="UIDamier-cell js-0-0"></div>
      <div class="UIDamier-cell js-0-1"></div>
      <div class="UIDamier-cell js-0-2"></div>
      <div class="UIDamier-cell js-0-3"></div>
      <div class="UIDamier-cell js-1-0"></div>
      <div class="UIDamier-cell js-1-1"></div>
      <div class="UIDamier-cell js-1-2"></div>
      <div class="UIDamier-cell js-1-3"></div>
      <div class="UIDamier-cell js-2-0"></div>
      <div class="UIDamier-cell js-2-1"></div>
      <div class="UIDamier-cell js-2-2"></div>
      <div class="UIDamier-cell js-2-3"></div>
      <div class="UIDamier-cell js-3-0"></div>
      <div class="UIDamier-cell js-3-1"></div>
      <div class="UIDamier-cell js-3-2"></div>
      <div class="UIDamier-cell js-3-3"></div>`
    });

    this.gameState = gameState;
    this.uiCards = this.$createCards();
    this.uiVWalls = this.$createVWalls(this.gameState.getVWalls());
    this.uiHWalls = this.$createHWalls(this.gameState.getHWalls());
    this.focusedCellPos = [0, 0];

    eventManager.subscribe(gameState, 'E_BOARD_CARD_PLACED', this, this.handleBoardCardPlaced);
  }

  delete(): void {
    for (let i = 0; i < SIZE_BOARD; i++) {
      for (let j = 0; j < SIZE_BOARD; j++) {
        this.uiCards[i][j]?.delete();
      }
    }

    super.delete();
  }

  focusFirstEmptyCell(): void {
    for (let i = 0; i < SIZE_BOARD; i++) {
      for (let j = 0; j < SIZE_BOARD; j++) {
        if (this.uiCards[i][j] == null) {
          this.focusCell([i, j]);
          return;
        }
      }
    }
  }

  focusCell(pos: vec2): void {
    const cell = this.node.querySelector<HTMLElement>(`.js-${pos[0]}-${pos[1]}`);
    if (!cell) {
      throw new Error('UIDamier::focusCell(): Cell not found !');
    }

    const previousCell = this.node.querySelector<HTMLElement>(`.js-${this.focusedCellPos[0]}-${this.focusedCellPos[1]}`)!;
    previousCell.classList.remove('u-focused');

    cell.classList.add('u-focused');
    this.focusedCellPos[0] = pos[0];
    this.focusedCellPos[1] = pos[1];
  }

  onAction(actionId: string): void {
    if (actionId == 'UP') {
      let next = (this.focusedCellPos[0] == 0) ? SIZE_BOARD - 1 : this.focusedCellPos[0] - 1;
      this.focusCell([next, this.focusedCellPos[1]]);
    }
    else if (actionId == 'RIGHT') {
      let next = (this.focusedCellPos[1] == SIZE_BOARD - 1) ? 0 : this.focusedCellPos[1] + 1;
      this.focusCell([this.focusedCellPos[0], next]);
    }
    else if (actionId == 'DOWN') {
      let next = (this.focusedCellPos[0] == SIZE_BOARD - 1) ? 0 : this.focusedCellPos[0] + 1;
      this.focusCell([next, this.focusedCellPos[1]]);
    }
    else if (actionId == 'LEFT') {
      let next = (this.focusedCellPos[1] == 0) ? SIZE_BOARD - 1 : this.focusedCellPos[1] - 1;
      this.focusCell([this.focusedCellPos[0], next]);
    }
    else if (actionId == 'OK') {
      const card = this.uiCards[this.focusedCellPos[0]][this.focusedCellPos[1]];
      if (!card) {
        eventManager.emit(this, 'E_CELL_SELECTED', { pos: this.focusedCellPos });
      }
    }
    else if (actionId == 'BACK') {
      eventManager.emit(this, 'E_CANCEL');
    }
  }

  handleBoardCardPlaced(data: any): void {
    const uiCard = new UICard();
    uiCard.setCard(data.card);
    this.uiCards[data.pos[0]][data.pos[1]] = uiCard;

    const cell = this.node.querySelector<HTMLElement>(`.js-${data.pos[0]}-${data.pos[1]}`)!;
    cell.appendChild(uiCard.getNode());
  }

  $createVWalls(vWalls: Array<Array<boolean>>): Array<Array<UIWall>> {
    const uiWalls = new Array<Array<UIWall>>();

    for (let i = 0; i < SIZE_BOARD; i++) {
      uiWalls[i] = [];
      for (let j = 0; j < SIZE_BOARD; j++) {
        if (!vWalls[i][j]) {
          continue;
        }

        const uiWall = new UIWall(WallPosition.VL);
        const cell = this.node.querySelector<HTMLElement>(`.js-${i}-${j}`)!;
        cell.appendChild(uiWall.getNode());
        uiWalls[i][j] = uiWall;

        //si on se trouve sur la première colonne et qu'on est en train de placer un mur vertical
        // on créé un visuel de mur vertical supplémentaire après la derniere colonne
        if (j == 0) {
          const uiWall = new UIWall(WallPosition.VR);
          const cell = this.node.querySelector<HTMLElement>(`.js-${i}-${SIZE_BOARD - 1}`)!;
          cell.appendChild(uiWall.getNode());
          uiWalls[i][j] = uiWall;
        }
      }
    }

    return uiWalls;
  }

  $createHWalls(hWalls: Array<Array<boolean>>): Array<Array<UIWall>> {
    const uiWalls = new Array<Array<UIWall>>();

    for (let i = 0; i < SIZE_BOARD; i++) {
      uiWalls[i] = [];
      for (let j = 0; j < SIZE_BOARD; j++) {
        if (!hWalls[i][j]) {
          continue;
        }

        const uiWall = new UIWall(WallPosition.HT);
        const cell = this.node.querySelector<HTMLElement>(`.js-${i}-${j}`)!;
        cell.appendChild(uiWall.getNode());
        uiWalls[i][j] = uiWall;

        //si on se trouve sur la première ligne et qu'on est en train de placer un mur horizontal
        // on créé un visuel de mur horizontal supplémentaire après la derniere ligne
        if (i == 0) {
          const uiWall = new UIWall(WallPosition.HB);
          const cell = this.node.querySelector<HTMLElement>(`.js-${SIZE_BOARD - 1}-${j}`)!;
          cell.appendChild(uiWall.getNode());
          uiWalls[i][j] = uiWall;
        }
      }
    }

    return uiWalls;
  }

  $createCards(): Array<Array<UICard | null>> {
    const uiCards = new Array<Array<UICard | null>>();
    for (let i = 0; i < SIZE_BOARD; i++) {
      uiCards[i] = [];
      for (let j = 0; j < SIZE_BOARD; j++) {
        uiCards[i][j] = null;
      }
    }
  
    return uiCards;
  }
}

export { UIDamier };