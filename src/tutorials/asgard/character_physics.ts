import { gfx3DebugRenderer } from '../../lib/gfx3/gfx3_debug_renderer';
import { dnaManager } from '../../lib/dna/dna_manager';
import { UT } from '../../lib/core/utils';
import { Gfx3PhysicsJNM } from '../../lib/gfx3_physics/gfx3_physics_jnm';
import { DNASystem } from '../../lib/dna/dna_system';
import { DNAComponent } from '../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { CharacterComponent } from './character';
// ---------------------------------------------------------------------------------------

export class CharacterPhysicsComponent extends DNAComponent {
  map: Gfx3PhysicsJNM;
  speed: number;
  lift: number;
  radius: number;
  height: number;
  frictionCoefficient: number;
  gravityCoefficient: number;
  gravityMax: number;

  constructor(map: Gfx3PhysicsJNM) {
    super('CharacterPhysics');
    this.map = map;
    this.speed = 7;
    this.lift = 0.8;
    this.radius = 0.5;
    this.height = 1;
    this.frictionCoefficient = 0.99999999;
    this.gravityCoefficient = 0.8;
    this.gravityMax = 10;
  }
}

export class CharacterPhysicsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('CharacterPhysics');
    super.addRequiredComponentTypename('Character');
  }

  onEntityUpdate(ts: number, eid: number) {
    const physics = dnaManager.getComponent(eid, 'CharacterPhysics') as CharacterPhysicsComponent;
    const character = dnaManager.getComponent(eid, 'Character') as CharacterComponent;

    const moveDir = UT.VEC3_NORMALIZE(character.moveDir);
    const velocity = UT.VEC3_SCALE(moveDir, physics.speed);

    character.velocity[0] = UT.LINEAR(Math.pow(1 - physics.frictionCoefficient, ts / 1000), velocity[0], character.velocity[0]);
    character.velocity[2] = UT.LINEAR(Math.pow(1 - physics.frictionCoefficient, ts / 1000), velocity[2], character.velocity[2]);

    if (UT.VEC3_LENGTH(character.velocity) < 0.1) {
      character.velocity = [0, 0, 0];
      return;
    }

    const move = UT.VEC3_SCALE(character.velocity, ts / 1000);
    const navInfo = physics.map.box(character.x, character.y + physics.height * 0.5, character.z, physics.radius, physics.height, move[0], move[1], move[2], physics.lift);

    character.x += navInfo.move[0];
    character.y += navInfo.move[1];
    character.z += navInfo.move[2];

    if (navInfo.collideFloor) {
      character.velocity[1] = 0;
    }
    else {
      character.velocity[1] = UT.LINEAR(Math.pow(1 - physics.gravityCoefficient, ts / 1000), -physics.gravityMax, character.velocity[1]);
    }
  }

  onEntityDraw(eid: number): void {
    const physics = dnaManager.getComponent(eid, 'CharacterPhysics') as CharacterPhysicsComponent;
    const character = dnaManager.getComponent(eid, 'Character') as CharacterComponent;

    const min: vec3 = [
      character.x - physics.radius,
      character.y,
      character.z - physics.radius
    ];

    const max: vec3 = [
      character.x + physics.radius,
      character.y + physics.height,
      character.z + physics.radius
    ];
  
    gfx3DebugRenderer.drawBoundingBox(UT.MAT4_IDENTITY(), min, max);
  }
}