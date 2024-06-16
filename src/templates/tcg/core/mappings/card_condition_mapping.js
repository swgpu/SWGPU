let CARD_CONDITION_MAPPING = {};

CARD_CONDITION_MAPPING['IS_RACE'] = function (card, opts = { race }) {
  return card.getAttribute('RACE') == opts.race;
}

CARD_CONDITION_MAPPING['IS_TYPE'] = function (card, opts = { type }) {
  return card.getType() == opts.type;
}

CARD_CONDITION_MAPPING['IS_ID'] = function (card, opts = { id }) {
  return card.getId() == opts.id;
}

function CARD_CONDITION(id, card, opts = {}) {
  if (id == '') {
    return true;
  }

  return CARD_CONDITION_MAPPING[id](card, opts);
}

export { CARD_CONDITION };