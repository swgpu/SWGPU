import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJAS } from '@lib/gfx2_sprite/gfx2_sprite_jas';
// ---------------------------------------------------------------------------------------
import { Collider } from '../components/collider';
import { Velocity } from '../components/velocity';
import { Position } from '../components/position';
import { Drawable } from '../components/drawable';
import { Bullet } from '../components/bullet';
// ---------------------------------------------------------------------------------------

export const spawnBullet = async (x: number, y: number, flipped: boolean) => {
	const sprite = new Gfx2SpriteJAS();
	await sprite.loadFromFile('templates/platformer/bullet.jas');
	sprite.setTexture(await gfx2TextureManager.loadTexture('templates/platformer/player.png'));
	sprite.play('shoot', false);
	sprite.setFlipX(flipped);
	sprite.setOffset(16, 16);
	const direction = flipped ? -1 : 1;
	
  dnaManager.createEntityWith([
		new Position(x + direction * 6, y),
		new Drawable(sprite),
		new Velocity(direction * 0.5, 0),
		new Bullet(),
		new Collider([16, 12], [-4, -4])
	]);
}