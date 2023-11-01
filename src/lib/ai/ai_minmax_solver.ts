import { AIMinMaxLeaf, AIMinMaxNode, AIMinMaxTreeAbstract } from './ai_minmax_tree';

/**
 * The `AIMinMaxSolver` class solves an AI MinMax tree by generating values for each node and finding
 * the child node with the maximum value from a scored graph.
 */
class AIMinMaxSolver {
  /**
   * The "solve" function solves an AI MinMax tree by generating values for each node, finding the child node
   * with the maximum value, and returning it.
   * @param {AIMinMaxNode} node - The scored graph.
   * @returns the node with the maximum value among its children.
   */
  solve(node: AIMinMaxNode): AIMinMaxTreeAbstract {
    this.generateValues(node, true);
    let children = node.getChildren();
    let maxNode = children[0];

    for (let childNode of node.getChildren()) {
      if (childNode.getValue() > maxNode.getValue()) {
        maxNode = childNode;
      }
    }

    return maxNode;
  }

  /**
   * The "generateValues" function generates values for nodes in a minimax tree, considering whether the current player is
   * maximizing or minimizing, and using alpha-beta pruning to optimize the search.
   * @param {AIMinMaxTreeAbstract} parentNode - The scored graph.
   * @param {boolean} isMaxPlayer - A boolean value indicating whether the current player is the
   * maximizing player or not. If it is true, then the current player is the maximizing player. If it is
   * false, then the current player is the minimizing player.
   * @param {number} alpha - The alpha parameter is used in the alpha-beta pruning algorithm. It
   * represents the best value that the maximizing player (isMaxPlayer = true) has found so far.
   * Initially, it is set to negative infinity.
   * @param {number} beta - The parameter "beta" represents the upper bound for the minimax algorithm. It
   * is used to prune branches of the tree that are guaranteed to not affect the final decision. If the
   * value of a node exceeds or equals beta during the evaluation, the algorithm can stop evaluating
   * further children of that node, as
   * @returns the updated `parentNode` after generating values for its children nodes.
   */
  generateValues(parentNode: AIMinMaxTreeAbstract, isMaxPlayer: boolean, alpha: number = -Infinity, beta: number = Infinity): AIMinMaxTreeAbstract {
    if (parentNode instanceof AIMinMaxLeaf) {
      return parentNode;
    }

    parentNode.setValue(isMaxPlayer ? -Infinity : Infinity);

    for (let childNode of (parentNode as AIMinMaxNode).children) {
      const node = this.generateValues(childNode, !isMaxPlayer, alpha, beta);
      const val = node.getValue();

      if (isMaxPlayer) {
        if (val > parentNode.getValue()) {
          parentNode.setValue(val);
        }
        if (val >= beta) {
          break;
        }
        if (val > alpha) {
          alpha = val;
        }
      }
      else {
        if (val < parentNode.getValue()) {
          parentNode.setValue(val);
        }
        if (val <= alpha) {
          break;
        }
        if (val < beta) {
          beta = val;
        }
      }
    }

    return parentNode;
  }
}

export { AIMinMaxSolver };