import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup, Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3RenderingTexture } from '../gfx3/gfx3_texture';
import { Gfx3Particles } from './gfx3_particles';
/**
 * Singleton particules renderer.
 */
declare class Gfx3ParticlesRenderer extends Gfx3RendererAbstract {
    particlesList: Array<Gfx3Particles>;
    grp0: Gfx3StaticGroup;
    vMatrix: Float32Array;
    grp1: Gfx3DynamicGroup;
    mvpcMatrix: Float32Array;
    id: Float32Array;
    constructor();
    /**
     * The render function.
     */
    render(destinationTexture?: Gfx3RenderingTexture | null): void;
    /**
     * Draw a particles.
     *
     * @param {Gfx3Particles} particles - The particles.
     */
    drawParticles(particles: Gfx3Particles): void;
}
export { Gfx3ParticlesRenderer };
export declare const gfx3ParticlesRenderer: Gfx3ParticlesRenderer;
