import { gfx2Manager } from '../gfx2/gfx2_manager';
import { Gfx2Drawable } from '../gfx2/gfx2_drawable';

interface Gfx2TileOptions {
  texture: ImageBitmap | HTMLImageElement;
  animation: Array<number>;
  elevation: number;
  col: number;
  row: number;
  sx: number
  sy: number;
  sw: number;
  sh: number;
  dx: number;
  dy: number;
  ox: number;
  oy: number;
  dw: number;
  dh: number;
};

/**
 * A 2D isometric tile drawable.
 */
class Gfx2IsoTile extends Gfx2Drawable {
  texture: ImageBitmap | HTMLImageElement;
  animation: Array<number>;
  col: number;
  row: number;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  dw: number;
  dh: number;

  /**
   * @param {Gfx2TileOptions} options - The configuration options.
   */
  constructor(options: Gfx2TileOptions) {
    super();
    this.texture = options.texture;
    this.animation = options.animation;
    this.elevation = options.elevation;
    this.position[0] = options.dx;
    this.position[1] = options.dy;
    this.offset[0] = options.ox;
    this.offset[1] = options.oy;
    this.col = options.col;
    this.row = options.row;
    this.sx = options.sx;
    this.sy = options.sy;
    this.sw = options.sw;
    this.sh = options.sh;
    this.dw = options.dw;
    this.dh = options.dh;
  }

  /**
   * The paint function.
   */
  paint(): void {
    if (!this.texture) {
      return;
    }

    const ctx = gfx2Manager.getContext();
    ctx.save();
    ctx.translate(-this.dw * 0.5, -this.dh);
    ctx.drawImage(this.texture, this.sx, this.sy, this.sw, this.sh, 0, 0, this.dw, this.dh);
    ctx.restore();
  }
}

export { Gfx2IsoTile };