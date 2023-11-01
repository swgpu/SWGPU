import { UT } from '../../../lib/core/utils';
// ---------------------------------------------------------------------------------------
import { DuelistAbstract } from './duelist_abstract';
import { DirectAttackAction, DrawAction, SummonAction, SetAction, ChangePositionAction, BattleAction, NextPhaseAction, ActivateAction } from './duel_actions';
import { CONDITION } from './mappings/condition_mapping';
import { CARD_CONDITION } from './mappings/card_condition_mapping';
import { CARD_SORT } from './mappings/card_sort_mapping';
import { LOCATION } from './enums';
// ---------------------------------------------------------------------------------------

class AIDuelist extends DuelistAbstract {
  constructor() {
    super();
    this.behaviors = [];
  }

  async loadFromData(data) {
    for (let obj of data['OverBehaviors']) {
      let behavior = CREATE_BEHAVIOR(obj['Id']);
      await behavior.loadFromData(obj);
      this.behaviors.push(behavior);
    }

    for (let obj of data['Behaviors']) {
      let behavior = CREATE_BEHAVIOR(obj['Id']);
      await behavior.loadFromData(obj);
      this.behaviors.push(behavior);
    }

    await super.loadFromData(data);
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  async selectLocation(duel, range, predicateCard = () => true) {
    let duelists = duel.getDuelists();
    let duelistIndex = duelists.indexOf(this);

    let cards = duel.utilsQuery(duelistIndex, range, card => predicateCard(card));
    if (cards.length == 0) {
      return false;
    }

    let response = {};
    response.state = true;
    response.location = '';
    response.index = -1;
    response.card = cards[0];
    return response;
  }

  async selectRequiredLocation(duel, range, predicateCard = () => true) {
    let duelists = duel.getDuelists();
    let duelistIndex = duelists.indexOf(this);

    let cards = duel.utilsQuery(duelistIndex, range, card => predicateCard(card));
    if (cards.length == 0) {
      return false;
    }

    let response = {};
    response.state = true;
    response.location = '';
    response.index = -1;
    response.card = cards[0];
    return response;
  }

  async handleNewTurn(duel) {
    while (duel.getCurrentDuelist() == this) {
      for (let behavior of this.behaviors) {
        await behavior.process(duel);
      }

      await duel.runAction(new NextPhaseAction(duel));
      await UT.WAIT(2000);
    }
  }
}

class AIBehavior {
  constructor() {
    this.id = '';
    this.opts = {};
    this.repeat = 1;
    this.probability = 1;
    this.conditionId = '';
    this.conditionOpts = {};
    this.cardConditionId = '';
    this.cardConditionOpts = {};
    this.cardSortId = '';
    this.targetCardConditionId = '';
    this.targetCardConditionOpts = {};
    this.targetCardSortId = '';
  }

  async loadFromData(data) {
    this.id = data['Id'];

    if (data.hasOwnProperty('Opts')) {
      this.opts = data['Opts'];
    }

    if (data.hasOwnProperty('Repeat')) {
      this.repeat = data['Repeat'] == 'X' ? 99 : data['Repeat'];
    }

    if (data.hasOwnProperty('Probability')) {
      this.probability = data['Probability'];
    }

    if (data.hasOwnProperty('ConditionId')) {
      this.conditionId = data['ConditionId'];
      this.conditionOpts = data['ConditionOpts'];
    }

    if (data.hasOwnProperty('CardConditionId')) {
      this.cardConditionId = data['CardConditionId'];
      this.cardConditionOpts = data['CardConditionOpts'];
    }

    if (data.hasOwnProperty('CardSortId')) {
      this.cardSortId = data['CardSortId'];
    }

    if (data.hasOwnProperty('TargetCardConditionId')) {
      this.targetCardConditionId = data['TargetCardConditionId'];
      this.targetCardConditionOpts = data['TargetCardConditionOpts'];
    }

    if (data.hasOwnProperty('TargetCardSortId')) {
      this.targetCardSortId = data['TargetCardSortId'];
    }
  }

  async process(duel) {
    if (!CONDITION(this.conditionId, duel, this.conditionOpts)) {
      return;
    }

    if (Math.random() > this.probability) {
      return;
    }

    for (let i = 0; i < this.repeat; i++) {
      await this.onProcess(duel);
    }
  }

  async onProcess(duel) {
    // virtual method.
  }
}

class DrawBehavior extends AIBehavior {
  constructor() {
    super();
  }

  async onProcess(duel) {
    let duelist = duel.getCurrentDuelist();
    while (duelist.isCapableDraw(duel)) {
      await duel.runAction(new DrawAction(duel));
    }
  }
}

class SummonBehavior extends AIBehavior {
  constructor() {
    super();
  }

