import { uiManager } from '../../lib/ui/ui_manager';
import { eventManager } from '../../lib/core/event_manager';
import { screenManager } from '../../lib/screen/screen_manager';
import { dnaManager } from '../../lib/dna/dna_manager';
import { gfx2TextureManager } from '../../lib/gfx2/gfx2_texture_manager';
import { UIText } from '../../lib/ui_text/ui_text';
import { Screen } from '../../lib/screen/screen';
// ---------------------------------------------------------------------------------------
import { GameOverScreen } from './game_over_screen';
import { ShipComponent, ShipSystem } from './ship';
import { AsteroidComponent, AsteroidSystem } from './asteroid';
import { BulletSystem } from './bullet';
// ---------------------------------------------------------------------------------------

const TOP_PADDING = 100;
const LEFT_PADDING = 75;
const NB_ROWS = 5;
const NB_COLS = 8;
const HOLES = [1, 2, 3, 4, 3];

class GameScreen extends Screen {
  shipSystem: ShipSystem;
  asteroidSystem: AsteroidSystem;
  bulletSystem: BulletSystem;
  uiScore: UIText;
  score: number;

  constructor() {
    super();
    this.shipSystem = new ShipSystem();
    this.asteroidSystem = new AsteroidSystem();
    this.bulletSystem = new BulletSystem();
    this.uiScore = new UIText();
    this.score = 0;
  }

  async onEnter() {
    dnaManager.setup([
      this.shipSystem,
      this.asteroidSystem,
      this.bulletSystem
    ]);

    this.uiScore.setText('Score: ' + this.score);
    uiManager.addWidget(this.uiScore);

    await gfx2TextureManager.loadTexture('./tutorials/isolation/asteroid.png');
    await gfx2TextureManager.loadTexture('./tutorials/isolation/bullet.png');
    await gfx2TextureManager.loadTexture('./tutorials/isolation/ship.png');

    const ship = dnaManager.createEntity();
    dnaManager.addComponent(ship, new ShipComponent());

    for (let i = 0; i < NB_ROWS; i++) {
      for (let j = 0; j < NB_COLS; j++) {
        if (HOLES[i] != j) {
          const x = j * 60 - 300 + LEFT_PADDING;
          const y = i * 60 - 300 + TOP_PADDING;
          const asteroid = dnaManager.createEntity();
          dnaManager.addComponent(asteroid, new AsteroidComponent(x, y));
        }
      }
    }

    eventManager.subscribe(this.bulletSystem, 'E_ASTEROID_DESTROYED', this, this.handleAsteroidDestroyed);
    eventManager.subscribe(this.asteroidSystem, 'E_PLAYER_DESTROYED', this, this.handlePlayerDestroyed);
  }

  onExit() {
    uiManager.removeWidget(this.uiScore);
  }

  update(ts: number) {
    dnaManager.update(ts);
  }

  draw() {
    dnaManager.draw();
  }

  handleAsteroidDestroyed() {
    this.score += 10;
    this.uiScore.setText('Score: ' + this.score);
  }

  handlePlayerDestroyed() {
    screenManager.requestSetScreen(new GameOverScreen(), { score: this.score });
  }
}

export { GameScreen };