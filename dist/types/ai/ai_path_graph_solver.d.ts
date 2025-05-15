import { AIPathGraph, AIPathNode } from './ai_path_graph';
/**
 * Implements the A* algorithm to find the shortest path between two nodes in a graph.
 * @typeParam T - The coord type: vec2 or vec3.
 */
declare class AIPathGraphSolver<T extends vec2 | vec3> {
    /**
     * Find the shortest path between a start node and an end node in a given graph and returns the path.
     *
     * @param graph - The path graph.
     * @param startNode - The starting node of the path.
     * @param endNode - The destination node.
     */
    solve(graph: AIPathGraph<T>, startNode: AIPathNode<T>, endNode: AIPathNode<T>): Array<AIPathNode<T>>;
    /**
     * Calculates the distance between two nodes in a graph.
     *
     * @param graph - The path graph.
     * @param nodeA - The node A.
     * @param nodeB - The node B.
     */
    heuristic(graph: AIPathGraph<T>, nodeA: AIPathNode<T>, nodeB: AIPathNode<T>): number;
}
export { AIPathGraphSolver };
