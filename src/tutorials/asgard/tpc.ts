import { dnaManager } from '../../lib/dna/dna_manager';
import { UT } from '../../lib/core/utils';
import { DNASystem } from '../../lib/dna/dna_system';
import { DNAComponent } from '../../lib/dna/dna_component';
import { Gfx3CameraOrbit } from '../../lib/gfx3_camera/gfx3_camera_orbit';
// ---------------------------------------------------------------------------------------
import { CharacterComponent } from './character';
import { Gfx3PhysicsJNM } from '../../lib/gfx3_physics/gfx3_physics_jnm';
// ---------------------------------------------------------------------------------------

const RAYCAST_CAMERA_RADIUS = 10;
const RAYCAST_CAMERA_HEIGHT = 10;
const CAMERA_DISTANCE_MAX = 10;

export class TPCComponent extends DNAComponent {
  camera: Gfx3CameraOrbit;
  map: Gfx3PhysicsJNM;

  constructor(map: Gfx3PhysicsJNM) {
    super('TPC');
    this.camera = new Gfx3CameraOrbit(0);
    this.map = map;
  }
}

export class TPCSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('TPC');
    super.addRequiredComponentTypename('Character');
  }

  onUpdate(ts: number, eid: number) {
    const tpcCmp = dnaManager.getComponent(eid, 'TPC') as TPCComponent;
    const characterCmp = dnaManager.getComponent(eid, 'Character') as CharacterComponent;

    const targetPos = UT.VEC3_ADD(characterCmp.jam.getPosition(), [0, 1, 0]);
    const targetToCamera = UT.VEC3_SUBSTRACT(tpcCmp.camera.getPosition(), targetPos);
    const raycast = tpcCmp.map.raycast(targetPos, targetToCamera, RAYCAST_CAMERA_RADIUS, RAYCAST_CAMERA_HEIGHT);

    if (raycast && raycast.distance < CAMERA_DISTANCE_MAX) {
      tpcCmp.camera.setDistance(raycast.distance);
    }
    else {
      tpcCmp.camera.setDistance(CAMERA_DISTANCE_MAX);
    }

    tpcCmp.camera.setTarget(targetPos);
    tpcCmp.camera.update(ts);
  }
}