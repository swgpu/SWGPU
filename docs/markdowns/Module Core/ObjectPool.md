# ObjectPool

Manage a pool of objects, it take a original mesh and make numInstances clones.
Note: You can perfectly do without pool but for some cases it is used to keep performance stables.
## Constructors
* **new ObjectPool**(originObject: T, numInstances: number, reset): ObjectPool   
  * **originObject**: The original object.
  * **numInstances**: The number of allocated instances.
  * **reset**
## Methods
* **acquire**()   
* **delete**(): void   
* **dispose**(object: Poolable): void   
  * **object**: The object to dispose.
* **foreach**(cb): void   
  * **cb**
