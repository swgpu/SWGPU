import Jolt from 'jolt-physics';
// ---------------------------------------------------------------------------------------
import { dnaManager } from '@lib/dna/dna_manager';
import { gfx3DebugRenderer } from '@lib/gfx3/gfx3_debug_renderer';
import { Gfx3Jolt } from '@lib/gfx3_physics/gfx3_physics_jolt';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
import { UT } from '@lib/core/utils';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
// ---------------------------------------------------------------------------------------

export const LAYER_NON_MOVING = 0;
export const LAYER_MOVING = 1;
export const NUM_OBJECT_LAYERS = 2;

const maxTimeStep = 1 / 30.0;
const bodyFilter = new Gfx3Jolt.BodyFilter();
const shapeFilter = new Gfx3Jolt.ShapeFilter();

export class PhysicsCharacterComponent extends DNAComponent {
  heightStanding: number;
  radiusStanding: number;
  controlMovementDuringJump: boolean;
  speed: number;
  jumpSpeed: number;
  enableInertia: boolean;
  upRotationX: number;
  upRotationZ: number;
  maxSlopeAngle: number;
  maxStrength: number;
  characterPadding: number;
  penetrationRecoverySpeed: number;
  predictiveContactDistance: number;
  enableWalkStairs: boolean;
  enableStickToFloor: boolean;
  shapeType: string;
  allowSliding: boolean;
  standingShape: Jolt.Shape;
  vCharacter: Jolt.CharacterVirtual | null;
  desiredVelocity: vec3;

  constructor() {
    super('PhysicsCharacter');
    this.heightStanding = 2;
    this.radiusStanding = 1;
    this.controlMovementDuringJump = true;
    this.speed = 6;
    this.jumpSpeed = 15.0;
    this.enableInertia = true;
    this.upRotationX = 0;
    this.upRotationZ = 0;
    this.maxSlopeAngle = UT.DEG_TO_RAD(45.0);
    this.maxStrength = 100.0;
    this.characterPadding = 0.02;
    this.penetrationRecoverySpeed = 1.0;
    this.predictiveContactDistance = 0.1;
    this.enableWalkStairs = true;
    this.enableStickToFloor = true;
    this.shapeType = 'Capsule';
    this.allowSliding = false;
    this.standingShape = new Gfx3Jolt.SphereShape(1);
    this.vCharacter = null;
    this.desiredVelocity = [0, 0, 0];
  }
}

export class PhysicsSystem extends DNASystem {
  jolt: Jolt.JoltInterface;
  system: Jolt.PhysicsSystem;
  bodyInterface: Jolt.BodyInterface;
  updateSettings: Jolt.ExtendedUpdateSettings;
  debugBodies: Array<Jolt.Body>;
  movingBPFilter: Jolt.DefaultBroadPhaseLayerFilter;
  movingLayerFilter: Jolt.DefaultObjectLayerFilter;

  constructor(gravity: number = -25) {
    super();
    super.addRequiredComponentTypename('PhysicsCharacter');
    super.addRequiredComponentTypename('Entity');

    // Initialize Jolt
    const settings = new Gfx3Jolt.JoltSettings();
    settings.mMaxWorkerThreads = 3;
    this.#setupCollisionFiltering(settings);
    this.jolt = new Gfx3Jolt.JoltInterface(settings);
    Gfx3Jolt.destroy(settings);

    // Initialize Jolt Subsystems
    this.system = this.jolt.GetPhysicsSystem();
    this.bodyInterface = this.system.GetBodyInterface();
    this.updateSettings = new Gfx3Jolt.ExtendedUpdateSettings();
    this.debugBodies = [];

    const objectVsBroadPhaseLayerFilter = this.jolt.GetObjectVsBroadPhaseLayerFilter();
    const objectLayerPairFilter = this.jolt.GetObjectLayerPairFilter();
    this.movingBPFilter = new Gfx3Jolt.DefaultBroadPhaseLayerFilter(objectVsBroadPhaseLayerFilter, LAYER_MOVING);
    this.movingLayerFilter = new Gfx3Jolt.DefaultObjectLayerFilter(objectLayerPairFilter, LAYER_MOVING);

    this.system.SetGravity(new Gfx3Jolt.Vec3(0, gravity, 0));
  }

