import { dnaManager } from '@lib/dna/dna_manager';
import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { Screen } from '@lib/screen/screen';
import { Gfx3CameraOrbit } from '@lib/gfx3_camera/gfx3_camera_orbit';
import { Gfx3Material } from '@lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------
import { PhysicsComponent, PhysicsSystem, PhysicsShapeType, PhysicsBodyType } from './physics';
import { GraphicsComponent, GraphicsSystem } from './graphics';
import { EntityComponent } from './entity';
import { InputComponent, InputSystem } from './input';
// ---------------------------------------------------------------------------------------

class RapierScreen extends Screen {
  camera: Gfx3CameraOrbit;
  floorEid: number;
  shipEid: number;
  wallEid: number;

  constructor() {
    super();
    this.camera = new Gfx3CameraOrbit(0);
    this.floorEid = 0;
    this.shipEid = 0;
    this.wallEid = 0;
  }

  async onEnter() {
    dnaManager.setup([
      new InputSystem(),
      new PhysicsSystem(),
      new GraphicsSystem()
    ]);

    this.floorEid = await this.#createStaticMesh('./utils/rapier/floor.jsm', './utils/rapier/floor.png');
    this.floorEid = await this.#createStaticMesh('./utils/rapier/slope.jsm', './utils/rapier/floor.png');
    this.shipEid = await this.#createShip();
    this.wallEid = await this.#createStaticMesh('./utils/rapier/wall.jsm', './utils/rapier/wall.jpg');
  }

  update(ts: number) {
    const entity = dnaManager.getComponent(this.shipEid, EntityComponent);
    this.camera.setTarget([entity.x, entity.y, entity.z]);
    this.camera.update(ts);
    dnaManager.update(ts);
  }

  draw() {
    dnaManager.draw();
  }

  async #createStaticMesh(jsmPath: string, jsmTexture: string): Promise<number> {
    const mesh = dnaManager.createEntity();

    const entity = new EntityComponent();
    dnaManager.addComponent(mesh, entity);

    const graphics = new GraphicsComponent();
    await graphics.jsm.loadFromFile(jsmPath);
    graphics.jsm.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture(jsmTexture) }));
    dnaManager.addComponent(mesh, graphics);

    const physics = new PhysicsComponent();
    physics.bodyType = PhysicsBodyType.STATIC;
    physics.shapeType = PhysicsShapeType.TRIMESH;
    physics.trimeshJSM = graphics.jsm;
    dnaManager.addComponent(mesh, physics);

    return mesh;
  }

  async #createShip(): Promise<number> {
    const ship = dnaManager.createEntity();

    const entity = new EntityComponent();
    entity.y = 3;
    entity.z = 10;
    dnaManager.addComponent(ship, entity);

    const graphics = new GraphicsComponent();
    await graphics.jsm.loadFromFile('./utils/rapier/ship.jsm');
    graphics.jsm.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture('./utils/rapier/ship.png') }));
    dnaManager.addComponent(ship, graphics);

    const physics = new PhysicsComponent();
    physics.bodyType = PhysicsBodyType.KINEMATIC;
    physics.shapeType = PhysicsShapeType.CAPSULE;
    physics.radius = 2.0;
    dnaManager.addComponent(ship, physics);

    const input = new InputComponent();
    dnaManager.addComponent(ship, input);

    return ship;
  }
}

export { RapierScreen };