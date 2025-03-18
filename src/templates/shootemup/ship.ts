import { dnaManager } from '@lib/dna/dna_manager';
import { inputManager } from '@lib/input/input_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { BulletComponent, BulletType } from './bullet';
// ---------------------------------------------------------------------------------------

export class ShipComponent extends DNAComponent {
  speed: number;
  width: number;
  height: number;
  autofire: boolean;
  cooldown: number;
  cooldownTimer: number;
  jss: Gfx2SpriteJSS;

  constructor() {
    super('Ship');
    this.speed = 0.5;
    this.width = 32;
    this.height = 32;
    this.autofire = true;
    this.cooldown = 500; // ms
    this.cooldownTimer = 0;
    this.jss = new Gfx2SpriteJSS();
    this.jss.setPosition(-280, 0 - this.jss.getTextureRectHeight());
    this.jss.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/player.png'));
  }
}

export class ShipSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Ship');
  }

  fire(eid: number, bulletType: BulletType) {
    const ship = dnaManager.getComponent(eid, ShipComponent);
  
    const newBulletEnt = dnaManager.createEntity();
    const newBullet = new BulletComponent(bulletType);
    newBullet.jss.setPosition(ship.jss.getPositionX() + ship.jss.getTextureRectWidth(),  ship.jss.getPositionY() + ship.jss.getTextureRectHeight() / 2 - newBullet.jss.getTextureRectHeight() / 2);
    dnaManager.addComponent(newBulletEnt, newBullet);
  }

  onEntityUpdate(dt: number, eid: number): void {
    const ship = dnaManager.getComponent(eid, ShipComponent);
    let dx = 0;
    let dy = 0;

    if (inputManager.isActiveAction('LEFT')) {
      dx = -ship.speed * dt;
    }
    if (inputManager.isActiveAction('RIGHT')) {
      dx = +ship.speed * dt;
    }
    if (inputManager.isActiveAction('UP')) {
      dy = -ship.speed * dt;
    }
    if (inputManager.isActiveAction('DOWN')) {
      dy = +ship.speed * dt;
    }

    if (dx !== 0 || dy !== 0) {
      if (
        ship.jss.getPositionX() + dx >= -300
        && ship.jss.getPositionX() + dx <= (300 - ship.width)
        && ship.jss.getPositionY() + dy >= -300
        && ship.jss.getPositionY() + dy <= (300 - ship.height)
      ) {
        ship.jss.translate(dx, dy);
      }
    }

    ship.cooldownTimer -= dt;
    if ((inputManager.isActiveAction('FIRE') || ship.autofire) && ship.cooldownTimer <= 0) {
      this.fire(eid, BulletType.Normal);
      this.fire(eid, BulletType.Circle);
      this.fire(eid, BulletType.Orbit);
      ship.cooldownTimer = ship.cooldown;
    }

    ship.jss.update(dt);
  }

  onEntityDraw(eid: number): void {
    const ship = dnaManager.getComponent(eid, ShipComponent);
    ship.jss.draw();    
  }   

  // TODO: not working
  onAction(actionId: string, eid: number): void {
    if (actionId != 'FIRE') {
      return;
    }

    // const bulletEnts = dnaManager.findEntities(BulletComponent);
    // if (bulletEnts.length >= MAX_BULLETS) {
    //   return;
    // }
    // this.fire(eid);
  }
}