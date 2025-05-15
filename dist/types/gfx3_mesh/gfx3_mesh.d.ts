import { Poolable } from '../core/object_pool';
import { Gfx3Drawable } from '../gfx3/gfx3_drawable';
import { Gfx3Material } from './gfx3_mesh_material';
export interface Face {
    v: vec3;
    t: vec3;
    n: vec3;
    smoothGroup: number;
}
export interface Group {
    name: string;
    faces: Array<Face>;
    vertexCount: number;
}
export interface MeshBuild {
    vertices: Array<number>;
    indexes: Array<number>;
    coords: Array<number>;
    texcoords?: Array<number>;
    colors?: Array<number>;
    normals?: Array<number>;
}
/**
 * A 3D base mesh object.
 */
declare class Gfx3Mesh extends Gfx3Drawable implements Poolable<Gfx3Mesh> {
    shadowCasting: boolean;
    billboard: boolean;
    material: Gfx3Material;
    geo: MeshBuild;
    constructor();
    /**
     * Useful function takes various vertex data and returns vertices with calculated normals, tangents, and binormals in the engine format.
     *
     * @param {number} vertexCount - The total number of vertices in the mesh.
     * @param coords - A list of vertex coordinates.
     * @param [texcoords] - A list of vertex texture coordinates.
     * @param [colors] - A list of vertex color.
     * @param [normals] - A list of vertex normal.
     * @param [groups] - A list of vertex group.
     */
    static buildVertices(vertexCount: number, coords: Array<number>, texcoords?: Array<number>, colors?: Array<number>, normals?: Array<number>, groups?: Array<Group>): MeshBuild;
    /**
     * Free all resources.
     * Warning: You need to call this method to free allocation for this object.
     *
     * @param {boolean} keepMat - Determines if the material is deleted or not.
     */
    delete(keepMat?: boolean): void;
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * The draw function.
     */
    draw(): void;
    /**
     * Set the shadow casting.
     *
     * @param {boolean} shadowCasting - Determines if object cast shadows.
     */
    setShadowCasting(shadowCasting: boolean): void;
    /**
     * Check if shadow casting is enable or not.
     */
    getShadowCasting(): boolean;
    /**
     * Set the billboard mode.
     *
     * @param {boolean} billboard - Determines if object is a billboard.
     */
    setBillboard(billboard: boolean): void;
    /**
     * Check if billboard mode is enable or not.
     */
    isBillboard(): boolean;
    /**
     * Set a material.
     *
     * @param {Gfx3Material} material - The material.
     * @param {boolean} [keepMat=true] - Determines whether to keep the current material or delete it before assigning the new material.
     */
    setMaterial(material: Gfx3Material, keepMat?: boolean): void;
    /**
     * Returns the material.
     */
    getMaterial(): Gfx3Material;
    /**
     * Returns all geometry informations.
     */
    getGeo(): MeshBuild;
    /**
     * Clone the object.
     *
     * @param {Gfx3Mesh} mesh - The copy object.
     * @param {mat4} transformMatrix - The transformation matrix.
     */
    clone(mesh?: Gfx3Mesh, transformMatrix?: mat4): Gfx3Mesh;
    /**
     * Returns the material.
     */
    get mat(): Gfx3Material;
}
export { Gfx3Mesh };
