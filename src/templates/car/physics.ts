import Jolt from 'jolt-physics';
// ---------------------------------------------------------------------------------------
import { gfx3DebugRenderer } from '@lib/gfx3/gfx3_debug_renderer';
import { Gfx3Jolt } from '@lib/gfx3_physics/gfx3_physics_jolt';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
import { UT } from '@lib/core/utils';
// ---------------------------------------------------------------------------------------

interface DebugLine {
  from: vec3;
  to: vec3;
  color: vec3;
};

export const LAYER_NON_MOVING = 0;
export const LAYER_MOVING = 1;
export const NUM_OBJECT_LAYERS = 2;

const maxTimeStep = 1 / 30.0;
const bodyFilter = new Gfx3Jolt.BodyFilter();
const shapeFilter = new Gfx3Jolt.ShapeFilter();

interface Wheel {
  // à remplir
};

export class PhysicsVehiculeComponent extends DNAComponent {
  wheels: Array<Wheel>;

  constructor() {
    super('PhysicsVehicule');
    this.wheels = [];  
  }
}

export class PhysicsSystem extends DNASystem {
  jolt: Jolt.JoltInterface;
  system: Jolt.PhysicsSystem;
  bodyInterface: Jolt.BodyInterface;
  updateSettings: Jolt.ExtendedUpdateSettings;
  debugBodies: Array<Jolt.Body>;
  debugLines: Array<DebugLine>;
  movingBPFilter: Jolt.DefaultBroadPhaseLayerFilter;
  movingLayerFilter: Jolt.DefaultObjectLayerFilter;

  constructor(gravity: number = -25) {
    super();
    super.addRequiredComponentTypename('PhysicsVehicule');
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
    this.debugLines = [];

    const objectVsBroadPhaseLayerFilter = this.jolt.GetObjectVsBroadPhaseLayerFilter();
    const objectLayerPairFilter = this.jolt.GetObjectLayerPairFilter();
    this.movingBPFilter = new Gfx3Jolt.DefaultBroadPhaseLayerFilter(objectVsBroadPhaseLayerFilter, LAYER_MOVING);
    this.movingLayerFilter = new Gfx3Jolt.DefaultObjectLayerFilter(objectLayerPairFilter, LAYER_MOVING);

    this.system.SetGravity(new Gfx3Jolt.Vec3(0, gravity, 0));
  }

  onEntityBind(eid: number): void {
  }

  onEntityUpdate(ts: number, eid: number): void {
  }

  onAfterUpdate(ts: number): void {
    const clampedDeltaMs = Math.min(ts, maxTimeStep); // Don't go below 30 Hz to prevent spiral of death
    this.jolt.Step(clampedDeltaMs, clampedDeltaMs > 1.0 / 55.0 ? 2 : 1); // Step the physics world
  }

  onEntityDraw(eid: number): void {

  }

  onAfterDraw(): void {
    for (const body of this.debugBodies) {
      DRAW_SHAPE(body.GetShape(), body.GetWorldTransform());
    }

    for (const line of this.debugLines) {
      DRAW_LINE(line);
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

  createRay(position: vec3, direction: vec3) {
    const ray = new Gfx3Jolt.RRayCast();
    ray.mOrigin.Set(position[0], position[1], position[2]);
    ray.mDirection.Set(direction[0], direction[1], direction[2]);

    this.debugLines.push({
      from: position,
      to: UT.VEC3_ADD(position, direction),
      color: [1, 1, 1]
    });




    // Cast the ray against the first box
    // physicsSystem.GetNarrowPhaseQuery().CastRay(ray, raySettings, collector, bpFilter, objectFilter, bodyFilter, shapeFilter);

    return ray;
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

function DRAW_LINE(line: DebugLine) {
  gfx3DebugRenderer.drawVertices([
    line.from[0], line.from[1], line.from[2], 1, 1, 1,
    line.to[0], line.to[1], line.to[2], 1, 1, 1], 2);
}

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