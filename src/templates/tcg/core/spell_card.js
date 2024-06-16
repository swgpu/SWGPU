import { SPELL_CARD_MODE, SPELL_CARD_NATURE, LOCATION, CARD_POS } from './enums';
import { CONDITION } from './mappings/condition_mapping';
import { TRIGGER_CONDITION } from './mappings/trigger_condition_mapping';
import { CardAbstract } from './card_abstract';
import { Effect } from './effect';
// ---------------------------------------------------------------------------------------

class SpellCard extends CardAbstract {
  constructor() {
    super();
    this.mode = '';
    this.nature = '';
    this.activateConditionId = '';
    this.activateConditionOpts = {};
    this.triggerConditionId = '';
    this.triggerConditionOpts = {};
    this.releaseConditionId = '';
    this.releaseConditionOpts = {};
    this.effects = [];
  }

  async loadFromData(data) {
    this.mode = data['Mode'];
    this.nature = data['Nature'];

    if (data.hasOwnProperty('ActivateConditionId')) {
      this.activateConditionId = data['ActivateConditionId'];
      this.activateConditionOpts = data['ActivateConditionOpts'];
    }

    if (data.hasOwnProperty('TriggerConditionId')) {
      this.triggerConditionId = data['TriggerConditionId'];
      this.triggerConditionOpts = data['TriggerConditionOpts'];
    }

    if (data.hasOwnProperty('ReleaseConditionId')) {
      this.releaseConditionId = data['ReleaseConditionId'];
      this.releaseConditionOpts = data['ReleaseConditionOpts'];
    }

    for (let obj of data['Effects']) {
      let effect = new Effect(this);
      await effect.loadFromData(obj);
      this.effects.push(effect);
    }

    super.loadFromData(data);
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  getMode() {
    return this.mode;
  }

  getNature() {
    return this.nature;
  }

  getEffects() {
    return this.effects;
  }

  isSetable() {
    if (this.location != LOCATION.HAND) {
      return false;
    }

    return true;
  }

  isActiveatable(duel) {
    if (this.mode != SPELL_CARD_MODE.ACTIVATE) {
      return false;
    }
    if (this.location != LOCATION.SZONE) {
      return false;
    }
    if (this.position != CARD_POS.FACEDOWN) {
      return false;
    }

    for (let effect of this.effects) {
      if (!effect.isPresentTarget(duel)) {
        return false;
      }
    }

    return CONDITION(this.activateConditionId, duel, this.activateConditionOpts);
  }

  isTriggerable(duel, action) {
    if (this.mode != SPELL_CARD_MODE.TRIGGER) {
      return false;
    }
    if (this.location != LOCATION.SZONE) {
      return false;
    }
    if (this.position != CARD_POS.FACEDOWN) {
      return false;
    }

    for (let effect of this.effects) {
      if (!effect.isPresentTarget(duel)) {
        return false;
      }
    }

    return TRIGGER_CONDITION(this.triggerConditionId, duel, this, action, this.triggerConditionOpts);
  }

  isReleasable(duel) {
    if (this.nature != SPELL_CARD_NATURE.CONTINUOUS) {
      return false;
    }
    if (this.location != LOCATION.SZONE) {
      return false;
    }
    if (this.position != CARD_POS.FACEUP) {
      return false;
    }

    return CONDITION(this.releaseConditionId, duel, this.releaseConditionOpts);
  }
}

export { SpellCard };