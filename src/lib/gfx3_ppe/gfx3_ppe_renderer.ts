import { gfx3Manager } from '../gfx3/gfx3_manager';
import { Gfx3PPERendererAbstract } from './gfx3_ppe_renderer_abstract';
import { VERTEX_SHADER, FRAGMENT_SHADER } from './gfx3_ppe_shader';

/**
 * Singleton post-processing psx-style effects renderer.
 */
class Gfx3PPERenderer extends Gfx3PPERendererAbstract {
  constructor() {
    super('PPE_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, new Float32Array([
      1.0,
      gfx3Manager.getWidth(),
      gfx3Manager.getHeight(),
      300.0,
      300.0,
      16.0,
      0.0,
      1.0,
      1.0,
      1.0
    ]));
  }

  /**
   * Enable post-process effects.
   * 
   * @param {boolean} enabled - Indicating whether ppe should be enabled or disable.
   */
  setEnabled(enabled: boolean): void {
    this.params[0] = enabled ? 1.0 : 0.0;
  }

  /**
   * Set the horizontal pixelation value.
   * Low value for stronger effect.
   * 
   * @param {number} widthPixelation - The x-pixelation value.
   */
  setWidthPixelation(widthPixelation: number): void {
    this.params[3] = widthPixelation;
  }

  /**
   * Set the vertical pixelation value.
   * Low value for stronger effect.
   * 
   * @param {number} heightPixelation - The y-pixelation value.
   */
  setHeightPixelation(heightPixelation: number): void {
    this.params[4] = heightPixelation;
  }
  
  /**
   * Set the color precision.
   * It determines how much color is limited.
   * 
   * @param {number} colorPrecision - The color precision.
   */
  setColorPrecision(colorPrecision: number): void {
    this.params[5] = colorPrecision;
  }

  /**
   * Set the dither pattern.
   * You have choise between 5 different patterns (from 0 to 4).
   * 
   * @param {number} ditherPattern - The pattern index.
   */
  setDitherPattern(ditherPattern: number): void {
    this.params[6] = ditherPattern;
  }

  /**
   * Set the dither threshold.
   * It determines a threshold value from what the dither is triggered.
   * 
   * @param {number} ditherThreshold - The threshold.
   */
  setDitherThreshold(ditherThreshold: number): void {
    this.params[7] = ditherThreshold;
  }

  /**
   * Set the dither x-scale.
   * High value for strong effect.
   * 
   * @param {number} ditherScaleX - The x-scale.
   */
  setDitherScaleX(ditherScaleX: number): void {
    this.params[8] = ditherScaleX;
  }

  /**
   * Set the dither y-scale.
   * High value for strong effect.
   * 
   * @param {number} ditherScaleY - The y-scale.
   */
  setDitherScaleY(ditherScaleY: number): void {
    this.params[9] = ditherScaleY;
  }

  /**
   * Check if post-process effects is enabled.
   */
  getEnabled(): boolean {
    return this.params[0] == 1.0 ? true : false;
  }

  /**
   * Return the horizontal pixelation value.
   */
  getWidthPixelation(): number {
    return this.params[3];
  }

  /**
   * Return the vertical pixelation value.
   */
  getHeightPixelation(): number {
    return this.params[4];
  }
  
  /**
   * Return the color precision.
   */
  getColorPrecision(): number {
    return this.params[5];
  }

  /**
   * Get the dither pattern.
   */
  getDitherPattern(): number {
    return this.params[6];
  }

  /**
   * Get the dither threshold.
   */
  getDitherThreshold(): number {
    return this.params[7];
  }
  /**
   * Get the dither x-scale.
   */
  getDitherScaleX(): number {
    return this.params[8];
  }

  /**
   * Get the dither y-scale.
   */
  getDitherScaleY(): number {
    return this.params[9];
  }
}

export { Gfx3PPERenderer };
export const gfx3PPERenderer = new Gfx3PPERenderer();