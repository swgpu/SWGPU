import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJAS } from '@lib/gfx2_sprite/gfx2_sprite_jas';
// ---------------------------------------------------------------------------------------
import { Health } from '../components/health';
import { Jump } from '../components/jump';
import { Collider } from '../components/collider';
import { Velocity } from '../components/velocity';
import { Player } from '../components/player';
import { Position } from '../components/position';
import { Drawable } from '../components/drawable';
// ---------------------------------------------------------------------------------------

export const spawnPlayer = async (x: number, y: number) => {
  const sprite = new Gfx2SpriteJAS();
  await sprite.loadFromFile('templates/platformer/player.jas');
  sprite.setTexture(await gfx2TextureManager.loadTexture('templates/platformer/player.png'));
  sprite.setOffset(4, 4);

  dnaManager.createEntityWith([
    new Position(x, y),
    new Drawable(sprite),
    new Player(),
    new Velocity(),
    new Collider([2, 4], [2, 4]),
    new Jump(),
    new Health(5)
  ]);
}