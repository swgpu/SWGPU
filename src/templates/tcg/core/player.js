class Player {
  constructor() {
    this.variants = {};
  }

  async loadFromData(data) {
    for (let key in data['Variants']) {
      this.addVariant(key, data['Variants'][key]);
    }
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  addVariant(varloc, value) {
    if (this.variants.hasOwnProperty(varloc)) {
      throw new Error('Player::addVariant: varloc already exist in variants dictionnary');
    }

    this.variants[varloc] = value;
  }

  removeVariant(varloc) {
    if (!this.variants.hasOwnProperty(varloc)) {
      throw new Error('Player::removeVariant: varloc not exist in variants dictionnary');
    }

    delete this.variants[varloc];
  }

  setVariant(varloc, value) {
    if (!this.variants.hasOwnProperty(varloc)) {
      throw new Error('Player::setVariant: varloc not exist in variants dictionnary');
    }

    this.variants[varloc] = value;
  }

  hasVariant(varloc) {
    return this.variants.hasOwnProperty(varloc);
  }

  getVariant(varloc) {
    if (!this.variants.hasOwnProperty(varloc)) {
      throw new Error('Player::getVariant: varloc not exist in variants dictionnary');
    }

    return this.variants[varloc];
  }
}

export { Player };