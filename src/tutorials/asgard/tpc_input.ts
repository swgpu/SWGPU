import { inputManager } from '../../lib/input/input_manager';
import { dnaManager } from '../../lib/dna/dna_manager';
import { UT } from '../../lib/core/utils';
import { DNASystem } from '../../lib/dna/dna_system';
import { DNAComponent } from '../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { CharacterComponent } from './character';
import { TPCComponent } from './tpc';
// ---------------------------------------------------------------------------------------

export class TPCInputComponent extends DNAComponent {
  constructor() {
    super('TPCInput');
  }
}

export class TPCInputSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('TPCInput');
    super.addRequiredComponentTypename('TPC');
    super.addRequiredComponentTypename('Character');
  }

  onUpdate(ts: number, eid: number) {
    let moving = false;
    let moveAngle = 0;

    if (inputManager.isActiveAction('LEFT')) {
      moveAngle = -Math.PI / 2;
      moving = true;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      moveAngle = Math.PI / 2;
      moving = true;
    }

    if (inputManager.isActiveAction('UP')) {
      moveAngle = 0;
      moving = true;
    }

    if (inputManager.isActiveAction('DOWN')) {
      moveAngle = -Math.PI;
      moving = true;
    }

    if (moving) {
      const tpcCmp = dnaManager.getComponent(eid, 'TPC') as TPCComponent;
      const phi = tpcCmp.camera.getPhi();
      const x = Math.cos(phi + moveAngle);
      const z = Math.sin(phi + moveAngle);

      const characterCmp = dnaManager.getComponent(eid, 'Character') as CharacterComponent;
      characterCmp.velocity = [-x, 0, -z];
      characterCmp.rotation = UT.VEC2_ANGLE([characterCmp.velocity[0], characterCmp.velocity[2]]);
    }
  }
}