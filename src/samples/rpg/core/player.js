import { eventManager } from '../../../lib/core/event_manager';
// ---------------------------------------------------------------------------------------
import { HeroCharacter } from './hero_character';
import { Inventory } from './inventory';
// ---------------------------------------------------------------------------------------

class Player {
  constructor() {
    this.gils = 0;
    this.inventory = null;
    this.heroes = [];
    this.variants = {};
  }

  async loadFromData(data) {
    this.gils = data['Gils'];
    this.inventory = new Inventory();
    this.inventory.loadFromData(data['Inventory']);

    for (let obj of data['Heroes']) {
      let hero = new HeroCharacter();
      hero.loadFromData(obj);
      this.heroes.push(hero);
    }

    for (let key in data['Variants']) {
      this.addVariant(key, data['Variants'][key]);
    }
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  increaseGils(amount) {
    this.gils += amount;
    eventManager.emit(this, 'E_GILS_CHANGED', { gils: this.gils });
  }

  decreaseGils(amount) {
    if (this.gils - amount < 0) {
      throw new Error('Player::decreaseGils(): gils cannot be negative !');
    }

    this.gils -= amount;
    eventManager.emit(this, 'E_GILS_CHANGED', { gils: this.gils });
  }

  addVariant(varloc, value) {
    if (this.variants.hasOwnProperty(varloc)) {
      throw new Error('Player::addVariant: varloc already exist in variants dictionnary');
    }

    this.variants[varloc] = value;
  }

  removeVariant(varloc) {
    if (!this.variants.hasOwnProperty(varloc)) {
      throw new Error('Player::removeVariant: varloc not exist in variants dictionnary');
    }

    delete this.variants[varloc];
  }

  setVariant(varloc, value) {
    if (!this.variants.hasOwnProperty(varloc)) {
      throw new Error('Player::setVariant: varloc not exist in variants dictionnary');
    }

    this.variants[varloc] = value;
  }

  hasVariant(varloc) {
    return this.variants.hasOwnProperty(varloc);
  }

  getVariant(varloc) {
    if (!this.variants.hasOwnProperty(varloc)) {
      throw new Error('Player::getVariant: varloc not exist in variants dictionnary');
    }

    return this.variants[varloc];
  }

  getGils() {
    return this.gils;
  }

  getInventory() {
    return this.inventory;
  }

  getHeroes() {
    return this.heroes;
  }
}

export { Player };