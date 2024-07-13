import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { eventManager } from '@lib/core/event_manager';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { ShipComponent } from './ship';
// ---------------------------------------------------------------------------------------

export class AsteroidComponent extends DNAComponent {
  jss: Gfx2SpriteJSS;

  constructor(x: number, y: number) {
    super('Asteroid');
    this.jss = new Gfx2SpriteJSS();
    this.jss.setPosition(x, y);
    this.jss.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/asteroid.png'));
  }
}

export class AsteroidSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Asteroid');
  }

  onEntityUpdate(ts: number, eid: number): void {
    const asteroid = dnaManager.getComponent(eid, AsteroidComponent);
    asteroid.jss.translate(0, 7 * (ts / 100));

    if (asteroid.jss.getPositionY() > 300) {
      dnaManager.removeEntity(eid);
      return;
    }

    const shipEnt = dnaManager.findEntity(ShipComponent);
    const ship = dnaManager.getComponent(shipEnt, ShipComponent);

    const shipRect = ship.jss.getWorldBoundingRect();
    const asteroidRect = asteroid.jss.getWorldBoundingRect();

    if (shipRect.intersectBoundingRect(asteroidRect)) {
      eventManager.emit(this, 'E_PLAYER_DESTROYED');
      return;
    }

    asteroid.jss.update(ts);
  }

  onEntityDraw(eid: number): void {
    const asteroid = dnaManager.getComponent(eid, AsteroidComponent);
    asteroid.jss.draw();
  }
}