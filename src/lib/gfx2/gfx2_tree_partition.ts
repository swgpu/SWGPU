import { TreePartition, TreePartitionNode, ITreePartitionMethod, SplitResult } from '../core/tree_partition';
import { Gfx2BoundingRect } from './gfx2_bounding_rect';

/**
 * The `Gfx2TreePartition` class implements a binary tree space partition in 2D graphics system.
 */
class Gfx2TreePartition extends TreePartition<Gfx2BoundingRect> {
  /**
   * The constructor.
   * @param {number} maxChildren - The `maxChildren` parameter specifies the maximum number of children
   * that a node in the tree can have before it needs to be split into multiple nodes.
   * @param {number} maxDepth - The `maxDepth` parameter specifies the maximum depth of the tree. It
   * determines how many levels the tree can have.
   * @param {Gfx2BoundingRect} rect - The top bounding rectangle of the tree partition space.
   */
  constructor(maxChildren: number, maxDepth: number, rect: Gfx2BoundingRect = new Gfx2BoundingRect([0, 0], [0, 0])) {
    super(maxChildren, maxDepth, new Gfx2TreePartitionMethod(rect, 'x'));
  }
}

/**
 * The `Gfx2TreePartitionMethod` class implements a binary tree space partition method for quick search intersections
 * in a 2D graphics system.
 */
class Gfx2TreePartitionMethod implements ITreePartitionMethod<Gfx2BoundingRect> {
  rect: Gfx2BoundingRect;
  axis: 'x' | 'y';

  /**
   * The constructor.
   * @param {Gfx2BoundingRect} rect - The position and size of the partition rectangle.
   * @param {'x' | 'y'} axis - The split axis of the partition.
   */
  constructor(rect: Gfx2BoundingRect, axis: 'x' | 'y') {
    this.rect = rect;
    this.axis = axis;
  }

  /**
   * The "search" function takes a target bounding rectangle and recursively searches in a binary tree partition
   * to find all intersecting bounding rectangles, adding them to the results array.
   * @param node - The binary tree partition.
   * @param {Gfx2BoundingRect} target - The bounding rectangle that we want to search for in the tree.
   * @param results - The `results` parameter is an array of `Gfx2BoundingRect` objects. It is used to
   * store the search results.
   * @returns all bounding rectangle that intersect with the target.
   */
  search(node: TreePartitionNode<Gfx2BoundingRect>, target: Gfx2BoundingRect, results: Array<Gfx2BoundingRect> = []): Array<Gfx2BoundingRect> {
    const method = node.getMethod() as Gfx2TreePartitionMethod;
    const nodeBox = method.rect;
    if (!nodeBox.intersectBoundingRect(target)) {
      return [];
    }

    const left = node.getLeft();
    const right = node.getRight();

    if (left && right) {
      left.search(target, results);
      right.search(target, results);
    }
    else {
      const children = node.getChildren();
      const max = children.length;
      for (let i = 0; i < max; i++) {
        if (children[i].intersectBoundingRect(target)) {
          results.push(children[i]);
        }
      }
    }

    return results;
  }

  /**
   * The "split" function takes an array of bounding rectangle and splits them into left and right based on a
   * specified axis, finally it creating new partition methods for each side.
   * @param objects - An array of Gfx2BoundingRect.
   * @returns an object with the properties `left`, `right`, `leftMethod`, and `rightMethod`.
   */
  split(objects: Array<Gfx2BoundingRect>): SplitResult<Gfx2BoundingRect> {
    const left = [];
    const right = [];
    const center = this.rect.getCenter();

    for (const object of objects) {
      if (this.axis === 'x') {
        if (object.min[0] >= center[0]) {
          right.push(object);
        }
        else {
          left.push(object);
        }
      }
      else {
        if (object.min[1] >= center[1]) {
          right.push(object);
        }
        else {
          left.push(object);
        }
      }
    }

    const rects = (this.axis === 'x') ? SPLIT_VERTICAL(this.rect) : SPLIT_HORIZONTAL(this.rect);
    const newAxis = (this.axis === 'x') ? 'y' : 'x';
    const leftMethod = new Gfx2TreePartitionMethod(rects[0], newAxis);
    const rightMethod = new Gfx2TreePartitionMethod(rects[1], newAxis);

    return { left, right, leftMethod, rightMethod };
  }
}

export { Gfx2TreePartition };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function SPLIT_VERTICAL(aabb: Gfx2BoundingRect): Array<Gfx2BoundingRect> {
  const size = aabb.getSize();
  const center = aabb.getCenter();

  return [
    Gfx2BoundingRect.createFromCoord(aabb.min[0], aabb.min[1], size[0] * 0.5, size[1]),
    Gfx2BoundingRect.createFromCoord(center[0], aabb.min[1], size[0] * 0.5, size[1])
  ];
}

function SPLIT_HORIZONTAL(aabb: Gfx2BoundingRect): Array <Gfx2BoundingRect> {
  const size = aabb.getSize();
  const center = aabb.getCenter();

  return [
    Gfx2BoundingRect.createFromCoord(aabb.min[0], aabb.min[1], size[0], size[1] * 0.5),
    Gfx2BoundingRect.createFromCoord(aabb.min[0], center[1], size[0], size[1] * 0.5)
  ];
}