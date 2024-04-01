import { inputManager } from '../../lib/input/input_manager';
import { gfx3DebugRenderer } from '../../lib/gfx3/gfx3_debug_renderer';
import { UT } from '../../lib/core/utils';
import { Gfx3MeshJAM } from '../../lib/gfx3_mesh/gfx3_mesh_jam';
import { Gfx3MeshNavActor } from '../../lib/gfx3_mesh_nav/gfx3_mesh_nav_actor';

class Player extends Gfx3MeshJAM {
  constructor(nav) {
    super();
    this.nav = nav;
    this.navActor = new Gfx3MeshNavActor({ nav: nav });
  }

  async loadFromFile(path) {
    super.loadFromFile(path);
    this.navActor = new Gfx3MeshNavActor({
      nav: nav,
      mesh: this,
      navLift: 0.2,
      frictionCoefficient: 0.999999999999999,
      movementSpeed: 7,
      onMoving: () => this.onMoving(),
      onStop: () => this.onStop()
    });
  }

  update(ts) {
    let dir = [0, 0, 0];
    let moving = false;

    if (inputManager.isActiveAction('LEFT')) {
      dir = UT.VEC3_ADD(dir, UT.VEC3_LEFT);
      moving = true;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      dir = UT.VEC3_ADD(dir, UT.VEC3_RIGHT);
      moving = true;
    }

    if (inputManager.isActiveAction('UP')) {
      dir = UT.VEC3_ADD(dir, UT.VEC3_FORWARD);
      moving = true;
    }

    if (inputManager.isActiveAction('DOWN')) {
      dir = UT.VEC3_ADD(dir, UT.VEC3_BACKWARD);
      moving = true;
    }

    if (moving) {
      this.navActor.move(dir[0], dir[1], dir[2]);
    }

    this.navActor.update(ts);
    super.update(ts);
  }

  draw() {
    super.draw();
    const aabb = this.getWorldBoundingBox();
    gfx3DebugRenderer.drawBoundingBox(UT.MAT4_IDENTITY(), aabb.min, aabb.max);
  }

  onMoving() {
    this.play('RUN', true, true);
  }

  onStop() {
    this.play('IDLE', true, true);
  }
}

export { Player };