import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
declare enum TextureTarget {
    TEXTURE = "Texture",
    SECONDARY_TEXTURE = "SecondaryTexture",
    DISPLACEMENT_TEXTURE = "DisplacementTexture",
    DISSOLVE_TEXTURE = "DissolveTexture"
}
interface MATFlipbook {
    textureTarget: TextureTarget;
    frameWidth: number;
    frameHeight: number;
    numCol: number;
    numRow: number;
    numFrames: number;
    frameDuration: number;
}
interface MATOptions {
    flipbooks?: Array<MATFlipbook>;
    id?: number;
    normalIntensity?: number;
    lightning?: boolean;
    ambient?: vec3;
    diffuse?: vec3;
    specular?: vec3;
    emissive?: vec3;
    blend?: vec4;
    dissolveGlow?: vec3;
    texture?: Gfx3Texture;
    textureScrollAngle?: number;
    textureScrollRate?: number;
    textureScale?: vec2;
    secondaryTexture?: Gfx3Texture;
    secondaryTextureScrollAngle?: number;
    secondaryTextureScrollRate?: number;
    secondaryTextureScale?: vec2;
    secondaryTextureBlendMode?: 'mul' | 'mix';
    displacementMap?: Gfx3Texture;
    displacementMapScrollAngle?: number;
    displacementMapScrollRate?: number;
    displacementMapFactor?: number;
    displacementMapScale?: vec2;
    toonLightDir?: vec3;
    diffuseMap?: Gfx3Texture;
    specularMap?: Gfx3Texture;
    emissiveMap?: Gfx3Texture;
    normalMap?: Gfx3Texture;
    envMap?: Gfx3Texture;
    toonMap?: Gfx3Texture;
    dissolveTexture?: Gfx3Texture;
    dissolveGlowRange?: number;
    dissolveGlowFalloff?: number;
    dissolveAmount?: number;
    dissolveTextureScrollAngle?: number;
    dissolveTextureScrollRate?: number;
    dissolveTextureScale?: vec2;
    decalEnabled?: boolean;
    shadowEnabled?: boolean;
    shininess?: number;
    emissiveFactor?: number;
    toonBlending?: number;
    facingAlphaBlend?: number;
    distanceAlphaBlend?: number;
    sParams?: Array<{
        name: string;
        value: number;
    }>;
    s0Texture?: Gfx3Texture;
    s1Texture?: Gfx3Texture;
}
interface Animation {
    flipbook: MATFlipbook;
    currentFrameIndex: number;
    looped: boolean;
    frameProgress: number;
    uvsIndexes: [number, number];
}
/**
 * The surface material.
 * It emit 'E_FINISHED' (on texture animation end)
 */
