import { TreePartition, TreePartitionNode, ITreePartitionMethod, SplitResult } from '../core/tree_partition';
import { Gfx3BoundingBox } from './gfx3_bounding_box';

/**
 * A 3D binary tree space partition.
 */
class Gfx3TreePartition extends TreePartition<Gfx3BoundingBox> {
  /**
   * @param {number} maxChildren - The maximum number of children that a node in the tree can have. It determines the branching factor of the tree, i.e.
   * @param {number} maxDepth - The maximum depth or level of the tree partition. It determines how deep the tree can be divided into smaller partitions.
   * @param {Gfx3BoundingBox} aabb - The top bounding box of the tree partition space.
   */
  constructor(maxChildren: number, maxDepth: number, aabb: Gfx3BoundingBox = new Gfx3BoundingBox([0, 0, 0], [0, 0, 0])) {
    super(maxChildren, maxDepth, new Gfx3TreePartitionMethod(aabb, 'x'));
  }
}

/**
 * A 3D binary tree partition method for quick search intersections.
 */
class Gfx3TreePartitionMethod implements ITreePartitionMethod<Gfx3BoundingBox> {
  box: Gfx3BoundingBox;
  axis: 'x' | 'y' | 'z';

  /**
   * @param {Gfx3BoundingBox} box - The position and size of the partition box.
   * @param {'x' | 'y' | 'z'} axis - The split axis of the partition.
   */
  constructor(box: Gfx3BoundingBox, axis: 'x' | 'y' | 'z') {
    this.box = box;
    this.axis = axis;
  }

  /**
   * Search and return all objects that intersect with the target.
   * 
   * @param {Gfx3BoundingBox} target - The target object.
   * @param {Array<Gfx3BoundingBox>} results - All matching objects.
   */
  search(node: TreePartitionNode<Gfx3BoundingBox>, target: Gfx3BoundingBox, results: Array<Gfx3BoundingBox> = []): Array<Gfx3BoundingBox> {
    if (!this.box.intersectBoundingBox(target)) {
      return [];
    }

    const left = node.getLeft();
    const right = node.getRight();

    if (left && right) {
      left.search(target, results)
      right.search(target, results)
    }
    else {
      const children = node.getChildren();
      for (let i = 0; i < children.length; i++) {
        if (children[i].intersectBoundingBox(target)) {
          results.push(children[i]);
        }
      }
    }

    return results;
  }

  /**
   * Splits objects into left and right based on a specified axis, finally it returns new partition methods for each side.
   * 
   * @param {Array<Gfx3BoundingBox>} objects - A list of bounding box.
   */
  split(objects: Array<Gfx3BoundingBox>): SplitResult<Gfx3BoundingBox> {
    const left = [];
    const right = [];
    const center = this.box.getCenter();

    for (const object of objects) {
      if (this.axis === 'x') {
        if (object.min[0] < center[0] && object.max[0] > center[0]) {
          left.push(object);
          right.push(object);
        }
        else if (object.max[0] < center[0]) {
          left.push(object);
        }
        else {
          right.push(object);
        }
      }
      else if (this.axis === 'y') {
        if (object.min[1] < center[1] && object.max[1] > center[1]) {
          left.push(object);
          right.push(object);
        }
        else if (object.max[1] < center[1]) {
          left.push(object);
        }
        else {
          right.push(object);
        }
      }
      else {
        if (object.min[2] < center[2] && object.max[2] > center[2]) {
          left.push(object);
          right.push(object);
        }
        else if (object.max[2] < center[2]) {
          left.push(object);
        }
        else {
          right.push(object);
        }
      }
    }

    let boxes: Array<Gfx3BoundingBox> = [];
    let newAxis: 'x' | 'y' | 'z' = 'x';

    if (this.axis === 'x') {
      boxes = this.box.splitVertical();
      newAxis = 'y';
    }
    else if (this.axis === 'y') {
      boxes = this.box.splitHorizontal();
      newAxis = 'z';
    }
    else {
      boxes = this.box.splitDepth();
      newAxis = 'x';
    }

    const leftMethod = new Gfx3TreePartitionMethod(boxes[0], newAxis);
    const rightMethod = new Gfx3TreePartitionMethod(boxes[1], newAxis);

    return { left, right, leftMethod, rightMethod };
  }
}

export { Gfx3TreePartition, Gfx3TreePartitionMethod };