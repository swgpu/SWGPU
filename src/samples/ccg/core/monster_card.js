import { LOCATION, CARD_POS } from './enums';
import { CardAbstract } from './card_abstract';
// ---------------------------------------------------------------------------------------

class MonsterCard extends CardAbstract {
  constructor() {
    super(); // attributes: [RACE, ATK, DEF, ATK_COUNT, ATK_COUNT_LIMIT, STATE_FREEZE]
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  isSummonable() {
    if (this.location != LOCATION.HAND) {
      return false;
    }

    return true;
  }

  isCapableAttack() {
    if (this.location != LOCATION.MZONE) {
      return false;
    }
    if (this.position != CARD_POS.ATTACK) {
      return false;
    }
    if (this.attributes.get('ATK_COUNT') >= this.attributes.get('ATK_COUNT_LIMIT')) {
      return false;
    }

    return true;
  }

  isCapableChangePosition() {
    if (this.attributes.get('STATE_FREEZE') == 1) {
      return false;
    }

    return true;
  }
}

export { MonsterCard };