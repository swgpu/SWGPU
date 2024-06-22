import { eventManager } from '../core/event_manager';
import { inputManager } from '../input/input_manager';
import { DNAComponent } from './dna_component';
import { DNASystem } from './dna_system';

type Constructor<T> = new (...args: any[]) => T;

/**
 * Singleton pure ECS manager.
 */
class DNAManager {
  count: number;
  entities: Map<number, Map<string, DNAComponent>>;
  systems: Array<DNASystem>;

  constructor() {
    this.count = 0;
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
    this.count = 0;
    this.entities.clear();
    this.systems = systems;
  }

  /**
   * Resets all.
   */
  reset(): void {
    this.count = 0;
    this.entities.clear();
    this.systems = [];
  }

  /**
   * Creates a new entity and returns its uid.
   */
  createEntity(): number {
    this.entities.set(this.count, new Map<string, DNAComponent>());
    return this.count++;
  }

  /**
   * Creates a new entity and returns its uid.
   * 
   * @param {Array<DNAComponent>} components - The component list.
   */
  createEntityWith(components: Array<DNAComponent>): number {
    this.entities.set(this.count, new Map<string, DNAComponent>());
    for (const component of components) {
      this.addComponent(this.count, component);
    }

    return this.count++;
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
   * @param {Constructor<T>} component - The component class.
   */
  findEntities<T extends DNAComponent>(component: Constructor<T>): Array<number> {
    const eids = Array<number>();

    for (let [eid, components] of this.entities) {
      if (components.has(component.name)) {
        eids.push(eid);
      }
    }

    return eids;
  }

  /**
   * Find the first entity having that component. If no match is found, it returns -1.
   * 
   * @param {Constructor<T>} component - The component class.
   */
  findEntity<T extends DNAComponent>(component: Constructor<T>): number {
    for (let [eid, components] of this.entities) {
      if (components.has(component.name)) {
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

    const found = components.has(component.constructor.name);
    if (found) {
      throw new Error('DNAManager::addComponent(): Entity already has ' + component.constructor.name);
    }

    components.set(component.constructor.name, component);

    for (const system of this.systems) {
      if (system.isMatchingComponentRequirements(components.values()) && !system.hasEntity(eid)) {
        system.bindEntity(eid);
      }
    }
  }

  /**
   * Replace a component by another.
   * 
   * @param {DNAComponent} component - The .
   */
  replaceComponent<T extends DNAComponent>(eid: number, oldComponent: Constructor<T>, newComponent: DNAComponent): void {
    this.removeComponentIfExist(eid, oldComponent);
    this.addComponent(eid, newComponent);
  }

  /**
   * Removes component to an entity.
   * 
   * @param {number} eid - The entity's id.
   * @param {Constructor<T>} component - The component class.
   */
  removeComponent<T extends DNAComponent>(eid: number, component: Constructor<T>): void {
    const components = this.entities.get(eid);
    if (!components) {
      throw new Error('DNAManager::removeComponent(): Entity not found');
    }

    const found = components.has(component.name);
    if (!found) {
      throw new Error('DNAManager::removeComponent(): Entity has not ' + component.name);
    }

    components.delete(component.name);

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
   * @param {Constructor<T>} component - The component class.
   */
  removeComponentIfExist<T extends DNAComponent>(eid: number, component: Constructor<T>): boolean {
    if (this.hasComponent(eid, component)) {
      this.removeComponent(eid, component);
      return true;
    }

    return false;
  }

  /**
   * Returns component from an entity.
   * 
   * @param {number} eid - The entity's id.
   * @param {Constructor<T>} component - The component class.
   */
  getComponent<T extends DNAComponent>(eid: number, component: Constructor<T>): T {
    const components = this.entities.get(eid);
    if (!components) {
      throw new Error('DNAManager::getComponent(): Entity not found');
    }

    const found = components.get(component.name);
    if (!found) {
      throw new Error('DNAManager::getComponent(): Entity has not ' + component.name);
    }

    return found as T;
  }

  /**
   * Returns all components from an entity.
   * 
   * @param {number} eid - The entity's id.
   */
  getComponents(eid: number): IterableIterator<DNAComponent> {
    const found = this.entities.get(eid);
    if (!found) {
      throw new Error('DNAManager::getEntity(): Entity not found');
    }

    return found.values();
  }

  /**
   * Check if an entity has a specific component.
   * 
   * @param {number} eid - The entity's id.
   * @param {Constructor<T>} component - The component typename.
   */
  hasComponent<T extends DNAComponent>(eid: number, component: Constructor<T>): boolean {
    const components = this.entities.get(eid);
    if (!components) {
      throw new Error('DNAManager::hasComponent(): Entity not found');
    }

    return components.has(component.name);
  }

  /**
   * Returns all components of specified type as a list of pair like <eid, component>.
   * 
   * @param {Constructor<T>} component - The component class.
   */
  getAllComponents<T extends DNAComponent>(component: Constructor<T>): Map<number, DNAComponent> {
    const res = new Map<number, DNAComponent>();

    for (const [eid, components] of this.entities.entries()) {
      const c = components.get(component.name);
      if (c) res.set(eid, c);
    }

    return res;
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