import { MonsterCard } from './monster_card';
import { SpellCard } from './spell_card';
// ---------------------------------------------------------------------------------------

class Deck {
  constructor() {
    this.cards = [];
  }

  async loadFromData(data) {
    for (let cardId of data) {
      if (cardId.startsWith('monster')) {
        let monsterCard = new MonsterCard();
        await monsterCard.loadFromFile('samples/ccg/data/cards/' + cardId + '/data.json');
        this.cards.push(monsterCard);
      }
      else if (cardId.startsWith('spell')) {
        let spellCard = new SpellCard();
        await spellCard.loadFromFile('samples/ccg/data/cards/' + cardId + '/data.json');
        this.cards.push(spellCard);
      }
    }
  }

  getCards() {
    return this.cards;
  }
}

export { Deck };