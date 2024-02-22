import { AIMinMaxLeaf, AIMinMaxNode, AIMinMaxTreeAbstract } from './ai_minmax_tree';

/**
 * Solves an MinMax tree.
 */
class AIMinMaxSolver {
  /**
   * Solves MinMax tree and return the node with the maximum value among its direct children.
   * 
   * @param {AIMinMaxNode} node - The scored graph.
   */
  solve(node: AIMinMaxNode): AIMinMaxTreeAbstract {
    this.$generateValues(node, true);
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
   * Bubbling the nodes values and returns the MinMax tree.
   * 
   * @param {AIMinMaxTreeAbstract} parentNode - The scored graph.
   * @param {boolean} isMaxPlayer - A boolean value indicating whether the current player is the maximizing player or not.
   * @param {number} alpha - The alpha.
   * @param {number} beta - The beta.
   */
  $generateValues(parentNode: AIMinMaxTreeAbstract, isMaxPlayer: boolean, alpha: number = -Infinity, beta: number = Infinity): AIMinMaxTreeAbstract {
    if (parentNode instanceof AIMinMaxLeaf) {
      return parentNode;
    }

    parentNode.setValue(isMaxPlayer ? -Infinity : Infinity);

    for (let childNode of (parentNode as AIMinMaxNode).children) {
      const node = this.$generateValues(childNode, !isMaxPlayer, alpha, beta);
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