import { UT } from '../core/utils';

export interface AIPathNode<T> {
  pos: T;
  walkable: boolean;
  children: Array<string>;
  parent?: AIPathNode<T> | null;
  data?: Object | null;
  g: number;
  h: number;
  f: number;
};

abstract class AIPathGraph<T> {  
  nodes: Map<string, AIPathNode<T>>;

  constructor(nodes = new Map<string, AIPathNode<T>>()) {
    this.nodes = nodes;
  }

  abstract getDistance(a: AIPathNode<T>, b: AIPathNode<T>): number;

  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'ASTAR_GRAPH') {
      throw new Error('AStarGraph<T>::loadFromFile(): File not valid !');
    }

    this.nodes.clear();

    for (const nid in json['Nodes']) {
      this.nodes.set(nid, {
        pos: json['Nodes'][nid]['Pos'],
        walkable: json['Nodes'][nid]['Walkable'],
        children: json['Nodes'][nid]['Children'],
        g: 0,
        h: 0,
        f: 0
      });
    }
  }

  getNode(nid: string): AIPathNode<T> {
    const node = this.nodes.get(nid);
    if (!node) {
      throw new Error('AStarGraph::getNode(): Node not exist !');
    }

    return node;
  }

  addNode(nid: string, node: AIPathNode<T>, biRelations: boolean = true): AIPathNode<T> {
    const found = this.nodes.get(nid);
    if (found) {
      throw new Error('AStarGraph::addNode(): Node already exist !');
    }

    this.nodes.set(nid, node);

    if (biRelations) {
      for (const cnid of node.children) {
        const childNode = this.nodes.get(cnid);
        if (childNode) {
          childNode.children.push(nid);
        }
      }
    }

    return node;
  }

  removeNode(nid: string): void {
    const node = this.nodes.get(nid);
    if (!node) {
      throw new Error('AStarGraph::removeNode(): Node not found !');
    }

    this.nodes.delete(nid);

    for (const cnid of node.children) {
      const childNode = this.nodes.get(cnid);
      if (!childNode) {
        continue;
      }

      const index = childNode.children.indexOf(nid);
      if (index != -1) {
        childNode.children.splice(index, 1);
      }
    }
  }

  setNodeProperties(nid: string, properties: Partial<AIPathNode<T>>): void {
    const node = this.nodes.get(nid);
    if (!node) {
      throw new Error('AStarGraph::setNodeProperties(): Node not found !');
    }

    Object.assign(node, properties);
  }

  removeNodeRelation(nid: string, cnid: string): void {
    const node = this.nodes.get(nid);
    if (!node) {
      throw new Error('AStarGraph::removeNodeRelation(): Node not found !');
    }

    const index = node.children.indexOf(cnid);
    if (index == -1) {
      throw new Error('AStarGraph::removeNodeRelation(): Node children not found !');
    }

    node.children.splice(index, 1);
  }

  findNode(predicateFn: Function): AIPathNode<T> | null {
    for (const value of this.nodes.values()) {
      if (predicateFn(value)) {
        return value;
      }
    }

    return null;
  }

  findNodes(predicateFn: Function): Array<AIPathNode<T>> {
    const res = new Array<AIPathNode<T>>();

    for (const value of this.nodes.values()) {
      if (predicateFn(value)) {
        res.push(value);
      }
    }

    return res;
  }

  reset(): void {
    for (const node of this.nodes.values()) {
      node.g = 0;
      node.h = 0;
      node.f = 0;
    }
  }
}

class AIPathGraph2D extends AIPathGraph<vec2> {
  constructor(nodes: Map<string, AIPathNode<vec2>>) {
    super(nodes);
  }

  getDistance(a: AIPathNode<vec2>, b: AIPathNode<vec2>): number {
    return UT.VEC2_DISTANCE(a.pos, b.pos);
  }
}

class AIPathGraph3D extends AIPathGraph<vec3> {
  constructor(nodes: Map<string, AIPathNode<vec3>>) {
    super(nodes);
  }

  getDistance(a: AIPathNode<vec3>, b: AIPathNode<vec3>): number {
    return UT.VEC3_DISTANCE(a.pos, b.pos);
  }
}

export { AIPathGraph, AIPathGraph2D, AIPathGraph3D };