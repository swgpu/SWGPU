import { AIMinMaxNode, AIMinMaxTreeAbstract } from './ai_minmax_tree';
/**
 * Solves an MinMax tree.
 */
declare class AIMinMaxSolver {
    #private;
    /**
     * Solves MinMax tree and return the node with the maximum value among its direct children.
     *
     * @param {AIMinMaxNode} node - The scored graph.
     */
    solve(node: AIMinMaxNode): AIMinMaxTreeAbstract;
}
export { AIMinMaxSolver };
