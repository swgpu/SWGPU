import { gfx3Manager } from '@lib/gfx3/gfx3_manager';
import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { gfx3DebugRenderer } from '@lib/gfx3/gfx3_debug_renderer';
import { gfx3MeshRenderer } from '@lib/gfx3_mesh/gfx3_mesh_renderer';
import { gfx3PostRenderer, PostParam } from '@lib/gfx3_post/gfx3_post_renderer';
import { uiManager } from '@lib/ui/ui_manager';
import { coreManager } from '@lib/core/core_manager';
import { UT } from '@lib/core/utils';
import { Screen } from '@lib/screen/screen';
import { Gfx3CameraOrbit } from '@lib/gfx3_camera/gfx3_camera_orbit';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3MeshOBJ } from '@lib/gfx3_mesh/gfx3_mesh_obj';
import { Gfx3Skybox } from '@lib/gfx3_skybox/gfx3_skybox';
import { Gfx3Material } from '@lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3ShadowVolume } from '@lib/gfx3_shadow_volume/gfx3_shadow_volume';
import { Gfx3FlareLens } from '@lib/gfx3_flare/gfx3_flare_lens';
// ---------------------------------------------------------------------------------------

class ViewerScreen extends Screen {
  constructor() {
    super();
    this.camera = new Gfx3CameraOrbit(0);
    this.skybox = new Gfx3Skybox();
    this.mesh = new Gfx3MeshJSM();
    this.shadow = new Gfx3ShadowVolume();
    this.bloom = new Gfx3MeshJSM();
    this.lens = new Gfx3FlareLens();
    this.handleKeyDownCb = this.handleKeyDown.bind(this);
  }

  async onEnter() {
    this.camera.setPosition(0, 0, 10);
    this.skybox = await CREATE_SKYBOX();
    this.mesh = await CREATE_CUBE();

    this.shadow = new Gfx3ShadowVolume();
    await this.shadow.loadFromFile('./utils/viewer/shadow.jsv');

    this.bloom = new Gfx3MeshJSM();
    await this.bloom.loadFromFile('./utils/viewer/bloom.jsm');
    this.bloom.setMaterial(await Gfx3Material.createFromFile('./utils/viewer/bloom.mat'));

    this.lens.setSunWorldPosition(10, 100, 0);
    await this.lens.startup(0.4);

    gfx3PostRenderer.setParam(PostParam.COLOR_ENABLED, 1.0);
    gfx3PostRenderer.setParam(PostParam.PIXELATION_ENABLED, 1.0);
    gfx3PostRenderer.setParam(PostParam.DITHER_ENABLED, 1.0);
    gfx3PostRenderer.setParam(PostParam.OUTLINE_ENABLED, 1.0);

    uiManager.addNode(CREATE_UI_INFOBOX(), 'position:absolute; bottom:10px; right:10px');
    document.addEventListener('keydown', this.handleKeyDownCb);
  }

  onExit() {
    document.removeEventListener('keydown', this.handleKeyDownCb);
  }

  update(ts) {
    const now = Date.now() / 10000;
    this.mesh.setRotation(Math.sin(now), Math.cos(now), 0);
    this.mesh.update(ts);
    this.bloom.update(ts);
    this.camera.update(ts);
  }

  draw() {
    this.shadow.draw();
    this.mesh.draw();
    this.bloom.draw();
    this.skybox.draw();
    this.lens.draw();
    gfx3MeshRenderer.setAmbientColor([0.5, 0.5, 0.5]);
    gfx3MeshRenderer.drawPointLight([0, 30, 0], [1, 0, 0], [0, 0, 0]);
    gfx3MeshRenderer.drawPointLight([30, 0, 0], [0, 1, 0], [0, 0, 0]);
    gfx3MeshRenderer.drawPointLight([-30, 0, 0], [0, 0, 1], [0, 0, 0]);
    gfx3DebugRenderer.drawGrid(UT.MAT4_ROTATE_X(Math.PI * 0.5), 20, 1);
  }

