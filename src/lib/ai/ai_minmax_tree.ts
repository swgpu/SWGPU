/**
 * The MinMax node abstract class.
 */
abstract class AIMinMaxTreeAbstract {
	visited: boolean;
  data: any;
  value: number;

  constructor() {
    this.visited = false;
    this.data = {};
    this.value = -Infinity;
  }

  /**
   * Set the visited flag (only for internal use).
   * 
   * @param {boolean} visited - The visited flag.
   */
  setVisited(visited: boolean): void {
    this.visited = visited;
  }

  /**
   * Return the visited flag (only for internal use)
   */
  isVisited(): boolean {
		return this.visited;
	}

  /**
   * Set some custom data associate with the node. The function `setData` in TypeScript sets the value of a variable `data` to the provided input.
   * 
   * @param {any} data - The custom data object.
   */
  setData(data: any): void {
    this.data = data;
  }

  /**
   * Return the custom data.
   */
  getData(): any {
    return this.data;
  }

  /**
   * Set the score value.
   * 
   * @param {number} value - The score value.
   */
  setValue(value: number): void {
    this.value = value;
  }

  /**
   * Get the score value.
   */
  getValue(): number {
    return this.value;
  }
}

/**
 * The MinMax leaf node.
 */
class AIMinMaxLeaf extends AIMinMaxTreeAbstract {
  /**
   * @param value - The value of the leaf.
   */
	constructor(value: number) {
		super();
    this.value = value;
	}
}

/**
 * The MinMax node.
 */
class AIMinMaxNode extends AIMinMaxTreeAbstract {
  children: Array<AIMinMaxTreeAbstract>;

  /**
   * @param children - The children's node.
   */
	constructor(children: Array<AIMinMaxTreeAbstract> = []) {
		super();
    this.children = children;
	}

  /**
   * Adds a child node.
   * The child node that is being added to the parent node.
   * 
   * @param {AIMinMaxTreeAbstract} child - The child node.
   */
  addChild(child: AIMinMaxTreeAbstract): void {
    this.children.push(child);
  }

  /**
   * Return all children.
   */
  getChildren(): Array<AIMinMaxTreeAbstract> {
		return this.children;
	}
}

export { AIMinMaxTreeAbstract, AIMinMaxLeaf, AIMinMaxNode };