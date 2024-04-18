import { uiManager } from '../../lib/ui/ui_manager';
import { inputManager } from '../../lib/input/input_manager';
import { UT } from '../../lib/core/utils';
// ---------------------------------------------------------------------------------------

class InputComponent {
  constructor(player, camera) {
    this.player = player;
    this.camera = camera;
    this.handleClickedCb = this.handleClicked.bind(this);
    this.handlePointerLockChangeCb = this.handlePointerLockChange.bind(this);
    this.handleMouseMoveCb = this.handleMouseMove.bind(this);

    document.addEventListener('click', this.handleClickedCb);
    document.addEventListener('pointerlockchange', this.handlePointerLockChangeCb, false);
  }

  delete() {
    document.removeEventListener('click', this.handleClickedCb);
    document.removeEventListener('pointerlockchange', this.handlePointerLockChangeCb, false);
    document.removeEventListener('mousemove', this.handleMouseMoveCb);
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

  async handleClicked(e) {
    if (!document.pointerLockElement) {
      await document.body.requestPointerLock({
        unadjustedMovement: true,
      });
    }
  }

  handlePointerLockChange(e) {
    if (document.pointerLockElement == document.body) {
      document.addEventListener('mousemove', this.handleMouseMoveCb, false);
    }
    else {
      document.removeEventListener('mousemove', this.handleMouseMoveCb, false);
    }
  }

  handleMouseMove(e) {
    this.player.rotation[0] += e.movementY * this.player.rotationSpeed / 1000;
    this.player.rotation[1] += e.movementX * this.player.rotationSpeed / 1000;
  }
}

class PhysicsComponent {
  constructor(player, jnm) {
    this.player = player;
    this.jnm = jnm;
    // -------------------
    this.lift = 0.3;
    this.radius = 0.5;
    this.frictionCoefficient = 0.99999999;
    this.gravityCoefficient = 0.8;
    this.gravityMax = 10;
  }

  update(ts) {
    const velocity = UT.VEC3_SCALE(this.player.dir, this.player.movementSpeed);
    this.player.velocity[0] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), velocity[0], this.player.velocity[0]);
    this.player.velocity[2] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), velocity[2], this.player.velocity[2]);

    if (UT.VEC3_LENGTH(this.player.velocity) > 0.1) {
      const move = UT.VEC3_SCALE(this.player.velocity, ts / 1000);
      const navInfo = this.jnm.box(this.player.x, this.player.y, this.player.z, this.radius, this.player.height, move[0], move[1], move[2], this.lift, true, 0.1);

      this.player.x += navInfo.move[0];
      this.player.y += navInfo.move[1];
      this.player.z += navInfo.move[2];

      if (navInfo.collideFloor) {
        this.player.velocity[1] = 0;
      }
      else {
        this.player.velocity[1] = UT.LINEAR(Math.pow(1 - this.gravityCoefficient, ts / 1000), -this.gravityMax, this.player.velocity[1]);
      }

      if (this.player.dir[0] == 0 && this.player.dir[2] == 0 && navInfo.collideWall) {
        this.player.velocity[0] = 0;
        this.player.velocity[2] = 0;
      }
    }
    else {
      this.player.velocity = [0, 0, 0];
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

class Player {
  constructor(jnm, camera) {
    this.input = new InputComponent(this, camera);
    this.camera = new CameraComponent(this, camera);
    this.physics = new PhysicsComponent(this, jnm);
    // --------------------------------------------
    this.x = 0;
    this.y = 1;
    this.z = 0;
    this.height = 1.3;
    this.dir = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.movementSpeed = 7;
    this.rotationSpeed = 1;
  }

  async load() {
    // can be used to load weapon or whatever.
  }

  update(ts) {
    this.input.update(ts);
    this.physics.update(ts);
    this.camera.update(ts);
  }
}

export { Player };