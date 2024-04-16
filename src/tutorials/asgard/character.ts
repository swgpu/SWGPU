import { dnaManager } from '../../lib/dna/dna_manager';
import { UT } from '../../lib/core/utils';
import { Gfx3MeshJAM } from '../../lib/gfx3_mesh/gfx3_mesh_jam';
import { DNASystem } from '../../lib/dna/dna_system';
import { DNAComponent } from '../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class CharacterComponent extends DNAComponent {
  velocity: vec3;
  rotation: number;
  jam: Gfx3MeshJAM;

  constructor() {
    super('Character');
    this.velocity = [0, 0, 0];
    this.rotation = 0;
    this.jam = new Gfx3MeshJAM();
  }
}

export class CharacterSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Character');
  }

  onEntityUpdate(ts: number, eid: number) {
    const characterCmp = dnaManager.getComponent(eid, 'Character') as CharacterComponent;
    characterCmp.jam.setRotation(0, characterCmp.rotation, 0);

    if (UT.VEC3_LENGTH(characterCmp.velocity) > 0.1) {
      characterCmp.jam.play('RUN', true, true);
    }
    else {
      characterCmp.jam.play('IDLE', true, true);
    }

    characterCmp.jam.update(ts);
  }

  onEntityDraw(eid: number): void {
    const characterCmp = dnaManager.getComponent(eid, 'Character') as CharacterComponent;
    characterCmp.jam.draw();
  }
}