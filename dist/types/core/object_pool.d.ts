export interface Poolable<T> {
    clone(): T;
    delete?(): void;
}
interface Instance<T> {
    id: number;
    object: Poolable<T>;
    used: boolean;
}
/**
 * Manage a pool of objects, it take a original mesh and make numInstances clones.
 * Note: You can perfectly do without pool but for some cases it is used to keep performance stables.
 */
declare class ObjectPool<T extends Poolable<T>> {
    instances: Array<Instance<T>>;
    reset: (object: Poolable<T>) => void;
    /**
     * @param {T} originObject - The original object.
     * @param {number} numInstances - The number of allocated instances.
     */
    constructor(originObject: T, numInstances: number, reset: (object: Poolable<T>) => {});
    /**
     * Free all resources.
     * Warning: You need to call this method to free allocation for pooling objects.
     */
    delete(): void;
    /**
     * Returns unused object, or null if all instance are used.
     */
    acquire(): Poolable<T> | null;
    /**
     * Marks an object as unused.
     *
     * @param {Poolable<T>} object - The object to dispose.
     */
    dispose(object: Poolable<T>): void;
    /**
     * Call callback for each instances.
     */
    foreach(cb: (object: Poolable<T>) => {}): void;
}
export { ObjectPool };
