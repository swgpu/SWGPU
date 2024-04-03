import { inputManager } from '../../lib/input/input_manager';
import { gfx3DebugRenderer } from '../../lib/gfx3/gfx3_debug_renderer';
import { UT } from '../../lib/core/utils';
import { Gfx3MeshJAM } from '../../lib/gfx3_mesh/gfx3_mesh_jam';
// ---------------------------------------------------------------------------------------

class InputComponent {
  update(ts, entity) {
    let moving = false;
    entity.dir = [0, 0, 0];

    if (inputManager.isActiveAction('LEFT')) {
      entity.dir = UT.VEC3_ADD(entity.dir, UT.VEC3_LEFT);
      moving = true;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      entity.dir = UT.VEC3_ADD(entity.dir, UT.VEC3_RIGHT);
      moving = true;
    }

    if (inputManager.isActiveAction('UP')) {
      entity.dir = UT.VEC3_ADD(entity.dir, UT.VEC3_FORWARD);
      moving = true;
    }

    if (inputManager.isActiveAction('DOWN')) {
      entity.dir = UT.VEC3_ADD(entity.dir, UT.VEC3_BACKWARD);
      moving = true;
    }

    if (moving) {
      entity.dir = UT.VEC3_NORMALIZE(entity.dir);
      entity.rotation = UT.VEC2_ANGLE([entity.dir[0], entity.dir[2]]);
    }
  }
}

class PhysicsComponent {
  constructor() {
    this.lift = 0.4;
    this.radius = 1;
    this.height = 1;
    this.frictionCoefficient = 0.99999999;
    this.gravityCoefficient = 0.8;
    this.gravityMax = 10;
  }

  update(ts, entity, jnm, otherEntities) {
    const velocity = UT.VEC3_SCALE(entity.dir, entity.movementSpeed);
    entity.velocity[0] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), velocity[0], entity.velocity[0]);
    entity.velocity[2] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), velocity[2], entity.velocity[2]);

    if (UT.VEC3_LENGTH(entity.velocity) > 0.1) {
      const move = UT.VEC3_SCALE(entity.velocity, ts / 1000);
      const navInfo = jnm.move(entity.graphics.jam.getWorldBoundingBox(), move, this.lift);

      if (navInfo.collideFloor) {
        entity.velocity[1] = 0;
      }
      else {
        entity.velocity[1] = UT.LINEAR(Math.pow(1 - this.gravityCoefficient, ts / 1000), -this.gravityMax, entity.velocity[1]);
      }

      entity.x += navInfo.move[0];
      entity.y += navInfo.move[1];
      entity.z += navInfo.move[2];  
    }
    else {
      entity.velocity = [0, 0, 0];
    }
  }
}

class GraphicsComponent {
  constructor() {
    this.jam = new Gfx3MeshJAM();
  }

  update(ts, entity) {
    this.jam.setPosition(entity.x, entity.y, entity.z);
    this.jam.setRotation(0, entity.rotation, 0);

    if (UT.VEC3_LENGTH(entity.velocity) > 0.1) {
      this.jam.play('RUN', true, true);
    }
    else {
      this.jam.play('IDLE', true, true);
    }

    this.jam.update(ts);
  }

  draw() {
    this.jam.draw();
    const aabb = this.jam.getWorldBoundingBox();
    gfx3DebugRenderer.drawBoundingBox(UT.MAT4_IDENTITY(), aabb.min, aabb.max);
  }
}

class Entity {
  constructor(graphics) {
    this.x = 0;
    this.y = 1;
    this.z = 0;
    this.dir = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.rotation = 0;
    this.movementSpeed = 7;


    this.input = new InputComponent();
    this.physics = new PhysicsComponent();
    this.graphics = graphics;
  }

  update(ts, jnm) {
    this.input.update(ts, this);
    this.physics.update(ts, this, jnm);
    this.graphics.update(ts, this);
  }

  draw() {
    this.graphics.draw();
  }
}

export { Entity, InputComponent, PhysicsComponent, GraphicsComponent };