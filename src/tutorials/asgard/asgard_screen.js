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

const CAMERA_DISTANCE_MAX = 10;

class AsgardScreen extends Screen {
  constructor() {
    super();
    this.camera = new Gfx3CameraOrbit(0);
    this.map = {};
    this.player = {};
  }

  async onEnter() {
    this.map = await this.createMap();
    this.player = await this.createPlayer(this.map.jnm, this.camera);
  }

  update(ts) {
    const targetPos = [this.player.x, this.player.y + 1, this.player.z];
    const targetToCamera = UT.VEC3_SUBSTRACT(this.camera.getPosition(), targetPos);
    const raycast = this.map.jnm.raycast(targetPos, targetToCamera, CAMERA_DISTANCE_MAX, 2);

    if (raycast && raycast.distance < CAMERA_DISTANCE_MAX) {
      this.camera.setDistance(raycast.distance);
    }
    else {
      this.camera.setDistance(CAMERA_DISTANCE_MAX);
    }

    this.camera.setTarget(targetPos);
    this.map.mesh.update(ts);
    this.map.jnm.update(ts);
    this.camera.update(ts);
    this.player.update(ts);
  }

  draw() {
    this.map.mesh.draw();
    this.player.draw();
  }

  async createMap() {
    const mesh = new Gfx3MeshJSM();
    await mesh.loadFromFile('./tutorials/asgard/map.jsm');
    mesh.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTexture('./tutorials/asgard/map.png')
    }));

    const jnm = new Gfx3PhysicsJNM();
    await jnm.loadFromFile('./tutorials/asgard/map.jnm');

    return { mesh, jnm };
  }

  async createPlayer(jnm, camera) {
    const entity = new Character(jnm, camera);
    await entity.load('./tutorials/asgard/barret.jam', './tutorials/asgard/barret.png');
    return entity;
  }
}

export { AsgardScreen };