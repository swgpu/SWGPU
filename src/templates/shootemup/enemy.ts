import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { eventManager } from '@lib/core/event_manager';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { ShipComponent } from './ship';
import { BulletComponent, BulletType } from './bullet';
// ---------------------------------------------------------------------------------------

const MAX_ENEMY_SPEED = 0.5;
const MIN_ENEMY_FIRE_COOLDOWN = 500;

export class EnemyComponent extends DNAComponent {
  type: number;
  level: number;
  speed: number;
  width: number;
  height: number;
  fireCooldown: number;
  fireCooldownTimer: number;
  raidDuration: number;
  raidDistance: number;
  raidStartTimer: number;
  raidEndTimer: number;
  jss: Gfx2SpriteJSS;
  // explosion: Gfx2SpriteJAS;

  constructor(x: number, y: number, type: number,level: number) {
    super('Enemy');
    this.type = type;
    this.level = level;
    this.speed = Math.min(0.05 * (Math.floor(this.level / 5) + 1), MAX_ENEMY_SPEED);
    this.width = 32;
    this.height = 32;
    this.fireCooldown = Math.max(2000 - 100 * this.level, MIN_ENEMY_FIRE_COOLDOWN);
    this.fireCooldownTimer = this.fireCooldown * Math.random();
    this.raidDuration = 0;
    this.raidDistance = (y > 0 ? -1 : 1) * 600 * Math.random();
    this.raidStartTimer = (1000 / this.speed) * Math.random();
    this.raidEndTimer = 1000;
    this.jss = new Gfx2SpriteJSS();
    this.jss.setPosition(x, y);
    switch (this.type) {
    case 2:
      this.raidDuration = 1000;
      this.jss.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/enemy2.png'));
      break;
    case 3:
      this.raidDuration = 2000;
      this.jss.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/enemy3.png'));
      break;
    default:
      this.raidDuration = 0;
      this.jss.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/enemy1.png'));
    }
    // this.explosion = new Gfx2SpriteJAS();
    // this.explosion.setPosition(x, y);
    // this.explosion.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/explosion.png'));
  }
}

export class EnemySystem extends DNASystem {
  fireCooldown: number;
  fireCooldownTimer: number;

  constructor() {
    super();
    super.addRequiredComponentTypename('Enemy');
    this.fireCooldown = 500;
    this.fireCooldownTimer = this.fireCooldown * Math.random();
  }

  onBeforeUpdate(dt: number): void {
    this.fireCooldownTimer -= dt;
  }

  onEntityUpdate(dt: number, eid: number): void {
    const enemy = dnaManager.getComponent(eid, EnemyComponent);

    enemy.raidStartTimer -= dt;

    let dx = 0;
    let dy = 0;
    // Determine the enemy's movement based on its type
    switch (enemy.type) {
    default:
      dx = -enemy.speed * dt;
      if (enemy.raidStartTimer <= 0) {
        enemy.raidEndTimer -= dt;
        if (enemy.raidEndTimer > 0) {
          dy = enemy.raidDistance * dt / enemy.raidDuration;
          if (enemy.jss.getPositionY() + dy < -300 || enemy.jss.getPositionY() + dy + enemy.jss.getTextureRectHeight() > 300) {
            dy = 0;
          }
        }
      }
    }

    // Move the enemy
    enemy.jss.translate(dx, dy);

    // Remove out of screen enemies
    if (enemy.jss.getPositionX() < -300 - enemy.width) {
      dnaManager.removeEntity(eid);
      return;
    }

    // Fire bullets
    enemy.fireCooldownTimer -= dt;
    if (enemy.fireCooldownTimer <= 0 && (this.fireCooldownTimer <= 0 && Math.random() < 0.5 || enemy.type === 3)) {
      const newBulletEnt = dnaManager.createEntity();
      if (enemy.type === 2) {
        const newBullet = new BulletComponent(BulletType.EnemyLaser);
        newBullet.jss.setPosition(enemy.jss.getPositionX() - newBullet.jss.getTextureRectWidth(),  enemy.jss.getPositionY() + enemy.jss.getTextureRectHeight() / 2 - newBullet.jss.getTextureRectHeight() / 2);
        dnaManager.addComponent(newBulletEnt, newBullet);
      } else if (enemy.type === 3) {
        const newBullet = new BulletComponent(BulletType.EnemySpiral);
        newBullet.jss.setPosition(enemy.jss.getPositionX() - newBullet.jss.getTextureRectWidth(),  enemy.jss.getPositionY() + enemy.jss.getTextureRectHeight() / 2 - newBullet.jss.getTextureRectHeight() / 2);
        dnaManager.addComponent(newBulletEnt, newBullet);
      } else {
        const newBullet = new BulletComponent(BulletType.EnemyNormal);
        newBullet.jss.setPosition(enemy.jss.getPositionX() - newBullet.jss.getTextureRectWidth(),  enemy.jss.getPositionY() + enemy.jss.getTextureRectHeight() / 2 - newBullet.jss.getTextureRectHeight() / 2);
        dnaManager.addComponent(newBulletEnt, newBullet);
      }
      enemy.fireCooldownTimer = enemy.fireCooldown;

      this.fireCooldownTimer = this.fireCooldown;
    }

    // Check for collisions with the player
    const shipEnt = dnaManager.findEntity(ShipComponent);
    const ship = dnaManager.getComponent<ShipComponent>(shipEnt, ShipComponent);

    const shipRect = ship.jss.getWorldBoundingRect();
    const enemyRect = enemy.jss.getWorldBoundingRect();

    if (shipRect.intersectBoundingRect(enemyRect)) {
      eventManager.emit(this, 'E_PLAYER_DESTROYED');
      return;
    }

    enemy.jss.update(dt);
  }

  onEntityDraw(eid: number): void {
    const enemy = dnaManager.getComponent(eid, EnemyComponent);
    enemy.jss.draw();
  }
}
