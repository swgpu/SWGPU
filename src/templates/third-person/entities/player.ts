import { dnaManager } from '@lib/dna/dna_manager';
import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { Gfx3Material } from '@lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3PhysicsJNM } from '@lib/gfx3_physics/gfx3_physics_jnm';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from '../systems/entity';
import { GraphicsComponent } from '../systems/graphics';
import { PhysicsComponent } from '../systems/physics';
import { InputComponent } from '../systems/input';
import { CameraComponent } from '../systems/camera';
// ---------------------------------------------------------------------------------------

export async function spawnPlayer(jnm: Gfx3PhysicsJNM): Promise<number> {
  const player = dnaManager.createEntity();

  const character = new EntityComponent();
  character.x = 0.1;
  character.z = 0.1;
  dnaManager.addComponent(player, character);

  const input = new InputComponent();
  dnaManager.addComponent(player, input);

  const physics = new PhysicsComponent(jnm);
  dnaManager.addComponent(player, physics);

  const graphics = new GraphicsComponent();
  await graphics.jam.loadFromFile('./templates/third-person/barret.jam');
  graphics.jam.play('IDLE', true);
  graphics.jam.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture('./templates/third-person/barret.png') }));
  dnaManager.addComponent(player, graphics);

  const camera = new CameraComponent(jnm);
  dnaManager.addComponent(player, camera);

  return player;
}