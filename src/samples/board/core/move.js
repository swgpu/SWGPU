class Move {
  constructor(options = {}) {
    this.path = options.path ?? [[1, 0]];
    this.numCapture = options.numCapture ?? 0;
    this.mustCapture = options.mustCapture ?? true;
    this.chainable = options.chainable ?? true;
    this.collateCapturable = options.collateCapturable ?? false;
  }

  getPath() {
    return this.path;
  }

  hasVector(vector) {
    return this.path.find(v => vector[0] == v[0] && vector[1] == v[1]);
  }

  getVector(i) {
    return this.path[i];
  }

  getPathLength() {
    return this.path.length;
  }

  getNumCapture() {
    return this.numCapture;
  }

  isForceCapture() {
    return this.mustCapture;
  }

  isChainable() {
    return this.chainable;
  }

  isCollateCapturable() {
    return this.collateCapturable;
  }
}

export { Move };