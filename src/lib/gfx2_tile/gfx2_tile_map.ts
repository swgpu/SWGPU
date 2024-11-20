import { UT } from '../core/utils';
import { FormatJTM, fromSpriteFusion, fromTilekit } from './format_jtm';
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
};

/**
 * The tilemap.
 */
class Gfx2TileMap {
  rows: number;
  columns: number;
  tileHeight: number;
  tileWidth: number;
  tileLayers: Array<Gfx2TileLayer>;
  tileset: Gfx2Tileset;

  constructor() {
    this.rows = 0;
    this.columns = 0;
    this.tileHeight = 0;
    this.tileWidth = 0;
    this.tileLayers = [];
    this.tileset = new Gfx2Tileset();
  }

  /**
   * Load asynchronously tilemap data from a json file (jtm).
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();
    await this.loadFromData(json);
  }

  /**
   * Loads asynchronously tilemap data from a tilekit file (json).
   * 
   * @param {string} path - The file path.
   * @param {string} textureDir - The texture folder path.
   */
  async loadFromTileKit(path: string, textureDir: string = ''): Promise<void> {
    const data = await fromTilekit(path, textureDir);
    await this.loadFromData(data);
  }

  /**
   * Loads asynchronously tilemap data from a spritefusion file (json).
   * 
   * @param {string} path - The file path.
   * @param {string} texturePath - The texture file path.
   */
  async loadFromSpriteFusion(path: string, texturePath: string = ''): Promise<void> {
    const data = await fromSpriteFusion(path, texturePath);
    await this.loadFromData(data);
  }

  /**
   * Loads tilemap data from a jtm formatted data.
   * 
   * @param {FormatJTM} data - The jtm formatted data.
   */
  async loadFromData(json: FormatJTM) {
    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'JTM') {
      throw new Error('Gfx2TileMap::loadFromData(): Data not valid !');
    }

    this.rows = json['Rows'];
    this.columns = json['Columns'];
    this.tileHeight = json['TileHeight'];
    this.tileWidth = json['TileWidth'];

    this.tileLayers = [];
    for (const obj of json['Layers']) {
      const tileLayer = new Gfx2TileLayer();
      tileLayer.loadFromData(obj);
      this.tileLayers.push(tileLayer);
    }

