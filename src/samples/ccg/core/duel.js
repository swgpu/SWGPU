import { eventManager } from '../../../lib/core/event_manager';
// ---------------------------------------------------------------------------------------
import { LOCATION, PHASE, CARD_POS, EFFECT_TARGET_TYPE, SPELL_CARD_NATURE, CARD_TYPE, HAND_MAX } from './enums';
import { HumanDuelist } from './human_duelist';
import { AIDuelist } from './ai_duelist';
import { ActivateAction } from './duel_actions';
import { Turn } from './turn';
import { Phase } from './phase';
// ---------------------------------------------------------------------------------------

class Duel {
  constructor() {
    this.duelists = [];
    this.turns = [];
    this.currentTurn = null;
    this.currentDuelistIndex = -1;
    this.opponentDuelistIndex = -1;
  }

  async loadFromData(data) {
    for (let i = 0; i < 2; i++) {
      let obj = data['DuelistIds'][i];
      let duelist = obj['TypeName'] == 'AIDuelist' ? new AIDuelist() : new HumanDuelist();
      await duelist.loadFromFile('samples/ccg/data/duelist_' + obj['Id'] + '/data.json');
      let deck = duelist.getDeck();

      for (let card of deck.getCards()) {
        card.setOwner(i);
        card.setControler(i);
        duelist.pushCard(LOCATION.DECK, card);
      }

      this.duelists.push(duelist);
    }
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  startup() {
    this.operationDraw(0, 4);
    this.operationDraw(1, 4);
    this.operationNewTurn();
  }

  async runAction(action) {
    let spellCards = this.utilsQuery(this.currentDuelistIndex, [[LOCATION.SZONE], [LOCATION.SZONE]], card => card);
    let cards = this.utilsQuery(this.currentDuelistIndex, [[LOCATION.MZONE, LOCATION.SZONE, LOCATION.FZONE], [LOCATION.MZONE, LOCATION.SZONE, LOCATION.FZONE]], card => card);

    // check triggers
    //
    for (let spellCard of spellCards) {
      if (spellCard.isTriggerable(this, action)) {
        await this.runAction(new ActivateAction(this, spellCard));
      }
    }

    // exec action
    //
    if (!action.isNegate()) {
      await action.exec();
    }
    else {
      return;
    }

    // check releases
    //
    for (let spellCard of spellCards) {
      if (spellCard.isReleasable(this)) {
        await this.operationDestroy(spellCard);
      }
    }

    // check & update target cards & status links
    //
    for (let spellCard of spellCards) {
      if (spellCard.getPosition() != CARD_POS.FACEUP) {
        continue;
      }
      if (spellCard.getNature() != SPELL_CARD_NATURE.CONTINUOUS) {
        continue;
      }

      for (let card of cards) {
        for (let effect of spellCard.getEffects()) {
          if (effect.getTargetType() != EFFECT_TARGET_TYPE.FIELD) {
            continue;
          }

          if (effect.hasTargetCard(card) && !effect.isTarget(this, card)) {
            effect.removeTargetCard(card);
            let attributes = card.getAttributes();
            attributes.removeModifierIf(m => m.isLinked() && m.getLinkedEffect() == effect);
          }
          else if (!effect.hasTargetCard(card) && effect.isTarget(this, card)) {
            effect.addTargetCard(card);
            effect.apply(this, spellCard, card);
          }
        }
      }

      for (let effect of spellCard.getEffects()) {
        if (effect.getTargetType() != EFFECT_TARGET_TYPE.SINGLE) {
          continue;
        }

        for (let targetCard of effect.getTargetCards()) {
          if (targetCard == null || !effect.isTargetConditionCheck(targetCard)) {
            await this.operationDestroy(spellCard);
          }
        }
      }
    }

    // check win/lost
    //
    if (this.duelists[0].getAttribute('LIFEPOINTS') == 0) {
      return 'WIN';
    }
    else if (this.duelists[1].getAttribute('LIFEPOINTS') == 0) {
      return 'LOST';
    }

    // check new turn
    //
    let currentPhase = this.currentTurn.getCurrentPhase();
    if (currentPhase.getId() == PHASE.END) {
      return this.operationNewTurn();
    }
  }

  getDuelists() {
    return this.duelists;
  }

  getDuelist(index) {
    return this.duelists[index];
  }

  getCurrentDuelist() {
    return this.duelists[this.currentDuelistIndex];
  }

  getOpponentDuelist() {
    return this.duelists[this.opponentDuelistIndex];
  }

  getCurrentTurn() {
    return this.currentTurn;
  }

  getCurrentDuelistIndex() {
    return this.currentDuelistIndex;
  }

  getOpponentDuelistIndex() {
    return this.opponentDuelistIndex;
  }

  async operationNewTurn() {
    if (this.currentDuelistIndex == -1) {
      this.currentDuelistIndex = 1;
      this.opponentDuelistIndex = 0;
    }
    else if (this.currentDuelistIndex == 0) {
      this.currentDuelistIndex = 1;
      this.opponentDuelistIndex = 0;
    }
    else {
      this.currentDuelistIndex = 0;
      this.opponentDuelistIndex = 1;
    }

    if (this.turns.length < 2) {
      let turn = new Turn();
      let phases = turn.getPhases();
      turn.addPhase(CREATE_PHASE_DRAW());
      turn.addPhase(CREATE_PHASE_MAIN());
      turn.addPhase(CREATE_PHASE_END());
      turn.setCurrentPhase(phases[0]);
      this.turns.push(turn);
      this.currentTurn = turn;
    }
    else {
      let turn = new Turn();
      let phases = turn.getPhases();
      turn.addPhase(CREATE_PHASE_DRAW());
      turn.addPhase(CREATE_PHASE_MAIN());
      turn.addPhase(CREATE_PHASE_BATTLE());
      turn.addPhase(CREATE_PHASE_END());
      turn.setCurrentPhase(phases[0]);
      this.turns.push(turn);
      this.currentTurn = turn;
    }

    for (let duelist of this.duelists) {
      duelist.setAttribute('DRAW_COUNT', 0);
      duelist.setAttribute('SUMMON_COUNT', 0);
    }

    for (let card of this.utilsQuery(this.currentDuelistIndex, [[LOCATION.SZONE, LOCATION.MZONE, LOCATION.FZONE], [LOCATION.SZONE, LOCATION.MZONE, LOCATION.FZONE]], card => card)) {
      if (card.getType() == CARD_TYPE.MONSTER) {
        card.setAttribute('ATK_COUNT', 0);
        card.incTurnCounter();
      }
      else if (card.getType() == CARD_TYPE.SPELL && card.getPosition() == CARD_POS.FACEUP) {
        card.incTurnCounter();
      }
    }

    if (this.duelists[this.currentDuelistIndex] instanceof AIDuelist) {
      this.duelists[this.currentDuelistIndex].handleNewTurn(this);
    }

    eventManager.emit(this, 'E_NEW_TURN');
  }

  async operationDraw(duelistIndex, numCards) {
    let handZone = this.duelists[duelistIndex].getZone(LOCATION.HAND);
    if (handZone.length + numCards > HAND_MAX) {
      for (let i = 0; i < handZone.length + numCards - HAND_MAX; i++) {
        let loc = await this.operationSelectLocation([[LOCATION.HAND], 0], card => card);
        this.duelists[duelistIndex].removeCard(LOCATION.HAND, loc.card);
      }
    }

    while (numCards-- > 0) {  
      let card = this.duelists[duelistIndex].popCard(LOCATION.DECK);
      this.duelists[duelistIndex].pushCard(LOCATION.HAND, card);
      card.setLocation(LOCATION.HAND);
    }
  }

  async operationRestore(duelistIndex, amount) {
    let attributes = this.duelists[duelistIndex].getAttributes();
    attributes.add('LIFEPOINTS', + amount);
    eventManager.emit(this.duelists[duelistIndex], 'E_RESTORE', { amount: amount });
  }

  async operationDamage(duelistIndex, amount) {
    let attributes = this.duelists[duelistIndex].getAttributes();
    attributes.add('LIFEPOINTS', - amount);
    eventManager.emit(this.duelists[duelistIndex], 'E_DAMAGE', { amount: amount });
  }

  async operationSummon(monsterCard, index) {
    this.duelists[monsterCard.getControler()].removeCard(LOCATION.HAND, monsterCard);
    this.duelists[monsterCard.getControler()].insertCard(LOCATION.MZONE, index, monsterCard);
    monsterCard.setPosition(CARD_POS.ATTACK);
    monsterCard.setLocation(LOCATION.MZONE);
  }

  async operationSet(spellCard, index) {
    this.duelists[spellCard.getControler()].removeCard(LOCATION.HAND, spellCard);
    this.duelists[spellCard.getControler()].insertCard(LOCATION.SZONE, index, spellCard);
    spellCard.setPosition(CARD_POS.FACEDOWN);
    spellCard.setLocation(LOCATION.SZONE);
  }

  async operationChangePosition(card, position) {
    card.setPosition(position);
  }

  async operationBattle(attackerCard, targetCard) {
    let targetValue = targetCard.getPosition() == CARD_POS.ATTACK ? targetCard.getAttribute('ATK') : targetCard.getAttribute('DEF');
    let damage = attackerCard.getAttribute('ATK') - targetValue;

    if (damage > 0) {
      this.operationDestroy(targetCard);
      this.operationDamage(targetCard.getControler(), Math.abs(damage));
    }
    else if (damage < 0) {
      this.operationDestroy(attackerCard);
      this.operationDamage(attackerCard.getControler(), Math.abs(damage));
    }
    else {
      this.operationDestroy(targetCard);
      this.operationDestroy(attackerCard);
    }
  }

  async operationNextPhase() {
    let phases = this.currentTurn.getPhases();
    let nextPhaseIndex = phases.indexOf(this.currentTurn.getCurrentPhase()) + 1;
    while (phases[nextPhaseIndex].isDisabled() && nextPhaseIndex < phases.length) {
      nextPhaseIndex++;
    }

    this.currentTurn.setCurrentPhase(phases[nextPhaseIndex]);
  }

  async operationChangePhase(phaseId) {
    let phase = this.currentTurn.getPhase(phaseId);
    if (!phase) {
      throw new Error('Duel::operationChangePhase : phase not found !');
    }
    if (phase.isDisabled()) {
      throw new Error('Duel::operationChangePhase : phase is disabled !');
    }

    this.currentTurn.setCurrentPhase(phase);
  }

  async operationIncDuelistAttribute(duelistIndex, attributeKey) {
    this.duelists[duelistIndex].incAttribute(attributeKey);
  }

  async operationAddDuelistModifier(duelistIndex, modifier) {
    let attributes = this.duelists[duelistIndex].getAttributes();
    attributes.addModifier(modifier);
  }

  async operationIncCardAttribute(card, attributeKey) {
    card.incAttribute(attributeKey);
  }

  async operationAddCardModifier(card, modifier) {
    let attributes = card.getAttributes();
    attributes.addModifier(modifier);
  }

  async operationDestroy(card) {
    if (card.getType() == CARD_TYPE.SPELL) {
      for (let effect of card.getEffects()) {
        for (let targetCard of effect.getTargetCards()) {
          let attributes = targetCard.getAttributes();
          attributes.removeModifierIf(m => m.isLinked() && m.getLinkedEffect() == effect);
        }

        for (let duelist of this.duelists) {
          let attributes = duelist.getAttributes();
          attributes.removeModifierIf(m => m.isLinked() && m.getLinkedEffect() == effect);
        }
      }
    }

    this.utilsRemoveCard(card);
    this.duelists[card.getControler()].pushCard(LOCATION.GRAVEYARD, card);
    card.setPosition(CARD_POS.FACEDOWN);
    card.setLocation(LOCATION.GRAVEYARD);
  }

  async operationActivateCardEffect(spellCard, effectIndex) {
    let targetCards = [];
    let effects = spellCard.getEffects();
    let effect = effects[effectIndex];
    let controler = spellCard.getControler();

    if (effect.getTargetType() == EFFECT_TARGET_TYPE.SINGLE) {
      let loc = await this.duelists[controler].selectRequiredLocation(effect.getTargetRange(), card => card && effect.isTarget(this, card));
      targetCards.push(loc.card);
    }
    else if (effect.getTargetType() == EFFECT_TARGET_TYPE.FIELD) {
      targetCards = this.utilsQuery(controler, effect.getTargetRange(), card => card && effect.isTarget(this, card));
    }
    else if (effect.getTargetType() == EFFECT_TARGET_TYPE.NONE) {
      targetCards = [null];
    }

    for (let targetCard of targetCards) {
      effect.apply(this, spellCard, targetCard);
      effect.addTargetCard(targetCard);
    }
  }

  utilsRemoveCard(card) {
    let duelist = this.duelists[card.getOwner()];

    if (card.getLocation() == LOCATION.MZONE || card.getLocation() == LOCATION.SZONE || card.getLocation() == LOCATION.FZONE) {
      let zone = duelist.getZone(card.getLocation());
      let index = zone.indexOf(card);
      duelist.insertCard(card.getLocation(), index, null);
    }
    else {
      duelist.removeCard(card.getLocation(), card);
    }
  }

  utilsQuery(duelistIndex, range, cardPredicate = (card) => true) {
    let cards = [];
    let currentDuelistIndex = duelistIndex;
    let opponentDuelistIndex = duelistIndex == 0 ? 1 : 0;

    for (let i = 0; i < 2; i++) {
      if (range[i] == 0) {
        continue;
      }

      let rangeDuelistIndex = i == 0 ? currentDuelistIndex : opponentDuelistIndex;
      for (let j = 0; j < range[i].length; j++) {
        let zone = this.duelists[rangeDuelistIndex].getZone(range[i][j]);
        cards = cards.concat(zone.filter(cardPredicate));
      }
    }

    return cards;
  }
}

export { Duel };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function CREATE_PHASE_DRAW() {
  return new Phase(PHASE.DRAW, 'Draw Phase', false);
}

function CREATE_PHASE_MAIN() {
  return new Phase(PHASE.MAIN, 'Main Phase', false);
}

function CREATE_PHASE_BATTLE() {
  return new Phase(PHASE.BATTLE, 'Battle Phase', false);
}

function CREATE_PHASE_END() {
  return new Phase(PHASE.END, 'End Phase', false);
}