import { dnaManager } from '../../lib/dna/dna_manager';
import { UT } from '../../lib/core/utils';
import { Gfx3MeshJAM } from '../../lib/gfx3_mesh/gfx3_mesh_jam';
import { DNASystem } from '../../lib/dna/dna_system';
import { DNAComponent } from '../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { CharacterComponent } from './character';
// ---------------------------------------------------------------------------------------

export class CharacterGraphicsComponent extends DNAComponent {
  jam: Gfx3MeshJAM;

  constructor() {
    super('CharacterGraphics');
    this.jam = new Gfx3MeshJAM();
  }
}

export class CharacterGraphicsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('CharacterGraphics');
    super.addRequiredComponentTypename('Character');
  }

  onEntityUpdate(ts: number, eid: number) {
    const graphics = dnaManager.getComponent(eid, 'CharacterGraphics') as CharacterGraphicsComponent;
    const character = dnaManager.getComponent(eid, 'Character') as CharacterComponent;

    graphics.jam.setRotation(0, character.rotation, 0);
    graphics.jam.setPosition(character.x, character.y, character.z); 

    if (UT.VEC3_LENGTH(character.velocity) > 0.1) {
      graphics.jam.play('RUN', true, true);
    }
    else {
      graphics.jam.play('IDLE', true, true);
    }

    graphics.jam.update(ts);
  }

  onEntityDraw(eid: number): void {
    const graphics = dnaManager.getComponent(eid, 'CharacterGraphics') as CharacterGraphicsComponent;
    graphics.jam.draw();
  }
}