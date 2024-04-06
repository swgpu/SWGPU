import { gfx3DebugRenderer } from '../gfx3/gfx3_debug_renderer';
import { UT } from '../core/utils';

interface Sector {
  v1: vec3;
  v2: vec3;
  v3: vec3;
};

interface Neighbor {
  s1: number;
  s2: number;
  s3: number;
};

interface Shared {
  sectorIds: Array<number>
};

interface Point {
  sectorIndex: number;
  x: number;
  y: number;
  z: number;
};

interface Walker {
  id: string;
  points: Array<Point>;
};

interface ResMoveWalker {
  walker: Walker;
  move: vec3;
  collide: boolean;
};

interface ResMovePoint {
  point: Point;
  move: vec3;
  collide: boolean;
};

/**
 * A 3D walkmesh.
 * In collision case, the collision response sliding along the edges of the walkmesh to keep a good feeling for the player.
 */
class Gfx3PhysicsJWM {
  sectors: Array<Sector>;
  sectorsData: Array<any>;
  neighborPool: Array<Neighbor>;
  sharedPool: Array<Shared>;
  points: Map<string, Point>;
  walkers: Map<string, Walker>;
  debugEnabled: boolean;
  debugVertices: Array<number>;
  debugVertexCount: number;

  constructor() {
    this.sectors = [];
    this.sectorsData = [];
    this.neighborPool = [];
    this.sharedPool = [];
    this.points = new Map<string, Point>();
    this.walkers = new Map<string, Walker>();
    this.debugEnabled = true;
    this.debugVertices = [];
    this.debugVertexCount = 0;
  }

  /**
   * Load asynchronously walkmesh data from a json file (jwm).
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'JWM') {
      throw new Error('GfxJWM::loadFromFile(): File not valid !');
    }

    this.sectors = [];
    for (const obj of json['Sectors']) {
      this.sectors.push({
        v1: obj[0],
        v2: obj[1],
        v3: obj[2]
      });
    }

    this.sectorsData = [];
    for (const obj of json['SectorsData']) {
      const sectorIndex = obj['SectorIndex'];
      this.sectorsData[sectorIndex] = obj;
    }

    this.neighborPool = [];
    for (const obj of json['NeighborPool']) {
      this.neighborPool.push({
        s1: obj[0],
        s2: obj[1],
        s3: obj[2]
      });
    }

    this.sharedPool = [];
    for (const obj of json['SharedPool']) {
      this.sharedPool.push({
        sectorIds: obj
      });
    }
  }

  /**
   * The update function.
   */
  update(): void {
    if (!this.debugEnabled) {
      return;
    }

    this.debugVertices = [];
    this.debugVertexCount = 0;

    for (const sector of this.sectors) {
      this.debugVertices.push(sector.v1[0], sector.v1[1], sector.v1[2], 1, 1, 1);
      this.debugVertices.push(sector.v2[0], sector.v2[1], sector.v2[2], 1, 1, 1);
      this.debugVertices.push(sector.v1[0], sector.v1[1], sector.v1[2], 1, 1, 1);
      this.debugVertices.push(sector.v3[0], sector.v3[1], sector.v3[2], 1, 1, 1);
      this.debugVertices.push(sector.v2[0], sector.v2[1], sector.v2[2], 1, 1, 1);
      this.debugVertices.push(sector.v3[0], sector.v3[1], sector.v3[2], 1, 1, 1);
      this.debugVertexCount += 6;
    }

    for (const walker of this.walkers.values()) {
      this.debugVertices.push(walker.points[1].x, walker.points[1].y, walker.points[1].z, 1, 1, 1);
      this.debugVertices.push(walker.points[2].x, walker.points[2].y, walker.points[2].z, 1, 1, 1);
      this.debugVertices.push(walker.points[2].x, walker.points[2].y, walker.points[2].z, 1, 1, 1);
      this.debugVertices.push(walker.points[3].x, walker.points[3].y, walker.points[3].z, 1, 1, 1);
      this.debugVertices.push(walker.points[3].x, walker.points[3].y, walker.points[3].z, 1, 1, 1);
      this.debugVertices.push(walker.points[4].x, walker.points[4].y, walker.points[4].z, 1, 1, 1);
      this.debugVertices.push(walker.points[4].x, walker.points[4].y, walker.points[4].z, 1, 1, 1);
      this.debugVertices.push(walker.points[1].x, walker.points[1].y, walker.points[1].z, 1, 1, 1);
      this.debugVertexCount += 8;
    }
  }

  /**
   * The draw function.
   */
  draw(): void {
    if (!this.debugEnabled) {
      return;
    }

    gfx3DebugRenderer.drawVertices(this.debugVertices, this.debugVertexCount, UT.MAT4_IDENTITY());

    for (const point of this.points.values()) {
      gfx3DebugRenderer.drawSphere(UT.MAT4_TRANSLATE(point.x, point.y, point.z), 0.01, 2);
    }
  }

