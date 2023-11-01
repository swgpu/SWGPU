import { gfx2Manager } from '../gfx2/gfx2_manager';
import { gfx2TextureManager } from '../gfx2/gfx2_texture_manager';

/**
 * The `Gfx2TileMap` class represents a tilemap in a game and provides methods for loading tilemap data, accessing
 * tilemap properties, and manipulating tiles.
 */
class Gfx2TileMap {
  rows: number;
  columns: number;
  tileHeight: number;
  tileWidth: number;
  tileLayers: Array<Gfx2TileLayer>;
  tileset: Gfx2Tileset;

  /**
   * The constructor.
   */
  constructor() {
    this.rows = 0;
    this.columns = 0;
    this.tileHeight = 0;
    this.tileWidth = 0;
    this.tileLayers = [];
    this.tileset = new Gfx2Tileset();
  }

  /**
   * The "loadFromFile" function asynchronously loads map data from a json file.
   * @param {string} path - The `path` parameter is the file path.
   */
  async loadFromFile(path: string): Promise<void> {
    let response = await fetch(path);
    let json = await response.json();

    this.rows = json['Rows'];
    this.columns = json['Columns'];
    this.tileHeight = json['TileHeight'];
    this.tileWidth = json['TileWidth'];

    this.tileLayers = [];
    for (let obj of json['Layers']) {
      let tileLayer = new Gfx2TileLayer();
      await tileLayer.loadFromData(obj);
      this.tileLayers.push(tileLayer);
    }

    this.tileset = new Gfx2Tileset();

    if (json['Tileset']) {
      await this.tileset.loadFromData(json['Tileset']);
    }
  }

  /**
   * The "getHeight" function returns the map height in pixels.
   * @returns The map height in pixels.
   */
  getHeight(): number {
    return this.rows * this.tileHeight;
  }

  /**
   * The "getWidth" function returns the width map in pixels.
   * @returns The map width in pixels.
   */
  getWidth(): number {
    return this.columns * this.tileWidth;
  }

  /**
   * The "getRows" function returns the number of rows.
   * @returns The number of rows.
   */
  getRows(): number {
    return this.rows;
  }

  /**
   * The "getColumns" function returns the number of columns.
   * @returns The number of columns.
   */
  getColumns(): number {
    return this.columns;
  }

  /**
   * The "getTileHeight" function returns the height of a tile.
   * @returns The tile height.
   */
  getTileHeight(): number {
    return this.tileHeight;
  }

  /**
   * The "getTileWidth" function returns the width of a tile.
   * @returns The tile width.
   */
  getTileWidth(): number {
    return this.tileWidth;
  }

  /**
   * The "getTileLayer" function returns the tile layer at the specified index.
   * @param {number} index - The index of the tile layer.
   * @returns The tile layer.
   */
  getTileLayer(index: number): Gfx2TileLayer {
    return this.tileLayers[index];
  }

  /**
   * The "getTileLayers" function returns all tile layers.
   * @returns An array of tile layer.
   */
  getTileLayers(): Array<Gfx2TileLayer> {
    return this.tileLayers;
  }

  /**
   * The "findTileLayer" function searches for a tile layer with a given name and returns it if found,
   * otherwise it returns undefined.
   * @param {string} name - The name of the tile layer that you want to find.
   * @returns The tile layer.
   */
  findTileLayer(name: string): Gfx2TileLayer | undefined {
    return this.tileLayers.find(tileLayer => tileLayer.getName() == name);
  }

  /**
   * The "getTileset" function returns the tileset.
   * @returns The tileset.
   */
  getTileset(): Gfx2Tileset {
    return this.tileset;
  }

  /**
   * The "getPositionX" function returns the x-coordinate of a column on a grid.
   * Origin is given at the top-left corner.
   * @param {number} col - The parameter `col` represents the column number.
   * @returns The x-coordinate position.
   */
  getPositionX(col: number): number {
    return col * this.tileWidth;
  }

  /**
   * The "getPositionY" function returns the y-coordinate of a row on a grid.
   * Origin is given at the top-left corner.
   * @param {number} row - The parameter `row` represents the column number.
   * @returns The y-coordinate position.
   */
  getPositionY(row: number): number {
    return row * this.tileHeight;
  }

  /**
   * The "getLocationCol" function returns the column number of a given x-coordinate.
   * @param {number} x - The parameter `x` represents the x-coordinate of a point.
   * @returns The column number.
   */
  getLocationCol(x: number): number {
    return Math.floor(x / this.tileWidth);
  }

  /**
   * The "getLocationRow" function returns the row number of a given y-coordinate.
   * @param {number} y - The parameter `y` represents the y-coordinate of a point.
   * @returns The row number.
   */
  getLocationRow(y: number): number {
    return Math.floor(y / this.tileHeight);
  }

  /**
   * The "getPositionIso" function calculates the position of a tile in an isometric grid based on its
   * row and column indices.
   * @param {number} row - The row parameter represents the row index of a tile in a grid.
   * @param {number} col - The `col` parameter represents the column index of a tile in a grid.
   * @returns a 2D vector (vec2) containing the x and y coordinates.
   */
  getPositionIso(row: number, col: number): vec2 {
    const x = Math.ceil((col - row) * (this.tileWidth * 0.5));
    const y = Math.ceil((col + row) * (this.tileHeight * 0.5));
    return [x, y];
  }

