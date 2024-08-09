import { Gfx2TileObject } from './gfx2_tile_object';

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
   * Returns the y-coordinates offset.
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

export { Gfx2TileLayer };