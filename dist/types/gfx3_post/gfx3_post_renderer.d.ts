/// <reference types="@webgpu/types" />
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Texture, Gfx3RenderingTexture } from '../gfx3/gfx3_texture';
declare enum PostShadowVolumeBlendMode {
    MUL = 0,
    ADD = 1
}
declare enum PostParam {
    ENABLED = 0,
    PIXELATION_ENABLED = 1,
    PIXELATION_WIDTH = 2,
    PIXELATION_HEIGHT = 3,
    COLOR_ENABLED = 4,
    COLOR_PRECISION = 5,
    DITHER_ENABLED = 6,
    DITHER_PATTERN_INDEX = 7,
    DITHER_THRESHOLD = 8,
    DITHER_SCALE_X = 9,
    DITHER_SCALE_Y = 10,
    OUTLINE_ENABLED = 11,
    OUTLINE_THICKNESS = 12,
    OUTLINE_R = 13,
    OUTLINE_G = 14,
    OUTLINE_B = 15,
    OUTLINE_CONSTANT = 16,
    SHADOW_VOLUME_ENABLED = 17,
    SHADOW_VOLUME_BLEND_MODE = 18
}
/**
 * Singleton post-processing effects renderer.
 */
declare class Gfx3PostRenderer extends Gfx3RendererAbstract {
    #private;
    device: GPUDevice;
    vertexBuffer: GPUBuffer;
    grp0: Gfx3StaticGroup;
    params: Float32Array;
    infos: Float32Array;
    sourceTexture: Gfx3RenderingTexture;
    normalsTexture: Gfx3RenderingTexture;
    idsTexture: Gfx3RenderingTexture;
    depthTexture: Gfx3RenderingTexture;
    grp1: Gfx3StaticGroup;
    shadowVolFactorTexture: Gfx3RenderingTexture;
    shadowVolDepthCWTexture: Gfx3RenderingTexture;
    shadowVolDepthCCWTexture: Gfx3RenderingTexture;
    grp2: Gfx3StaticGroup;
    s0Texture: Gfx3Texture;
    s1Texture: Gfx3Texture;
    constructor();
    /**
     * The render function.
     */
    render(ts: number, destinationTexture: Gfx3RenderingTexture): void;
    /**
     * Set a parameter value.
     *
     * @param {number} index - The param index.
     * @param {number} value - The value.
     */
    setParam(index: number, value: number): void;
    /**
     * Returns the specified param value.
     */
    getParam(index: number): number;
    /**
     * Set a custom parameter value.
     *
     * @param {string} name - The param name.
     * @param {number} value - The param value.
     */
    setCustomParam(name: string, value: number): void;
    /**
     * Returns the specified custom param value.
     *
     * @param {string} name - The param name.
     */
    getCustomParam(name: string): number;
    /**
     * Set custom textures.
     *
     * @param {any} textures - The textures list.
     */
    setCustomTextures(textures: {
        0?: Gfx3Texture;
        1?: Gfx3Texture;
    }): void;
    /**
     * Returns the source texture.
     * Note: This instance is responsible to create the source texture used to rendering the previous pass.
     * This way, it is easy to chain multiple effects.
     */
    getSourceTexture(): Gfx3RenderingTexture;
    /**
     * Set the source texture.
     *
     * @param {Gfx3Texture} sourceTexture - The source texture.
     */
    setSourceTexture(sourceTexture: Gfx3RenderingTexture): void;
}
export { Gfx3PostRenderer, PostParam, PostShadowVolumeBlendMode };
export declare const gfx3PostRenderer: Gfx3PostRenderer;
