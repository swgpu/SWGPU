import { gfx2Manager } from '../gfx2/gfx2_manager';
import { gfx2TextureManager } from '../gfx2/gfx2_texture_manager';
import { FormatJTMTileSet } from './format_jtm';

/**
 * The tileset.
 */
class Gfx2Tileset {
  columns: number;
  tileWidth: number;
  tileHeight: number;
  texture: ImageBitmap | HTMLImageElement;
  animations: Map<number, Array<number>>;
  slopes: Map<number, Array<number>>;
  properties: Map<number, any>;

  constructor() {
    this.columns = 0;
    this.tileWidth = 0;
    this.tileHeight = 0;
    this.texture = gfx2Manager.getDefaultTexture();
    this.animations = new Map<number, Array<number>>;
    this.slopes = new Map<number, Array<number>>;
    this.properties = new Map<number, any>();
  }

  /**
   * Load asynchronously tileset from data object.
   * 
   * @param {FormatJTMTileSet} data - The data object.
   */
  async loadFromData(data: FormatJTMTileSet): Promise<void> {
    this.tileWidth = Number(data['TileWidth']);
    this.tileHeight = Number(data['TileHeight']);
    this.texture = await gfx2TextureManager.loadTexture(data['TextureFile']);
    this.columns = data['Columns'] ? Number(data['Columns']) : this.texture.width / this.tileWidth;

    this.animations.clear();
    for (const tileId in data['Animations']) {
      this.animations.set(Number(tileId), data['Animations'][tileId] ?? []);
    }

    this.slopes.clear();
    for (const tileId in data['Slopes']) {
      this.slopes.set(Number(tileId), data['Slopes'][tileId] ?? []);
    }

    this.properties.clear();
    for (const tileId in data['Properties']) {
      this.properties.set(Number(tileId), data['Properties'][tileId]);
    }
  }

  /**
   * Load asynchronously tileset from texture only.
   * 
   * @param {string} texturePath - The texture path.
   * @param {number} tileWidth - The tile width.
   * @param {number} tileHeight - The tile height.
   */
  async loadFromTexture(texturePath: string, tileWidth: number, tileHeight: number): Promise<void> {
    this.texture = await gfx2TextureManager.loadTexture(texturePath);
    this.columns = this.texture.width / tileWidth;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
  }

  /**
   * Returns the pixel x-coordinate of a tile.
   * 
   * @param {number} tileId - The tile index (start at 1).
   */
  getTilePositionX(tileId: number): number {
    return ((tileId - 1) % this.columns) * this.tileWidth;
  }

  /**
   * Returns the pixel y-coordinate of a tile.
   * 
   * @param {number} tileId - The tile index (start at 1).
   */
  getTilePositionY(tileId: number): number {
    return Math.floor((tileId - 1) / this.columns) * this.tileHeight;
  }

  /**
   * Returns the height of a tile.
   */
  getTileHeight(): number {
    return this.tileHeight;
  }

  /**
   * Returns the width of a tile.
   */
  getTileWidth(): number {
    return this.tileWidth;
  }

  /**
   * Returns the number of columns.
   */
  getColumns(): number {
    return this.columns;
  }

  /**
   * Returns the texture's tileset.
   */
  getTexture(): ImageBitmap | HTMLImageElement {
    return this.texture;
  }

  /**
   * Returns a tile animation as a list of tile index or undefined if not exist.
   * 
   * @param {number} tileId - The tile index.
   */
  getAnimation(tileId: number): Array<number> | undefined {
    return this.animations.get(tileId);
  }

  /**
   * Returns a tile slope or undefined if not exist.
   * 
   * @param {number} tileId - The tile index.
   */
  getSlope(tileId: number): Array<number> | undefined {
    return this.slopes.get(tileId);
  }

  /**
   * Returns a tile properties.
   * 
   * @param {number} tileId - The tile index.
   */
  getProperties(tileId: number): any {
    const properties = this.properties.get(tileId);
    if (!properties) {
      throw new Error('Gfx2TileMap::getProperties(): Properties not found for this tile');
    }

    return properties;
  }

  /**
   * Returns a tile property.
   * 
   * @param {number} tileId - The tile index.
   * @param {string} key - The property key.
   */
  getProperty(tileId: number, key: string): any {
    const properties = this.properties.get(tileId);
    if (!properties) {
      throw new Error('Gfx2TileMap::getProperty(): Properties not found for this tile');
    }

    return properties[key];
  }
}

export { Gfx2Tileset };