  /**
   * Enable the debug display.
   * 
   * @param {boolean} enabled - The enabled flag.
   */
  enableDebug(enabled: boolean): void {
    this.debugEnabled = enabled;
  }

  /**
   * Add a single point.
   * 
   * @param {string} id - A unique identifier.
   * @param {number} x - The x-coordinate of the point position.
   * @param {number} z - The z-coordinate of the point position.
   */
  addPoint(id: string, x: number, z: number): void {
    if (this.points.has(id)) {
      throw new Error('Gfx3PhysicsJWM::addPoint: point with id ' + id + ' already exist.');
    }

    this.points.set(id, this.$utilsCreatePoint(x, z));
  }

  /**
   * Remove a point.
   * 
   * @param {string} id - A unique identifier.
   */
  removePoint(id: string): void {
    if (!this.points.has(id)) {
      throw new Error('Gfx3PhysicsJWM::removePoint(): point not exist !');
    }

    this.points.delete(id);
  }

  /**
   * Returns a point.
   * 
   * @param {string} id - A unique identifier.
   */
  getPoint(id: string): Point {
    const point = this.points.get(id);
    if (!point) {
      throw new Error('Gfx3PhysicsJWM::getPoint: point with id ' + id + ' not exist.');
    }

    return point;
  }

  /**
   * Move a point.
   * 
   * @param {Point} point - The point reference.
   * @param {number} mx - The movement in the x-axis.
   * @param {number} mz - The movement in the z-axis.
   */
  movePoint(point: Point, mx: number, mz: number): ResMovePoint {
    const moveInfo = this.$utilsMove(point.sectorIndex, point.x, point.z, mx, mz);
    point.sectorIndex = moveInfo.sectorIndex;
    point.x += moveInfo.mx;
    point.y = moveInfo.elevation;
    point.z += moveInfo.mz;

    return {
      point: point,
      move: [moveInfo.mx, moveInfo.elevation - point.y, moveInfo.mz],
      collide: mx != moveInfo.mx || mz != moveInfo.mz
    };
  }

  /**
   * Add a walker.
   * Note: A walker is a square composed by 5 rigid points.
   * 
   * @param {string} id - A unique identifier.
   * @param {number} x - The x-coordinate of the walker's starting position.
   * @param {number} z - The z-coordinate of the walker's starting position.
   * @param {number} radius - The radius.
   */
  addWalker(id: string, x: number, z: number, radius: number): Walker {
    if (this.walkers.has(id)) {
      throw new Error('Gfx3PhysicsJWM::addWalkerFromRadius: walker with id ' + id + ' already exist.');
    }

    const walker: Walker = {
      id: id,
      points: [
        this.$utilsCreatePoint(x, z),
        this.$utilsCreatePoint(x + radius, z + radius),
        this.$utilsCreatePoint(x + radius, z - radius),
        this.$utilsCreatePoint(x - radius, z - radius),
        this.$utilsCreatePoint(x - radius, z + radius)
      ]
    };

    this.walkers.set(id, walker);
    return walker;
  }

  /**
   * Remove a walker.
   * 
   * @param {string} id - A unique identifier.
   */
  removeWalker(id: string): void {
    if (!this.walkers.has(id)) {
      throw new Error('Gfx3PhysicsJWM::removeWalker(): Walker not exist !');
    }

    this.walkers.delete(id);
  }

  /**
   * Returns a walker.
   * 
   * @param {string} id - A unique identifier.
   */
  getWalker(id: string): Walker {
    if (!this.walkers.has(id)) {
      throw new Error('Gfx3PhysicsJWM::getWalker: walker with id ' + id + ' not exist.');
    }

    return this.walkers.get(id)!;
  }

  /**
   * Move a walker.
   * 
   * @param {Walker} walker - The walker reference.
   * @param {number} mx - The movement in the x-axis.
   * @param {number} mz - The movement in the z-axis.
   */
  moveWalker(walker: Walker, mx: number, mz: number): ResMoveWalker {
    // prevent dead end.
    let fmx = mx;
    let fmz = mz;
    let fmy = 0;
    let numDeviations = 0;
    let deviantPoints = [];
    let moveInfoPoints = [];
    let i = 0;

    while (i < walker.points.length) {
      let deviation = false;

      if (!deviantPoints[i]) {
        const moveInfo = this.$utilsMove(walker.points[i].sectorIndex, walker.points[i].x, walker.points[i].z, fmx, fmz);
        if (moveInfo.mx == 0 && moveInfo.mz == 0) {
          fmx = 0;
          fmz = 0;
          moveInfoPoints = [];
          break;
        }

        if (moveInfo.mx != fmx || moveInfo.mz != fmz) {
          numDeviations++;
          fmx = moveInfo.mx;
          fmz = moveInfo.mz;
          deviation = true;
          deviantPoints[i] = true;
        }

        moveInfoPoints[i] = moveInfo;
        fmy = moveInfoPoints[0].elevation - walker.points[0].y;
      }

      // if two points or more are deviated it is a dead-end, no reasons to continue...
      if (numDeviations >= 2) {
        fmx = 0;
        fmz = 0;
        moveInfoPoints = [];
        break;
      }

      // if deviation, we need to restart from 0 to update other points with new mx,mz.
      i = deviation ? 0 : i + 1;
    }

    for (let i = 0; i < moveInfoPoints.length; i++) {
      walker.points[i].sectorIndex = moveInfoPoints[i].sectorIndex;
      walker.points[i].x += fmx;
      walker.points[i].y = moveInfoPoints[i].elevation;
      walker.points[i].z += fmz;
    }

    return {
      walker: walker,
      move: [fmx, fmy, fmz],
      collide: mx != fmx || mz != fmz
    };
  }

