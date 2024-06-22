import { dnaManager } from '@lib/dna/dna_manager';
import { UT } from '@lib/core/utils';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
import { Gfx3CameraOrbit } from '@lib/gfx3_camera/gfx3_camera_orbit';
import { Gfx3PhysicsJNM } from '@lib/gfx3_physics/gfx3_physics_jnm';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
// ---------------------------------------------------------------------------------------

export class CameraComponent extends DNAComponent {
  map: Gfx3PhysicsJNM;
  rec: Gfx3CameraOrbit;
  distanceMax: number;

  constructor(map: Gfx3PhysicsJNM) {
    super('Camera');
    this.map = map;
    this.rec = new Gfx3CameraOrbit(0);
    this.distanceMax = 10;
  }
}

export class CameraSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Camera');
    super.addRequiredComponentTypename('Entity');
  }

  onEntityUpdate(ts: number, eid: number) {
    const camera = dnaManager.getComponent(eid, CameraComponent);
    const entity = dnaManager.getComponent(eid, EntityComponent);

    const targetPos: vec3 = [entity.x, entity.y + 1, entity.z];
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