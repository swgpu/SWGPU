import { AIPathGraph, AIPathNode } from './ai_path_graph';

/**
 * Implements the A* algorithm to find the shortest path between two nodes in a graph.
 * @typeParam T - The coord type: vec2 or vec3.
 */
class AIPathGraphSolver<T extends vec2 | vec3> {
  /**
   * Find the shortest path between a start node and an end node in a given graph and returns the path.
   * 
   * @param graph - The path graph.
   * @param startNode - The starting node of the path.
   * @param endNode - The destination node.
   */
  solve(graph: AIPathGraph<T>, startNode: AIPathNode<T>, endNode: AIPathNode<T>): Array<AIPathNode<T>> {
    const openList = new Array<AIPathNode<T>>();
    const closeList = new Array<AIPathNode<T>>();
    let currentNode: AIPathNode<T> | null = null;

    graph.reset();
    startNode.g = 0;
    startNode.h = this.heuristic(graph, startNode, endNode);
    startNode.f = startNode.g + startNode.h;

    openList.push(startNode);
    currentNode = startNode;

    while (openList.length > 0) {
      if (currentNode == endNode) {
        break;
      }

      for (let nid of currentNode.children) {
        const childNode = graph.getNode(nid);
        if (!childNode.walkable) {
          continue;
        }

        const isInCloseList = closeList.indexOf(childNode) != -1;
        if (isInCloseList) {
          continue;
        }

        const isInOpenList = openList.indexOf(childNode) != -1;
        const g = currentNode.g + this.heuristic(graph, currentNode, childNode);

        if (isInOpenList && g < childNode.g) {
          childNode.parent = currentNode;
          childNode.g = g;
          childNode.f = childNode.g + childNode.h;
          continue;
        }

        if (!isInOpenList) {
          childNode.parent = currentNode;
          childNode.g = g;
          childNode.h = this.heuristic(graph, childNode, endNode);
          childNode.f = childNode.g + childNode.h;
          openList.push(childNode);
        }
      }

      openList.splice(openList.indexOf(currentNode), 1);
      closeList.push(currentNode);

      const openListSorted = openList.sort((a, b) => a.f - b.f);
      currentNode = openListSorted[0];
    }

    if (currentNode != endNode) {
      return [];
    }

    const path: Array<AIPathNode<T>> = [];
    let node = endNode;

    while (node) {
      path.unshift(node);
      node = node.parent!;
    }

    return path;
  }

  /**
   * Calculates the distance between two nodes in a graph.
   * 
   * @param graph - The path graph.
   * @param nodeA - The node A.
   * @param nodeB - The node B.
   */
  heuristic(graph: AIPathGraph<T>, nodeA: AIPathNode<T>, nodeB: AIPathNode<T>): number {
    return graph.getDistance(nodeA, nodeB);
  }
}

export { AIPathGraphSolver };