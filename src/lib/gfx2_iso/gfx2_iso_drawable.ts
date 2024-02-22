import { Gfx2Drawable } from '../gfx2/gfx2_drawable';

/**
 * A 2D isometric drawable.
 */
class Gfx2IsoDrawable extends Gfx2Drawable {
  z: number;
  elevation: number;

  constructor() {
    super();
    this.z = 0;
    this.elevation = 0;
  }

  /**
   * Set the z-depth value.
   * 
   * @param {number} z - The z-depth value.
   */
  setPositionZ(z: number): void {
    this.z = z;
  }

  /**
   * Returns the z-depth value.
   */
  getPositionZ(): number {
    return this.z;
  }

  /**
   * Set the elevation.
   * 
   * @param {number} elevation - The elevation value.
   */
  setElevation(elevation: number): void {
    this.elevation = elevation;
  }

  /**
   * Returns the elevation.
   */
  getElevation(): number {
    return this.elevation;
  }
}

export { Gfx2IsoDrawable };