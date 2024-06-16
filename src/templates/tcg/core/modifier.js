class Modifier {
  constructor() {
    this.id = '';
    this.type = ''; // [MUL, ADD, SUB, SET, FIN]
    this.attributeKey = '';
    this.value = 0;
    this.stackable = false;
    this.linked = false;
    this.linkedEffect = null;
  }

  async loadFromData(data) {
    this.id = data['Type'] + '_' + data['AttributeKey'];
    this.type = data['Type'];
    this.attributeKey = data['AttributeKey'];
    this.value = data['Value'];
    this.stackable = data['Stackable'];
    this.linked = data['Linked'];
  }

  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }

  getAttributeKey() {
    return this.attributeKey;
  }

  getValue() {
    return this.value;
  }

  isStackable() {
    return this.stackable;
  }

  isLinked() {
    return this.linked;
  }

  getLinkedEffect() {
    return this.linkedEffect;
  }

  setLinkedEffect(linkedEffect) {
    this.linkedEffect = linkedEffect;
  }
}

export { Modifier };