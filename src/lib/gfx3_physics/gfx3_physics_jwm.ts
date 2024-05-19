import { gfx3DebugRenderer } from '../gfx3/gfx3_debug_renderer';
import { UT } from '../core/utils';
import { Gfx2BoundingRect } from '../gfx2/gfx2_bounding_rect';
import { Gfx2TreePartition } from '../gfx2/gfx2_tree_partition';

class Sector extends Gfx2BoundingRect {
  index: number;
  v1: vec3;
  v2: vec3;
  v3: vec3;

  constructor(index: number, a: vec3, b: vec3, c: vec3) {
    super();
    this.index = index;
    this.v1 = a;
    this.v2 = b;
    this.v3 = c;
    super.fromVertices([this.v1[0], this.v1[2], this.v2[0], this.v2[2], this.v3[0], this.v3[2]]);
  }
}

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
  boundingRect: Gfx2BoundingRect;
  sectors: Array<Sector>;
  sectorColors: Array<vec3>;
  neighborPool: Array<Neighbor>;
  sharedPool: Array<Shared>;
  btree: Gfx2TreePartition;
  points: Map<string, Point>;
  walkers: Map<string, Walker>;
  debugVertices: Array<number>;
  debugVertexCount: number;

  constructor() {
    this.boundingRect = new Gfx2BoundingRect();
    this.sectors = [];
    this.sectorColors = [];
    this.neighborPool = [];
    this.sharedPool = [];
    this.btree = new Gfx2TreePartition(0, 0);
    this.points = new Map<string, Point>();
    this.walkers = new Map<string, Walker>();
    this.debugVertices = [];
    this.debugVertexCount = 0;
  }

  /**
   * Load asynchronously walkmesh data from a json file (jwm).
   * 
   * @param {string} path - The file path.
   * @param {number} bspMaxChildren - The maximum of children per bsp node.
   * @param {number} bspMaxDepth - The maximum depth for bsp tree.
   */
  async loadFromFile(path: string, bspMaxChildren: number = 20, bspMaxDepth: number = 10): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'JWM') {
      throw new Error('GfxJWM::loadFromFile(): File not valid !');
    }

    this.boundingRect = new Gfx2BoundingRect(json['Min'], json['Max']);
    this.btree = new Gfx2TreePartition(bspMaxChildren, bspMaxDepth, this.boundingRect);

    this.sectors = [];
    for (let i = 0; i < json['NumSectors']; i++) {
      const obj = json['Sectors'][i];
      const sector = new Sector(i, obj[0], obj[1], obj[2]);
      this.btree.addChild(sector);
      this.sectors.push(sector);
    }

    this.sectorColors = [];
    for (let i = 0; i < json['NumSectorColors']; i++) {
      const obj = json['SectorColors'][i];
      this.sectorColors.push([
        (obj[0][0] == obj[1][0] && obj[0][0] == obj[2][0]) ? obj[0][0] : 0,
        (obj[0][1] == obj[1][1] && obj[0][1] == obj[2][1]) ? obj[0][1] : 0,
        (obj[0][2] == obj[1][2] && obj[0][2] == obj[2][2]) ? obj[0][2] : 0
      ]);
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
   * Load asynchronously walkmesh data from a binary file (bwm).
   * 
   * @param {string} path - The file path.
   * @param {number} bspMaxChildren - The maximum of children per bsp node.
   * @param {number} bspMaxDepth - The maximum depth for bsp tree.
   */
  async loadFromBinaryFile(path: string, bspMaxChildren: number = 20, bspMaxDepth: number = 10): Promise<void> {
    const response = await fetch(path);
    const buffer = await response.arrayBuffer();
    const data = new Float32Array(buffer);
    let offset = 0;

    const numSectors = data[0];
    const numSectorColors = data[1];
    offset += 2;

    const minX = data[offset + 0];
    const minZ = data[offset + 1];
    const maxX = data[offset + 2];
    const maxZ = data[offset + 3];
    offset += 4;

    this.boundingRect = new Gfx2BoundingRect([minX, minZ], [maxX, maxZ]);
    this.btree = new Gfx2TreePartition(bspMaxChildren, bspMaxDepth, this.boundingRect);

    this.sectors = [];
    for (let i = 0; i < numSectors; i++) {
      const v0: vec3 = [data[offset + (i * 9) + 0], data[offset + (i * 9) + 1], data[offset + (i * 9) + 2]];
      const v1: vec3 = [data[offset + (i * 9) + 3], data[offset + (i * 9) + 4], data[offset + (i * 9) + 5]];
      const v2: vec3 = [data[offset + (i * 9) + 6], data[offset + (i * 9) + 7], data[offset + (i * 9) + 8]];
      const sector = new Sector(i, v0, v1, v2);
      this.btree.addChild(sector);
      this.sectors.push(sector);
    }

    offset += numSectors * 9;

    this.sectorColors = [];
    for (let i = 0; i < numSectorColors; i++) {
      const c0: vec3 = [data[offset + (i * 9) + 0], data[offset + (i * 9) + 1], data[offset + (i * 9) + 2]];
      const c1: vec3 = [data[offset + (i * 9) + 3], data[offset + (i * 9) + 4], data[offset + (i * 9) + 5]];
      const c2: vec3 = [data[offset + (i * 9) + 6], data[offset + (i * 9) + 7], data[offset + (i * 9) + 8]];
      this.sectorColors.push([
        (c0[0] == c1[0] && c0[0] == c2[0]) ? c0[0] : 0,
        (c0[1] == c1[1] && c0[1] == c2[1]) ? c0[1] : 0,
        (c0[2] == c1[2] && c0[2] == c2[2]) ? c0[2] : 0
      ]);
    }

    offset += numSectorColors * 9;

    this.neighborPool = [];
    for (let i = 0; i < numSectors; i++) {
      this.neighborPool.push({
        s1: data[offset + (i * 3) + 0],
        s2: data[offset + (i * 3) + 1],
        s3: data[offset + (i * 3) + 2]
      });
    }

    offset += numSectors * 3;

    this.sharedPool = [];
    for (let i = 0; i < numSectors; i++) {
      const size = data[offset];
      const indexes = [];
      offset += 1;
      for (let j = 0; j < size; j++) indexes.push(data[offset++]);
      this.sharedPool.push({ sectorIds:  indexes });
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
    gfx3DebugRenderer.drawVertices(this.debugVertices, this.debugVertexCount, UT.MAT4_IDENTITY());

    for (const point of this.points.values()) {
      gfx3DebugRenderer.drawSphere(UT.MAT4_TRANSLATE(point.x, point.y, point.z), 0.01, 2);
    }
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
   * Return sector color.
   * 
   * @param {number} sectorIndex - The sector index.
   */
  getSectorColor(sectorIndex: number): vec3 {
    return this.sectorColors[sectorIndex];
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
    const sectors = this.btree.search(new Gfx2BoundingRect(
      [x - 1, z - 1],
      [x + 1, z + 1]
    )) as Array<Sector>;

    for (const sector of sectors) {
      const a = sector.v1;
      const b = sector.v2;
      const c = sector.v3;
      if (UT.TRI2_POINT_INSIDE([x, z], [a[0], a[2]], [b[0], b[2]], [c[0], c[2]]) == 1) {
        return { sectorIndex: sector.index, elev: UT.TRI3_POINT_ELEVATION([x, z], a, b, c) };
      }
    }

    return { sectorIndex: -1, elev: Infinity };
  }
}

export { Gfx3PhysicsJWM };