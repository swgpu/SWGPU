import { eventManager } from '@lib/core/event_manager';
import { inputManager } from '@lib/input/input_manager';
import { UT } from '@lib/core/utils';
// ---------------------------------------------------------------------------------------

export class PlayerInput {
  constructor(player, camera) {
    this.player = player;
    this.camera = camera;
    eventManager.subscribe(inputManager, 'E_MOUSE_MOVE', this, this.handleMouseMove);
    eventManager.subscribe(inputManager, 'E_ACTION_ONCE', this, this.handleActionOnce);
    eventManager.subscribe(inputManager, 'E_MOUSE_DOWN', this, this.handleMouseDown);
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

    if(this.player.rotation[0] > Math.PI / 2) {
      this.player.rotation[0] = Math.PI / 2;
    }
    else if(this.player.rotation[0] < -Math.PI / 2) {
      this.player.rotation[0] = -Math.PI / 2;
    }
    if(this.player.rotation[1] >= Math.PI * 2) {
      this.player.rotation[1] -= Math.PI * 2;
    }
    else if(this.player.rotation[1] <= -Math.PI * 2) {
      this.player.rotation[1] += Math.PI * 2;
    }
  }

  handleActionOnce(e) {
    if (e.actionId == 'SELECT') {
      this.player.jump = true;
    }
  }

  handleMouseDown() {
    this.player.shoot();
  }
}