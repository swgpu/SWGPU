import { FormatJTM } from './format_jtm';
import { Gfx2TileLayer } from './gfx2_tile_layer';
import { Gfx2Tileset } from './gfx2_tile_set';
interface TileCollision {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
    horizontalRow: number;
    horizontalCol: number;
    verticalRow: number;
    verticalCol: number;
    isGrounded: boolean;
    isAgainstWall: null | 'right' | 'left' | 'top' | 'bottom';
    mx: number;
    my: number;
}
/**
 * The tilemap.
 */
declare class Gfx2TileMap {
    rows: number;
    columns: number;
    tileHeight: number;
    tileWidth: number;
    tileLayers: Array<Gfx2TileLayer>;
    tileset: Gfx2Tileset;
    constructor();
    /**
     * Load asynchronously tilemap data from a json file (jtm).
     *
     * @param {string} path - The file path.
     */
    loadFromFile(path: string): Promise<void>;
    /**
     * Loads asynchronously tilemap data from a tilekit file (json).
     *
     * @param {string} path - The file path.
     * @param {string} textureDir - The texture folder path.
     */
    loadFromTileKit(path: string, textureDir?: string): Promise<void>;
    /**
     * Loads asynchronously tilemap data from a spritefusion file (json).
     *
     * @param {string} path - The file path.
     * @param {string} texturePath - The texture file path.
     */
    loadFromSpriteFusion(path: string, texturePath?: string): Promise<void>;
    /**
     * Loads tilemap data from a jtm formatted data.
     *
     * @param {FormatJTM} data - The jtm formatted data.
     */
    loadFromData(json: FormatJTM): Promise<void>;
    /**
     * Returns the map height in pixels.
     */
    getHeight(): number;
    /**
     * Returns the width map in pixels.
     */
    getWidth(): number;
    /**
     * Returns the number of rows.
     */
    getRows(): number;
    /**
     * Returns the number of columns.
     */
    getColumns(): number;
    /**
     * Returns the height of a tile.
     */
    getTileHeight(): number;
    /**
     * Returns the width of a tile.
     */
    getTileWidth(): number;
    /**
     * Returns the tile layer at the specified index.
     *
     * @param {number} index - The index.
     */
    getTileLayer(index: number): Gfx2TileLayer;
    /**
     * Returns all tile layers.
     */
    getTileLayers(): Array<Gfx2TileLayer>;
    /**
     * Searches for a tile layer with a given name and returns it if found, otherwise it returns undefined.
     *
     * @param {string} name - The name of the tile layer.
     */
    findTileLayer(name: string): Gfx2TileLayer | undefined;
    /**
     * Returns the tileset.
     */
    getTileset(): Gfx2Tileset;
    /**
     * Returns the x-coordinate in pixel of a column on a grid. Origin is given at the top-left corner.
     *
     * @param {number} col - The column index.
     */
    getPositionX(col: number): number;
    /**
     * Returns the y-coordinate in pixel of a row on a grid. Origin is given at the top-left corner.
     *
     * @param {number} row - The row index.
     */
    getPositionY(row: number): number;
    /**
     * Returns the column index of a given x-coordinate.
     *
     * @param {number} x - The x-coordinate.
     */
    getLocationCol(x: number): number;
    /**
     * Returns the row index of a given y-coordinate.
     *
     * @param {number} y - The y-coordinate.
     */
    getLocationRow(y: number): number;
    /**
     * Returns a pixel position from row and column indices in an isometric projection.
     *
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     */
    getPositionIso(row: number, col: number): vec2;
    /**
     * Returns the corresponding row and column location.
     *
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     */
    getLocationFromIso(x: number, y: number): vec2;
    /**
     * Returns a rectangle collision infos.
     *
     * @param {number} mx - The x movement.
     * @param {number} my - The y movement.
     * @param {number} layerIndex - The collision index layer.
     * @param {number} l - The left side of rectangle.
     * @param {number} r - The right side of rectangle.
     * @param {number} t - The top side of rectangle.
     * @param {number} b - The bottom side of rectangle.
     */
    box(mx: number, my: number, layerIndex: number, l: number, r: number, t: number, b: number, gap?: number): TileCollision;
}
export type { TileCollision };
export { Gfx2TileMap };
