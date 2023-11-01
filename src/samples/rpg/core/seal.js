import { Effect } from './effect';
import { Modifier } from './modifier';
// ---------------------------------------------------------------------------------------

class Seal {
  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.iconFile = '';
    this.stackable = false;
    this.numTurns = 0;
    this.onTurnEffect = null;
    this.modifiers = [];
    this.turnCount = 0;
    this.fromChar = null;
  }

  async loadFromData(data) {
    this.id = data['Id'];
    this.name = data['Name'];
    this.description = data['Description'];
    this.iconFile = data['IconFile'];
    this.stackable = data['Stackable'];
    this.numTurns = data['NumTurns'];

    if (data['OnTurnEffect']) {
      this.onTurnEffect = new Effect();
      this.onTurnEffect.loadFromData(data['OnTurnEffect']);
    }

    for (let obj of data['Modifiers']) {
      this.modifiers.push(new Modifier(obj));
    }
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getIconFile() {
    return this.iconFile;
  }

  getStackable() {
    return this.stackable;
  }

  getNumTurns() {
    return this.numTurns;
  }

  getOnTurnEffect() {
    return this.onTurnEffect;
  }

  getModifiers() {
    return this.modifiers;
  }

  getTurnCount() {
    return this.turnCount;
  }

  incTurnCount() {
    this.turnCount++;
  }
  
  getFromChar() {
    return this.fromChar;
  }
}

export { Seal };