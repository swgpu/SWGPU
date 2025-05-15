import { DNAComponent } from './dna_component';
import { DNASystem } from './dna_system';
type Constructor<T> = new (...args: any[]) => T;
/**
 * Singleton pure ECS manager.
 */
declare class DNAManager {
    count: number;
    entities: Map<number, Map<string, DNAComponent>>;
    entitiesSet: Map<number, Set<string>>;
    systems: Array<DNASystem>;
    constructor();
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * The draw function.
     */
    draw(): void;
    /**
     * Setup your systems here.
     *
     * @param systems - A list of systems.
     */
    setup(systems: Array<DNASystem>): void;
    /**
     * Resets all.
     */
    reset(): void;
    /**
     * Creates a new entity and returns its uid.
     */
    createEntity(): number;
    /**
     * Creates a new entity and returns its uid.
     *
     * @param {Array<DNAComponent>} components - The component list.
     */
    createEntityWith(components: Array<DNAComponent>): number;
    /**
     * Removes entity.
     *
     * @param {number} eid - The entity's id.
     */
    removeEntity(eid: number): void;
    /**
     * Checks if an entity exists.
     *
     * @param {number} id - The entity's id.
     */
    hasEntity(id: number): boolean;
    /**
     * Returns entities having all required components.
     *
     * @param {Set<string>} components - The component name list.
     */
    query(components: Set<string>): Array<number>;
    /**
     * Find entities having that component.
     *
     * @param {Constructor<T>} component - The component class.
     */
    findEntities<T extends DNAComponent>(component: Constructor<T>): Array<number>;
    /**
     * Find the first entity having that component. If no match is found, it returns -1.
     *
     * @param {Constructor<T>} component - The component class.
     */
    findEntity<T extends DNAComponent>(component: Constructor<T>): number;
    /**
     * Adds component to an entity.
     *
     * @param {number} eid - The entity's id.
     * @param {DNAComponent} component - The component.
     */
    addComponent(eid: number, component: DNAComponent): void;
    /**
     * Removes component to an entity.
     *
     * @param {number} eid - The entity's id.
     * @param {Constructor<T>} component - The component class.
     */
    removeComponent<T extends DNAComponent>(eid: number, component: Constructor<T>): void;
    /**
     * Returns component from an entity.
     *
     * @param {number} eid - The entity's id.
     * @param {Constructor<T>} component - The component class.
     */
    getComponent<T extends DNAComponent>(eid: number, component: Constructor<T>): T;
    /**
     * Returns all components from an entity.
     *
     * @param {number} eid - The entity's id.
     */
    getComponents(eid: number): IterableIterator<DNAComponent>;
    /**
     * Returns all components of specified type as a list of pair like <eid, component>.
     *
     * @param {Constructor<T>} component - The component class.
     */
    getAllComponents<T extends DNAComponent>(component: Constructor<T>): Map<number, DNAComponent>;
    /**
     * Check if an entity has a specific component.
     *
     * @param {number} eid - The entity's id.
     * @param {Constructor<T>} component - The component typename.
     */
    hasComponent<T extends DNAComponent>(eid: number, component: Constructor<T>): boolean;
    /**
     * Returns the list of systems.
     */
    getSystems(): Array<DNASystem>;
    /**
     * Returns all systems that have specific tag.
     * @param {string} tag - The tag to search.
     */
    findSystems(tag: string): Array<DNASystem>;
    /**
     * Replace a component by another.
     *
     * @param {DNAComponent} component - The .
     */
    replaceComponent<T extends DNAComponent>(eid: number, oldComponent: Constructor<T>, newComponent: DNAComponent): void;
    /**
     * Removes a component from an entity if it exists and returns true, otherwise it returns false.
     *
     * @param {number} eid - The entity's id.
     * @param {Constructor<T>} component - The component class.
     */
    removeComponentIfExist<T extends DNAComponent>(eid: number, component: Constructor<T>): boolean;
}
declare const dnaManager: DNAManager;
export { DNAManager };
export { dnaManager };
