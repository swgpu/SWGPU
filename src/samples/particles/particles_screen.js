import { inputManager } from '../../lib/input/input_manager';
import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { gfx3MeshRenderer } from '../../lib/gfx3_mesh/gfx3_mesh_renderer';
import { UT } from '../../lib/core/utils';
import { Screen } from '../../lib/screen/screen';
import { Gfx3MeshJSM } from '../../lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3Camera } from '../../lib/gfx3_camera/gfx3_camera';
import { Gfx3Particles } from '../../lib/gfx3_particules/gfx3_particles';
import { Candle, Firework } from '../../lib/gfx3_particules/gfx3_particles_params';
// ---------------------------------------------------------------------------------------
const CAMERA_SPEED = 1;

class ParticlesScreen extends Screen {
  constructor() {
    super();
    this.camera = new Gfx3Camera(0);
    this.skySphere = null;
    this.floor = null;
    this.particles0 = null;
    this.particles1 = null;
    this.isDragging = false;
    this.dragStartPosition = [0, 0];
    this.dragStartRotation = [0, 0];
    this.colFac = 0;
    this.handleMouseDownCb = this.handleMouseDown.bind(this);
    this.handleMouseUpCb = this.handleMouseUp.bind(this);
    this.handleMouseMoveCb = this.handleMouseMove.bind(this);
  }

  async onEnter() {
    gfx3MeshRenderer.enableDirLight(true, [0, -1, 0.2], [1, 1, 1], [0.8, 0.8, 0.8], [0.8, 0.8, 0.8]);
    this.camera.setPosition(0, 40, 0);
    this.camera.setRotation(0.15, 0, 0);

    this.skySphere = new Gfx3MeshJSM();
    await this.skySphere.loadFromFile('./samples/particles/sky_sphere.jsm');
    this.skySphere.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTexture('./samples/particles/sky_sphere.jpg')
    }));

    this.floor = new Gfx3MeshJSM();
    this.floor.setPosition(0, 0, -100);
    await this.floor.loadFromFile('./samples/particles/floor.jsm');
    this.floor.setMaterial(new Gfx3Material({
      lightning: true,
      texture: await gfx3TextureManager.loadTexture('./samples/particles/floor.jpg'),
      normalMap: await gfx3TextureManager.loadTexture('./samples/particles/floor_normal_map.jpg'),
      specularityMap: await gfx3TextureManager.loadTexture('./samples/particles/floor_specularity_map.jpg')
    }));

    this.particles0 = new Gfx3Particles(Object.assign(Candle, {
      positionBase: [0, 0, -100],
      particleQuantity: 100
    }));

    this.particles1 = new Gfx3Particles(Object.assign(Firework, {
      positionBase: [0, 10, -100],
      particleQuantity: 100
    }));

    document.addEventListener('mousedown', this.handleMouseDownCb);
    document.addEventListener('mouseup', this.handleMouseUpCb);
    document.addEventListener('mousemove', this.handleMouseMoveCb);
  }

  onExit() {
    document.removeEventListener('mousedown', this.handleMouseDownCb);
    document.removeEventListener('mouseup', this.handleMouseUpCb);
    document.removeEventListener('mousemove', this.handleMouseMoveCb);
  }

  update(ts) {
    const cameraAxies = this.camera.getLocalAxies();
    let move = UT.VEC3_CREATE(0, 0, 0);

    if (inputManager.isActiveAction('LEFT')) {
      move = UT.VEC3_ADD(move, UT.VEC3_SCALE(cameraAxies[0], -CAMERA_SPEED));
    }

    if (inputManager.isActiveAction('RIGHT')) {
      move = UT.VEC3_ADD(move, UT.VEC3_SCALE(cameraAxies[0], +CAMERA_SPEED));
    }

    if (inputManager.isActiveAction('UP')) {
      move = UT.VEC3_ADD(move, UT.VEC3_SCALE(cameraAxies[2], -CAMERA_SPEED));
    }

    if (inputManager.isActiveAction('DOWN')) {
      move = UT.VEC3_ADD(move, UT.VEC3_SCALE(cameraAxies[2], +CAMERA_SPEED));
    }

    this.camera.translate(move[0], move[1], move[2]);

    this.floor.rotate(0, ts * 0.001, 0);
    this.floor.update(ts);
    this.skySphere.update(ts);
    this.particles0.update(ts);
    this.particles1.update(ts);
    this.colFac += ts * 0.003;
  }

  draw() {
    this.skySphere.draw();
    this.floor.draw();
    this.particles0.draw();
    this.particles1.draw();
    gfx3MeshRenderer.drawPointLight([Math.cos(this.colFac * 0.2) * 45.0, 18, Math.cos(this.colFac * 0.2) * 45.0], [0, 0, 0], [0.8, 0.8, 0.4], [0.8, 0.8, 0.4]);
    gfx3MeshRenderer.drawPointLight([Math.sin(this.colFac * 0.2) * 45.0, 18, Math.sin(this.colFac * 0.2) * 45.0], [0, 0, 0], [0.8, 0.8, 0.4], [0.8, 0.8, 0.4]);
  }

  handleMouseDown(e) {
    this.isDragging = true;
    this.dragStartPosition[0] = e.clientX;
    this.dragStartPosition[1] = e.clientY;
    this.dragStartRotation[0] = this.camera.getRotationX();
    this.dragStartRotation[1] = this.camera.getRotationY();
  }

  handleMouseUp() {
    this.isDragging = false;
  }

  handleMouseMove(e) {
    if (!this.isDragging) {
      return;
    }

    const newRotationX = this.dragStartRotation[0] + ((e.clientY - this.dragStartPosition[1]) * 0.001);
    const newRotationY = this.dragStartRotation[1] + ((e.clientX - this.dragStartPosition[0]) * 0.001);
    this.camera.setRotation(newRotationX, newRotationY, 0);
  }
}

export { ParticlesScreen };