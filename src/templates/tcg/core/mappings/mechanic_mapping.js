import { Modifier } from '../modifier';

// -------------------------------------------------------------------------------------------
// MECHANIC MAPPING - (duel, card, effect, targetCard, opts)
// -------------------------------------------------------------------------------------------

let MECHANIC_MAPPING = {};

MECHANIC_MAPPING['NEW_TURN'] = async function (duel, card, effect, targetCard, opts = {}) {
  await duel.operationNewTurn();
}

MECHANIC_MAPPING['DRAW'] = async function (duel, card, effect, targetCard, opts = { numCards }) {
  await duel.operationDraw(card.getControler(), opts.numCards);
}

MECHANIC_MAPPING['CHANGE_PHASE'] = async function (duel, card, effect, targetCard, opts = { phaseId }) {
  await duel.operationChangePhase(opts.phaseId);
}

MECHANIC_MAPPING['DAMAGE_SELF'] = async function (duel, card, effect, targetCard, opts = { amount }) {
  await duel.operationDamage(card.getControler(), opts.amount);
}

MECHANIC_MAPPING['DAMAGE_OPPONENT'] = async function (duel, card, effect, targetCard, opts = { amount }) {
  await duel.operationDamage(OPPONENT_OF(card.getControler()), opts.amount);
}

MECHANIC_MAPPING['RESTORE_SELF'] = async function (duel, card, effect, targetCard, opts = { amount }) {
  await duel.operationRestore(card.getControler(), opts.amount);
}

MECHANIC_MAPPING['RESTORE_OPPONENT'] = async function (duel, card, effect, targetCard, opts = { amount }) {
  await duel.operationRestore(OPPONENT_OF(card.getControler()), opts.amount);
}

MECHANIC_MAPPING['DESTROY'] = async function (duel, card, effect, targetCard, opts = {}) {
  await duel.operationDestroy(targetCard);
}

MECHANIC_MAPPING['ADD_MODIFIER_TO_SELF'] = async function (duel, card, effect, targetCard, opts = { modifierData }) {
  let modifier = new Modifier();
  await modifier.loadFromData(opts.modifierData);
  modifier.setLinkedEffect(modifier.isLinked() ? effect : null);
  await duel.operationAddDuelistModifier(card.getControler(), modifier);
}

MECHANIC_MAPPING['ADD_CARD_MODIFIER'] = async function (duel, card, effect, targetCard, opts = { modifierData }) {
  let modifier = new Modifier();
  await modifier.loadFromData(opts.modifierData);
  modifier.setLinkedEffect(modifier.isLinked() ? effect : null);
  await duel.operationAddCardModifier(targetCard, modifier);
}

export { MECHANIC_MAPPING };

const OPPONENT_OF = (duelistIndex) => duelistIndex == 0 ? 1 : 0;