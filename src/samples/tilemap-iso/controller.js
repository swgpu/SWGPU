import { gfx2Manager } from '../../lib/gfx2/gfx2_manager';
import { gfx2TextureManager } from '../../lib/gfx2/gfx2_texture_manager';
import { UT } from '../../lib/core/utils';
import { Gfx2SpriteJAS } from '../../lib/gfx2_sprite/gfx2_sprite_jas';
import { Gfx2Drawable } from '../../lib/gfx2/gfx2_drawable';

class Controller extends Gfx2Drawable {
  constructor() {
    super();
    this.sprite = new Gfx2SpriteJAS();
    this.direction = 'FORWARD';
    this.depth = 20;
    this.width = 20;
  }

  async load() {
    await this.sprite.loadFromFile('./samples/tilemap-iso/kid.jas');
    this.sprite.setTexture(await gfx2TextureManager.loadTexture('./samples/tilemap-iso/kid.png'));
    this.sprite.play('IDLE_LEFT', true);
  }

  update(ts) {
    this.sprite.update(ts);
  }

  draw() {
    const ctx = gfx2Manager.getContext();
    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    ctx.translate(-8, -30);
    this.sprite.draw();
    ctx.restore();
  }

  play(animation, looped) {
    this.sprite.play(animation, looped, true);
  }

  getDirection() {
    return this.direction;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  getDepth() {
    return this.depth;
  }

  getWidth() {
    return this.width;
  }

  getCollisionPoints() {
    const c = UT.VEC2_ISO_CARDINAL_POINTS(this.direction, this.depth, this.width);
    const a = UT.VEC2_ADD(this.position, UT.VEC2_ADD(c.f, c.l));
    const b = UT.VEC2_ADD(this.position, UT.VEC2_ADD(c.f, c.r));
    return [a, b];
  }
}

export { Controller };