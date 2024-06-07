import { dnaManager } from '@lib/dna/dna_manager';
import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { Screen } from '@lib/screen/screen';
import { Gfx3CameraOrbit } from '@lib/gfx3_camera/gfx3_camera_orbit';
import { Gfx3Material } from '@lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------
import { PhysicsComponent, PhysicsSystem, PhysicsType } from './physics';
import { GraphicsComponent, GraphicsSystem } from './graphics';
import { EntityComponent } from './entity';
import { InputComponent, InputSystem } from './input';
// ---------------------------------------------------------------------------------------

class PhysicsAdvancedScreen extends Screen {
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

    this.floorEid = await this.$createFloor();
    this.shipEid = await this.$createShip();
    this.wallEid = await this.$createWall();
  }

  update(ts: number) {
    const entity = dnaManager.getComponent<EntityComponent>(this.shipEid, 'Entity');
    this.camera.setTarget([entity.x, entity.y, entity.z]);
    this.camera.update(ts);
    dnaManager.update(ts);
  }

  draw() {
    dnaManager.draw();
  }

  async $createWall(): Promise<number> {
    const wall = dnaManager.createEntity();

    const graphics = new GraphicsComponent();
    await graphics.jsm.loadFromFile('./templates/physics-advanced/wall.jsm');
    graphics.jsm.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture('./templates/physics-advanced/wall.jpg') }));
    dnaManager.addComponent(wall, graphics);

    const physics = new PhysicsComponent();
    physics.type = PhysicsType.STATIC;
    physics.jsm = graphics.jsm;
    dnaManager.addComponent(wall, physics);

    const entity = new EntityComponent();
    entity.z = 10;
    dnaManager.addComponent(wall, entity);

    return wall;
  }

  async $createFloor(): Promise<number> {
    const floor = dnaManager.createEntity();

    const graphics = new GraphicsComponent();
    await graphics.jsm.loadFromFile('./templates/physics-advanced/floor.jsm');
    graphics.jsm.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture('./templates/physics-advanced/floor.png') }));
    dnaManager.addComponent(floor, graphics);

    const physics = new PhysicsComponent();
    physics.type = PhysicsType.STATIC;
    physics.jsm = graphics.jsm;
    dnaManager.addComponent(floor, physics);

    const entity = new EntityComponent();
    dnaManager.addComponent(floor, entity);

    return floor;
  }

  async $createShip(): Promise<number> {
    const ship = dnaManager.createEntity();

    const graphics = new GraphicsComponent();
    await graphics.jsm.loadFromFile('./templates/physics-advanced/ship.jsm');
    graphics.jsm.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture('./templates/physics-advanced/ship.png') }));
    dnaManager.addComponent(ship, graphics);

    const physics = new PhysicsComponent();
    physics.type = PhysicsType.ENTITY;
    physics.radius = 2.0;
    dnaManager.addComponent(ship, physics);

    const entity = new EntityComponent();
    entity.y = 10;
    dnaManager.addComponent(ship, entity);

    const input = new InputComponent();
    dnaManager.addComponent(ship, input);

    return ship;
  }
}

export { PhysicsAdvancedScreen };