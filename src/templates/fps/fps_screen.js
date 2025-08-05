import { inputManager } from '@lib/input/input_manager';
import { gfx3Manager } from '@lib/gfx3/gfx3_manager';
import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { gfx3MeshRenderer } from '@lib/gfx3_mesh/gfx3_mesh_renderer';
import { gfx3PostRenderer, PostParam } from '@lib/gfx3_post/gfx3_post_renderer';
import { Screen } from '@lib/screen/screen';
import { Gfx3Camera } from '@lib/gfx3_camera/gfx3_camera';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '@lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3PhysicsJNM } from '@lib/gfx3_physics/gfx3_physics_jnm';
// ---------------------------------------------------------------------------------------
import { Player } from './player';
// ---------------------------------------------------------------------------------------

const POST_SHADER_FRAG_END = `
if(id.r == 1.0f)
{
  return ch1;
}`;

class FPSScreen extends Screen {
  constructor() {
    super();
    this.map = {};
    this.player = null;
    this.camera = new Gfx3Camera(0);
  }

  async onEnter() {
    inputManager.setPointerLockEnabled(true);
    gfx3PostRenderer.setShaderInserts({ FRAG_END: POST_SHADER_FRAG_END });

    this.map = await this.createMap();
    this.player = new Player(this.map.jnm, this.camera);
    await this.player.load();
  }

  update(ts) {
    this.map.mesh.update(ts);
    this.player.update(ts);
  }

  draw() {
    gfx3Manager.beginDrawing();
    gfx3MeshRenderer.setAmbientColor([0.5, 0.5, 0.5]);
    gfx3MeshRenderer.drawDirLight([0, -1, 0], [1, 1, 1], [0, 0, 0]);
    
    this.player.draw();
    this.map.mesh.draw();
    gfx3Manager.endDrawing();
  }

  render(ts) {
    gfx3Manager.beginRender();
    gfx3Manager.setDestinationTexture(gfx3PostRenderer.getSourceTexture());
    gfx3Manager.beginPassRender(0);
    gfx3MeshRenderer.render(ts);
    gfx3Manager.endPassRender();
    gfx3PostRenderer.render(ts, gfx3Manager.getCurrentRenderingTexture());
    gfx3Manager.endRender();
  }

  async createMap() {
    const mesh = new Gfx3MeshJSM();
    await mesh.loadFromFile('./templates/fps/map.jsm');
    mesh.setId(0.0, 0.0, 0.0, 0.0);
    mesh.mat.setLightning(true);
    mesh.mat.setTexture(await gfx3TextureManager.loadTextureMips('./templates/fps/map.png', {
      magFilter: 'nearest',
      minFilter: 'nearest',
      mipmapFilter: 'linear'
    }));

    const jnm = new Gfx3PhysicsJNM();
    await jnm.loadFromFile('./templates/fps/map.jnm');

    return { mesh, jnm };
  }
}

export { FPSScreen };