  async onProcess(duel) {
    let duelist = duel.getCurrentDuelist();
    let duelistIndex = duel.getCurrentDuelistIndex();

    if (!duelist.isCapableSummon(duel)) {
      return;
    }

    let cards = duel.utilsQuery(duelistIndex, [[LOCATION.HAND], 0], card => {
      return card && card.isSummonable() && CARD_CONDITION(this.cardConditionId, card, this.cardConditionOpts)
    });

    if (cards.length == 0) {
      return;
    }

    cards = CARD_SORT(this.cardSortId, cards);
    let index = duelist.getZone(LOCATION.MZONE).findIndex(s => s == null);
    await duel.runAction(new SummonAction(duel, cards[0], index));
  }
}

class SetBehavior extends AIBehavior {
  constructor() {
    super();
  }

  async onProcess(duel) {
    let duelist = duel.getCurrentDuelist();
    let duelistIndex = duel.getCurrentDuelistIndex();

    if (!duelist.isCapableSet(duel)) {
      return;
    }

    let cards = duel.utilsQuery(duelistIndex, [[LOCATION.HAND], 0], card => {
      return card && card.isSetable() && CARD_CONDITION(this.cardConditionId, card, this.cardConditionOpts)
    });

    if (cards.length == 0) {
      return;
    }

    cards = CARD_SORT(this.cardSortId, cards);
    let index = duelist.getZone(LOCATION.SZONE).findIndex(s => s == null);
    await duel.runAction(new SetAction(duel, cards[0], index));
  }
}

class ChangePositionBehavior extends AIBehavior {
  constructor() {
    super();
  }

  async onProcess(duel) {
    let duelist = duel.getCurrentDuelist();
    let duelistIndex = duel.getCurrentDuelistIndex();

    if (!duelist.isCapableChangePosition(duel)) {
      return;
    }

    let cards = duel.utilsQuery(duelistIndex, [[LOCATION.MZONE], [LOCATION.MZONE]], card => {
      return card && card.getControler() == duelistIndex && card.isCapableChangePosition() && CARD_CONDITION(this.cardConditionId, card, this.cardConditionOpts)
    });

    if (cards.length == 0) {
      return;
    }

    cards = CARD_SORT(this.cardSortId, cards);
    await duel.runAction(new ChangePositionAction(duel, cards[0]));
  }
}

class BattleBehavior extends AIBehavior {
  constructor() {
    super();
  }

  async onProcess(duel) {
    let duelist = duel.getCurrentDuelist();
    let duelistIndex = duel.getCurrentDuelistIndex();

    if (!duelist.isCapableBattle(duel)) {
      return;
    }

    let cards = duel.utilsQuery(duelistIndex, [[LOCATION.MZONE], [LOCATION.MZONE]], card => {
      return card && card.getControler() == duelistIndex && card.isCapableAttack() && CARD_CONDITION(this.cardConditionId, card, this.cardConditionOpts)
    });

    if (cards.length == 0) {
      return;
    }

    let targets = duel.utilsQuery(duelistIndex, [[LOCATION.MZONE], [LOCATION.MZONE]], card => {
      return card && card.getControler() != duelistIndex && CARD_CONDITION(this.targetCardConditionId, card, this.targetCardConditionOpts)
    });

    if (targets.length == 0) {
      cards = CARD_SORT(this.cardSortId, cards);
      await duel.runAction(new DirectAttackAction(duel, cards[0]));
    }
    else {
      cards = CARD_SORT(this.cardSortId, cards);
      targets = CARD_SORT(this.targetCardSortId, targets);
      await duel.runAction(new BattleAction(duel, cards[0], targets[0]));
    }
  }
}

class ActivateBehavior extends AIBehavior {
  constructor() {
    super();
  }

  async onProcess(duel) {
    let duelist = duel.getCurrentDuelist();
    let duelistIndex = duel.getCurrentDuelistIndex();

    if (!duelist.isCapableActivate(duel)) {
      return;
    }

    let cards = duel.utilsQuery(duelistIndex, [[LOCATION.MZONE], [LOCATION.MZONE]], card => {
      return card && card.getControler() == duelistIndex && card.isActiveatable(duel) && CARD_CONDITION(this.cardConditionId, card, this.cardConditionOpts)
    });

    if (cards.length == 0) {
      return;
    }

    cards = CARD_SORT(this.cardSortId, cards);
    await duel.runAction(new ActivateAction(duel, cards[0]));
  }
}

export { AIDuelist };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function CREATE_BEHAVIOR(name) {
  if (name == 'DRAW') {
    return new DrawBehavior();
  }
  else if (name == 'SUMMON') {
    return new SummonBehavior();
  }
  else if (name == 'SET') {
    return new SetBehavior();
  }
  else if (name == 'CHANGE_POSITION') {
    return new ChangePositionBehavior();
  }
  else if (name == 'BATTLE') {
    return new BattleBehavior();
  }
  else if (name == 'ACTIVATE_CARD') {
    return new ActivateBehavior();
  }
  else {
    throw new Error('AIDuelist::CREATE_BEHAVIOR(): Behavior name unknown !');
  }
}