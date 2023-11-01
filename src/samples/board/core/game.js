import { eventManager } from '../../../lib/core/event_manager';
import { COLOR, PIECE_TYPE } from './enums';
import { Queen } from './piece';
import { Board } from './board';
import { PowerupFactory } from './powerup';
import { AIPlayer, HumanPlayer } from './player';

class Game {
  constructor(player1, player2) {
    this.board = new Board();
    this.players = [player1, player2];
    this.currentPlayer = player1;

    player1.setColor(COLOR.WHITE);
    player2.setColor(COLOR.BLACK);
  }

  getBoard() {
    return this.board;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  startup() {
    this.operationNewTurn(this.currentPlayer);
  }

  async operationNewTurn(player) {
    if (this.board.getWinner()) {
      eventManager.emit(this, 'E_END');
      return;
    }

    let queenY = this.currentPlayer.getColor() == COLOR.BLACK ? this.board.getRows() - 1 : 0;

    for (let x = 0; x < this.board.getCols(); x++) {
      let tile = this.board.getTile([x, queenY]);
      let piece = tile.getPiece();
      if (piece && piece.getColor() == this.currentPlayer.getColor() && piece.getType() == PIECE_TYPE.PAWN) {
        tile.setPiece(new Queen(piece.getColor()));
      }
    }

    if (player) {
      this.currentPlayer = player;
    }
    else {
      this.currentPlayer = this.currentPlayer == this.players[0] ? this.players[1] : this.players[0];
    }

    if (this.currentPlayer instanceof HumanPlayer) {
      await this.currentPlayer.play(this);
    }
    else if (this.currentPlayer instanceof AIPlayer) {
      this.currentPlayer.play(this);
    }
  }

  async operationRequestTileAction() {
    let response = {};
    response.x = 0;
    response.y = 0;
    response.action = '';

    await eventManager.emit(this, 'E_REQUEST_TILE_ACTION', {
      response: response
    });

    return response;
  }

  async operationRequestTileLocation(required = false, predicateTile = () => true) {
    let response = {};
    response.x = 0;
    response.y = 0;
    response.canceled = false;

    await eventManager.emit(this, 'E_REQUEST_TILE_LOCATION', {
      required: required,
      predicateTile: predicateTile,
      response: response
    });

    return response;
  }

  operationKill(coord) {
    let tile = this.board.getTile(coord);
    tile.setPiece(null);
  }

  async operationPowerup(coord) {
    let piece = this.board.getPiece(coord);
    let powerup = PowerupFactory.create(this, piece.getPowerupId());
    await powerup.onActive();
    piece.setPowerupId('');
  }

  async operationMove(coordFrom, coordTo) {
    let numEats = this.board.move(coordFrom, coordTo);
    if (numEats == 0) {
      return;
    }

    let possiblePoints = this.board.findPossiblePoints(coordTo, true);
    if (possiblePoints.length > 0) {
      let response = await this.operationRequestTileLocation(true, (x, y) => {
        return possiblePoints.find(p => p.x == x && p.y == y);
      });

      await this.operationMove(coordTo, [response.x, response.y]);
      return;
    }
  }
}

export { Game };