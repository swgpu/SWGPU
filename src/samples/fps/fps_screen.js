import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { gfx3MeshRenderer } from '../../lib/gfx3_mesh/gfx3_mesh_renderer';
import { Screen } from '../../lib/screen/screen';
import { Gfx3Camera } from '../../lib/gfx3_camera/gfx3_camera';
import { Gfx3MeshJSM } from '../../lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3PhysicsJNM } from '../../lib/gfx3_physics/gfx3_physics_jnm';
// ---------------------------------------------------------------------------------------
import { Player } from './player';
// ---------------------------------------------------------------------------------------

class FPSScreen extends Screen {
  constructor() {
    super();
    this.map = {};
    this.player = null;
    this.camera = new Gfx3Camera(0);
  }

  async onEnter() {
    this.map = await this.createMap();
    this.player = new Player(this.map.jnm, this.camera);
  }

  update(ts) {
    this.map.mesh.update(ts);
    this.map.jnm.update(ts);
    this.player.update(ts);
  }

  draw() {
    gfx3MeshRenderer.drawDirLight([0, -1, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]);
    this.map.mesh.draw();
    this.map.jnm.draw();
  }

  async createMap() {
    const mesh = new Gfx3MeshJSM();
    await mesh.loadFromFile('./samples/fps/Level.jsm');
    mesh.setMaterial(new Gfx3Material({
      lightning: true,
      texture: await gfx3TextureManager.loadTexture('./samples/fps/map.png')
    }));

    const jnm = new Gfx3PhysicsJNM();
    await jnm.loadFromFile('./samples/fps/Level.jnm');

    return { mesh, jnm };
  }
}

export { FPSScreen };