import { Gfx3BoundingBox } from './gfx3_bounding_box';
import { TreePartition, TreePartitionNode, ITreePartitionMethod, SplitResult } from '../core/tree_partition';
/**
 * A 3D binary tree space partition.
 */
declare class Gfx3TreePartition extends TreePartition<Gfx3BoundingBox> {
    /**
     * @param {number} maxChildren - The maximum number of children that a node in the tree can have. It determines the branching factor of the tree, i.e.
     * @param {number} maxDepth - The maximum depth or level of the tree partition. It determines how deep the tree can be divided into smaller partitions.
     * @param {Gfx3BoundingBox} aabb - The top bounding box of the tree partition space.
     */
    constructor(maxChildren: number, maxDepth: number, aabb?: Gfx3BoundingBox);
}
/**
 * A 3D binary tree partition method for quick search intersections.
 */
declare class Gfx3TreePartitionMethod implements ITreePartitionMethod<Gfx3BoundingBox> {
    box: Gfx3BoundingBox;
    axis: 'x' | 'y' | 'z';
    /**
     * @param {Gfx3BoundingBox} box - The position and size of the partition box.
     * @param {'x' | 'y' | 'z'} axis - The split axis of the partition.
     */
    constructor(box: Gfx3BoundingBox, axis: 'x' | 'y' | 'z');
    /**
     * The draw function.
     */
    draw(): void;
    /**
     * Translate the position.
     *
     * @param {number} x - The amount of translation in the x-axis direction.
     * @param {number} y - The amount of translation in the y-axis direction.
     * @param {number} z - The amount of translation in the z-axis direction.
     */
    translate(x: number, y: number, z: number): void;
    /**
     * Search and return all objects that intersect with the target.
     *
     * @param {Gfx3BoundingBox} target - The target object.
     * @param {Array<Gfx3BoundingBox>} results - All matching objects.
     */
    search(node: TreePartitionNode<Gfx3BoundingBox>, target: Gfx3BoundingBox, results?: Array<Gfx3BoundingBox>): Array<Gfx3BoundingBox>;
    /**
     * Splits objects into left and right based on a specified axis, finally it returns new partition methods for each side.
     *
     * @param {Array<Gfx3BoundingBox>} objects - A list of bounding box.
     */
    split(objects: Array<Gfx3BoundingBox>): SplitResult<Gfx3BoundingBox>;
}
export { Gfx3TreePartition, Gfx3TreePartitionMethod };
