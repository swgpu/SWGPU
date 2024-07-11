import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
// ---------------------------------------------------------------------------------------
import { Collider } from '../components/collider';
import { Platform } from '../components/platform';
import { Position } from '../components/position';
import { Drawable } from '../components/drawable';
import { Velocity } from '../components/velocity';
// ---------------------------------------------------------------------------------------

export const spawnPlatform = async (x: number, y: number, from: vec2, to: vec2) => {
  const sprite = new Gfx2SpriteJSS();
  sprite.setTexture(await gfx2TextureManager.loadTexture('templates/platformer/platform.png'));
  sprite.setOffsetNormalized(0.5, 0.5);

  const halfWidth = sprite.getTextureRectWidth() / 2;
  const halfHeight = sprite.getTextureRectHeight() / 2;

  dnaManager.createEntityWith([
    new Drawable(sprite),
    new Platform([x + from[0], y + from[1]], [x + to[0], y + to[1]], false),
    new Position(x, y),
    new Velocity(),
    new Collider([halfWidth, halfHeight], [halfWidth, halfHeight])
  ])
}