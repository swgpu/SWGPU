import { gfx2Manager } from '../gfx2/gfx2_manager';
import { gfx2TextureManager } from '../gfx2/gfx2_texture_manager';
import { UT } from '../core/utils';

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
      mx: 0,
      my: 0
    };

    const layer = this.getTileLayer(layerIndex);

    for (let row = top; row <= bottom; row++) {
      for (let col = left; col <= right; col++) {
        if (layer.getTile(col, row) !== undefined) {
          const tileX = col * this.tileWidth;
          const tileY = row * this.tileWidth;
          const collideH = UT.COLLIDE_RECT_TO_RECT([l + mx, t], [r + mx, b], [tileX, tileY], [tileX + this.tileWidth, tileY + this.tileHeight]);
          const collideV = UT.COLLIDE_RECT_TO_RECT([l, t + my], [r, b + my], [tileX, tileY], [tileX + this.tileWidth, tileY + this.tileHeight]);

          if (collideV && row == bottom && my > 0) {
            collisions.bottom = true;
            collisions.isGrounded = true;
            collisions.verticalRow = row;
            collisions.verticalCol = col;
            collisions.my = tileY - b - gap;
          }
          else if (collideV && row == top && my < 0) {
            collisions.top = true;
            collisions.verticalRow = row;
            collisions.verticalCol = col;
            collisions.my = (tileY + this.tileHeight) - t + gap;
          }

          if (collideH && col == left && mx < 0) {
            collisions.left = true;
            collisions.horizontalRow = row;
            collisions.horizontalCol = col;
            collisions.mx = (tileX + this.tileWidth) - l + gap;
          }
          else if (collideH && col == right && mx > 0) {
            collisions.right = true;
            collisions.horizontalRow = row;
            collisions.horizontalCol = col;
            collisions.mx = tileX - r - gap;
          }
        }
      }

      const leftEdgeCol = this.getLocationCol(l - 0.1);
      const isWallLeft = layer.getTile(leftEdgeCol, row) !== undefined;
      if (isWallLeft) {
        collisions.isAgainstWall = 'left';
      }

      const rightEdgeCol = this.getLocationCol(r + 0.1);
      const isWallRight = layer.getTile(rightEdgeCol, row) !== undefined;
      if (isWallRight) {
        collisions.isAgainstWall = 'right';
      }
    }

    return collisions;
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
  objects: Array<Gfx2TileObject>;

  constructor() {
    this.name = '';
    this.rows = 0;
    this.columns = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.visible = true;
    this.frameDuration = 0;
    this.grid = [];
    this.objects = [];
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

    if (data['Objects'] && data['Objects'].length > 0) {
      for (const obj of data['Objects']) {
        const object = new Gfx2TileObject();
        object.loadFromData(obj);
        this.objects.push(object);
      }  
    }
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

  /**
   * Returns the map object list.
   */
  getObjects(): Array<Gfx2TileObject> {
    return this.objects;
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
  properties: Map<number, any>;

  constructor() {
    this.columns = 0;
    this.tileWidth = 0;
    this.tileHeight = 0;
    this.texture = gfx2Manager.getDefaultTexture();
    this.animations = new Map<number, Array<number>>;
    this.properties = new Map<number, any>();
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

    this.properties.clear();
    for (const tileId in data['Properties']) {
      this.properties.set(parseInt(tileId), data['Properties'][tileId]);
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

/**
 * A tile object.
 */
class Gfx2TileObject {
  id: string;
  position: vec2;
  name: string;
  type: string;
  visible: boolean;
  size: vec2;
  properties: Map<string, any>;

  constructor() {
    this.id = '';
    this.position = [0, 0];
    this.name = '';
    this.type = '';
    this.visible = true;
    this.size = [0, 0];
    this.properties = new Map<string, any>();
  }

  /**
   * Load data from data object.
   * 
   * @param {any} data - The data object.
   */
  loadFromData(data: any): void {
    this.id = data['Id'] ?? '';
    this.position = data['Position'] ?? [0, 0];
    this.name = data['Name'] ?? '';
    this.type = data['Type'] ?? '';
    this.visible = data['Visible'] ? true : false;
    this.size = data['Size'] ?? [0, 0];

    for (const key in data['Properties']) {
      this.properties.set(key, data['Properties'][key]);
    }
  }

  /**
   * Returns the id.
   */
  getId(): string {
    return this.id;
  }

  /**
   * Returns the position (location or canvas position).
   */
  getPosition(): vec2 {
    return this.position;
  }

  /**
   * Returns the name.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Returns the type.
   */
  getType(): string {
    return this.type;
  }

  /**
   * Returns the visible flag.
   */
  isVisible(): boolean {
    return this.visible;
  }

  /**
   * Returns the size.
   */
  getSize(): vec2 {
    return this.size;
  }

  /**
   * Returns the property list.
   */
  getProperties(): Map<string, any> {
    return this.properties;
  }
}

export type { TileCollision };
export { Gfx2TileMap };
export { Gfx2TileLayer };
export { Gfx2Tileset };
export { Gfx2TileObject };