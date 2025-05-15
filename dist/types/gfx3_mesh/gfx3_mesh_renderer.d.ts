import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3Texture, Gfx3RenderingTexture } from '../gfx3/gfx3_texture';
import { Gfx3StaticGroup, Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3Mesh } from './gfx3_mesh';
interface MeshCommand {
    mesh: Gfx3Mesh;
    matrix: mat4;
}
/**
 * Singleton mesh renderer.
 */
declare class Gfx3MeshRenderer extends Gfx3RendererAbstract {
    shadowEnabled: boolean;
    textureChanged: boolean;
    meshCommands: Array<MeshCommand>;
    grp0: Gfx3StaticGroup;
    sceneInfos: Float32Array;
    lvpMatrix: Float32Array;
    dirLight: Float32Array;
    pointLights: Float32Array;
    spotLights: Float32Array;
    decals: Float32Array;
    fog: Float32Array;
    decalAtlas: Gfx3Texture;
    shadowMap: Gfx3Texture;
    s0Texture: Gfx3Texture;
    s1Texture: Gfx3Texture;
    grp1: Gfx3DynamicGroup;
    meshInfos: Float32Array;
    constructor();
    /**
     * The render function.
     */
    render(ts: number, destinationTexture?: Gfx3RenderingTexture | null): void;
    /**
     * Enable the shadowing projection.
     *
     * @param {boolean} enabled - Indicating whether the shadow should be enabled or disabled.
     */
    enableShadow(enabled: boolean): void;
    /**
     * Set the decal texture atlas.
     *
     * @param {Gfx3Texture} decalAtlas - The decal texture atlas.
     */
    setDecalAtlas(decalAtlas: Gfx3Texture): void;
    /**
     * Enable the fog.
     *
     * @param {boolean} enabled - Indicating whether the fog is enabled or not.
     * @param {vec3} from - The fog origin point.
     * @param {vec3} color - The fog color.
     * @param {number} [near=3.0] - The distance from the camera at which the fog starts to appear.
     * @param {number} [far=15.0] - The distance from the camera at which the fog effect should start to fade out.
     */
    enableFog(enabled: boolean, from?: vec3, color?: vec3, near?: number, far?: number): void;
    /**
     * Draw a mesh.
     *
     * @param {Gfx3Mesh} mesh - The mesh.
     * @param {mat4 | null} [matrix=null] - The transformation matrix.
     */
    drawMesh(mesh: Gfx3Mesh, matrix?: mat4 | null): void;
    /**
     * Set the ambient color.
     *
     * @param {vec3} ambientColor - The ambient color.
     */
    setAmbientColor(ambientColor: vec3): void;
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
     * Draw a directional light.
     *
     * @param {vec3} direction - The direction.
     * @param {vec3} diffuse - The diffuse color.
     * @param {vec3} specular - The specular color.
     * @param {number} [intensity=1] - The strength or brightness.
     * @param {number} [meshId=0] - The mesh id targeted (0 affect all mesh).
     */
    drawDirLight(direction: vec3, diffuse: vec3, specular: vec3, intensity?: number, meshId?: number): void;
    /**
     * Draw a point light.
     *
     * @param {vec3} position - The position.
     * @param {vec3} diffuse - The diffuse color.
     * @param {vec3} specular - The specular color.
     * @param {number} [intensity=1] - The brightness or strength.
     * @param {number} [meshId=0] - The mesh id targeted (0 affect all mesh).
     * @param {number} [constant=1] - The constant attenuation factor of the point light.
     * @param {number} [linear=0] - The linear attenuation factor of the point light.
     * @param {number} [exp=0] - The exponent of the attenuation equation for the point light.
     */
    drawPointLight(position: vec3, diffuse: vec3, specular: vec3, intensity?: number, meshId?: number, constant?: number, linear?: number, exp?: number): void;
    /**
     * Draw a spot light.
     *
     * @param {vec3} position - The position.
     * @param {vec3} direction - The direction.
     * @param {number} cutoff - The aperture angle of light.
     * @param {vec3} diffuse - The diffuse color.
     * @param {vec3} specular - The specular color.
     * @param {number} [intensity=1] - The brightness or strength.
     * @param {number} [meshId=0] - The mesh id targeted (0 affect all mesh).
     * @param {number} [constant=1] - The constant attenuation factor of the point light.
     * @param {number} [linear=0] - The linear attenuation factor of the point light.
     * @param {number} [exp=0] - The exponent of the attenuation equation for the point light.
     */
    drawSpotLight(position: vec3, direction: vec3, cutoff: number, diffuse: vec3, specular: vec3, intensity?: number, meshId?: number, constant?: number, linear?: number, exp?: number): void;
    /**
     * Draw a decal.
     *
     * @param {number} group - The group target (mesh is identified by its 'g' id component).
     * @param {number} sx - The x-coordinate of the decal sprite in the atlas texture.
     * @param {number} sy - The y-coordinate of the decal sprite in the atlas texture.
     * @param {number} sw - The width of the decal sprite in the atlas texture.
     * @param {number} sh - The height of the decal sprite in the atlas texture.
     * @param {vec3} position - The position of projector (center).
     * @param {vec3} orientationX - The x-axis orientation of the projector.
     * @param {vec3} orientationY - The y-axis orientation of the projector.
     * @param {vec3} orientationZ - The z-axis orientation of the projector.
     * @param {vec3} size - The size (width, height, depth) of the projector.
     * @param {number} opacity - The opacity or transparency of the decal.
     */
    drawDecal(group: number, sx: number, sy: number, sw: number, sh: number, position: vec3, orientationX: vec3, orientationY: vec3, orientationZ: vec3, size: vec3, opacity: number): void;
}
export { Gfx3MeshRenderer };
export declare const gfx3MeshRenderer: Gfx3MeshRenderer;
