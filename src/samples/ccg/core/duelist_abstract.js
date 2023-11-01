import { LOCATION, PHASE } from './enums';
import { Deck } from './deck';
import { Attributes } from './attributes';
import { Zone } from './zone';
// ---------------------------------------------------------------------------------------

class DuelistAbstract {
  constructor() {
    this.name = '';
    this.pictureFile = '';
    this.deck;
    this.attributes; // [LIFEPOINTS, DRAW_COUNT, DRAW_COUNT_LIMIT, SUMMON_COUNT, SUMMON_COUNT_LIMIT, STATE_CANNOT_SET, STATE_CANNOT_SUMMON]
    this.zones = [];

    let mzone = new Zone(LOCATION.MZONE);
    mzone.push(null, null, null);
    this.zones.push(mzone);

    let szone = new Zone(LOCATION.SZONE);
    szone.push(null, null, null);
    this.zones.push(szone);

    let fzone = new Zone(LOCATION.FZONE);
    fzone.push(null);
    this.zones.push(fzone);

    this.zones.push(new Zone(LOCATION.DECK));
    this.zones.push(new Zone(LOCATION.GRAVEYARD));
    this.zones.push(new Zone(LOCATION.BANNISHED));
    this.zones.push(new Zone(LOCATION.HAND));
  }

  async loadFromData(data) {
    this.name = data['Name'];
    this.pictureFile = data['PictureFile'];
    this.deck = new Deck();
    await this.deck.loadFromData(data['Deck']);
    this.attributes = new Attributes(data['Attributes']);
  }

  getName() {
    return this.name;
  }

  getPictureFile() {
    return this.pictureFile;
  }

  getDeck() {
    return this.deck;
  }

  getAttributes() {
    return this.attributes;
  }

  getAttribute(key) {
    return this.attributes.get(key);
  }

  setAttribute(key, value) {
    this.attributes.set(key, value);
  }

  incAttribute(key) {
    this.attributes.set(key, this.attributes.get(key) + 1);
  }

  getZone(location) {
    return this.zones.find(z => z.getLocation() == location);
  }

  getCard(location, index) {
    let zone = this.zones.find(z => z.getLocation() == location);
    return zone[index];
  }

  insertCard(location, index, card) {
    let zone = this.zones.find(z => z.getLocation() == location);
    zone[index] = card;
  }

  removeCard(location, card) {
    let zone = this.zones.find(z => z.getLocation() == location);
    zone.splice(zone.indexOf(card), 1);
  }

  pushCard(location, card) {
    let zone = this.zones.find(z => z.getLocation() == location);
    zone.push(card);
  }

  popCard(location) {
    let zone = this.zones.find(z => z.getLocation() == location);
    return zone.pop();
  }

  isCapableDraw(duel) {
    let currentTurn = duel.getCurrentTurn();
    let currentPhase = currentTurn.getCurrentPhase();

    if (currentPhase.getId() != PHASE.DRAW) {
      return false;
    }
    if (this.attributes.get('DRAW_COUNT') >= this.attributes.get('DRAW_COUNT_LIMIT')) {
      return false;
    }

    return true;
  }

  isCapableSummon(duel) {
    let currentTurn = duel.getCurrentTurn();
    let currentPhase = currentTurn.getCurrentPhase();
    let duelists = duel.getDuelists();
    let duelistIndex = duelists.indexOf(this);

    if (currentPhase.getId() != PHASE.MAIN) {
      return false;
    }

    if (this.attributes.get('STATE_CANNOT_SUMMON') == 1) {
      return false;
    }

    if (this.attributes.get('SUMMON_COUNT') >= this.attributes.get('SUMMON_COUNT_LIMIT')) {
      return false;
    }

    let arr0 = duel.utilsQuery(duelistIndex, [[LOCATION.HAND], 0], card => {
      return card && card.isSummonable()
    });

    if (arr0.length == 0) {
      return false;
    }

    let arr1 = duel.utilsQuery(duelistIndex, [[LOCATION.MZONE], 0], card => {
      return card == null;
    });

    if (arr1.length == 0) {
      return false;
    }

    return true;
  }

  isCapableSet(duel) {
    let currentTurn = duel.getCurrentTurn();
    let currentPhase = currentTurn.getCurrentPhase();
    let duelists = duel.getDuelists();
    let duelistIndex = duelists.indexOf(this);

    if (currentPhase.getId() != PHASE.MAIN) {
      return false;
    }

    if (this.attributes.get('STATE_CANNOT_SET') == 1) {
      return false;
    }

    let arr0 = duel.utilsQuery(duelistIndex, [[LOCATION.HAND], 0], card => {
      return card && card.isSetable()
    });

    if (arr0.length == 0) {
      return false;
    }

    let arr1 = duel.utilsQuery(duelistIndex, [[LOCATION.SZONE], 0], card => {
      return card == null
    });

    if (arr1.length == 0) {
      return false;
    }

    return true;
  }

  isCapableChangePosition(duel) {
    let currentTurn = duel.getCurrentTurn();
    let currentPhase = currentTurn.getCurrentPhase();
    let duelists = duel.getDuelists();
    let duelistIndex = duelists.indexOf(this);

    if (currentPhase.getId() != PHASE.MAIN) {
      return false;
    }

    let arr0 = duel.utilsQuery(duelistIndex, [[LOCATION.MZONE], [LOCATION.MZONE]], card => {
      return card && card.getControler() == duelistIndex && card.isCapableChangePosition()
    });

    if (arr0.length == 0) {
      return false;
    }

    return true;
  }

  isCapableBattle(duel) {
    let currentTurn = duel.getCurrentTurn();
    let currentPhase = currentTurn.getCurrentPhase();
    let duelists = duel.getDuelists();
    let duelistIndex = duelists.indexOf(this);

    if (currentPhase.getId() != PHASE.BATTLE) {
      return false;
    }

    let arr0 = duel.utilsQuery(duelistIndex, [[LOCATION.MZONE], [LOCATION.MZONE]], card => {
      return card && card.getControler() == duelistIndex && card.isCapableAttack()
    });

    if (arr0.length == 0) {
      return false;
    }

    return true;
  }

  isCapableActivate(duel) {
    let currentTurn = duel.getCurrentTurn();
    let currentPhase = currentTurn.getCurrentPhase();
    let duelists = duel.getDuelists();
    let duelistIndex = duelists.indexOf(this);

    if (currentPhase.getId() != PHASE.MAIN) {
      return false;
    }

    let arr0 = duel.utilsQuery(duelistIndex, [[LOCATION.SZONE], [LOCATION.SZONE]], card => {
      return card && card.getControler() == duelistIndex && card.isActiveatable(duel)
    });

    if (arr0.length == 0) {
      return false;
    }

    return true;
  }

  async selectLocation(range, predicateCard = () => true) {
    // virtual method.
  }

  async selectRequiredLocation(range, predicateCard = () => true) {
    // virtual method.
  }
}

export { DuelistAbstract };