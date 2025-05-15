export interface AIPathNode<T> {
    pos: T;
    children: Array<string>;
    parent?: AIPathNode<T> | null;
    data?: Object | null;
    g: number;
    h: number;
    f: number;
}
/**
 * A Generic abstract path graph.
 *
 * @typeParam T - The coord type: vec2 or vec3.
 */
declare abstract class AIPathGraph<T> {
    nodes: Map<string, AIPathNode<T>>;
    groups: Map<string, Array<string>>;
    /**
     * @param nodes - The graph data.
     */
    constructor(nodes?: Map<string, AIPathNode<T>>);
    /**
     * Return the distance between two nodes.
     */
    abstract getDistance(a: AIPathNode<T>, b: AIPathNode<T>): number;
    /**
     * Asynchronously loads graph data from a json file (grf).
     * Note: For uni-directionnal graph-node, in Blender assign the `NOBACK` group to the vertex.
     *
     * @param {string} path - The file path.
     */
    loadFromFile(path: string): Promise<void>;
    /**
     * Return the node.
     *
     * @param {string} nid - The unique identifier.
     */
    getNode(nid: string): AIPathNode<T>;
    /**
     * Return the node group list.
     *
     * @param {string} nid - The unique identifier.
     */
    getNodeGroupList(nid: string): Array<string>;
    /**
     * Add a node.
     *
     * @param {string} nid - The unique identifier of the node.
     * @param node - The node.
     * @param {boolean} [biRelations=true] - Determines whether bidirectional relations should be established between the newly added node and its children.
     */
    addNode(nid: string, node: AIPathNode<T>, biRelations?: boolean): AIPathNode<T>;
    /**
     * Remove the node.
     *
     * @param {string} nid - The unique identifier.
     */
    removeNode(nid: string): void;
    /**
     * Set node properties.
     *
     * @param {string} nid - The unique identifier.
     * @param properties - The properties dataset.
     */
    setNodeProperties(nid: string, properties: Partial<AIPathNode<T>>): void;
    /**
     * Remove node relationship.
     *
     * @param {string} nid - The node from which you want to remove a relation.
     * @param {string} cnid - The child to remove.
     * @param {boolean} biRelations - Determines whether bidirectional relations should be removed.
     */
    removeNodeRelation(nid: string, cnid: string, biRelations?: boolean): void;
    /**
     * Find the first node matching with the predicate function.
     *
     * @param {Function} predicateFn - The predicate function.
     */
    findNode(predicateFn: Function): AIPathNode<T> | null;
    /**
     * Find all nodes matching with the predicate function.
     *
     * @param {Function} predicateFn - The predicate function.
     */
    findNodes(predicateFn: Function): Array<AIPathNode<T>>;
    /**
     * Reset weight values of nodes.
     */
    reset(): void;
}
/**
 * Two-dimensions path graph.
 */
declare class AIPathGraph2D extends AIPathGraph<vec2> {
    /**
     * @param nodes - The graph data.
     */
    constructor(nodes?: Map<string, AIPathNode<vec2>>);
    /**
     * Return the distance between two nodes.
     * @param a - The node A.
     * @param b - The node B.
     */
    getDistance(a: AIPathNode<vec2>, b: AIPathNode<vec2>): number;
}
/**
 * Three-dimensions path graph.
 */
declare class AIPathGraph3D extends AIPathGraph<vec3> {
    /**
     * @param nodes - The graph data.
     */
    constructor(nodes?: Map<string, AIPathNode<vec3>>);
    /**
     * Return the distance between two nodes.
     * @param a - The node A.
     * @param b - The node B.
     */
    getDistance(a: AIPathNode<vec3>, b: AIPathNode<vec3>): number;
}
export { AIPathGraph, AIPathGraph2D, AIPathGraph3D };
