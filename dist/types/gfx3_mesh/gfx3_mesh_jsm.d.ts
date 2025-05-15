import { Poolable } from '../core/object_pool';
import { Gfx3Mesh } from './gfx3_mesh';
/**
 * A 3D static mesh.
 */
declare class Gfx3MeshJSM extends Gfx3Mesh implements Poolable<Gfx3MeshJSM> {
    constructor();
    /**
     * Load asynchronously static mesh data from a json file (jsm).
     *
     * @param {string} path - The file path.
     */
    loadFromFile(path: string): Promise<void>;
    /**
     * Load asynchronously static mesh data from a binary file (bsm).
     *
     * @param {string} path - The file path.
     */
    loadFromBinaryFile(path: string): Promise<void>;
    /**
     * Clone the object.
     *
     * @param {Gfx3MeshJSM} jsm - The copy object.
     * @param {mat4} transformMatrix - The transformation matrix.
     */
    clone(jsm?: Gfx3MeshJSM, transformMatrix?: mat4): Gfx3MeshJSM;
}
export { Gfx3MeshJSM };
