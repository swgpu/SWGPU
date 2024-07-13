import { UT } from '@lib/core/utils';
// ---------------------------------------------------------------------------------------

export class PlayerPhysics {
  constructor(player, jnm) {
    this.player = player;
    this.jnm = jnm;
    // -------------------
    this.lift = 0.3;
    this.radius = 0.5;
    this.frictionCoefficient = 0.999999999;
    this.gravity = 32;
  }

  update(ts) {
    const velocity = UT.VEC3_SCALE(this.player.dir, this.player.maxSpeed);
    this.player.velocity[0] = velocity[0];
    this.player.velocity[2] = velocity[2];

    if (this.player.jump) {
      this.player.velocity[1] = this.player.jumpStrength;
      this.player.jump = false;
    }

    const mx = this.player.velocity[0] * (ts / 1000);
    const my = this.player.velocity[1] * (ts / 1000);
    const mz = this.player.velocity[2] * (ts / 1000);
    const snapFloor = my <= 0;
    const snapDistance = my <= 0 ? 0.1 : 0.01;

    if (UT.VEC3_LENGTH(this.player.velocity) > 0) {
      const navInfo = this.jnm.box(
        this.player.x,
        this.player.y,
        this.player.z,
        this.radius,
        this.player.height,
        mx,
        my,
        mz,
        this.lift,
        snapFloor,
        snapDistance
      );

      this.player.x += navInfo.move[0];
      this.player.y += navInfo.move[1];
      this.player.z += navInfo.move[2];

      if (this.player.velocity[1] < 0 && navInfo.collideFloor) {
        this.player.velocity[1] = 0;
      }

      if (this.player.velocity[1] > 0 && navInfo.collideTop) {
        this.player.velocity[1] = 0;
      }

      if (!navInfo.collideFloor) {
        this.player.velocity[1] = UT.LERP(this.player.velocity[1], -this.gravity, ts / 1000);
      }
    }
  }
}