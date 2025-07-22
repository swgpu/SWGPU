import { dnaManager } from '@lib/dna/dna_manager';
import { gfx3DebugRenderer } from '@lib/gfx3/gfx3_debug_renderer';
import { gfx3Manager } from '@lib/gfx3/gfx3_manager';
import { Screen } from '@lib/screen/screen';
import { Gfx3CameraOrbit } from '@lib/gfx3_camera/gfx3_camera_orbit';
import { Gfx3Jolt } from '@lib/gfx3_physics/gfx3_physics_jolt';
// ---------------------------------------------------------------------------------------
import { PhysicsVehiculeComponent, PhysicsSystem, LAYER_MOVING } from './physics';
import { GraphicsSystem } from './graphics';
import { EntityComponent } from './entity';
import { InputComponent, InputSystem } from './input';
// ---------------------------------------------------------------------------------------

class CarScreen extends Screen {
  camera: Gfx3CameraOrbit;
  eid: number;

  constructor() {
    super();
    this.camera = new Gfx3CameraOrbit(0);
    this.eid = 0;
  }

  async onEnter() {
    const input = new InputSystem(this.camera);
    const physics = new PhysicsSystem();
    const graphics = new GraphicsSystem();
    dnaManager.setup([input, physics, graphics]);

    // Movable box
    physics.createBox([0, 50, 0], [0, 0, 0, 1], [1, 1, 2], Gfx3Jolt.EMotionType_Dynamic, LAYER_MOVING, {
      mFriction: 0.01,
      mOverrideMassProperties: Gfx3Jolt.EOverrideMassProperties_CalculateInertia,
      mMassPropertiesOverride: 1
    });

    // Ray
    physics.createRay([-5, 1, -1], [10, 0, 2]);

    // Floor
    physics.createFloor(100);

    this.eid = await this.#createEntity();
  }

  update(ts: number) {
    this.camera.update(ts);
    dnaManager.update(ts);
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

  async #createEntity(): Promise<number> {
    const eid = dnaManager.createEntity();

    const entity = new EntityComponent();
    entity.y = 10;
    entity.z = 10;
    dnaManager.addComponent(eid, entity);

    // const graphics = new GraphicsComponent();
    // await graphics.jsm.loadFromFile('./sample.jsm');
    // graphics.jsm.mat.setTexture(await gfx3TextureManager.loadTexture('./sample.png') }));
    // dnaManager.addComponent(eid, graphics);

    const physics = new PhysicsVehiculeComponent();
    dnaManager.addComponent(eid, physics);

    const input = new InputComponent();
    dnaManager.addComponent(eid, input);

    return eid;
  }
}

export { CarScreen };