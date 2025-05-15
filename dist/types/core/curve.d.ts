import { CurveInterpolator } from 'curve-interpolator';
interface CurveOptions {
    tension?: number;
    alpha?: number;
    closed?: boolean;
    arcDivisions?: number;
    numericalApproximationOrder?: number;
    numericalInverseSamples?: number;
    lmargin?: number;
}
/**
 * A Centripetal Catmull–Rom spline.
 */
declare class Curve {
    /**
     * Create a curve interpolator from asynchronously loads curve data from a json file and return it.
     *
     * @param {string} path - The file path.
     */
    static createFromFile(path: string): Promise<CurveInterpolator>;
    /**
     * Create and returns a curve interpolator.
     *
     * @param {Array<vec_any>} points - Control points.
     * @param {CurveOptions} options - Interpolator options.
     */
    static createInterpolator(points: Array<vec_any>, options: CurveOptions): CurveInterpolator;
}
export { Curve, CurveInterpolator };
