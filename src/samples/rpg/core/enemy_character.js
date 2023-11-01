import { CharacterAbstract } from './character_abstract';
import { Effect } from './effect';
import { CONDITION } from './mappings/condition_mapping';
import { CHAR_SORT } from './mappings/char_sort_mapping';
// ---------------------------------------------------------------------------------------

class EnemyCharacter extends CharacterAbstract {
  constructor() {
    super();
    this.gils = 0;
    this.patterns = [];
    this.position = [0, 0, 0];
  }

  async loadFromData(data) {
    this.gils = data['Gils'];

    for (let obj of data['Patterns']) {
      let pattern = new EnemyPattern();
      await pattern.loadFromData(obj);
      this.patterns.push(pattern);
    }

    await super.loadFromData(data);
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  getGils() {
    return this.gils;
  }

  getPatterns() {
    return this.patterns;
  }

  getPosition() {
    return this.position;
  }

  setPosition(position) {
    this.position = position;
  }
}

class EnemyPattern {
  constructor() {
    this.name = '';
    this.effect = null;
    this.priority = 0;
    this.conditionId = '';
    this.conditionOpts = {};
    this.targetCharSortId = '';
  }

  async loadFromData(data) {
    this.name = data['Name'];
    this.effect = new Effect();
    await this.effect.loadFromFile('samples/rpg/data/effect_' + data['EffectId'] + '/data.json');
    this.priority = data['Priority'];
    this.conditionId = data['ConditionId'];
    this.conditionOpts = data['ConditionOpts'];
    this.targetCharSortId = data['TargetCharSortId'];
  }

  isConditionCheck(battle, enemy) {
    return CONDITION(this.conditionId, battle, enemy, this.conditionOpts);
  }

  targetCharSort(chars) {
    return CHAR_SORT(this.targetCharSortId, chars);
  }
}

export { EnemyCharacter };
export { EnemyPattern };