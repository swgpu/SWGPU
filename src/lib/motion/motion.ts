import { eventManager } from '../core/event_manager';
import { UT } from '../core/utils';

/**
 * Is used to move along a serie of points.
 */
class Motion {
  points: Array<vec3>;
  speed: number;
  looped: boolean;
  running: boolean;
  currentPosition: vec3;
  currentMove: vec3;
  currentPointIndex: number;
  currentSegmentTime: number;

  /**
   * @param {Array<vec3>} points - The serie of points.
   * @param {number} speed - The moving speed.
   * @param {boolean} looped - Determine if path is closed, if closed then motion running in loop.
   */
  constructor(points: Array<vec3> = [], speed: number = 1, looped: boolean = false) {
    this.points = points;
    this.speed = speed;
    this.looped = looped;
    this.running = false;
    this.currentPosition = [0, 0, 0];
    this.currentMove = [0, 0, 0];
    this.currentPointIndex = 1;
    this.currentSegmentTime = 0;
  }

  /**
   * Load asynchronously from a json file.
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();
    this.loadFromData(json);
  }

  /**
   * Load from a data object.
   * 
   * @param {any} data - The data object.
   */
  loadFromData(data: any): void {
    this.points = [];

    for (const point of data['Points']) {
      this.points.push(point);
    }

    this.speed = data['Speed'];
    this.looped = UT.VEC3_ISEQUAL(data['Points'].at(-1), data['Points'].at(0));
    this.running = false;
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    if (!this.running) {
      return;
    }

    const currentSegment = UT.VEC3_SUBSTRACT(this.points[this.currentPointIndex], this.points[this.currentPointIndex - 1]);
    const currentSegmentDir = UT.VEC3_NORMALIZE(currentSegment);
    const currentSegmentLength = UT.VEC3_LENGTH(currentSegment);
    const move = UT.VEC3_SCALE(currentSegmentDir, this.speed * (ts / 1000));

    const progress = UT.VEC3_SUBSTRACT(this.currentPosition, this.points[this.currentPointIndex - 1]);
    const progressLength = UT.VEC3_LENGTH(progress);

    this.currentPosition[0] = this.currentPosition[0] + move[0];
    this.currentPosition[1] = this.currentPosition[1] + move[1];
    this.currentPosition[2] = this.currentPosition[2] + move[2];
    this.currentMove = move;
    this.currentSegmentTime = progressLength / currentSegmentLength;

    if (progressLength > currentSegmentLength) {
      if (this.currentPointIndex == this.points.length - 1) {
        this.currentPointIndex = this.looped ? 1 : this.points.length - 1;
        this.running = this.looped ? true : false;
        eventManager.emit(this, 'E_FINISHED');
      }
      else {
        this.currentPointIndex = this.currentPointIndex + 1;
      }
    }
  }

  /**
   * Start moving along the path.
   */
  run(): void {
    if (this.points.length < 2) {
      throw new Error('Motion::play(): points is not defined.');
    }

    this.running = true;
    this.currentPosition[0] = this.points[0][0];
    this.currentPosition[1] = this.points[0][1];
    this.currentPosition[2] = this.points[0][2];
    this.currentMove = [0, 0, 0];
    this.currentPointIndex = 1;
    this.currentSegmentTime = 0;
  }

  /**
   * Stop moving along the path.
   */
  stop(): void {
    this.running = false;
  }

  /**
   * Check if currently moving along the path.
   */
  isRunning(): boolean {
    return this.running;
  }

  /**
   * Returns the current position.
   */
  getCurrentPosition(): vec3 {
    return this.currentPosition;
  }

  /**
   * Returns the current position x-coordinate.
   */
  getCurrentPositionX(): number {
    return this.currentPosition[0];
  }

  /**
   * Returns the current position y-coordinate.
   */
  getCurrentPositionY(): number {
    return this.currentPosition[1];
  }

  /**
   * Returns the current position z-coordinate.
   */
  getCurrentPositionZ(): number {
    return this.currentPosition[2];
  }

  /**
   * Returns the current move.
   */
  getCurrentMove(): vec3 {
    return this.currentMove;
  }

  /**
   * Returns the current move x-coordinate.
   */
  getCurrentMoveX(): number {
    return this.currentMove[0];
  }

  /**
   * Returns the current move y-coordinate.
   */
  getCurrentMoveY(): number {
    return this.currentMove[1];
  }

  /**
   * Returns the current move z-coordinate.
   */
  getCurrentMoveZ(): number {
    return this.currentMove[2];
  }

  /**
   * Returns the current previous point index.
   */
  getPrevPointIndex(): number {
    return this.currentPointIndex - 1;
  }

  /**
   * Returns the current next point index.
   */
  getNextPointIndex(): number {
    return this.currentPointIndex;
  }

  /**
   * Returns the current prev point.
   */
  getPrevPoint(): vec3 {
    return this.points[this.currentPointIndex - 1];
  }

  /**
   * Returns the current next point.
   */
  getNextPoint(): vec3 {
    return this.points[this.currentPointIndex];
  }

  /**
   * Returns the T value for the current segment (from 0 to 1).
   */
  getCurrentSegmentTime(): number {
    return this.currentSegmentTime;
  }
}

export { Motion };