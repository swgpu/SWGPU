import { gfx3DebugRenderer } from '../../lib/gfx3/gfx3_debug_renderer';
import { Gfx3Transformable } from '../../lib/gfx3/gfx3_transformable';
// ---------------------------------------------------------------------------------------
import { DIRECTION } from './enums';
// ---------------------------------------------------------------------------------------

class Spawn extends Gfx3Transformable {
  constructor() {
    super();
    this.name = '';
    this.direction = DIRECTION.FORWARD;
    this.radius = 0.2;
  }

  async loadFromData(data) {
    this.name = data['Name'];
    this.position[0] = data['PositionX'];
    this.position[1] = data['PositionY'];
    this.position[2] = data['PositionZ'];
    this.direction = data['Direction'];
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