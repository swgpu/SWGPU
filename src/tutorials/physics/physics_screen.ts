import RAPIER from '@dimforge/rapier3d';
import { Screen } from '@lib/screen/screen';
import { Rapier3D } from '@lib/gfx3_physics/gfx3_physics_rapier';
// ---------------------------------------------------------------------------------------

class PhysicsScreen extends Screen {
  world: RAPIER.World;
  rigidBody: RAPIER.RigidBody;

  constructor() {
    super();
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
  }

  async onEnter() {
  }

  update(ts: number) {
    // Ste the simulation forward.  
    this.world.step();
  
    // Get and print the rigid-body's position.
    let position = this.rigidBody.translation();
    console.log('Rigid-body position: ', position.x, position.y, position.z);  
  }

  draw() {
    // draw loop.
  }
}

export { PhysicsScreen };