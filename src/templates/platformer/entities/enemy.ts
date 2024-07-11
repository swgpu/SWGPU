import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJAS } from '@lib/gfx2_sprite/gfx2_sprite_jas';
// ---------------------------------------------------------------------------------------
import { Enemy } from '../components/enemy';
import { Collider } from '../components/collider';
import { Velocity } from '../components/velocity';
import { Position } from '../components/position';
import { Drawable } from '../components/drawable';
// ---------------------------------------------------------------------------------------

export const spawnEnemy = async (x: number, y: number) => {
  const sprite = new Gfx2SpriteJAS();
  await sprite.loadFromFile('templates/platformer/enemy.jas');
  sprite.setTexture(await gfx2TextureManager.loadTexture('templates/platformer/enemy.png'));  
  sprite.play('walk', true);
  sprite.setOffset(4, 4);

  dnaManager.createEntityWith([
    new Drawable(sprite),
    new Position(x, y),
    new Velocity(-0.2, 0),
    new Enemy(),
    new Collider([3.5, 4], [3.5, 1])
  ])
}

export const spawnExplosion = async (x: number, y: number) => {
  const sprite = new Gfx2SpriteJAS();
  await sprite.loadFromFile('templates/platformer/explosion.jas');
  sprite.setTexture(await gfx2TextureManager.loadTexture('templates/platformer/explosion.png'));  
  sprite.play('explode', false);
  sprite.setOffset(6, 6);

  const eid = dnaManager.createEntityWith([
    new Position(x, y),
    new Drawable(sprite)
  ]);

  setTimeout(() => dnaManager.removeEntity(eid), 300);
}