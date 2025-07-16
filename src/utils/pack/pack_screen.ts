import { gfx3DebugRenderer } from '@lib/gfx3/gfx3_debug_renderer';
import { gfx3MeshRenderer } from '@lib/gfx3_mesh/gfx3_mesh_renderer';
import { gfx3Manager } from '@lib/gfx3/gfx3_manager';
import { gfx3MeshShadowRenderer } from '@lib/gfx3_mesh/gfx3_mesh_shadow_renderer';
import { gfx3SpriteRenderer } from '@lib/gfx3_sprite/gfx3_sprite_renderer';
import { gfx3SkyboxRenderer } from '@lib/gfx3_skybox/gfx3_skybox_renderer';
import { gfx3FlareRenderer } from '@lib/gfx3_flare/gfx3_flare_renderer';
import { gfx3ParticlesRenderer } from '@lib/gfx3_particules/gfx3_particles_renderer';
import { gfx3PostRenderer } from '@lib/gfx3_post/gfx3_post_renderer';
import { gfx3ShadowVolumeRenderer } from '@lib/gfx3_shadow_volume/gfx3_shadow_volume_renderer';
import { UT } from '@lib/core/utils';
import { Screen } from '@lib/screen/screen';
import { Gfx3CameraWASD } from '@lib/gfx3_camera/gfx3_camera_wasd';
import { EnginePack3D } from '@lib/engine/engine_pack_3d';
// ---------------------------------------------------------------------------------------

class PackScreen extends Screen {
  camera: Gfx3CameraWASD;
  pack: EnginePack3D;

  constructor() {
    super();
    this.camera = new Gfx3CameraWASD(0);
    this.pack = new EnginePack3D();
  }

  async onEnter() {
    this.camera.setPosition(0, 0, 10);
    this.pack = await EnginePack3D.createFromFile('./utils/pack/scene.blend.pak');
  }

  update(ts: number) {
    this.camera.update(ts);
    this.pack.jam.forEach(item => item.object.update(ts));
    this.pack.jsm.forEach(item => item.object.update(ts));
    this.pack.jas.forEach(item => item.object.update(ts));
    this.pack.jss.forEach(item => item.object.update());
    this.pack.jwm.forEach(item => item.object.update());
    this.pack.jnm.forEach(item => item.object.update(ts));
    this.pack.jlm.forEach(item => item.object.update(ts));
    this.pack.jsv.forEach(item => item.object.update(ts));
  }

  draw() {
    gfx3Manager.beginDrawing();
    this.pack.jam.forEach(item => item.object.draw());
    this.pack.jsm.forEach(item => item.object.draw());
    this.pack.jas.forEach(item => item.object.draw());
    this.pack.jss.forEach(item => item.object.draw());
    this.pack.jwm.forEach(item => item.object.draw());
    this.pack.jnm.forEach(item => item.object.draw());
    this.pack.jsv.forEach(item => item.object.draw());
    gfx3MeshRenderer.setAmbientColor([0.5, 0.5, 0.5]);
    gfx3DebugRenderer.drawGrid(UT.MAT4_ROTATE_X(Math.PI * 0.5), 20, 1);
    gfx3Manager.endDrawing();
  }

  render(ts: number) {
    gfx3Manager.beginRender();
    gfx3MeshShadowRenderer.render();
    gfx3ShadowVolumeRenderer.render();
    gfx3Manager.setDestinationTexture(gfx3PostRenderer.getSourceTexture());
    gfx3Manager.beginPassRender(0);
    gfx3SkyboxRenderer.render();
    gfx3DebugRenderer.render();
    gfx3MeshRenderer.render(ts);
    gfx3SpriteRenderer.render();
    gfx3ParticlesRenderer.render();
    gfx3FlareRenderer.render();
    gfx3Manager.endPassRender();
    gfx3PostRenderer.render(ts, gfx3Manager.getCurrentRenderingTexture());
    gfx3Manager.endRender();
  }
}

export { PackScreen };