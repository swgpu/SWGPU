import { inputManager } from '@lib/input/input_manager';
import { dnaManager } from '@lib/dna/dna_manager';
import { UT } from '@lib/core/utils';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { CharacterComponent } from './character';
import { CharacterCameraComponent } from './character_camera';
// ---------------------------------------------------------------------------------------

export class CharacterInputComponent extends DNAComponent {
  constructor() {
    super('CharacterInput');
  }
}

export class CharacterInputSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('CharacterInput');
    super.addRequiredComponentTypename('CharacterCamera');
    super.addRequiredComponentTypename('Character');
  }

  onEntityUpdate(ts: number, eid: number) {
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

    const character = dnaManager.getComponent<CharacterComponent>(eid, 'Character');

    if (moving) {
      const camera = dnaManager.getComponent<CharacterCameraComponent>(eid, 'CharacterCamera');
      const phi = camera.rec.getPhi();
      const x = Math.cos(phi + moveAngle);
      const z = Math.sin(phi + moveAngle);      
      character.moveDir = [-x, 0, -z];
      character.rotation = UT.VEC2_ANGLE([-x, -z]);
    }
    else {
      character.moveDir = [0, 0, 0];
    }
  }
}