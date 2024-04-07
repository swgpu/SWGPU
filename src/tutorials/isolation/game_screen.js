import { eventManager } from '../../lib/core/event_manager';
import { inputManager } from '../../lib/input/input_manager';
import { UIManager } from '../../lib/ui/ui_manager';
import { UIText } from '../../lib/ui_text/ui_text';
import { UT } from '../../lib/core/utils';
import { Screen } from '../../lib/screen/screen';
import { screenManager } from '../../lib/screen/screen_manager';
import { gfx2TextureManager } from '../../lib/gfx2/gfx2_texture_manager';
// ---------------------------------------------------------------------------------------
import { Controller } from './assets/controller';
import { Bullet } from './assets/bullet';
import { Asteroid } from './assets/asteroids';
import { GameOverScreen } from './game_over_screen';
// ---------------------------------------------------------------------------------------

class GameScreen extends Screen {
  constructor() {
    super();
    this.controller = new Controller();
    this.uiManager = new UIManager();
    this.uiScore = new UIText();
    this.uiManager.addWidget(this.uiScore, '');
    this.move_step = 15;
    this.SCORE = 0;
    this.ASTEROID_POINTS = 10;

    this.MAX_BULLETS = 5;

    this.bullets = [];
    this.asteroids = [];

    eventManager.subscribe(inputManager, 'E_ACTION_ONCE', this, this.handleActionOnce);
    eventManager.subscribe(this.controller, 'SHOOT', this, this.handleShoot);
  }

  async onEnter() {
    this.controller.jss.setTexture(await gfx2TextureManager.loadTexture('./tutorials/isolation/ship.png'));
    //x from -300 to 300
    //y from -300 to 50

    const TOP_PADDING = 100;
    const LEFT_PADDING = 75;
    const NB_ROWS = 5;
    const NB_COLS = 8;

    const positions = []
    //génere dynamiquement les positions des astéroides
    for (let i = 0; i < NB_COLS; i++) {
        for (let j = 0; j < NB_ROWS; j++) {
            positions.push([i * 60 - 300 + LEFT_PADDING, j * 60 - 300 + TOP_PADDING]);
        }
    }

    for (let i = 0; i < positions.length; i++) {
        const asteroid = new Asteroid(positions[i][0], positions[i][1]);
        asteroid.onEnter();
        this.asteroids.push(asteroid);
    }

    this.draw();
  }

  handleShoot(data) {
    if (this.bullets.length >= this.MAX_BULLETS) {
        return;
    }
    const bullet = new Bullet(data.x - this.controller.width / 2, data.y, data.speed);
    bullet.onEnter();
    this.bullets.push(bullet);
  }

  draw() {
    this.controller.draw();
    this.bullets.forEach(bullet => bullet.draw());
    this.asteroids.forEach(asteroid => asteroid.draw());
  }

  update(ts) {
    if (inputManager.isActiveAction('LEFT')) {
      this.moveController(-this.move_step * this.controller.getSpeed() * ts, 0, 'LEFT');
    }
    else if (inputManager.isActiveAction('RIGHT')) {
      this.moveController(this.move_step * this.controller.getSpeed() * ts, 0, 'RIGHT');
    }
    this.bullets.forEach(bullet => {
      bullet.update();
      this.calculateCollision(bullet);
    });

    this.asteroids.forEach(asteroid => {
      asteroid.update();
    });

    this.uiScore.setText(`Score: ${this.SCORE}`);
    if (this.asteroids.length == 0) {
      screenManager.requestSetScreen(new GameOverScreen({ score: this.SCORE }));
    }
  }
  calculateCollision(bullet) {
    if (bullet.y < -300) {
      this.bullets.splice(this.bullets.indexOf(bullet), 1);
      return;
    }

    if (bullet.y > 300) {
      this.bullets.splice(this.bullets.indexOf(bullet), 1);
      return;
    }

    this.asteroids.forEach(asteroid => {
      const distance = UT.VEC2_DISTANCE([bullet.x, bullet.y], [asteroid.x, asteroid.y]);

      if (distance < 16) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
        this.SCORE += this.ASTEROID_POINTS;
      }
    });
  }

  handleActionOnce(data) {
    if (data.actionId == 'SELECT') {
      this.controller.shoot();
    }
  }

  moveController(x, y, direction) {
    this.controller.setDirection(direction);
    this.controller.move(x, y);
  }

  handleMainMenuClosed() {
    screenManager.requestPopScreen();
  }

  onExit() {
    this.uiManager.removeWidget(this.uiScore);
  }
}


export { GameScreen };