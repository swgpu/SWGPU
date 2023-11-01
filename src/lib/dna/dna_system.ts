import { DNAComponent } from './dna_component';

/**
 * The `DNASystem` class is a base class that provides functionality for managing entities and their
 * components in a game or simulation system.
 */
class DNASystem {
  eids: Set<number>;
  requiredComponentTypenames: Set<string>;

  /**
   * The constructor.
   */
  constructor() {
    this.eids = new Set<number>();
    this.requiredComponentTypenames = new Set<string>();
  }

  /**
   * The "update" function iterates over entities and calls the virtual method `onEntityUpdate` for each entity.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    this.onBeforeUpdate(ts);

    for (const eid of this.eids) {
      this.onEntityUpdate(ts, eid);
    }

    this.onAfterUpdate(ts);
  }

  /**
   * The "draw" function iterates over a collection of entities and calls the virtual method `onEntityDraw` for
   * each entity.
   */
  draw(): void {
    for (const eid of this.eids) {
      this.onEntityDraw(eid);
    }
  }

  /**
   * The "action" function iterates over a list of entities and calls the virtual method `onAction` for each entity with a
   * given actionId.
   * @param {string} actionId - The `actionId` parameter is a string that represents the identifier of
   * the action to be performed (see input_manager).
   */
  action(actionId: string): void {
    for (const eid of this.eids) {
      this.onAction(actionId, eid);
    }
  }

  /**
   * The "actionOnce" function iterates over a list of entities and calls the virtual method `onActionOnce`
   * for each entity with a given actionId.
   * @param {string} actionId - The `actionId` parameter is a string that represents the identifier of
   * the action to be performed (see input_manager).
   */
  actionOnce(actionId: string): void {
    for (const eid of this.eids) {
      this.onActionOnce(actionId, eid);
    }
  }

  /**
   * The "bindEntity" function checks if an entity already exists in the system and throws an error if it
   * does, otherwise it adds the entity to the system.
   * @param {number} eid - The `eid` parameter is the entity's id.
   */
  bindEntity(eid: number): void {
    if (this.eids.has(eid)) {
      throw new Error('DNASystem::bindEntity(): Entity already exist in this system');
    }

    this.onEntityBind(eid);
    this.eids.add(eid);
  }

  /**
   * The "unbindEntity" function unbinds an entity from the system if it exists, otherwise it throws an error.
   * @param {number} eid - The `eid` parameter is the entity's id.
   */
  unbindEntity(eid: number): void {
    if (!this.eids.has(eid)) {
      throw new Error('DNASystem::unbindEntity(): Entity not exist in this system');
    }

    this.onEntityUnbind(eid);
    this.eids.delete(eid);
  }

  /**
   * The "hasEntity" function checks if a given entity exists in this system.
   * @param {number} eid - The `eid` parameter is the entity's id.
   * @returns a boolean value.
   */
  hasEntity(eid: number): boolean {
    return this.eids.has(eid);
  }

  /**
   * The "addRequiredComponentTypename" function adds a typename to a set of required component
   * typenames, throwing an error if the typename is already present.
   * @param {string} typename - The `typename` parameter is a string that represents
   * the name of a component type.
   */
  addRequiredComponentTypename(typename: string): void {
    if (this.requiredComponentTypenames.has(typename)) {
      throw new Error('DNASystem::addRequiredComponentTypename(): Required typename already set in this system');
    }

    this.requiredComponentTypenames.add(typename);
  }

  /**
   * The "isMatchingComponentRequirements" function checks if a given set of components matches the required component typenames.
   * @param components - An iterable component list.
   * @returns a boolean value.
   */
  isMatchingComponentRequirements(components: IterableIterator<DNAComponent>): boolean {
    let numRequiredComponents = this.requiredComponentTypenames.size;
    let numMatchingComponents = 0;

    for (const component of components) {
      if (this.requiredComponentTypenames.has(component.getTypename())) {
        numMatchingComponents++;
      }
    }

    return numMatchingComponents == numRequiredComponents;
  }

  /**
   * The "onAction" is a virtual method that is called when an action occurs.
   * @param {string} actionId - The `actionId` parameter is a string that represents the unique identifier
   * of the action that occurred (see input_manager).
   * @param {number} eid - The `eid` parameter is the entity's id.
   */
  onAction(actionId: string, eid: number): void {
    // virtual method called when action occured !
  }

  /**
   * The "onActionOnce" is a virtual method that is called when a specific action occurs once.
   * @param {string} actionId - The `actionId` parameter is a string that represents the unique identifier
   * of the action that occurred (see input_manager).
   * @param {number} eid - The `eid` parameter is the entity's id.
   */
  onActionOnce(actionId: string, eid: number): void {
    // virtual method called when action occured once !
  }

  /**
   * The "onBeforeUpdate" is a virtual method that is called before the entities update phase.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  onBeforeUpdate(ts: number): void {
    // virtual method called during before update phase !
  }

  /**
   * The "onEntityUpdate" is a virtual method that is called for each entity during the update phase.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   * @param {number} eid - The `eid` parameter is the entity's id.
   */
  onEntityUpdate(ts:number, eid: number): void {
    // virtual method called during update phase !
  }

  /**
   * The "onAfterUpdate" is a virtual method that is called after the entities update phase.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  onAfterUpdate(ts: number): void {
    // virtual method called during after update phase !
  }

  /**
   * The "onEntityDraw" is a virtual method that is called for each entity during the draw phase.
   * @param {number} eid - The `eid` parameter is the entity's id.
   */
  onEntityDraw(eid: number): void {
    // virtual method called during draw phase !
  }

  /**
   * The "onEntityBind" is a virtual method that is called during entity binding.
   * @param {number} eid - The `eid` parameter is the entity's id.
   */
  onEntityBind(eid: number): void {
    // virtual method called during entity binding !
  }

  /**
   * The "onEntityUnbind" is a virtual method that is called during entity unbinding.
   * @param {number} eid - The `eid` parameter is the entity's id.
   */
  onEntityUnbind(eid: number): void {
    // virtual method called during entity unbinding !
  }
}

export { DNASystem };