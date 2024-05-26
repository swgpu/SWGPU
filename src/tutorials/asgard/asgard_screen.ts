import { dnaManager } from '@lib/dna/dna_manager';
import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { Screen } from '@lib/screen/screen';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '@lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3PhysicsJNM } from '@lib/gfx3_physics/gfx3_physics_jnm';
// ---------------------------------------------------------------------------------------
import { CharacterComponent } from './character';
import { CharacterGraphicsComponent, CharacterGraphicsSystem } from './character_graphics';
import { CharacterPhysicsComponent, CharacterPhysicsSystem } from './character_physics';
import { CharacterInputComponent, CharacterInputSystem } from './character_input';
import { CharacterCameraComponent, CharacterCameraSystem } from './character_camera';
// ---------------------------------------------------------------------------------------

class AsgardScreen extends Screen {
  mapJSM: Gfx3MeshJSM;
  mapJNM: Gfx3PhysicsJNM;

  constructor() {
    super();
    this.mapJSM = new Gfx3MeshJSM();
    this.mapJNM = new Gfx3PhysicsJNM();
  }

  async onEnter() {
    dnaManager.setup([
      new CharacterInputSystem(),
      new CharacterPhysicsSystem(),
      new CharacterGraphicsSystem(),
      new CharacterCameraSystem()
    ]);

    this.mapJSM = new Gfx3MeshJSM();
    await this.mapJSM.loadFromFile('./tutorials/asgard/map.jsm');
    this.mapJSM.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTextureMips('./tutorials/asgard/map.png', {
        magFilter: 'nearest',
        minFilter: 'nearest',
        mipmapFilter: 'linear'
      })
    }));

    this.mapJNM = new Gfx3PhysicsJNM();
    await this.mapJNM.loadFromFile('./tutorials/asgard/map.jnm');

    await this.createPlayer(this.mapJNM);
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

  async createPlayer(map: Gfx3PhysicsJNM): Promise<number> {
    const player = dnaManager.createEntity();

    const character = new CharacterComponent();
    dnaManager.addComponent(player, character);

    const input = new CharacterInputComponent();
    dnaManager.addComponent(player, input);

    const physics = new CharacterPhysicsComponent(map);
    dnaManager.addComponent(player, physics);

    const graphics = new CharacterGraphicsComponent();
    await graphics.jam.loadFromFile('./tutorials/asgard/barret.jam');
    graphics.jam.play('IDLE', true);
    graphics.jam.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture('./tutorials/asgard/barret.png') }));
    dnaManager.addComponent(player, graphics);

    const camera = new CharacterCameraComponent(map);
    dnaManager.addComponent(player, camera);

    return player;
  }
}

export { AsgardScreen };