declare class Gfx3Material {
    flipbooks: Array<MATFlipbook>;
    animations: Map<TextureTarget, Animation>;
    dataChanged: boolean;
    texturesChanged: boolean;
    grp2: Gfx3StaticGroup;
    colors: Float32Array;
    params: Float32Array;
    uvs: Float32Array;
    toonLightDir: Float32Array;
    grp3: Gfx3StaticGroup;
    texture: Gfx3Texture;
    secondaryTexture: Gfx3Texture;
    displacementMap: Gfx3Texture;
    diffuseMap: Gfx3Texture;
    specularMap: Gfx3Texture;
    emissiveMap: Gfx3Texture;
    normalMap: Gfx3Texture;
    envMap: Gfx3Texture;
    toonMap: Gfx3Texture;
    dissolveTexture: Gfx3Texture;
    s0Texture: Gfx3Texture;
    s1Texture: Gfx3Texture;
    /**
     * @param {MATOptions} options - The options to configure the material.
     */
    constructor(options: MATOptions);
    /**
     * Load asynchronously data and create material from a json file (mat).
     *
     * @param {string} path - The file path.
     */
    static createFromFile(path: string, textureDir?: string): Promise<Gfx3Material>;
    /**
     * Free all resources.
     * Warning: You need to call this method to free allocation for this object.
     */
    delete(): void;
    /**
     * The update function.
     */
    update(ts: number): void;
    /**
     * Play a specific animation.
     *
     * @param {TextureTarget} textureTarget - The name of the animated texture.
     * @param {boolean} [looped=false] - Determines whether the animation should loop or not.
     * @param {boolean} [preventSameAnimation=false] - Determines whether the same animation should be prevented from playing again.
     */
    playAnimation(textureTarget: TextureTarget, looped?: boolean, preventSameAnimation?: boolean): void;
    /**
     * Stop the specified texture animation.
     *
     * @param {TextureTarget} textureTarget - The name of the animated texture.
     */
    stopAnimation(textureTarget: TextureTarget): void;
    /**
     * Set the normal bumping intensity.
     *
     * @param {number} normalIntensity - The normal intensity.
     */
    setNormalIntensity(normalIntensity: number): void;
    /**
     * Set the lightning flag.
     *
     * @param {boolean} lightning - Indicates if light is applied or not to the material.
     */
    setLightning(lightning: boolean): void;
    /**
     * Set the emissive color.
     * It is the color that the object emit.
     *
     * @param {number} r - The red component.
     * @param {number} g - The green component.
     * @param {number} b - The blue component.
     * @param {number} a - The emissive factor.
     */
    setEmissive(r: number, g: number, b: number, a: number): void;
    /**
     * Set the ambient color (see phong).
     * It is the color of the object on it's shadow parts.
     *
     * @param {number} r - The red component.
     * @param {number} g - The green component.
     * @param {number} b - The blue component.
     */
    setAmbient(r: number, g: number, b: number): void;
    /**
     * Set the diffuse color (see phong).
     * It is the color of the object on it's lightning parts.
     *
     * @param {number} r - The red component.
     * @param {number} g - The green component.
     * @param {number} b - The blue component.
     */
    setDiffuse(r: number, g: number, b: number): void;
    /**
     * Set the specular color (see phong).
     * It is the color of the object on it's lightning and eye-oriented parts.
     *
     * @param {number} r - The red component.
     * @param {number} g - The green component.
     * @param {number} b - The blue component.
     */
    setSpecular(r: number, g: number, b: number): void;
    /**
     * Set the specular intensity.
     * It determines how much light is reflected off the surface (from 0 to 1).
     *
     * @param {number} specularity - The level of specularity or shininess.
     */
    setSpecularity(specularity: number): void;
    /**
     * Set the blend color.
     * This color is multiply by the texel color.
     *
     * @param {number} r - The red component.
     * @param {number} g - The green component.
     * @param {number} b - The blue component.
     * @param {number} a - The alpha component.
     */
    setBlend(r: number, g: number, b: number, a: number): void;
    /**
     * Set the dissolve glow color.
     *
     * @param {number} r - The red component.
     * @param {number} g - The green component.
     * @param {number} b - The blue component.
     */
    setDissolveGlow(r: number, g: number, b: number): void;
    /**
     * Set the texture.
     *
     * @param {Gfx3Texture} texture - The texture.
     * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
     * @param {number} [rate=0] - The scrolling rate of the texture.
     */
    setTexture(texture: Gfx3Texture, angle?: number, rate?: number): void;
    /**
     * Set the texture scrolling.
     *
     * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
     * @param {number} [rate=0] - The scrolling rate of the texture.
     */
    setTextureScroll(angle?: number, rate?: number): void;
    /**
     * Set the texture scale.
     *
     * @param {number} x - The horizontal scale.
     * @param {number} y - The vertical scale.
     */
    setTextureScale(x: number, y: number): void;
    /**
     * Set the secondary texture.
     *
     * @param {Gfx3Texture} texture - The texture.
     * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
     * @param {number} [rate=0] - The scrolling rate of the texture.
     * @param {string} blendMode - The blend mode.
     */
    setSecondaryTexture(texture: Gfx3Texture, angle?: number, rate?: number, blendMode?: 'mul' | 'mix'): void;
    /**
     * Set the secondary texture scrolling.
     *
     * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
     * @param {number} [rate=0] - The scrolling rate of the texture.
     */
    setSecondaryTextureScroll(angle?: number, rate?: number): void;
    /**
     * Set the secondary texture scale.
     *
     * @param {number} x - The horizontal scale.
     * @param {number} y - The vertical scale.
     */
    setSecondaryTextureScale(x: number, y: number): void;
    /**
     * Set the displacement texture map.
     * It is used to displace pixels of the texture base. It is ideal for water shallow effect, magma etc...
     * 1. White pixel of this texture force pixel of the albedo texture to move in the top-left direction.
     * 2. Grey don't move pixels.
     * 3. Black pixel of this texture force pixel of the albedo texture to move in the bottom-right direction.
     *
     * @param {Gfx3Texture} displacementMap - The displacement map texture.
     * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
     * @param {number} [rate=0] - The scrolling rate of the texture.
     * @param {number} [factor=0] - The strength or intensity of the displacement effect.
     */
    setDisplacementMap(displacementMap: Gfx3Texture, angle?: number, rate?: number, factor?: number): void;
    /**
     * Set the displacement map scrolling.
     *
     * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
     * @param {number} [rate=0] - The scrolling rate of the texture.
     */
    setDisplacementMapScroll(angle?: number, rate?: number): void;
    /**
     * Set the displacement map texture scale.
     *
     * @param {number} x - The horizontal scale.
     * @param {number} y - The vertical scale.
     */
    setDisplacementMapScale(x: number, y: number): void;
    /**
     * Set the diffuse texture map.
     *
     * @param {Gfx3Texture} diffuseMap - The diffuse texture map.
     */
    setDiffuseMap(diffuseMap: Gfx3Texture): void;
    /**
     * Set the specular texture map.
     *
     * @param {Gfx3Texture} specularMap - The specular texture map.
     */
    setSpecularMap(specularMap: Gfx3Texture): void;
    /**
     * Set the emissive texture map.
     *
     * @param {Gfx3Texture} emissiveMap - The emissive texture map.
     */
    setEmissiveMap(emissiveMap: Gfx3Texture): void;
    /**
     * Set a normal texture map.
     *
     * @param {Gfx3Texture} normalMap - The normal texture map.
     */
    setNormalMap(normalMap: Gfx3Texture): void;
    /**
     * Set the environment texture map.
     *
     * @param {Gfx3Texture} envMap - The env texture map.
     */
    setEnvMap(envMap: Gfx3Texture): void;
    /**
     * Set the toon texture map.
     *
     * @param {Gfx3Texture} toonMap - The toon texture map.
     */
    setToonMap(toonMap: Gfx3Texture): void;
    /**
     * Set the dissolve texture.
     *
     * @param {Gfx3Texture} dissolveTexture - The dissolve texture.
     */
    setDissolveTexture(dissolveTexture: Gfx3Texture, glowRange: number, glowFalloff: number, amount: number): void;
    /**
     * Set the dissolve texture scrolling.
     *
     * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
     * @param {number} [rate=0] - The scrolling rate of the texture.
     */
    setDissolveTextureScroll(angle?: number, rate?: number): void;
    /**
     * Set the dissolve texture scale.
     *
     * @param {number} x - The horizontal scale.
     * @param {number} y - The vertical scale.
     */
    setDissolveTextureScale(x: number, y: number): void;
    /**
     * Set the dissolve glow range.
     *
     * @param {number} glowRange - The dissolve glow range.
     */
    setDissolveGlowRange(glowRange: number): void;
    /**
     * Set the dissolve glow falloff.
     *
     * @param {number} falloff - The dissolve glow falloff.
     */
    setDissolveGlowFallOff(falloff: number): void;
    /**
     * Set the dissolve amount.
     *
     * @param {number} amount - The dissolve amount.
     */
    setDissolveAmount(amount: number): void;
    /**
     * Enable decals on the material surface.
     *
     * @param {boolean} enabled - Indicating whether decals should be enabled or disabled.
     */
    enableDecal(enabled: boolean): void;
    /**
     * Enable shadow on the material surface.
     *
     * @param {boolean} enabled - Indicating whether the shadow should be enabled or disabled.
     */
    enableShadow(enabled: boolean): void;
    /**
     * Set the specular shininess.
     *
     * @param {number} shininess - The shininess/specularity value (0-1)
     */
    setShininess(shininess: number): void;
    /**
     * Set the emissive factor.
     *
     * @param {number} emissiveFactor - The factor of emission color (0-1)
     */
    setEmissiveFactor(emissiveFactor: number): void;
    /**
     * Set the toon blending.
     *
     * @param {boolean} toonBlending - Enable or disable the blending between texture and toon texture.
     */
    setToonBlending(toonBlending: number): void;
    /**
     * Set the facing alpha blend.
     *
     * @param {boolean} facingAlphaBlend - Facing alpha blend factor.
     */
    setFacingAlphaBlend(facingAlphaBlend: number): void;
    /**
     * Set the distance alpha blend.
     *
     * @param {boolean} distanceAlphaBlend - Distance alpha blend factor.
     */
    setDistanceAlphaBlend(distanceAlphaBlend: number): void;
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
     * Set the toon light direction.
     *
     * @param {vec3} direction - The toon light direction.
     */
    setToonLightDirection(direction: vec3): void;
    /**
     * Returns the bindgroup(2).
     */
    getGroup02(): Gfx3StaticGroup;
    /**
     * Returns the bingroup(3).
     */
    getGroup03(): Gfx3StaticGroup;
    /**
     * Returns the albedo texture.
     */
    getTexture(): Gfx3Texture;
    /**
     * Returns the secondary texture.
     */
    getSecondaryTexture(): Gfx3Texture;
    /**
     * Returns the displacement texture map.
     */
    getDisplacementMap(): Gfx3Texture;
    /**
     * Returns the diffuse texture map.
     */
    getDiffuseMap(): Gfx3Texture;
    /**
     * Returns the specularity texture map.
     */
    getSpecularMap(): Gfx3Texture;
    /**
     * Returns the emissive texture map.
     */
    getEmissiveMap(): Gfx3Texture;
    /**
     * Returns the normal texture map.
     */
    getNormalMap(): Gfx3Texture;
    /**
     * Returns the environment texture map.
     */
    getEnvMap(): Gfx3Texture;
    /**
     * Returns the toon texture map.
     */
    getToonMap(): Gfx3Texture;
    /**
     * Returns the dissolve texture.
     */
    getDissolveTexture(): Gfx3Texture;
    /**
     * Returns the custom texture 0.
     */
    getCustomTexture0(): Gfx3Texture;
    /**
     * Returns the custom texture 1.
     */
    getCustomTexture1(): Gfx3Texture;
}
export { Gfx3Material };
export type { TextureTarget };
