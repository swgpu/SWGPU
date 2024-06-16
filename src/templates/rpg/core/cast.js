class Promotion {
  constructor() {
    this.level = 1;
    this.attributeMap = {};
  }
}

class Cast {
  constructor() {
    this.id = '';
    this.name = '';
    this.promotions = [];
  }

  async loadFromData(data) {
    if (data.hasOwnProperty('Effect')) {
      this.effect = new Effect();
      await this.effect.loadFromData(data['Effect']);
    }

    this.id = data['Id'];
    this.name = data['Name'];

    this.promotions = [];
    for (let obj of data['Promotions']) {
      let promotion = new Promotion();
      promotion.level = obj['Level'];
      promotion.attributeMap = obj['AttributeMap'];
      this.promotions.push(promotion);
    }
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  applyPromotion(char, level) {
    let promotion = this.promotions.find(p => p.level == level);
    if (!promotion) {
      throw new Error('Cast::applyPromotion(): Level not exist !');
    }

    let charAttributes = char.getAttributes();

    for (let key in promotion.attributeMap) {      
      charAttributes.add(key, promotion.attributeMap[key]);
    }
  }
}

export { Cast };