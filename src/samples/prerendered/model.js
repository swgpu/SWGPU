import { eventManager } from '../../lib/core/event_manager';
import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { UT } from '../../lib/core/utils';
import { Gfx3Transformable } from '../../lib/gfx3/gfx3_transformable';
import { Gfx3MeshJAM } from '../../lib/gfx3_mesh/gfx3_mesh_jam';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------

class Model extends Gfx3Transformable {
  constructor() {
    super();
    this.jam = new Gfx3MeshJAM();
    this.radius = 0;
    this.height = 1;
    this.onActionBlockId = '';
  }

  async loadFromData(data) {
    await this.jam.loadFromFile(data['JAMFile']);
    this.jam.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture(data['TextureFile']) }));
    this.jam.play('IDLE', true);
    this.position[0] = data['PositionX'];
    this.position[1] = data['PositionY'];
    this.position[2] = data['PositionZ'];
    this.rotation[0] = data['RotationX'];
    this.rotation[1] = data['RotationY'];
    this.rotation[2] = data['RotationZ'];
    this.radius = data['Radius'];
    this.height = data['Height'];
    this.onActionBlockId = data['OnActionBlockId'];
  }

  delete() {
    this.jam.delete();
  }

  update(ts) {
    this.jam.setPosition(this.position[0], this.position[1], this.position[2]);
    this.jam.setRotation(this.rotation[0], this.rotation[1], this.rotation[2]);
    this.jam.update(ts);
  }

  draw() {
    this.jam.draw();
  }

  move(mx, mz) {
    const old = this.position.slice();
    this.position[0] += mx;
    this.position[2] += mz;
    this.rotation[1] = UT.VEC2_ANGLE([mx, mz]);
    eventManager.emit(this, 'E_MOVED', { old: old, moveX: mx, moveZ: mz });
  }

  play(animationName) {
    this.jam.play(animationName, true, true);
  }

  getRadius() {
    return this.radius;
  }

  getHeight() {
    return this.height;
  }

  getHandPosition() {
    return [
      this.position[0] + Math.cos(this.rotation[1]) * this.radius * 1.5,
      this.position[1],
      this.position[2] + Math.sin(this.rotation[1]) * this.radius * 1.5
    ]
  }

  getOnActionBlockId() {
    return this.onActionBlockId;
  }

  isCollide(other, velocityImpact) {
    return UT.COLLIDE_CYLINDER(
      this.position,
      this.radius,
      this.height,
      other.getPosition(),
      other.getRadius(),
      other.getHeight(),
      velocityImpact
    );
  }

  isHandCollide(other) {
    return UT.COLLIDE_CYLINDER(
      this.getHandPosition(),
      0,
      this.height,
      other.getPosition(),
      other.getRadius(),
      other.getHeight()
    );
  }
}

export { Model };