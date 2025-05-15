import { Gfx3Drawable } from '../gfx3/gfx3_drawable';
/**
 * A 3D shadow volume mesh.
 */
declare class Gfx3ShadowVolume extends Gfx3Drawable {
    #private;
    debugEnabled: boolean;
    debugVertices: Array<number>;
    debugVertexCount: number;
    constructor();
    /**
     * Load asynchronously shadow volume data from a json file (jsv).
     *
     * @param {string} path - The file path.
     */
    loadFromFile(path: string): Promise<void>;
    /**
     * Load asynchronously shadow volume data from a binary file (bsv).
     *
     * @param {string} path - The file path.
     */
    loadFromBinaryFile(path: string): Promise<void>;
    /**
     * Free all resources.
     * Warning: You need to call this method to free allocation for this object.
     */
    delete(): void;
    /**
     * The draw function.
     */
    draw(): void;
}
export { Gfx3ShadowVolume };
