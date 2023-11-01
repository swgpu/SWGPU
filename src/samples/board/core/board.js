import { UT } from '../../../lib/core/utils';
import { COLOR } from './enums';
import { Pawn } from './piece';
import { Tile } from './tile';

class Node {
  constructor() {
    this.coord = [];
    this.parent = null;
    this.children = [];
  }
}

class Board {
  constructor() {
    this.rows = 10;
    this.cols = 10;
    this.tiles = [];
    this.mustCapture = true;

    for (let y = 0; y < this.rows; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < this.cols; x++) {
        if (y < 4 && (x + y) % 2) {
          this.tiles[y][x] = new Tile(new Pawn(COLOR.BLACK));
        }
        else if (y > 5 && (x + y) % 2) {
          this.tiles[y][x] = new Tile(new Pawn(COLOR.WHITE));
        }
        else {
          this.tiles[y][x] = new Tile();
        }
      }
    }
  }

  clone() {
    let board = new Board();
    board.rows = this.rows;
    board.cols = this.cols;

    for (let y = 0; y < this.rows; y++) {
      board.tiles[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board.tiles[y][x] = this.tiles[y][x].clone();
      }
    }

    board.mustCapture = this.mustCapture;
    return board;
  }

  getRows() {
    return this.rows;
  }

  getCols() {
    return this.cols;
  }

  getTile(coord) {
    return this.tiles[coord[1]][coord[0]];
  }

  getPiece(coord) {
    return this.tiles[coord[1]][coord[0]].getPiece();
  }

  isValidCoord(coord) {
    return coord[0] < this.cols && coord[0] >= 0 && coord[1] < this.rows && coord[1] >= 0;
  }

  getNumPieces(color = null, type = null) {
    let numPieces = 0;
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let piece = this.tiles[y][x].getPiece();
        if (!piece) {
          continue;
        }

        if ((color == null || color == piece.getColor()) && (type == null || type == piece.getType())) {
          numPieces++;
        }
      }
    }

    return numPieces;
  }

  getWinner() {
    let numPiecesBlack = this.getNumPieces(COLOR.BLACK);
    let numPiecesWhite = this.getNumPieces(COLOR.WHITE);
    if (numPiecesBlack != 0 && numPiecesWhite != 0) {
      return null;
    }

    return numPiecesBlack == 0 ? COLOR.WHITE : COLOR.BLACK;
  }

  getPaths(coord) {
    let leafs = [];
    let paths = [];
    let root = new Node();
    root.coord = [coord[0], coord[1]];
    GENERATE_PIECE_MOVING_TREE(this, root, coord, leafs);

    for (let leaf of leafs) {
      let moves = [];
      let node = leaf;

      while (node) {
        moves.unshift(node.coord);
        node = node.parent;
      }

      paths.push(moves);
    }

    return paths;
  }

  findPossiblePoints(coord, onlyChainable = false) {
    let possiblePoints = [];
    let piece = this.tiles[coord[1]][coord[0]].getPiece();
    if (!piece) {
      return [];
    }

    for (let move of piece.getMoves()) {
      if (onlyChainable && !move.isChainable()) {
        continue;
      }

      let numCapture = 0;
      let lastEncounterPiece = null;

      for (let vector of move.getPath()) {
        let x = coord[0] + vector[0];
        let y = coord[1] + vector[1];
        if (!this.isValidCoord([x, y])) {
          break;
        }

        let encounterPiece = this.tiles[y][x].getPiece();
        let encounterElement = this.tiles[y][x].getElement();

        let isBlockedByElement = encounterElement && encounterElement != piece.getElement();
        let isBlockedByCollate = encounterPiece && encounterPiece.getColor() != piece.getColor() && lastEncounterPiece && lastEncounterPiece.getColor() != piece.getColor() && !move.isCollateCapturable();
        let isBlockedByAlly = encounterPiece && encounterPiece.getColor() == piece.getColor();
        if (isBlockedByElement || isBlockedByCollate || isBlockedByAlly) {
          break;
        }

        if (encounterPiece && encounterPiece.getColor() != piece.getColor()) {
          numCapture++;
        }

        if (!encounterPiece && move.getNumCapture() == numCapture) {
          possiblePoints.push({ x, y, mustCapture: move.isForceCapture() });
        }

        lastEncounterPiece = encounterPiece;
      }
    }

    let mustCapture = possiblePoints.find(p => p.mustCapture) ? true : false;
    return possiblePoints.filter(p => mustCapture == p.mustCapture);
  }

  findMovables(color) {
    let mustCaptureCoords = [];
    let otherCoords = [];

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let piece = this.tiles[y][x].getPiece();
        if (!piece) {
          continue;
        }

        if (piece.getColor() != color) {
          continue;
        }

        let points = this.findPossiblePoints([x, y]);
        if (points.length == 0) {
          continue;
        }

        if (points.find(p => p.mustCapture)) {
          mustCaptureCoords.push([x, y]);
        }
        else {
          otherCoords.push([x, y]);
        }
      }
    }

    if (this.mustCapture && mustCaptureCoords.length > 0) {
      return mustCaptureCoords;
    }

    return [...otherCoords, ...mustCaptureCoords];
  }

  move(coordFrom, coordTo) {
    let numEats = 0;
    let tileFrom = this.getTile(coordFrom);
    let tileTo = this.getTile(coordTo);
    let piece = tileFrom.getPiece();
    let pieceMoves = piece.getMoves();
    tileFrom.setPiece(null);
    tileTo.setPiece(piece);

    let move = pieceMoves.find(m => m.hasVector(UT.VEC2_SUBSTRACT(coordTo, coordFrom)));

    for (let vector of move.getPath()) {
      let coord = UT.VEC2_ADD(coordFrom, vector);
      if (UT.VEC2_ISEQUAL(coord, coordTo)) {
        break;
      }

      let encounterTile = this.getTile(coord);
      let encounterPiece = encounterTile.getPiece();

      if (encounterPiece && encounterPiece.getColor() != piece.getColor()) {
        numEats++;
        encounterTile.setPiece(null);
      }
    }

    return numEats;
  }
}

export { Board };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function GENERATE_PIECE_MOVING_TREE(board, node, coord, leafs, onlyChainable = false) {
  let possiblePoints = board.findPossiblePoints(coord, onlyChainable);
  if (possiblePoints.length == 0) {
    return leafs.push(node);
  }

  for (let end of possiblePoints) {
    let copyBoard = board.clone();
    let numEats = copyBoard.move(coord, [end.x, end.y]);
    let child = new Node();
    child.coord = [end.x, end.y];
    child.parent = node;
    node.children.push(child);

    if (numEats == 0) {
      leafs.push(child);
    }
    else {
      GENERATE_PIECE_MOVING_TREE(copyBoard, child, [end.x, end.y], leafs, true);
    }
  }

  return node;
}