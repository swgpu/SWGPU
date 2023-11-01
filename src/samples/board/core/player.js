import { AIMinMaxLeaf, AIMinMaxNode } from '../../../lib/ai/ai_minmax_tree';
import { AIMinMaxSolver } from '../../../lib/ai/ai_minmax_solver';
import { COLOR, PIECE_TYPE } from './enums';

class PlayerAbstract {
  constructor() {
    this.color = COLOR.WHITE;
  }

  setColor(color) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }
}

class HumanPlayer extends PlayerAbstract {
  constructor() {
    super();
  }

  async play(game) {
    return game.operationRequestTileAction();
  }
}

class AIPlayer extends PlayerAbstract {
  constructor() {
    super();
    this.solver = new AIMinMaxSolver();
    this.maxDepth = 3;
  }

  play(game) {
    let board = game.getBoard();
    let tree = new AIMinMaxNode();
    this.generateMinMaxTree(tree, board, this.maxDepth, this.color);

    let bestNode = this.solver.solve(tree);
    let bestPath = bestNode.data.path;

    for (let i = 0; i < bestPath.length - 1; i++) {
      board.move(bestPath[i], bestPath[i + 1]);
    }

    game.operationNewTurn();
  }

  evaluate(board) {
    let winnerColor = board.getWinner();
    if (!winnerColor) {
      let numPawns = board.getNumPieces(this.color, PIECE_TYPE.PAWN);
      let numQueens = board.getNumPieces(this.color, PIECE_TYPE.QUEEN);
      let encounterColor = this.color == COLOR.BLACK ? COLOR.WHITE : COLOR.BLACK;
      let encounterNumPawns = board.getNumPieces(encounterColor, PIECE_TYPE.PAWN);
      let encounterNumQueens = board.getNumPieces(encounterColor, PIECE_TYPE.QUEEN);
      return (numPawns + (numQueens * 3)) - (encounterNumPawns + (encounterNumQueens * 3));
    }

    if (winnerColor == this.color) {
      return +1000 - board.getNumPieces();
    }
    else {
      return -1000 + board.getNumPieces();
    }
  }

  generateMinMaxTree(node, board, depth, color) {
    if (depth == 0) {
      let leaf = new AIMinMaxLeaf(this.evaluate(board));
      return node.addChild(leaf);
    }

    if (board.getWinner()) {
      let leaf = new AIMinMaxLeaf(this.evaluate(board));
      return node.addChild(leaf);
    }

    for (let coord of board.findMovables(color)) {
      for (let path of board.getPaths(coord)) {
        let copyBoard = board.clone();
        for (let i = 0; i < path.length - 1; i++) {
          copyBoard.move(path[i], path[i + 1]);
        }

        let child = new AIMinMaxNode();
        child.setData({ path });
        node.addChild(child);

        let nextColor = color == COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE;
        this.generateMinMaxTree(child, copyBoard, depth - 1, nextColor);
      }
    }

    return node;
  }
}

export { HumanPlayer, AIPlayer };