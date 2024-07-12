import { dnaManager } from '@lib/dna/dna_manager';
import { inputManager } from '@lib/input/input_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { BulletComponent } from './bullet';
// ---------------------------------------------------------------------------------------

const MAX_BULLETS = 5;

export class ShipComponent extends DNAComponent {
  speed: number;
  jss: Gfx2SpriteJSS;

  constructor() {
    super('Ship');
    this.speed = 25;
    this.jss = new Gfx2SpriteJSS();
    this.jss.setPosition(0, 280 - 32);
    this.jss.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/ship.png'));
  }
}

export class ShipSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Ship');
  }

  onEntityUpdate(ts: number, eid: number): void {
    const ship = dnaManager.getComponent(eid, ShipComponent);
    let mx = 0;

    if (inputManager.isActiveAction('LEFT')) {
      mx -= ship.speed;
    }
    else if (inputManager.isActiveAction('RIGHT')) {
      mx += ship.speed;
    }

    if (mx != 0 && ship.jss.getPositionX() + mx >= -300 && ship.jss.getPositionX() + mx <= (300 - 32)) {
      ship.jss.translate(mx * (ts / 100), 0);
    }

    ship.jss.update(ts);
  }

  onEntityDraw(eid: number): void {
    const ship = dnaManager.getComponent(eid, ShipComponent);
    ship.jss.draw();    
  }

  onActionOnce(actionId: string, eid: number): void {
    if (actionId != 'UP') {
      return;
    }

    const ship = dnaManager.getComponent(eid, ShipComponent);
    const bulletEnts = dnaManager.findEntities(BulletComponent);

    if (bulletEnts.length >= MAX_BULLETS) {
      return;
    }
  
    const newBulletEnt = dnaManager.createEntity();
    const newBullet = new BulletComponent();

    newBullet.jss.setOffsetNormalized(0.5, 0);
    newBullet.jss.setPosition(ship.jss.getPositionX() + ship.jss.getTextureRectWidth() / 2,  ship.jss.getPositionY() - 64);
    dnaManager.addComponent(newBulletEnt, newBullet);
  }
}