import { TreePartition, TreePartitionNode, ITreePartitionMethod, SplitResult } from '../core/tree_partition';
import { Gfx2BoundingRect } from './gfx2_bounding_rect';
/**
 * A 2D binary tree space partition.
 */
declare class Gfx2TreePartition extends TreePartition<Gfx2BoundingRect> {
    /**
     * @param {number} maxChildren - The maximum number of children that a node in the tree can have. It determines the branching factor of the tree, i.e.
     * @param {number} maxDepth - The maximum depth or level of the tree partition. It determines how deep the tree can be divided into smaller partitions.
     * @param {Gfx2BoundingRect} rect - The top bounding rectangle of the tree partition space.
     */
    constructor(maxChildren: number, maxDepth: number, rect?: Gfx2BoundingRect);
}
/**
 * A 2D binary tree space partition method for quick search intersections.
 */
declare class Gfx2TreePartitionMethod implements ITreePartitionMethod<Gfx2BoundingRect> {
    rect: Gfx2BoundingRect;
    axis: 'x' | 'y';
    /**
     * @param {Gfx2BoundingRect} rect - The partition rectangle.
     * @param {'x' | 'y'} axis - The partition split axis.
     */
    constructor(rect: Gfx2BoundingRect, axis: 'x' | 'y');
    draw(): void;
    /**
     * Translate the position.
     *
     * @param {number} x - The amount of translation in the x-axis direction.
     * @param {number} y - The amount of translation in the y-axis direction.
     */
    translate(x: number, y: number): void;
    /**
     * Search and return all objects that intersect with the target.
     *
     * @param {Gfx2BoundingRect} target - The target object.
     * @param {Array<Gfx2BoundingRect>} results - All matching objects.
     */
    search(node: TreePartitionNode<Gfx2BoundingRect>, target: Gfx2BoundingRect, results?: Array<Gfx2BoundingRect>): Array<Gfx2BoundingRect>;
    /**
     * Splits objects into left and right based on a specified axis, finally it returns new partition methods for each side.
     *
     * @param {Array<Gfx2BoundingRect>} objects - A list of bounding rectangle.
     */
    split(objects: Array<Gfx2BoundingRect>): SplitResult<Gfx2BoundingRect>;
}
export { Gfx2TreePartition, Gfx2TreePartitionMethod };
