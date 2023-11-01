import { MECHANIC_MAPPING } from './mappings/mechanic_mapping';
import { CARD_CONDITION } from './mappings/card_condition_mapping';
// ---------------------------------------------------------------------------------------

class Effect {
  constructor(card) {
    this.card = card;
    this.targetType = '';
    this.targetRange = '';
    this.targetCardConditionId = '';
    this.targetCardConditionOpts = {};
    this.mechanicId = '';
    this.mechanicOpts = {};
    this.targetCards = [];
  }

  async loadFromData(data) {
    this.targetType = data['TargetType'];
    this.targetRange = data['TargetRange'];
    this.targetCardConditionId = data['TargetCardConditionId'];
    this.targetCardConditionOpts = data['TargetCardConditionOpts'];
    this.mechanicId = data['MechanicId'];
    this.mechanicOpts = data['MechanicOpts'];
  }

  getTargetType() {
    return this.targetType;
  }

  getTargetRange() {
    return this.targetRange;
  }

  getTargetCards() {
    return this.targetCards;
  }

  isPresentTarget(duel) {
    let cardArray = duel.utilsQuery(this.card.getControler(), this.targetRange, card => card && CARD_CONDITION(this.targetCardConditionId, card, this.targetCardConditionOpts));
    if (cardArray.length == 0) {
      return false;
    }

    return true;
  }

  isTarget(duel, card) {
    let cardArray = duel.utilsQuery(this.card.getControler(), this.targetRange, card => card && CARD_CONDITION(this.targetCardConditionId, card, this.targetCardConditionOpts));
    if (cardArray.length == 0) {
      return false;
    }

    return cardArray.includes(card);
  }

  hasTargetCard(targetCard) {
    return this.targetCards.indexOf(targetCard) != -1;
  }

  addTargetCard(targetCard) {
    this.targetCards.push(targetCard);
  }

  removeTargetCard(targetCard) {
    this.targetCards.splice(this.targetCards.indexOf(targetCard), 1);
  }

  apply(duel, sourceCard, targetCard) {
    let mechanicFn = MECHANIC_MAPPING[this.mechanicId];
    mechanicFn(duel, sourceCard, this, targetCard, this.mechanicOpts);
  }
}

export { Effect };