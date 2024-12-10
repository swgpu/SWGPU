# ObjectPool

Manage a pool of objects, it take a original mesh and make numInstances clones.
Note: You can perfectly do without pool but for some cases it is used to keep performance stables.
## Constructors
- **new ObjectPool**(originObject: T, numInstances: number, reset): ObjectPool   
   - **originObject**: The original object.
   - **numInstances**: The number of allocated instances.
   - **reset**
## Methods
- **acquire**()   
Returns unused object, or null if all instance are used.

- **delete**(): void   
Free all resources.
Warning: You need to call this method to free allocation for pooling objects.

- **dispose**(object: Poolable): void   
Marks an object as unused.
   - **object**: The object to dispose.

- **foreach**(cb): void   
Call callback for each instances.
   - **cb**
