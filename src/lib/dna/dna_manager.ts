import { eventManager } from '../core/event_manager';
import { inputManager } from '../input/input_manager';
import { DNAComponent } from './dna_component';
import { DNASystem } from './dna_system';

/**
 * The `DNAManager` is a singleton class responsible for managing entities and components in a pure ecs implementation, allowing for entity
 * creation, component addition and removal, and system updates.
 */
class DNAManager {
  entityIndex: number;
  entities: Map<number, Map<string, DNAComponent>>;
  systems: Array<DNASystem>;

  /**
   * The constructor.
   */
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
   * The "update" function update all systems.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    for (const system of this.systems) {
      system.update(ts);
    }
  }

  /**
   * The "draw" function draw all systems.
   */
  draw(): void {
    for (const system of this.systems) {
      system.draw();
    }
  }

  /**
   * The "setup" function initialize the manager and sets all systems ready to run.
   * @param systems - An array of DNASystem objects.
   */
  setup(systems: Array<DNASystem>): void {
    this.entities.clear();
    this.systems = systems;
  }

  /**
   * The "createEntity" function creates a new entity and returns its uid based on a incremented global index.
   * @returns The method returns the entity's id.
   */
  createEntity(): number {
    this.entities.set(this.entityIndex, new Map<string, DNAComponent>());
    return this.entityIndex++;
  }

  /**
   * The "removeEntity" function removes entity.
   * @param {number} eid - The `eid` parameter is the entity's id.
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
   * The "hasEntity" function checks if an entity exists.
   * @param {number} id - The `id` parameter is the entity's id.
   * @returns The method returns a boolean value indicating whether or not the entity exist in collection.
   */
  hasEntity(id: number): boolean {
    return this.entities.has(id);
  }

  /**
   * The "findEntities" function takes a component typename and returns an array of entity
   * ids that have that component.
   * @param {string} componentTypeName - The parameter `componentTypeName` is a string that represents
   * the name of a component type.
   * @returns The method returns an array of entity ids.
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
   * The "findEntity" function retrieves the first entity that has a specific component type and returns its
   * entity's id.
   * @param {string} componentTypeName - The `componentTypeName` parameter is a string that represents
   * the name of a component type.
   * @returns The method returns a entity's id. If no matching component is found, it returns -1.
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
   * The "addComponent" function adds a DNAComponent to an entity. This entity is binded to all matching DNASystem.
   * @param {number} eid - The `eid` parameter is the entity's id.
   * @param {DNAComponent} component - The `component` parameter is the component to add.
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
   * The "removeComponent" function removes a DNAComponent to an entity. This entity is unbinded from all unmatching DNASystem.
   * @param {number} eid - The `eid` parameter is the entity's id.
   * @param {string} typename - The `typename` parameter is a string that represents
   * the name of a component type.
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
   * The "removeComponentIfExist" function removes a component from an entity if it exists and returns true, otherwise it returns
   * false.
   * @param {number} eid - The `eid` parameter is the entity's id.
   * @param {string} typename - The `typename` parameter is a string that represents
   * the name of a component type.
   * @returns a boolean value. It returns true if the component exists on the entity and is successfully
   * removed, and false if the component does not exist.
   */
  removeComponentIfExist(eid: number, typename: string): boolean {
    if (this.hasComponent(eid, typename)) {
      this.removeComponent(eid, typename);
      return true;
    }

    return false;
  }

  /**
   * The "getComponent" function retrieves a specific component from an entity.
   * @param {number} eid - The `eid` parameter is the entity's id.
   * @param {string} typename - The `typename` parameter is a string that represents
   * the name of a component type.
   * @returns a DNAComponent.
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
   * The "getComponents" function retrieves components from an entity.
   * @param {number} eid - The `eid` parameter is the entity's id.
   * @returns The method returns the entity's component list.
   */
  getComponents(eid: number): Map<string, DNAComponent> {
    const found = this.entities.get(eid);
    if (!found) {
      throw new Error('DNAManager::getEntity(): Entity not found');
    }

    return found;
  }

  /**
   * The function checks if an entity has a specific component.
   * @param {number} eid - The `eid` parameter is the entity's id.
   * @param {string} typename - The `typename` parameter is a string that represents
   * the name of a component type.
   * @returns a boolean value.
   */
  hasComponent(eid: number, typename: string): boolean {
    const components = this.entities.get(eid);
    if (!components) {
      throw new Error('DNAManager::hasComponent(): Entity not found');
    }

    return components.has(typename);
  }
}

const dnaManager = new DNAManager();
export { DNAManager };
export { dnaManager };
