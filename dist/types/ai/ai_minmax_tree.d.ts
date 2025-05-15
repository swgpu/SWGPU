/**
 * The MinMax node abstract class.
 */
declare abstract class AIMinMaxTreeAbstract {
    visited: boolean;
    data: any;
    value: number;
    constructor();
    /**
     * Set the visited flag (only for internal use).
     *
     * @param {boolean} visited - The visited flag.
     */
    setVisited(visited: boolean): void;
    /**
     * Return the visited flag (only for internal use)
     */
    isVisited(): boolean;
    /**
     * Set some custom data associate with the node. The function `setData` in TypeScript sets the value of a variable `data` to the provided input.
     *
     * @param {any} data - The custom data object.
     */
    setData(data: any): void;
    /**
     * Return the custom data.
     */
    getData(): any;
    /**
     * Set the score value.
     *
     * @param {number} value - The score value.
     */
    setValue(value: number): void;
    /**
     * Get the score value.
     */
    getValue(): number;
}
/**
 * The MinMax leaf node.
 */
declare class AIMinMaxLeaf extends AIMinMaxTreeAbstract {
    /**
     * @param value - The value of the leaf.
     */
    constructor(value: number);
}
/**
 * The MinMax node.
 */
declare class AIMinMaxNode extends AIMinMaxTreeAbstract {
    children: Array<AIMinMaxTreeAbstract>;
    /**
     * @param children - The children's node.
     */
    constructor(children?: Array<AIMinMaxTreeAbstract>);
    /**
     * Adds a child node.
     * The child node that is being added to the parent node.
     *
     * @param {AIMinMaxTreeAbstract} child - The child node.
     */
    addChild(child: AIMinMaxTreeAbstract): void;
    /**
     * Return all children.
     */
    getChildren(): Array<AIMinMaxTreeAbstract>;
}
export { AIMinMaxTreeAbstract, AIMinMaxLeaf, AIMinMaxNode };
