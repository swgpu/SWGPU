import { Gfx2Drawable } from '../gfx2/gfx2_drawable';
import { Gfx2SpriteJSS } from './gfx2_sprite_jss';
import { Gfx2SpriteJAS } from './gfx2_sprite_jas';
declare class Gfx2SpriteScrolling extends Gfx2Drawable {
    sprites: Array<Gfx2SpriteJSS | Gfx2SpriteJAS>;
    move: vec2;
    constructor();
    /**
     * The update function.
     */
    update(): void;
    /**
     * The draw function.
     */
    onRender(): void;
    /**
     * Set the scrolling sprite.
     *
     * @param {Gfx2SpriteJSS | Gfx2SpriteJAS} sprite - The scrolling sprite.
     */
    setSprite(sprite: Gfx2SpriteJSS | Gfx2SpriteJAS): void;
    /**
     * Set scrolling move vector.
     *
     * @param {number} mx - The move x component.
     * @param {number} my - The move y component.
     */
    setMove(mx: number, my: number): void;
}
export { Gfx2SpriteScrolling };
