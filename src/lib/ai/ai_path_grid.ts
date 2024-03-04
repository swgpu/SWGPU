/**
 * A general grid representation.
 * @typeParam T - The grid dimensions.
 */
abstract class AIPathGrid<T extends vec2 | vec3> {
  grid: Array<number>;
  size: T;

  /**
   * @param size - The grid size.
   * @param grid - The grid data.
   */
  constructor(size: T, grid = new Array<number>()) {
    this.grid = grid;
    this.size = size;
  }

  /**
   * Return value of cell.
   * 
   * @param pos - The cell position.
   */
  abstract getValue(pos: T): number;

  /**
   * Return all ortho vectors between two positions fitting from nearest to farest the direction.
   * 
   * @param a - The cell position A.
   * @param b - The cell position B.
   */
  abstract getDirections(a: T, b: T): Array<T>;

  /**
   * Check if position is inside the grid.
   * 
   * @param pos - The cell position.
   */
  abstract isInside(pos: T): boolean;

  /**
   * Check if position A and position B are same.
   * 
   * @param a - The cell position A.
   * @param b - The cell position B.
   */
  abstract isSame(a: T, b: T): boolean;

  /**
   * Loads asynchronously path grid data from a json file.
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'ASTAR_GRID') {
      throw new Error('AStarGrid<T>::loadFromFile(): File not valid !');
    }

    this.grid = json['Grid'];
    this.size = json['Size'];
  }
}

/**
 * A 2D grid representation.
 */
class AIPathGrid2D extends AIPathGrid<vec2> {
  /**
   * @param size - The grid size.
   * @param grid - The grid data.
   */
  constructor(size: vec2 = [0, 0], grid = new Array<number>()) {
    super(size, grid);
  }

  /**
   * Return value of cell.
   * 
   * @param pos - The cell position.
   */
  getValue(pos: vec2): number {
    return this.grid[(this.size[0] * pos[1]) + pos[0]];
  }

  /**
   * Return all ortho vectors between two positions fitting from nearest to farest the direction.
   * 
   * @param a - The cell position A.
   * @param b - The cell position B.
   */
  getDirections(a: vec2, b: vec2): Array<vec2> {
    const directions: Array<vec2> = [
      [ 0, -1],
      [ 1,  0],
      [ 0,  1],
      [-1,  0]
    ];
  
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
  
    return directions.sort((a, b) => {
      const lengthA = Math.sqrt(Math.pow(dx + a[0], 2) + Math.pow(dy + a[1], 2));
      const lengthB = Math.sqrt(Math.pow(dx + b[0], 2) + Math.pow(dy + b[1], 2));
      return lengthA - lengthB;
    });
  }

  /**
   * Check if position is inside the grid.
   * 
   * @param pos - The cell position.
   */
  isInside(pos: vec2): boolean {
    return !(pos[0] < 0 || pos[0] >= this.size[0] || pos[1] < 0 || pos[1] >= this.size[1]);
  }

  /**
   * Check if position A and position B are same.
   * 
   * @param a - The cell position A.
   * @param b - The cell position B.
   */
  isSame(a: vec2, b: vec2): boolean {
    return a[0] == b[0] && a[1] == b[1];
  }
}

/**
 * A 3D grid representation.
 */
class AIPathGrid3D extends AIPathGrid<vec3> {
  /**
   * @param size - The grid size.
   * @param grid - The grid data.
   */
  constructor(size: vec3 = [0, 0, 0], grid = new Array<number>()) {
    super(size, grid);
  }

  /**
   * Return value of cell.
   * 
   * @param pos - The cell position.
   */
  getValue(pos: vec3): number {
    return this.grid[(this.size[2] * pos[2]) + (this.size[0] * pos[1]) + pos[0]];
  }

  /**
   * Return all ortho vectors between two positions fitting from nearest to farest the direction.
   * 
   * @param a - The cell position A.
   * @param b - The cell position B.
   */
  getDirections(a: vec3, b: vec3): Array<vec3> {
    const directions: Array<vec3> = [
      [ 0,  0,  1],
      [ 0,  0, -1],
      [-1,  0,  0],
      [ 1,  0,  0],
      [ 0,  1,  0],
      [ 0, -1,  0]
    ];

    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const dz = b[2] - a[2];

    return directions.sort((a, b) => {
      const lengthA = Math.sqrt(Math.pow(dx + a[0], 2) + Math.pow(dy + a[1], 2) * Math.pow(dz + a[2], 2));
      const lengthB = Math.sqrt(Math.pow(dx + b[0], 2) + Math.pow(dy + b[1], 2) * Math.pow(dz + b[2], 2));
      return lengthA - lengthB;
    });
  }

  /**
   * Check if position is inside the grid.
   * 
   * @param pos - The cell position.
   */
  isInside(pos: vec3): boolean {
    return !(pos[0] < 0 || pos[0] >= this.size[0] || pos[1] < 0 || pos[1] >= this.size[1] || pos[2] < 0 || pos[2] >= this.size[2]);
  }

  /**
   * Check if position A and position B are same.
   * 
   * @param a - The cell position A.
   * @param b - The cell position B.
   */
  isSame(a: vec3, b: vec3): boolean {
    return a[0] == b[0] && a[1] == b[1] && a[2] == b[2];
  }
}

export { AIPathGrid, AIPathGrid2D, AIPathGrid3D };