import { DNAComponent } from './dna_component';

/**
 * A system in a pure ECS data-driven implementation.
 */
class DNASystem {
  eids: Array<number>;
  requiredComponentTypenames: Set<string>;
  paused: boolean;
  tags: Array<string>;

  /**
   * @param {Array<string>} tags - A list of tags.
   */
  constructor(tags = []) {
    this.eids = new Array<number>();
    this.requiredComponentTypenames = new Set<string>();
    this.paused = false;
    this.tags = tags;
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    if (this.paused) {
      return;
    }

    this.onBeforeUpdate(ts);

    for (const eid of this.eids) {
      this.onEntityUpdate(ts, eid);
    }

    this.onAfterUpdate(ts);
  }

  /**
   * The draw function.
   */
  draw(): void {
    for (const eid of this.eids) {
      this.onEntityDraw(eid);
    }
  }

  /**
   * Call "onAction" for each entity (for internal use).
   * 
   * @param {string} actionId - The identifier of the action (see input_manager).
   */
  action(actionId: string): void {
    for (const eid of this.eids) {
      this.onAction(actionId, eid);
    }
  }

  /**
   * Call "onActionOnce" for each entity (for internal use).
   * 
   * @param {string} actionId - The identifier of the action (see input_manager).
   */
  actionOnce(actionId: string): void {
    for (const eid of this.eids) {
      this.onActionOnce(actionId, eid);
    }
  }

  /**
   * Add entity to the system.
   * 
   * @param {number} eid - The entity's id.
   */
  bindEntity(eid: number): void {
    if (this.eids.indexOf(eid) != -1) {
      throw new Error('DNASystem::bindEntity(): Entity already exist in this system');
    }

    this.eids.push(eid);
    this.onEntityBind(eid);
  }

  /**
   * Remove entity from the system.
   * 
   * @param {number} eid - The entity's id.
   */
  unbindEntity(eid: number): void {
    if (this.eids.indexOf(eid) == -1) {
      throw new Error('DNASystem::unbindEntity(): Entity not exist in this system');
    }

    this.eids.splice(this.eids.indexOf(eid), 1);
    this.onEntityUnbind(eid);
  }

  /**
   * Checks if a given entity exists in the system.
   * 
   * @param {number} eid - The entity's id.
   */
  hasEntity(eid: number): boolean {
    return this.eids.indexOf(eid) != -1;
  }

  /**
   * Adds a component requirements.
   * When you add a component to an entity, the manager will automatically bind this entity to systems that match these components list.
   * 
   * @param {string} typename - The component typename.
   */
  addRequiredComponentTypename(typename: string): void {
    if (this.requiredComponentTypenames.has(typename)) {
      throw new Error('DNASystem::addRequiredComponentTypename(): Required typename already set in this system');
    }

    this.requiredComponentTypenames.add(typename);
  }

  /**
   * Checks if a given set of components matches the system component requirements.
   * 
   * @param components - A list of component.
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
   * Make the update loop paused.
   */
  pause(): void {
    this.paused = true;
  }

  /**
   * Make the update loop running.
   */
  resume(): void {
    this.paused = false;
  }

  /**
   * Returns the list of tags.
   */
  getTags(): Array<string> {
    return this.tags;
  }

  /**
   * Checks if system has the given tag.
   * 
   * @param {string} tag - The tag.
   */
  hasTag(tag: string): boolean {
    return this.tags.indexOf(tag) != -1;
  }

  /**
   * Virtual method that is called when an action occurs.
   * 
   * @param {string} actionId - The identifier of the action (see input_manager).
   * @param {number} eid - The entity's id.
   */
  onAction(actionId: string, eid: number): void {}

  /**
   * Virtual method that is called when a specific action occurs once.
   * 
   * @param {string} actionId - The identifier of the action (see input_manager).
   * @param {number} eid - The entity's id.
   */
  onActionOnce(actionId: string, eid: number): void {}

  /**
   * Virtual method that is called before the entities update phase.
   * 
   * @param {number} ts - The timestep.
   */
  onBeforeUpdate(ts: number): void {}

  /**
   * Virtual method that is called for each entity during the update phase.
   * 
   * @param {number} ts - The timestep.
   * @param {number} eid - The entity's id.
   */
  onEntityUpdate(ts:number, eid: number): void {}

  /**
   * Virtual method that is called after the entities update phase.
   * 
   * @param {number} ts - The timestep.
   */
  onAfterUpdate(ts: number): void {}

  /**
   * Virtual method that is called for each entity during the draw phase.
   * 
   * @param {number} eid - The entity's id.
   */
  onEntityDraw(eid: number): void {}

  /**
   * Virtual method that is called during entity binding.
   * 
   * @param {number} eid - The entity's id.
   */
  onEntityBind(eid: number): void {}

  /**
   * Virtual method that is called during entity unbinding.
   * 
   * @param {number} eid - The entity's id.
   */
  onEntityUnbind(eid: number): void {}
}

export { DNASystem };
