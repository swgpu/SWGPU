import { CARD_POS, SPELL_CARD_NATURE } from './enums';
// ---------------------------------------------------------------------------------------

class Action {
  constructor(duel) {
    this.duel = duel;
    this.negate = false;
  }

  isNegate() {
    return this.negate;
  }

  setNegate(negate) {
    this.negate = negate;
  }

  async exec() {
    return true;
  }
}

class DirectAttackAction extends Action {
  constructor(duel, attackerCard) {
    super(duel);
    this.attackerCard = attackerCard;
  }

  async exec() {
    await this.duel.operationDamage(this.duel.getOpponentDuelistIndex(), this.attackerCard.getAttribute('ATK'));
    await this.duel.operationIncCardAttribute(this.attackerCard, 'ATK_COUNT');
  }
}

class DrawAction extends Action {
  constructor(duel) {
    super(duel);
  }

  async exec() {
    await this.duel.operationDraw(this.duel.getCurrentDuelistIndex(), 1);
    await this.duel.operationIncDuelistAttribute(this.duel.getCurrentDuelistIndex(), 'DRAW_COUNT');
  }
}

class SummonAction extends Action {
  constructor(duel, monsterCard, index) {
    super(duel);
    this.monsterCard = monsterCard;
    this.index = index;
  }

  async exec() {
    await this.duel.operationSummon(this.monsterCard, this.index);
    await this.duel.operationIncDuelistAttribute(this.duel.getCurrentDuelistIndex(), 'SUMMON_COUNT');
  }
}

class SetAction extends Action {
  constructor(duel, spellCard, index) {
    super(duel);
    this.spellCard = spellCard;
    this.index = index;
  }

  async exec() {
    await this.duel.operationSet(this.spellCard, this.index);
  }
}

class ChangePositionAction extends Action {
  constructor(duel, monsterCard) {
    super(duel);
    this.monsterCard = monsterCard;
  }

  async exec() {
    let position = this.monsterCard.getPosition() == CARD_POS.ATTACK ? CARD_POS.DEFENSE : CARD_POS.ATTACK;
    this.duel.operationChangePosition(this.monsterCard, position);
  }
}

class BattleAction extends Action {
  constructor(duel, attackerCard, targetCard) {
    super(duel);
    this.attackerCard = attackerCard;
    this.targetCard = targetCard;
  }

  async exec() {
    if (this.targetCard) {
      await this.duel.operationBattle(this.attackerCard, this.targetCard);
      await this.duel.operationIncCardAttribute(this.attackerCard, 'ATK_COUNT');
    }
    else {
      await this.duel.runAction(new DirectAttackAction(this.duel, this.attackerCard));      
    }
  }
}

class NextPhaseAction extends Action {
  constructor(duel) {
    super(duel);
  }

  async exec() {
    await this.duel.operationNextPhase();
  }
}

class ActivateAction extends Action {
  constructor(duel, spellCard) {
    super(duel);
    this.spellCard = spellCard;
  }

  async exec() {
    await this.duel.operationChangePosition(this.spellCard, CARD_POS.FACEUP);

    for (let i = 0; i < this.spellCard.getEffects().length; i++) {
      await this.duel.runAction(new ActivateCardEffectInternalAction(this.duel, this.spellCard, i));
    }

    if (this.spellCard.getNature() == SPELL_CARD_NATURE.NORMAL) {
      await this.duel.operationDestroy(this.spellCard);
    }
  }
}

class ActivateCardEffectInternalAction extends Action {
  constructor(duel, spellCard, effectIndex) {
    super(duel);
    this.spellCard = spellCard;
    this.effectIndex = effectIndex;
  }

  async exec() {
    await this.duel.operationActivateCardEffect(this.spellCard, this.effectIndex);
  }
}

export { DirectAttackAction };
export { DrawAction };
export { SummonAction };
export { SetAction };
export { ChangePositionAction };
export { BattleAction };
export { NextPhaseAction };
export { ActivateAction };