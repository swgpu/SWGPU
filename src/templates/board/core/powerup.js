import { POWERUP_ID } from './enums';

class Powerup {
  constructor(game, id = '') {
    this.game = game;
    this.id = id;
  }

  getId() {
    return this.id;
  }

  async onActive() {
    // virtual method called at the activation.
  }
}

class DoubleMovePowerup extends Powerup {
  constructor(game) {
    super(game, POWERUP_ID.DOUBLE_MOVE);
    this.board = this.game.getBoard();
  }

  async onActive() {
    let loc0 = await this.game.operationRequestTileLocation(true, (x, y) => {
      let piece = this.board.getPiece([x, y]);
      return piece && piece.getColor() == this.game.getCurrentPlayer();
    });

    let points = this.board.findPossiblePoints([loc0.x, loc0.y]);
    let loc1 = await this.game.operationRequestTileLocation(false, (x, y) => {
      return points.find(p => p.x == x && p.y == y);
    });

    await this.game.operationMove([loc0.x, loc0.y], [loc1.x, loc1.y]);
    this.game.operationRequestTileAction();
  }
}

class KillPowerup extends Powerup {
  constructor(game) {
    super(game, POWERUP_ID.KILL);
    this.board = this.game.getBoard();
  }

  async onActive() {
    let loc0 = await this.game.operationRequestTileLocation(true, (x, y) => {
      let piece = this.board.getPiece([x, y]);
      return piece && piece.getColor() != this.game.getCurrentPlayer();
    });

    await this.game.operationKill([loc0.x, loc0.y]);
    this.game.operationNewTurn();
  }
}

class PowerupFactory {
  static create(game, id) {
    if (id == POWERUP_ID.DOUBLE_MOVE) {
      return new DoubleMovePowerup(game);
    }
    else if (id == POWERUP_ID.KILL) {
      return new KillPowerup(game);
    }
  }
}

export { PowerupFactory };