  /**
   * Delete all walkers.
   */
  clearWalkers(): void {
    this.walkers.clear();
  }

  /**
   * Return sector data.
   * 
   * @param {number} sectorIndex - The sector index.
   */
  getSectorData(sectorIndex: number): any {
    return this.sectorsData[sectorIndex];
  }

  $utilsMove(sectorIndex: number, x: number, z: number, mx: number, mz: number, i: number = 0): { sectorIndex: number, mx: number, mz: number, elevation: number } {
    if (mx > -UT.BIG_EPSILON && mx < +UT.BIG_EPSILON && mz > -UT.BIG_EPSILON && mz < +UT.BIG_EPSILON) {
      return { sectorIndex: sectorIndex, mx: 0, mz: 0, elevation: Infinity };
    }

    if (i >= this.sharedPool[sectorIndex].sectorIds.length) {
      return { sectorIndex: sectorIndex, mx: 0, mz: 0, elevation: Infinity };
    }

    const sharedSectorIndex = this.sharedPool[sectorIndex].sectorIds[i];
    const a = this.sectors[sharedSectorIndex].v1;
    const b = this.sectors[sharedSectorIndex].v2;
    const c = this.sectors[sharedSectorIndex].v3;

    const inside = UT.TRI2_POINT_INSIDE([x + mx, z + mz], [a[0], a[2]], [b[0], b[2]], [c[0], c[2]]);
    if (inside == 1) {
      const elevation = UT.TRI3_POINT_ELEVATION([x + mx, z + mz], a, b, c);
      return { sectorIndex: sharedSectorIndex, mx: mx, mz: mz, elevation: elevation };
    }

    const ab: vec2 = [b[0] - a[0], b[2] - a[2]];
    const bc: vec2 = [c[0] - b[0], c[2] - b[2]];
    const ca: vec2 = [a[0] - c[0], a[2] - c[2]];

    if (this.neighborPool[sharedSectorIndex].s1 == -1 && UT.COLLIDE_LINE_TO_LINE([a[0], a[2]], [b[0], b[2]], [x, z], [x + mx, z + mz])) {
      [mx, mz] = UT.VEC2_PROJECTION_COS([mx, mz], ab);
      return this.$utilsMove(sectorIndex, x, z, mx, mz, 0);
    }
    else if (this.neighborPool[sharedSectorIndex].s2 == -1 && UT.COLLIDE_LINE_TO_LINE([b[0], b[2]], [c[0], c[2]], [x, z], [x + mx, z + mz])) {
      [mx, mz] = UT.VEC2_PROJECTION_COS([mx, mz], bc);
      return this.$utilsMove(sectorIndex, x, z, mx, mz, 0);
    }
    else if (this.neighborPool[sharedSectorIndex].s3 == -1 && UT.COLLIDE_LINE_TO_LINE([c[0], c[2]], [a[0], a[2]], [x, z], [x + mx, z + mz])) {
      [mx, mz] = UT.VEC2_PROJECTION_COS([mx, mz], ca);
      return this.$utilsMove(sectorIndex, x, z, mx, mz, 0);
    }

    return this.$utilsMove(sectorIndex, x, z, mx, mz, i + 1);
  }

  $utilsCreatePoint(x: number, z: number): Point {
    const loc = this.$utilsFindLocationInfo(x, z);
    return {
      sectorIndex: loc.sectorIndex,
      x: x,
      y: loc.elev,
      z: z
    };
  }

  $utilsFindLocationInfo(x: number, z: number): { sectorIndex: number, elev: number } {
    for (let i = 0; i < this.sectors.length; i++) {
      const a = this.sectors[i].v1;
      const b = this.sectors[i].v2;
      const c = this.sectors[i].v3;
      if (UT.TRI2_POINT_INSIDE([x, z], [a[0], a[2]], [b[0], b[2]], [c[0], c[2]]) == 1) {
        return { sectorIndex: i, elev: UT.TRI3_POINT_ELEVATION([x, z], a, b, c) };
      }
    }

    return { sectorIndex: -1, elev: Infinity };
  }
}

export { Gfx3PhysicsJWM };