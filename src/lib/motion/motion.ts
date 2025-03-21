import { eventManager } from '../core/event_manager';
import { UT } from '../core/utils';

/**
 * Is used to move along a serie of points.
 * It emit 'E_FINISHED'
 */
class Motion {
  vertices: Array<number>;
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
   * @param {boolean} looped - Determine if path is closed, if closed then motion running in loop.
   */
  constructor(points: Array<vec3> = [], looped: boolean = false) {
    this.vertices = [];
    this.points = points;
    this.speed = 1;
    this.looped = looped;
    this.running = false;
    this.currentPosition = [0, 0, 0];
    this.currentMove = [0, 0, 0];
    this.currentPointIndex = 1;
    this.currentSegmentTime = 0;
  }

  /**
   * Load asynchronously from a json file (jlm).
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'JLM') {
      throw new Error('Motion::loadFromFile(): File not valid !');
    }

    this.setPoints(json['Points']);
  }

  /**
   * Load asynchronously from a binary file (jlmb).
   * 
   * @param {string} path - The file path.
   */
  async loadFromBinaryFile(path: string): Promise<void> {
    const response = await fetch(path);
    const buffer = await response.arrayBuffer();
    const data = new Float32Array(buffer);

    const points: Array<vec3> = [];
    for (var i = 0; i < data.length; i += 3) {
      points.push([data[i + 0], data[i + 1], data[i + 2]])
    }

    this.setPoints(points);
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    if (!this.running) {
      this.currentMove = [0, 0, 0];
      return;
    }

    const currentSegment = UT.VEC3_SUBSTRACT(this.points[this.currentPointIndex], this.points[this.currentPointIndex - 1]);
    const currentSegmentDir = UT.VEC3_NORMALIZE(currentSegment);
    const currentSegmentLength = UT.VEC3_LENGTH(currentSegment);
    const progress = UT.VEC3_SUBSTRACT(this.currentPosition, this.points[this.currentPointIndex - 1]);
    const progressLength = UT.VEC3_LENGTH(progress);

    this.currentMove = UT.VEC3_SCALE(currentSegmentDir, this.speed * (ts / 1000));
    this.currentPosition[0] += this.currentMove[0];
    this.currentPosition[1] += this.currentMove[1];
    this.currentPosition[2] += this.currentMove[2];
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
   * Set the moving speed.
   * 
   * @param {number} speed - The moving speed.
   */
  setSpeed(speed: number): void {
    this.speed = speed;
  }

  /**
   * Set the point list.
   * 
   * @param {Array<vec3>} points - The points.
   */
  setPoints(points: Array<vec3>): void {
    this.points = points;
    this.looped = UT.VEC3_ISEQUAL(points.at(-1)!, points.at(0)!);
    this.running = false;

    this.vertices = [];
    for (const point of points) {
      this.vertices.push(point[0], point[0], point[2]);
    }
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
   * Returns vertices.
   */
  getVertices(): Array<number> {
    return this.vertices;
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
   * Returns the current y-rotation in 3D space.
   */
  getCurrentRotationY(): number {
    return UT.VEC2_ANGLE([this.currentMove[0], this.currentMove[2]]);
  }

  /**
   * Returns the current y-rotation in 3D space.
   */
  getCurrentRotationZ(): number {
    return UT.VEC2_ANGLE([this.currentMove[0], this.currentMove[1]]);
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