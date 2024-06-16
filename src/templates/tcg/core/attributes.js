class Attributes {
  constructor(data) {
    this.map = data;
    this.modifiers = [];
  }

  get(key) {
    if (!this.map.hasOwnProperty(key)) {
      return;
    }

    let value = this.map[key];

    for (let modifier of this.modifiers) {
      if (modifier.getAttributeKey() == key && modifier.getType() == 'MUL') {
        value *= modifier.getValue();
      }
    }

    for (let modifier of this.modifiers) {
      if (modifier.getAttributeKey() == key && modifier.getType() == 'ADD') {
        value += modifier.getValue();
      }
    }

    for (let modifier of this.modifiers) {
      if (modifier.getAttributeKey() == key && modifier.getType() == 'SUB') {
        value -= modifier.getValue();
      }
    }

    for (let modifier of this.modifiers) {
      if (modifier.getAttributeKey() == key && modifier.getType() == 'SET') {
        value = modifier.getValue();
      }
    }

    for (let modifier of this.modifiers) {
      if (modifier.getAttributeKey() == key && modifier.getType() == 'FIN') {
        value = modifier.getValue();
      }
    }

    if (value < 0) {
      value = 0;
    }

    if (this.map.hasOwnProperty(key + '_MIN')) {
      value = Math.max(value, this.map[key + '_MIN']);
    }
    if (this.map.hasOwnProperty(key + '_MAX')) {
      value = Math.min(value, this.map[key + '_MAX']);
    }

    return value;
  }

  getBase(key) {
    if (!this.map.hasOwnProperty(key)) {
      return;
    }

    return this.map[key];
  }

  set(key, value) {
    if (!this.map.hasOwnProperty(key)) {
      return;
    }

    if (value < 0) {
      value = 0;
    }

    if (this.map.hasOwnProperty(key + '_MIN')) {
      value = Math.max(value, this.map[key + '_MIN']);
    }
    if (this.map.hasOwnProperty(key + '_MAX')) {
      value = Math.min(value, this.map[key + '_MAX']);
    }

    this.map[key] = value;
  }

  add(key, value) {
    this.set(key, this.getBase(key) + value);
  }

  has(key) {
    return this.map.hasOwnProperty(key);
  }

  addModifier(modifier) {
    if (!modifier.isStackable() && this.modifiers.find(m => m.getId() == modifier.getId())) {
      return false;
    }

    this.modifiers.push(modifier);
  }

  removeModifier(modifier) {
    this.modifiers.splice(this.modifiers.indexOf(modifier), 1);
  }

  removeModifierIf(predicate) {
    for (let modifier of this.modifiers) {
      if (predicate(modifier)) {
        this.modifiers.splice(this.modifiers.indexOf(modifier), 1);
      }
    }
  }

  clearModifiers() {
    while (this.modifiers.length) {
      this.modifiers.pop();
    }
  }
}

export { Attributes };