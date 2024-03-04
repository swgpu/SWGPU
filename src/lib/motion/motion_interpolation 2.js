class MotionInterpolation {
  constructor(path = [], elevations = [], speed = 10, jumpStrenght = 16, onUpdate = () => {}) {
    this.path = path;
    this.elevations = elevations;
    this.speed = speed;
    this.jumpStrenght = jumpStrenght;
    this.position = this.path[0];
    this.duration = this.path.length / this.speed;
    this.timeElapsed = 0;
    this.jumping = false;
    this.running = false;
    this.onUpdate = onUpdate;
  }

  update(ts) {
    if (!this.running) {
      return;
    }

    this.timeElapsed += ts / 1000;
    if (this.timeElapsed >= this.duration) {
      this.running = false;
      this.jumping = false;
      this.position = this.path[this.path.length - 1];
      this.onUpdate(this.path.length - 1, this.path.length - 1);
      return;
    }

    const current = (this.timeElapsed / this.duration) * (this.path.length - 1);
    const index = Math.floor(current);

    const previous = this.path[index];
    const next = this.path[index + 1];
    const previousElevation = this.elevations[index];
    const nextElevation = this.elevations[index + 1];
    const currentElevation = previousElevation + (nextElevation - previousElevation) * (current - index);
    const x = previous[0] + (next[0] - previous[0]) * (current - index);
    const y = previous[1] + (next[1] - previous[1]) * (current - index);

    if (previousElevation != nextElevation) {
      this.jumping = true;
      this.position = [x, y - currentElevation - (POLYNOM_NORMALIZED(current - index) * this.jumpStrenght)];
    }
    else {
      this.jumping = false;
      this.position = [x, y - currentElevation];
    }

    this.onUpdate(index, index + current);    
  }

  getIndex() {
    const current = (this.timeElapsed / this.duration) * (this.path.length - 1);
    return Math.floor(current);
  }

  getPosition() {
    return this.position;
  }

  isRunning() {
    return this.running;
  }

  isJumping() {
    return this.jumping;
  }

  run() {
    this.running = true;
  }

  stop() {
    this.running = false;
  }
}

export { MotionInterpolation };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function POLYNOM_NORMALIZED(x) {
  return -4 * x * x + 4 * x + 0;
}