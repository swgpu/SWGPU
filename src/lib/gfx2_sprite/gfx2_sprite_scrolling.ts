import { gfx2Manager } from '../gfx2/gfx2_manager';
import { Gfx2SpriteJSS } from './gfx2_sprite_jss';
import { Gfx2SpriteJAS } from './gfx2_sprite_jas';

class Gfx2SpriteScrolling {
  sprites: Array<Gfx2SpriteJSS | Gfx2SpriteJAS>;
  move: vec2;

  constructor() {
    this.sprites = [];
    this.move = [0, 0];
  }

  /**
   * The update function.
   */
  update() {
    for (const sprite of this.sprites) {
      const newX = sprite.position[0] + this.move[0];
      const newY = sprite.position[1] + this.move[1];
      sprite.setPosition(newX, newY);
    }

    const screenHalfWidth = gfx2Manager.getWidth() * 0.5;
    const screenHalfHeight = gfx2Manager.getHeight() * 0.5;
    const maxRight = Math.max(...this.sprites.map(s => s.position[0]));
    const maxBottom = Math.min(...this.sprites.map(s => s.position[1]));
    const maxTop = Math.max(...this.sprites.map(s => s.position[1]));
    const maxLeft = Math.min(...this.sprites.map(s => s.position[0]));

    for (const sprite of this.sprites) {
      const rect = sprite.getWorldBoundingRect();

      if (rect.max[0] < -screenHalfWidth) {
        sprite.position[0] = maxRight + rect.getWidth();
      }

      if (rect.min[0] > screenHalfWidth) {        
        sprite.position[0] = maxLeft - rect.getWidth();
      }

      if (rect.min[1] > screenHalfHeight) {
        sprite.position[1] = maxBottom - rect.getHeight();
      }

      if (rect.max[1] < -screenHalfHeight) {
        sprite.position[1] = maxTop + rect.getHeight();
      }
    }
  }

  /**
   * The draw function.
   */
  draw() {
    const ctx = gfx2Manager.getContext();

    ctx.save();
    ctx.translate(gfx2Manager.getCameraPositionX(), gfx2Manager.getCameraPositionY());

    for (const sprite of this.sprites) {
      sprite.draw()
    }

    ctx.restore();
  }

  /**
   * Set the scrolling sprite.
   * 
   * @param {Gfx2SpriteJSS | Gfx2SpriteJAS} sprite - The scrolling sprite.
   */
  setSprite(sprite: Gfx2SpriteJSS | Gfx2SpriteJAS): void {
    const spriteRect = sprite.getBoundingRect();
    const nbSpritesH = Math.ceil(gfx2Manager.getWidth() / spriteRect.getWidth()) + 1;
    const nbSpritesV = Math.ceil(gfx2Manager.getHeight() / spriteRect.getHeight()) + 1;

    const screenLeft = -gfx2Manager.getWidth() * 0.5;
    const screenTop = -gfx2Manager.getHeight() * 0.5;

    this.sprites = [];
    for (let i = 0; i < nbSpritesH; i++) {
      for (let j = 0; j < nbSpritesV; j++) {
        const clone = sprite.clone();
        clone.setOffsetNormalized(0.5, 0.5);
        clone.setPosition(screenLeft + i * spriteRect.getWidth(), screenTop + j * spriteRect.getHeight());
        this.sprites.push(clone);
      }
    }
  }

  /**
   * Set scrolling move vector.
   * 
   * @param {number} mx - The move x component.
   * @param {number} my - The move y component.
   */
  setMove(mx: number, my: number): void {
    this.move[0] = mx;
    this.move[1] = my;
  }
}

export { Gfx2SpriteScrolling };