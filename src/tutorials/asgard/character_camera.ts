import { dnaManager } from '../../lib/dna/dna_manager';
import { UT } from '../../lib/core/utils';
import { DNASystem } from '../../lib/dna/dna_system';
import { DNAComponent } from '../../lib/dna/dna_component';
import { Gfx3CameraOrbit } from '../../lib/gfx3_camera/gfx3_camera_orbit';
// ---------------------------------------------------------------------------------------
import { CharacterComponent } from './character';
import { Gfx3PhysicsJNM } from '../../lib/gfx3_physics/gfx3_physics_jnm';
// ---------------------------------------------------------------------------------------

export class CharacterCameraComponent extends DNAComponent {
  rec: Gfx3CameraOrbit;
  distanceMax: number;
  map: Gfx3PhysicsJNM;

  constructor(map: Gfx3PhysicsJNM) {
    super('CharacterCamera');
    this.rec = new Gfx3CameraOrbit(0);
    this.distanceMax = 10;
    this.map = map;
  }
}

export class CharacterCameraSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('CharacterCamera');
    super.addRequiredComponentTypename('Character');
  }

  onEntityUpdate(ts: number, eid: number) {
    const camera = dnaManager.getComponent(eid, 'CharacterCamera') as CharacterCameraComponent;
    const character = dnaManager.getComponent(eid, 'Character') as CharacterComponent;

    const targetPos: vec3 = [character.x, character.y + 1, character.z];
    const targetToCamera = UT.VEC3_SUBSTRACT(camera.rec.getPosition(), targetPos);
    const raycast = camera.map.raycast(targetPos, targetToCamera, camera.distanceMax, camera.distanceMax);

    if (raycast && raycast.distance < camera.distanceMax) {
      camera.rec.setDistance(raycast.distance);
    }
    else {
      camera.rec.setDistance(camera.distanceMax);
    }

    camera.rec.setTarget(targetPos);
    camera.rec.update(ts);
  }
}