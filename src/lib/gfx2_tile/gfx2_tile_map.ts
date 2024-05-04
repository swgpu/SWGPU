import { gfx2Manager } from '../gfx2/gfx2_manager';
import { gfx2TextureManager } from '../gfx2/gfx2_texture_manager';

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

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'JTM') {
      throw new Error('Gfx2TileMap::loadFromFile(): File not valid !');
    }

    this.rows = parseInt(json['Rows']);
    this.columns = parseInt(json['Columns']);
    this.tileHeight = parseInt(json['TileHeight']);
    this.tileWidth = parseInt(json['TileWidth']);

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
   * Load asynchronously tilemap data from a SpriteFusion json file.
   * 
   * @param {string} path - The file path.
   * @param {string} texturePath - The texture file path.
   */
  async loadFromSpriteFusion(path: string, texturePath: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    this.rows = parseInt(json['mapHeight']);
    this.columns = parseInt(json['mapWidth']);
    this.tileHeight = parseInt(json['tileSize']);
    this.tileWidth = parseInt(json['tileSize']);

    this.tileLayers = [];
    for (const obj of json['layers']) {
      const tileLayer = new Gfx2TileLayer();
      tileLayer.loadFromSpriteFusion(obj, this.rows, this.columns);
      tileLayer.rows = this.rows;
      tileLayer.columns = this.columns;
      this.tileLayers.push(tileLayer);
    }

    this.tileset = new Gfx2Tileset();
    await this.tileset.loadFromTexture(texturePath, this.tileWidth, this.tileHeight);
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
}

/**
 * The tile layer.
 */
class Gfx2TileLayer {
  name: string;
  rows: number;
  offsetX: number;
  offsetY: number;
  columns: number;
  visible: boolean;
  frameDuration: number;
  grid: Array<number>;

  constructor() {
    this.name = '';
    this.rows = 0;
    this.columns = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.visible = true;
    this.frameDuration = 0;
    this.grid = [];
  }

  /**
   * Loads asynchronously tile layer from data object.
   * 
   * @param {any} data - The data object.
   */
  loadFromData(data: any): void {
    this.name = data['Name'];
    this.rows = data['Rows'];
    this.columns = data['Columns'];
    this.offsetX = data['OffsetX'] ?? 0;
    this.offsetY = data['OffsetY'] ?? 0;
    this.visible = data['Visible'] ?? true;
    this.frameDuration = data['FrameDuration'] ?? 0;
    this.grid = data['Grid'];
  }

  /**
   * Loads asynchronously tile layer from SpriteFusion data object.
   * 
   * @param {any} data - The data object.
   */
  loadFromSpriteFusion(data: any, rows: number, columns: number): void {
    this.name = data['name'];
    this.rows = rows;
    this.columns = columns;

    for (const obj of data['tiles']) {
      const index = parseInt(obj['x']) + parseInt(obj['y']) * this.columns;
      this.grid[index] = parseInt(obj['id']) + 1;
    }
  }

  /**
   * Returns the tile at a specific location.
   * 
   * @param {number} col - The column index.
   * @param {number} row - The row index.
   */
  getTile(col: number, row: number) {
    return this.grid[col + (row * this.columns)];
  }

  /**
   * Returns the name.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Returns the number of rows.
   */
  getRows(): number {
    return this.rows;
  }

  /**
   * Returns the x-coordinates offset.
   */
  getOffsetX(): number {
    return this.offsetX;
  }

  /**
   * Returns the y-coordiantes offset.
   */
  getOffsetY(): number {
    return this.offsetY;
  }

  /**
   * Returns the number of columns.
   */
  getColumns(): number {
    return this.columns;
  }

  /**
   * Check if layer is visible or not.
   */
  isVisible(): boolean {
    return this.visible;
  }

  /**
   * Returns the frame duration for animated tiles.
   */
  getFrameDuration(): number {
    return this.frameDuration;
  }

  /**
   * Returns the map layer's grid.
   */
  getGrid(): Array<number> {
    return this.grid;
  }
}

/**
 * The tileset.
 */
class Gfx2Tileset {
  columns: number;
  tileWidth: number;
  tileHeight: number;
  texture: ImageBitmap | HTMLImageElement;
  animations: Map<number, Array<number>>;

  constructor() {
    this.columns = 0;
    this.tileWidth = 0;
    this.tileHeight = 0;
    this.texture = gfx2Manager.getDefaultTexture();
    this.animations = new Map<number, Array<number>>;
  }

  /**
   * Load asynchronously tileset from data object.
   * 
   * @param {any} data - The data object.
   */
  async loadFromData(data: any): Promise<void> {
    this.columns = parseInt(data['Columns']);
    this.tileWidth = parseInt(data['TileWidth']);
    this.tileHeight = parseInt(data['TileHeight']);
    this.texture = await gfx2TextureManager.loadTexture(data['TextureFile']);

    this.animations.clear();
    for (const tileId in data['Animations']) {
      this.animations.set(parseInt(tileId), data['Animations'][tileId] ?? []);
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
   * Returns a tile animation as a list of tile index.
   * 
   * @param {number} tileId - The tile index.
   */
  getAnimation(tileId: number): Array<number> | undefined {
    return this.animations.get(tileId);
  }
}

export { Gfx2TileMap };
export { Gfx2TileLayer };
export { Gfx2Tileset };
