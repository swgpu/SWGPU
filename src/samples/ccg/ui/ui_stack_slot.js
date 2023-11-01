import { UIWidget } from '../../../lib/ui/ui_widget';
// ---------------------------------------------------------------------------------------

class UIStackSlot extends UIWidget {
  constructor() {
    super({
      className: 'UIStackSlot',
      template: `
        <div class="UIStackSlot-bg js-bg"></div>
        <div class="UIStackSlot-numCards js-num-cards"></div>`
    });

    this.cards = [];
    this.duelistIndex = 0;
    this.location = '';
    this.hidden = false;
    this.selectable = false;
  }

  update() {
    if (this.cards.length > 0) {
      let lastCard = this.cards[this.cards.length - 1];
      this.node.querySelector('.js-bg').style.backgroundImage = this.hidden ? 'url(samples/ccg/card_back.png)' : 'url(' + lastCard.getCoverFile() + ')';
      this.node.querySelector('.js-num-cards').textContent = this.cards.length;
    }
    else {
      this.node.querySelector('.js-bg').style.backgroundImage = 'url()';
      this.node.querySelector('.js-num-cards').textContent = 0;
    }
  }

  setCards(cards) {
    this.cards = cards ? cards : [];
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

export { UIStackSlot };