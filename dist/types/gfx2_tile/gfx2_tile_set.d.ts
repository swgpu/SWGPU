import { FormatJTMTileSet } from './format_jtm';
/**
 * The tileset.
 */
declare class Gfx2Tileset {
    columns: number;
    tileWidth: number;
    tileHeight: number;
    texture: ImageBitmap | HTMLImageElement;
    animations: Map<number, Array<number>>;
    slopes: Map<number, Array<number>>;
    properties: Map<number, any>;
    constructor();
    /**
     * Load asynchronously tileset from data object.
     *
     * @param {FormatJTMTileSet} data - The data object.
     */
    loadFromData(data: FormatJTMTileSet): Promise<void>;
    /**
     * Load asynchronously tileset from texture only.
     *
     * @param {string} texturePath - The texture path.
     * @param {number} tileWidth - The tile width.
     * @param {number} tileHeight - The tile height.
     */
    loadFromTexture(texturePath: string, tileWidth: number, tileHeight: number): Promise<void>;
    /**
     * Returns the pixel x-coordinate of a tile.
     *
     * @param {number} tileId - The tile index (start at 1).
     */
    getTilePositionX(tileId: number): number;
    /**
     * Returns the pixel y-coordinate of a tile.
     *
     * @param {number} tileId - The tile index (start at 1).
     */
    getTilePositionY(tileId: number): number;
    /**
     * Returns the height of a tile.
     */
    getTileHeight(): number;
    /**
     * Returns the width of a tile.
     */
    getTileWidth(): number;
    /**
     * Returns the number of columns.
     */
    getColumns(): number;
    /**
     * Returns the texture's tileset.
     */
    getTexture(): ImageBitmap | HTMLImageElement;
    /**
     * Returns a tile animation as a list of tile index or undefined if not exist.
     *
     * @param {number} tileId - The tile index.
     */
    getAnimation(tileId: number): Array<number> | undefined;
    /**
     * Returns a tile slope or undefined if not exist.
     *
     * @param {number} tileId - The tile index.
     */
    getSlope(tileId: number): Array<number> | undefined;
    /**
     * Returns a tile properties.
     *
     * @param {number} tileId - The tile index.
     */
    getProperties(tileId: number): any;
    /**
     * Returns a tile property.
     *
     * @param {number} tileId - The tile index.
     * @param {string} key - The property key.
     */
    getProperty(tileId: number, key: string): any;
}
export { Gfx2Tileset };
