let CONDITION_MAPPING = {};

CONDITION_MAPPING['SELF_HAS_LOWER_HP'] = function (battle, enemy, opts) {
  let r = (enemy.getAttribute('HP') / enemy.getAttribute('HP_MAX')) * 100;
  return r < opts.number;
}

CONDITION_MAPPING['ALLY_HAS_LOWER_HP'] = function (battle, enemy, opts) {
  for (let char of battle.getEnemies()) {
    let r = (char.getAttribute('HP') / char.getAttribute('HP_MAX')) * 100;
    if (char != enemy && r != 0 && r < opts.number) return true;
  }

  return false;
}

function CONDITION(id, battle, enemy, opts = {}) {
  if (id == '') {
    return true;
  }

  return CONDITION_MAPPING[id](battle, enemy, opts);
}

export { CONDITION };