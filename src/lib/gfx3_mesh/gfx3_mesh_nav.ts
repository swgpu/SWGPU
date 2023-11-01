import { UT } from '../core/utils';
import { Gfx3BoundingBox } from '../gfx3/gfx3_bounding_box';
import { Gfx3TreePartition } from '../gfx3/gfx3_tree_partition';
import { Gfx3Mesh } from './gfx3_mesh';
import { SHADER_VERTEX_ATTR_COUNT } from './gfx3_mesh_shader';

const MOVE_MAX_RECURSIVE_CALL = 2;

interface NavInfo {
  move: vec3,
  collideFloor: boolean,
  collideWall: boolean,
};

class Frag extends Gfx3BoundingBox {
  a: vec3;
  b: vec3;
  c: vec3;
  n: vec3;
  t: vec3;

  constructor(vertices: Array<number>, i: number) {
    super();
    this.a = [0, 0, 0];
    this.b = [0, 0, 0];
    this.c = [0, 0, 0];
    this.n = [0, 0, 0];
    this.t = [0, 0, 0];

    this.a[0] = vertices[(i + 0) * SHADER_VERTEX_ATTR_COUNT + 0];
    this.a[1] = vertices[(i + 0) * SHADER_VERTEX_ATTR_COUNT + 1];
    this.a[2] = vertices[(i + 0) * SHADER_VERTEX_ATTR_COUNT + 2];

    this.b[0] = vertices[(i + 1) * SHADER_VERTEX_ATTR_COUNT + 0];
    this.b[1] = vertices[(i + 1) * SHADER_VERTEX_ATTR_COUNT + 1];
    this.b[2] = vertices[(i + 1) * SHADER_VERTEX_ATTR_COUNT + 2];

    this.c[0] = vertices[(i + 2) * SHADER_VERTEX_ATTR_COUNT + 0];
    this.c[1] = vertices[(i + 2) * SHADER_VERTEX_ATTR_COUNT + 1];
    this.c[2] = vertices[(i + 2) * SHADER_VERTEX_ATTR_COUNT + 2];

    this.n = UT.TRI3_NORMAL(this.a, this.b, this.c);
    this.t = UT.VEC3_CROSS([0, 1, 0], this.n);
    super.fromVertices([...this.a, ...this.b, ...this.c], 3);
  }
}

/**
 * The `Gfx3MeshNav` class is responsible for controlling the navigation and collisions in a static mesh.
 * In collision case, the collision response sliding along the polygon of the map to keep a good
 * feeling for the player.
 */
class Gfx3MeshNav {
  btree: Gfx3TreePartition;
  frags: Array<Frag>;
  lift: number;

  /**
   * The constructor.
   */
  constructor() {
    this.btree = new Gfx3TreePartition(20, 10);
    this.frags = [];
    this.lift = 0.2;
  }

  /**
   * The "loadFromJSM" function creates a binary tree partition based on the vertices of a given mesh.
   * @param {Gfx3MeshJSM} jsm - The static mesh in a specific format (JSM).
   */
  loadFromJSM(mesh: Gfx3Mesh): void {
    this.btree = new Gfx3TreePartition(20, 10, mesh.getBoundingBox());
    this.frags = [];

    for (let i = 0; i < mesh.getVertexCount(); i += 3) {
      const frag = new Frag(mesh.getVertices(), i);
      this.btree.addChild(frag);
      this.frags.push(frag);
    }
  }

  /**
   * The "move" function calculates the movement of an object in a 3D space, taking into account
   * collisions with walls and floors.
   * @param {vec3} center - The `center` parameter is a 3D vector representing the center point of the
   * object or entity that is being moved.
   * @param {vec3} size - The `size` parameter represents the dimensions of the object's bounding box. It
   * is a `vec3` vector that contains the width, height, and depth of the object.
   * @param {vec3} move - The `move` parameter is a 3D vector that represents the desired movement of an
   * object. It specifies how much the object should move along the x, y, and z axes.
   * @returns The NavInfo object.
   * It contains the response collision move, a boolean to check wall collide and a boolean to check floor collide.
   */
  move(center: vec3, size: vec3, move: vec3): NavInfo {
    const aabb = Gfx3BoundingBox.createFromCenter(center[0], center[1], center[2], size[0], size[1], size[2]);
    const res: NavInfo = {
      move: [move[0], move[1], move[2]],
      collideFloor: false,
      collideWall: false
    };

    aabb.min[1] += this.lift;
    const wallIntersectedFrags = this.frags.filter(frag => frag.intersectBoundingBox(new Gfx3BoundingBox(
      [aabb.min[0] + move[0], aabb.min[1] + move[1], aabb.min[2] + move[2]],
      [aabb.max[0] + move[0], aabb.max[1] + move[1], aabb.max[2] + move[2]]
    )));

    const points: Array<vec3> = [
      [aabb.min[0], aabb.min[1] + this.lift, aabb.max[2]],
      [aabb.min[0], aabb.min[1] + this.lift, aabb.min[2]],
      [aabb.max[0], aabb.min[1] + this.lift, aabb.min[2]],
      [aabb.max[0], aabb.min[1] + this.lift, aabb.max[2]]
    ];

    let deviatedPoints: Array<boolean> = [];
    let i = 0;

    while (i < points.length) {
      if (deviatedPoints[i]) {
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
        deviatedPoints[i] = true;
        i = 0;
        continue;
      }

      i++;
    }

    aabb.min[1] -= this.lift;
    const floorIntersectedFrags = this.frags.filter(frag => frag.intersectBoundingBox(new Gfx3BoundingBox(
      [center[0] + res.move[0], aabb.min[1] + res.move[1], center[2] + res.move[2]],
      [center[0] + res.move[0], aabb.max[1] + res.move[1], center[2] + res.move[2]]
    )));

    const footElevation = aabb.min[1];
    const elevation = GET_ELEVATION(floorIntersectedFrags, [center[0] + res.move[0], center[1], center[2] + res.move[2]]);
    const delta = Math.abs(footElevation - elevation);
    if (delta < 0.1 && elevation != Infinity) {
      res.collideFloor = true;
      res.move[1] = elevation - footElevation;
    }

    return res;
  }

  /**
   * The "setLift" function sets the value of the "lift" property.
   * @param {number} lift - The lift is used to elevate the virtual bounding box to let
   * passing over little step or micro obstacles on the floor.
   */
  setLift(lift: number): void {
    this.lift = lift;
  }

  /**
   * The "getLift" function returns the value of the "lift" property.
   * @returns The lift property.
   */
  getLift(): number {
    return this.lift;
  }
}

export { Gfx3MeshNav };

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