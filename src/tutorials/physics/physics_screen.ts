import RAPIER from '@dimforge/rapier3d';
import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { Screen } from '@lib/screen/screen';
import { Gfx3CameraOrbit } from '@lib/gfx3_camera/gfx3_camera_orbit';
import { Rapier3D } from '@lib/gfx3_physics/gfx3_physics_rapier';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '@lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------

// resource 1: https://github.com/8Observer8/ship-movement-oimophysics-rollup-threejs-js/blob/main/src/index.js
// resource 2: https://www.youtube.com/watch?v=SWc4tKHVye4

class PhysicsScreen extends Screen {
  camera: Gfx3CameraOrbit;
  world: RAPIER.World;
  rigidBody: RAPIER.RigidBody;
  ship: Gfx3MeshJSM;

  constructor() {
    super();
    this.camera = new Gfx3CameraOrbit(0);

    let gravity = { x: 0.0, y: -9.81, z: 0.0 };
    this.world = new Rapier3D.World(gravity);
  
    // Create the ground
    let groundColliderDesc = Rapier3D.ColliderDesc.cuboid(10.0, 0.1, 10.0);
    this.world.createCollider(groundColliderDesc);
  
    // Create a dynamic rigid-body.
    let rigidBodyDesc = Rapier3D.RigidBodyDesc.dynamic().setTranslation(0.0, 1.0, 0.0);
    this.rigidBody = this.world.createRigidBody(rigidBodyDesc);
  
    // Create a cuboid collider attached to the dynamic rigidBody.
    let colliderDesc = Rapier3D.ColliderDesc.cuboid(0.5, 0.5, 0.5);
    this.world.createCollider(colliderDesc, this.rigidBody);

    this.ship = new Gfx3MeshJSM();
  }

  async onEnter() {
    this.camera.setPosition(0, 0, 10);
    await this.ship.loadFromFile('./tutorials/physics/ship.jsm');
    this.ship.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTextureMips('./tutorials/physics/ship.png')
    }));
  }

  update(ts: number) {
    this.camera.update(ts);
    // Ste the simulation forward.  
    this.world.step();
  
    // Get and print the rigid-body's position.
    let position = this.rigidBody.translation();
    this.ship.setPosition(position.x, position.y, position.z);
    console.log('Rigid-body position: ', position.x, position.y, position.z);  
  }

  draw() {
    this.ship.draw();
  }
}

export { PhysicsScreen };