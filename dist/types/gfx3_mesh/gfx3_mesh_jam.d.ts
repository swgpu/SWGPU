import { Poolable } from '../core/object_pool';
import { Gfx3BoundingBox } from '../gfx3/gfx3_bounding_box';
import { Gfx3Mesh, MeshBuild } from './gfx3_mesh';
interface JAMFrame {
    vertices: Array<number>;
}
interface JAMAnimation {
    name: String;
    startFrame: number;
    endFrame: number;
    frameDuration: number;
}
/**
 * A 3D animated mesh.
 * It emit 'E_FINISHED'
 */
declare class Gfx3MeshJAM extends Gfx3Mesh implements Poolable<Gfx3MeshJAM> {
    numVertices: number;
    frames: Array<JAMFrame>;
    animations: Array<JAMAnimation>;
    interpolationEnabled: boolean;
    looped: boolean;
    currentAnimation: JAMAnimation | null;
    currentFrameIndex: number;
    frameProgress: number;
    geos: Array<MeshBuild>;
    boundingBoxes: Array<Gfx3BoundingBox>;
    constructor();
    /**
     * Load asynchronously animated mesh data from a json file (jam).
     *
     * @param {string} path - The file path.
     */
    loadFromFile(path: string): Promise<void>;
    /**
     * Load asynchronously animated mesh data from a binary file (bam).
     *
     * @param {string} path - The file path.
     */
    loadFromBinaryFile(path: string): Promise<void>;
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * Play a specific animation.
     *
     * @param {string} animationName - The name of the animation to be played.
     * @param {boolean} [looped=false] - Determines whether the animation should loop or not.
     * @param {boolean} [preventSameAnimation=false] - Determines whether the same animation should be prevented from playing again.
     * @param {boolean} [interpolationEnabled=true] - Determines whether the animation interpolation is enabled or not.
     */
    play(animationName: string, looped?: boolean, preventSameAnimation?: boolean, interpolationEnabled?: boolean): void;
    /**
     * Check if interpolation is enabled.
     */
    getInterpolationEnabled(): boolean;
    /**
     * Check if animation is looped.
     */
    getLooped(): boolean;
    /**
     * Returns the current animation or null if there is no current animation.
     */
    getCurrentAnimation(): JAMAnimation | null;
    /**
     * Returns the current frame index.
     */
    getCurrentFrameIndex(): number;
    /**
     * Returns the current frame progress.
     */
    getFrameProgress(): number;
    /**
     * Returns the bounding box.
     *
     * @param {boolean} [dynamicMode=false] - Determines if bounding box fit the current animation.
     */
    getBoundingBox(dynamicMode?: boolean): Gfx3BoundingBox;
    /**
     * Returns the bounding box in the world space coordinates.
     *
     * @param {boolean} [dynamicMode=false] - Determines if bounding box fit the current animation.
     */
    getWorldBoundingBox(dynamicMode?: boolean): Gfx3BoundingBox;
    /**
     * Clone the object.
     *
     * @param {Gfx3MeshJAM} jam - The copy object.
     * @param {mat4} transformMatrix - The transformation matrix.
     */
    clone(jam?: Gfx3MeshJAM, transformMatrix?: mat4): Gfx3MeshJAM;
}
export { Gfx3MeshJAM };
