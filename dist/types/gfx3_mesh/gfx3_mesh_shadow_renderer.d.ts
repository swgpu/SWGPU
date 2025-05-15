import { Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3Texture, Gfx3RenderingTexture } from '../gfx3/gfx3_texture';
import { Gfx3Mesh } from './gfx3_mesh';
interface MeshCommand {
    mesh: Gfx3Mesh;
    matrix: mat4;
}
declare class Gfx3MeshShadowRenderer extends Gfx3RendererAbstract {
    depthTextureSize: number;
    depthTexture: Gfx3RenderingTexture;
    meshCommands: Array<MeshCommand>;
    grp0: Gfx3DynamicGroup;
    lvpMatrix: Float32Array;
    mMatrix: Float32Array;
    constructor();
    /**
     * The render function.
     */
    render(): void;
    /**
     * Draw a mesh.
     *
     * @param {Gfx3Mesh} mesh - The mesh.
     * @param {mat4 | null} [matrix=null] - The transformation matrix.
     */
    drawMesh(mesh: Gfx3Mesh, matrix?: mat4 | null): void;
    /**
     * Set a shadow projection.
     *
     * @param {vec3} position - The position of shadow coming from.
     * @param {vec3} target - Determine the direction in which the shadow is pointing.
     * @param {number} [size=600] - Determines the size of the shadow map that will be generated.
     * @param {number} [depth=200] - Determines how far the shadow projection extends in the scene.
     */
    setShadowProjection(position: vec3, target: vec3, size?: number, depth?: number): void;
    /**
     * Set the size of a the shadow map depth texture.
     * More resolution is hight, more shadow is precise.
     *
     * @param {number} depthTextureSize - The size.
     */
    setDepthTextureSize(depthTextureSize: number): void;
    /**
     * Returns the depth texture.
     */
    getDepthTexture(): Gfx3Texture;
    /**
     * Returns the light view projection matrix (LVP).
     */
    getLVPMatrix(): Float32Array;
}
export { Gfx3MeshShadowRenderer };
export declare const gfx3MeshShadowRenderer: Gfx3MeshShadowRenderer;
