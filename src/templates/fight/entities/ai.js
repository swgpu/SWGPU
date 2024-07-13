import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJAS } from '@lib/gfx2_sprite/gfx2_sprite_jas';
// ---------------------------------------------------------------------------------------
import { IdleComponent } from '../systems/idle';
import { CASComponent } from '../systems/combo';
import { MoveComponent } from '../systems/move';
import { DrawableComponent } from '../systems/drawable';
import { FighterComponent } from '../systems/fighter';
import { PositionComponent } from '../systems/position';
import { VelocityComponent } from '../systems/velocity';
import { AIComponent } from '../systems/ai';
import { ComboFactory } from './combo_factory';
import { AIPatternFactory } from './ai_pattern_factory';
import { ColliderComponent } from '../systems/collider';
// ---------------------------------------------------------------------------------------

export async function spawnAI(name) {
  const playerJAS = new Gfx2SpriteJAS();
  await playerJAS.loadFromFile('templates/fight/chars/' + name + '/sprite.jas');
  playerJAS.setTexture(await gfx2TextureManager.loadTexture('templates/fight/chars/' + name + '/sprite.png'));
  playerJAS.setOffset(+44, +44);

  const damageJAS = new Gfx2SpriteJAS();
  await damageJAS.loadFromFile('templates/fight/chars/' + name + '/sprite.jas');
  damageJAS.setTexture(await gfx2TextureManager.loadTexture('templates/fight/chars/' + name + '/sprite.png'));
  damageJAS.setOffset(+44, +44);

  const player = dnaManager.createEntity();
  dnaManager.addComponent(player, new FighterComponent(2, 100, damageJAS));
  dnaManager.addComponent(player, new ColliderComponent(88, 88));
  dnaManager.addComponent(player, new PositionComponent(490, 490));
  dnaManager.addComponent(player, new VelocityComponent());
  dnaManager.addComponent(player, new DrawableComponent({ jas: playerJAS, zIndex: 2 }));
  dnaManager.addComponent(player, new IdleComponent());
  dnaManager.addComponent(player, new MoveComponent());
  dnaManager.addComponent(player, new AIComponent(60, AIPatternFactory.BASE()));
  dnaManager.addComponent(player, new CASComponent(playerJAS.animations, playerJAS.texture, [
    await ComboFactory.PUNCH(name),
    await ComboFactory.SPECIAL(name)
  ]));

  return player;
}