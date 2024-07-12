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

  getMinBound(x: number, y: number, z: number): vec3 {
    return [x - this.radius, y, z - this.radius];
  }

  getMaxBound(x: number, y: number, z: number): vec3 {
    return [x + this.radius, y + this.height, z + this.radius];
  }
}

export class PhysicsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Physics');
    super.addRequiredComponentTypename('Entity');
  }

  onEntityUpdate(ts: number, eid: number) {
    const physics = dnaManager.getComponent(eid, PhysicsComponent);
    const entity = dnaManager.getComponent(eid, EntityComponent);

    const navInfo = physics.map.box(
      entity.x,
      entity.y + physics.height * 0.5,
      entity.z,
      physics.radius,
      physics.height,
      entity.velocity[0] * (ts / 1000),
      entity.velocity[1] * (ts / 1000),
      entity.velocity[2] * (ts / 1000),
      physics.lift
    );

    entity.x += navInfo.move[0];
    entity.y += navInfo.move[1];
    entity.z += navInfo.move[2];

    if (navInfo.collideFloor) {
      entity.velocity[1] = 0;
    }
    else {
      entity.velocity[1] -= 0.1 * (ts / 1000);
    }
  }

  onEntityDraw(eid: number): void {
    const physics = dnaManager.getComponent(eid, PhysicsComponent);
    const entity = dnaManager.getComponent(eid, EntityComponent);
    const min = physics.getMinBound(entity.x, entity.y, entity.z);
    const max = physics.getMaxBound(entity.x, entity.y, entity.z); 
    gfx3DebugRenderer.drawBoundingBox(UT.MAT4_IDENTITY(), min, max);
  }
}