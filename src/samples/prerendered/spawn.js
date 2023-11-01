import { gfx3DebugRenderer } from '../../lib/gfx3/gfx3_debug_renderer';
import { Gfx3Transformable } from '../../lib/gfx3/gfx3_transformable';
// ---------------------------------------------------------------------------------------

class Spawn extends Gfx3Transformable {
  constructor() {
    super();
    this.name = '';
    this.direction = [0, 0];
    this.radius = 0.2;
  }

  async loadFromData(data) {
    this.name = data['Name'];
    this.position[0] = data['PositionX'];
    this.position[1] = data['PositionY'];
    this.position[2] = data['PositionZ'];
    this.direction[0] = data['DirectionX'];
    this.direction[1] = data['DirectionZ'];
  }

  draw() {
    gfx3DebugRenderer.drawSphere(this.getTransformMatrix(), this.radius, 2);
  }

  getName() {
    return this.name;
  }

  getDirection() {
    return this.direction;
  }

  getRadius() {
    return this.radius;
  }
}

export { Spawn };