import { inputManager } from '../../lib/input/input_manager';
import { uiManager } from '../../lib/ui/ui_manager';
import { UT } from '../../lib/core/utils';
import { Gfx3Camera } from '../../lib/gfx3_camera/gfx3_camera';
import { Gfx3BoundingBox } from '../../lib/gfx3/gfx3_bounding_box';
// ---------------------------------------------------------------------------------------

const GRAVITY_RATE = 1;
const GRAVITY_MAX = 10;
const PLAYER_WIDTH = 1;
const PLAYER_HEIGHT = 1.3;
const PLAYER_DEPTH = 1;
const PLAYER_SIZE = [PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_DEPTH];
const SPEED_MAX = 3;
const ACCEL_RATE = 0.5;
const ROTATION_SPEED = 0.001;
const WALK_OSCILLATION_LENGTH = 0.05;
const WALK_OSCILLATION_RATE = 0.01;

class FPSCamera extends Gfx3Camera {
  constructor(viewIndex, nav) {
    super(viewIndex);
    this.nav = nav;
    this.center = [0, 0, 0];
    this.currentDir = [0, 0];
    this.currentSpeed = 0;
    this.currentGravitySpeed = 0;
    this.walkOscillationAngle = 0;
    this.aabb = new Gfx3BoundingBox();
    this.view.setPerspectiveNear(0.1);

    this.crosshair = document.createElement('img');
    this.crosshair.src = 'samples/fps/crosshair.png';
    uiManager.addNode(this.crosshair, 'position:absolute; left:50%; top:50%; transform: translate(-50%,-50%);');

    this.handleClickedCb = this.handleClicked.bind(this);
    this.handlePointerLockChangeCb = this.handlePointerLockChange.bind(this);
    this.handleMouseMoveCb = this.handleMouseMove.bind(this);

    document.addEventListener('click', this.handleClickedCb);
    document.addEventListener('pointerlockchange', this.handlePointerLockChangeCb, false);
  }

  delete() {
    uiManager.removeNode(this.crosshair);
    document.removeEventListener('click', this.handleClickedCb);
    document.removeEventListener('pointerlockchange', this.handlePointerLockChangeCb, false);
    document.removeEventListener('mousemove', this.handleMouseMoveCb);
  }

  update(ts) {
    const cameraAxies = this.getLocalAxies();
    const dir = [0, 0];
    const velocity = [0, 0, 0];
    let moving = false;

    if (inputManager.isActiveAction('LEFT')) {
      dir[0] += cameraAxies[0][0] * -1;
      dir[1] += cameraAxies[0][2] * -1;
      moving = true;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      dir[0] += cameraAxies[0][0];
      dir[1] += cameraAxies[0][2];
      moving = true;
    }

    if (inputManager.isActiveAction('UP')) {
      dir[0] += cameraAxies[2][0] * -1;
      dir[1] += cameraAxies[2][2] * -1;
      moving = true;
    }

    if (inputManager.isActiveAction('DOWN')) {
      dir[0] += cameraAxies[2][0];
      dir[1] += cameraAxies[2][2];
      moving = true;
    }

    if (moving) {
      this.currentDir = dir;
      this.$increaseSpeed();
    }
    else {
      this.$decreaseSpeed();
    }

    if (this.currentSpeed > 0) {
      const ndir = UT.VEC2_NORMALIZE(this.currentDir);
      velocity[0] = ndir[0] * this.currentSpeed * (ts / 1000);
      velocity[2] = ndir[1] * this.currentSpeed * (ts / 1000);  
      this.walkOscillationAngle += ts * WALK_OSCILLATION_RATE;
    }

    if (this.currentGravitySpeed > 0) {
      velocity[1] = this.currentGravitySpeed * -1 * (ts / 1000);
    }

    if (velocity[0] != 0 || velocity[1] != 0 || velocity[2] != 0) {
      const navInfo = this.nav.move(this.center, PLAYER_SIZE, velocity);  
      velocity[0] = navInfo.move[0];
      velocity[1] = navInfo.move[1];
      velocity[2] = navInfo.move[2];

      if (navInfo.collideFloor) {
        this.$resetGravitySpeed();
      }
      else {
        this.$increaseGravitySpeed();
      }

      if (navInfo.collideWall && !moving) {
        this.currentSpeed = 0;
      }
    }

    this.center[0] += velocity[0];
    this.center[1] += velocity[1];
    this.center[2] += velocity[2];

    let walkOscillationY = Math.sin(this.walkOscillationAngle) * WALK_OSCILLATION_LENGTH * 0.5;
    this.setPosition(this.center[0], this.center[1] + walkOscillationY, this.center[2]);
  }

  setCenter(x, y, z) {
    this.center[0] = x;
    this.center[1] = y;
    this.center[2] = z;
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
    const newRotationY = e.movementX * ROTATION_SPEED;
    const newRotationX = e.movementY * ROTATION_SPEED;
    this.rotate(newRotationX, newRotationY, 0);
  }

  $increaseSpeed() {
    if (this.currentSpeed < SPEED_MAX) {
      this.currentSpeed += ACCEL_RATE;
    }
    else {
      this.currentSpeed = SPEED_MAX;
    }
  }

  $decreaseSpeed() {
    if (this.currentSpeed > 0) {
      this.currentSpeed -= ACCEL_RATE;
    }
    else {
      this.currentSpeed = 0;
    }
  }

  $increaseGravitySpeed() {
    if (this.currentGravitySpeed < GRAVITY_MAX) {
      this.currentGravitySpeed += GRAVITY_RATE;
    }
    else {
      this.currentGravitySpeed = GRAVITY_MAX;  
    }
  }

  $resetGravitySpeed() {
    this.currentGravitySpeed = 0;
  }
}

export { FPSCamera };