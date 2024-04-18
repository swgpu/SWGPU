export interface Poolable<T> {
  clone(): T;
  delete?(): void;
};

interface Instance<T> {
  id: number;
  object: Poolable<T>;
  used: boolean;
};

/**
 * Manage a pool of objects, it take a original mesh and make numInstances clones.
 * Note: You can perfectly do without pool but for some cases it is used to keep performance stables.
 */
class ObjectPool<T extends Poolable<T>> {
  instances: Array<Instance<T>>;
  reset: (object: Poolable<T>) => void;

  /**
   * @param {T} originObject - The original object.
   * @param {number} numInstances - The number of allocated instances.
   */
  constructor(originObject: T, numInstances: number, reset: (object: Poolable<T>) => {}) {
    this.instances = [];
    this.reset = reset;

    for (let i = 0; i < numInstances; i++) {
      const clone = originObject.clone();
      this.reset(clone);
      this.instances.push({ object: clone, used: false, id: i + 1 });
    }
  }

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for pooling objects.
   */
  delete(): void {
    for (const instance of this.instances) {
      if (instance.object.delete) {
        instance.object.delete();
      }
    }
  }

  /**
   * Returns unused object, or null if all instance are used.
   */
  acquire(): Poolable<T> | null {
    for (const instance of this.instances) {
      if (!instance.used) {
        this.reset(instance.object);
        instance.used = true;
        return instance.object;
      }
    }

    return null;
  }

  /**
   * Marks an object as unused.
   * 
   * @param {Poolable<T>} object - The object to dispose.
   */
  dispose(object: Poolable<T>): void {
    const found = this.instances.find(i => i.object == object);
    if (!found) {
      throw new Error('ObjectPool::dispose(): Object not found !');
    }

    found.used = false;
  }

  /**
   * Call callback for each instances.
   */
  foreach(cb: (object: Poolable<T>) => {}): void {
    for (const instance of this.instances) {
      cb(instance.object);
    }
  }
}

export { ObjectPool };