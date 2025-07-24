import { dnaManager } from '@lib/dna/dna_manager';
import { DNAComponent } from '@lib/dna/dna_component';
import { DNASystem } from '@lib/dna/dna_system';
import { Gfx3Jolt } from '@lib/gfx3_physics/gfx3_physics_jolt';
import { drawShape } from '@lib/gfx3_physics/gfx3_physics_jolt_debug';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
import { InputComponent } from './input';
// ---------------------------------------------------------------------------------------

export const LAYER_NON_MOVING = 0;
export const LAYER_MOVING = 1;

export class PlayerComponent extends DNAComponent {
  body: any;
  speed: number;

  constructor() {
    super('Player');
    this.body = null;
    this.speed = 8;
  }
}

export class CanComponent extends DNAComponent {
  body: any;
  hasInitialPush: boolean;

  constructor() {
    super('Can');
    this.body = null;
    this.hasInitialPush = false;
  }
}

export class PhysicsSystem extends DNASystem {
  jolt: any;
  system: any;
  bodyInterface: any;
  updateSettings: any;
  debugBodies: any[];

  constructor(gravity: number = -25) {
    super();
    super.addRequiredComponentTypename('Entity');
    // Note: On ne peut pas ajouter Player et Can comme requis car toutes les entités n'ont pas ces composants

    // Initialiser Jolt
    const settings = new Gfx3Jolt.JoltSettings();
    settings.mMaxWorkerThreads = 3;
    this.#setupCollisionFiltering(settings);
    this.jolt = new Gfx3Jolt.JoltInterface(settings);
    Gfx3Jolt.destroy(settings);

    this.system = this.jolt.GetPhysicsSystem();
    this.bodyInterface = this.system.GetBodyInterface();
    this.updateSettings = new Gfx3Jolt.ExtendedUpdateSettings();
    this.debugBodies = [];

    this.system.SetGravity(new Gfx3Jolt.Vec3(0, gravity, 0));
  }

  onEntityUpdate(ts: number, eid: number): void {
    const entity = dnaManager.getComponent(eid, EntityComponent);

    if (dnaManager.hasComponent(eid, PlayerComponent)) {
      this.updatePlayer(ts, eid, entity);
    }

    if (dnaManager.hasComponent(eid, CanComponent)) {
      this.updateCan(ts, eid, entity);
    }
  }

  onAfterUpdate(ts: number): void {
    const clampedDeltaMs = Math.min(ts, 16.67);
    console.log(`Physics update: ${clampedDeltaMs}ms`);
    this.jolt.Step(clampedDeltaMs / 1000, clampedDeltaMs > 1.0 / 55.0 ? 2 : 1);
  }

  onAfterDraw(): void {
    console.log(`Drawing ${this.debugBodies.length} debug bodies`);
    for (const body of this.debugBodies) {
      drawShape(body.GetShape(), body.GetWorldTransform());
    }
  }

  createPlayerBody(eid: number, entity: EntityComponent) {
    const player = dnaManager.getComponent(eid, PlayerComponent);
    const pos = new Gfx3Jolt.RVec3(entity.x, entity.y, entity.z);
    const rot = new Gfx3Jolt.Quat(0, 0, 0, 1);

    const shape = new Gfx3Jolt.CapsuleShape(1, 0.5);
    const creationSettings = new Gfx3Jolt.BodyCreationSettings(
      shape, pos, rot, Gfx3Jolt.EMotionType_Dynamic, LAYER_MOVING
    );

    // Propriétés physiques pour un bon contrôle
    creationSettings.mFriction = 0.8; // Bonne adhérence
    creationSettings.mRestitution = 0.0; // Pas de rebond
    creationSettings.mOverrideMassProperties = Gfx3Jolt.EOverrideMassProperties_CalculateInertia;
    creationSettings.mMassPropertiesOverride.mMass = 70; // Poids humain réaliste

    // Empêcher la rotation pour que le joueur reste debout
    creationSettings.mAngularDamping = 0.99; // Très fort amortissement angulaire

    player.body = this.bodyInterface.CreateBody(creationSettings);
    Gfx3Jolt.destroy(creationSettings);

    this.bodyInterface.AddBody(player.body.GetID(), Gfx3Jolt.EActivation_Activate);
    this.debugBodies.push(player.body);

    console.log(`Player body created at position: ${entity.x}, ${entity.y}, ${entity.z}`);
  }

