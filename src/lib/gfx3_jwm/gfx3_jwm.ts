import { gfx3DebugRenderer } from '../gfx3/gfx3_debug_renderer';
import { UT } from '../core/utils';
import { Gfx3Transformable } from '../gfx3/gfx3_transformable';

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

interface WalkerPoint {
  sectorIndex: number;
  x: number;
  y: number;
  z: number;
};

interface Walker {
  id: string;
  points: Array<WalkerPoint>;
};

/**
 * A 3D walkmesh.
 * In collision case, the collision response sliding along the edges of the walkmesh to keep a good feeling for the player.
 */
class Gfx3JWM extends Gfx3Transformable {
  sectors: Array<Sector>;
  neighborPool: Array<Neighbor>;
  sharedPool: Array<Shared>;
  walkers: Array<Walker>;
  debugVertices: Array<number>;
  debugVertexCount: number;

  constructor() {
    super();
    this.sectors = [];
    this.neighborPool = [];
    this.sharedPool = [];
    this.walkers = [];
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

    for (const walker of this.walkers) {
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
    gfx3DebugRenderer.drawVertices(this.debugVertices, this.debugVertexCount, this.getTransformMatrix());
  }

  /**
   * Add a new walker.
   * Note: A walker is the representation of a moving entity inside a walkmesh context. It is a square moving along the floor.
   * 
   * @param {string} id - A unique identifier.
   * @param {number} x - The x-coordinate of the walker's starting position.
   * @param {number} z - The z-coordinate of the walker's starting position.
   * @param {number} radius - The size.
   */
  addWalker(id: string, x: number, z: number, radius: number): Walker {
    if (this.walkers.find(w => w.id == id)) {
      throw new Error('Gfx3JWM::addWalker: walker with id ' + id + ' already exist.');
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

    this.walkers.push(walker);
    return walker;
  }

  /**
   * Move a walker.
   * 
   * @param {string} id - The unique identifier of the walker.
   * @param {number} mx - The movement in the x-axis.
   * @param {number} mz - The movement in the z-axis.
   */
  moveWalker(id: string, mx: number, mz: number): vec3 {
    const walker = this.walkers.find(w => w.id == id);
    if (!walker) {
      throw new Error('Gfx3JWM::moveWalker: walker with id ' + id + ' cannot be found.');
    }

    const points = walker.points.slice();
    const deviatedPoints: Array<WalkerPoint> = [];
    const pointSectors: Array<number> = [];
    const pointElevations: Array<number> = [];

    pointSectors[0] = walker.points[0].sectorIndex;
    pointSectors[1] = walker.points[1].sectorIndex;
    pointSectors[2] = walker.points[2].sectorIndex;
    pointSectors[3] = walker.points[3].sectorIndex;
    pointSectors[4] = walker.points[4].sectorIndex;

    pointElevations[0] = walker.points[0].y;
    pointElevations[1] = walker.points[1].y;
    pointElevations[2] = walker.points[2].y;
    pointElevations[3] = walker.points[3].y;
    pointElevations[4] = walker.points[4].y;

    // prevent dead end.
    let numDeviations = 0;
    let moving = false;
    let i = 0;

    while (i < points.length) {
      let deviation = false;
      if (!deviatedPoints[i]) {
        const moveInfo = this.$utilsMove(points[i].sectorIndex, points[i].x, points[i].z, mx, mz);
        if (moveInfo.mx == 0 && moveInfo.mz == 0) {
          mx = 0;
          mz = 0;
          moving = false;
          break;
        }

        if (moveInfo.mx != mx || moveInfo.mz != mz) {
          numDeviations++;
          mx = moveInfo.mx;
          mz = moveInfo.mz;
          deviation = true;
          deviatedPoints[i] = points[i];
        }

        moving = true;
        pointSectors[i] = moveInfo.sectorIndex;
        pointElevations[i] = moveInfo.elevation;
      }

      // if two points or more are deviated it is a dead-end, no reasons to continue...
      if (numDeviations >= 2) {
        mx = 0;
        mz = 0;
        moving = false;
        break;
      }

      // if deviation, we need to restart from 0 to update other points with new mx,mz.
      i = deviation ? 0 : i + 1;
    }

    const my = pointElevations[0] - walker.points[0].y;

    if (moving) {
      walker.points[0].sectorIndex = pointSectors[0];
      walker.points[1].sectorIndex = pointSectors[1];
      walker.points[2].sectorIndex = pointSectors[2];
      walker.points[3].sectorIndex = pointSectors[3];
      walker.points[4].sectorIndex = pointSectors[4];
      walker.points[0].x += mx;
      walker.points[1].x += mx;
      walker.points[2].x += mx;
      walker.points[3].x += mx;
      walker.points[4].x += mx;
      walker.points[0].y = pointElevations[0];
      walker.points[1].y = pointElevations[1];
      walker.points[2].y = pointElevations[2];
      walker.points[3].y = pointElevations[3];
      walker.points[4].y = pointElevations[4];
      walker.points[0].z += mz;
      walker.points[1].z += mz;
      walker.points[2].z += mz;
      walker.points[3].z += mz;
      walker.points[4].z += mz;
    }

    return [mx, my, mz];
  }

  /**
   * Delete all walkers.
   */
  clearWalkers(): void {
    this.walkers = [];
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

  $utilsCreatePoint(x: number, z: number): WalkerPoint {
    const loc = this.$utilsFindLocationInfo(x, z);
    return {
      sectorIndex: loc.sectorIndex,
      x: x,
      y: loc.elev,
      z: z
    };
  }
}

export { Gfx3JWM };