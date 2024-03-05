import { gfx2Manager } from '../../lib/gfx2/gfx2_manager';
import { Gfx2SpriteJAS } from '../../lib/gfx2_sprite/gfx2_sprite_jas';
import { Gfx2Drawable } from '../../lib/gfx2/gfx2_drawable';
import { Motion } from '../../lib/motion/motion';
// ---------------------------------------------------------------------------------------

const JUMP_STRENGHT = 16;

class Controller extends Gfx2Drawable {
  constructor() {
    super();
    this.sprite = new Gfx2SpriteJAS();
    this.direction = 'FORWARD';
    this.speed = 40;
    this.motion = new Motion();
    this.pathElevation = [];
    this.onRunning = (pointIndex, t) => {};
  }

  update(ts) {
    if (this.motion.isRunning()) {
      const previousElevation = this.pathElevation[this.motion.getPrevPointIndex()];
      const nextElevation = this.pathElevation[this.motion.getNextPointIndex()];
      const t = this.motion.getCurrentSegmentTime();
      const isJumping = previousElevation != nextElevation;
      const currentElevation = previousElevation + (nextElevation - previousElevation) * t;

      this.position[0] = this.motion.getCurrentPositionX();
      this.position[1] = this.motion.getCurrentPositionZ() - currentElevation;

      const prev = this.motion.getPrevPoint();
      const next = this.motion.getNextPoint();

      if (prev[0] > next[0] && prev[2] < next[2]) {
        this.direction = 'LEFT';
      }
      else if (prev[0] < next[0] && prev[2] > next[2]) {
        this.direction = 'RIGHT';
      }
      else if (prev[0] > next[0] && prev[2] > next[2]) {
        this.direction = 'FORWARD';
      }
      else if (prev[0] < next[0] && prev[2] < next[2]) {
        this.direction = 'BACKWARD';
      }

      if (isJumping) {
        this.position[1] -= POLYNOM_NORMALIZED(t) * JUMP_STRENGHT;
        this.sprite.play('JUMP_' + this.direction, false, true);
      }
      else {
        this.sprite.play('RUN_' + this.direction, true, true);
      }

      this.onRunning(this.motion.getPrevPointIndex(), t);
    }
    else {
      this.sprite.play('IDLE_' + this.direction, true, true);
    }

    this.sprite.update(ts);
    this.motion.update(ts);
  }

  draw() {
    const ctx = gfx2Manager.getContext();
    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    ctx.translate(-8, -32 - 4);
    this.sprite.draw();
    ctx.restore();
  }

  play(animation, looped) {
    this.sprite.play(animation, looped, true);
  }

  getDirection() {
    return this.direction;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  setSprite(sprite) {
    this.sprite = sprite;
  }

  moveAlong(path, pathElevation, onRunning) {
    this.pathElevation = pathElevation;
    this.motion = new Motion(path, this.speed);
    this.motion.run();
    this.onRunning = onRunning;
  }

  isJumping() {
    const previousPoint = this.motion.getPrevPointIndex();
    const nextPoint = this.motion.getNextPointIndex();
    const previousElevation = this.pathElevation[previousPoint];
    const nextElevation = this.pathElevation[nextPoint];
    return previousElevation != nextElevation;
  }
}

export { Controller };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function POLYNOM_NORMALIZED(x) {
  return -4 * x * x + 4 * x + 0;
}