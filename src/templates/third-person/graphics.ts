import { dnaManager } from '@lib/dna/dna_manager';
import { UT } from '@lib/core/utils';
import { Gfx3MeshJAM } from '@lib/gfx3_mesh/gfx3_mesh_jam';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
// ---------------------------------------------------------------------------------------

export class GraphicsComponent extends DNAComponent {
  jam: Gfx3MeshJAM;

  constructor() {
    super('Graphics');
    this.jam = new Gfx3MeshJAM();
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

    const rotation = UT.SIGNED_ANGLE(entity.rotation);
    const yaw = UT.LERP(graphics.jam.getRotationY(), rotation, (ts / 1000) * 20);

    graphics.jam.setRotation(0, yaw, 0);
    graphics.jam.setPosition(entity.x, entity.y, entity.z); 

    if (UT.VEC3_LENGTH(entity.velocity) > 0) {
      graphics.jam.play('RUN', true, true);
    }
    else {
      graphics.jam.play('IDLE', true, true);
    }

    graphics.jam.update(ts);
  }

  onEntityDraw(eid: number): void {
    const graphics = dnaManager.getComponent<GraphicsComponent>(eid, 'Graphics');
    graphics.jam.draw();
  }
}