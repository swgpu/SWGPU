abstract class AIMinMaxTreeAbstract {
	visited: boolean;
  data: any;
  value: number;

  constructor() {
    this.visited = false;
    this.data = {};
    this.value = -Infinity;
  }

  setVisited(visited: boolean): void {
    this.visited = visited;
  }

  isVisited(): boolean {
		return this.visited;
	}

  setData(data: any): void {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }

  setValue(value: number): void {
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

class AIMinMaxLeaf extends AIMinMaxTreeAbstract {
	constructor(value: number) {
		super();
    this.value = value;
	}
}

class AIMinMaxNode extends AIMinMaxTreeAbstract {
  children: Array<AIMinMaxTreeAbstract>;

	constructor(children: Array<AIMinMaxTreeAbstract> = []) {
		super();
    this.children = children;
	}

  addChild(child: AIMinMaxTreeAbstract): void {
    this.children.push(child);
  }

  getChildren(): Array<AIMinMaxTreeAbstract> {
		return this.children;
	}
}

export { AIMinMaxTreeAbstract, AIMinMaxLeaf, AIMinMaxNode };