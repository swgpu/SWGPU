import { uiManager } from '@lib/ui/ui_manager';
import { inputManager } from '@lib/input/input_manager';
import { dnaManager } from '@lib/dna/dna_manager';
import { screenManager } from '@lib/screen/screen_manager';
import { soundManager } from '@lib/sound/sound_manager';
import { Screen } from '@lib/screen/screen';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { eventManager } from '@lib/core/event_manager';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
// ---------------------------------------------------------------------------------------
import { GameOverScreen } from './game_over_screen';
import { ShipComponent, ShipSystem } from './ship';
import { EnemyComponent, EnemySystem } from './enemy';
import { BulletSystem } from './bullet';
// ---------------------------------------------------------------------------------------

const WAVES = [
  // Easy
  [
    [0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0]
  ],
  [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  // Medium
  [
    [0, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0, 2, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 2, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 3, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0]
  ],
  [
    [0, 1, 2, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 2, 1, 0, 0, 0]
  ],
  [
    [0, 2, 1, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 2, 1, 2, 0, 0, 0]
  ],
  [
    [1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0]
  ],
  [
    [1, 0, 0, 0, 1, 0, 0, 0],
    [0, 2, 0, 2, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 3, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  // Hard
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 1, 0, 2, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 2, 0, 1, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0]
  ],
  [
    [1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 3, 0, 3, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0]
  ],
  [
    [0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 1, 0]
  ],
  [
    [0, 0, 2, 0, 2, 0, 1, 0],
    [0, 3, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 1, 0, 1, 0, 0],
    [0, 0, 2, 0, 2, 0, 1, 0]
  ]
];
const WAVE_SPAWN_INTERVAL = 10000;
const PARALLAX_SCROLL_SPEED = 0.1;

class GameScreen extends Screen {
  shipSystem: ShipSystem;
  enemySystem: EnemySystem;
  bulletSystem: BulletSystem;
  score: number;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  kills: number;
  time: number;
  timeScale: number;
  waveTimer: number;
  waveCount: number;
  isInvincible: boolean;
  bgSky1a: Gfx2SpriteJSS;
  bgSky1b: Gfx2SpriteJSS;
  bgSky2a: Gfx2SpriteJSS;
  bgSky2b: Gfx2SpriteJSS;
  bgSky3a: Gfx2SpriteJSS;
  bgSky3b: Gfx2SpriteJSS;
  hud: HTMLDivElement;

  constructor() {
    super();
    this.shipSystem = new ShipSystem();
    this.enemySystem = new EnemySystem();
    this.bulletSystem = new BulletSystem();
    this.score = 0;
    this.kills = 0;
    this.level = 1;
    this.currentXP = 0;
    this.nextLevelXP = this.calculateNextLevelXP(this.level);
    this.time = 0;
    this.timeScale = 1;
    this.waveTimer = 0;
    this.waveCount = 0;
    this.isInvincible = true;
    this.bgSky1a = new Gfx2SpriteJSS();
    this.bgSky1b = new Gfx2SpriteJSS();
    this.bgSky2a = new Gfx2SpriteJSS();
    this.bgSky2b = new Gfx2SpriteJSS();
    this.bgSky3a = new Gfx2SpriteJSS();
    this.bgSky3b = new Gfx2SpriteJSS();
    this.hud = document.createElement('div');
  }

  async onEnter() {
    await soundManager.loadSound('./templates/shootemup/shoot.wav', 'sfx');
    await soundManager.loadSound('./templates/shootemup/explosion.wav', 'sfx');

    inputManager.registerAction('keyboard', 'Space', 'FIRE');
    // TODO: sound groups not working
    // soundManager.setVolume(0.5, 'sfx');

    await gfx2TextureManager.loadTexture('./templates/shootemup/nightsky-bg.png');
    await gfx2TextureManager.loadTexture('./templates/shootemup/nightsky-mountains.png');
    await gfx2TextureManager.loadTexture('./templates/shootemup/nightsky-fg.png');
    await gfx2TextureManager.loadTexture('./templates/shootemup/player.png');
    await gfx2TextureManager.loadTexture('./templates/shootemup/enemy1.png');
    await gfx2TextureManager.loadTexture('./templates/shootemup/enemy2.png');
    await gfx2TextureManager.loadTexture('./templates/shootemup/enemy3.png');
    await gfx2TextureManager.loadTexture('./templates/shootemup/bullet.png');
    await gfx2TextureManager.loadTexture('./templates/shootemup/orbit-bullet.png');
    await gfx2TextureManager.loadTexture('./templates/shootemup/circle-bullet.png');
    await gfx2TextureManager.loadTexture('./templates/shootemup/enemy-bullet.png');
    await gfx2TextureManager.loadTexture('./templates/shootemup/enemy-circle-bullet.png');
    this.bgSky1a.setPosition(-300, -300);
    this.bgSky1a.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/nightsky-bg.png'));
    this.bgSky1b.setPosition(-300, -300);
    this.bgSky1b.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/nightsky-bg.png'));
    this.bgSky2a.setPosition(-300, -300);
    this.bgSky2a.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/nightsky-mountains.png'));
    this.bgSky2b.setPosition(-300, -300);
    this.bgSky2b.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/nightsky-mountains.png'));
    this.bgSky3a.setPosition(-300, -300);
    this.bgSky3a.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/nightsky-fg.png'));
    this.bgSky3b.setPosition(-300, -300);
    this.bgSky3b.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/nightsky-fg.png'));

    dnaManager.setup([
      this.shipSystem,
      this.enemySystem,
      this.bulletSystem
    ]);

    uiManager.addNode(this.hud, 'position:absolute; top:10px; width:100%; font-size: 14px;');

    const shipEnt = dnaManager.createEntity();
    dnaManager.addComponent(shipEnt, new ShipComponent());

    this.generateWave();
    
    eventManager.subscribe(this.bulletSystem, 'E_ENEMY_DESTROYED', this, this.handleEnemyDestroyed);
    eventManager.subscribe(this.bulletSystem, 'E_PLAYER_DESTROYED', this, this.handlePlayerDestroyed);
    eventManager.subscribe(this.enemySystem, 'E_PLAYER_DESTROYED', this, this.handlePlayerDestroyed);
  }

  onExit() {
    soundManager.releaseSounds();
    gfx2TextureManager.releaseTextures();
    uiManager.removeNode(this.hud);
    dnaManager.reset();
  }

  update(dt: number) {
    this.addScore(dt * 0.1);

    this.time += dt;
    this.bgSky1a.setPosition((PARALLAX_SCROLL_SPEED * (-0.05) * this.time) % 600 - 300, -300);
    this.bgSky1b.setPosition((PARALLAX_SCROLL_SPEED * (-0.05) * this.time) % 600 + 300, -300);
    this.bgSky2a.setPosition((PARALLAX_SCROLL_SPEED * (-0.4) * this.time) % 600 - 300, -300);
    this.bgSky2b.setPosition((PARALLAX_SCROLL_SPEED * (-0.4) * this.time) % 600 + 300, -300);
    this.bgSky3a.setPosition((PARALLAX_SCROLL_SPEED * (-1.2) * this.time) % 600 - 300, -300);
    this.bgSky3b.setPosition((PARALLAX_SCROLL_SPEED * (-1.2) * this.time) % 600 + 300, -300);

    if (this.waveTimer > WAVE_SPAWN_INTERVAL) {
      this.generateWave();
      this.waveTimer = 0;
    }
    else {
      this.waveTimer += dt;
    }

    dnaManager.update(dt * this.timeScale);

    this.updateHud();
  }

  draw() {
    // Draw background
    this.bgSky1a.draw();
    this.bgSky1b.draw();
    this.bgSky2a.draw();
    this.bgSky2b.draw();
    this.bgSky3a.draw();
    this.bgSky3b.draw();

    // Draw entities
    dnaManager.draw();
  }

  generateWave() {
    const waveNum = ++this.waveCount;
    const randomOffsetX = (Math.random() - 0.5) * 30;
    const randomOffsetY = (Math.random() - 0.5) * 30;
    // Random wave
    // for (let i = 0; i < 5; i++) {
    //   for (let j = 0; j < 3 + Math.floor(waveNum / 5); j++) {
    //     const spawnChance = Math.max(Math.min(waveNum / 10, 1), 0.2);
    //     if (Math.random() < spawnChance) {
    //       const x = j * 90 - 300 + 75 + randomOffsetX;
    //       const y = i * 90 - 300 + 100 + randomOffsetY;
    //       const enemy = dnaManager.createEntity();
    //       dnaManager.addComponent(enemy, new EnemyComponent(x + 600, y, waveNum));
    //     }
    //   }
    // }
    // Wave from the definition
    const wave = WAVES[Math.floor(Math.random() * (WAVES.length - 1))];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 8; j++) {
        const x = j * 90 - 300 + randomOffsetX;
        const y = i * 90 - 300 + 100 + randomOffsetY;
        const enemy = dnaManager.createEntity();
        switch (wave[i][j]) {
          case 1:
            dnaManager.addComponent(enemy, new EnemyComponent(x + 600, y, 1, waveNum));
            break;
          case 2:
            dnaManager.addComponent(enemy, new EnemyComponent(x + 600, y, 2, waveNum));
            break;
          case 3:
            dnaManager.addComponent(enemy, new EnemyComponent(x + 600, y, 3, waveNum));
            break;
          default:
            break;  
        }
      }
    }
  }

  addScore(value: number) {
    this.score += value;
  }

  addXP(value: number) {
    this.currentXP += value;
    if (this.currentXP >= this.nextLevelXP) {
      this.currentXP -= this.nextLevelXP;
      this.levelUp();
    }
  }

  levelUp() {
    this.nextLevelXP = this.calculateNextLevelXP(++this.level);
    
    const shipEnt = dnaManager.findEntity(ShipComponent);
    const ship = dnaManager.getComponent<ShipComponent>(shipEnt, ShipComponent);
    ship.cooldown = Math.max(550 - this.level * 50, 50);
  }

  calculateNextLevelXP(lv: number): number {
    return 50 * lv * lv + 50;
  }

  updateHud() {
    const scoreText: string = `${Math.floor(this.score)}`.padStart(8, '0');
    const killsText: string = `${this.kills}`.padStart(4, '0');
    const xpPctText: string = `${((this.currentXP / this.nextLevelXP) * 100).toFixed(1)}%`;
    this.hud.textContent = `Score: ${scoreText}\u00A0\u00A0\u00A0\u00A0Kills: ${killsText}\u00A0\u00A0\u00A0\u00A0Level: ${this.level} (${xpPctText})`;
  }

  handleEnemyDestroyed(data: { xp: number }) {
    soundManager.playSound('./templates/shootemup/explosion.wav', false);
    this.addScore(100);
    this.addXP(data.xp);
    this.kills++;
  }

  handlePlayerDestroyed() {
    if (this.isInvincible) {
      return;
    }
    screenManager.requestSetScreen(new GameOverScreen(), { score: Math.floor(this.score) });
  }
}

export { GameScreen };
