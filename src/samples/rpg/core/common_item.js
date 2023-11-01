import { ItemAbstract } from './item_abstract';
import { Effect } from './effect';
// ---------------------------------------------------------------------------------------

class CommonItem extends ItemAbstract {
  constructor() {
    super();
    this.effect = null;
  }

  async loadFromData(data) {
    if (data.hasOwnProperty('Effect')) {
      this.effect = new Effect();
      await this.effect.loadFromData(data['Effect']);
    }

    super.loadFromData(data);
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  apply(fromChar, toChar) {
    this.effect.apply(fromChar, toChar);
  }

  isMenuAvailable() {
    return this.effect && this.effect.isMenuAvailable();
  }

  isTarget(fromChar, toChar) {
    return this.effect && this.effect.isTargetCharConditionCheck(fromChar, toChar);
  }

  hasEffect() {
    return this.effect ? true : false;
  }

  getEffect() {
    return this.effect;
  }
}

export { CommonItem };