import { gfx3DebugRenderer } from '../../lib/gfx3/gfx3_debug_renderer';
import { dnaManager } from '../../lib/dna/dna_manager';
import { UT } from '../../lib/core/utils';
import { Gfx3PhysicsJNM } from '../../lib/gfx3_physics/gfx3_physics_jnm';
import { DNASystem } from '../../lib/dna/dna_system';
import { DNAComponent } from '../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { CharacterComponent } from './character';
// ---------------------------------------------------------------------------------------

export class HPComponent extends DNAComponent {
  map: Gfx3PhysicsJNM;
  velocity: vec3;
  speed: number;
  lift: number;
  radius: number;
  height: number;
  frictionCoefficient: number;
  gravityCoefficient: number;
  gravityMax: number;

  constructor(map: Gfx3PhysicsJNM) {
    super('HP');
    this.map = map;
    this.velocity = [0, 0, 0];
    this.speed = 7;
    this.lift = 0.8;
    this.radius = 0.5;
    this.height = 1;
    this.frictionCoefficient = 0.99999999;
    this.gravityCoefficient = 0.8;
    this.gravityMax = 10;
  }
}

export class HPSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Physics');
    super.addRequiredComponentTypename('Character');
  }

  onUpdate(ts: number, eid: number) {
    const hpCmp = dnaManager.getComponent(eid, 'HP') as HPComponent;
    const characterCmp = dnaManager.getComponent(eid, 'Character') as CharacterComponent;

    const characterVelocity = UT.VEC3_NORMALIZE(characterCmp.velocity);
    const velocity = UT.VEC3_SCALE(characterVelocity, hpCmp.speed);

    hpCmp.velocity[0] = UT.LINEAR(Math.pow(1 - hpCmp.frictionCoefficient, ts / 1000), velocity[0], hpCmp.velocity[0]);
    hpCmp.velocity[2] = UT.LINEAR(Math.pow(1 - hpCmp.frictionCoefficient, ts / 1000), velocity[2], hpCmp.velocity[2]);

    if (UT.VEC3_LENGTH(hpCmp.velocity) > 0.1) {
      hpCmp.velocity = [0, 0, 0];
      return;
    }

    const move = UT.VEC3_SCALE(hpCmp.velocity, ts / 1000);

    const navInfo = hpCmp.map.box(
      characterCmp.jam.getPositionX(),
      characterCmp.jam.getPositionY() + hpCmp.height * 0.5,
      characterCmp.jam.getPositionZ(),
      hpCmp.radius,
      hpCmp.height,
      move[0],
      move[1],
      move[2],
      hpCmp.lift
    );

    characterCmp.jam.translate(navInfo.move[0], navInfo.move[1], navInfo.move[2]); 

    if (navInfo.collideFloor) {
      hpCmp.velocity[1] = 0;
    }
    else {
      hpCmp.velocity[1] = UT.LINEAR(Math.pow(1 - hpCmp.gravityCoefficient, ts / 1000), -hpCmp.gravityMax, hpCmp.velocity[1]);
    }
  }

  onEntityDraw(eid: number): void {
    const hpCmp = dnaManager.getComponent(eid, 'HP') as HPComponent;
    const characterCmp = dnaManager.getComponent(eid, 'Character') as CharacterComponent;

    const min: vec3 = [
      characterCmp.jam.getPositionX() - hpCmp.radius,
      characterCmp.jam.getPositionY(),
      characterCmp.jam.getPositionZ() - hpCmp.radius
    ];

    const max: vec3 = [
      characterCmp.jam.getPositionX() + hpCmp.radius,
      characterCmp.jam.getPositionY() + hpCmp.height,
      characterCmp.jam.getPositionZ() + hpCmp.radius
    ];
  
    gfx3DebugRenderer.drawBoundingBox(UT.MAT4_IDENTITY(), min, max);
  }
}