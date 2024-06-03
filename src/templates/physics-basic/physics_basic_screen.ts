import { dnaManager } from '@lib/dna/dna_manager';
import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { Screen } from '@lib/screen/screen';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '@lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3PhysicsJNM } from '@lib/gfx3_physics/gfx3_physics_jnm';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
import { GraphicsComponent, GraphicsSystem } from './graphics';
import { PhysicsComponent, PhysicsSystem } from './physics';
import { InputComponent, InputSystem } from './input';
import { CameraComponent, CameraSystem } from './camera';
// ---------------------------------------------------------------------------------------

class PhysicsBasicScreen extends Screen {
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

    const { jsm, jnm } = await this.$createMap();
    this.mapJSM = jsm;
    this.mapJNM = jnm;

    await this.$createPlayer(this.mapJNM);
  }

  update(ts: number) {
    this.mapJSM.update(ts);
    this.mapJNM.update(ts);
    dnaManager.update(ts);
  }

  draw() {
    this.mapJSM.draw();
    dnaManager.draw();
  }

  async $createMap(): Promise<{jsm: Gfx3MeshJSM, jnm: Gfx3PhysicsJNM }> {
    const jsm = new Gfx3MeshJSM();
    await jsm.loadFromFile('./templates/physics-basic/map.jsm');
    jsm.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTextureMips('./templates/physics-basic/map.png', {
        magFilter: 'nearest',
        minFilter: 'nearest',
        mipmapFilter: 'linear'
      })
    }));

    const jnm = new Gfx3PhysicsJNM();
    await jnm.loadFromFile('./templates/physics-basic/map.jnm');
    return { jsm, jnm };
  }

  async $createPlayer(jnm: Gfx3PhysicsJNM): Promise<number> {
    const player = dnaManager.createEntity();

    const character = new EntityComponent();
    dnaManager.addComponent(player, character);

    const input = new InputComponent();
    dnaManager.addComponent(player, input);

    const physics = new PhysicsComponent(jnm);
    dnaManager.addComponent(player, physics);

    const graphics = new GraphicsComponent();
    await graphics.jam.loadFromFile('./templates/physics-basic/barret.jam');
    graphics.jam.play('IDLE', true);
    graphics.jam.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture('./templates/physics-basic/barret.png') }));
    dnaManager.addComponent(player, graphics);

    const camera = new CameraComponent(jnm);
    dnaManager.addComponent(player, camera);

    return player;
  }
}

export { PhysicsBasicScreen };