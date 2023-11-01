import { eventManager } from '../../../lib/core/event_manager';
import { Gfx3Camera } from '../../../lib/gfx3_camera/gfx3_camera';
import { UT } from '../../../lib/core/utils';
// ---------------------------------------------------------------------------------------

class BattleCamera extends Gfx3Camera {
  constructor() {
    super(0);
    this.timeElapsed = 0;

    this.originPos = [0, 0, 0]; // utilisation de originPos en plus de animationFromPos en vue d'intégrer des traveling multiple dans une seule animation
    this.originLookAt = [0, 0, 0]; // idem pour cette ligne

    this.animationFromPos = [0, 0, 0];
    this.animationFromLookAt = [0, 0, 0];

    this.animationDestPos = [0, 0, 0];
    this.animationDestLookAt = [0, 0, 0];

    this.animationDuration = 1;
    this.playing = false;
  }

  update(ts) {
    if (!this.playing) {
      return;
    }

    if (UT.VEC3_ISEQUAL(this.animationDestPos, this.animationFromPos)) {
      return;
    }

    if (this.timeElapsed < this.animationDuration) {
      const t = this.timeElapsed / this.animationDuration;

      const delta = UT.VEC3_SUBSTRACT(this.animationDestPos, this.animationFromPos);
      const deltaHalf = UT.VEC3_SCALE(delta, 0.5);
      const middlePoint = UT.VEC3_ADD(this.animationFromPos, deltaHalf);
      const invDeltaHalf = UT.VEC3_CREATE(-deltaHalf[2], deltaHalf[1], deltaHalf[0]);
      const handlePosition = UT.VEC3_ADD(middlePoint, invDeltaHalf);      
      const currentPos = UT.VEC3_QUADRATIC_BEZIER(this.animationFromPos, handlePosition, this.animationDestPos, t);

      const deltaLookAt = UT.VEC3_SUBSTRACT(this.animationDestLookAt, this.animationFromLookAt);
      const currentLookAt = UT.VEC3_ADD(this.animationFromLookAt, UT.VEC3_SCALE(deltaLookAt, t));

      super.setPosition(currentPos[0], currentPos[1], currentPos[2]);
      super.lookAt(currentLookAt[0], currentLookAt[1], currentLookAt[2]);
      this.timeElapsed += ts;
    }
    else {
      eventManager.emit(this, 'E_FINISHED');
      this.playing = false;
      this.timeElapsed = 0;
    }
  }

  play(animationDestPos, animationDestLookAt, animationDuration) {
    if (UT.VEC3_ISEQUAL(animationDestPos, this.originPos)) {
      return;
    }

    this.animationFromPos = this.originPos;
    this.animationFromLookAt = this.originLookAt;
    
    this.animationDestPos = animationDestPos;
    this.animationDestLookAt = animationDestLookAt;

    this.animationDuration = animationDuration;
    this.playing = true;
  }

  playBack(animationDuration = this.animationDuration) {
    if (UT.VEC3_ISEQUAL(this.animationFromPos, this.animationDestPos)) {
      return;
    }

    const tmp1 = this.animationFromPos;
    const tmp2 = this.animationFromLookAt;

    this.animationFromPos = this.animationDestPos;
    this.animationFromLookAt = this.animationDestLookAt;

    this.animationDestPos = tmp1;
    this.animationDestLookAt = tmp2;

    this.animationDuration = animationDuration;
    this.playing = true;
  }

  setPosition(x, y, z) {
    this.originPos = [x, y, z];
    super.setPosition(x, y, z);
  }

  setLookAt(x, y, z) {
    this.originLookAt = [x, y, z];
    super.lookAt(x, y, z);
  }
}

export { BattleCamera };