  onEntityBind(eid: number): void {
    const physics = dnaManager.getComponent(eid, PhysicsCharacterComponent);
    const entity = dnaManager.getComponent(eid, EntityComponent);

    const positionStanding = new Gfx3Jolt.Vec3(0, 0.5 * physics.heightStanding + physics.radiusStanding, 0);
    const rotation = Gfx3Jolt.Quat.prototype.sIdentity();

    if (physics.shapeType == 'Capsule') {
      physics.standingShape = new Gfx3Jolt.RotatedTranslatedShapeSettings(positionStanding, rotation, new Gfx3Jolt.CapsuleShapeSettings(0.5 * physics.heightStanding, physics.radiusStanding)).Create().Get();
    }
    else if (physics.shapeType == 'Cylinder') {
      physics.standingShape = new Gfx3Jolt.RotatedTranslatedShapeSettings(positionStanding, rotation, new Gfx3Jolt.CylinderShapeSettings(0.5 * physics.heightStanding + physics.radiusStanding, physics.radiusStanding)).Create().Get();
    }
    else if (physics.shapeType == 'Box') {
      physics.standingShape = new Gfx3Jolt.RotatedTranslatedShapeSettings(positionStanding, rotation, new Gfx3Jolt.BoxShapeSettings(new Gfx3Jolt.Vec3(physics.radiusStanding, 0.5 * physics.heightStanding + physics.radiusStanding, physics.radiusStanding))).Create().Get();
    }

    const settings = new Gfx3Jolt.CharacterVirtualSettings();
    settings.mMass = 1000;
    settings.mMaxSlopeAngle = physics.maxSlopeAngle;
    settings.mMaxStrength = physics.maxStrength;
    settings.mBackFaceMode = Jolt.EBackFaceMode_CollideWithBackFaces;
    settings.mCharacterPadding = physics.characterPadding;
    settings.mPenetrationRecoverySpeed = physics.penetrationRecoverySpeed;
    settings.mPredictiveContactDistance = physics.predictiveContactDistance;
    settings.mSupportingVolume = new Gfx3Jolt.Plane(Gfx3Jolt.Vec3.prototype.sAxisY(), -physics.radiusStanding);
    settings.mShape = physics.standingShape;

    physics.vCharacter = new Gfx3Jolt.CharacterVirtual(settings, Gfx3Jolt.RVec3.prototype.sZero(), Gfx3Jolt.Quat.prototype.sIdentity(), this.system);
    physics.vCharacter.SetPosition(new Gfx3Jolt.RVec3(entity.x, entity.y, entity.z));
  }

