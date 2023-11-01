let TRIGGER_CONDITION_MAPPING = {};

TRIGGER_CONDITION_MAPPING['IS_EFFECT_CARD_MODIFIER_SET_STATE_FREEZE'] = function (duel, card, action, opts = {}) {
  return (
    action instanceof ActivateEffectInternalAction &&
    action.effect.mechanicId == 'ADD_CARD_MODIFIER' &&
    action.effect.mechanicOpts.modifierData.Type == 'SET' &&
    action.effect.mechanicOpts.modifierData.AttributeKey == 'STATE_FREEZE' &&
    action.effect.mechanicOpts.modifierData.Value == 1
  );
}

function TRIGGER_CONDITION(id, duel, card, action, opts = {}) {
  if (id == '') {
    return true;
  }

  return TRIGGER_CONDITION_MAPPING[id](duel, card, action, opts);
}

export { TRIGGER_CONDITION };