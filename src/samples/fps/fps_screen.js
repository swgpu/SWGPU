import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { gfx3MeshRenderer } from '../../lib/gfx3_mesh/gfx3_mesh_renderer';
import { Screen } from '../../lib/screen/screen';
import { Gfx3MeshJSM } from '../../lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3MeshNav } from '../../lib/gfx3_mesh_nav/gfx3_mesh_nav';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------
import { FPSCamera } from './fps_camera';
// ---------------------------------------------------------------------------------------

class FPSScreen extends Screen {
  constructor() {
    super();
    this.map = new Gfx3MeshJSM();
    this.nav = new Gfx3MeshNav();
    this.camera = new FPSCamera(0, this.nav);
  }

  async onEnter() {
    this.camera.setCenter(-1.5, 1, 2.7);
    this.camera.setRotation(0, -Math.PI / 2, 0);

    await this.map.loadFromFile('./samples/fps/map.jsm');
    this.map.setMaterial(new Gfx3Material({
      lightning: true,
      texture: await gfx3TextureManager.loadTexture('./samples/fps/map.png')
    }));
    
    this.nav.loadFromJSM(this.map);
  }

  update(ts) {
    this.camera.update(ts);
    this.map.update(ts);
  }

  draw() {
    gfx3MeshRenderer.drawDirLight([0, -1, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]);
    this.map.draw();
  }
}

export { FPSScreen };