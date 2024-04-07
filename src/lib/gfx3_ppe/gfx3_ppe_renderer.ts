import { Gfx3PPERendererAbstract } from './gfx3_ppe_renderer_abstract';
import { VERTEX_SHADER, FRAGMENT_SHADER } from './gfx3_ppe_shader';

/**
 * Singleton post-processing psx-style effects renderer.
 */
class Gfx3PPERenderer extends Gfx3PPERendererAbstract {
  constructor() {
    super('PPE_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, new Float32Array([
      1.0, // PIXELATION_ENABLED
      300.0, // PIXELATION_WIDTH
      300.0, // PIXELATION_HEIGHT
      1.0, // COLOR_ENABLED
      16.0, // COLOR_PRECISION
      1.0, // DITHER_ENABLED
      0.0, // DITHER_PATTERN_INDEX
      1.0, // DITHER_THRESHOLD
      1.0, // DITHER_SCALE_X
      1.0 // DITHER_SCALE_Y
    ]));
  }

  /**
   * Enable pixelation effect.
   * 
   * @param {boolean} enabled - Indicating whether pixelation should be enabled or disable.
   */
  enablePixelation(enabled: boolean): void {
    this.params[3] = enabled ? 1.0 : 0.0;
  }

  /**
   * Set the horizontal pixelation value.
   * It determines the resolution you want to simulate.
   * 
   * @param {number} widthPixelation - The x-pixelation value.
   */
  setWidthPixelation(widthPixelation: number): void {
    this.params[4] = widthPixelation;
  }

  /**
   * Set the vertical pixelation value.
   * It determines the resolution you want to simulate.
   * 
   * @param {number} heightPixelation - The y-pixelation value.
   */
  setHeightPixelation(heightPixelation: number): void {
    this.params[5] = heightPixelation;
  }

  /**
   * Enable color precision effect.
   * 
   * @param {boolean} enabled - Indicating whether color precision should be enabled or disable.
   */
  enableColorPrecision(enabled: boolean): void {
    this.params[6] = enabled ? 1.0 : 0.0;
  }

  /**
   * Set the color precision.
   * It determines how much color is limited.
   * 
   * @param {number} colorPrecision - The color precision.
   */
  setColorPrecision(colorPrecision: number): void {
    this.params[7] = colorPrecision;
  }

  /**
   * Enable dithering effect.
   * 
   * @param {boolean} enabled - Indicating whether dithering should be enabled or disable.
   */
  enableDither(enabled: boolean): void {
    this.params[8] = enabled ? 1.0 : 0.0;
  }

  /**
   * Set the dither pattern.
   * You have choise between 5 different patterns (from 0 to 4).
   * 
   * @param {number} ditherPattern - The pattern index.
   */
  setDitherPattern(ditherPattern: number): void {
    this.params[9] = ditherPattern;
  }

  /**
   * Set the dither threshold.
   * It determines a threshold value from what the dither is triggered.
   * 
   * @param {number} ditherThreshold - The threshold.
   */
  setDitherThreshold(ditherThreshold: number): void {
    this.params[10] = ditherThreshold;
  }

  /**
   * Set the dither x-scale.
   * High value for strong effect.
   * 
   * @param {number} ditherScaleX - The x-scale.
   */
  setDitherScaleX(ditherScaleX: number): void {
    this.params[11] = ditherScaleX;
  }

  /**
   * Set the dither y-scale.
   * High value for strong effect.
   * 
   * @param {number} ditherScaleY - The y-scale.
   */
  setDitherScaleY(ditherScaleY: number): void {
    this.params[12] = ditherScaleY;
  }

  /**
   * Check if pixelation effect is enabled.
   */
  isPixelationEnabled(): boolean {
    return this.params[3] == 1.0;
  }

  /**
   * Return the horizontal pixelation value.
   */
  getPixelationWidth(): number {
    return this.params[4];
  }

  /**
   * Return the vertical pixelation value.
   */
  getPixelationHeight(): number {
    return this.params[5];
  }
  
  /**
   * Check if color precision effect is enabled.
   */
  isColorPrecisionEnabled(): boolean {
    return this.params[6] == 1.0;
  }

  /**
   * Return the color precision.
   */
  getColorPrecision(): number {
    return this.params[7];
  }

  /**
   * Check if dithering effect is enabled.
   */
  isDitherEnabled(): boolean {
    return this.params[8] == 1.0;
  }

  /**
   * Get the dither pattern.
   */
  getDitherPattern(): number {
    return this.params[9];
  }

  /**
   * Get the dither threshold.
   */
  getDitherThreshold(): number {
    return this.params[10];
  }
  /**
   * Get the dither x-scale.
   */
  getDitherScaleX(): number {
    return this.params[11];
  }

  /**
   * Get the dither y-scale.
   */
  getDitherScaleY(): number {
    return this.params[12];
  }
}

export { Gfx3PPERenderer };
export const gfx3PPERenderer = new Gfx3PPERenderer();