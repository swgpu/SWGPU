import { UIWidget } from '../../../lib/ui/ui_widget';
import { UIMenuListView } from '../../../lib/ui_menu_list_view/ui_menu_list_view';
// ---------------------------------------------------------------------------------------

class UIInventory extends UIMenuListView {
  constructor(options = {}) {
    super();
    this.showPrice = options.showPrice ?? true;
    this.showQuantity = options.showQuantity ?? true;
  }

  addItem(item, enabled = true, index = -1) {
    let widget = new UIInventoryItem();
    widget.setShowPrice(this.showPrice);
    widget.setShowQuantity(this.showQuantity);
    widget.setItem(item);
    this.addWidget(widget, enabled, index);
  }
}

class UIInventoryItem extends UIWidget {
  constructor() {
    super({
      className: 'UIInventoryItem',
      template: `
      <span class="UIInventoryItem-name js-name"></span>
      <span class="UIInventoryItem-quantity js-quantity"></span>
      <span class="UIInventoryItem-price js-price"></span>`
    });

    this.item = null;
    this.showPrice = true;
    this.showQuantity = true;
  }

  update(ts) {
    if (this.item) {
      this.node.querySelector('.js-name').textContent = this.item.getName();
      this.node.querySelector('.js-price').style.display = this.showPrice ? 'block' : 'none';
      this.node.querySelector('.js-price').textContent = this.item.price;
      this.node.querySelector('.js-quantity').style.display = this.showQuantity ? 'block' : 'none';
      this.node.querySelector('.js-quantity').textContent = this.item.quantity;
    }
    else {
      this.node.querySelector('.js-name').textContent = '--';
      this.node.querySelector('.js-price').textContent = '--';
      this.node.querySelector('.js-quantity').textContent = '--';
    }
  }

  getItem() {
    return this.item;
  }

  setItem(item) {
    this.item = item ? item : null;
  }

  setShowPrice(showPrice) {
    this.showPrice = showPrice;
  }

  setShowQuantity(showQuantity) {
    this.showQuantity = showQuantity;
  }
}

export { UIInventory };