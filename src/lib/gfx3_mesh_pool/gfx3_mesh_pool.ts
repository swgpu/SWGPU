import { Gfx3Mesh } from '../gfx3_mesh/gfx3_mesh';

interface MeshInstance {
  id: number;
  mesh: Gfx3Mesh;
  used: boolean;
};

/**
 * Manage a pool of mesh instances, it take a original mesh and make numInstances clones.
 * Note: You can perfectly do without pool but for some cases it is used to keep performance stables.
 */
class Gfx3MeshPool {
  instances: Array<MeshInstance>;

  /**
   * @param {Gfx3Mesh} originMesh - The original mesh.
   * @param {number} numInstances - The number of allocated instances.
   */
  constructor(originMesh: Gfx3Mesh, numInstances: number) {
    this.instances = [];

    for (let i = 0; i < numInstances; i++) {
      const mesh = originMesh.clone();
      this.instances.push({ mesh: mesh, used: false, id: i + 1 });
    }
  }

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    for (const instance of this.instances) {
      instance.mesh.delete();
    }
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    for (const instance of this.instances) {
      instance.mesh.update(ts);
    }
  }

  /**
   * The draw function.
   */
  draw(): void {
    for (const instance of this.instances) {
      instance.mesh.draw();
    }
  }

  /**
   * Returns unused instance, or null if all instance are used.
   */
  acquire(): MeshInstance | null {
    for (const instance of this.instances) {
      if (!instance.used) {
        instance.mesh.setPosition(0, 0, 0);
        instance.mesh.setScale(0, 0, 0);
        instance.mesh.setRotation(0, 0, 0);
        instance.used = true;
        return instance;
      }
    }

    return null;
  }

  /**
   * Marks an instance as unused.
   * 
   * @param {MeshInstance} instance - The instance to dispose.
   */
  dispose(instance: MeshInstance): void {
    const found = this.instances.find(i => i == instance);
    if (!found) {
      throw new Error('Gfx3MeshPool::dispose(): Instance not found !');
    }

    found.used = false;
  }

  /**
   * Returns an instance with the specified id or undefined if no matching object is found.
   * 
   * @param {number} id - The instance identifier.
   */
  find(id: number): MeshInstance | undefined {
    return this.instances.find(i => i.id == id);
  }
}

export { Gfx3MeshPool };