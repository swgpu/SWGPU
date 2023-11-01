import { Seal } from '../seal';
let MECHANIC_MAPPING = {};

MECHANIC_MAPPING['RESTORE'] = async function (fromChar, toChar, opts = { amount, element }) {
  await toChar.increaseHP(opts.amount, opts.element);
}

MECHANIC_MAPPING['DAMAGE'] = async function (fromChar, toChar, opts = { amount, element }) {
  await toChar.decreaseHP(opts.amount, opts.element);
}

MECHANIC_MAPPING['INCREASE_MANA'] = async function (fromChar, toChar, opts = { amount }) {
  await toChar.increaseHP(opts.amount);
}

MECHANIC_MAPPING['DECREASE_MANA'] = async function (fromChar, toChar, opts = { amount }) {
  await toChar.decreaseHP(opts.amount);
}

MECHANIC_MAPPING['ADD_SEAL'] = async function (fromChar, toChar, opts = { sealId }) {
  let seal = Seal.createFromFile('samples/rpg/data/' + opts.sealId + '/data.json');
  seal.fromChar = fromChar;
  await toChar.addSeal(seal);
}

MECHANIC_MAPPING['REMOVE_SEAL'] = async function (fromChar, toChar, opts = { sealId }) {
  for (let seal of toChar.getActiveSeals()) {
    if (seal.getId() == sealId) {
      await toChar.removeSeal(seal);
    }
  }
}

function MECHANIC(id, fromChar, toChar, opts = {}) {
  if (id == '') {
    return true;
  }

  return MECHANIC_MAPPING[id](fromChar, toChar, opts);
}

export { MECHANIC };