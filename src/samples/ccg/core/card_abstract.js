import { LOCATION } from './enums';
import { Attributes } from './attributes';
// ---------------------------------------------------------------------------------------

class CardAbstract {
  constructor() {
    this.id = '';
    this.type = '';
    this.name = '';
    this.text = '';
    this.coverFile = '';
    this.attributes; // [ELEMENT]
    this.owner = 0;
    this.controler = 0;
    this.position = '';
    this.location = LOCATION.DECK;
    this.turnCounter = 0;
  }

  async loadFromData(data) {
    this.id = data['Id'];
    this.type = data['Type'];
    this.name = data['Name'];
    this.text = data['Text'];
    this.coverFile = data['CoverFile'];
    this.attributes = new Attributes(data['Attributes']);
  }

  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }

  getName() {
    return this.name;
  }

  getText() {
    return this.text;
  }

  getCoverFile() {
    return this.coverFile;
  }

  getAttributes() {
    return this.attributes;
  }

  getAttribute(key) {
    return this.attributes.get(key);
  }

  getOwner() {
    return this.owner;
  }

  setOwner(owner) {
    this.owner = owner;
  }

  getControler() {
    return this.controler;
  }

  setControler(controler) {
    this.controler = controler;
  }

  getPosition() {
    return this.position;
  }

  setPosition(position) {
    this.position = position;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location) {
    this.location = location;
  }

  getTurnCounter() {
    return this.turnCounter;
  }

  incTurnCounter() {
    this.turnCounter++;
  }

  setAttribute(key, value) {
    this.attributes.set(key, value);
  }

  incAttribute(key) {
    this.attributes.set(key, this.attributes.get(key) + 1);
  }

  isSummonable(duel) {
    return false;
  }

  isSetable(duel) {
    return false;
  }

  isCapableAttack(duel) {
    return false;
  }

  isCapableChangePosition(duel) {
    return false;
  }

  isActiveatable(duel) {
    return false;
  }

  isTriggerable(duel, action) {
    return false;
  }
}

export { CardAbstract };