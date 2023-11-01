let CARD_SORT_MAPPING = {};

CARD_SORT_MAPPING['LOWEST_ATK'] = function (a, b) {
  return a.getAttribute('ATK') - b.getAttribute('ATK');
}

CARD_SORT_MAPPING['HIGHEST_ATK'] = function (a, b) {
  return b.getAttribute('ATK') - a.getAttribute('ATK');
}

function CARD_SORT(id, cards) {
  if (id == '') {
    return cards.sort((a, b) => a.getId() - b.getId());
  }

  return cards.sort((a, b) => CARD_SORT_MAPPING[id](a, b));
}

export { CARD_SORT };