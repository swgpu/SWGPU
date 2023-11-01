import { UIWidget } from '../../../lib/ui/ui_widget';
import { UIMenuListView } from '../../../lib/ui_menu_list_view/ui_menu_list_view';
// ---------------------------------------------------------------------------------------

class UIHeroesEquipment extends UIMenuListView {
  constructor() {
    super();
  }

  addItem(item, enabled = true, index = -1) {
    let widget = new UIHeroesEquipmentItem();
    widget.setHero(item);
    this.addWidget(widget, enabled, index);
  }
}

class UIHeroesEquipmentItem extends UIWidget {
  constructor() {
    super({
      className: 'UIHeroesEquipmentItem',
      template: `
      <img class="UIHeroesEquipmentItem-picture js-picture" src="#">
      <div class="UIHeroesEquipmentItem-body">
        <div class="UIHeroesEquipmentItem-body-name js-name"></div>
        <div class="UIHeroesEquipmentItem-body-stats">
          <div class="UIHeroesEquipmentItem-body-stats-item">
            <span class="UIHeroesEquipmentItem-body-stats-item-name">HP MAX</span>
            <span class="UIHeroesEquipmentItem-body-stats-item-separator"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value1 js-hp-max-value1"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-arrow"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value2 js-hp-max-value2"></span>
          </div>
          <div class="UIHeroesEquipmentItem-body-stats-item">
            <span class="UIHeroesEquipmentItem-body-stats-item-name">MP MAX</span>
            <span class="UIHeroesEquipmentItem-body-stats-item-separator"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value1 js-mp-max-value1"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-arrow"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value2 js-mp-max-value2"></span>
          </div>
          <div class="UIHeroesEquipmentItem-body-stats-item">
            <span class="UIHeroesEquipmentItem-body-stats-item-name">ATK</span>
            <span class="UIHeroesEquipmentItem-body-stats-item-separator"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value1 js-atk-value1"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-arrow"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value2 js-atk-value2"></span>
          </div>
          <div class="UIHeroesEquipmentItem-body-stats-item">
            <span class="UIHeroesEquipmentItem-body-stats-item-name">DEF</span>
            <span class="UIHeroesEquipmentItem-body-stats-item-separator"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value1 js-def-value1"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-arrow"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value2 js-def-value2"></span>
          </div>
          <div class="UIHeroesEquipmentItem-body-stats-item">
            <span class="UIHeroesEquipmentItem-body-stats-item-name">M-ATK</span>
            <span class="UIHeroesEquipmentItem-body-stats-item-separator"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value1 js-magic-atk-value1"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-arrow"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value2 js-magic-atk-value2"></span>
          </div>
          <div class="UIHeroesEquipmentItem-body-stats-item">
            <span class="UIHeroesEquipmentItem-body-stats-item-name">M-DEF</span>
            <span class="UIHeroesEquipmentItem-body-stats-item-separator"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value1 js-magic-def-value1"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-arrow"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value2 js-magic-def-value2"></span>
          </div>
          <div class="UIHeroesEquipmentItem-body-stats-item">
            <span class="UIHeroesEquipmentItem-body-stats-item-name">AGI</span>
            <span class="UIHeroesEquipmentItem-body-stats-item-separator"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value1 js-agility-value1"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-arrow"></span>
            <span class="UIHeroesEquipmentItem-body-stats-item-value2 js-agility-value2"></span>
          </div>
        </div>
      </div>`
    });

    this.hero = null;
    this.equipmentItem = null;
  }

  update(ts) {
    if (this.hero) {
      let attributes = this.hero.getAttributes();
      let newAttributes = this.hero.isEquipableItem(this.equipmentItem) ? this.hero.getAttributesWith(this.equipmentItem) : {};
      this.node.querySelector('.js-picture').src = this.hero.getPictureFile();
      this.node.querySelector('.js-name').textContent = this.hero.getName();
      this.displayStat('hp-max', attributes.get('HP_MAX'), newAttributes['HP_MAX']);
      this.displayStat('mp-max', attributes.get('MP_MAX'), newAttributes['MP_MAX']);
      this.displayStat('atk', attributes.get('ATK'), newAttributes['ATK']);
      this.displayStat('def', attributes.get('DEF'), newAttributes['DEF']);
      this.displayStat('magic-atk', attributes.get('MAGIC_ATK'), newAttributes['MAGIC_ATK']);
      this.displayStat('magic-def', attributes.get('MAGIC_DEF'), newAttributes['MAGIC_DEF']);
      this.displayStat('agility', attributes.get('AGILITY'), newAttributes['AGILITY']);
    }
    else {
      this.node.querySelector('.js-picture').src = '#';
      this.node.querySelector('.js-name').textContent = '--';
      this.displayStat('hp-max', '--');
      this.displayStat('mp-max', '--');
      this.displayStat('atk', '--');
      this.displayStat('def', '--');
      this.displayStat('magic-atk', '--');
      this.displayStat('magic-def', '--');
      this.displayStat('agility', '--');
    }
  }

  getHero() {
    return this.hero;
  }

  setHero(hero) {
    this.hero = hero ? hero : null;
  }

  setEquipmentItem(equipmentItem) {
    this.equipmentItem = equipmentItem ? equipmentItem : null;
  }

  displayStat(attribute, value1, value2) {
    this.node.querySelector('.js-' + attribute + '-value1').textContent = value1 ? value1 : '';
    this.node.querySelector('.js-' + attribute + '-value2').textContent = value2 ? value2 : '';
    this.node.querySelector('.js-' + attribute + '-value2').style.display = value2 ? 'block' : 'none';
    this.node.querySelector('.js-' + attribute + '-value2').style.color = (value2 > value1) ? '#00d600' : (value2 < value1) ? '#ff2929' : '#fff';
  }
}

export { UIHeroesEquipment };