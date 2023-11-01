import { eventManager } from '../../../lib/core/event_manager';
import { UIWidget } from '../../../lib/ui/ui_widget';
// ---------------------------------------------------------------------------------------
import { Direction } from '../core/enums';
import { Card } from '../core/card';
import { Config } from '../config';

class UICard extends UIWidget {
  card: Card | null;

  constructor() {
    super({
      className: 'UICard',
      template: `
      <img class="UICard-picture js-background"/>
      <img class="UICard-picture js-picture"/>
      <img class="UICard-picture js-border"/>
      <div class="UICard-points js-points">
        <div class="UICard-points-t js-top"></div>
        <div class="UICard-points-r js-right"></div>
        <div class="UICard-points-l js-left"></div>
        <div class="UICard-points-b js-bottom"></div>
      </div>`
    });

    this.card = null;
    this.node.querySelector<HTMLImageElement>('.js-border')!.src = Config.PATH_CARD + 'card.png';
  }

  setCard(card: Card | null): void {
    eventManager.unsubscribe(card, 'E_POINTS_CHANGED', this);
    eventManager.unsubscribe(card, 'E_POINT_CHANGED', this);
    eventManager.unsubscribe(card, 'E_MODIFIER_VALUES_CHANGED', this);
    eventManager.unsubscribe(card, 'E_MODIFIER_VALUE_CHANGED', this);
    eventManager.unsubscribe(card, 'E_OWNER_CHANGED', this);

    if (card) {
      eventManager.subscribe(card, 'E_POINTS_CHANGED', this, this.handlePointsChanged);
      eventManager.subscribe(card, 'E_POINT_CHANGED', this, this.handlePointChanged);
      eventManager.subscribe(card, 'E_MODIFIER_VALUES_CHANGED', this, this.handleModifierValuesChanged);
      eventManager.subscribe(card, 'E_MODIFIER_VALUE_CHANGED', this, this.handleModifierValueChanged);
      eventManager.subscribe(card, 'E_OWNER_CHANGED', this, this.handleOwnerChanged);
      this.setPicture(card.getName());
      this.setPlayerOwner(card.getOwner());
      this.setPoints(card.getValue(0), card.getValue(1), card.getValue(2), card.getValue(3));
      this.card = card;
    }
    else {
      this.card = null;
    }
  }

  setVisiblePoints(visible: boolean): void {
    this.node.querySelector<HTMLElement>('.js-points')!.style.display = visible ? 'block' : 'none';
  }

  setPicture(filename: string): void {
    this.node.querySelector<HTMLImageElement>('.js-picture')!.src = Config.PATH_CARD_AVATAR + filename + '.png';
  }

  setPlayerOwner(owner: number): void {
    if (owner == 1) {
      this.node.querySelector<HTMLImageElement>('.js-background')!.src = Config.PATH_CARD + 'blue.png';
    }
    else {
      this.node.querySelector<HTMLImageElement>('.js-background')!.src = Config.PATH_CARD + 'red.png';
    }
  }

  setPoints(left: number, top: number, right: number, bottom: number): void {
    this.node.querySelector<HTMLElement>('.js-top')!.textContent = top.toString(16).toUpperCase();
    this.node.querySelector<HTMLElement>('.js-right')!.textContent = right.toString(16).toUpperCase();
    this.node.querySelector<HTMLElement>('.js-bottom')!.textContent = bottom.toString(16).toUpperCase();
    this.node.querySelector<HTMLElement>('.js-left')!.textContent = left.toString(16).toUpperCase();
  }

  setPoint(direction: Direction, value: number): void {
    let val = value.toString(16).toUpperCase();
    switch (direction) {
      case Direction.N:
        this.node.querySelector<HTMLElement>('.js-top')!.textContent = val;
        break;
      case Direction.E:
        this.node.querySelector<HTMLElement>('.js-right')!.textContent = val;
        break;
      case Direction.S:
        this.node.querySelector<HTMLElement>('.js-bottom')!.textContent = val;
        break;
      case Direction.W:
        this.node.querySelector<HTMLElement>('.js-left')!.textContent = val;
        break;
    }
  }

  handlePointsChanged(): void {
    if (this.card) {
      this.setPoints(this.card.getValue(0), this.card.getValue(1), this.card.getValue(2), this.card.getValue(3));
    }
  }

  handlePointChanged(data: any): void {
    if (this.card) {
      this.setPoint(data.dir, this.card.getValue(data.dir));
    }
  }

  handleModifierValuesChanged(data: any): void {
    if (this.card) {
      this.setPoints(this.card.getValue(0), this.card.getValue(1), this.card.getValue(2), this.card.getValue(3));
    }
  }

  handleModifierValueChanged(data: any): void {
    if (this.card) {
      this.setPoint(data.dir, this.card.getValue(data.dir));
    }
  }

  handleOwnerChanged(data: any): void {
    if (this.card) {
      this.setPlayerOwner(this.card.getOwner());
    }
  }
}

export { UICard };