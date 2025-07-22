import { inputManager } from '@lib/input/input_manager';
import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { UT } from '@lib/core/utils';
import { Gfx3CameraOrbit } from '@lib/gfx3_camera/gfx3_camera_orbit';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
import { PhysicsVehiculeComponent } from './physics';
// ---------------------------------------------------------------------------------------

export class InputComponent extends DNAComponent {
  constructor() {
    super('Input');
  }
}

export class InputSystem extends DNASystem {
  camera: Gfx3CameraOrbit;

  constructor(camera: Gfx3CameraOrbit) {
    super();
    super.addRequiredComponentTypename('Input');
    super.addRequiredComponentTypename('PhysicsVehicule');
    super.addRequiredComponentTypename('Entity');
    this.camera = camera;
  }

  onEntityUpdate(ts: number, eid: number) {
    const entity = dnaManager.getComponent(eid, EntityComponent);
    const physics = dnaManager.getComponent(eid, PhysicsVehiculeComponent);
    const cameraAxies = this.camera.getAxies();

    // if (!physics.vCharacter) {
    //   return;
    // }

    const dir: vec3 = [0, 0, 0];

    if (inputManager.isActiveAction('LEFT')) {
      dir[0] += cameraAxies[0][0] * -1;
      dir[2] += cameraAxies[0][2] * -1;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      dir[0] += cameraAxies[0][0];
      dir[2] += cameraAxies[0][2];
    }

    if (inputManager.isActiveAction('UP')) {
      dir[0] += cameraAxies[2][0] * -1;
      dir[2] += cameraAxies[2][2] * -1;
    }

    if (inputManager.isActiveAction('DOWN')) {
      dir[0] += cameraAxies[2][0];
      dir[2] += cameraAxies[2][2];
    }

    // entity.dir = UT.VEC3_NORMALIZE(dir);
  }

  onActionOnce(actionId: string, eid: number) {
    const entity = dnaManager.getComponent(eid, EntityComponent);
    if (actionId == 'SELECT') {
      entity.jump = true;
    }    
  }

  onActionReleased(actionId: string, eid: number) {
    const entity = dnaManager.getComponent(eid, EntityComponent);
    if (actionId == 'SELECT') {
      entity.jump = false;
    }    
  }
}