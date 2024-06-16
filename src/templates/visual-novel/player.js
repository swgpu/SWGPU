class Player {
  constructor() {
    this.variants = {};
  }

  async loadFromFile(path) {
    const response = await fetch(path);
    const json = await response.json();
    this.variants = json['Variants'];
  }

  getVariant() {
    return this.variants;
  }
}

export { Player };