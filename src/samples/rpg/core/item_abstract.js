class ItemAbstract {
  constructor() {
    this.id = '';
    this.type = '';
    this.name = '';
    this.description = '';
    this.pictureFile = '';
    this.soldable = true;
    this.price = 0;
    this.quantity = 1;
  }

  async loadFromData(data) {
    this.id = data['Id'];
    this.type = data['Type'];
    this.name = data['Name'];
    this.description = data['Description'];
    this.pictureFile = data['PictureFile'];
    this.soldable = data['Soldable'];
    this.price = data['Price'];
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

  getDescription() {
    return this.description;
  }

  getPictureFile() {
    return this.pictureFile;
  }

  getSoldable() {
    return this.soldable;
  }

  getPrice() {
    return this.price;
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }
}

export { ItemAbstract };