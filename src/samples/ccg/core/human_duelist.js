import { eventManager } from '../../../lib/core/event_manager';
// ---------------------------------------------------------------------------------------
import { DuelistAbstract } from './duelist_abstract';
import { DrawAction, SummonAction, SetAction, ChangePositionAction, BattleAction, NextPhaseAction, ActivateAction, DirectAttackAction } from './duel_actions';
import { LOCATION } from './enums';
// ---------------------------------------------------------------------------------------

class HumanDuelist extends DuelistAbstract {
  constructor() {
    super();
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  async selectLocation(range, predicateCard = () => true) {
    let response = {};
    response.state = false;
    response.location = '';
    response.index = 0;
    response.card = null;

    await eventManager.emit(this, 'E_SELECT_LOCATION', { range: range, predicateCard: predicateCard, response: response, required: false });
    if (!response.state) {
      return null;
    }

    return response;
  }

  async selectRequiredLocation(range, predicateCard = () => true) {
    let response = {};
    response.state = false;
    response.location = '';
    response.index = 0;
    response.card = null;

    await eventManager.emit(this, 'E_SELECT_LOCATION', { range: range, predicateCard: predicateCard, response: response, required: true });
    if (!response.state) {
      return null;
    }

    return response;
  }
}

class Command {
  async exec(duel) {
    // virtual method.
  }
}

class DrawCommand extends Command {
  constructor() {
    super();
  }

  async exec(duel) {
    await duel.runAction(new DrawAction(duel));
  }
}

class SummonCommand extends Command {
  constructor() {
    super();
  }

  async exec(duel) {
    let duelist = duel.getCurrentDuelist();

    let loc0 = await duelist.selectLocation([[LOCATION.HAND], 0], card => {
      return card && card.isSummonable()
    });

    if (loc0 == null) {
      return false;
    }

    let loc1 = await duelist.selectLocation([[LOCATION.MZONE], 0], card => {
      return card == null
    });

    if (loc1 == null) {
      return false;
    }

    await duel.runAction(new SummonAction(duel, loc0.card, loc1.index));
  }
}

class SetCommand extends Command {
  constructor() {
    super();
  }

  async exec(duel) {
    let duelist = duel.getCurrentDuelist();

    let loc0 = await duelist.selectLocation([[LOCATION.HAND], 0], card => {
      return card && card.isSetable()
    });

    if (loc0 == null) {
      return false;
    }

    let loc1 = await duelist.selectLocation([[LOCATION.SZONE], 0], card => {
      return card == null
    });

    if (loc1 == null) {
      return false;
    }

    await duel.runAction(new SetAction(duel, loc0.card, loc1.index));
  }
}

class ChangePositionCommand extends Command {
  constructor() {
    super();
  }

  async exec(duel) {
    let duelist = duel.getCurrentDuelist();

    let loc0 = await duelist.selectLocation([[LOCATION.MZONE], [LOCATION.MZONE]], card => {
      return card && card.getControler() == duel.getCurrentDuelistIndex() && card.isCapableChangePosition()
    });

    if (loc0 == null) {
      return false;
    }

    await duel.runAction(new ChangePositionAction(duel, loc0.card));
  }
}

class BattleCommand extends Command {
  constructor() {
    super();
  }

  async exec(duel) {
    let duelist = duel.getCurrentDuelist();

    let loc0 = await duelist.selectLocation([[LOCATION.MZONE], [LOCATION.MZONE]], card => {
      return card && card.getControler() == duel.getCurrentDuelistIndex() && card.isCapableAttack()
    });

    if (loc0 == null) {
      return false;
    }

    let arr1 = duel.utilsQuery(duel.getCurrentDuelistIndex(), [[LOCATION.MZONE], [LOCATION.MZONE]], card => {
      return card && card.getControler() == duel.getOpponentDuelistIndex()
    });

    if (arr1.length == 0) {
      await duel.runAction(new DirectAttackAction(duel, loc0.card));
      return true;
    }

    let loc1 = await duelist.selectLocation([[LOCATION.MZONE], [LOCATION.MZONE]], card => {
      return card && card.getControler() == duel.getOpponentDuelistIndex()
    });

    if (loc1 == null) {
      return false;
    }

    await duel.runAction(new BattleAction(duel, loc0.card, loc1.card));
  }
}

class NextPhaseCommand extends Command {
  constructor() {
    super();
  }

  async exec(duel) {
    await duel.runAction(new NextPhaseAction(duel));
  }
}

class ActivateCommand extends Command {
  constructor() {
    super();
  }

  async exec(duel) {
    let duelist = duel.getCurrentDuelist();
  
    let loc0 = await duelist.selectLocation([[LOCATION.SZONE], [LOCATION.SZONE]], card => {
      return card && card.getControler() == duel.getCurrentDuelistIndex() && card.isActiveatable(duel)
    });

    if (loc0 == null) {
      return false;
    }

    await duel.runAction(new ActivateAction(duel, loc0.card));
  }
}

function CREATE_COMMAND(name) {
  if (name == 'DRAW') {
    return new DrawCommand();
  }
  else if (name == 'SUMMON') {
    return new SummonCommand();
  }
  else if (name == 'SET') {
    return new SetCommand();
  }
  else if (name == 'BATTLE') {
    return new BattleCommand();
  }
  else if (name == 'ACTIVATE') {
    return new ActivateCommand();
  }
  else if (name == 'CHANGE_POSITION') {
    return new ChangePositionCommand();
  }
  else if (name == 'NEXT_PHASE') {
    return new NextPhaseCommand();
  }
  else {
    throw new Error('CREATE_COMMAND: Command name unknown !');
  }
}

export { HumanDuelist };
export { CREATE_COMMAND };