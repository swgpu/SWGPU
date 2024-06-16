let CHAR_SORT_MAPPING = {};

CHAR_SORT_MAPPING['LOWEST_HP'] = function (a, b) {
  return a.getAttribute('HP') - b.getAttribute('HP');
}

CHAR_SORT_MAPPING['HIGHEST_HP'] = function (a, b) {
  return b.getAttribute('HP') - a.getAttribute('HP');
}

function CHAR_SORT(id, chars) {
  if (id == '') {
    return chars.sort((a, b) => a.getId() - b.getId());
  }

  return chars.sort((a, b) => CHAR_SORT_MAPPING[id](a, b));
}

export { CHAR_SORT };