import { UIWidget } from '../../../lib/ui/ui_widget';
import { MenuAxis } from '../../../lib/ui_menu/ui_menu';
import { UIMenuListView } from '../../../lib/ui_menu_list_view/ui_menu_list_view';
// ---------------------------------------------------------------------------------------

class UIBattleHeroes extends UIMenuListView {
  constructor() {
    super({
      axis: MenuAxis.X
    });
  }

  addItem(item, enabled = true, index = -1) {
    let widget = new UIBattleHeroesItem();
    widget.setHero(item);
    this.addWidget(widget, enabled, index);
  }
}

class UIBattleHeroesItem extends UIWidget {
  constructor() {
    super({
      className: 'UIBattleHeroesItem',
      template: `
      <div class="UIBattleHeroesItem-body">
        <div class="UIBattleHeroesItem-body-name js-name"></div>
        <div class="UIBattleHeroesItem-body-stats">
          <div class="UIBattleHeroesItem-body-stats-item">
            <span class="UIBattleHeroesItem-body-stats-item-name">HP</span>
            <span class="UIBattleHeroesItem-body-stats-item-bar">
              <span class="UIBattleHeroesItem-body-stats-item-bar-value js-hp-value"></span>
              <span class="UIBattleHeroesItem-body-stats-item-bar-progress js-hp-bar"></span>
            </span>
          </div>
          <div class="UIBattleHeroesItem-body-stats-item">
            <span class="UIBattleHeroesItem-body-stats-item-name">MP</span>
            <span class="UIBattleHeroesItem-body-stats-item-bar">
              <span class="UIBattleHeroesItem-body-stats-item-bar-value js-mp-value"></span>
              <span class="UIBattleHeroesItem-body-stats-item-bar-progress js-mp-bar"></span>
            </span>
          </div>
        </div>
      </div>`
    });

    this.hero = null;
  }

  update(ts) {
    if (this.hero) {
      this.setEnabled(this.hero.isReady());
      this.node.querySelector('.js-name').textContent = this.hero.getName();
      this.node.querySelector('.js-hp-value').textContent = this.hero.getAttribute('HP') + '/' + this.hero.getAttribute('HP_MAX');
      this.node.querySelector('.js-hp-bar').style.width = parseInt(this.hero.getAttribute('HP') / this.hero.getAttribute('HP_MAX') * 100) + '%';
      this.node.querySelector('.js-mp-value').textContent = this.hero.getAttribute('MP') + '/' + this.hero.getAttribute('MP_MAX');
      this.node.querySelector('.js-mp-bar').style.width = parseInt(this.hero.getAttribute('MP') / this.hero.getAttribute('MP_MAX') * 100) + '%';
    }
    else {
      this.disable();
      this.node.querySelector('.js-name').textContent = '--';
      this.node.querySelector('.js-hp-value').textContent = '--/--';
      this.node.querySelector('.js-hp-bar').style.width = '0%';
      this.node.querySelector('.js-mp-value').textContent = '--/--';
      this.node.querySelector('.js-mp-bar').style.width = '0%';
    }
  }

  getHero() {
    return this.hero;
  }

  setHero(hero) {
    this.hero = hero ? hero : null;
  }
}

export { UIBattleHeroes };