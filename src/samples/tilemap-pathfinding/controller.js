import { gfx2TextureManager} from '../../lib/gfx2/gfx2_texture_manager';
import { Gfx2Drawable} from '../../lib/gfx2/gfx2_drawable';
import { Gfx2SpriteJAS} from '../../lib/gfx2_sprite/gfx2_sprite_jas';
// ---------------------------------------------------------------------------------------
import { MotionInterpolation} from './motion_interpolation';
// ---------------------------------------------------------------------------------------

class Controller extends Gfx2Drawable {
  constructor() {
    super();
    this.jas = new Gfx2SpriteJAS();
    this.direction = 'FORWARD';
    this.speed = 3;
    this.width = 0;
    this.height = 0;
    this.motion = null;
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    let json = await response.json();

    await this.jas.loadFromFile(json['JASFile']);
    this.jas.setTexture(await gfx2TextureManager.loadTexture(json['TextureFile']));
    this.jas.setOffset(json['OffsetX'], json['OffsetY']);
    this.width = json['Width'];
    this.height = json['Height'];
  }

  update(ts) {
    let prevPosition = this.position;

    if (this.motion?.isOngoing()) {
      this.position = this.motion.getPosition(ts);
    }

    if (prevPosition[0] > this.position[0]) {
      this.direction = 'LEFT';
    }
    else if (prevPosition[0] < this.position[0]) {
      this.direction = 'RIGHT';
    }
    else if (prevPosition[1] > this.position[1]) {
      this.direction = 'FORWARD';
    }
    else if (prevPosition[1] < this.position[1]) {
      this.direction = 'BACKWARD';
    }

    this.jas.setPosition(this.position[0], this.position[1]);
    this.jas.play(this.motion?.isOngoing() ? 'RUN_' + this.direction : 'IDLE_' + this.direction, true, true);
    this.jas.update(ts);
    this.motion?.update(ts);
  }

  draw() {
    this.jas.draw();
  }

  moveAlong(path) {
    this.motion = new MotionInterpolation(path, this.speed);
  }
}

export { Controller };