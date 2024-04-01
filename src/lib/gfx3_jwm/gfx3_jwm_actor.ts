import { UT } from '../core/utils';
import { Gfx3Mesh } from '../gfx3_mesh/gfx3_mesh';
import { Gfx3JWM } from './gfx3_jwm';

export interface Gfx3JWMActorOptions {
  id: string;
  mesh: Gfx3Mesh;
  jwm: Gfx3JWM;
  movementSpeed?: number;
  frictionCoefficient?: number;
  onWall?: Function;
  onStop?: Function;
  onMoving?: Function;
};

class Gfx3JWMActor {
  id: string;
  mesh: Gfx3Mesh;
  jwm: Gfx3JWM;
  movementSpeed: number;
  frictionCoefficient: number;
  onWall: Function;
  onStop: Function;
  onMoving: Function;
  velocity: vec2;
  currentDir: vec2;
  currentMoving: boolean;

  constructor(options: Gfx3JWMActorOptions) {
    this.id = options.id;
    this.mesh = options.mesh;
    this.jwm = options.jwm;
    this.movementSpeed = options.movementSpeed ?? 10;
    this.frictionCoefficient = options.frictionCoefficient ?? 0.99;
    this.onWall = () => {};
    this.onStop = () => {};
    this.onMoving = () => {};
    this.velocity = [0, 0];
    this.currentDir = [0, 0];
    this.currentMoving = false;
    // this.jwm.addWalker(this.id, this.mesh.getPositionX(), this.mesh.getPositionZ(), this..getRadius()); // replace radius by aabb.
  }

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    this.jwm.deleteWalker(this.id);
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    const newVelocity = UT.VEC2_SCALE(this.currentDir, this.movementSpeed);
    this.velocity[0] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), newVelocity[0], this.velocity[0]);
    this.velocity[1] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), newVelocity[1], this.velocity[1]);

    if (UT.VEC2_LENGTH(this.velocity) > 0.1) {
      const move = UT.VEC2_SCALE(this.velocity, ts / 1000);
      const navInfo = this.jwm.moveWalker(this.id, move[0], move[1]);

      if (this.currentMoving) {
        this.mesh.setRotation(this.mesh.getRotationX(), UT.VEC2_ANGLE([this.currentDir[0], this.currentDir[1]]), this.mesh.getRotationZ());
      }

      if (navInfo.collide) {
        this.onWall();
      }

      if (navInfo.collide && !this.currentMoving) {
        this.velocity = [0, 0];
        this.onStop();
      }
      else {
        this.mesh.translate(navInfo.move[0], navInfo.move[1], navInfo.move[2]);
        this.onMoving(navInfo.move);
      }
    }
    else {
      this.velocity = [0, 0];
      this.onStop();
    }

    this.currentDir = [0, 0];
    this.currentMoving = false;
  }

  /**
   * Move the mesh.
   * 
   * @param {number} vx - The horizontal movement.
   * @param {number} vz - The depth movement.
   */
  move(vx: number, vz: number): void {
    this.currentDir = [vx, vz];
    this.currentMoving = true;
  }
}

export { Gfx3JWMActor };