  createCanBody(eid: number, entity: EntityComponent) {
    const can = dnaManager.getComponent(eid, CanComponent);
    const pos = new Gfx3Jolt.RVec3(entity.x, entity.y, entity.z);

    console.log(`Creating can at position: ${entity.x}, ${entity.y}, ${entity.z}`);

    // Rotation de 90° sur l'axe X pour coucher la canette et qu'elle roule le long de la pente
    let quat = new Gfx3Jolt.Quat;
    const rotX = quat.sRotation(new Gfx3Jolt.Vec3(0, 0, 1), Math.PI / 2);

    // Créer une canette cylindrique (plus grande pour être visible)
    const canRadius = 1.0;
    const canHeight = 2.0;
    const shape = new Gfx3Jolt.CylinderShape(canHeight/2, canRadius, 0.05);

    const creationSettings = new Gfx3Jolt.BodyCreationSettings(
      shape, pos, rotX, Gfx3Jolt.EMotionType_Dynamic, LAYER_MOVING
    );

    // Propriétés physiques pour un bon roulement
    creationSettings.mFriction = 0.3; // Friction modérée pour rouler
    creationSettings.mRestitution = 0.2; // Peu de rebond
    creationSettings.mOverrideMassProperties = Gfx3Jolt.EOverrideMassProperties_CalculateInertia;
    creationSettings.mMassPropertiesOverride.mMass = 0.5; // Canette légère

    can.body = this.bodyInterface.CreateBody(creationSettings);
    Gfx3Jolt.destroy(creationSettings);

    this.bodyInterface.AddBody(can.body.GetID(), Gfx3Jolt.EActivation_Activate);
    this.debugBodies.push(can.body);

    console.log(`Can body created successfully, ID: ${can.body.GetID()}`);
  }

  updatePlayer(ts: number, eid: number, entity: EntityComponent) {
    const player = dnaManager.getComponent(eid, PlayerComponent);
    const input = dnaManager.getComponent(eid, InputComponent);

    if (!player.body) {
      console.log(`Player body is null for entity ${eid}`);
      return;
    }

    console.log(`Updating player ${eid}, input: forward=${input.moveForward}, backward=${input.moveBackward}, left=${input.moveLeft}, right=${input.moveRight}`);

    const velocity = player.body.GetLinearVelocity();
    let moveX = 0;
    let moveZ = 0;

    // Contrôles de mouvement avec accélération progressive
    if (input.moveForward) moveZ -= 1;
    if (input.moveBackward) moveZ += 1;
    if (input.moveLeft) moveX -= 1;
    if (input.moveRight) moveX += 1;

    // Normaliser le mouvement diagonal
    if (moveX !== 0 && moveZ !== 0) {
      const length = Math.sqrt(moveX * moveX + moveZ * moveZ);
      moveX /= length;
      moveZ /= length;
    }

    // Appliquer la vitesse avec amortissement
    const targetVelX = moveX * player.speed;
    const targetVelZ = moveZ * player.speed;

    const dampingFactor = 0.8; // Facteur d'amortissement pour un mouvement plus fluide
    const newVelX = velocity.GetX() * dampingFactor + targetVelX * (1 - dampingFactor);
    const newVelZ = velocity.GetZ() * dampingFactor + targetVelZ * (1 - dampingFactor);

    player.body.SetLinearVelocity(new Gfx3Jolt.Vec3(newVelX, velocity.GetY(), newVelZ));

    // Forcer le joueur à rester debout (rotation nulle)
    player.body.SetAngularVelocity(new Gfx3Jolt.Vec3(0, 0, 0));
    // Utiliser l'interface body pour réinitialiser la rotation
    this.bodyInterface.SetRotation(player.body.GetID(), new Gfx3Jolt.Quat(0, 0, 0, 1), Gfx3Jolt.EActivation_DontActivate);

    // Mettre à jour la position de l'entité
    const pos = player.body.GetPosition();
    entity.x = pos.GetX();
    entity.y = pos.GetY();
    entity.z = pos.GetZ();
  }

