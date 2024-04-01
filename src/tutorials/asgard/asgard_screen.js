import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { Screen } from '../../lib/screen/screen';
import { Gfx3MeshJSM } from '../../lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3MeshNav } from '../../lib/gfx3_mesh_nav/gfx3_mesh_nav';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3CameraOrbit } from '../../lib/gfx3_camera/gfx3_camera_orbit';
// ---------------------------------------------------------------------------------------
import { Player } from './player';
// ---------------------------------------------------------------------------------------

class AsgardScreen extends Screen {
  constructor() {
    super();
    this.map = new Gfx3MeshJSM();
    this.nav = new Gfx3MeshNav();
    this.camera = new Gfx3CameraOrbit(0);
    this.player = new Player(this.nav);
  }

  async onEnter() {
    await this.map.loadFromFile('./map.jsm');
    this.map.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTexture('./map.png')
    }));
    
    this.nav.loadFromMesh(this.map);

    await this.player.loadFromFile('./barret.jam');
    this.player.play('IDLE', true);
    this.player.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTexture('./barret.png')
    }));
  }

  update(ts) {
    this.camera.setTarget(this.player.getPosition());
    this.map.update(ts);
    this.camera.update(ts);
    this.player.update(ts);
  }

  draw() {
    this.map.draw();
    this.player.draw();
  }
}

export { AsgardScreen };