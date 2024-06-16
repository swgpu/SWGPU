let CHAR_CONDITION_MAPPING = {};

CHAR_CONDITION_MAPPING['IS_ALL'] = function (fromChar, toChar, opts) {
  return true;
}

CHAR_CONDITION_MAPPING['IS_SELF'] = function (fromChar, toChar, opts) {
  return fromChar == toChar;
}

CHAR_CONDITION_MAPPING['IS_ALLY'] = function (fromChar, toChar, opts) {
  return fromChar.constructor.name == toChar.constructor.name;
}

CHAR_CONDITION_MAPPING['IS_ALIVE_ALLY'] = function (fromChar, toChar, opts) {
  return toChar.getAttribute('HP') > 0 && fromChar.constructor.name == toChar.constructor.name;
}

CHAR_CONDITION_MAPPING['IS_OPPONENT'] = function (fromChar, toChar, opts) {
  return fromChar.constructor.name != toChar.constructor.name;
}

CHAR_CONDITION_MAPPING['IS_ALIVE_OPPONENT'] = function (fromChar, toChar, opts) {
  return toChar.getAttribute('HP') > 0 && fromChar.constructor.name != toChar.constructor.name;
}

function CHAR_CONDITION(id, fromChar, toChar, opts = {}) {
  if (id == '') {
    return true;
  }

  return CHAR_CONDITION_MAPPING[id](fromChar, toChar, opts);
}

export { CHAR_CONDITION };