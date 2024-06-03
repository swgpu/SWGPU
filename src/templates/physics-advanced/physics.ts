import RAPIER from '@dimforge/rapier3d';
import { ColliderDesc, RigidBodyDesc, RigidBody, Collider } from '@dimforge/rapier3d';
// ---------------------------------------------------------------------------------------
import { dnaManager } from '@lib/dna/dna_manager';
import { Rapier3D } from '@lib/gfx3_physics/gfx3_physics_rapier';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
import { gfx3DebugRenderer } from '@lib/index';
// ---------------------------------------------------------------------------------------

export enum PhysicsType {
  STATIC = 0,
  ENTITY = 1
};

export class PhysicsComponent extends DNAComponent {
  type: PhysicsType;
  body: RigidBody | null;
  collider: Collider | null;
  /* entity */
  radius: number;
  /* static */
  jsm: Gfx3MeshJSM;

  constructor() {
    super('Physics');
    this.jsm = new Gfx3MeshJSM();
    this.type = PhysicsType.STATIC;
    this.body = null;
    this.collider = null;
    this.radius = 1;
  }
}

export class PhysicsSystem extends DNASystem {
  world: RAPIER.World;

  constructor() {
    super();
    super.addRequiredComponentTypename('Physics');
    super.addRequiredComponentTypename('Entity');
    this.world = new Rapier3D.World({ x: 0.0, y: -9.81, z: 0.0 });
  }

  onEntityBind(eid: number): void {
    const physics = dnaManager.getComponent<PhysicsComponent>(eid, 'Physics');
    const entity = dnaManager.getComponent<EntityComponent>(eid, 'Entity');

    if (physics.type == PhysicsType.STATIC) {
      const bodyDesc = RigidBodyDesc.fixed();
      bodyDesc.setTranslation(entity.x, entity.y, entity.z);
      const body = this.world.createRigidBody(bodyDesc);
      const geo = physics.jsm.getGeo();
      const colliderDesc = ColliderDesc.trimesh(new Float32Array(geo.coords), new Uint32Array(geo.indexes));
      physics.collider = this.world.createCollider(colliderDesc, body);
    }
    else if (physics.type == PhysicsType.ENTITY) {
      const bodyDesc = RigidBodyDesc.dynamic();
      bodyDesc.setTranslation(entity.x, entity.y, entity.z);
      physics.body = this.world.createRigidBody(bodyDesc);
      const colliderDesc = ColliderDesc.ball(physics.radius);
      physics.collider = this.world.createCollider(colliderDesc, physics.body);
    }
  }

  onEntityUpdate(ts: number, eid: number): void {
    this.world.step();

    const physics = dnaManager.getComponent<PhysicsComponent>(eid, 'Physics');
    const entity = dnaManager.getComponent<EntityComponent>(eid, 'Entity');

    if (physics.body) {
      const vy = physics.body.linvel().y;
      physics.body.setLinvel({ x: entity.velocity[0], y: vy, z: entity.velocity[2] }, true);  
      const translation = physics.body.translation();
      entity.x = translation.x;
      entity.y = translation.y;
      entity.z = translation.z;
    }
  }

  onAfterDraw(): void {
    let vertexCount = 0;
    const { vertices } = this.world.debugRender();
    const finalVertices = [];

    for (let i = 0; i < vertices.length / 3; i++) {
      finalVertices.push(vertices[i * 3 + 0], vertices[i * 3 + 1], vertices[i * 3 + 2], 0, 1, 0);
      vertexCount++;
    }

    gfx3DebugRenderer.drawVertices(finalVertices, vertexCount);
  }
}