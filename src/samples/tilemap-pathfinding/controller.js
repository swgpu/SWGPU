import { gfx2TextureManager } from '../../lib/gfx2/gfx2_texture_manager';
import { Gfx2Drawable } from '../../lib/gfx2/gfx2_drawable';
import { Gfx2SpriteJAS } from '../../lib/gfx2_sprite/gfx2_sprite_jas';
import { Motion } from '../../lib/motion/motion';
// ---------------------------------------------------------------------------------------

class Controller extends Gfx2Drawable {
  constructor() {
    super();
    this.jas = new Gfx2SpriteJAS();
    this.direction = 'FORWARD';
    this.speed = 50;
    this.width = 0;
    this.height = 0;
    this.motion = new Motion();
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
    const prev = this.motion.getPrevPoint();
    const next = this.motion.getNextPoint();

    if (this.motion.isRunning()) {
      this.position[0] = this.motion.getCurrentPositionX();
      this.position[1] = this.motion.getCurrentPositionZ();
    }

    if (prev[0] > next[0]) {
      this.direction = 'LEFT';
    }
    else if (prev[0] < next[0]) {
      this.direction = 'RIGHT';
    }
    else if (prev[2] > next[2]) {
      this.direction = 'FORWARD';
    }
    else if (prev[2] < next[2]) {
      this.direction = 'BACKWARD';
    }

    this.jas.setPosition(this.position[0], this.position[1]);
    this.jas.play(this.motion.isRunning() ? 'RUN_' + this.direction : 'IDLE_' + this.direction, true, true);
    this.jas.update(ts);
    this.motion.update(ts);
  }

  draw() {
    this.jas.draw();
  }

  moveAlong(path) {
    this.motion = new Motion(path, this.speed);
    this.motion.run();
  }
}

export { Controller };