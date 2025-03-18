import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { eventManager } from '@lib/core/event_manager';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { EnemyComponent } from './enemy';
import { ShipComponent } from './ship';
// ---------------------------------------------------------------------------------------

export enum BulletType {
  EnemySpiral = -3,
  EnemyLaser = -2,
  EnemyNormal = -1,
  Normal = 0,
  Circle = 1,
  Orbit = 2
}

const BULLET_SPEED = 0.8;
const FAST_BULLET_SPEED = 1.2;
const SLOW_BULLET_SPEED = 0.2;
const BULLET_ORBIT_SPEED = 0.02;
const ENEMY_BULLET_SPEED = 0.6;
const ENEMY_BULLET_ORBIT_SPEED = 0.005;

export class BulletComponent extends DNAComponent {
  type: number;
  maxLifetime: number;
  lifetime: number;
  jss: Gfx2SpriteJSS;

  constructor(type: number) {
    super('Bullet');
    this.type = type;
    this.lifetime = 0;
    this.jss = new Gfx2SpriteJSS();
    switch (this.type) {
      case BulletType.Circle:
        this.maxLifetime = 99999;
        this.jss.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/circle-bullet.png'));
        break;
      case BulletType.Orbit:
          this.maxLifetime = 2000;
          this.jss.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/orbit-bullet.png'));
          break;
      case BulletType.EnemyNormal:
          this.maxLifetime = 99999;
          this.jss.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/enemy-circle-bullet.png'));
          break;
        case BulletType.EnemyLaser:
          this.maxLifetime = 99999;
          this.jss.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/enemy-bullet.png'));
          break;
      case BulletType.EnemySpiral:
          this.maxLifetime = 2500;
          this.jss.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/enemy-circle-bullet.png'));
          break;
      default:
        this.maxLifetime = 99999;
        this.jss.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/bullet.png'));
        break;
    }
  }
}

export class BulletSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Bullet');
  }

  onEntityUpdate(dt: number, eid: number): void {
    const bullet = dnaManager.getComponent(eid, BulletComponent);

    bullet.lifetime += dt;
    if (bullet.lifetime >= bullet.maxLifetime) {
      dnaManager.removeEntity(eid);
      return;
    }

    switch (bullet.type) {
    case BulletType.Orbit:
      bullet.jss.translate(10 * Math.sin(BULLET_ORBIT_SPEED * bullet.lifetime) + SLOW_BULLET_SPEED * dt, 10 * -Math.cos(BULLET_ORBIT_SPEED * bullet.lifetime));
      break;
    case BulletType.Circle:
      bullet.jss.translate(FAST_BULLET_SPEED * dt, (Math.random() * 2 - 1) * dt);
      if (bullet.jss.getPositionX() > 300) {
        dnaManager.removeEntity(eid);
        return;
      }
      break;
    case BulletType.EnemyNormal:
    case BulletType.EnemyLaser:
      bullet.jss.translate(-ENEMY_BULLET_SPEED * dt, 0);
      if (bullet.jss.getPositionX() < -300) {
        dnaManager.removeEntity(eid);
        return;
      }
      break;
    case BulletType.EnemySpiral:
      bullet.jss.translate(bullet.lifetime * 0.002 * Math.cos(ENEMY_BULLET_ORBIT_SPEED * bullet.lifetime), bullet.lifetime * 0.002 * Math.sin(ENEMY_BULLET_ORBIT_SPEED * bullet.lifetime));
      break;
    default:
      bullet.jss.translate(BULLET_SPEED * dt, 0);
      if (bullet.jss.getPositionX() > 300) {
        dnaManager.removeEntity(eid);
        return;
      }
    }

    if (bullet.type >= 0) {
      for (const enemyEid of dnaManager.findEntities(EnemyComponent)) {
        const enemy = dnaManager.getComponent(enemyEid, EnemyComponent);
        const bulletRect = bullet.jss.getWorldBoundingRect();
        const enemyRect = enemy.jss.getWorldBoundingRect();

        if (bulletRect.intersectBoundingRect(enemyRect)) {
          if (dnaManager.hasEntity(eid)) {
            dnaManager.removeEntity(eid);
          }

          dnaManager.removeEntity(enemyEid);
          eventManager.emit(this, 'E_ENEMY_DESTROYED', { xp: 5 * enemy.level + 5 });
        }
      }
    } else {
      for (const shipEid of dnaManager.findEntities(ShipComponent)) {
        const ship = dnaManager.getComponent(shipEid, ShipComponent);
        const bulletRect = bullet.jss.getWorldBoundingRect();
        const shipRect = ship.jss.getWorldBoundingRect();

        if (bulletRect.intersectBoundingRect(shipRect)) {
          if (dnaManager.hasEntity(eid)) {
            dnaManager.removeEntity(eid);
          }

          eventManager.emit(this, 'E_PLAYER_DESTROYED');
        }
      }
    }

    bullet.jss.update(dt);
  }

  onEntityDraw(eid: number): void {
    const bulletCmp = dnaManager.getComponent(eid, BulletComponent);
    bulletCmp.jss.draw();
  }
}