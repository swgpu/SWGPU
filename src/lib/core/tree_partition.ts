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
 * The `TreePartition` class represents a generic partition binary tree data structure.
 * @typeParam T - The object type.
 */
class TreePartition<T> {
  maxChildren: number;
  maxDepth: number;
  root: TreePartitionNode<T>;

  /**
   * The constructor initializes a TreePartition object with the specified maximum number of children,
   * maximum depth, and partition method.
   * @param {number} maxChildren - The `maxChildren` parameter specifies the maximum number of children
   * that a node in the tree can have. This parameter determines the branching factor of the tree, i.e.,
   * the number of child nodes that can be created from a parent node.
   * @param {number} maxDepth - The `maxDepth` parameter specifies the maximum depth or level of the tree
   * partition. It determines how deep the tree can be divided into smaller partitions.
   * @param method - The `method` parameter is an instance of the `ITreePartitionMethod<T>` interface.
   * This interface defines a method that is responsible for partitioning the tree nodes. The `T`
   * represents the type of data that the tree nodes hold.
   */
  constructor(maxChildren: number, maxDepth: number, method: ITreePartitionMethod<T>) {
    this.maxChildren = maxChildren;
    this.maxDepth = maxDepth;
    this.root = new TreePartitionNode<T>(this, 0, method);
  }

  /**
   * The "addChild" function adds an object as a child to the tree.
   * @param {T} object - The parameter `object` is of type T, which means it can be any type.
   */
  addChild(object: T): void {
    this.root.addChild(object);
  }

  /**
   * The "getMaxChildren" function returns the maximum number of children per nodes.
   * @returns The method is returning the value of the property "maxChildren", which is a number.
   */
  getMaxChildren(): number {
    return this.maxChildren;
  }

  /**
   * The "getMaxDepth" function returns the maximum depth of the partition tree.
   * @returns The method is returning the value of the variable "maxDepth", which is of type number.
   */
  getMaxDepth(): number {
    return this.maxDepth;
  }
}

/**
 * The `TreePartitionNode` class represents a generic node in a binary tree partition data structure, which can be used
 * to organize and search for objects of type T.
 * @typeParam T - The object type.
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
   * This is a constructor.
   * @param tree - The `tree` parameter is an instance of the `TreePartition` class, which represents a
   * partitioned tree data structure. It contains the data and structure of the tree.
   * @param {number} depth - The "depth" parameter represents the maximum depth of the tree partition. It
   * determines how many levels the tree will have.
   * @param method - The `method` parameter is an object that implements the `ITreePartitionMethod`
   * interface. This interface defines a method for partitioning a tree. The `method` object is used to
   * determine how the tree should be partitioned at each level of the tree.
   */
  constructor(tree: TreePartition<T>, depth: number, method: ITreePartitionMethod<T>) {
    this.reset();
    this.tree = tree;
    this.depth = depth;
    this.method = method;
  }

 /**
  * The search function call the search's method and return matching objects.
  * @param {any[]} params - The `params` parameter in the `search` method.
  * @returns An array of type T.
  */
  search(...params: any[]): Array<T> {
    return this.method.search(this, ...params);
  }

  /**
   * The "reset" function clear the node.
   */
  reset(): void {
    this.children = [];
    this.left = null;
    this.right = null;
  }

  /**
   * The "createSubNodes" function split and move children in two sub-nodes.
   */
  createSubNodes(): void {
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

  /**
   * The "getChildren" function returns children of the node.
   * @returns An array of type T, which represents the children of the node.
   */
  getChildren(): Array<T> {
    return this.children;
  }

  /**
   * The "addChild" function adds an object to the tree node's children, creating subnodes if maxChildren is exceeded.
   * @param {T} object - The parameter "object" is of type T, which means it can be any type of object.
   */
  addChild(object: T): void {
    if (this.children.length >= this.tree.getMaxChildren() && this.depth < this.tree.getMaxDepth()) {
      this.createSubNodes();
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
   * The "getMethod" function returns the tree partition method used.
   * @returns The method being returned is of type ITreePartitionMethod<T>.
   */
  getMethod(): ITreePartitionMethod<T> {
    return this.method;
  }

  /**
   * The "getLeft" function returns the left node.
   * @returns The method is returning the left node or null.
   */
  getLeft(): TreePartitionNode<T> | null {
    return this.left;
  }

  /**
   * The "getRight" function returns the right node.
   * @returns The method is returning the right node or null.
   */
  getRight(): TreePartitionNode<T> | null {
    return this.right;
  }

  /**
   * The "getDepth" function returns the depth of the node.
   * @returns The depth.
   */
  getDepth(): number {
    return this.depth;
  }

  /**
   * The "setDepth" function sets the depth node to a specified value.
   * @param {number} depth - The depth parameter is a number that represents the depth of the node.
   */
  setDepth(depth: number): void {
    this.depth = depth;
  }
}

export { TreePartition, TreePartitionNode };