  /**
   * The "getLocationFromIso" function takes in coordinates (x, y) and returns the corresponding location in a grid based on
   * the tile width and height.
   * @param {number} x - The x parameter represents the x-coordinate of a point on a grid.
   * @param {number} y - The `y` parameter represents the vertical position or coordinate of a point on a
   * grid or map.
   * @returns a vec2, which is an array containing the values of col and row.
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
 * The `Gfx2TileLayer` class represents a tile layer in a tilemap.
 */
class Gfx2TileLayer {
  name: string;
  rows: number;
  columns: number;
  visible: boolean;
  frameDuration: number;
  grid: Array<number>;

  /**
   * The constructor.
   */
  constructor() {
    this.name = '';
    this.rows = 0;
    this.columns = 0;
    this.visible = true;
    this.frameDuration = 0;
    this.grid = [];
  }

  /**
   * The "loadFromData" function loads tile layer data.
   * @param {any} data - The `data` object.
   */
  async loadFromData(data: any): Promise<void> {
    this.name = data['Name'];
    this.rows = data['Rows'];
    this.columns = data['Columns'];
    this.visible = data['Visible'];
    this.frameDuration = data['FrameDuration'];
    this.grid = data['Grid'];
  }

  /**
   * The "getTile" function returns the tile at a specific position in a grid.
   * @param {number} col - The column index.
   * @param {number} row - The row index.
   * @returns The tile.
   */
  getTile(col: number, row: number) {
    return this.grid[col + (row * this.columns)];
  }

  /**
   * The "getName" function returns the name property.
   * @returns The name property.
   */
  getName(): string {
    return this.name;
  }

  /**
   * The "getRows" function returns the number of rows.
   * @returns The number of rows.
   */
  getRows(): number {
    return this.rows;
  }

  /**
   * The "getColumns" function returns the number of columns.
   * @returns The number of columns.
   */
  getColumns(): number {
    return this.columns;
  }

  /**
   * The "isVisible" function returns a boolean value indicating whether layer is visible or not.
   * @returns The visible property.
   */
  isVisible(): boolean {
    return this.visible;
  }

  /**
   * The "getFrameDuration" function returns the frame duration for animated tiles.
   * @returns The frame duration.
   */
  getFrameDuration(): number {
    return this.frameDuration;
  }

  /**
   * The "getGrid" function returns the map layer's grid.
   * @returns An array of numbers representing tiles.
   */
  getGrid(): Array<number> {
    return this.grid;
  }
}

/**
 * The `Gfx2Tileset` class represents a tileset in a tilemap.
 */
class Gfx2Tileset {
  columns: number;
  tileWidth: number;
  tileHeight: number;
  texture: ImageBitmap | HTMLImageElement;
  animations: Map<number, Array<number>>;

  /**
   * The constructor.
   */
  constructor() {
    this.columns = 0;
    this.tileWidth = 0;
    this.tileHeight = 0;
    this.texture = gfx2Manager.getDefaultTexture();
    this.animations = new Map<number, Array<number>>;
  }

  /**
   * The "loadFromData" function loads tileset data.
   * @param {any} data - The `data` object.
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
   * The "getTilePositionX" function calculates the x-coordinate of a tile (tile index start at 1).
   * @param {number} tileId - The tileId parameter is a number that represents the tile index number.
   * @returns the x position of the tile.
   */
  getTilePositionX(tileId: number): number {
    return ((tileId - 1) % this.columns) * this.tileWidth;
  }

  /**
   * The "getTilePositionY" function calculates the y-coordinate of a tile (tile index start at 1).
   * @param {number} tileId - The tileId parameter is a number that represents the tile index number.
   * @returns the y position of the tile.
   */
  getTilePositionY(tileId: number): number {
    return Math.floor((tileId - 1) / this.columns) * this.tileHeight;
  }

  /**
   * The "getTileHeight" function returns the height of a tile.
   * @returns The tile height.
   */
  getTileHeight(): number {
    return this.tileHeight;
  }

  /**
   * The "getTileWidth" function returns the width of a tile.
   * @returns The tile width.
   */
  getTileWidth(): number {
    return this.tileWidth;
  }

  /**
   * The "getColumns" function returns the number of columns.
   * @returns The number of columns.
   */
  getColumns(): number {
    return this.columns;
  }

  /**
   * The "getTexture" function returns either an ImageBitmap or an HTMLImageElement.
   * @returns The tileset texture.
   */
  getTexture(): ImageBitmap | HTMLImageElement {
    return this.texture;
  }

  /**
   * The "getAnimation" function returns an array of numbers or undefined based on the given tileId.
   * @param {number} tileId - The `tileId` parameter is a number that represents the ID of a tile.
   * @returns an Array of numbers or undefined.
   */
  getAnimation(tileId: number): Array<number> | undefined {
    return this.animations.get(tileId);
  }
}

export { Gfx2TileMap };
export { Gfx2TileLayer };
export { Gfx2Tileset };
