import { eventManager } from '../../lib/core/event_manager';
import { gfx2TextureManager } from '../../lib/gfx2/gfx2_texture_manager';
import { Gfx2Drawable } from '../../lib/gfx2/gfx2_drawable';
import { Gfx2SpriteJAS } from '../../lib/gfx2_sprite/gfx2_sprite_jas';
// ---------------------------------------------------------------------------------------

class Controller extends Gfx2Drawable {
  constructor() {
    super();
    this.jas = new Gfx2SpriteJAS();
    this.direction = 'FORWARD';
    this.speed = 0.05;
    this.width = 0;
    this.height = 0;
    this.collider1 = [0, 0];
    this.collider2 = [0, 0];
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    let json = await response.json();

    await this.jas.loadFromFile(json['JASFile']);
    this.jas.setTexture(await gfx2TextureManager.loadTexture(json['TextureFile']));
    this.jas.setOffset(json['OffsetX'], json['OffsetY']);
    this.width = json['Width'];
    this.height = json['Height'];
    this.collider1[0] = json['Collider1X'];
    this.collider1[1] = json['Collider1Y'];
    this.collider2[0] = json['Collider2X'];
    this.collider2[1] = json['Collider2Y'];
  }

  update(ts) {
    this.jas.setPosition(this.position[0], this.position[1]);
    this.jas.update(ts);
  }

  draw() {
    this.jas.draw();
  }

  play(animationName, looped) {
    this.jas.play(animationName, looped, true);
  }

  setDirection(direction) {
    this.direction = direction;
  }

  getDirection() {
    return this.direction;
  }

  getSpeed() {
    return this.speed;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getCollider1X() {
    return this.collider1[0];
  }

  getCollider1Y() {
    return this.collider1[1];
  }

  getCollider2X() {
    return this.collider2[0];
  }

  getCollider2Y() {
    return this.collider2[1];
  }
}

export { Controller };