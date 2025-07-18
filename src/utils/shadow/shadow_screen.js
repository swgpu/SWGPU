import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { gfx3Manager } from '@lib/gfx3/gfx3_manager';
import { gfx3MeshRenderer } from '@lib/gfx3_mesh/gfx3_mesh_renderer';
import { gfx3MeshShadowRenderer } from '@lib/gfx3_mesh/gfx3_mesh_shadow_renderer';
import { Screen } from '@lib/screen/screen';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '@lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3Camera } from '@lib/gfx3_camera/gfx3_camera';
// ---------------------------------------------------------------------------------------

class ShadowScreen extends Screen {
  constructor() {
    super();
    this.camera = new Gfx3Camera(0);
    this.skySphere = new Gfx3MeshJSM();
    this.floor = new Gfx3MeshJSM();
    this.cube = new Gfx3MeshJSM();
  }

  async onEnter() {
    gfx3MeshShadowRenderer.setShadowProjection([-20, 20, 0], [0, 0, 0], 600, 600);
    gfx3MeshRenderer.enableShadow(true);

    this.camera.setPosition(0, 40, 0);
    this.camera.setRotation(0.15, 0, 0);
    this.skySphere = await CREATE_SKYSPHERE();
    this.floor = await CREATE_FLOOR(0, 0, -100);
    this.cube = await CREATE_CUBE(0, 7, -100);
  }

  update(ts) {
    this.skySphere.update(ts);
    this.floor.update(ts);
    this.cube.update(ts);

    const now = Date.now() / 10000;
    this.cube.setRotation(Math.sin(now), Math.cos(now), 0);
  }

  draw() {
    gfx3Manager.beginDrawing();
    gfx3MeshRenderer.setAmbientColor([0.5, 0.5, 0.5]);
    gfx3MeshRenderer.drawDirLight([100, -100, 0], [1, 1, 1], [0, 0, 0]);
    this.skySphere.draw();
    this.floor.draw();
    this.cube.draw();
    gfx3Manager.endDrawing();
  }

  render(ts) {
    gfx3Manager.beginRender();
    gfx3MeshShadowRenderer.render();
    gfx3Manager.beginPassRender(0);
    gfx3MeshRenderer.render(ts);
    gfx3Manager.endPassRender();
    gfx3Manager.endRender();
  }
}

export { ShadowScreen };

/******************************************************************* */
// HELPFUL
/******************************************************************* */

async function CREATE_FLOOR(x, y, z) {
  const floor = new Gfx3MeshJSM();
  floor.setPosition(x, y, z);
  floor.mat.setLightning(true);
  floor.mat.setTexture(await gfx3TextureManager.loadTexture('./utils/shadow/floor.jpg'));
  floor.mat.enableShadow(true);
  await floor.loadFromFile('./utils/shadow/floor.jsm');
  return floor;
}

async function CREATE_SKYSPHERE() {
  const skySphere = new Gfx3MeshJSM();
  skySphere.mat.setTexture(await gfx3TextureManager.loadTexture('./utils/shadow/sky_sphere.jpg'));
  await skySphere.loadFromFile('./utils/shadow/sky_sphere.jsm');
  return skySphere;
}

async function CREATE_CUBE(x, y, z) {
  const mesh = new Gfx3MeshJSM();
  mesh.setPosition(x, y, z);
  mesh.setScale(10, 10, 10);
  mesh.setShadowCasting(true);
  mesh.mat.setTexture(await gfx3TextureManager.loadTexture('./utils/viewer/duck.png'));
  mesh.mat.setLightning(true);
  await mesh.loadFromFile('./utils/viewer/duck.jsm');
  return mesh;
}