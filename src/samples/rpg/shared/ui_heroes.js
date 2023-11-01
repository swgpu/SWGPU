import { UIWidget } from '../../../lib/ui/ui_widget';
import { UIMenuListView } from '../../../lib/ui_menu_list_view/ui_menu_list_view';
// ---------------------------------------------------------------------------------------

class UIHeroes extends UIMenuListView {
  constructor() {
    super();
  }

  addItem(item, enabled = true, index = -1) {
    let widget = new UIHeroesItem();
    widget.setHero(item);
    this.addWidget(widget, enabled, index);
  }
}

class UIHeroesItem extends UIWidget {
  constructor() {
    super({
      className: 'UIHeroesItem',
      template: `
      <img class="UIHeroesItem-picture js-picture" src="#">
      <div class="UIHeroesItem-body">
        <div class="UIHeroesItem-body-name js-name"></div>
        <div class="UIHeroesItem-body-stats">
          <div class="UIHeroesItem-body-stats-item">
            <span class="UIHeroesItem-body-stats-item-name">HP</span>
            <span class="UIHeroesItem-body-stats-item-separator"></span>
            <span class="UIHeroesItem-body-stats-item-value js-hp-value"></span>
          </div>
          <div class="UIHeroesItem-body-stats-item">
            <span class="UIHeroesItem-body-stats-item-name">MP</span>
            <span class="UIHeroesItem-body-stats-item-separator"></span>
            <span class="UIHeroesItem-body-stats-item-value js-mp-value"></span>
          </div>
        </div>
      </div>`
    });

    this.hero = null;
  }

  update(ts) {
    if (this.hero) {
      this.node.querySelector('.js-picture').src = this.hero.getPictureFile();
      this.node.querySelector('.js-name').textContent = this.hero.getName();
      this.node.querySelector('.js-hp-value').textContent = this.hero.getAttribute('HP') + '/' + this.hero.getAttribute('HP_MAX');
      this.node.querySelector('.js-mp-value').textContent = this.hero.getAttribute('MP') + '/' + this.hero.getAttribute('HP_MAX');
    }
    else {
      this.node.querySelector('.js-picture').src = '#';
      this.node.querySelector('.js-name').textContent = '--';
      this.node.querySelector('.js-hp-value').textContent = '--/--';
      this.node.querySelector('.js-mp-value').textContent = '--/--';
    }
  }

  getHero() {
    return this.hero;
  }

  setHero(hero) {
    this.hero = hero ? hero : null;
  }
}

export { UIHeroes };