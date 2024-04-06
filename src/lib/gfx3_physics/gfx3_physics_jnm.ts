import { gfx3DebugRenderer } from '../gfx3/gfx3_debug_renderer';
import { UT } from '../core/utils';
import { Gfx3BoundingBox } from '../gfx3/gfx3_bounding_box';
import { Gfx3TreePartition } from '../gfx3/gfx3_tree_partition';

const MOVE_MAX_RECURSIVE_CALL = 2;

interface ResBox {
  move: vec3;
  collideFloor: boolean;
  collideWall: boolean;
  fragIndex: number
};

interface ResSensorY {
  move: number;
  fragIndex: number
};

interface ResRaycast {
  hit: vec3;
  distance: number;
  fragIndex: number;
};

class Frag extends Gfx3BoundingBox {
  index: number;
  a: vec3;
  b: vec3;
  c: vec3;
  n: vec3;
  t: vec3;

  constructor(index: number, a: vec3, b: vec3, c: vec3) {
    super();
    this.index = index;
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
  fragsData: Array<any>;
  boundingBox: Gfx3BoundingBox;
  debugEnabled: boolean;
  debugVertices: Array<number>;
  debugVertexCount: number;

  constructor() {
    this.btree = new Gfx3TreePartition(20, 10);
    this.frags = [];
    this.fragsData = [];
    this.boundingBox = new Gfx3BoundingBox();
    this.debugEnabled = true;
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

    this.boundingBox = new Gfx3BoundingBox(json['Min'], json['Max']);
    this.btree = new Gfx3TreePartition(20, 3, this.boundingBox);
    this.frags = [];

    for (let i = 0; i < json['Frags'].length; i++) {
      const obj = json['Frags'][i];
      const frag = new Frag(i, obj[0], obj[1], obj[2]);
      this.btree.addChild(frag);
      this.frags.push(frag);
    }

    this.fragsData = [];
    for (const obj of json['FragsData']) {
      const fragIndex = obj['FragIndex'];
      this.fragsData[fragIndex] = obj;
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

    for (const frag of this.frags) {
      this.debugVertices.push(frag.a[0], frag.a[1], frag.a[2], 1, 1, 1);
      this.debugVertices.push(frag.b[0], frag.b[1], frag.b[2], 1, 1, 1);
      this.debugVertices.push(frag.a[0], frag.a[1], frag.a[2], 1, 1, 1);
      this.debugVertices.push(frag.c[0], frag.c[1], frag.c[2], 1, 1, 1);
      this.debugVertices.push(frag.b[0], frag.b[1], frag.b[2], 1, 1, 1);
      this.debugVertices.push(frag.c[0], frag.c[1], frag.c[2], 1, 1, 1);
      this.debugVertexCount += 6;
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
   * Returns a new move with smooth sliding along wall for the given point (plan xz).
   * Note: Utility used to handle collisions manually for full flexibility.
   * 
   * @param {vec3} position - The sensor position.
   * @param {number} mx - The movement in x-axis.
   * @param {number} mz - The movement in z-axis.
   * @param {number} radius - The radius of sensor area.
   * @param {number} height - The height of sensor area.
   */
  sensorXZ(position: vec3, mx: number, mz: number, radius: number, height: number): vec2 {
    const walls = this.btree.search(new Gfx3BoundingBox(
      [position[0] - radius, position[1] - height * 0.5, position[2] - radius],
      [position[0] + radius, position[1] + height * 0.5, position[2] + radius]
    )) as Array<Frag>;

    return this.$moveXZ(walls, position, [mx, mz]);
  }

  /**
   * Returns a new y-move to fix sensor on the floor.
   * Note: Utility used to handle collisions manually for full flexibility.
   * 
   * @param {vec3} position - The sensor position.
   * @param {number} mx - The movement in x-axis.
   * @param {number} mz - The movement in z-axis.
   * @param {number} radius - The radius of sensor area.
   * @param {number} height - The height of sensor area.
   */
  sensorY(position: vec3, mx: number, mz: number, radius: number, height: number): ResSensorY {
    const floors = this.btree.search(new Gfx3BoundingBox(
      [position[0] - radius, position[1] - height * 0.5, position[2] - radius],
      [position[0] + radius, position[1] + height * 0.5, position[2] + radius]
    )) as Array<Frag>;

    const elevation = this.$getElevation(floors, [position[0] + mx, position[1] + height * 0.5, position[2] + mz]);

    return {
      move: elevation ? elevation.value - position[1] : 0,
      fragIndex: elevation ? elevation.fragIndex : -1
    };
  }

  /**
   * Returns a new move with smooth sliding along wall and floor for the given box.
   * Infos are composed to a move vector, a wall collide flag and floor collide flag.
   * 
   * @param {vec3} position - The center of the box.
   * @param {number} mx - The movement in the x-axis.
   * @param {number} my - The movement in the y-axis.
   * @param {number} mz - The movement in the z-axis.
   * @param {number} radius - The radius of the box.
   * @param {number} height - The height of the box.
   * @param {number} lift - The lift is used to elevate the virtual bounding box to let passing over little step or micro obstacles on the floor.
   */
  box(position: vec3, mx: number, my: number, mz: number, radius: number, height: number, lift: number = 0.2): ResBox {
    const min = [position[0] - radius, position[1] - height * 0.5, position[2] - radius];
    const max = [position[0] + radius, position[1] + height * 0.5, position[2] + radius];

    min[1] += lift;

    const wallIntersectedFrags = this.btree.search(new Gfx3BoundingBox(
      [min[0] + mx, min[1] + my, min[2] + mz],
      [max[0] + mx, max[1] + my, max[2] + mz]
    )) as Array<Frag>;

    let fmx = mx;
    let fmy = my;
    let fmz = mz;
    let deviantPoints = [];
    let collideFloor = false;
    let collideWall = false;
    let i = 0;

    const points: Array<vec3> = [
      [min[0], min[1], max[2]],
      [min[0], min[1], min[2]],
      [max[0], min[1], min[2]],
      [max[0], min[1], max[2]]
    ];

    while (i < points.length) {
      if (deviantPoints[i]) {
        i++;
        continue;
      }

      const moveXZ = GET_FINAL_MOVE_XZ(wallIntersectedFrags, points[i], [fmx, fmz]);
      if (moveXZ[0] == 0 && moveXZ[1] == 0) {
        fmx = 0;
        fmz = 0;
        collideWall = true;
        break;
      }
      else if (moveXZ[0] != fmx || moveXZ[1] != fmz) {
        fmx = moveXZ[0];
        fmz = moveXZ[1];
        collideWall = true;
        deviantPoints[i] = true;
        i = 0;
        continue;
      }

      i++;
    }

    min[1] -= lift;

    const centerX = (min[0] + max[0]) * 0.5;
    const centerZ = (min[2] + max[2]) * 0.5;
    
    const floorIntersectedFrags = this.btree.search(new Gfx3BoundingBox(
      [centerX + fmx, min[1] + my, centerZ + fmz],
      [centerX + fmx, max[1] + my, centerZ + fmz]
    )) as Array<Frag>;

    const elevation = GET_ELEVATION(floorIntersectedFrags, [centerX + fmx, max[1], centerZ + fmz]);
    if (elevation != Infinity) {
      collideFloor = true;
      fmy = elevation - min[1];
    }

    return {
      move: [fmx, fmy, fmz],
      collideWall: collideWall,
      collideFloor: collideFloor,
      // fragIndex: elevation ? elevation.fragIndex : -1
      fragIndex: -1
    };
  }

  move(position: vec3, move: vec3, radius: number, height: number, lift: number = 0.2): ResBox {
    const aabb = Gfx3BoundingBox.createFromCenter(position[0], position[1], position[2], radius * 2, height, radius * 2);

    let fmx = move[0];
    let fmy = move[1];
    let fmz = move[2];
    let collideWall = false;
    let collideFloor = false;
    aabb.min[1] += lift;

    const wallIntersectedFrags = this.btree.search(new Gfx3BoundingBox(
      [aabb.min[0] + move[0], aabb.min[1] + move[1], aabb.min[2] + move[2]],
      [aabb.max[0] + move[0], aabb.max[1] + move[1], aabb.max[2] + move[2]]
    )) as Array<Frag>;

    const points: Array<vec3> = [
      [aabb.min[0], aabb.min[1], aabb.max[2]],
      [aabb.min[0], aabb.min[1], aabb.min[2]],
      [aabb.max[0], aabb.min[1], aabb.min[2]],
      [aabb.max[0], aabb.min[1], aabb.max[2]]
    ];

    let deviatedPoints: Array<boolean> = [];
    let i = 0;

    while (i < points.length) {
      if (deviatedPoints[i]) {
        i++;
        continue;
      }

      const moveXZ = GET_FINAL_MOVE_XZ(wallIntersectedFrags, points[i], [fmx, fmz]);
      if (moveXZ[0] == 0 && moveXZ[1] == 0) {
        fmx = 0;
        fmz = 0;
        collideWall = true;
        break;
      }
      else if (moveXZ[0] != fmx || moveXZ[1] != fmz) {
        fmx = moveXZ[0];
        fmz = moveXZ[1];
        collideWall = true;
        deviatedPoints[i] = true;
        i = 0;
        continue;
      }

      i++;
    }

    aabb.min[1] -= lift;

    const center = aabb.getCenter();
    const floorIntersectedFrags = this.btree.search(new Gfx3BoundingBox(
      [center[0] + fmx, aabb.min[1] + fmy, center[2] + fmz],
      [center[0] + fmx, aabb.max[1] + fmy, center[2] + fmz]
    )) as Array<Frag>;

    const footElevation = aabb.min[1];
    const elevation = GET_ELEVATION(floorIntersectedFrags, [center[0] + fmx, aabb.max[1], center[2] + fmz]);
    if (elevation != Infinity) {
      collideFloor = true;
      fmy = elevation - footElevation;
    }

    return {
      move: [fmx, fmy, fmz],
      collideWall: collideWall,
      collideFloor: collideFloor,
      // fragIndex: elevation ? elevation.fragIndex : -1
      fragIndex: -1
    };
  }

  /**
   * Returns the ray hit point or null if no hit occured.
   * 
   * @param {vec3} origin - The ray origin.
   * @param {vec3} dir - The ray direction.
   * @param {number} radius - The radius of ray area.
   * @param {number} height - The height of ray area.
   */
  raycast(origin: vec3, dir: vec3, radius: number, height: number): ResRaycast | null {
    const frags = this.btree.search(new Gfx3BoundingBox(
      [origin[0] - radius, origin[1] - height * 0.5, origin[2] - radius],
      [origin[0] + radius, origin[1] + height * 0.5, origin[2] + radius]
    )) as Array<Frag>;

    let minFrag = null;
    let minFragLength = Infinity;
    let outIntersectPoint: vec3 = [0, 0, 0];

    for (const frag of frags) {
      if (UT.RAY_TRIANGLE(origin, dir, frag.a, frag.b, frag.c, true, outIntersectPoint)) {
        const pen = UT.VEC3_SUBSTRACT(outIntersectPoint, origin);
        const penLength = UT.VEC3_LENGTH(pen);
        if (penLength < minFragLength) {
          minFragLength = penLength;
          minFrag = frag;
        }
      }
    }

    return minFrag ? { hit: outIntersectPoint, distance: minFragLength, fragIndex: minFrag.index } : null;
  }

  /**
   * Returns the btree.
   */
  getBinaryTree(): Gfx3TreePartition {
    return this.btree;
  }

  /**
   * Return frag data.
   * 
   * @param {number} fragIndex - The frag index.
   */
  getSectorData(fragIndex: number): any {
    return this.fragsData[fragIndex];
  }

  $moveXZ(frags: Array<Frag>, point: vec3, move: vec2, i: number = 0): vec2 {
    let minFrag = null;
    let minFragLength = Infinity;
    let outIntersect: vec3 = [0, 0, 0];

    if (i > MOVE_MAX_RECURSIVE_CALL) {
      return [0, 0];
    }

    for (const frag of frags) {
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
      const newMove = UT.VEC2_PROJECTION_COS([move[0], move[1]], [minFrag.t[0], minFrag.t[2]]);
      return this.$moveXZ(frags, point, newMove, i + 1);
    }

    return move;
  }

  $getElevation(frags: Array<Frag>, point: vec3): { value: number, fragIndex: number } | null {
    let minFrag = null;
    let minFragLength = Infinity;
    let outIntersectPoint: vec3 = [0, 0, 0];

    for (const frag of frags) {
      if (UT.RAY_TRIANGLE(point, [0, -1, 0], frag.a, frag.b, frag.c, true, outIntersectPoint)) {
        return { value: outIntersectPoint[1], fragIndex: frag.index };  
      }
    }

    return null;  
  }
}

export { Gfx3PhysicsJNM };




// $getElevation(frags: Array<Frag>, point: vec3): { value: number, fragIndex: number } | null {
//   let minFrag = null;
//   let minFragLength = Infinity;
//   let outIntersectPoint: vec3 = [0, 0, 0];

//   for (const frag of frags) {
//     if (UT.RAY_TRIANGLE(point, [0, -1, 0], frag.a, frag.b, frag.c, true, outIntersectPoint)) {
//       const pen = UT.VEC3_SUBSTRACT(outIntersectPoint, point);
//       const penLength = UT.VEC3_LENGTH(pen);
//       if (penLength < minFragLength) {
//         minFragLength = penLength;
//         minFrag = frag;
//       }
//     }
//   }

//   return minFrag ? { value: outIntersectPoint[1], fragIndex: minFrag.index } : null;  
// }



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
  const newMove = UT.VEC2_PROJECTION_COS([move[0], move[1]], [frag.t[0], frag.t[2]]);
  return newMove;
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