# DNAManager

Singleton pure ECS manager.
## Constructors
* **new DNAManager**(): DNAManager   
## Methods
* **addComponent**(eid: number, component: DNAComponent): void   
  * **eid**: The entity's id.
  * **component**: The component.
* **createEntity**(): number   
* **createEntityWith**(components: DNAComponent[]): number   
  * **components**: The component list.
* **draw**(): void   
* **findEntities**(component: Constructor)   
  * **component**: The component class.
* **findEntity**(component: Constructor): number   
  * **component**: The component class.
* **findSystems**(tag: string)   
  * **tag**: The tag to search.
* **getAllComponents**(component: Constructor): Map   
  * **component**: The component class.
* **getComponent**(eid: number, component: Constructor): T   
  * **eid**: The entity's id.
  * **component**: The component class.
* **getComponents**(eid: number): IterableIterator   
  * **eid**: The entity's id.
* **getSystems**()   
* **hasComponent**(eid: number, component: Constructor): boolean   
  * **eid**: The entity's id.
  * **component**: The component typename.
* **hasEntity**(id: number): boolean   
  * **id**: The entity's id.
* **query**(components: Set)   
  * **components**: The component name list.
* **removeComponent**(eid: number, component: Constructor): void   
  * **eid**: The entity's id.
  * **component**: The component class.
* **removeComponentIfExist**(eid: number, component: Constructor): boolean   
  * **eid**: The entity's id.
  * **component**: The component class.
* **removeEntity**(eid: number): void   
  * **eid**: The entity's id.
* **replaceComponent**(eid: number, oldComponent: Constructor, newComponent: DNAComponent): void   
  * **eid**
  * **oldComponent**
  * **newComponent**
* **reset**(): void   
* **setup**(systems: DNASystem[]): void   
  * **systems**: A list of systems.
* **update**(ts: number): void   
  * **ts**: The timestep.
