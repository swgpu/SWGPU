import { gfx3Manager } from '../../lib/gfx3/gfx3_manager';
import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { gfx3DebugRenderer } from '../../lib/gfx3/gfx3_debug_renderer';
import { gfx3MeshRenderer } from '../../lib/gfx3_mesh/gfx3_mesh_renderer';
import { inputManager } from '../../lib/input/input_manager';
import { uiManager } from '../../lib/ui/ui_manager';
import { UT } from '../../lib/core/utils';
import { Screen } from '../../lib/screen/screen';
import { Gfx3Camera } from '../../lib/gfx3_camera/gfx3_camera';
import { Gfx3MeshJSM } from '../../lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3MeshOBJ } from '../../lib/gfx3_mesh/gfx3_mesh_obj';
import { Gfx3Skybox } from '../../lib/gfx3_skybox/gfx3_skybox';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------

const CAMERA_SPEED = 0.1;

class ViewerScreen extends Screen {
  constructor() {
    super();
    this.camera = new Gfx3Camera(0);
    this.mesh = new Gfx3MeshJSM();
    this.skybox = new Gfx3Skybox();
    this.isDragging = false;
    this.dragStartPosition = [0, 0];
    this.dragStartRotation = [0, 0];

    this.handleKeyDownCb = this.handleKeyDown.bind(this);
    this.handleMouseDownCb = this.handleMouseDown.bind(this);
    this.handleMouseUpCb = this.handleMouseUp.bind(this);
    this.handleMouseMoveCb = this.handleMouseMove.bind(this);
  }

  async onEnter() {
    this.camera.setPosition(0, 0, 10);
    this.mesh = await CREATE_CUBE();
    this.skybox = await CREATE_SKYBOX();
    uiManager.addNode(CREATE_UI_INFOBOX(), 'position:absolute; bottom:10px; right:10px');

    document.addEventListener('keydown', this.handleKeyDownCb);
    document.addEventListener('mousedown', this.handleMouseDownCb);
    document.addEventListener('mouseup', this.handleMouseUpCb);
    document.addEventListener('mousemove', this.handleMouseMoveCb);
  }

  onExit() {
    document.removeEventListener('keydown', this.handleKeyDownCb);
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

    const now = Date.now() / 10000;

    this.camera.translate(move[0], move[1], move[2]);    
    this.mesh.setRotation(Math.sin(now), Math.cos(now), 0);
    this.mesh.update(ts);
  }

  draw() {
    this.mesh.draw();
    this.skybox.draw();
    gfx3MeshRenderer.drawPointLight([0, 30, 0], [1, 1, 1], [1, 0, 0], [0, 0, 0]);
    gfx3MeshRenderer.drawPointLight([30, 0, 0], [0, 0, 0], [0, 1, 0], [0, 0, 0]);
    gfx3MeshRenderer.drawPointLight([-30, 0, 0], [0, 0, 0], [0, 0, 1], [0, 0, 0]);
    gfx3DebugRenderer.drawGrid(UT.MAT4_ROTATE_X(Math.PI * 0.5), 20, 1);
  }

  async handleKeyDown(e) {
    if (e.repeat) {
      return;
    }

    if (e.key == 'o' || e.key == 'O') {
      this.mesh = await CREATE_OBJ();
    }
    else if (e.key == 'l' || e.key == 'L') {
      this.mesh = await CREATE_LANTERN();
    }
    else if (e.key == 'c' || e.key == 'C') {
      this.mesh = await CREATE_CUBE();
    }
    else if (e.key == 's' || e.key == 'S') {
      this.mesh = await CREATE_CUBE_SPRITE();
    }
    else if (e.key == 'd' || e.key == 'D') {
      this.mesh = await CREATE_DUCK();
    }
    else if (e.key == 'p' || e.key == 'P') {
      gfx3Manager.hasFilter() ? gfx3Manager.setFilter('') : gfx3Manager.setFilter('grayscale(100%)');
    }
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

    let newRotationX = this.dragStartRotation[0] + ((e.clientY - this.dragStartPosition[1]) * 0.001);
    let newRotationY = this.dragStartRotation[1] + ((e.clientX - this.dragStartPosition[0]) * 0.001);
    this.camera.setRotation(newRotationX, newRotationY, 0);
  }
}

export { ViewerScreen };

/******************************************************************* */
// HELPFUL
/******************************************************************* */

async function CREATE_SKYBOX() {
  const skybox = new Gfx3Skybox();
  skybox.setCubemap(await gfx3TextureManager.loadCubemapTexture('./samples/viewer/sky_', 'png'));
  return skybox;
}

async function CREATE_OBJ() {
  const obj = new Gfx3MeshOBJ();
  await obj.loadFromFile('./samples/viewer/wavefront.obj', './samples/viewer/wavefront.mtl');
  return obj.getMesh('letter-f');
}

async function CREATE_LANTERN() {
  const mesh = new Gfx3MeshJSM();
  await mesh.loadFromFile('./samples/viewer/lantern.jsm');
  mesh.setMaterial(new Gfx3Material({
    texture: await gfx3TextureManager.loadTexture('./samples/viewer/lantern.png'),
    normalMap: await gfx3TextureManager.loadTexture('./samples/viewer/lantern_normal.png'),
    lightning: true
  }));

  return mesh;
}

async function CREATE_CUBE() {
  const mesh = new Gfx3MeshJSM();
  await mesh.loadFromFile('./samples/viewer/cube.jsm');
  mesh.setMaterial(new Gfx3Material({
    texture: await gfx3TextureManager.loadTexture('./samples/viewer/cube.png'),
    lightning: true
  }));

  return mesh;
}

async function CREATE_CUBE_SPRITE() {
  const mesh = new Gfx3MeshJSM();
  await mesh.loadFromFile('./samples/viewer/cube_sprite.jsm');
  mesh.setMaterial(new Gfx3Material({
    texture: await gfx3TextureManager.loadTexture('./samples/viewer/cube_sprite.png'),
    lightning: false,
    animations: [{
      name: 'Default',
      frames: [{
        offsetX: 0,
        offsetY: 0
      },{
        offsetX: 850,
        offsetY: 0
      },
      {
        offsetX: 1700,
        offsetY: 0
      }],
      frameDuration: 100
    }]
  }));

  mesh.mat.playAnimation('Default', true);
  return mesh;
}

async function CREATE_DUCK() {
  const mesh = new Gfx3MeshJSM();
  await mesh.loadFromFile('./samples/viewer/duck.jsm');
  mesh.setMaterial(new Gfx3Material({
    texture: await gfx3TextureManager.loadTexture('./samples/viewer/duck.png'),
    lightning: true
  }));

  return mesh;
}

function CREATE_UI_INFOBOX() {
  const box = document.createElement('div');
  box.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
  box.style.padding = '10px';
  box.style.backdropFilter = 'blur(3px)';

  const ul = document.createElement('ul');
  ul.style.listStyle = 'none';
  ul.style.paddingLeft = '0px';
  box.appendChild(ul);

  {
    const li = document.createElement('li');
    li.textContent = '[o] => Obj Wavefront';
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[l] => Lantern';  
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[c] => Cube';  
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[s] => Cube Texture Sprite';  
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[d] => Duck';  
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[p] => Post Processing Effect (greyscale)';
    ul.appendChild(li);
  }

  return box;
}