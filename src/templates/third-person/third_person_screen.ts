import { dnaManager } from '@lib/dna/dna_manager';
import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { gfx3MeshRenderer } from '@lib/gfx3_mesh/gfx3_mesh_renderer';
import { gfx3Manager } from '@lib/gfx3/gfx3_manager';
import { Screen } from '@lib/screen/screen';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3PhysicsJNM } from '@lib/gfx3_physics/gfx3_physics_jnm';
// ---------------------------------------------------------------------------------------
import { spawnPlayer } from './entities/player';
import { GraphicsSystem } from './systems/graphics';
import { PhysicsSystem } from './systems/physics';
import { InputSystem } from './systems/input';
import { CameraSystem } from './systems/camera';
// ---------------------------------------------------------------------------------------

class ThirdPersonScreen extends Screen {
  mapJSM: Gfx3MeshJSM;
  mapJNM: Gfx3PhysicsJNM;

  constructor() {
    super();
    this.mapJSM = new Gfx3MeshJSM();
    this.mapJNM = new Gfx3PhysicsJNM();
  }

  async onEnter() {
    dnaManager.setup([
      new InputSystem(),
      new PhysicsSystem(),
      new GraphicsSystem(),
      new CameraSystem()
    ]);

    const { jsm, jnm } = await this.#createMap();
    this.mapJSM = jsm;
    this.mapJNM = jnm;

    await spawnPlayer(this.mapJNM);
  }

  update(ts: number) {
    this.mapJSM.update(ts);
    this.mapJNM.update(ts);
    dnaManager.update(ts);
  }

  draw() {
    gfx3Manager.beginDrawing();
    this.mapJSM.draw();
    this.mapJNM.enableDebugMesh(true);
    dnaManager.draw();
    gfx3Manager.endDrawing();
  }

  render(ts: number) {
    gfx3Manager.beginRender();
    gfx3Manager.beginPassRender(0);
    gfx3MeshRenderer.render(ts);
    gfx3Manager.endPassRender();
    gfx3Manager.endRender();
  }

  async #createMap(): Promise<{jsm: Gfx3MeshJSM, jnm: Gfx3PhysicsJNM }> {
    const jsm = new Gfx3MeshJSM();
    await jsm.loadFromFile('./templates/third-person/map.jsm');
    jsm.mat.setTexture(await gfx3TextureManager.loadTextureMips('./templates/third-person/map.png', {
      magFilter: 'nearest',
      minFilter: 'nearest',
      mipmapFilter: 'linear'
    }));

    const jnm = new Gfx3PhysicsJNM();
    await jnm.loadFromFile('./templates/third-person/map.jnm');
    return { jsm, jnm };
  }
}

export { ThirdPersonScreen };