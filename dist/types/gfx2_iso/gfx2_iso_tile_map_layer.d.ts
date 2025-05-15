import { Gfx2Drawable } from '../gfx2/gfx2_drawable';
import { Gfx2TileMap } from '../gfx2_tile/gfx2_tile_map';
import { Gfx2IsoTile } from './gfx2_iso_tile';
/**
 * A isometric tilemap layer drawable.
 */
declare class Gfx2IsoTileMapLayer extends Gfx2Drawable {
    tilemap: Gfx2TileMap;
    layerIndex: number;
    tiles: Array<Gfx2IsoTile>;
    frameIndex: number;
    frameProgress: number;
    showDebug: boolean;
    colorDebug: string;
    lineWidthDebug: number;
    constructor();
    /**
     * Load data from tilemap and layer index.
     *
     * @param {Gfx2TileMap} tilemap - The tilemap.
     * @param {number} layerIndex - The index of the tilelayer.
     */
    loadFromTileMap(tilemap: Gfx2TileMap, layerIndex: number): void;
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * The paint function.
     */
    onRender(): void;
    /**
     * Place a tile at specific location.
     *
     * @param {number} tileId - The tile identifier.
     * @param {number} row - The row index.
     * @param {number} col - The col index.
     */
    placeTile(tileId: number, row: number, col: number): void;
    /**
     * Remove a tile at specific location.
     *
     * @param {number} row - The row index.
     * @param {number} col - The col index.
     */
    removeTileAt(row: number, col: number): void;
    /**
     * Returns all tile drawables.
     */
    getTiles(): Array<Gfx2IsoTile>;
    /**
     * Check if debug display is enabled.
     */
    isShowDebug(): boolean;
    /**
     * Set the show debug flag.
     *
     * @param {boolean} showDebug - The showDebug flag.
     */
    setShowDebug(showDebug: boolean): void;
    /**
     * Returns the debug lines color.
     */
    getColorDebug(): string;
    /**
     * Set the color of debug lines.
     *
     * @param {string} colorDebug - The color.
     */
    setColorDebug(colorDebug: string): void;
    /**
     * Returns the debug lines width.
     */
    getLineWidthDebug(): number;
    /**
     * Set the width of debug lines.
     *
     * @param {string} lineWidthDebug - The line width.
     */
    setLineWidthDebug(lineWidthDebug: number): void;
}
export { Gfx2IsoTileMapLayer };
