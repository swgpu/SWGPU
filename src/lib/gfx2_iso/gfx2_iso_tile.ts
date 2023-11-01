import { gfx2Manager } from '../../lib/gfx2/gfx2_manager';
import { Gfx2IsoDrawable } from './gfx2_iso_drawable';

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
  dw: number;
  dh: number;
};

class Gfx2IsoTile extends Gfx2IsoDrawable {
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

  constructor(options: Gfx2TileOptions) {
    super();
    this.texture = options.texture;
    this.animation = options.animation;
    this.elevation = options.elevation;
    this.position[0] = options.dx;
    this.position[1] = options.dy;
    this.col = options.col;
    this.row = options.row;
    this.sx = options.sx;
    this.sy = options.sy;
    this.sw = options.sw;
    this.sh = options.sh;
    this.dw = options.dw;
    this.dh = options.dh;
  }

  draw(): void {
    if (!this.texture) {
      return;
    }

    const ctx = gfx2Manager.getContext();
    ctx.save();
    ctx.translate(-this.dw * 0.5, -this.dh);
    ctx.drawImage(this.texture, this.sx, this.sy, this.sw, this.sh, this.position[0], this.position[1], this.dw, this.dh);
    ctx.restore();
  }
}

export { Gfx2IsoTile };