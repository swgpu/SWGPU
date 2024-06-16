import { Modifier } from './modifier';
import { ItemAbstract } from './item_abstract';
// ---------------------------------------------------------------------------------------

class EquipmentItem extends ItemAbstract {
  constructor() {
    super();
    this.subType = '';
    this.modifiers = [];
  }

  async loadFromData(data) {
    this.subType = data['SubType'];

    for (let obj of data['Modifiers']) {
      this.modifiers.push(new Modifier(obj));
    }

    super.loadFromData(data);
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  getSubType() {
    return this.subType;
  }

  getModifiers() {
    return this.modifiers;
  }
}

export { EquipmentItem };