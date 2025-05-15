import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3RenderingTexture } from '../gfx3/gfx3_texture';
import { Gfx3Skybox } from './gfx3_skybox';
/**
 * Singleton skybox renderer.
 */
declare class Gfx3SkyboxRenderer extends Gfx3RendererAbstract {
    skybox: Gfx3Skybox | null;
    grp0: Gfx3StaticGroup;
    vpcInverseMatrix: Float32Array;
    id: Float32Array;
    constructor();
    /**
     * The render function.
     */
    render(destinationTexture?: Gfx3RenderingTexture | null): void;
    /**
     * Draw a skybox.
     *
     * @param {Gfx3Skybox} skybox - The skybox.
     */
    draw(skybox: Gfx3Skybox): void;
}
export { Gfx3SkyboxRenderer };
export declare const gfx3SkyboxRenderer: Gfx3SkyboxRenderer;
