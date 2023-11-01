let CONDITION_MAPPING = {};

CONDITION_MAPPING['IS_ENDLESS'] = function (duel, opts = {}) {
  return false;
}

CONDITION_MAPPING['HAS_CARD_ID'] = function (duel, opts = { targetRange, cardId }) {
  let cards = duel.utilsQuery(duel.getCurrentDuelistIndex(), opts.targetRange, card => card);
  for (let card of cards) {
    if (card.getId() == opts.cardId) {
      return true;
    }
  }

  return false;
}

CONDITION_MAPPING['HAS_CARD_TYPE'] = function (duel, opts = { targetRange, cardType }) {
  let cards = duel.utilsQuery(duel.getCurrentDuelistIndex(), opts.targetRange, card => card);
  for (let card of cards) {
    if (card.getType() == opts.cardType) {
      return true;
    }
  }

  return false;
}

function CONDITION(id, duel, opts = {}) {
  if (id == '') {
    return true;
  }

  return CONDITION_MAPPING[id](duel, opts);
}

export { CONDITION };