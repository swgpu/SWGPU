import { eventManager } from '../core/event_manager';
import { inputManager } from '../input/input_manager';
import { DNAComponent } from './dna_component';
import { DNASystem } from './dna_system';

/**
 * Singleton pure ECS manager.
 */
class DNAManager {
  entityIndex: number;
  entities: Map<number, Map<string, DNAComponent>>;
  systems: Array<DNASystem>;

  constructor() {
    this.entityIndex = 0;
    this.entities = new Map<number, Map<string, DNAComponent>>();
    this.systems = [];

    eventManager.subscribe(inputManager, 'E_ACTION', this, (data: any) => {
      for (let system of this.systems) {
        system.action(data.actionId);
      }
    });

    eventManager.subscribe(inputManager, 'E_ACTION_ONCE', this, (data: any) => {
      for (let system of this.systems) {
        system.actionOnce(data.actionId);
      }
    });
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    for (const system of this.systems) {
      system.update(ts);
    }
  }

  /**
   * The draw function.
   */
  draw(): void {
    for (const system of this.systems) {
      system.draw();
    }
  }

  /**
   * Setup your systems here.
   * @param systems - A list of systems.
   */
  setup(systems: Array<DNASystem>): void {
    this.entityIndex = 0;
    this.entities.clear();
    this.systems = systems;
  }

  /**
   * Resets all.
   */
  reset(): void {
    this.entityIndex = 0;
    this.entities.clear();
    this.systems = [];
  }

  /**
   * Creates a new entity and returns its uid.
   */
  createEntity(): number {
    this.entities.set(this.entityIndex, new Map<string, DNAComponent>());
    return this.entityIndex++;
  }

  /**
   * Removes entity.
   * 
   * @param {number} eid - The entity's id.
   */
  removeEntity(eid: number): void {
    const found = this.entities.get(eid);
    if (!found) {
      throw new Error('DNAManager::removeEntity(): Entity not found');
    }

    this.entities.delete(eid);

    for (const system of this.systems) {
      if (system.hasEntity(eid)) {
        system.unbindEntity(eid);
      }
    }
  }

  /**
   * Checks if an entity exists.
   * 
   * @param {number} id - The entity's id.
   */
  hasEntity(id: number): boolean {
    return this.entities.has(id);
  }

  /**
   * Find entities having that component.
   * 
   * @param {string} componentTypeName - The component typename.
   */
  findEntities(componentTypeName: string): Array<number> {
    const eids = Array<number>();

    for (let [eid, components] of this.entities) {
      if (components.has(componentTypeName)) {
        eids.push(eid);
      }
    }

    return eids;
  }

  /**
   * Find the first entity having that component. If no match is found, it returns -1.
   * 
   * @param {string} componentTypeName - The component typename.
   */
  findEntity(componentTypeName: string): number {
    for (let [eid, components] of this.entities) {
      if (components.has(componentTypeName)) {
        return eid;
      }
    }

    return -1;
  }

  /**
   * Adds component to an entity.
   * 
   * @param {number} eid - The entity's id.
   * @param {DNAComponent} component - The component.
   */
  addComponent(eid: number, component: DNAComponent): void {
    const components = this.entities.get(eid);
    if (!components) {
      throw new Error('DNAManager::addComponent(): Entity not found');
    }

    const found = components.has(component.getTypename());
    if (found) {
      throw new Error('ECSEntity::addComponent(): Entity already has ' + component.getTypename());
    }

    components.set(component.getTypename(), component);

    for (const system of this.systems) {
      if (system.isMatchingComponentRequirements(components.values()) && !system.hasEntity(eid)) {
        system.bindEntity(eid);
      }
    }
  }

  /**
   * Removes component to an entity.
   * 
   * @param {number} eid - The entity's id.
   * @param {string} typename - The component typename.
   */
  removeComponent(eid: number, typename: string): void {
    const components = this.entities.get(eid);
    if (!components) {
      throw new Error('DNAManager::removeComponent(): Entity not found');
    }

    const found = components.has(typename);
    if (!found) {
      throw new Error('DNAManager::removeComponent(): Entity has not ' + typename);
    }

    components.delete(typename);

    for (const system of this.systems) {
      if (!system.isMatchingComponentRequirements(components.values()) && system.hasEntity(eid)) {
        system.unbindEntity(eid);
      }
    }
  }

  /**
   * Removes a component from an entity if it exists and returns true, otherwise it returns false.
   * 
   * @param {number} eid - The entity's id.
   * @param {string} typename - The component typename.
   */
  removeComponentIfExist(eid: number, typename: string): boolean {
    if (this.hasComponent(eid, typename)) {
      this.removeComponent(eid, typename);
      return true;
    }

    return false;
  }

  /**
   * Returns component from an entity.
   * 
   * @param {number} eid - The entity's id.
   * @param {string} typename - The component typename.
   */
  getComponent(eid: number, typename: string): DNAComponent {
    const components = this.entities.get(eid);
    if (!components) {
      throw new Error('DNAManager::getComponent(): Entity not found');
    }

    const found = components.get(typename);
    if (!found) {
      throw new Error('DNAManager::getComponent(): Entity has not ' + typename);
    }

    return found;
  }

  /**
   * Returns all components from an entity.
   * @param {number} eid - The entity's id.
   */
  getComponents(eid: number): Map<string, DNAComponent> {
    const found = this.entities.get(eid);
    if (!found) {
      throw new Error('DNAManager::getEntity(): Entity not found');
    }

    return found;
  }

  /**
   * Check if an entity has a specific component.
   * 
   * @param {number} eid - The entity's id.
   * @param {string} typename - The component typename.
   */
  hasComponent(eid: number, typename: string): boolean {
    const components = this.entities.get(eid);
    if (!components) {
      throw new Error('DNAManager::hasComponent(): Entity not found');
    }

    return components.has(typename);
  }

  /**
   * Returns the list of systems.
   */
  getSystems(): Array<DNASystem> {
    return this.systems;
  }

  /**
   * Returns all systems that have specific tag.
   * @param {string} tag - The tag to search.
   */
  findSystems(tag: string): Array<DNASystem> {
    return this.systems.filter(s => s.hasTag(tag));
  }
}

const dnaManager = new DNAManager();
export { DNAManager };
export { dnaManager };
