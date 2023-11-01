import { gfx3DebugRenderer } from '../../lib/gfx3/gfx3_debug_renderer';
import { Gfx3Transformable } from '../../lib/gfx3/gfx3_transformable';
// ---------------------------------------------------------------------------------------

class Trigger extends Gfx3Transformable {
  constructor() {
    super();
    this.radius = 0;
    this.height = 1;
    this.hovered = false;
    this.onEnterBlockId = '';
    this.onLeaveBlockId = '';
    this.onActionBlockId = '';
  }

  async loadFromData(data) {
    this.position[0] = data['PositionX'];
    this.position[1] = data['PositionY'];
    this.position[2] = data['PositionZ'];
    this.radius = data['Radius'];
    this.onEnterBlockId = data['OnEnterBlockId'];
    this.onLeaveBlockId = data['OnLeaveBlockId'];
    this.onActionBlockId = data['OnActionBlockId'];
  }

  draw() {
    gfx3DebugRenderer.drawSphere(this.getTransformMatrix(), this.radius, 2);
  }

  getRadius() {
    return this.radius;
  }

  getHeight() {
    return this.height;
  }

  isHovered() {
    return this.hovered;
  }

  setHovered(hovered) {
    this.hovered = hovered;
  }

  getOnEnterBlockId() {
    return this.onEnterBlockId;
  }

  getOnLeaveBlockId() {
    return this.onLeaveBlockId;
  }

  getOnActionBlockId() {
    return this.onActionBlockId;
  }
}

export { Trigger };