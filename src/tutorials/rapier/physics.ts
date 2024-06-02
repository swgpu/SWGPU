import RAPIER from '@dimforge/rapier3d';
import { dnaManager } from '@lib/dna/dna_manager';
import { Rapier3D } from '@lib/gfx3_physics/gfx3_physics_rapier';
import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class PhysicsComponent extends DNAComponent {
  jsm: Gfx3MeshJSM;

  constructor() {
    super('Physics');
    this.jsm = new Gfx3MeshJSM();
  }
}

export class PhysicsSystem extends DNASystem {
  world: RAPIER.World;

  constructor() {
    super();
    super.addRequiredComponentTypename('Physics');
    this.world = new Rapier3D.World({ x: 0.0, y: -9.81, z: 0.0 });
  }

  onEntityBind(eid: number): void {
    const physics = dnaManager.getComponent<PhysicsComponent>(eid, 'Physics');

    const rigidBodyDesc = RigidBodyDesc.fixed();
    const rigidBody = this.world.createRigidBody(rigidBodyDesc);



    ColliderDesc.trimesh()
  }

  onEntityUpdate(ts: number, eid: number): void {
    this.world.step();
  }

  onEntityDraw(eid: number): void {
    const bulletCmp = dnaManager.getComponent(eid, 'Bullet') as BulletComponent;
    bulletCmp.jss.draw();
  }
}