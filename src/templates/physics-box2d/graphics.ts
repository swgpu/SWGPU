import { dnaManager } from '@lib/dna/dna_manager';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
// ---------------------------------------------------------------------------------------

export class GraphicsComponent extends DNAComponent {
  jss: Gfx2SpriteJSS;

  constructor() {
    super('Graphics');
    this.jss = new Gfx2SpriteJSS();
  }
}

export class GraphicsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Graphics');
    super.addRequiredComponentTypename('Entity');
  }

  onEntityUpdate(ts: number, eid: number) {
    const graphics = dnaManager.getComponent(eid, GraphicsComponent);
    const entity = dnaManager.getComponent(eid, EntityComponent);

    graphics.jss.setRotation(entity.rotation);
    graphics.jss.setPosition(entity.x, entity.y);
    graphics.jss.update(ts);
  }

  onEntityDraw(eid: number): void {
    const graphics = dnaManager.getComponent(eid, GraphicsComponent);
    graphics.jss.draw();
  }
}