import { eventManager } from '../../../lib/core/event_manager';
import { Card } from './card';
import { Direction } from './enums';
import { NormalEffect } from './normal_effect';
import { IdentiqueEffect } from './identique_effect';
import { PlusEffect } from './plus_effect';
import { EffectAbstract } from './effect_abstract';

type Board = Array<Array<Card | null>>;
type Wall = Array<Array<boolean>>;

const PLAYER_CARDS_NAME = [["Alice", "Patchouli", "Cirno", "Reimu", "Sakuya", "Remilia", "Meiling", "Reisen"], ["Mokou", "Iku", "Kisume", "Kogasa", "Komachi", "Marisa", "Konngara", "Momiji"]];
const SIZE_HAND = 8;
const SIZE_BOARD = 4;

//
// @Events:
// E_BOARD_CARD_PLACED
// E_HAND_CARD_ADDED
// E_HAND_CARD_REMOVED
// E_BATTLE_PERFORMED
//
class GameState {
  currentPlayerNum: number;
  hands: Array<Array<Card>>;
  board: Board;
  hWalls: Array<Array<boolean>>;
  vWalls: Array<Array<boolean>>;
  score: number;
  standardEffects: Array<EffectAbstract>;

  constructor() {
    this.currentPlayerNum = 0;
    this.hands = [new Array(), new Array()];
    this.board = CREATE_BOARD();
    this.hWalls = CREATE_HORIZONTAL_WALL();
    this.vWalls = CREATE_VERTICAL_WALL();
    this.score = 8;
    this.standardEffects = [new PlusEffect(), new IdentiqueEffect(), new NormalEffect()];
  }

  startup(): void {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < SIZE_HAND; j++) {
        const card = new Card();
        card.setPoints(Math.floor(Math.random() * 10 + 1), Math.floor(Math.random() * 10 + 1), Math.floor(Math.random() * 10 + 1), Math.floor(Math.random() * 10 + 1));
        card.setName(PLAYER_CARDS_NAME[i][j]);
        card.setOwner(i);
        this.addHandCard(i, card);
      }
    }
  }

  restart(): void {
    this.score = 8;
    this.clearBoard();
  }

  getCurrentPlayerNum(): number {
    return this.currentPlayerNum;
  }

  getBoard(): Board {
    return this.board;
  }

  getHWalls(): Array<Array<boolean>> {
    return this.hWalls;
  }

  getVWalls(): Array<Array<boolean>> {
    return this.vWalls;
  }

  getCardFromBoard(pos: vec2): Card | null {
    return this.board[pos[0]][pos[1]];
  }

  getHand(playerNum: number): Array<Card> {
    return this.hands[playerNum];
  }

  getScore(): number {
    return this.score;
  }

  setHandCard(playerNum: number, card: Card, i: number): void {
    this.hands[playerNum][i] = card;
  }

  clearBoard(): void {
    for (let i = 0; i < SIZE_BOARD; i++) {
      for (let j = 0; j < SIZE_BOARD; j++) {
        this.board[i][j] = null;
      }
    }
  }

  placeHandCardOnBoard(playerNum: number, cardNum: number, pos: vec2): void {
    const handCard = this.hands[playerNum][cardNum];
    if (!handCard) {
      throw new Error('GameState::placeHandCardOnBoard(): Card not exist !');
    }

    this.board[pos[0]][pos[1]] = handCard;
    this.removeHandCard(playerNum, cardNum);
    eventManager.emit(this, 'E_BOARD_CARD_PLACED', { card: handCard, playerNum: playerNum, pos: pos });
  }

  addHandCard(playerNum: number, card: Card): void {
    this.hands[playerNum].push(card);
    eventManager.emit(this, 'E_HAND_CARD_ADDED', { playerNum, card });
  }

  removeHandCard(playerNum: number, cardNum: number): void {
    this.hands[playerNum].splice(cardNum, 1);
    eventManager.emit(this, 'E_HAND_CARD_REMOVED', { playerNum, cardNum });
  }

  getNeighbourCardFromBoard(pos: vec2, dir: Direction): Card | null {
    let neighbourPos = this.getCoordinateNeighbourCardFromBoard(pos, dir);
    if (neighbourPos == null) {
      return null;
    }

    return this.board[neighbourPos[0]][neighbourPos[1]];
  }

  getCoordinateNeighbourCardFromBoard(pos: vec2, dir: Direction): vec2 | null {
    const i = pos[0];
    const j = pos[1];
    const neighbour: vec2 = [i, j];

    switch (dir) {
      case Direction.W:
        if (this.vWalls[i][j]) return null;
        else neighbour[1] = (j == 0) ? SIZE_BOARD - 1 : j - 1;
        break;
      case Direction.N:
        if (this.hWalls[i][j]) return null;
        else neighbour[0] = (i == 0) ? SIZE_BOARD - 1 : i - 1;
        break;
      case Direction.E:
        if (this.vWalls[i][j]) return null;
        else neighbour[1] = (j == SIZE_BOARD - 1) ? 0 : j + 1;
        break;
      case Direction.S:
        if (this.hWalls[i][j]) return null;
        else neighbour[0] = (i == SIZE_BOARD - 1) ? 0 : i + 1;
        break;
    }

    return neighbour;
  }

  performBattle(pos: vec2): void {
    for (let effect of this.standardEffects) {
      this.score += effect.apply(this, pos);
    }

    // @todo: check victory here & emit event !
    eventManager.emit(this, 'E_BATTLE_PERFORMED', { score: this.score });
  }

  changePlayer(): void {
    this.currentPlayerNum = (this.currentPlayerNum + 1) % 2;
  }
}

export { GameState };
export { SIZE_HAND, SIZE_BOARD };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function CREATE_BOARD(): Board {
  const board = new Array(SIZE_BOARD);
  for (let i = 0; i < SIZE_BOARD; i++) {
    board[i] = new Array(SIZE_BOARD);
    for (let j = 0; j < SIZE_BOARD; j++) {
      board[i][j] = null;
    }
  }

  return board;
}

function CREATE_HORIZONTAL_WALL(): Wall {
  const hWalls = new Array(SIZE_BOARD);
  for (let i = 0; i < SIZE_BOARD + 1; i++) {
    hWalls[i] = new Array(SIZE_BOARD);
    for (let j = 0; j < SIZE_BOARD; j++) {
      hWalls[i][j] = false;
    }
  }

  hWalls[0][0] = true;
  hWalls[0][SIZE_BOARD - 1] = true;
  return hWalls;
}

function CREATE_VERTICAL_WALL(): Wall {
  const vWalls = new Array(SIZE_BOARD);
  for (let i = 0; i < SIZE_BOARD; i++) {
    vWalls[i] = new Array(SIZE_BOARD);
    for (let j = 0; j < SIZE_BOARD; j++) {
      vWalls[i][j] = false;
    }
  }

  vWalls[0][0] = true;
  vWalls[SIZE_BOARD - 1][0] = true;
  return vWalls;
}