  onEntityUpdate(ts: number, eid: number): void {
    const clampedDeltaMs = Math.min(ts, maxTimeStep);
    const physics = dnaManager.getComponent(eid, PhysicsCharacterComponent);
    const entity = dnaManager.getComponent(eid, EntityComponent);

    if (!physics.vCharacter) {
      return;
    }

    { // HANDLE INPUTS]
      const playerControlsHorizontalVelocity = physics.controlMovementDuringJump || physics.vCharacter.IsSupported();
      if (playerControlsHorizontalVelocity) {
        // True if the player intended to move
        physics.allowSliding = !(UT.VEC3_LENGTH(entity.dir) < 1.0e-12);
        // Smooth the player input
        if (physics.enableInertia) {
          physics.desiredVelocity[0] = (physics.desiredVelocity[0] * 0.75) + (entity.dir[0] * 0.25 * physics.speed);
          physics.desiredVelocity[1] = (physics.desiredVelocity[1] * 0.75) + (entity.dir[1] * 0.25 * physics.speed);
          physics.desiredVelocity[2] = (physics.desiredVelocity[2] * 0.75) + (entity.dir[2] * 0.25 * physics.speed);
        }
        else {
          physics.desiredVelocity[0] = entity.dir[0] * physics.speed;
          physics.desiredVelocity[1] = entity.dir[1] * physics.speed;
          physics.desiredVelocity[2] = entity.dir[2] * physics.speed;
        }
      }
      else {
        // While in air we allow sliding
        physics.allowSliding = true; // @todo: need to be implemented later
      }
  
      const characterUpRotation = Gfx3Jolt.Quat.prototype.sEulerAngles(new Gfx3Jolt.Vec3(physics.upRotationX, 0, physics.upRotationZ));
      physics.vCharacter.SetUp(characterUpRotation.RotateAxisY());
      physics.vCharacter.SetRotation(characterUpRotation);
  
      physics.vCharacter.UpdateGroundVelocity();
      const characterUp = WRAP_VEC3(physics.vCharacter.GetUp());
      const linearVelocity = WRAP_VEC3(physics.vCharacter.GetLinearVelocity());
      const currentVerticalVelocity = UT.VEC3_SCALE(characterUp, UT.VEC3_DOT(linearVelocity, characterUp));
      const groundVelocity = WRAP_VEC3(physics.vCharacter.GetGroundVelocity());
      const gravity = WRAP_VEC3(this.system.GetGravity());
  
      let newVelocity: vec3 = [0, 0, 0];
  
      if (physics.vCharacter.GetGroundState() == Gfx3Jolt.EGroundState_OnGround) {
        // Assume jump and velocity of ground when on ground
        newVelocity = entity.jump ? UT.VEC3_ADD(newVelocity, UT.VEC3_SCALE(characterUp, physics.jumpSpeed)) : groundVelocity;
      }
      else {
        // If not ground continue with the current vertical velocity
        newVelocity = currentVerticalVelocity;
      }

      // Gravity
      newVelocity = UT.VEC3_ADD(newVelocity, UT.VEC3_SCALE(gravity, clampedDeltaMs));
  
      if (playerControlsHorizontalVelocity) {
        // Player input
        newVelocity = UT.VEC3_ADD(newVelocity, physics.desiredVelocity);
      } else {
        // Preserve horizontal velocity
        const currentHorizontalVelocity = UT.VEC3_SUBSTRACT(linearVelocity, currentVerticalVelocity);
        newVelocity = UT.VEC3_ADD(newVelocity, currentHorizontalVelocity);
      }
  
      physics.vCharacter.SetLinearVelocity(UNWRAP_VEC3(newVelocity));
    }

    { // PRE-PHYSICS]
      const characterUp: vec3 = WRAP_VEC3(physics.vCharacter.GetUp());

      if (!physics.enableStickToFloor) {
        this.updateSettings.mStickToFloorStepDown = Gfx3Jolt.Vec3.prototype.sZero();
      }
      else {
        const v = UT.VEC3_SCALE(characterUp, -this.updateSettings.mStickToFloorStepDown.Length());
        this.updateSettings.mStickToFloorStepDown.Set(v[0], v[1], v[2]);
      }
  
      if (!physics.enableWalkStairs) {
        this.updateSettings.mWalkStairsStepUp = Gfx3Jolt.Vec3.prototype.sZero();
      }
      else {
        const v = UT.VEC3_SCALE(characterUp, this.updateSettings.mWalkStairsStepUp.Length());
        this.updateSettings.mWalkStairsStepUp.Set(v[0], v[1], v[2]);
      }
  
      physics.vCharacter.ExtendedUpdate(clampedDeltaMs,
        physics.vCharacter.GetUp(),
        this.updateSettings,
        this.movingBPFilter,
        this.movingLayerFilter,
        bodyFilter,
        shapeFilter,
        this.jolt.GetTempAllocator()
      );
  
      entity.x = physics.vCharacter.GetPosition().GetX();
      entity.y = physics.vCharacter.GetPosition().GetY();
      entity.z = physics.vCharacter.GetPosition().GetZ();
    }
  }

  onAfterUpdate(ts: number): void {
    const clampedDeltaMs = Math.min(ts, maxTimeStep); // Don't go below 30 Hz to prevent spiral of death
    this.jolt.Step(clampedDeltaMs, clampedDeltaMs > 1.0 / 55.0 ? 2 : 1); // Step the physics world
  }

  onEntityDraw(eid: number): void {
    const physics = dnaManager.getComponent(eid, PhysicsCharacterComponent);
    if (!physics.vCharacter) {
      return;
    }

    DRAW_SHAPE(physics.standingShape, physics.vCharacter.GetWorldTransform());
  }

  onAfterDraw(): void {
    for (const body of this.debugBodies) {
      DRAW_SHAPE(body.GetShape(), body.GetWorldTransform());
    }
  }

