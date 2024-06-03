import { dnaManager } from '@lib/dna/dna_manager';
import { UT } from '@lib/core/utils';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
// ---------------------------------------------------------------------------------------

export class GraphicsComponent extends DNAComponent {
  jsm: Gfx3MeshJSM;

  constructor() {
    super('Graphics');
    this.jsm = new Gfx3MeshJSM();
  }
}

export class GraphicsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Graphics');
    super.addRequiredComponentTypename('Entity');
  }

  onEntityUpdate(ts: number, eid: number) {
    const graphics = dnaManager.getComponent<GraphicsComponent>(eid, 'Graphics');
    const entity = dnaManager.getComponent<EntityComponent>(eid, 'Entity');
    const yaw = UT.LERP(graphics.jsm.getRotationY(), entity.rotation, (ts / 1000) * 10);

    graphics.jsm.setRotation(0, yaw, 0);
    graphics.jsm.setPosition(entity.x, entity.y, entity.z);
    graphics.jsm.update(ts);
  }

  onEntityDraw(eid: number): void {
    const graphics = dnaManager.getComponent<GraphicsComponent>(eid, 'Graphics');
    graphics.jsm.draw();
  }
}