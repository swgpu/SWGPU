import { eventManager } from '@lib/core/event_manager';
import { inputManager } from '@lib/input/input_manager';
import { gfx3Manager } from '@lib/gfx3/gfx3_manager';
import { gfx3MeshRenderer } from '@lib/gfx3_mesh/gfx3_mesh_renderer';
import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { Screen } from '@lib/screen/screen';
import { Gfx3Camera } from '@lib/gfx3_camera/gfx3_camera';
import { Gfx3Material } from '@lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
// ---------------------------------------------------------------------------------------

class MenuRingScreen extends Screen {
  models: Array<Gfx3MeshJSM>;
  camera: Gfx3Camera;
  selected: number;
  selectedRotate: number;
  radius: number;
  cameraAngle: number;
  cameraDistance: number;
  cameraHeight: number;
  cameraTargetAngle: number;
  cameraInterpolationStep: number;

  constructor() {
    super();
    this.models = [];
    this.camera = new Gfx3Camera(0);
    this.selected = 0;
    this.selectedRotate = 0;
    this.radius = 3;
    this.cameraAngle = 0;
    this.cameraDistance = 10;
    this.cameraHeight = 3;
    this.cameraTargetAngle = 0;
    this.cameraInterpolationStep = 10;
  }

  async onEnter() {
    const ctx = gfx3Manager.getContext();
    ctx.configure({
      device: gfx3Manager.getDevice(),
      format: navigator.gpu.getPreferredCanvasFormat(),
      alphaMode: 'premultiplied'
    });

    const view  = gfx3Manager.getCurrentView();
    view.setBgColor(0, 0, 0, 0.5);
    const canvas = document.querySelector('#APP') as HTMLDivElement;
    canvas.style.backgroundImage = 'url(./utils/menu-ring/bg.png)';

    this.models.push(await LOAD_MODEL('./utils/menu-ring/scar.bsm', './utils/menu-ring/scar.jpeg'));
    this.models.push(await LOAD_MODEL('./utils/menu-ring/shotgun.bsm', './utils/menu-ring/shotgun.jpeg'));
    this.models.push(await LOAD_MODEL('./utils/menu-ring/usp.bsm', './utils/menu-ring/usp.jpeg'));
    this.models.push(await LOAD_MODEL('./utils/menu-ring/m4.bsm', './utils/menu-ring/m4.jpeg'));

    eventManager.subscribe(inputManager, 'E_ACTION_ONCE', this, this.#handleActionOnce);
  }

  update(ts: number): void {
    this.#updateModels(ts);
    this.#updateCamera(ts);
  }

  draw(): void {
    gfx3Manager.beginDrawing();

    for (const model of this.models) {
      model.draw();
    }

    gfx3Manager.endDrawing();
  }

  render(ts: number) {
    gfx3Manager.beginRender();
    gfx3Manager.beginPassRender(0);
    gfx3MeshRenderer.render(ts);
    gfx3Manager.endPassRender();
    gfx3Manager.endRender();
  }

  #updateModels(ts: number): void {
    for (let i = 0; i < this.models.length; i++) {
      const x = Math.cos(this.#getSeparationAngle() * i) * this.radius;
      const z = Math.sin(this.#getSeparationAngle() * i) * this.radius;
      this.models[i].setPosition(x, 0, z);

      if (this.selected == i) {
        this.models[i].rotate(0, 0.01, 0);
      }
    }
  }

  #updateCamera(ts: number): void {
    this.cameraAngle = this.cameraAngle + (this.cameraTargetAngle - this.cameraAngle) / this.cameraInterpolationStep;
    const x = Math.cos(this.cameraAngle) * this.cameraDistance;
    const z = Math.sin(this.cameraAngle) * this.cameraDistance;

    this.camera.setPosition(x, this.cameraHeight, z);
    this.camera.lookAt(0, 0, 0);
  }

  #handleActionOnce(data: any) {
    if (data.actionId == 'LEFT') {
      this.#select(1);
    }
    else if (data.actionId == 'RIGHT') {
      this.#select(-1);
    }
  }

  #select(direction: number): void {
    if (this.models.length == 0) {
      return;
    }

    this.selectedRotate = this.selectedRotate + direction;
    this.selected = (this.selected + direction + this.models.length) % this.models.length;
    this.cameraTargetAngle = this.#getSeparationAngle() * this.selectedRotate;
  }

  #getSeparationAngle(): number {
    return (Math.PI * 2) / this.models.length;
  }
}

export { MenuRingScreen };

async function LOAD_MODEL(path: string, texturePath: string): Promise<Gfx3MeshJSM> {
  const mesh = new Gfx3MeshJSM();
  await mesh.loadFromBinaryFile(path);
  mesh.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture(texturePath) }));
  return mesh;
}