import { UIWidget } from '../../../lib/ui/ui_widget';
// ---------------------------------------------------------------------------------------
import { CARD_POS } from '../core/enums';
// ---------------------------------------------------------------------------------------

class UICardSlot extends UIWidget {
  constructor() {
    super({
      className: 'UICardSlot',
      template: `
      <div class="UICardSlot-bg js-bg"></div>`
    });

    this.card = null;
    this.duelistIndex = 0;
    this.location = '';
    this.index = 0;
    this.hidden = false;
    this.selectable = false;
  }

  update() {
    if (this.card) {
      this.node.style.transform = `rotate(${this.card.getPosition() == CARD_POS.DEFENSE ? '90deg' : '0deg'})`;
      this.node.querySelector('.js-bg').style.backgroundImage = this.hidden ? 'url(samples/ccg/card_back.png)' : 'url(' + this.card.getCoverFile() + ')';
    }
    else {
      this.node.style.transform = 'rotate(0deg)';
      this.node.querySelector('.js-bg').style.backgroundImage = 'url()';
    }
  }

  getCard() {
    return this.card;
  }

  setCard(card) {
    this.card = card ? card : null;
  }

  getDuelistIndex() {
    return this.duelistIndex;
  }

  setDuelistIndex(duelistIndex) {
    this.duelistIndex = duelistIndex;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location) {
    this.location = location;
  }

  getIndex() {
    return this.index;
  }

  setIndex(index) {
    this.index = index;
  }

  isHidden() {
    return this.hidden;
  }

  setHidden(hidden) {
    this.hidden = hidden;
  }

  isSelectable() {
    return this.node.classList.contains('u-selectable');
  }

  setSelectable(selectable) {
    this.node.classList.toggle('u-selectable', selectable);
  }
}

export { UICardSlot };