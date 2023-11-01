import { UIWidget } from '../../../lib/ui/ui_widget';
import { Card } from '../core/card';
import { UICard } from '../ui/ui_card';

class UICardDescription extends UIWidget {
  card: Card | null;
  uiCard: UICard;

  constructor() {
    super({
      className: 'UICardDescription',
      template: `
      <div class="UICardDescription-card js-card"></div>
      <div class="UICardDescription-name js-name"></div>
      <div class="UICardDescription-points js-points-string"></div>`
    });

    this.card = null;
    this.uiCard = new UICard();
    this.uiCard.setVisiblePoints(false);
  }

  setCard(card: Card): void {
    this.uiCard.setCard(card);
    this.node.querySelector<HTMLImageElement>('.js-card')!.innerHTML = '';
    this.node.querySelector<HTMLImageElement>('.js-card')!.appendChild(this.uiCard.getNode());

    this.node.querySelector<HTMLElement>('.js-name')!.textContent = card.getName();
    this.node.querySelector<HTMLElement>('.js-points-string')!.textContent = card.getPoints().join(':');
  }
}

export { UICardDescription };