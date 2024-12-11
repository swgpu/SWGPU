# DNASystem

A system in a pure ECS data-driven implementation.
## Constructors
* **new DNASystem**(tags: never[]): DNASystem   
  * **tags**: A list of tags.
## Methods
* **action**(actionId: string): void   
  * **actionId**: The identifier of the action (see input_manager).
* **actionOnce**(actionId: string): void   
  * **actionId**: The identifier of the action (see input_manager).
* **addRequiredComponentTypename**(typename: string): void   
  * **typename**: The component typename.
* **bindEntity**(eid: number): void   
  * **eid**: The entity's id.
* **draw**(): void   
* **getTags**()   
* **hasEntity**(eid: number): boolean   
  * **eid**: The entity's id.
* **hasTag**(tag: string): boolean   
  * **tag**: The tag.
* **isMatchingComponentRequirements**(components: IterableIterator): boolean   
  * **components**: A list of component.
* **onAction**(actionId: string, eid: number): void   
  * **actionId**: The identifier of the action (see input_manager).
  * **eid**: The entity's id.
* **onActionOnce**(actionId: string, eid: number): void   
  * **actionId**: The identifier of the action (see input_manager).
  * **eid**: The entity's id.
* **onAfterDraw**(): void   
* **onAfterUpdate**(ts: number): void   
  * **ts**: The timestep.
* **onBeforeDraw**(): void   
* **onBeforeUpdate**(ts: number): void   
  * **ts**: The timestep.
* **onEntityBind**(eid: number): void   
  * **eid**: The entity's id.
* **onEntityDraw**(eid: number): void   
  * **eid**: The entity's id.
* **onEntityUnbind**(eid: number): void   
  * **eid**: The entity's id.
* **onEntityUpdate**(ts: number, eid: number): void   
  * **ts**: The timestep.
  * **eid**: The entity's id.
* **pause**(): void   
* **resume**(): void   
* **unbindEntity**(eid: number): void   
  * **eid**: The entity's id.
* **update**(ts: number): void   
  * **ts**: The timestep.
