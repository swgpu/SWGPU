import { Player } from './core/player';
// ---------------------------------------------------------------------------------------

class GameManager {
  constructor() {
    this.then = 0;
    this.player = new Player();
  }

  async init() {
    await this.player.loadFromFile('samples/rpg/data/player.json');
  }

  getPlayer() {
    return this.player;
  }
}

const gameManager = new GameManager();
export { gameManager };