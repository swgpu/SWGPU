import { Poolable } from '../core/object_pool';
import { Gfx3BoundingBox } from '../gfx3/gfx3_bounding_box';
import { Gfx3Material } from './gfx3_mesh_material';
import { Gfx3Mesh, Group } from './gfx3_mesh';
declare class OBJObject {
    name: string;
    coords: Array<number>;
    colors: Array<number>;
    texcoords: Array<number>;
    normals: Array<number>;
    lines: Array<vec3>;
    groups: Array<Group>;
    materialName: string;
    vertexCount: number;
    constructor();
}
/**
 * A 3D obj wavefront mesh object.
 * Note: In fact this mesh is composed by multiple sub-meshes, one by "object".
 * So, you can choose to manipulate them individually or together with that top-level mesh.
 *
 * OBJ Options:
 * - Multiple meshes.
 * - Optionnal Vertex Normals
 * - Optionnal Vertex Colors
 * - Smooth Groups
 *
 * MTL Options:
 * - Kd => Diffuse
 * - Ks => Specular
 * - Ns => Specularity
 * - Ke => Emissive
 * - d  => Opacity
 * - map_Kd => Albedo map
 * - map_Ns => Specularity map
 * - map_Bump => Normal map
 */
declare class Gfx3MeshOBJ extends Gfx3Mesh implements Poolable<Gfx3MeshOBJ> {
    #private;
    coords: Array<number>;
    colors: Array<number>;
    texcoords: Array<number>;
    normals: Array<number>;
    objects: Map<string, OBJObject>;
    materials: Map<string, Gfx3Material>;
    meshes: Map<string, Gfx3Mesh>;
    debugVertices: Array<number>;
    debugVertexCount: number;
    constructor();
    /**
     * Load asynchronously data from obj and mtl files and build the mesh.
     *
     * @param {string} objPath - The obj file path.
     * @param {string} mtlPath - The mtl file path.
     */
    loadFromFile(objPath: string, mtlPath: string): Promise<void>;
    /**
     * Free all resources.
     * Warning: You need to call this method to free allocation for this object.
     */
    delete(): void;
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
     * Returns the vertex count.
     */
    getVertexCount(): number;
    /**
     * Returns the vertices.
     */
    getVertices(): Array<number>;
    /**
     * Returns mesh object with the specified name, or throws an error if the object doesn't exist.
     *
     * @param {string} name - The name.
     */
    getMesh(name: string): Gfx3Mesh;
    /**
     * Returns all mesh objects.
     */
    getMeshes(): IterableIterator<Gfx3Mesh>;
    /**
     * Returns data object with the specified name, or throws an error if the object doesn't exist.
     *
     * @param {string} name - The name.
     */
    getObject(name: string): OBJObject;
    /**
     * Returns the bounding box.
     */
    getBoundingBox(): Gfx3BoundingBox;
    /**
     * Returns the bounding box in the world space coordinates.
     */
    getWorldBoundingBox(): Gfx3BoundingBox;
    /**
     * Clone the object.
     *
     * @param {Gfx3MeshOBJ} obj - The copy object.
     * @param {mat4} transformMatrix - The transformation matrix.
     */
    clone(obj?: Gfx3MeshOBJ, transformMatrix?: mat4): Gfx3MeshOBJ;
}
export { Gfx3MeshOBJ };
