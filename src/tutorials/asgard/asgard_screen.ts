import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { Screen } from '../../lib/screen/screen';
import { UT } from '../../lib/core/utils';
import { Gfx3MeshJSM } from '../../lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3CameraOrbit } from '../../lib/gfx3_camera/gfx3_camera_orbit';
import { Gfx3PhysicsJNM } from '../../lib/gfx3_physics/gfx3_physics_jnm';
// ---------------------------------------------------------------------------------------
import { Character } from './character';
// ---------------------------------------------------------------------------------------

const RAYCAST_CAMERA_RADIUS = 10;
const RAYCAST_CAMERA_HEIGHT = 10;
const CAMERA_DISTANCE_MAX = 10;

class AsgardScreen extends Screen {
  camera: Gfx3CameraOrbit;
  mapJSM: Gfx3MeshJSM;
  mapJNM: Gfx3PhysicsJNM;
  player: Character;

  constructor() {
    super();
    this.camera = new Gfx3CameraOrbit(0);
    this.mapJSM = new Gfx3MeshJSM();
    this.mapJNM = new Gfx3PhysicsJNM();
    this.player = new Character(this.mapJNM, this.camera);
  }

  async onEnter() {
    this.mapJSM = new Gfx3MeshJSM();
    await this.mapJSM.loadFromFile('./tutorials/asgard/map.jsm');
    this.mapJSM.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTexture('./tutorials/asgard/map.png')
    }));

    this.mapJNM = new Gfx3PhysicsJNM();
    await this.mapJNM.loadFromFile('./tutorials/asgard/map.jnm');

    this.player = new Character(this.mapJNM, this.camera);
    await this.player.loadFromFile('./tutorials/asgard/barret.jam', './tutorials/asgard/barret.png');
  }

  update(ts: number) {
    const targetPos = UT.VEC3_ADD(this.player.position, [0, 1, 0]);
    const targetToCamera = UT.VEC3_SUBSTRACT(this.camera.getPosition(), targetPos);
    const raycast = this.mapJNM.raycast(targetPos, targetToCamera, RAYCAST_CAMERA_RADIUS, RAYCAST_CAMERA_HEIGHT);

    if (raycast && raycast.distance < CAMERA_DISTANCE_MAX) {
      this.camera.setDistance(raycast.distance);
    }
    else {
      this.camera.setDistance(CAMERA_DISTANCE_MAX);
    }

    this.camera.setTarget(targetPos);
    this.mapJSM.update(ts);
    this.mapJNM.update(ts);
    this.camera.update(ts);
    this.player.update(ts);
  }

  draw() {
    this.mapJSM.draw();
    this.player.draw();
  }
}

export { AsgardScreen };