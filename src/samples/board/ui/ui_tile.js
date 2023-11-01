import { eventManager } from '../../../lib/core/event_manager';
import { UIWidget } from '../../../lib/ui/ui_widget';
import { UIPiece } from './ui_piece';

let ELEMENT_TO_BG = {
  'DARK': './assets/textures/tile_dark.png',
  'LIGHT': './assets/textures/tile_light.png',
  'FIRE': './assets/textures/tile_fire.png',
  'WATER': './assets/textures/tile_water.png'
};

class UITile extends UIWidget {
  constructor(options = {}) {
    super({
      className: 'UITile',
      template: `
      <div class="UITile-bg js-bg"></div>
      <div class="UITile-piece js-piece"></div>
      <div class="UITile-actions js-actions"></div>`
    });

    this.tile = null;
    this.selectable = false;
    this.uiPiece = new UIPiece();

    this.node.classList.add(options.color == 'white' ? 'UITile--white' : 'UITile--black');
    this.node.querySelector('.js-piece').replaceWith(this.uiPiece.node);

    this.node.addEventListener('click', (e) => {
      e.stopPropagation();
      this.handleClicked()
    });
  }

  update(ts) {
    if (this.tile) {
      this.node.querySelector('.js-bg').style.backgroundImage = `url(${ELEMENT_TO_BG[this.tile.getElement()] ?? ''})`;
      this.uiPiece.setPiece(this.tile.getPiece());
    }
    else {
      this.node.querySelector('.js-bg').style.backgroundImage = '';
    }

    this.uiPiece.update(ts);
  }

  delete() {
    this.uiPiece.delete();
    super.delete();
  }

  setTile(tile) {
    this.tile = tile ? tile : null;
  }

  isSelectable() {
    return this.selectable;
  }

  setSelectable(selectable) {
    this.node.classList.toggle('u-selectable', selectable);
    this.selectable = selectable;
  }

  addAction(name) {
    let action = document.createElement('div');
    action.className = 'UITile-actions-item';
    action.textContent = name;
    action.id = name;
    this.node.querySelector('.js-actions').appendChild(action);

    action.addEventListener('click', (e) => {
      e.stopPropagation();
      this.handleActionClicked(name)
    });
  }

  clearActions() {
    let actionsNode = this.node.querySelector('.js-actions');
    while (actionsNode.firstChild) {
      actionsNode.removeChild(actionsNode.firstChild);
    }
  }

  handleClicked() {
    eventManager.emit(this, 'E_CLICKED');
  }

  handleActionClicked(action) {
    eventManager.emit(this, 'E_ACTION', { action: action });
  }
}

export { UITile };