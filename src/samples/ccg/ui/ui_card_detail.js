import { UIWidget } from '../../../lib/ui/ui_widget';
// ---------------------------------------------------------------------------------------
import { CARD_TYPE, CARD_ELEMENT, SPELL_CARD_NATURE, SPELL_CARD_MODE, MONSTER_CARD_RACE } from '../core/enums';
// ---------------------------------------------------------------------------------------

class UICardDetail extends UIWidget {
  constructor() {
    super({
      className: 'UICardDetail',
      template: `
      <div class="UICardDetail-title js-title"></div>
      <div class="UICardDetail-body">
        <img class="UICardDetail-body-coverImg js-cover-img">
        <div class="UICardDetail-body-infos js-infos"></div>
      </div>`
    });

    this.card = null;
  }

  update() {
    if (this.card) {
      this.node.querySelector('.js-title').textContent = this.card.getName();
      this.node.querySelector('.js-cover-img').src = this.card.getCoverFile();
      this.node.querySelector('.js-infos').textContent = '';

      if (this.card.getType() == CARD_TYPE.MONSTER) {
        this.node.querySelector('.js-infos').textContent += 'Type: MONSTRE\n';
      }
      else if (this.card.getType() == CARD_TYPE.SPELL) {
        this.node.querySelector('.js-infos').textContent += 'Type: MAGIE\n';
      }

      if (this.card.getAttribute('ELEMENT') == CARD_ELEMENT.DARK) {
        this.node.querySelector('.js-infos').textContent += 'Element: TENEBRE\n';
      }
      else if (this.card.getAttribute('ELEMENT') == CARD_ELEMENT.LIGHT) {
        this.node.querySelector('.js-infos').textContent += 'Element: LUMIERE\n';
      }
      else if (this.card.getAttribute('ELEMENT') == CARD_ELEMENT.EARTH) {
        this.node.querySelector('.js-infos').textContent += 'Element: TERRE\n';
      }
      else if (this.card.getAttribute('ELEMENT') == CARD_ELEMENT.WIND) {
        this.node.querySelector('.js-infos').textContent += 'Element: VENT\n';
      }
      else if (this.card.getAttribute('ELEMENT') == CARD_ELEMENT.FIRE) {
        this.node.querySelector('.js-infos').textContent += 'Element: FEU\n';
      }
      else if (this.card.getAttribute('ELEMENT') == CARD_ELEMENT.WATER) {
        this.node.querySelector('.js-infos').textContent += 'Element: EAU\n';
      }
      else if (this.card.getAttribute('ELEMENT') == CARD_ELEMENT.DIVINE) {
        this.node.querySelector('.js-infos').textContent += 'Element: DIVIN\n';
      }

      if (this.card.getType() == CARD_TYPE.SPELL && this.card.getNature() == SPELL_CARD_NATURE.NORMAL) {
        this.node.querySelector('.js-infos').textContent += 'Nature: NORMAL\n';
      }
      else if (this.card.getType() == CARD_TYPE.SPELL && this.card.getNature() == SPELL_CARD_NATURE.CONTINUOUS) {
        this.node.querySelector('.js-infos').textContent += 'Nature: CONTINUE\n';
      }

      if (this.card.getType() == CARD_TYPE.SPELL && this.card.getMode() == SPELL_CARD_MODE.ACTIVATE) {
        this.node.querySelector('.js-infos').textContent += 'Mode: ACTIVATION\n';
      }
      else if (this.card.getType() == CARD_TYPE.SPELL && this.card.getMode() == SPELL_CARD_MODE.TRIGGER) {
        this.node.querySelector('.js-infos').textContent += 'Mode: PIEGE\n';
      }

      if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.AQUA) {
        this.node.querySelector('.js-infos').textContent += 'Race: AQUA\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.BEAST) {
        this.node.querySelector('.js-infos').textContent += 'Race: BETE\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.BEAST_WARRIOR) {
        this.node.querySelector('.js-infos').textContent += 'Race: BETE GUERRIERE\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.DINOSAUR) {
        this.node.querySelector('.js-infos').textContent += 'Race: DINOSAURE\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.FAIRY) {
        this.node.querySelector('.js-infos').textContent += 'Race: FEE\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.FIEND) {
        this.node.querySelector('.js-infos').textContent += 'Race: DEMON\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.FISH) {
        this.node.querySelector('.js-infos').textContent += 'Race: POISSON\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.INSECT) {
        this.node.querySelector('.js-infos').textContent += 'Race: INSECTE\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.MACHINE) {
        this.node.querySelector('.js-infos').textContent += 'Race: MACHINE\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.PLANT) {
        this.node.querySelector('.js-infos').textContent += 'Race: PLANTE\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.PSYCHIC) {
        this.node.querySelector('.js-infos').textContent += 'Race: PSYCHIQUE\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.PYRO) {
        this.node.querySelector('.js-infos').textContent += 'Race: PYRO\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.REPTILE) {
        this.node.querySelector('.js-infos').textContent += 'Race: REPTILE\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.SEASERPENT) {
        this.node.querySelector('.js-infos').textContent += 'Race: SERPENT DE MER\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.SPELLCASTER) {
        this.node.querySelector('.js-infos').textContent += 'Race: MAGICIEN\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.THUNDER) {
        this.node.querySelector('.js-infos').textContent += 'Race: ECLAIR\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.WARRIOR) {
        this.node.querySelector('.js-infos').textContent += 'Race: GUERRIER\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.WINGEDBEAST) {
        this.node.querySelector('.js-infos').textContent += 'Race: BETE AILEE\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.ZOMBIE) {
        this.node.querySelector('.js-infos').textContent += 'Race: ZOMBIE\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.WYRM) {
        this.node.querySelector('.js-infos').textContent += 'Race: WYRM\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.DRAGON) {
        this.node.querySelector('.js-infos').textContent += 'Race: DRAGON\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.DIVINEBEAST) {
        this.node.querySelector('.js-infos').textContent += 'Race: DIVINITE\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.CREATORGOD) {
        this.node.querySelector('.js-infos').textContent += 'Race: DIEU CREATEUR\n';
      }
      else if (this.card.getType() == CARD_TYPE.MONSTER && this.card.getAttribute('RACE') == MONSTER_CARD_RACE.CYBERSE) {
        this.node.querySelector('.js-infos').textContent += 'Race: CYBORG\n';
      }

      this.node.querySelector('.js-infos').textContent += 'Description: ' + this.card.getText() + '\n';

      if (this.card.getType() == CARD_TYPE.MONSTER) {
        this.node.querySelector('.js-infos').innerHTML += `
        <div class="UICardDetail-body-infos-stats">
          <div class="UICardDetail-body-infos-stats-item">ATK ${this.card.getAttribute('ATK')}</div>
          <div class="UICardDetail-body-infos-stats-item">DEF ${this.card.getAttribute('DEF')}</div>
        </div>`;
      }
    }
    else {
      this.node.querySelector('.js-title').textContent = '--';
      this.node.querySelector('.js-cover-img').src = '';
      this.node.querySelector('.js-infos').textContent = '';
    }
  }

  setCard(card) {
    this.card = card ? card : null;
  }
}

export { UICardDetail };