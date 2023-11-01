import { UIWidget } from '../../../lib/ui/ui_widget';
// ---------------------------------------------------------------------------------------

class UIStatus extends UIWidget {
  constructor() {
    super({
      className: 'UIStatus',
      template: `
      <div class="UIStatus-avatar">
        <img class="UIStatus-avatar-picture js-picture" src="#">
        <div class="UIStatus-avatar-name js-name"></div>
      </div>
      <div class="UIStatus-title">STATS</div>
      <div class="UIStatus-section">
        <div class="UIStatus-stats">
          <div class="UIStatus-stats-item">
            <span class="UIStatus-stats-item-name">LV</span>
            <span class="UIStatus-stats-item-separator"></span>
            <span class="UIStatus-stats-item-value js-lv-value"></span>
          </div>
          <div class="UIStatus-stats-item">
            <span class="UIStatus-stats-item-name">XP</span>
            <span class="UIStatus-stats-item-separator"></span>
            <span class="UIStatus-stats-item-value js-xp-value"></span>
          </div>
          <div class="UIStatus-stats-item">
            <span class="UIStatus-stats-item-name">HP</span>
            <span class="UIStatus-stats-item-separator"></span>
            <span class="UIStatus-stats-item-value js-hp-value"></span>
          </div>
          <div class="UIStatus-stats-item">
            <span class="UIStatus-stats-item-name">MP</span>
            <span class="UIStatus-stats-item-separator"></span>
            <span class="UIStatus-stats-item-value js-mp-value"></span>
          </div>
          <div class="UIStatus-stats-item">
            <span class="UIStatus-stats-item-name">ATK</span>
            <span class="UIStatus-stats-item-separator"></span>
            <span class="UIStatus-stats-item-value js-atk-value"></span>
          </div>
          <div class="UIStatus-stats-item">
            <span class="UIStatus-stats-item-name">DEF</span>
            <span class="UIStatus-stats-item-separator"></span>
            <span class="UIStatus-stats-item-value js-def-value"></span>
          </div>
          <div class="UIStatus-stats-item">
            <span class="UIStatus-stats-item-name">M-ATK</span>
            <span class="UIStatus-stats-item-separator"></span>
            <span class="UIStatus-stats-item-value js-matk-value"></span>
          </div>
          <div class="UIStatus-stats-item">
            <span class="UIStatus-stats-item-name">M-DEF</span>
            <span class="UIStatus-stats-item-separator"></span>
            <span class="UIStatus-stats-item-value js-mdef-value"></span>
          </div>
          <div class="UIStatus-stats-item">
            <span class="UIStatus-stats-item-name">AGILITE</span>
            <span class="UIStatus-stats-item-separator"></span>
            <span class="UIStatus-stats-item-value js-agility-value"></span>
          </div>
          <div class="UIStatus-stats-item">
            <span class="UIStatus-stats-item-name">ELEMENT</span>
            <span class="UIStatus-stats-item-separator"></span>
            <span class="UIStatus-stats-item-value js-element-value"></span>
          </div>
        </div>
      </div>
      <div class="UIStatus-title">EQUIPEMENTS</div>
      <div class="UIStatus-section">
        <div class="UIStatus-stuffs">
          <div class="UIStatus-stuffs-item">
            <span class="UIStatus-stuffs-item-name">ARME</span>
            <span class="UIStatus-stuffs-item-separator"></span>
            <span class="UIStatus-stuffs-item-value js-weapon-value"></span>
          </div>
          <div class="UIStatus-stuffs-item">
            <span class="UIStatus-stuffs-item-name">CASQUE</span>
            <span class="UIStatus-stuffs-item-separator"></span>
            <span class="UIStatus-stuffs-item-value js-helmet-value"></span>
          </div>
          <div class="UIStatus-stuffs-item">
            <span class="UIStatus-stuffs-item-name">ARMURE</span>
            <span class="UIStatus-stuffs-item-separator"></span>
            <span class="UIStatus-stuffs-item-value js-armor-value"></span>
          </div>
          <div class="UIStatus-stuffs-item">
            <span class="UIStatus-stuffs-item-name">RELIQUE</span>
            <span class="UIStatus-stuffs-item-separator"></span>
            <span class="UIStatus-stuffs-item-value js-relic-value"></span>
          </div>
        </div>
      </div>
      <div class="UIStatus-title">DESCRIPTION</div>
      <div class="UIStatus-section">
        <div class="UIStatus-description js-description"></div>
      </div>`
    });

    this.hero = null;
  }

  update() {
    if (this.hero) {
      let weapon = this.hero.getWeapon();
      let helmet = this.hero.getHelmet();
      let armor = this.hero.getArmor();
      let relic = this.hero.getRelic();
      this.node.querySelector('.js-picture').src = this.hero.getPictureFile();
      this.node.querySelector('.js-name').textContent = this.hero.getName();
      this.node.querySelector('.js-lv-value').textContent = this.hero.getAttribute('LV') + '/' + this.hero.getAttribute('LV_MAX');
      this.node.querySelector('.js-xp-value').textContent = this.hero.getAttribute('XP') + '/' + this.hero.getAttribute('XP_MAX');
      this.node.querySelector('.js-hp-value').textContent = this.hero.getAttribute('HP') + '/' + this.hero.getAttribute('HP_MAX');
      this.node.querySelector('.js-mp-value').textContent = this.hero.getAttribute('MP') + '/' + this.hero.getAttribute('MP_MAX');
      this.node.querySelector('.js-atk-value').textContent = this.hero.getAttribute('ATK');
      this.node.querySelector('.js-def-value').textContent = this.hero.getAttribute('DEF');
      this.node.querySelector('.js-matk-value').textContent = this.hero.getAttribute('MAGIC_ATK');
      this.node.querySelector('.js-mdef-value').textContent = this.hero.getAttribute('MAGIC_DEF');
      this.node.querySelector('.js-agility-value').textContent = this.hero.getAttribute('AGILITY');
      this.node.querySelector('.js-element-value').textContent = this.hero.getAttribute('ELEMENT');
      this.node.querySelector('.js-weapon-value').textContent = weapon ? weapon.getName() : 'Vide';
      this.node.querySelector('.js-helmet-value').textContent = helmet ? helmet.getName() : 'Vide';
      this.node.querySelector('.js-armor-value').textContent = armor ? armor.getName() : 'Vide';
      this.node.querySelector('.js-relic-value').textContent = relic ? relic.getName() : 'Vide';
    }
    else {
      this.node.querySelector('.js-picture').src = '#';
      this.node.querySelector('.js-name').textContent = '';
      this.node.querySelector('.js-lv-value').textContent = '--/--';
      this.node.querySelector('.js-xp-value').textContent = '--/--';
      this.node.querySelector('.js-hp-value').textContent = '--/--';
      this.node.querySelector('.js-mp-value').textContent = '--/--';
      this.node.querySelector('.js-atk-value').textContent = '--';
      this.node.querySelector('.js-def-value').textContent = '--';
      this.node.querySelector('.js-matk-value').textContent = '--';
      this.node.querySelector('.js-mdef-value').textContent = '--';
      this.node.querySelector('.js-agility-value').textContent = '--';
      this.node.querySelector('.js-element-value').textContent = '--';
      this.node.querySelector('.js-weapon-value').textContent = 'Vide';
      this.node.querySelector('.js-helmet-value').textContent = 'Vide';
      this.node.querySelector('.js-armor-value').textContent = 'Vide';
      this.node.querySelector('.js-relic-value').textContent = 'Vide';
    }
  }

  setHero(hero) {
    this.hero = hero ? hero : null;
  }
}

export { UIStatus };