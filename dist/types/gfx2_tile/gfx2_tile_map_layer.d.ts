import { Gfx2Drawable } from '../gfx2/gfx2_drawable';
import { Gfx2TileMap } from './gfx2_tile_map';
/**
 * A tilemap layer drawable.
 */
declare class Gfx2TileMapLayer extends Gfx2Drawable {
    tilemap: Gfx2TileMap;
    layerIndex: number;
    frameIndex: number;
    frameProgress: number;
    constructor();
    /**
     * Load data from tilemap and layer index.
     *
     * @param {Gfx2TileMap} tilemap - The tilemap.
     * @param {number} layerIndex - The index of the tileLayer.
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
}
export { Gfx2TileMapLayer };
