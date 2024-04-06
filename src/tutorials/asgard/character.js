import { inputManager } from '../../lib/input/input_manager';
import { gfx3DebugRenderer } from '../../lib/gfx3/gfx3_debug_renderer';
import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { UT } from '../../lib/core/utils';
import { Gfx3MeshJAM } from '../../lib/gfx3_mesh/gfx3_mesh_jam';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------

class InputComponent {
  constructor(entity) {
    this.entity = entity;
  }

  update(ts) {
    let moving = false;
    this.entity.dir = [0, 0, 0];

    if (inputManager.isActiveAction('LEFT')) {
      this.entity.dir = UT.VEC3_ADD(this.entity.dir, UT.VEC3_LEFT);
      moving = true;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      this.entity.dir = UT.VEC3_ADD(this.entity.dir, UT.VEC3_RIGHT);
      moving = true;
    }

    if (inputManager.isActiveAction('UP')) {
      this.entity.dir = UT.VEC3_ADD(this.entity.dir, UT.VEC3_FORWARD);
      moving = true;
    }

    if (inputManager.isActiveAction('DOWN')) {
      this.entity.dir = UT.VEC3_ADD(this.entity.dir, UT.VEC3_BACKWARD);
      moving = true;
    }

    if (moving) {
      this.entity.dir = UT.VEC3_NORMALIZE(this.entity.dir);
      this.entity.rotation = UT.VEC2_ANGLE([this.entity.dir[0], this.entity.dir[2]]);
    }
  }
}

class PhysicsComponent {
  constructor(entity, jnm) {
    this.entity = entity;
    this.jnm = jnm;
    // -------------------
    this.lift = 0.4;
    this.radius = 1;
    this.height = 1;
    this.frictionCoefficient = 0.99999999;
    this.gravityCoefficient = 0.8;
    this.gravityMax = 10;
  }

  update(ts) {
    const velocity = UT.VEC3_SCALE(this.entity.dir, this.entity.movementSpeed);
    this.entity.velocity[0] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), velocity[0], this.entity.velocity[0]);
    this.entity.velocity[2] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), velocity[2], this.entity.velocity[2]);

    if (UT.VEC3_LENGTH(this.entity.velocity) > 0.1) {
      const move = UT.VEC3_SCALE(this.entity.velocity, ts / 1000);
      const navInfo = this.jnm.box([this.entity.x, this.entity.y, this.entity.z], move[0], move[1], move[2], this.radius, this.height, this.lift);
      this.entity.x += navInfo.move[0];
      this.entity.y += navInfo.move[1];
      this.entity.z += navInfo.move[2]; 

      if (navInfo.collideFloor) {
        this.entity.velocity[1] = 0;
      }
      else {
        this.entity.velocity[1] = UT.LINEAR(Math.pow(1 - this.gravityCoefficient, ts / 1000), -this.gravityMax, this.entity.velocity[1]);
      } 
    }
    else {
      this.entity.velocity = [0, 0, 0];
    }
  }

  draw() {
    const min = [this.entity.x - this.radius, this.entity.y - this.height * 0.5, this.entity.z - this.radius];
    const max = [this.entity.x + this.radius, this.entity.y + this.height * 0.5, this.entity.z + this.radius];
    gfx3DebugRenderer.drawBoundingBox(UT.MAT4_IDENTITY(), min, max);
  }
}

class GraphicsComponent {
  constructor(entity) {
    this.entity = entity;
    this.jam = new Gfx3MeshJAM();
  }

  update(ts) {
    this.jam.setPosition(this.entity.x, this.entity.y, this.entity.z);
    this.jam.setRotation(0, this.entity.rotation, 0);

    if (UT.VEC3_LENGTH(this.entity.velocity) > 0.1) {
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

class Character {
  constructor(jnm) {
    this.graphics = new GraphicsComponent(this);
    this.input = new InputComponent(this);
    this.physics = new PhysicsComponent(this, jnm);
    // -------------------------
    this.x = 0;
    this.y = 1;
    this.z = 0;
    this.dir = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.rotation = 0;
    this.movementSpeed = 7;
  }

  async load(jamPath, texturePath) {
    await this.graphics.jam.loadFromFile(jamPath);
    this.graphics.jam.play('IDLE', true);
    this.graphics.jam.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTexture(texturePath)
    }));
  }

  update(ts) {
    this.input.update(ts);
    this.physics.update(ts);
    this.graphics.update(ts);
  }

  draw() {
    this.graphics.draw();
    this.physics.draw();
  }
}

export { Character };