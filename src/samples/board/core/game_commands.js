class Command {
  constructor(game, coordFrom) {
    this.game = game;
    this.coordFrom = coordFrom;
  }

  async exec() {
    return true;
  }

  isConditionCheck() {
    return true;
  }
}

class MoveCommand extends Command {
  constructor(game, coordFrom) {
    super(game, coordFrom);
    this.board = this.game.getBoard();
  }

  async exec() {
    let points = this.board.findPossiblePoints(this.coordFrom);
    let loc0 = await this.game.operationRequestTileLocation(false, (x, y) => {
      return points.find(p => p.x == x && p.y == y);
    });

    if (loc0.canceled) {
      await this.game.operationRequestTileAction();
      return false;
    }

    await this.game.operationMove(this.coordFrom, [loc0.x, loc0.y]);
    this.game.operationNewTurn();
  }

  isConditionCheck() {
    let currentPlayer = this.game.getCurrentPlayer();
    let movableCoords = this.board.findMovables(currentPlayer.getColor());
    return movableCoords.find(c => c[0] == this.coordFrom[0] && c[1] == this.coordFrom[1]);
  }
}

class PowerupCommand extends Command {
  constructor(game, coordFrom) {
    super(game, coordFrom);
    this.board = this.game.getBoard();
  }

  async exec() {
    await this.game.operationPowerup(this.coordFrom);
  }

  isConditionCheck() {
    let piece = this.board.getPiece(this.coordFrom);
    let currentPlayer = this.game.getCurrentPlayer();

    if (!piece) {
      return false;
    }

    if (piece.getColor() != currentPlayer.getColor()) {
      return false;
    }

    if (!piece.getPowerupId()) {
      return false;
    }

    return true;
  }
}

class CommandFactory {
  static create(name, game, coordFrom) {
    if (name == 'MOVE') {
      return new MoveCommand(game, coordFrom);
    }
    else if (name == 'POWERUP') {
      return new PowerupCommand(game, coordFrom);
    }
  }
}

export { CommandFactory };