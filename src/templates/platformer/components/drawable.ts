import { Gfx2SpriteJAS } from '@lib/gfx2_sprite/gfx2_sprite_jas';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class Drawable<S extends Gfx2SpriteJAS | Gfx2SpriteJSS> extends DNAComponent {
  sprite: S;

  constructor(sprite: S) {
		super('Drawable');
    this.sprite = sprite;
	}
}