import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { Screen } from '../../lib/screen/screen';
import { Gfx3MeshJSM } from '../../lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3CameraOrbit } from '../../lib/gfx3_camera/gfx3_camera_orbit';
import { Gfx3PhysicsJNM } from '../../lib/gfx3_physics/gfx3_physics_jnm';
// ---------------------------------------------------------------------------------------
import { Character } from './character';
// ---------------------------------------------------------------------------------------

class AsgardScreen extends Screen {
  constructor() {
    super();
    this.camera = new Gfx3CameraOrbit(0);
    this.map = {};
    this.player = {};
  }

  async onEnter() {
    this.map = await this.createMap();
    this.player = await this.createPlayer(this.map.jnm);
  }

  update(ts) {
    // this.camera.setTarget(this.player.getPosition());
    this.map.mesh.update(ts);
    this.map.jnm.update(ts);
    this.camera.update(ts);
    this.player.update(ts);
  }

  draw() {
    this.map.mesh.draw();
    this.map.jnm.draw();
    this.player.draw();
  }

  async createMap() {
    const mesh = new Gfx3MeshJSM();
    await mesh.loadFromFile('./tutorials/asgard/map.jsm');
    mesh.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTexture('./tutorials/asgard/map.png')
    }));

    const jnm = new Gfx3PhysicsJNM();
    jnm.enableDebug(false);
    await jnm.loadFromFile('./tutorials/asgard/map.jnm');

    return { mesh, jnm };
  }

  async createPlayer(jnm) {
    const entity = new Character(jnm);
    await entity.load('./tutorials/asgard/barret.jam', './tutorials/asgard/barret.png');
    return entity;
  }
}

export { AsgardScreen };