  createFloor(size = 50) {
    const pos = new Gfx3Jolt.RVec3(0, -0.5, 0);
    const rot = new Gfx3Jolt.Quat(0, 0, 0, 1);

    const shape = new Gfx3Jolt.BoxShape(new Gfx3Jolt.Vec3(size, 0.5, size), 0.05);
    const creationSettings = new Gfx3Jolt.BodyCreationSettings(shape, pos, rot, Gfx3Jolt.EMotionType_Static, LAYER_NON_MOVING);
    const body = this.bodyInterface.CreateBody(creationSettings);
    Gfx3Jolt.destroy(creationSettings);

    this.bodyInterface.AddBody(body.GetID(), Gfx3Jolt.EActivation_Activate);
    this.debugBodies.push(body);
    return body;
  }

  createBox(position: vec3, rotation: vec4, halfExtent: vec3, motionType: Jolt.EMotionType, layer: number, settings?: { mFriction?: number, mOverrideMassProperties?: number, mMassPropertiesOverride?: number }) {
    const pos = new Gfx3Jolt.RVec3(position[0], position[1], position[2]);
    const rot = new Gfx3Jolt.Quat(rotation[0], rotation[1], rotation[2], rotation[3]);
    const ext = new Gfx3Jolt.Vec3(halfExtent[0], halfExtent[1], halfExtent[2]);

    const shape = new Gfx3Jolt.BoxShape(ext, 0.05);
    const creationSettings = new Gfx3Jolt.BodyCreationSettings(shape, pos, rot, motionType, layer);

    if (settings) {
      creationSettings.mFriction = settings.mFriction ?? 0.1;
      creationSettings.mOverrideMassProperties = settings.mOverrideMassProperties ?? Gfx3Jolt.EOverrideMassProperties_CalculateInertia;
      creationSettings.mMassPropertiesOverride.mMass = settings.mMassPropertiesOverride ?? 1;
    }

    const body = this.bodyInterface.CreateBody(creationSettings);
    Gfx3Jolt.destroy(creationSettings);

    this.bodyInterface.AddBody(body.GetID(), Gfx3Jolt.EActivation_Activate);
    this.debugBodies.push(body);
    return body;
  }

  createSphere(position: vec3, radius: number, motionType: Jolt.EMotionType, layer: number) {
    const pos = new Gfx3Jolt.RVec3(position[0], position[1], position[2]);

    const shape = new Gfx3Jolt.SphereShape(radius);
    const creationSettings = new Gfx3Jolt.BodyCreationSettings(shape, pos, Gfx3Jolt.Quat.prototype.sIdentity(), motionType, layer);
    const body = this.bodyInterface.CreateBody(creationSettings);
    Gfx3Jolt.destroy(creationSettings);

    this.bodyInterface.AddBody(body.GetID(), Gfx3Jolt.EActivation_Activate);
    this.debugBodies.push(body);
    return body;
  }

  remove(body: Jolt.Body) {
    const id = body.GetID();
    this.bodyInterface.RemoveBody(id);
    this.bodyInterface.DestroyBody(id);
  }

  #setupCollisionFiltering(settings: Jolt.JoltSettings) {
    // Layer that objects can be in, determines which other objects it can collide with
    // Typically you at least want to have 1 layer for moving bodies and 1 layer for static bodies, but you can have more
    // layers if you want. E.g. you could have a layer for high detail collision (which is not used by the physics simulation
    // but only if you do collision testing).
    const objectFilter = new Gfx3Jolt.ObjectLayerPairFilterTable(NUM_OBJECT_LAYERS);
    objectFilter.EnableCollision(LAYER_NON_MOVING, LAYER_MOVING);
    objectFilter.EnableCollision(LAYER_MOVING, LAYER_MOVING);

    // Each broadphase layer results in a separate bounding volume tree in the broad phase. You at least want to have
    // a layer for non-moving and moving objects to avoid having to update a tree full of static objects every frame.
    // You can have a 1-on-1 mapping between object layers and broadphase layers (like in this case) but if you have
    // many object layers you'll be creating many broad phase trees, which is not efficient.
    const BP_LAYER_NON_MOVING = new Gfx3Jolt.BroadPhaseLayer(0);
    const BP_LAYER_MOVING = new Gfx3Jolt.BroadPhaseLayer(1);
    const NUM_BROAD_PHASE_LAYERS = 2;
    const bpInterface = new Gfx3Jolt.BroadPhaseLayerInterfaceTable(NUM_OBJECT_LAYERS, NUM_BROAD_PHASE_LAYERS);
    bpInterface.MapObjectToBroadPhaseLayer(LAYER_NON_MOVING, BP_LAYER_NON_MOVING);
    bpInterface.MapObjectToBroadPhaseLayer(LAYER_MOVING, BP_LAYER_MOVING);

