import { dnaManager } from '../../lib/dna/dna_manager';
import { inputManager } from '../../lib/input/input_manager';
import { gfx2TextureManager } from '../../lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJSS } from '../../lib/gfx2_sprite/gfx2_sprite_jss';
import { DNASystem } from '../../lib/dna/dna_system';
import { DNAComponent } from '../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { BulletComponent } from './bullet';
// ---------------------------------------------------------------------------------------

const MAX_BULLETS = 5;

export class ShipComponent extends DNAComponent {
  speed: number;
  jss: Gfx2SpriteJSS;

  constructor() {
    super('Ship');
    this.speed = 0.5;
    this.jss = new Gfx2SpriteJSS();
    this.jss.setPosition(0, 280 - 32);
    this.jss.setTexture(gfx2TextureManager.getTexture('./tutorials/isolation/ship.png'));
  }
}

export class ShipSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Ship');
  }

  onEntityUpdate(ts: number, eid: number): void {
    const shipCmp = dnaManager.getComponent(eid, 'Ship') as ShipComponent;
    let mx = 0;

    if (inputManager.isActiveAction('LEFT')) {
      mx = -shipCmp.speed * ts;
    }
    else if (inputManager.isActiveAction('RIGHT')) {
      mx = +shipCmp.speed * ts;
    }

    if (shipCmp.jss.getPositionX() + mx >= -300 && shipCmp.jss.getPositionX() + mx <= (300 - 32)) {
      shipCmp.jss.translate(mx, 0);
    }

    shipCmp.jss.update(ts);
  }

  onEntityDraw(eid: number): void {
    const shipCmp = dnaManager.getComponent(eid, 'Ship') as ShipComponent;
    shipCmp.jss.draw();    
  }

  onActionOnce(actionId: string, eid: number): void {
    if (actionId != 'SELECT') {
      return;
    }

    const shipCmp = dnaManager.getComponent(eid, 'Ship') as ShipComponent;
    const bullets = dnaManager.findEntities('Bullet');

    if (bullets.length >= MAX_BULLETS) {
      return;
    }
  
    const bullet = dnaManager.createEntity();
    const bulletComponent = new BulletComponent();

    bulletComponent.jss.setOffsetNormalized(0.5, 0);
    bulletComponent.jss.setPosition(shipCmp.jss.getPositionX() + shipCmp.jss.getTextureRectWidth() / 2,  shipCmp.jss.getPositionY() - 64);
    dnaManager.addComponent(bullet, bulletComponent);
  }
}