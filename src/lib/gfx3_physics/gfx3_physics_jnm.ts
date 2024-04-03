import { gfx3DebugRenderer } from '../gfx3/gfx3_debug_renderer';
import { UT } from '../core/utils';
import { Gfx3BoundingBox } from '../gfx3/gfx3_bounding_box';
import { Gfx3TreePartition } from '../gfx3/gfx3_tree_partition';

const MOVE_MAX_RECURSIVE_CALL = 2;

interface NavInfo {
  move: vec3;
  collideFloor: boolean;
  collideWall: boolean;
};

interface Walker {
  id: string;
  points: Array<vec3>;
};

class Frag extends Gfx3BoundingBox {
  a: vec3;
  b: vec3;
  c: vec3;
  n: vec3;
  t: vec3;

  constructor(a: vec3, b: vec3, c: vec3) {
    super();
    this.a = a;
    this.b = b;
    this.c = c;
    this.n = UT.TRI3_NORMAL(this.a, this.b, this.c);
    this.t = UT.VEC3_CROSS([0, 1, 0], this.n);
    super.fromVertices([...this.a, ...this.b, ...this.c], 3);
  }
}

/**
 * A 3D navigation mesh.
 * In collision case, the collision response sliding along wall polygons to keep a good feeling for the player.
 */
class Gfx3PhysicsJNM {
  btree: Gfx3TreePartition;
  frags: Array<Frag>;
  walkers: Array<Walker>;
  boundingBox: Gfx3BoundingBox;
  debugVertices: Array<number>;
  debugVertexCount: number;

  constructor() {
    this.btree = new Gfx3TreePartition(20, 10);
    this.frags = [];
    this.walkers = [];
    this.boundingBox = new Gfx3BoundingBox();
    this.debugVertices = [];
    this.debugVertexCount = 0;
  }

  /**
   * Load asynchronously navmesh data from a json file (jnm).
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'JNM') {
      throw new Error('GfxJNM::loadFromFile(): File not valid !');
    }

    this.boundingBox = new Gfx3BoundingBox(json['BoundingBox']['Min'], json['BoundingBox']['Max']);
    this.btree = new Gfx3TreePartition(20, 3, this.boundingBox);

    for (let i = 0; i < json['NumVertices']; i += 3) {
      const a: vec3 = [
        json['Vertices'][(i + 0) * 3 + 0],
        json['Vertices'][(i + 0) * 3 + 1],
        json['Vertices'][(i + 0) * 3 + 2]
      ];  

      const b: vec3 = [
        json['Vertices'][(i + 1) * 3 + 0],
        json['Vertices'][(i + 1) * 3 + 1],
        json['Vertices'][(i + 1) * 3 + 2]
      ];

      const c: vec3 = [
        json['Vertices'][(i + 2) * 3 + 0],
        json['Vertices'][(i + 2) * 3 + 1],
        json['Vertices'][(i + 2) * 3 + 2]  
      ];
  
      const frag = new Frag(a, b, c);
      this.btree.addChild(frag);
      this.frags.push(frag);
    }
  }

  /**
   * The update function.
   */
  update(): void {
    this.debugVertices = [];
    this.debugVertexCount = 0;

    for (const frag of this.frags) {
      this.debugVertices.push(frag.a[0], frag.a[1], frag.a[2], 1, 1, 1);
      this.debugVertices.push(frag.b[0], frag.b[1], frag.b[2], 1, 1, 1);
      this.debugVertices.push(frag.a[0], frag.a[1], frag.a[2], 1, 1, 1);
      this.debugVertices.push(frag.c[0], frag.c[1], frag.c[2], 1, 1, 1);
      this.debugVertices.push(frag.b[0], frag.b[1], frag.b[2], 1, 1, 1);
      this.debugVertices.push(frag.c[0], frag.c[1], frag.c[2], 1, 1, 1);
      this.debugVertexCount += 6;
    }

    // for (const walker of this.walkers) {
    //   this.debugVertices.push(walker.points[1][0], walker.points[1][1], walker.points[1][2], 1, 1, 1);
    //   this.debugVertices.push(walker.points[2][0], walker.points[2][1], walker.points[2][2], 1, 1, 1);
    //   this.debugVertices.push(walker.points[2][0], walker.points[2][1], walker.points[2][2], 1, 1, 1);
    //   this.debugVertices.push(walker.points[3][0], walker.points[3][1], walker.points[3][2], 1, 1, 1);
    //   this.debugVertices.push(walker.points[3][0], walker.points[3][1], walker.points[3][2], 1, 1, 1);
    //   this.debugVertices.push(walker.points[4][0], walker.points[4][1], walker.points[4][2], 1, 1, 1);
    //   this.debugVertices.push(walker.points[4][0], walker.points[4][1], walker.points[4][2], 1, 1, 1);
    //   this.debugVertices.push(walker.points[1][0], walker.points[1][1], walker.points[1][2], 1, 1, 1);
    //   this.debugVertexCount += 8;
    // }
  }

