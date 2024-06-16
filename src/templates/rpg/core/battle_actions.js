class BattleAction {
  constructor(battle) {
    this.battle = battle;
  }

  async exec() {}
}

class LetBattleAction extends BattleAction {
  constructor(battle, fromChar) {
    super(battle);
    this.fromChar = fromChar;
  }

  async exec() {
    await this.battle.operationLet(this.fromChar);
  }
}

class ApplyEffectBattleAction extends BattleAction {
  constructor(battle, effect, fromChar, toChar) {
    super(battle);
    this.effect = effect;
    this.fromChar = fromChar;
    this.toChar = toChar;
  }

  async exec() {
    await this.battle.operationApplyEffect(this.effect, this.fromChar, this.toChar);
  }
}

class ApplyItemBattleAction extends BattleAction {
  constructor(battle, item, fromChar, toChar) {
    super(battle);
    this.item = item;
    this.fromChar = fromChar;
    this.toChar = toChar;
  }

  async exec() {
    await this.battle.operationApplyItem(this.item, this.fromChar, this.toChar);
  }
}

class NewTurnBattleAction extends BattleAction {
  constructor(battle) {
    super(battle);
  }

  async exec() {
    await this.battle.operationNewTurn();
  }
}

export { LetBattleAction };
export { ApplyEffectBattleAction };
export { ApplyItemBattleAction };
export { NewTurnBattleAction };