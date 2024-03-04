import { gfx2Manager } from '../gfx2/gfx2_manager';
import { Gfx2Drawable } from '../gfx2/gfx2_drawable';
import { Gfx2TileMap } from './gfx2_tile_map';

/**
 * A tilemap layer drawable.
 */
class Gfx2TileMapLayer extends Gfx2Drawable {
  tilemap: Gfx2TileMap;
  layerIndex: number;
  frameIndex: number;
  frameProgress: number;

  constructor() {
    super();
    this.tilemap = new Gfx2TileMap();
    this.layerIndex = 0;
    this.frameIndex = 0;
    this.frameProgress = 0;
  }

  /**
   * Load data from tilemap and layer index.
   * 
   * @param {Gfx2TileMap} tilemap - The tilemap.
   * @param {number} layerIndex - The index of the tilelayer.
   */
  loadFromTileMap(tilemap: Gfx2TileMap, layerIndex: number): void {
    this.tilemap = tilemap;
    this.layerIndex = layerIndex;
    this.frameIndex = 0;
    this.frameProgress = 0;

    const tilelayer = tilemap.getTileLayer(layerIndex);
    this.offset[0] = tilelayer.getOffsetX();
    this.offset[1] = tilelayer.getOffsetY();
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    const tilelayer = this.tilemap.getTileLayer(this.layerIndex);
    if (!tilelayer) {
      return;
    }

    if (this.frameProgress > tilelayer.getFrameDuration()) {
      this.frameIndex = this.frameIndex + 1;
      this.frameProgress = 0;
    }

    this.frameProgress += ts;
  }

  /**
   * The paint function.
   */
  paint(): void {
    const tilelayer = this.tilemap.getTileLayer(this.layerIndex);
    if (!tilelayer) {
      return;
    }
    if (!tilelayer.isVisible()) {
      return;
    }

    const ctx = gfx2Manager.getContext();
    const tileset = this.tilemap.getTileset();

    for (let i = 0; i < tilelayer.getRows(); i++) {
      for (let j = 0; j < tilelayer.getColumns(); j++) {
        let tileId = tilelayer.getTile(j, i);
        if (tileId < 0) {
          continue;
        }

        const animation = tileset.getAnimation(tileId);
        if (animation) {
          tileId = animation[this.frameIndex % animation.length];
        }
  
        ctx.drawImage(
          tileset.getTexture(),
          tileset.getTilePositionX(tileId),
          tileset.getTilePositionY(tileId),
          tileset.getTileWidth(),
          tileset.getTileHeight(),
          j * this.tilemap.getTileWidth(),
          i * this.tilemap.getTileHeight(),
          this.tilemap.getTileWidth(),
          this.tilemap.getTileHeight()
        );
      }
    }
  }
}

export { Gfx2TileMapLayer };