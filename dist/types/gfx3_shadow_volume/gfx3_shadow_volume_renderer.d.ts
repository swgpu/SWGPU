/// <reference types="@webgpu/types" />
import { Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3RenderingTexture } from '../gfx3/gfx3_texture';
import { Gfx3ShadowVolume } from './gfx3_shadow_volume';
interface Pipeline {
    gpu: GPURenderPipeline;
    grp0: Gfx3DynamicGroup;
    shadowTexture: Gfx3RenderingTexture;
    depthTexture: Gfx3RenderingTexture;
}
declare class Gfx3ShadowVolumeRenderer {
    #private;
    pipelineCW: Pipeline;
    pipelineCCW: Pipeline;
    shadowVolumes: Array<Gfx3ShadowVolume>;
    mvpcMatrix: Float32Array;
    constructor();
    /**
     * The render function.
     */
    render(): void;
    /**
     * Draw a shadow volume.
     *
     * @param {Gfx3ShadowVolume} sv - The shadow volume.
     */
    drawShadowVolume(sv: Gfx3ShadowVolume): void;
    /**
     * Returns the shadow texture.
     */
    getShadowTexture(): Gfx3RenderingTexture;
    /**
     * Returns the depth texture for cw faces.
     */
    getDepthCWTexture(): Gfx3RenderingTexture;
    /**
     * Returns the depth texture for ccw faces.
     */
    getDepthCCWTexture(): Gfx3RenderingTexture;
}
export { Gfx3ShadowVolumeRenderer };
export declare const gfx3ShadowVolumeRenderer: Gfx3ShadowVolumeRenderer;