    this.tileset = new Gfx2Tileset();
    if (json['Tileset']) {
      await this.tileset.loadFromData(json['Tileset']);
    }
  }

  /**
   * Returns the map height in pixels.
   */
  getHeight(): number {
    return this.rows * this.tileHeight;
  }

  /**
   * Returns the width map in pixels.
   */
  getWidth(): number {
    return this.columns * this.tileWidth;
  }

  /**
   * Returns the number of rows.
   */
  getRows(): number {
    return this.rows;
  }

  /**
   * Returns the number of columns.
   */
  getColumns(): number {
    return this.columns;
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
   * Returns the tile layer at the specified index.
   * 
   * @param {number} index - The index.
   */
  getTileLayer(index: number): Gfx2TileLayer {
    return this.tileLayers[index];
  }

  /**
   * Returns all tile layers.
   */
  getTileLayers(): Array<Gfx2TileLayer> {
    return this.tileLayers;
  }

  /**
   * Searches for a tile layer with a given name and returns it if found, otherwise it returns undefined.
   * 
   * @param {string} name - The name of the tile layer.
   */
  findTileLayer(name: string): Gfx2TileLayer | undefined {
    return this.tileLayers.find(tileLayer => tileLayer.getName() == name);
  }

  /**
   * Returns the tileset.
   */
  getTileset(): Gfx2Tileset {
    return this.tileset;
  }

  /**
   * Returns the x-coordinate in pixel of a column on a grid. Origin is given at the top-left corner.
   * 
   * @param {number} col - The column index.
   */
  getPositionX(col: number): number {
    return col * this.tileWidth;
  }

  /**
   * Returns the y-coordinate in pixel of a row on a grid. Origin is given at the top-left corner.
   * 
   * @param {number} row - The row index.
   */
  getPositionY(row: number): number {
    return row * this.tileHeight;
  }

  /**
   * Returns the column index of a given x-coordinate.
   * 
   * @param {number} x - The x-coordinate.
   */
  getLocationCol(x: number): number {
    return Math.floor(x / this.tileWidth);
  }

  /**
   * Returns the row index of a given y-coordinate.
   * 
   * @param {number} y - The y-coordinate.
   */
  getLocationRow(y: number): number {
    return Math.floor(y / this.tileHeight);
  }

  /**
   * Returns a pixel position from row and column indices in an isometric projection.
   * 
   * @param {number} row - The row index.
   * @param {number} col - The column index.
   */
  getPositionIso(row: number, col: number): vec2 {
    const x = Math.ceil((col - row) * (this.tileWidth * 0.5));
    const y = Math.ceil((col + row) * (this.tileHeight * 0.5));
    return [x, y];
  }

  /**
   * Returns the corresponding row and column location.
   * 
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   */
  getLocationFromIso(x: number, y: number): vec2 {
    const divY = y / this.tileHeight;
    const divX = x / this.tileWidth;
    const col = Math.ceil(divY + divX);
    const row = Math.ceil(divY - divX);
    return [col, row];
  }

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
  box(mx: number, my: number, layerIndex: number, l: number, r: number, t: number, b: number, gap: number = 0.01): TileCollision {
    const bottom = this.getLocationRow(b + my);
    const top = this.getLocationRow(t + my);
    const right = this.getLocationCol(r + mx);
    const left = this.getLocationCol(l + mx);

    const collisions: TileCollision = {
      left: false,
      right: false,
      top: false,
      bottom: false,
      horizontalRow: -1,
      horizontalCol: -1,
      verticalRow: -1,
      verticalCol: -1,
      isGrounded: false,
      isAgainstWall: null,
      mx: mx,
      my: my
    };

    const layer = this.getTileLayer(layerIndex);

    for (let row = top; row <= bottom; row++) {
      for (let col = left; col <= right; col++) {
        const tileId = layer.getTile(col, row);
        if (tileId == 0) continue;
        if (col != left && col != right && row != top && row != bottom) continue;

        const tileX = col * this.tileWidth;
        const tileY = row * this.tileHeight;
        const slope = this.tileset.getSlope(tileId);
        const collideH = UT.COLLIDE_RECT_TO_RECT([l + mx, t], [r + mx, b], [tileX, tileY], [tileX + this.tileWidth, tileY + this.tileHeight]);
        const collideV = UT.COLLIDE_RECT_TO_RECT([l, t + my], [r, b + my], [tileX, tileY], [tileX + this.tileWidth, tileY + this.tileHeight]);

        if ((collideH || collideV) && slope) {
          const y1 = tileY + slope[0];
          const y2 = tileY + slope[1];
          const s = y1 < y2 ? l : r;
          const t = (s - tileX) / this.tileWidth;

          if (t > -0.1 && t < 1.1) {
            const slopePosY = y1 + ((y2 - y1) * t);
            collisions.bottom = (b + my) >= slopePosY;
            collisions.isGrounded = collisions.bottom;
            collisions.verticalRow = row;
            collisions.verticalCol = col;
            collisions.my = collisions.bottom ? slopePosY - b - gap : collisions.my;
            return collisions;  
          }
        }

        if (collideV && my > 0) {
          collisions.bottom = true;
          collisions.isGrounded = true;
          collisions.verticalRow = row;
          collisions.verticalCol = col;
          collisions.my = tileY - b - gap;
        }
        else if (collideV && my < 0) {
          collisions.top = true;
          collisions.verticalRow = row;
          collisions.verticalCol = col;
          collisions.my = (tileY + this.tileHeight) - t + gap;
        }

        if (collideH && mx < 0) {
          collisions.left = true;
          collisions.horizontalRow = row;
          collisions.horizontalCol = col;
          collisions.mx = (tileX + this.tileWidth) - l + gap;
        }
        else if (collideH && mx > 0) {
          collisions.right = true;
          collisions.horizontalRow = row;
          collisions.horizontalCol = col;
          collisions.mx = tileX - r - gap;
        }
      }

      const leftEdgeCol = this.getLocationCol(l - 0.1);
      const isWallLeft = layer.getTile(leftEdgeCol, row) !== 0;
      if (isWallLeft) {
        collisions.isAgainstWall = 'left';
      }

      const rightEdgeCol = this.getLocationCol(r + 0.1);
      const isWallRight = layer.getTile(rightEdgeCol, row) !== 0;
      if (isWallRight) {
        collisions.isAgainstWall = 'right';
      }
    }

    return collisions;
  }
}

export type { TileCollision };
export { Gfx2TileMap };