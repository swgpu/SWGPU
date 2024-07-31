import { type RigidBody, type Collider, type World, Vector3 } from '@dimforge/rapier3d';
// ---------------------------------------------------------------------------------------
import { dnaManager } from '@lib/dna/dna_manager';
import { gfx3DebugRenderer } from '@lib/gfx3/gfx3_debug_renderer';
import { Rapier3D } from '@lib/gfx3_physics/gfx3_physics_rapier';
import { Gfx3Mesh } from '@lib/gfx3_mesh/gfx3_mesh';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
// ---------------------------------------------------------------------------------------

export enum PhysicsShapeType {
  TRIMESH = 0,
  BALL = 1,
  CAPSULE = 2
};

export enum PhysicsBodyType {
  STATIC = 0,
  DYNAMIC = 1,
  KINEMATIC = 2
};

export class PhysicsComponent extends DNAComponent {
  shapeType: PhysicsShapeType;
  bodyType: PhysicsBodyType;
  body: RigidBody;
  collider: Collider;
  isController: boolean;
  grounded: boolean;
  ballRadius: number;
  mesh: Gfx3Mesh;

  constructor() {
    super('Physics');
    this.shapeType = PhysicsShapeType.TRIMESH;
    this.bodyType = PhysicsBodyType.STATIC;
    this.body = {} as RigidBody;
    this.collider = {} as Collider;
    this.isController = false;
    this.grounded = false;
    this.ballRadius = 1;
    this.mesh = new Gfx3Mesh();
  }
}

export class PhysicsSystem extends DNASystem {
  world: World;

  constructor() {
    super();
    super.addRequiredComponentTypename('Physics');
    super.addRequiredComponentTypename('Entity');
    this.world = new Rapier3D.World({ x: 0.0, y: -9.81, z: 0.0 });
  }

  onEntityBind(eid: number): void {
    const physics = dnaManager.getComponent(eid, PhysicsComponent);
    const entity = dnaManager.getComponent(eid, EntityComponent);

    //
    // RigidBody
    //
    if (physics.bodyType == PhysicsBodyType.STATIC) {
      const bodyDesc = Rapier3D.RigidBodyDesc.fixed();
      bodyDesc.setTranslation(entity.x, entity.y, entity.z);
      physics.body = this.world.createRigidBody(bodyDesc);
    }
    else if (physics.bodyType == PhysicsBodyType.DYNAMIC) {
      const bodyDesc = Rapier3D.RigidBodyDesc.dynamic();
      bodyDesc.setTranslation(entity.x, entity.y, entity.z);
      physics.body = this.world.createRigidBody(bodyDesc);
    }
    else {
      const bodyDesc = Rapier3D.RigidBodyDesc.kinematicPositionBased();
      bodyDesc.setTranslation(entity.x, entity.y, entity.z);
      physics.body = this.world.createRigidBody(bodyDesc);
    }

    //
    // Collider
    //
    if (physics.shapeType == PhysicsShapeType.BALL) {
      const colliderDesc = Rapier3D.ColliderDesc.capsule(1, physics.ballRadius);
      physics.collider = this.world.createCollider(colliderDesc, physics.body ?? undefined);
    }
    else if (physics.shapeType == PhysicsShapeType.TRIMESH) {
      const geo = physics.mesh.getGeo();
      const colliderDesc = Rapier3D.ColliderDesc.trimesh(new Float32Array(geo.coords), new Uint32Array(geo.indexes));
      physics.collider = this.world.createCollider(colliderDesc, physics.body ?? undefined);
    }
  }

  onBeforeUpdate(ts: number): void {
    this.world.step();
  }

  onEntityUpdate(ts: number, eid: number): void {
    const physics = dnaManager.getComponent(eid, PhysicsComponent);
    const entity = dnaManager.getComponent(eid, EntityComponent);

    if (physics.isController) {
      const position = physics.body.translation();

      const controller = this.world.createCharacterController(0.1);
      controller.setApplyImpulsesToDynamicBodies(true);
      controller.enableSnapToGround(0.02);
      controller.setCharacterMass(0.2);      

      // Apply gravity
      if (!physics.grounded) {
        entity.velocity[1] -= (9.807 * (ts / 1000)) / 20;
      }

      controller.computeColliderMovement(physics.collider, { x: entity.velocity[0], y: entity.velocity[1], z: entity.velocity[2] });
      physics.grounded = controller.computedGrounded();

      const correctedMovement = controller.computedMovement();
      physics.body.setNextKinematicTranslation({
        x: position.x + correctedMovement.x,
        y: position.y + correctedMovement.y,
        z: position.z + correctedMovement.z
      });

      entity.x += correctedMovement.x;
      entity.y += correctedMovement.y;
      entity.z += correctedMovement.z;
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