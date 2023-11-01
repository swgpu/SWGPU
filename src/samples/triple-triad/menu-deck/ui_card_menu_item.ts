import { UIWidget } from '../../../lib/ui/ui_widget';

class UICardMenuItem extends UIWidget {
  name: string;
  quantity: number;
  pristineQuantity: number;

  constructor(name: string, quantity: number) {
    super({
      className: 'UICardMenuItem',
      template: `
        <div class="UICardMenuItem-name js-name">${name}</div>
        <div class="UICardMenuItem-quantity js-quantity">${quantity}</div>`
    });

    this.name = name;
    this.quantity = quantity;
    this.pristineQuantity = quantity;
  }

  add(): void {
    this.quantity--;
    this.node.querySelector<HTMLElement>('.js-quantity')!.textContent = this.quantity.toString();
    this.node.classList.remove('u-added');
    this.node.offsetWidth;
    this.node.classList.add('u-added');
  }

  remove(): void {
    this.quantity++;
    this.node.querySelector<HTMLElement>('.js-quantity')!.textContent = this.quantity.toString();
    this.node.classList.remove('u-removed');
    this.node.offsetWidth;
    this.node.classList.add('u-removed');

    if (this.quantity == this.pristineQuantity) {
      this.node.classList.remove('u-added');
    }
  }

  setName(name: string): void {
    this.node.querySelector<HTMLElement>('.js-name')!.textContent = name;
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setQuantity(quantity: number): void {
    this.node.querySelector<HTMLElement>('.js-quantity')!.textContent = quantity.toString();
    this.quantity = quantity;
  }

  getQuantity(): number {
    return this.quantity;
  }
}

export { UICardMenuItem };