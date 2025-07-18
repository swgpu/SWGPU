import { gfx3Manager } from '@lib/gfx3/gfx3_manager';
import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { gfx3MeshRenderer } from '@lib/gfx3_mesh/gfx3_mesh_renderer';
import { gfx3ParticlesRenderer } from '@lib/gfx3_particules/gfx3_particles_renderer';
import { Screen } from '@lib/screen/screen';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '@lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3Camera } from '@lib/gfx3_camera/gfx3_camera';
import { Gfx3Particles } from '@lib/gfx3_particules/gfx3_particles';
import { Candle, Firework } from '@lib/gfx3_particules/gfx3_particles_params';
// ---------------------------------------------------------------------------------------

class ParticlesScreen extends Screen {
  constructor() {
    super();
    this.camera = new Gfx3Camera(0);
    this.skySphere = null;
    this.floor = null;
    this.particles0 = null;
    this.particles1 = null;
    this.colFac = 0;
  }

  async onEnter() {
    this.camera.setPosition(0, 40, 0);
    this.camera.setRotation(0.15, 0, 0);
    this.skySphere = await CREATE_SKYSPHERE();
    this.floor = await CREATE_FLOOR(0, 0, -100);
    this.particles0 = await CREATE_PARTICLES(Candle);
    this.particles1 = await CREATE_PARTICLES(Firework);
  }

  update(ts) {
    this.floor.rotate(0, ts * 0.001, 0);
    this.floor.update(ts);
    this.skySphere.update(ts);
    this.particles0.update(ts);
    this.particles1.update(ts);
    this.colFac += ts * 0.003;
  }

  draw() {
    gfx3Manager.beginDrawing();
    this.skySphere.draw();
    this.floor.draw();
    this.particles0.draw();
    this.particles1.draw();
    gfx3MeshRenderer.setAmbientColor([0.5, 0.5, 0.5]);
    gfx3MeshRenderer.drawDirLight([0, -1, 0.2], [0.8, 0.8, 0.8], [0.8, 0.8, 0.8]);
    gfx3MeshRenderer.drawPointLight([Math.cos(this.colFac * 0.2) * 45.0, 18, Math.cos(this.colFac * 0.2) * 45.0], [0.8, 0.8, 0.4], [0.8, 0.8, 0.4]);
    gfx3MeshRenderer.drawPointLight([Math.sin(this.colFac * 0.2) * 45.0, 18, Math.sin(this.colFac * 0.2) * 45.0], [0.8, 0.8, 0.4], [0.8, 0.8, 0.4]);
    gfx3Manager.endDrawing();
  }

  render(ts) {
    gfx3Manager.beginRender();
    gfx3Manager.beginPassRender(0);
    gfx3MeshRenderer.render(ts);
    gfx3ParticlesRenderer.render();
    gfx3Manager.endPassRender();
    gfx3Manager.endRender();
  }
}

export { ParticlesScreen };

/******************************************************************* */
// HELPFUL
/******************************************************************* */

async function CREATE_SKYSPHERE() {
  const skySphere = new Gfx3MeshJSM();
  skySphere.mat.setTexture(await gfx3TextureManager.loadTexture('./utils/particles/sky_sphere.jpg'));
  await skySphere.loadFromFile('./utils/particles/sky_sphere.jsm');
  return skySphere;
}

async function CREATE_FLOOR(x, y, z) {
  const floor = new Gfx3MeshJSM();
  floor.setPosition(x, y, z);
  floor.mat.setLightning(true);
  floor.mat.setTexture(await gfx3TextureManager.loadTexture('./utils/particles/floor.jpg'));
  floor.mat.setNormalMap(await gfx3TextureManager.loadTexture('./utils/particles/floor_normal_map.jpg'));
  floor.mat.setSpecularMap(await gfx3TextureManager.loadTexture('./utils/particles/floor_specularity_map.jpg'));
  await floor.loadFromFile('./utils/particles/floor.jsm');
  return floor;
}

async function CREATE_PARTICLES(params) {
  const particles = new Gfx3Particles(Object.assign(params, {
    positionBase: [0, 10, -100],
    particleQuantity: 100
  }));

  return particles;
}