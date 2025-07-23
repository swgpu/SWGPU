import { dnaManager } from '@lib/dna/dna_manager';
import { gfx3DebugRenderer } from '@lib/gfx3/gfx3_debug_renderer';
import { gfx3Manager } from '@lib/gfx3/gfx3_manager';
import { Screen } from '@lib/screen/screen';
import { Gfx3CameraOrbit } from '@lib/gfx3_camera/gfx3_camera_orbit';
import { Gfx3Jolt } from '@lib/gfx3_physics/gfx3_physics_jolt';
// ---------------------------------------------------------------------------------------
import { PhysicsSystem, CanComponent, PlayerComponent, LAYER_NON_MOVING } from './physics';
import { GraphicsSystem } from './graphics';
import { EntityComponent } from './entity';
import { InputSystem, InputComponent } from './input';
// ---------------------------------------------------------------------------------------

class CanChaseScreen extends Screen {
  camera: Gfx3CameraOrbit;
  playerEid: number;
  canEid: number;
  gameOver: boolean;
  inputSystem: InputSystem;
  physicsSystem: PhysicsSystem;
  graphicsSystem: GraphicsSystem;

  constructor() {
    super();
    this.camera = new Gfx3CameraOrbit(0);
    this.playerEid = 0;
    this.canEid = 0;
    this.gameOver = false;
    this.inputSystem = new InputSystem(this.camera);
    this.physicsSystem = new PhysicsSystem();
    this.graphicsSystem = new GraphicsSystem();
  }

  async onEnter() {
    dnaManager.setup([this.inputSystem, this.physicsSystem, this.graphicsSystem]);

    // Créer la pente
    this.#createSlope();
    
    // Créer les murs latéraux
    this.#createWalls();

    // Créer le joueur
    this.playerEid = await this.#createPlayer();
    
    // Créer la canette
    this.canEid = await this.#createCan();

    // Positionner la caméra pour voir la scène
    this.camera.setTarget([0, 15, -25]); // Centrer sur la zone de jeu
    this.camera.setDistance(25);
    this.camera.phi = Math.PI * 0.25; // Angle d'élévation plus modéré
    this.camera.theta = 0; // Angle horizontal
  }

  update(ts: number) {
    if (this.gameOver) return;

    this.camera.update(ts);
    dnaManager.update(ts);
    
    const playerEntity = dnaManager.getComponent(this.playerEid, EntityComponent);
    const canEntity = dnaManager.getComponent(this.canEid, EntityComponent);
    
    // Suivre le joueur avec la caméra (avec un décalage pour voir la scène)
    this.camera.setTarget([playerEntity.x, playerEntity.y + 3, playerEntity.z]);
    
    // Vérifier collision joueur/canette
    const distance = Math.sqrt(
      Math.pow(playerEntity.x - canEntity.x, 2) + 
      Math.pow(playerEntity.z - canEntity.z, 2)
    );
    
    if (distance < 2) {
      this.gameOver = true;
      console.log("Game Over! La canette vous a rattrapé!");
    }
  }

  draw() {
    gfx3Manager.beginDrawing();
    dnaManager.draw();
    gfx3Manager.endDrawing();
  }

  render() {
    gfx3Manager.beginRender();
    gfx3Manager.beginPassRender(0);
    gfx3DebugRenderer.render();
    gfx3Manager.endPassRender();
    gfx3Manager.endRender();
  }

  #createSlope() {
    // Pente principale (inclinée)
    const slopeLength = 100;
    const slopeWidth = 20;
    const slopeHeight = 20;
    const angle = Math.atan(slopeHeight / slopeLength);

    // Position au centre de la pente
    const centerY = slopeHeight / 2;
    const centerZ = 0;

    // Rotation autour de l'axe X pour incliner la pente
    const rotationX = angle;

    this.physicsSystem.createBox(
      [0, centerY, centerZ],
      [Math.sin(rotationX/2), 0, 0, Math.cos(rotationX/2)],
      [slopeWidth/2, 1, slopeLength/2],
      Gfx3Jolt.EMotionType_Static,
      LAYER_NON_MOVING
    );
  }

  #createWalls() {
    // Murs latéraux pour empêcher de sortir de la pente
    const wallHeight = 15;
    const wallLength = 60;

    // Mur gauche
    this.physicsSystem.createBox(
      [-12, wallHeight/2, 0],
      [0, 0, 0, 1],
      [1, wallHeight/2, wallLength/2],
      Gfx3Jolt.EMotionType_Static,
      LAYER_NON_MOVING
    );

    // Mur droit
    this.physicsSystem.createBox(
      [12, wallHeight/2, 0],
      [0, 0, 0, 1],
      [1, wallHeight/2, wallLength/2],
      Gfx3Jolt.EMotionType_Static,
      LAYER_NON_MOVING
    );
  }

  async #createPlayer(): Promise<number> {
    const eid = dnaManager.createEntity();

    const entity = new EntityComponent();
    entity.x = 0;
    entity.y = 22;
    entity.z = -20; // Positionner juste après la canette sur la pente
    dnaManager.addComponent(eid, entity);

    const player = new PlayerComponent();
    dnaManager.addComponent(eid, player);

    const input = new InputComponent();
    dnaManager.addComponent(eid, input);

    // Créer le corps physique directement
    this.physicsSystem.createPlayerBody(eid, entity);

    return eid;
  }

  async #createCan(): Promise<number> {
    const eid = dnaManager.createEntity();
    console.log(`Creating can entity with ID: ${eid}`);

    const entity = new EntityComponent();
    entity.x = 0;
    entity.y = 24; // Un peu plus haut que la pente
    entity.z = -35; // En haut de la pente, devant le joueur
    dnaManager.addComponent(eid, entity);
    console.log(`Added EntityComponent to can at: ${entity.x}, ${entity.y}, ${entity.z}`);

    const can = new CanComponent();
    dnaManager.addComponent(eid, can);
    console.log(`Added CanComponent to entity ${eid}`);

    // Créer le corps physique directement
    this.physicsSystem.createCanBody(eid, entity);
    console.log(`Created physics body for can`);

    return eid;
  }
}

export { CanChaseScreen };




