import { Gfx3Mesh } from '../gfx3_mesh/gfx3_mesh';

interface MeshInstance {
  id: number;
  mesh: Gfx3Mesh;
  used: boolean;
};

class Gfx3MeshPool {
  instances: Array<MeshInstance>;

  constructor(originMesh: Gfx3Mesh, numInstances: number) {
    this.instances = [];

    for (let i = 0; i < numInstances; i++) {
      const mesh = originMesh.clone();
      this.instances.push({ mesh: mesh, used: false, id: i + 1 });
    }
  }

  /**
   * The "delete" function free all resources.
   * Warning: you need to call this method to free allocation for this object.
   */
  delete(): void {
    for (const instance of this.instances) {
      instance.mesh.delete();
    }
  }

  /**
   * The "update" function.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    for (const instance of this.instances) {
      instance.mesh.update(ts);
    }
  }

  /**
   * The "draw" function.
   */
  draw(): void {
    for (const instance of this.instances) {
      instance.mesh.draw();
    }
  }

  /**
   * The "acquire" function returns an available `MeshInstance` from a list of instances, setting its
   * position, scale, and rotation to zero and marking it as used.
   * @returns The `MeshInstance` or `null`.
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
   * The "dispose" function marks a MeshInstance as unused.
   * @param {MeshInstance} instance - The `instance` parameter is the instance to dispose.
   */
  dispose(instance: MeshInstance): void {
    const found = this.instances.find(i => i == instance);
    if (!found) {
      throw new Error('Gfx3MeshPool::dispose(): Instance not found !');
    }

    found.used = false;
  }

  /**
   * The "find" function returns a MeshInstance object with a specific id or undefined if no matching
   * object is found.
   * @param {number} id - The `id` parameter is instance id.
   * @returns The mesh instance or undefined.
   */
  find(id: number): MeshInstance | undefined {
    return this.instances.find(i => i.id == id);
  }
}

export { Gfx3MeshPool };