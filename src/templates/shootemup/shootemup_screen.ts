import { uiManager } from '@lib/ui/ui_manager';
import { eventManager } from '@lib/core/event_manager';
import { screenManager } from '@lib/screen/screen_manager';
import { dnaManager } from '@lib/dna/dna_manager';
import { UIText } from '@lib/ui_text/ui_text';
import { Screen } from '@lib/screen/screen';
// ---------------------------------------------------------------------------------------
import { generateWave } from './entities/asteroid';
import { spawnShip } from './entities/ship';
import { GameOverScreen } from './game_over_screen';
import { ShipSystem } from './systems/ship';
import { AsteroidSystem } from './systems/asteroid';
import { BulletSystem } from './systems/bullet';
// ---------------------------------------------------------------------------------------

const TOP_PADDING = 100;
const LEFT_PADDING = 75;
const NB_ROWS = 5;
const NB_COLS = 8;
const HOLES = [1, 2, 3, 4, 3];
const WAVE_GENERATION_INTERVAL = 10000;

class ShootemupScreen extends Screen {
  shipSystem: ShipSystem;
  asteroidSystem: AsteroidSystem;
  bulletSystem: BulletSystem;
  uiScore: UIText;
  score: number;
  waveAge: number;

  constructor() {
    super();
    this.shipSystem = new ShipSystem();
    this.asteroidSystem = new AsteroidSystem();
    this.bulletSystem = new BulletSystem();
    this.uiScore = new UIText();
    this.score = 0;
    this.waveAge = 0;
  }

  async onEnter() {
    dnaManager.setup([
      this.shipSystem,
      this.asteroidSystem,
      this.bulletSystem
    ]);

    this.uiScore.setText('Score: ' + this.score);
    uiManager.addWidget(this.uiScore);

    await spawnShip();
    await generateWave(NB_ROWS, NB_COLS, HOLES, LEFT_PADDING, TOP_PADDING);

    eventManager.subscribe(this.bulletSystem, 'E_ASTEROID_DESTROYED', this, this.handleAsteroidDestroyed);
    eventManager.subscribe(this.asteroidSystem, 'E_PLAYER_DESTROYED', this, this.handlePlayerDestroyed);
  }

  onExit() {
    uiManager.removeWidget(this.uiScore);
  }

  update(ts: number) {
    if (this.waveAge > WAVE_GENERATION_INTERVAL) {
      generateWave(NB_ROWS, NB_COLS, HOLES, LEFT_PADDING, TOP_PADDING);
      this.waveAge = 0;
    }
    else {
      this.waveAge += ts;
    }

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

export { ShootemupScreen };