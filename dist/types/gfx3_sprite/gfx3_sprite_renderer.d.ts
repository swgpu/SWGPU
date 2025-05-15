import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3RenderingTexture } from '../gfx3/gfx3_texture';
import { Gfx3Sprite } from './gfx3_sprite';
/**
 * Singleton sprite renderer.
 */
declare class Gfx3SpriteRenderer extends Gfx3RendererAbstract {
    sprites: Array<Gfx3Sprite>;
    grp0: Gfx3DynamicGroup;
    mvpcMatrix: Float32Array;
    id: Float32Array;
    constructor();
    /**
     * The render function.
     */
    render(destinationTexture?: Gfx3RenderingTexture | null): void;
    /**
     * Draw a sprite.
     *
     * @param {Gfx3Sprite} sprite - The sprite.
     */
    drawSprite(sprite: Gfx3Sprite): void;
}
export { Gfx3SpriteRenderer };
export declare const gfx3SpriteRenderer: Gfx3SpriteRenderer;
