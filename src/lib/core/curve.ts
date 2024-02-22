import { CurveInterpolator } from 'curve-interpolator';

interface CurveOptions {
  tension?: number,
  alpha?: number,
  closed?: boolean,
  arcDivisions?: number,
  numericalApproximationOrder?: number,
  numericalInverseSamples?: number,
  lmargin?: number
};

/**
 * A cubic curve.
 */
class Curve {
  /**
   * Create a curve interpolator from asynchronously loads curve data from a json file and return it.
   * 
   * @param {string} path - The file path.
   */
  static async createInterpolatorFromFile(path: string): Promise<CurveInterpolator> {
    let response = await fetch(path);
    let json = await response.json();

    const points = [];
    for (const point of json['Points']) {
      points.push(point);
    }

    return Curve.createInterpolator(points, {
      tension: json['Tension'] ?? 0.5,
      alpha: json['Alpha'] ?? 0,
      closed: json['Closed'] ?? false,
      arcDivisions: json['ArcDivisions'],
      numericalApproximationOrder: json['NumericalApproximationOrder'],
      numericalInverseSamples: json['NumericalInverseSamples'],
      lmargin: json['LMargin']
    });
  }

  /**
   * Create and returns a curve interpolator.
   * 
   * @param {Array<vec_any>} points - Control points.
   * @param {CurveOptions} options - Interpolator options.
   */
  static createInterpolator(points: Array<vec_any>, options: CurveOptions): CurveInterpolator {
    return new CurveInterpolator(points, {
      tension: options.tension,
      alpha: options.alpha,
      closed: options.closed,
      arcDivisions: options.arcDivisions,
      numericalApproximationOrder: options.numericalApproximationOrder,
      numericalInverseSamples: options.numericalInverseSamples,
      lmargin: options.lmargin
    });
  }
}

export { Curve, CurveInterpolator };