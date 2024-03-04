import { gfx2Manager } from '../../lib/gfx2/gfx2_manager';
import { Gfx2SpriteJAS } from '../../lib/gfx2_sprite/gfx2_sprite_jas';
import { Gfx2Drawable } from '../../lib/gfx2/gfx2_drawable';
// ---------------------------------------------------------------------------------------
import { MotionInterpolation} from './motion_interpolation';
// ---------------------------------------------------------------------------------------

class Controller extends Gfx2Drawable {
  constructor() {
    super();
    this.sprite = new Gfx2SpriteJAS();
    this.direction = 'FORWARD';
    this.speed = 3;
    this.motion = new MotionInterpolation();
  }

  update(ts) {
    const prevPosition = this.position;

    if (this.motion.isRunning()) {
      this.position = this.motion.getPosition(ts);

      if (prevPosition[0] > this.position[0] && prevPosition[1] < this.position[1]) {
        this.direction = 'LEFT';
      }
      else if (prevPosition[0] < this.position[0] && prevPosition[1] > this.position[1]) {
        this.direction = 'RIGHT';
      }
      else if (prevPosition[0] > this.position[0] && prevPosition[1] > this.position[1]) {
        this.direction = 'FORWARD';
      }
      else if (prevPosition[0] < this.position[0] && prevPosition[1] < this.position[1]) {
        this.direction = 'BACKWARD';
      }

      if (this.motion.isJumping()) {
        this.sprite.play('JUMP_' + this.direction, false, true);
      }
      else {
        this.sprite.play('RUN_' + this.direction, true, true);
      }
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

  moveAlong(positions, elevations, onUpdate) {
    this.motion = new MotionInterpolation(positions, elevations, this.speed, 16, onUpdate);
    this.motion.run();
  }
}

export { Controller };