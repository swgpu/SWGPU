import { UIWidget } from '../../../lib/ui/ui_widget';
import { UIMenuListView } from '../../../lib/ui_menu_list_view/ui_menu_list_view';
// ---------------------------------------------------------------------------------------

class UIEffects extends UIMenuListView {
  constructor() {
    super();
  }

  addItem(item, enabled = true, index = -1) {
    let widget = new UIEffectsItem();
    widget.setEffect(item);
    this.addWidget(widget, enabled, index);
  }
}

class UIEffectsItem extends UIWidget {
  constructor() {
    super({
      className: 'UIEffectsItem',
      template: `
      <span class="UIEffectsItem-name js-name"></span>`
    });

    this.effect = null;
  }
  
  update(ts) {
    if (this.effect) {
      this.node.querySelector('.js-name').textContent = this.effect.getName();
    }
    else {
      this.node.querySelector('.js-name').textContent = '--';
    }
  }

  getEffect() {
    return this.effect;
  }

  setEffect(effect) {
    this.effect = effect ? effect : null;
  }
}

export { UIEffects };