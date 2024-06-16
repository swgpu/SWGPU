import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { eventManager } from '@lib/core/event_manager';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { AsteroidComponent } from './asteroid';
// ---------------------------------------------------------------------------------------

export class BulletComponent extends DNAComponent {
  jss: Gfx2SpriteJSS;

  constructor() {
    super('Bullet');
    this.jss = new Gfx2SpriteJSS();
    this.jss.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/bullet.png'));
  }
}

export class BulletSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Bullet');
  }

  onEntityUpdate(ts: number, eid: number): void {
    const bullet = dnaManager.getComponent<BulletComponent>(eid, 'Bullet');

    bullet.jss.translate(0, -0.6);
    if (bullet.jss.getPositionY() < -300) {
      dnaManager.removeEntity(eid);
      return;
    }

    for (const asteroidEid of dnaManager.findEntities('Asteroid')) {
      const asteroid = dnaManager.getComponent<AsteroidComponent>(asteroidEid, 'Asteroid');
      const bulletRect = bullet.jss.getWorldBoundingRect();
      const asteroidRect = asteroid.jss.getWorldBoundingRect();

      if (bulletRect.intersectBoundingRect(asteroidRect)) {
        if (dnaManager.hasEntity(eid)) {
          dnaManager.removeEntity(eid);
        }

        dnaManager.removeEntity(asteroidEid);
        eventManager.emit(this, 'E_ASTEROID_DESTROYED');
      }
    }

    bullet.jss.update(ts);
  }

  onEntityDraw(eid: number): void {
    const bulletCmp = dnaManager.getComponent<BulletComponent>(eid, 'Bullet');
    bulletCmp.jss.draw();
  }
}