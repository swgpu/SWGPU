export type SplitResult<T> = {
  left: Array<T>,
  right: Array<T>,
  leftMethod: ITreePartitionMethod<T>,
  rightMethod: ITreePartitionMethod<T>,
}

export interface ITreePartitionMethod<T> {
  split(objects: Array<T>): SplitResult<T>;
  search(node: TreePartitionNode<T>, ...params: any[]): Array<T>;
}

/**
 * The root partition binary tree.
 * @typeParam T - The type of data that the tree nodes hold.
 */
class TreePartition<T> {
  maxChildren: number;
  maxDepth: number;
  root: TreePartitionNode<T>;

  /**
   * @param {number} maxChildren - The maximum number of children that a node in the tree can have. It determines the branching factor of the tree, i.e.
   * @param {number} maxDepth - The maximum depth or level of the tree partition. It determines how deep the tree can be divided into smaller partitions.
   * @param method - Defines a method that is responsible for partitioning the tree nodes.
   */
  constructor(maxChildren: number, maxDepth: number, method: ITreePartitionMethod<T>) {
    this.maxChildren = maxChildren;
    this.maxDepth = maxDepth;
    this.root = new TreePartitionNode<T>(this, 0, method);
  }

  /**
   * Search and return all objects that intersect with the target.
   * 
   * @param {T} target - The target object.
   * @param {Array<T>} results - All matching objects.
   */
  search(target: T, results: Array<T> = []): Array<T> {
    return this.root.search(target, results);
  }

  /**
   * Adds an object.
   * 
   * @param {T} object - The object.
   */
  addChild(object: T): void {
    this.root.addChild(object);
  }

  /**
   * Returns the maximum number of children per nodes.
   */
  getMaxChildren(): number {
    return this.maxChildren;
  }

  /**
   * Returns the maximum depth of the partition tree.
   */
  getMaxDepth(): number {
    return this.maxDepth;
  }
}

/**
 * The node in a binary tree partition data structure.
 * @typeParam T - The type of data that the tree nodes hold.
 */
class TreePartitionNode<T> {
  tree: TreePartition<T>;
  depth: number;
  method: ITreePartitionMethod<T>;
  parent: TreePartitionNode<T> | null = null;
  left: TreePartitionNode<T> | null = null;
  right: TreePartitionNode<T> | null = null;
  children: Array<T> = [];

  /**
   * @param tree - The root partition binary tree.
   * @param {number} depth - The depth of that node.
   * @param method - Defines a method that is responsible for partitioning the tree nodes.
   */
  constructor(tree: TreePartition<T>, depth: number, method: ITreePartitionMethod<T>) {
    this.reset();
    this.tree = tree;
    this.depth = depth;
    this.method = method;
  }

 /**
  * Search and return all objects that intersect with the target.
  * 
  * @param {T} target - The target object.
  * @param {Array<T>} results - All matching objects.
  */
  search(target: T, results: Array<T> = []): Array<T> {
    return this.method.search(this, target, results);
  }

  /**
   * Removes all nodes.
   */
  reset(): void {
    this.children = [];
    this.left = null;
    this.right = null;
  }

  /**
   * Adds an object.
   * 
   * @param {T} object - The object.
   */
  addChild(object: T): void {
    if (this.children.length >= this.tree.getMaxChildren() && this.depth < this.tree.getMaxDepth()) {
      this.$createSubNodes();
    }

    if (this.left === null && this.right === null) {
      this.children.push(object);
    }
    else {
      const results = this.method.split([object]);
      if (this.left && results.left.length > 0) {
        this.left.addChild(results.left[0]);
      }

      if (this.right && results.right.length > 0) {
        this.right.addChild(results.right[0]);
      }
    }
  }

  /**
   * Returns children.
   */
  getChildren(): Array<T> {
    return this.children;
  }

  /**
   * Returns the partition method object.
   */
  getMethod(): ITreePartitionMethod<T> {
    return this.method;
  }

  /**
   * Returns the left node or null.
   */
  getLeft(): TreePartitionNode<T> | null {
    return this.left;
  }

  /**
   * Returns the right node or null.
   */
  getRight(): TreePartitionNode<T> | null {
    return this.right;
  }

  /**
   * Returns the depth value.
   */
  getDepth(): number {
    return this.depth;
  }

  /**
   * Set depth value.
   * @param {number} depth - The depth value.
   */
  setDepth(depth: number): void {
    this.depth = depth;
  }

  $createSubNodes(): void {
    const results = this.method.split(this.children);

    this.left = new TreePartitionNode(
      this.tree,
      this.depth + 1,
      results.leftMethod
    );

    this.right = new TreePartitionNode(
      this.tree,
      this.depth + 1,
      results.rightMethod
    );

    results.left.forEach(this.left.addChild.bind(this.left));
    results.right.forEach(this.right.addChild.bind(this.right));
    this.left.parent = this;
    this.right.parent = this;
    this.children = [];
  }
}

export { TreePartition, TreePartitionNode };