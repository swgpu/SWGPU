class Tile {
  constructor(piece = null, element = null) {
    this.piece = piece;
    this.element = element;
  }

  clone() {
    let piece = this.piece ? this.piece.clone() : null;
    return new Tile(piece, this.element);
  }

  getPiece() {
    return this.piece;
  }

  setPiece(piece) {
    this.piece = piece;
  }

  getElement() {
    return this.element;
  }

  setElement(element) {
    this.element = element;
  }
}

export { Tile };