export type SplitResult<T> = {
    left: Array<T>;
    right: Array<T>;
    leftMethod: ITreePartitionMethod<T>;
    rightMethod: ITreePartitionMethod<T>;
};
export interface ITreePartitionMethod<T> {
    split(objects: Array<T>): SplitResult<T>;
    search(node: TreePartitionNode<T>, ...params: any[]): Array<T>;
    translate(x: number, y: number, z: number): void;
    draw(): void;
}
/**
 * The root partition binary tree.
 * @typeParam T - The type of data that the tree nodes hold.
 */
declare class TreePartition<T> {
    maxChildren: number;
    maxDepth: number;
    root: TreePartitionNode<T>;
    /**
     * @param {number} maxChildren - The maximum number of children that a node in the tree can have. It determines the branching factor of the tree, i.e.
     * @param {number} maxDepth - The maximum depth or level of the tree partition. It determines how deep the tree can be divided into smaller partitions.
     * @param method - Defines a method that is responsible for partitioning the tree nodes.
     */
    constructor(maxChildren: number, maxDepth: number, method: ITreePartitionMethod<T>);
    draw(): void;
    /**
     * Translate the position.
     *
     * @param {number} x - The amount of translation in the x-axis direction.
     * @param {number} y - The amount of translation in the y-axis direction.
     * @param {number} z - The amount of translation in the z-axis direction.
     */
    translate(x: number, y: number, z?: number): void;
    /**
     * Search and return all objects that intersect with the target.
     *
     * @param {T} target - The target object.
     * @param {Array<T>} results - All matching objects.
     */
    search(target: T, results?: Array<T>): Array<T>;
    /**
     * Adds an object.
     *
     * @param {T} object - The object.
     */
    addChild(object: T): void;
    /**
     * Returns the maximum number of children per nodes.
     */
    getMaxChildren(): number;
    /**
     * Returns the maximum depth of the partition tree.
     */
    getMaxDepth(): number;
    /**
     * Returns the root node.
     */
    getRoot(): TreePartitionNode<T>;
}
/**
 * The node in a binary tree partition data structure.
 * @typeParam T - The type of data that the tree nodes hold.
 */
declare class TreePartitionNode<T> {
    #private;
    tree: TreePartition<T>;
    depth: number;
    method: ITreePartitionMethod<T>;
    parent: TreePartitionNode<T> | null;
    left: TreePartitionNode<T> | null;
    right: TreePartitionNode<T> | null;
    children: Array<T>;
    /**
     * @param tree - The root partition binary tree.
     * @param {number} depth - The depth of that node.
     * @param method - Defines a method that is responsible for partitioning the tree nodes.
     */
    constructor(tree: TreePartition<T>, depth: number, method: ITreePartitionMethod<T>);
    draw(): void;
    /**
     * Translate the position.
     *
     * @param {number} x - The amount of translation in the x-axis direction.
     * @param {number} y - The amount of translation in the y-axis direction.
     * @param {number} z - The amount of translation in the z-axis direction.
     */
    translate(x: number, y: number, z?: number): void;
    /**
     * Search and return all objects that intersect with the target.
     *
     * @param {T} target - The target object.
     * @param {Array<T>} results - All matching objects.
     */
    search(target: T, results?: Array<T>): Array<T>;
    /**
     * Removes all nodes.
     */
    reset(): void;
    /**
     * Adds an object.
     *
     * @param {T} object - The object.
     */
    addChild(object: T): void;
    /**
     * Returns children.
     */
    getChildren(): Array<T>;
    /**
     * Returns the partition method object.
     */
    getMethod(): ITreePartitionMethod<T>;
    /**
     * Returns the left node or null.
     */
    getLeft(): TreePartitionNode<T> | null;
    /**
     * Returns the right node or null.
     */
    getRight(): TreePartitionNode<T> | null;
    /**
     * Returns the depth value.
     */
    getDepth(): number;
    /**
     * Set depth value.
     * @param {number} depth - The depth value.
     */
    setDepth(depth: number): void;
}
export { TreePartition, TreePartitionNode };
