class MotionInterpolation {
  constructor(path, speed) {
    this.path = path;
    this.speed = speed;
    this.position = this.path[0];
    this.duration = this.path.length / this.speed;
    this.timeElapsed = 0;
  }

  update(ts) {
    this.timeElapsed += ts / 1000;
    if (this.timeElapsed >= this.duration) {
      this.position = this.path[this.path.length - 1];
      return;
    }

    let current = (this.timeElapsed / this.duration) * (this.path.length - 1);
    let index = Math.floor(current);

    let previous = this.path[index];
    let next = this.path[index + 1];

    this.position = [
      previous[0] + (next[0] - previous[0]) * (current - index),
      previous[1] + (next[1] - previous[1]) * (current - index),
    ];
  }

  getPosition() {
    return this.position;
  }

  isOngoing() {
    return this.timeElapsed < this.duration;
  }
}

export { MotionInterpolation };