  updateCan(ts: number, eid: number, entity: EntityComponent) {
    const can = dnaManager.getComponent(eid, CanComponent);

    if (!can.body) return;

    // Donner une impulsion initiale pour que la canette commence à rouler
    if (!can.hasInitialPush) {
      const initialForce = new Gfx3Jolt.Vec3(0, 0, 15); // Force vers le bas de la pente
      can.body.AddForce(initialForce);
      can.hasInitialPush = true;
    }

    // Mettre à jour la position de l'entité
    const pos = can.body.GetPosition();
    entity.x = pos.GetX();
    entity.y = pos.GetY();
    entity.z = pos.GetZ();

    // Limiter la vitesse maximale pour éviter que la canette aille trop vite
    const velocity = can.body.GetLinearVelocity();
    const maxSpeed = 25;
    const currentSpeed = Math.sqrt(velocity.GetX()**2 + velocity.GetY()**2 + velocity.GetZ()**2);

    if (currentSpeed > maxSpeed) {
      const scale = maxSpeed / currentSpeed;
      can.body.SetLinearVelocity(new Gfx3Jolt.Vec3(
        velocity.GetX() * scale,
        velocity.GetY() * scale,
        velocity.GetZ() * scale
      ));
    }
  }

  createBox(position: number[], rotation: number[], halfExtent: number[], motionType: any, layer: number, settings?: any) {
    const pos = new Gfx3Jolt.RVec3(position[0], position[1], position[2]);
    const rot = new Gfx3Jolt.Quat(rotation[0], rotation[1], rotation[2], rotation[3]);

    const shape = new Gfx3Jolt.BoxShape(new Gfx3Jolt.Vec3(halfExtent[0], halfExtent[1], halfExtent[2]), 0.05);
    const creationSettings = new Gfx3Jolt.BodyCreationSettings(shape, pos, rot, motionType, layer);

    if (settings) {
      Object.assign(creationSettings, settings);
    }

    const body = this.bodyInterface.CreateBody(creationSettings);
    Gfx3Jolt.destroy(creationSettings);

    this.bodyInterface.AddBody(body.GetID(), Gfx3Jolt.EActivation_Activate);
    this.debugBodies.push(body);
    return body;
  }

  #setupCollisionFiltering(settings: any) {
    const objectFilter = new Gfx3Jolt.ObjectLayerPairFilterTable(2);
    objectFilter.EnableCollision(LAYER_NON_MOVING, LAYER_MOVING);
    objectFilter.EnableCollision(LAYER_MOVING, LAYER_MOVING);

    const BP_LAYER_NON_MOVING = new Gfx3Jolt.BroadPhaseLayer(0);
    const BP_LAYER_MOVING = new Gfx3Jolt.BroadPhaseLayer(1);

    const broadPhaseFilter = new Gfx3Jolt.BroadPhaseLayerInterfaceTable(2, 2);
    broadPhaseFilter.MapObjectToBroadPhaseLayer(LAYER_NON_MOVING, BP_LAYER_NON_MOVING);
    broadPhaseFilter.MapObjectToBroadPhaseLayer(LAYER_MOVING, BP_LAYER_MOVING);

    settings.mObjectLayerPairFilter = objectFilter;
    settings.mBroadPhaseLayerInterface = broadPhaseFilter;
    settings.mObjectVsBroadPhaseLayerFilter = new Gfx3Jolt.ObjectVsBroadPhaseLayerFilterTable(
      settings.mBroadPhaseLayerInterface, 2, settings.mObjectLayerPairFilter, 2
    );
  }
}