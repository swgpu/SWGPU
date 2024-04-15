import { inputManager } from '../../lib/input/input_manager';
import { gfx3DebugRenderer } from '../../lib/gfx3/gfx3_debug_renderer';
import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { UT } from '../../lib/core/utils';
import { Gfx3MeshJAM } from '../../lib/gfx3_mesh/gfx3_mesh_jam';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3PhysicsJNM } from '../../lib/gfx3_physics/gfx3_physics_jnm';
import { Gfx3CameraOrbit } from '../../lib/gfx3_camera/gfx3_camera_orbit';
// ---------------------------------------------------------------------------------------

class InputComponent {
  character: Character;
  camera: Gfx3CameraOrbit;

  constructor(character: Character, camera: Gfx3CameraOrbit) {
    this.character = character;
    this.camera = camera;
  }

  update(ts: number) {
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
  character: Character;
  mapJNM: Gfx3PhysicsJNM;
  lift: number;
  radius: number;
  height: number;
  frictionCoefficient: number;
  gravityCoefficient: number;
  gravityMax: number;

  constructor(character: Character, mapJNM: Gfx3PhysicsJNM) {
    this.character = character;
    this.mapJNM = mapJNM;
    this.lift = 0.8;
    this.radius = 0.5;
    this.height = 1;
    this.frictionCoefficient = 0.99999999;
    this.gravityCoefficient = 0.8;
    this.gravityMax = 10;
  }

  update(ts: number) {
    const velocity = UT.VEC3_SCALE(this.character.dir, this.character.speed);
    this.character.velocity[0] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), velocity[0], this.character.velocity[0]);
    this.character.velocity[2] = UT.LINEAR(Math.pow(1 - this.frictionCoefficient, ts / 1000), velocity[2], this.character.velocity[2]);

    if (UT.VEC3_LENGTH(this.character.velocity) > 0.1) {
      const move = UT.VEC3_SCALE(this.character.velocity, ts / 1000);

      const navInfo = this.mapJNM.box(
        this.character.position[0],
        this.character.position[1] + this.height * 0.5,
        this.character.position[2],
        this.radius,
        this.height,
        move[0],
        move[1],
        move[2],
        this.lift
      );

      this.character.position[0] += navInfo.move[0];
      this.character.position[1] += navInfo.move[1];
      this.character.position[2] += navInfo.move[2]; 

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
    const min: vec3 = [
      this.character.position[0] - this.radius,
      this.character.position[1],
      this.character.position[2] - this.radius
    ];

    const max: vec3 = [
      this.character.position[0] + this.radius,
      this.character.position[1] + this.height,
      this.character.position[2] + this.radius
    ];
  
    gfx3DebugRenderer.drawBoundingBox(UT.MAT4_IDENTITY(), min, max);
  }
}

class Character {
  position: vec3;
  dir: vec3;
  velocity: vec3;
  rotation: number;
  speed: number;
  jam: Gfx3MeshJAM;
  input: InputComponent;
  physics: PhysicsComponent;

  constructor(mapJNM: Gfx3PhysicsJNM, camera: Gfx3CameraOrbit) {
    this.position = [0, 0, 0];
    this.dir = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.rotation = 0;
    this.speed = 7;
    this.jam = new Gfx3MeshJAM();
    this.input = new InputComponent(this, camera);
    this.physics = new PhysicsComponent(this, mapJNM);
  }

  async loadFromFile(jamPath: string, texturePath: string): Promise<void> {
    await this.jam.loadFromFile(jamPath);
    this.jam.play('IDLE', true);
    this.jam.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTexture(texturePath)
    }));
  }

  update(ts: number): void {
    this.input.update(ts);
    this.physics.update(ts);

    this.jam.setPosition(this.position[0], this.position[1], this.position[2]);
    this.jam.setRotation(0, this.rotation, 0);

    if (UT.VEC3_LENGTH(this.velocity) > 0.1) {
      this.jam.play('RUN', true, true);
    }
    else {
      this.jam.play('IDLE', true, true);
    }

    this.jam.update(ts);
  }

  draw(): void {
    this.jam.draw();
    this.physics.draw();
  }
}

export { Character };