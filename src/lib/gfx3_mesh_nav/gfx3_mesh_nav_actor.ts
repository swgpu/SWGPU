import { UT } from '../core/utils';
import { Gfx3BoundingBox } from '../gfx3/gfx3_bounding_box';
import { Gfx3MeshNav } from './gfx3_mesh_nav';

export interface Gfx3MeshNavActorOptions {
  position: vec3;
  rotation: number;
  radius: number;
  height: number;
  nav: Gfx3MeshNav;
  navLift?: number;
  gravityCoefficient?: number;
  gravityMax?: number;
  movementSpeed?: number;
  frictionCoefficient?: number;
  onWall?: Function;
  onFloor?: Function;
  onAir?: Function;
  onStop?: Function;
  onMoving?: Function;
};

class Gfx3MeshNavActor {
  position: vec3;
  rotation: number;
  radius: number;
  height: number;
  nav: Gfx3MeshNav;
  navLift: number;
  gravityCoefficient: number;
  gravityMax: number;
  movementSpeed: number;
  frictionCoefficient: number;



  onWall: Function;
  onFloor: Function;
  onAir: Function;
  onStop: Function;
  onMoving: Function;




  velocity: vec3;
  currentDir: vec3;
  currentMoving: boolean;

  constructor(options: Gfx3MeshNavActorOptions) {
    this.position = options.position ?? [0, 0, 0];
    this.rotation = options.rotation ?? 0;
    this.radius = options.radius ?? 0;


    this.nav = options.nav;
    this.navLift = options.navLift ?? 0.5;
    this.gravityCoefficient = options.gravityCoefficient ?? 0.8;
    this.gravityMax = options.gravityMax ?? 10;
    this.movementSpeed = options.movementSpeed ?? 10;
    this.frictionCoefficient = options.frictionCoefficient ?? 0.99;
    this.onWall = options.onWall ?? new Function();
    this.onFloor = options.onFloor ?? new Function();
    this.onAir = options.onAir ?? new Function();
    this.onStop = options.onStop ?? new Function();
    this.onMoving = options.onMoving ?? new Function();



    this.velocity = [0, 0, 0];
    this.currentDir = [0, 0, 0];
    this.currentMoving = false;

    this.
  }

  move(ts: number, vx: number, vy: number, vz: number): vec3 {
    const newVelocity = UT.VEC3_SCALE([vx, vy, vz], this.movementSpeed);
    this.velocity[0] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), newVelocity[0], this.velocity[0]);
    this.velocity[2] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), newVelocity[2], this.velocity[2]);

    if (UT.VEC3_LENGTH(this.velocity) > 0.1) {
      const move = UT.VEC3_SCALE(this.velocity, ts / 1000);
      const navInfo = this.nav.move(this.mesh.getWorldBoundingBox(), move, this.navLift);

      if (this.currentMoving) {
        this.rotation = UT.VEC2_ANGLE([vx, vz]);
      }

      if (navInfo.collideFloor) {
        this.velocity[1] = 0;
        this.onFloor();
      }
      else {
        this.velocity[1] = UT.LINEAR(Math.pow(1 - this.gravityCoefficient, ts / 1000), -this.gravityMax, this.velocity[1]);
        this.onAir();
      }

      if (navInfo.collideWall) {
        this.onWall();
      }

      if (navInfo.collideWall && !this.currentMoving) {
        this.velocity = [0, 0, 0];
        this.onStop();
      }
      else {
        this.mesh.translate(navInfo.move[0], navInfo.move[1], navInfo.move[2]);
        this.onMoving(navInfo.move);
      }
    }
    else {
      this.velocity = [0, 0, 0];
      this.onStop();
    }

    this.currentDir = [0, 0, 0];
    this.currentMoving = false;
  }
}

export { Gfx3MeshNavActor };