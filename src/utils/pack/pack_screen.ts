import { gfx3DebugRenderer } from '@lib/gfx3/gfx3_debug_renderer';
import { gfx3MeshRenderer } from '@lib/gfx3_mesh/gfx3_mesh_renderer';
import { UT } from '@lib/core/utils';
import { Screen } from '@lib/screen/screen';
import { Gfx3CameraWASD } from '@lib/gfx3_camera/gfx3_camera_wasd';
import { EnginePack3D } from '@lib/engine/engine_pack3d';
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
    this.pack.jam.forEach(item => item.object.draw());
    this.pack.jsm.forEach(item => item.object.draw());
    this.pack.jas.forEach(item => item.object.draw());
    this.pack.jss.forEach(item => item.object.draw());
    this.pack.jwm.forEach(item => item.object.draw());
    this.pack.jnm.forEach(item => item.object.draw());
    this.pack.jsv.forEach(item => item.object.draw());
    gfx3MeshRenderer.setAmbientColor([0.5, 0.5, 0.5]);
    gfx3DebugRenderer.drawGrid(UT.MAT4_ROTATE_X(Math.PI * 0.5), 20, 1);
  }
}

export { PackScreen };