  async handleKeyDown(e) {
    if (e.repeat) {
      return;
    }

    if (e.key == '1') {
      this.mesh = await CREATE_OBJ();
    }
    else if (e.key == '2') {
      this.mesh = await CREATE_CUBE_BRICK();
    }
    else if (e.key == '3') {
      this.mesh = await CREATE_CUBE();
    }
    else if (e.key == '4') {
      this.mesh = await CREATE_CUBE_SPRITE();
    }
    else if (e.key == '5') {
      this.mesh = await CREATE_DUCK();
    }
    else if (e.key == '6') {
      this.mesh = await CREATE_TORUS();
    }
    else if (e.key == 'f' || e.key == 'F') {
      gfx3Manager.hasFilter() ? gfx3Manager.setFilter('') : gfx3Manager.setFilter('grayscale(100%)');
    }
    else if (e.key == 'q' || e.key == 'Q') {
      coreManager.toggleClass('scanlines');
    }
    else if (e.key == 'p' || e.key == 'P') {
      this.mesh.setSingleId(3, 7);
    }
    else if (e.key == 'l' || e.key == 'L') {
      this.mesh.setSingleId(3, 8);
    }
    else if (e.key == 's' || e.key == 'S') {
      this.mesh.setSingleId(3, 16);
    }
    else if (e.key == 'n' || e.key == 'N') {
      this.mesh.setSingleId(3, 0);
    }
  }
}

export { ViewerScreen };

/******************************************************************* */
// HELPFUL
/******************************************************************* */

async function CREATE_SKYBOX() {
  const skybox = new Gfx3Skybox();
  skybox.setCubemap(await gfx3TextureManager.loadCubemapTexture('./utils/viewer/sky_', 'png'));
  return skybox;
}

async function CREATE_OBJ() {
  const obj = new Gfx3MeshOBJ();
  await obj.loadFromFile('./utils/viewer/wavefront.obj', './utils/viewer/wavefront.mtl');
  const mesh = obj.getMesh('letter-f')
  return mesh;
}

async function CREATE_CUBE_BRICK() {
  const mesh = new Gfx3MeshJSM();
  await mesh.loadFromFile('./utils/viewer/cube_brick.jsm');
  mesh.setMaterial(new Gfx3Material({
    texture: await gfx3TextureManager.loadTexture('./utils/viewer/cube_brick.png'),
    normalMap: await gfx3TextureManager.loadTexture('./utils/viewer/cube_brick_normal.png'),
    normalIntensity: 5.0,
    lightning: true
  }));

  return mesh;
}

async function CREATE_CUBE() {
  const mesh = new Gfx3MeshJSM();
  await mesh.loadFromFile('./utils/viewer/cube.jsm');
  mesh.setMaterial(new Gfx3Material({
    texture: await gfx3TextureManager.loadTexture('./utils/viewer/cube.png'),
    lightning: true
  }));

  return mesh;
}

async function CREATE_CUBE_SPRITE() {
  const mesh = new Gfx3MeshJSM();
  await mesh.loadFromFile('./utils/viewer/cube_sprite.jsm');
  mesh.setMaterial(new Gfx3Material({
    texture: await gfx3TextureManager.loadTexture('./utils/viewer/cube_sprite.png'),
    lightning: false,
    flipbooks: [{
      textureTarget: 'Texture',
      frameWidth: 850,
      frameHeight: 850,
      numCol: 3,
      numRow: 1,
      numFrames: 3,
      frameDuration: 100
    }]
  }));

  mesh.mat.playAnimation('Texture', true);
  return mesh;
}

async function CREATE_DUCK() {
  const mesh = new Gfx3MeshJSM();
  await mesh.loadFromFile('./utils/viewer/duck.jsm');
  mesh.setMaterial(new Gfx3Material({
    texture: await gfx3TextureManager.loadTexture('./utils/viewer/duck.png'),
    lightning: true
  }));

  return mesh;
}

async function CREATE_TORUS() {
  const mesh = new Gfx3MeshJSM();
  await mesh.loadFromFile('./utils/viewer/torus.jsm');
  mesh.setMaterial(new Gfx3Material({
    toonMap: await gfx3TextureManager.loadTexture('./textures/toon_default.png', { minFilter: 'nearest', magFilter: 'nearest' }),
    toonLightDir: [1.0, -1.0, -1.0]
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
    li.textContent = '[1] => Load Obj Wavefront';
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[2] => Load Cube Normal Map';  
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[3] => Load Cube';  
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[4] => Load Cube Texture Sprite';  
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[5] => Load Duck';  
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[6] => Load Toon Torus';  
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '----------------------------------------';
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[f] => Toggle Filtering (greyscale)';
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[q] => Toggle Scanlines';
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[p] => PSX mode';
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[l] => Outline mode';
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[s] => Shadow volume mode';
    ul.appendChild(li);
  }

  {
    const li = document.createElement('li');
    li.textContent = '[n] => Default mode';
    ul.appendChild(li);
  }

  return box;
}