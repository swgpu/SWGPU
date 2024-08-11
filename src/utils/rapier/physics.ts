import { type RigidBody, type Collider, type World, Ray, RayColliderHit } from '@dimforge/rapier3d';
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
  rayDown: Ray;
  currentHit: RayColliderHit | null;
  body: RigidBody;
  collider: Collider;
  grounded: boolean;
  // specific collider properties
  radius: number;
  capsuleHalfHeight: number;
  trimeshJSM: Gfx3Mesh;
  kinematicElevationGap: number;
  kinematicGravityCb: Function;

  constructor() {
    super('Physics');
    this.shapeType = PhysicsShapeType.TRIMESH;
    this.bodyType = PhysicsBodyType.STATIC;
    this.rayDown = new Rapier3D.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0});
    this.currentHit = null;
    this.body = {} as RigidBody;
    this.collider = {} as Collider;
    this.grounded = false;
    // specific collider properties
    this.radius = 1;
    this.capsuleHalfHeight = 1;
    this.trimeshJSM = new Gfx3Mesh();
    this.kinematicElevationGap = 0.4;
    this.kinematicGravityCb = (ts: number) => (9.807 * (ts / 1000)) / 20;
  }
}

export class PhysicsSystem extends DNASystem {
  world: World;

  constructor(gravity: number = -9.81) {
    super();
    super.addRequiredComponentTypename('Physics');
    super.addRequiredComponentTypename('Entity');
    this.world = new Rapier3D.World({ x: 0.0, y: gravity, z: 0.0 });
  }

  onEntityBind(eid: number): void {
    const physics = dnaManager.getComponent(eid, PhysicsComponent);
    const entity = dnaManager.getComponent(eid, EntityComponent);

    //
    // Create the body
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
    else if (physics.bodyType == PhysicsBodyType.KINEMATIC) {
      const bodyDesc = Rapier3D.RigidBodyDesc.kinematicPositionBased();
      bodyDesc.setTranslation(entity.x, entity.y, entity.z);
      physics.body = this.world.createRigidBody(bodyDesc);
    }
    else {
      throw new Error('PhysicsSystem::onEntityBind(): body type unknown !');
    }

    //
    // Create the collider
    //
    if (physics.shapeType == PhysicsShapeType.BALL) {
      const colliderDesc = Rapier3D.ColliderDesc.ball(physics.radius);
      physics.collider = this.world.createCollider(colliderDesc, physics.body ?? undefined);
    }
    else if (physics.shapeType == PhysicsShapeType.CAPSULE) {
      const colliderDesc = Rapier3D.ColliderDesc.capsule(physics.capsuleHalfHeight, physics.radius);
      physics.collider = this.world.createCollider(colliderDesc, physics.body ?? undefined);
    }
    else if (physics.shapeType == PhysicsShapeType.TRIMESH) {
      const geo = physics.trimeshJSM.getGeo();
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

    const position = physics.body.translation();
    entity.x = position.x;
    entity.y = position.y;
    entity.z = position.z;

    physics.rayDown.origin.x = position.x;
    physics.rayDown.origin.y = position.y;
    physics.rayDown.origin.z = position.z;
    physics.currentHit = this.world.castRay(physics.rayDown, 20, false, 2);

    if (physics.bodyType == PhysicsBodyType.DYNAMIC) {
      const vy = physics.body.linvel().y;
      physics.body.setLinvel({ x: entity.velocity[0], y: vy, z: entity.velocity[2] }, true);
    }
    else if (physics.bodyType == PhysicsBodyType.KINEMATIC) {
      const controller = this.world.createCharacterController(0.1);
      controller.setApplyImpulsesToDynamicBodies(true);
      controller.enableSnapToGround(0.2);
      controller.setCharacterMass(0.2);
      controller.setSlideEnabled(true);
      controller.computeColliderMovement(physics.collider, { x: entity.velocity[0], y: entity.velocity[1], z: entity.velocity[2] });

      let halfHeight = 0;
      if (physics.shapeType == PhysicsShapeType.BALL) {
        halfHeight = physics.radius;
      }
      else if (physics.shapeType == PhysicsShapeType.CAPSULE) {
        halfHeight = physics.capsuleHalfHeight * 3;
      }

      if (physics.currentHit) {
        const point = physics.rayDown.pointAt(physics.currentHit.timeOfImpact);
        const diff = position.y - point.y;
        const height = halfHeight + physics.kinematicElevationGap;

        if (diff < height) {
          position.y = point.y + height;
          entity.velocity[1] = 0;
          physics.grounded = true;
        }
        else if (diff > height + 0.1) {
          entity.velocity[1] -= physics.kinematicGravityCb(ts);
          physics.grounded = false;
        }
      }
      else {
        entity.velocity[1] -= physics.kinematicGravityCb(ts);
        physics.grounded = false;
      }

      const correctedMovement = controller.computedMovement();
      physics.body.setNextKinematicTranslation({
        x: position.x + correctedMovement.x,
        y: position.y + correctedMovement.y,
        z: position.z + correctedMovement.z
      });
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