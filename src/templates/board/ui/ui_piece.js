import { UIWidget } from '@lib/ui/ui_widget';

let PIECE_TO_BG = {
  'BLACK_PAWN': './templates/checker/black_pawn.png',
  'BLACK_QUEEN': './templates/checker/black_queen.png',
  'WHITE_PAWN': './templates/checker/white_pawn.png',
  'WHITE_QUEEN': './templates/checker/white_queen.png'
};

class UIPiece extends UIWidget {
  constructor() {
    super({
      className: 'UIPiece',
      template: `
      <div class="UIPiece-bg js-bg"></div>`
    });

    this.piece = null;
  }

  update() {
    if (this.piece) {
      this.node.querySelector('.js-bg').style.backgroundImage = `url(${PIECE_TO_BG[this.piece.getColor() + '_' + this.piece.getType()]})`;
    }
    else {
      this.node.querySelector('.js-bg').style.backgroundImage = '';
    }
  }

  setPiece(piece) {
    this.piece = piece ? piece : null;
  }
}

export { UIPiece };