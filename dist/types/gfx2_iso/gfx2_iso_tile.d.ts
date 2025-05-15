import { Gfx2Drawable } from '../gfx2/gfx2_drawable';
interface Gfx2TileOptions {
    texture: ImageBitmap | HTMLImageElement;
    animation: Array<number>;
    elevation: number;
    col: number;
    row: number;
    sx: number;
    sy: number;
    sw: number;
    sh: number;
    dx: number;
    dy: number;
    ox: number;
    oy: number;
    dw: number;
    dh: number;
}
/**
 * A 2D isometric tile drawable.
 */
declare class Gfx2IsoTile extends Gfx2Drawable {
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
    constructor(options: Gfx2TileOptions);
    /**
     * The paint function.
     */
    onRender(): void;
}
export { Gfx2IsoTile };
