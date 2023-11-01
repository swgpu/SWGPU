import { eventManager } from '../../../lib/core/event_manager';
// ---------------------------------------------------------------------------------------
import { CHAR_CONDITION } from './mappings/char_condition_mapping';
import { MECHANIC } from './mappings/mechanic_mapping';
import { ITEM_AVAILABILITY_TYPE } from './enums';
// ---------------------------------------------------------------------------------------

class Effect {
  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.cost = 0;
    this.spriteAnimationName = '';
    this.availabilityType = '';
    this.mechanicId = '';
    this.mechanicOpts = {};
    this.targetCharConditionId = '';
    this.targetCharConditionOpts = {};
  }

  async loadFromData(data) {
    this.id = data['Id'];
    this.name = data['Name'];
    this.description = data['Description'];
    this.cost = data['Cost'];
    this.spriteAnimationName = data['SpriteAnimationName'];
    this.availabilityType = data['AvailabilityType'];
    this.mechanicId = data['MechanicId'];
    this.mechanicOpts = data['MechanicOpts'];
    this.targetCharConditionId = data['TargetCharConditionId'];
    this.targetCharConditionOpts = data['TargetCharConditionOpts'];
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  isMenuAvailable() {
    return this.availabilityType == ITEM_AVAILABILITY_TYPE.ALL || this.availabilityType == ITEM_AVAILABILITY_TYPE.MENU;
  }

  isBattleAvailable() {
    return this.availabilityType == ITEM_AVAILABILITY_TYPE.ALL || this.availabilityType == ITEM_AVAILABILITY_TYPE.BATTLE;
  }

  isUsable(fromChar) {
    return this.cost <= fromChar.getAttribute('MP');
  }

  isTargetCharConditionCheck(fromChar, toChar) {
    return CHAR_CONDITION(this.targetCharConditionId, fromChar, toChar, this.targetCharConditionOpts);
  }

  async apply(fromChar, toChar) {
    await eventManager.emit(toChar, 'E_EFFECT_INFLICT', { effect: this });
    await MECHANIC(this.mechanicId, fromChar, toChar, this.mechanicOpts);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getCost() {
    return this.cost;
  }

  getSpriteAnimationName() {
    return this.spriteAnimationName;
  }

  getAvailabilityType() {
    return this.availabilityType;
  }

  getMechanicId() {
    return this.mechanicId;
  }

  getMechanicOpts() {
    return this.mechanicOpts;
  }

  getTargetCharConditionId() {
    return this.targetCharConditionId;
  }

  getTargetCharConditionOpts() {
    return this.targetCharConditionOpts;
  }
}

export { Effect };