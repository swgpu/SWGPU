import { gfx3DebugRenderer } from '@lib/gfx3/gfx3_debug_renderer';
import { dnaManager } from '@lib/dna/dna_manager';
import { UT } from '@lib/core/utils';
import { Gfx3PhysicsJNM } from '@lib/gfx3_physics/gfx3_physics_jnm';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
// ---------------------------------------------------------------------------------------

export class PhysicsComponent extends DNAComponent {
  map: Gfx3PhysicsJNM;
  lift: number;
  radius: number;
  height: number;
  gravityCoefficient: number;
  gravityMax: number;

  constructor(map: Gfx3PhysicsJNM) {
    super('Physics');
    this.map = map;
    this.lift = 0.8;
    this.radius = 0.5;
    this.height = 1;
    this.gravityCoefficient = 0.8;
    this.gravityMax = 10;
  }
}

export class PhysicsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Physics');
    super.addRequiredComponentTypename('Entity');
  }

  onEntityUpdate(ts: number, eid: number) {
    const physics = dnaManager.getComponent<PhysicsComponent>(eid, 'Physics');
    const entity = dnaManager.getComponent<EntityComponent>(eid, 'Entity');

    const navInfo = physics.map.box(
      entity.x,
      entity.y + physics.height * 0.5,
      entity.z,
      physics.radius,
      physics.height,
      entity.velocity[0],
      entity.velocity[1],
      entity.velocity[2],
      physics.lift
    );

    entity.x += navInfo.move[0];
    entity.y += navInfo.move[1];
    entity.z += navInfo.move[2];

    if (navInfo.collideFloor) {
      entity.velocity[1] = 0;
    }
    else {
      entity.velocity[1] = UT.LERP_EXP(-physics.gravityMax, entity.velocity[1], 1 - physics.gravityCoefficient, ts / 1000);
    }
  }

  onEntityDraw(eid: number): void {
    const physics = dnaManager.getComponent<PhysicsComponent>(eid, 'Physics');
    const entity = dnaManager.getComponent<EntityComponent>(eid, 'Entity');

    const min: vec3 = [
      entity.x - physics.radius,
      entity.y,
      entity.z - physics.radius
    ];

    const max: vec3 = [
      entity.x + physics.radius,
      entity.y + physics.height,
      entity.z + physics.radius
    ];
  
    gfx3DebugRenderer.drawBoundingBox(UT.MAT4_IDENTITY(), min, max);
  }
}