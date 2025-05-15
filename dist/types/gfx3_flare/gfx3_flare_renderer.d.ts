import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup, Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3RenderingTexture } from '../gfx3/gfx3_texture';
import { Gfx3Flare } from './gfx3_flare';
/**
 * Singleton flare renderer.
 * It is ideal for lens-flare effect, rain, snow or every effect on the screen focal.
 * Note: The top-left corner is at coordinates 0, 0 on the screen.
 */
declare class Gfx3FlareRenderer extends Gfx3RendererAbstract {
    flares: Array<Gfx3Flare>;
    grp0: Gfx3StaticGroup;
    resolution: Float32Array;
    grp1: Gfx3DynamicGroup;
    id: Float32Array;
    translation: Float32Array;
    scale: Float32Array;
    angle: Float32Array;
    size: Float32Array;
    offset: Float32Array;
    color: Float32Array;
    constructor();
    /**
     * The render function.
     */
    render(destinationTexture?: Gfx3RenderingTexture | null): void;
    /**
     * Draw a flare object.
     *
     * @param {Gfx3Flare} flare - The flare object.
     */
    drawFlare(flare: Gfx3Flare): void;
}
export { Gfx3FlareRenderer };
export declare const gfx3FlareRenderer: Gfx3FlareRenderer;
