import { uiManager } from '../../lib/ui/ui_manager';
import { eventManager } from '../../lib/core/event_manager';
import { inputManager } from '../../lib/input/input_manager';
import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { UT } from '../../lib/core/utils';
import { Gfx3MeshJSM } from '../../lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------

class InputComponent {
  constructor(player, camera) {
    this.player = player;
    this.camera = camera;
    eventManager.subscribe(inputManager, 'E_MOUSE_MOVE', this, this.handleMouseMove);
    eventManager.subscribe(inputManager, 'E_ACTION_ONCE', this, this.handleActionOnce);
  }

  delete() {
    eventManager.unsubscribe(inputManager, 'E_MOUSE_MOVE', this.handleMouseMove);
    eventManager.unsubscribe(inputManager, 'E_ACTION_ONCE', this.handleActionOnce);
  }

  update(ts) {
    const cameraAxies = this.camera.getAxies();
    let moving = false;

    this.player.dir = [0, 0, 0];

    if (inputManager.isActiveAction('LEFT')) {
      this.player.dir[0] += cameraAxies[0][0] * -1;
      this.player.dir[2] += cameraAxies[0][2] * -1;
      moving = true;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      this.player.dir[0] += cameraAxies[0][0];
      this.player.dir[2] += cameraAxies[0][2];
      moving = true;
    }

    if (inputManager.isActiveAction('UP')) {
      this.player.dir[0] += cameraAxies[2][0] * -1;
      this.player.dir[2] += cameraAxies[2][2] * -1;
      moving = true;
    }

    if (inputManager.isActiveAction('DOWN')) {
      this.player.dir[0] += cameraAxies[2][0];
      this.player.dir[2] += cameraAxies[2][2];
      moving = true;
    }

    if (moving) {
      this.player.dir = UT.VEC3_NORMALIZE(this.player.dir);
    }
  }

  handleMouseMove(e) {
    this.player.rotation[0] += e.movementY * this.player.rotationSpeed / 1000;
    this.player.rotation[1] += e.movementX * this.player.rotationSpeed / 1000;
  }

  handleActionOnce(e) {
    if (e.actionId == 'SELECT') {
      this.player.jump = true;
    }
  }
}

class PhysicsComponent {
  constructor(player, jnm) {
    this.player = player;
    this.jnm = jnm;
    // -------------------
    this.lift = 0.3;
    this.radius = 0.5;
    this.frictionCoefficient = 0.999999999;
    this.gravity = 0.8;
  }

  update(ts) {
    const velocity = UT.VEC3_SCALE(this.player.dir, this.player.maxSpeed);
    this.player.velocity[0] = UT.LERP_EXP(velocity[0], this.player.velocity[0], 1 - this.frictionCoefficient, ts / 1000);
    this.player.velocity[2] = UT.LERP_EXP(velocity[2], this.player.velocity[2], 1 - this.frictionCoefficient, ts / 1000);

    if (UT.VEC2_LENGTH([this.player.velocity[0], this.player.velocity[2]]) < 0.01) {
      this.player.velocity[0] = 0;
      this.player.velocity[2] = 0;
    }

    if (this.player.jump) {
      this.player.velocity[1] = this.player.jumpStrength;
      this.player.jump = false;
    }

    const speedXZ = UT.VEC2_LENGTH([this.player.velocity[0], this.player.velocity[2]]);
    const speedRatio = speedXZ / this.player.maxSpeed;

    const mx = speedRatio > 0 ? this.player.velocity[0] / speedRatio * (ts / 1000) : 0;
    const my = this.player.velocity[1] * (ts / 1000);
    const mz = speedRatio > 0 ? this.player.velocity[2] / speedRatio * (ts / 1000) : 0;

    if (UT.VEC3_LENGTH(this.player.velocity) > 0) {
      const navInfo = this.jnm.box(this.player.x, this.player.y, this.player.z, this.radius, this.player.height, mx, my, mz, this.lift, my <= 0);
      this.player.x += navInfo.move[0] * speedRatio;
      this.player.y += navInfo.move[1] * speedRatio;
      this.player.z += navInfo.move[2] * speedRatio;

      if (this.player.velocity[1] < 0 && navInfo.collideFloor) {
        this.player.velocity[1] = 0;
      }

      if (!navInfo.collideFloor) {
        this.player.velocity[1] -= this.gravity;
      }
    }
  }
}

class CameraComponent {
  constructor(player, camera) {
    this.player = player;
    this.camera = camera;
    this.crosshair = document.createElement('img');
    this.crosshair.src = 'samples/fps/crosshair.png';
    uiManager.addNode(this.crosshair, 'position:absolute; left:50%; top:50%; transform: translate(-50%,-50%);');
  }

  delete() {
    uiManager.removeNode(this.crosshair);
  }

  update(ts) {
    this.camera.setPosition(this.player.x, this.player.y + this.player.height / 2, this.player.z);
    this.camera.setRotation(this.player.rotation[0], this.player.rotation[1], this.player.rotation[2]);
  }
}

class WeaponComponent {
  static OSCILLATION_LENGTH = 0.05;
  static OSCILLATION_RATE = 7;
  
  constructor(player) {
    this.player = player;
    this.mesh = new Gfx3MeshJSM();
    this.oscillation = 0;
  }

  async load() {
    this.mesh = new Gfx3MeshJSM();
    await this.mesh.loadFromFile('./samples/fps/weapon.jsm');
    this.mesh.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTexture('./samples/fps/weapon.png')
    }));
  }

  delete() {
    this.mesh.delete();
  }

  update(ts) {
    if (this.player.dir[0] != 0 || this.player.dir[2] != 0) {
      this.oscillation += WeaponComponent.OSCILLATION_RATE * (ts / 1000);
    }

    const oscillationY = Math.sin(this.oscillation) * WeaponComponent.OSCILLATION_LENGTH * 0.5;
    this.mesh.setPosition(this.player.x, this.player.y + 0.5 + oscillationY, this.player.z);
    this.mesh.setRotation(this.player.rotation[0], this.player.rotation[1], this.player.rotation[2]);
    this.mesh.update(ts);
  }

  draw() {
    this.mesh.draw();
  }
}

class Player {
  constructor(jnm, camera) {
    this.input = new InputComponent(this, camera);
    this.camera = new CameraComponent(this, camera);
    this.physics = new PhysicsComponent(this, jnm);
    this.weapon = new WeaponComponent(this);
    // --------------------------------------------
    this.x = 0;
    this.y = 1;
    this.z = 1;
    this.height = 1.3;
    this.dir = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.maxSpeed = 7;
    this.rotationSpeed = 1;
    this.jump = false;
    this.jumpStrength = 10;
  }

  async load() {
    await this.weapon.load();
  }

  update(ts) {
    this.input.update(ts);
    this.physics.update(ts);
    this.camera.update(ts);
    this.weapon.update(ts);
  }

  draw() {
    this.weapon.draw();
  }
}

export { Player };