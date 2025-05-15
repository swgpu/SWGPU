import { Gfx2TileObject } from './gfx2_tile_object';
/**
 * The tile layer.
 */
declare class Gfx2TileLayer {
    name: string;
    rows: number;
    offsetX: number;
    offsetY: number;
    columns: number;
    visible: boolean;
    frameDuration: number;
    grid: Array<number>;
    objects: Array<Gfx2TileObject>;
    constructor();
    /**
     * Loads asynchronously tile layer from data object.
     *
     * @param {any} data - The data object.
     */
    loadFromData(data: any): void;
    /**
     * Returns the tile at a specific location.
     *
     * @param {number} col - The column index.
     * @param {number} row - The row index.
     */
    getTile(col: number, row: number): number;
    /**
     * Returns the name.
     */
    getName(): string;
    /**
     * Returns the number of rows.
     */
    getRows(): number;
    /**
     * Returns the x-coordinates offset.
     */
    getOffsetX(): number;
    /**
     * Returns the y-coordinates offset.
     */
    getOffsetY(): number;
    /**
     * Returns the number of columns.
     */
    getColumns(): number;
    /**
     * Check if layer is visible or not.
     */
    isVisible(): boolean;
    /**
     * Returns the frame duration for animated tiles.
     */
    getFrameDuration(): number;
    /**
     * Returns the map layer's grid.
     */
    getGrid(): Array<number>;
    /**
     * Returns the map object list.
     */
    getObjects(): Array<Gfx2TileObject>;
}
export { Gfx2TileLayer };
