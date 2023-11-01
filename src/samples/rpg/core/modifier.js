class Modifier {
  constructor(data) {
    this.type = '';
    this.attributeKey = '';
    this.value = 0;

    if (!data.hasOwnProperty('Type')) {
      return;
    }
    if (!(
      data['Type'] == 'MUL' ||
      data['Type'] == 'ADD' ||
      data['Type'] == 'SUB' ||
      data['Type'] == 'SET' ||
      data['Type'] == 'FIN')) {
      return;
    }
    if (!data.hasOwnProperty('AttributeKey')) {
      return;
    }
    if (!data.hasOwnProperty('Value')) {
      return;
    }

    this.type = data['Type'];
    this.attributeKey = data['AttributeKey'];
    this.value = data['Value'];
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
}

export { Modifier };