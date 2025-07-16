import { dnaManager } from '@lib/dna/dna_manager';
import { gfx3DebugRenderer } from '@lib/gfx3/gfx3_debug_renderer';
import { gfx3Manager } from '@lib/gfx3/gfx3_manager';
import { Screen } from '@lib/screen/screen';
import { Gfx3CameraOrbit } from '@lib/gfx3_camera/gfx3_camera_orbit';
import { Gfx3Jolt } from '@lib/gfx3_physics/gfx3_physics_jolt';
// ---------------------------------------------------------------------------------------
import { PhysicsCharacterComponent, PhysicsSystem, LAYER_MOVING } from './physics';
import { GraphicsSystem } from './graphics';
import { EntityComponent } from './entity';
import { InputComponent, InputSystem } from './input';
// ---------------------------------------------------------------------------------------

//
// Note: This work is basically an adaptation of this example coming from official Jolt resources: https://jrouwe.github.io/JoltPhysics.js/character_virtual.html
//
class PhysicsJoltScreen extends Screen {
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
    physics.createBox([0, 50, 0], [0, 0, 0, 1], [1, 1, 1], Gfx3Jolt.EMotionType_Dynamic, LAYER_MOVING, {
      mFriction: 0.01,
      mOverrideMassProperties: Gfx3Jolt.EOverrideMassProperties_CalculateInertia,
      mMassPropertiesOverride: 1
    });

    // Floor
    physics.createFloor(100);

    // Stairs
    for (let j = 0; j < 5; j++) {
      const stepHeight = 0.3 + 0.1 * j;
      for (let i = 1; i < 10; i++) {
        physics.createBox([15 + 5 * j, i * stepHeight - 0.5 + stepHeight / 2, -20 - i * 3], [0, 0, 0, 1], [2, stepHeight / 2, 2], Gfx3Jolt.EMotionType_Static, 0);
      }
    }

    // Slopes
    // for (let i = 0; i < 10; i++) {
    //   physics.createBox([-40 + 5 * i, 2, -25], [-1, 0, 0, UT.DEG_TO_RAD(70 - i * 5.0)], [2.5, 0.6, 8], Gfx3Jolt.EMotionType_Static, 0);
    // }

    this.eid = await this.#createEntity();
  }

  update(ts: number) {
    this.camera.update(ts);
    dnaManager.update(ts);
    const entity = dnaManager.getComponent(this.eid, EntityComponent);
    this.camera.setTarget([entity.x, entity.y, entity.z]);
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
    // graphics.jsm.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture('./sample.png') }));
    // dnaManager.addComponent(eid, graphics);

    const physics = new PhysicsCharacterComponent();
    dnaManager.addComponent(eid, physics);

    const input = new InputComponent();
    dnaManager.addComponent(eid, input);

    return eid;
  }
}

export { PhysicsJoltScreen };