  /**
   * The draw function.
   */
  draw(): void {
    gfx3DebugRenderer.drawVertices(this.debugVertices, this.debugVertexCount, UT.MAT4_IDENTITY());
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
      throw new Error('Gfx3PhysicsJNM::addWalker: walker with id ' + id + ' already exist.');
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
   * Move the virtual box and returns response collision infos.
   * Infos are composed to a move vector, a wall collide flag and floor collide flag.
   * @param {vec3} center - The center of the virtual box.
   * @param {number} radius - The size of the virtual box.
   * @param {vec3} move - The movement.
   * @param {number} lift - The lift is used to elevate the virtual bounding box to let passing over little step or micro obstacles on the floor.
   */
  move(aabb: Gfx3BoundingBox, move: vec3, lift: number = 0.2): NavInfo {
    const res: NavInfo = {
      move: [move[0], move[1], move[2]],
      collideFloor: false,
      collideWall: false
    };

    aabb.min[1] += lift;

    const wallIntersectedFrags = this.btree.search(new Gfx3BoundingBox(
      [aabb.min[0] + move[0], aabb.min[1] + move[1], aabb.min[2] + move[2]],
      [aabb.max[0] + move[0], aabb.max[1] + move[1], aabb.max[2] + move[2]]
    )) as Array<Frag>;

    const points: Array<vec3> = [
      [aabb.min[0], aabb.min[1] + lift, aabb.max[2]],
      [aabb.min[0], aabb.min[1] + lift, aabb.min[2]],
      [aabb.max[0], aabb.min[1] + lift, aabb.min[2]],
      [aabb.max[0], aabb.min[1] + lift, aabb.max[2]]
    ];

    let deviantPoints: Array<boolean> = [];
    let i = 0;

    while (i < points.length) {
      if (deviantPoints[i]) {
        i++;
        continue;
      }

      const moveXZ = GET_FINAL_MOVE_XZ(wallIntersectedFrags, points[i], [res.move[0], res.move[2]]);
      if (moveXZ[0] == 0 && moveXZ[1] == 0) {
        res.move[0] = 0;
        res.move[2] = 0;
        res.collideWall = true;
        break;
      }
      else if (moveXZ[0] != res.move[0] || moveXZ[1] != res.move[2]) {
        res.move[0] = moveXZ[0];
        res.move[2] = moveXZ[1];
        res.collideWall = true;
        deviantPoints[i] = true;
        i = 0;
        continue;
      }

      i++;
    }

    aabb.min[1] -= lift;

    const center = aabb.getCenter();
    const floorIntersectedFrags = this.btree.search(new Gfx3BoundingBox(
      [center[0] + res.move[0], aabb.min[1] + res.move[1], center[2] + res.move[2]],
      [center[0] + res.move[0], aabb.max[1] + res.move[1], center[2] + res.move[2]]
    )) as Array<Frag>;

    const elevation = GET_ELEVATION(floorIntersectedFrags, [center[0] + res.move[0], aabb.max[1], center[2] + res.move[2]]);
    if (elevation != Infinity) {
      res.collideFloor = true;
      res.move[1] = elevation - aabb.min[1];
    }

    return res;
  }

  /**
   * Returns the btree.
   */
  getBinaryTree(): Gfx3TreePartition {
    return this.btree;
  }

  /**
   * Returns the ray hit point or null if no hit occured.
   * 
   * @param {vec3} origin - The ray origin.
   * @param {vec3} dir - The ray direction.
   * @param {Gfx3BoundingBox} area - The ray area.
   */
  raycast(origin: vec3, dir: vec3, area: Gfx3BoundingBox): vec3 | null {
    const frags = this.btree.search(area) as Array<Frag>;
    let outIntersectPoint: vec3 = [0, 0, 0];

    for (const frag of frags) {
      if (UT.RAY_TRIANGLE(origin, dir, frag.a, frag.b, frag.c, true, outIntersectPoint)) {
        return outIntersectPoint;
      }
    }

    return null;
  }
}

export { Gfx3PhysicsJNM };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function GET_FINAL_MOVE_XZ(frags: Array<Frag>, point: vec3, move: vec2, i: number = 0): vec2 {
  let minFrag = null;
  let minFragLength = Infinity;

  if (i > MOVE_MAX_RECURSIVE_CALL) {
    return [0, 0];
  }

  for (const frag of frags) {
    const outIntersect: vec3 = [0, 0, 0];
    if (UT.RAY_PLAN(point, [move[0], 0, move[1]], frag.a, frag.n, true, outIntersect)) {
      const pen = UT.VEC3_SUBSTRACT(outIntersect, point);
      const penLength = UT.VEC3_LENGTH(pen);
      if (penLength <= UT.VEC2_LENGTH(move) + 0.001 && penLength < minFragLength) {
        minFragLength = penLength;
        minFrag = frag;
      }
    }
  }

  if (minFrag) {
    const newMove = GET_MOVE_PROJECTION(minFrag, move);
    return GET_FINAL_MOVE_XZ(frags, point, newMove, i + 1);
  }

  return move;
}

function GET_MOVE_PROJECTION(frag: Frag, move: vec2): vec2 {
  return UT.VEC2_PROJECTION_COS([move[0], move[1]], [frag.t[0], frag.t[2]]);
}

function GET_ELEVATION(frags: Array<Frag>, point: vec3): number {
  for (const frag of frags) {
    const outIntersect: vec3 = [0, 0, 0];
    if (UT.RAY_TRIANGLE(point, [0, -1, 0], frag.a, frag.b, frag.c, true, outIntersect)) {
      return outIntersect[1];
    }
  }

  return Infinity;
}