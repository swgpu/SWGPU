import { eventManager } from '../core/event_manager';
import { gfx3DebugRenderer } from '../gfx3/gfx3_debug_renderer';
import { UT } from '../core/utils';
import { Gfx3Transformable } from '../gfx3/gfx3_transformable';

/**
 * The `Gfx3Mover` class represents a mover object that can move a transformable target along a series of points.
 */
class Gfx3Mover {
  points: Array<vec3>;
  speed: number;
  looped: boolean;
  debugVertices: Array<number>;
  debugVertexCount: number;
  target: Gfx3Transformable | null;
  currentPointIndex: number;
  finished: boolean;

  /**
   * The constructor.
   */
  constructor() {
    this.points = [];
    this.speed = 1;
    this.looped = false;
    this.debugVertices = [];
    this.debugVertexCount = 0;
    this.target = null;
    this.currentPointIndex = 1;
    this.finished = false;
  }

  /**
   * The "loadFromData" function asynchronously loads mover data from a object.
   * @param {string} data - The `data` parameter is the data object.
   */
  async loadFromData(data: any): Promise<void> {
    this.points = [];
    for (const point of data['Points']) {
      this.points.push(point);
    }

    this.speed = data['Speed'];
    this.looped = UT.VEC3_ISEQUAL(data['Points'].at(-1), data['Points'].at(0));

    this.debugVertices = [];
    this.debugVertexCount = 0;
    for (let i = 0; i < data['Points'].length - 1; i++) {
      const vax = data['Points'][i][0];
      const vay = data['Points'][i][1];
      const vaz = data['Points'][i][2];
      const vbx = data['Points'][i + 1][0];
      const vby = data['Points'][i + 1][1];
      const vbz = data['Points'][i + 1][2];
      this.debugVertices.push(vax, vay, vaz, 1, 1, 1);
      this.debugVertices.push(vbx, vby, vbz, 1, 1, 1);
      this.debugVertexCount += 2;
    }
  }

  /**
   * The "update" function.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    if (!this.target || this.finished) {
      return;
    }

    const position = this.target.getPosition();
    const delta = UT.VEC3_SUBSTRACT(this.points[this.currentPointIndex], position);
    const move = UT.VEC3_SCALE(UT.VEC3_NORMALIZE(delta), this.speed * (ts / 1000));
    const nextPosition = UT.VEC3_ADD(position, move);

    this.target.setPosition(nextPosition[0], nextPosition[1], nextPosition[2]);
    this.target.setRotation(0, UT.VEC2_ANGLE([move[0], move[2]]), 0);

    if (UT.VEC3_LENGTH(delta) < 0.1) {
      if (this.currentPointIndex == this.points.length - 1) {
        this.currentPointIndex = this.looped ? 1 : this.points.length - 1;
        this.finished = this.looped ? false : true;
        eventManager.emit(this, 'E_FINISHED');
      }
      else {
        this.currentPointIndex = this.currentPointIndex + 1;
      }
    }
  }

  /**
   * The "draw" function.
   */
  draw(): void {
    gfx3DebugRenderer.drawVertices(this.debugVertices, this.debugVertexCount, UT.MAT4_IDENTITY());
  }

  /**
   * The "play" function start moving the transformable target across the points.
   */
  play(): void {
    if (this.points.length < 2) {
      throw new Error('Gfx3Mover::play(): points is not defined.');
    }
    if (!this.target) {
      throw new Error('Gfx3Mover::play(): drawable is not defined.');
    }

    this.target.setPosition(this.points[0][0], this.points[0][1], this.points[0][2]);
    this.currentPointIndex = 1;
    this.finished = false;
  }

  /**
   * The "setTarget" function sets the transformable moving target.
   * @param {Gfx3Transformable} target - The target.
   */
  setTarget(target: Gfx3Transformable): void {
    this.target = target;
  }
}

export { Gfx3Mover };