    settings.mObjectLayerPairFilter = objectFilter;
    settings.mBroadPhaseLayerInterface = bpInterface;
    settings.mObjectVsBroadPhaseLayerFilter = new Gfx3Jolt.ObjectVsBroadPhaseLayerFilterTable(settings.mBroadPhaseLayerInterface, NUM_BROAD_PHASE_LAYERS, settings.mObjectLayerPairFilter, NUM_OBJECT_LAYERS);
  }
}

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function WRAP_VEC3(v: Jolt.Vec3): vec3 {
  return [v.GetX(), v.GetY(), v.GetZ()];
}

function UNWRAP_VEC3(v: vec3): Jolt.Vec3 {
  return new Gfx3Jolt.Vec3(v[0], v[1], v[2]);
}

// function WRAP_QUAT(q: Jolt.Quat): vec4 {
//   return [q.GetX(), q.GetY(), q.GetZ(), q.GetW()]
// }

// function UNWRAP_QUAT(q: vec4): Jolt.Quat {
//   return new Jolt.Quat(q[0], q[1], q[2], q[3])
// }

function DRAW_SHAPE(shape: Jolt.Shape, matrix: Jolt.RMat44) {
  let vertexCount = 0;
  const finalVertices = [];

  // Get triangle data
  const scale = new Gfx3Jolt.Vec3(1, 1, 1);
  const triContext = new Gfx3Jolt.ShapeGetTriangles(shape, Gfx3Jolt.AABox.prototype.sBiggest(), shape.GetCenterOfMass(), Gfx3Jolt.Quat.prototype.sIdentity(), scale);
  Gfx3Jolt.destroy(scale);

  // Get a view on the triangle data (does not make a copy)
  const vertices = new Float32Array(Gfx3Jolt.HEAPF32.buffer, triContext.GetVerticesData(), triContext.GetVerticesSize() / Float32Array.BYTES_PER_ELEMENT);

  // Now move the triangle data to a buffer and clone it so that we can free the memory from the C++ heap (which could be limited in size)
  for (let i = 0; i < vertices.length / 3; i += 3) {
    const v0 = [vertices[i * 3 + 0], vertices[i * 3 + 1], vertices[i * 3 + 2]];
    const v1 = [vertices[i * 3 + 3], vertices[i * 3 + 4], vertices[i * 3 + 5]];
    const v2 = [vertices[i * 3 + 6], vertices[i * 3 + 7], vertices[i * 3 + 8]];

    finalVertices.push(...v0, 0, 1, 0);
    finalVertices.push(...v1, 0, 1, 0);

    finalVertices.push(...v1, 0, 1, 0);
    finalVertices.push(...v2, 0, 1, 0);

    finalVertices.push(...v2, 0, 1, 0);
    finalVertices.push(...v0, 0, 1, 0);
    vertexCount += 6;
  }

  Gfx3Jolt.destroy(triContext);

  gfx3DebugRenderer.drawVertices(finalVertices, vertexCount, [
    matrix.GetColumn4(0).GetX(), matrix.GetColumn4(0).GetY(), matrix.GetColumn4(0).GetZ(), matrix.GetColumn4(0).GetW(),
    matrix.GetColumn4(1).GetX(), matrix.GetColumn4(1).GetY(), matrix.GetColumn4(1).GetZ(), matrix.GetColumn4(1).GetW(),
    matrix.GetColumn4(2).GetX(), matrix.GetColumn4(2).GetY(), matrix.GetColumn4(2).GetZ(), matrix.GetColumn4(2).GetW(),
    matrix.GetColumn4(3).GetX(), matrix.GetColumn4(3).GetY(), matrix.GetColumn4(3).GetZ(), matrix.GetColumn4(3).GetW()
  ]);
}