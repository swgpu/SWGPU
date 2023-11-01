import { Gfx2Drawable } from '../gfx2/gfx2_drawable';

class Gfx2IsoDrawable extends Gfx2Drawable {
  z: number;
  elevation: number;

  constructor() {
    super();
    this.z = 0;
    this.elevation = 0;
  }

  setPositionZ(z: number): void {
    this.z = z;
  }

  getPositionZ(): number {
    return this.z;
  }

  setElevation(elevation: number): void {
    this.elevation = elevation;
  }

  getElevation(): number {
    return this.elevation;
  }
}

export { Gfx2IsoDrawable };