import { inputManager } from '../../lib/input/input_manager';
import { gfx3DebugRenderer } from '../../lib/gfx3/gfx3_debug_renderer';
import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { UT } from '../../lib/core/utils';
import { Gfx3MeshJAM } from '../../lib/gfx3_mesh/gfx3_mesh_jam';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------

class InputAxisAlignedComponent {
  constructor(character) {
    this.character = character;
  }

  update(ts) {
    let moving = false;
    this.character.dir = [0, 0, 0];

    if (inputManager.isActiveAction('LEFT')) {
      this.character.dir = UT.VEC3_ADD(this.character.dir, UT.VEC3_LEFT);
      moving = true;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      this.character.dir = UT.VEC3_ADD(this.character.dir, UT.VEC3_RIGHT);
      moving = true;
    }

    if (inputManager.isActiveAction('UP')) {
      this.character.dir = UT.VEC3_ADD(this.character.dir, UT.VEC3_FORWARD);
      moving = true;
    }

    if (inputManager.isActiveAction('DOWN')) {
      this.character.dir = UT.VEC3_ADD(this.character.dir, UT.VEC3_BACKWARD);
      moving = true;
    }

    if (moving) {
      this.character.dir = UT.VEC3_NORMALIZE(this.character.dir);
      this.character.rotation = UT.VEC2_ANGLE([this.character.dir[0], this.character.dir[2]]);
    }
  }
}

class InputComponent {
  constructor(character, camera) {
    this.character = character;
    this.camera = camera;
  }

  update(ts) {
    let moving = false;
    let moveAngle = 0;

    this.character.dir = [0, 0, 0];

    if (inputManager.isActiveAction('LEFT')) {
      this.character.dir = UT.VEC3_ADD(this.character.dir, UT.VEC3_LEFT);
      moveAngle = -Math.PI / 2;
      moving = true;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      this.character.dir = UT.VEC3_ADD(this.character.dir, UT.VEC3_RIGHT);
      moveAngle = Math.PI / 2;
      moving = true;
    }

    if (inputManager.isActiveAction('UP')) {
      this.character.dir = UT.VEC3_ADD(this.character.dir, UT.VEC3_FORWARD);
      moveAngle = 0;
      moving = true;
    }

    if (inputManager.isActiveAction('DOWN')) {
      this.character.dir = UT.VEC3_ADD(this.character.dir, UT.VEC3_BACKWARD);
      moveAngle = -Math.PI;
      moving = true;
    }

    if (moving) {
      const phi = this.camera.getPhi();
      const x = Math.cos(phi + moveAngle);
      const z = Math.sin(phi + moveAngle);
      this.character.dir = [-x, 0, -z];
      this.character.rotation = UT.VEC2_ANGLE([this.character.dir[0], this.character.dir[2]]);
    }
  }
}

class PhysicsComponent {
  constructor(character, jnm) {
    this.character = character;
    this.jnm = jnm;
    // -------------------
    this.lift = 0.8;
    this.radius = 0.5;
    this.height = 0.5;
    this.frictionCoefficient = 0.99999999;
    this.gravityCoefficient = 0.8;
    this.gravityMax = 10;
  }

  update(ts) {
    const velocity = UT.VEC3_SCALE(this.character.dir, this.character.movementSpeed);
    this.character.velocity[0] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), velocity[0], this.character.velocity[0]);
    this.character.velocity[2] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), velocity[2], this.character.velocity[2]);

    if (UT.VEC3_LENGTH(this.character.velocity) > 0.1) {
      const move = UT.VEC3_SCALE(this.character.velocity, ts / 1000);
      const navInfo = this.jnm.box(this.character.x, this.character.y + this.height * 0.5, this.character.z, this.radius, this.height, move[0], move[1], move[2], this.lift);

      this.character.x += navInfo.move[0];
      this.character.y += navInfo.move[1];
      this.character.z += navInfo.move[2]; 

      if (navInfo.collideFloor) {
        this.character.velocity[1] = 0;
      }
      else {
        this.character.velocity[1] = UT.LINEAR(Math.pow(1 - this.gravityCoefficient, ts / 1000), -this.gravityMax, this.character.velocity[1]);
      }
    }
    else {
      this.character.velocity = [0, 0, 0];
    }
  }

  draw() {
    const min = [this.character.x - this.radius, this.character.y, this.character.z - this.radius];
    const max = [this.character.x + this.radius, this.character.y + this.height, this.character.z + this.radius];
    gfx3DebugRenderer.drawBoundingBox(UT.MAT4_IDENTITY(), min, max);
  }
}

class GraphicsComponent {
  constructor(character) {
    this.character = character;
    this.jam = new Gfx3MeshJAM();
  }

  update(ts) {
    this.jam.setPosition(this.character.x, this.character.y, this.character.z);
    this.jam.setRotation(0, this.character.rotation, 0);

    if (UT.VEC3_LENGTH(this.character.velocity) > 0.1) {
      this.jam.play('RUN', true, true);
    }
    else {
      this.jam.play('IDLE', true, true);
    }

    this.jam.update(ts);
  }

  draw() {
    this.jam.draw();
  }
}

class Character {
  constructor(jnm, camera) {
    this.graphics = new GraphicsComponent(this);
    this.input = new InputComponent(this, camera);
    this.physics = new PhysicsComponent(this, jnm);
    // --------------------------------------------
    this.x = 0;
    this.y = 0;
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