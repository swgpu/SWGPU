import { DNAComponent } from './dna_component';
/**
 * A system in a pure ECS data-driven implementation.
 */
declare class DNASystem {
    eids: Array<number>;
    requiredComponentTypenames: Set<string>;
    paused: boolean;
    tags: Array<string>;
    /**
     * @param {Array<string>} tags - A list of tags.
     */
    constructor(tags?: never[]);
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
     * The render function.
     */
    render(): void;
    /**
     * Call "onAction" for each entity (for internal use).
     *
     * @param {string} actionId - The identifier of the action (see input_manager).
     */
    action(actionId: string): void;
    /**
     * Call "onActionOnce" for each entity (for internal use).
     *
     * @param {string} actionId - The identifier of the action (see input_manager).
     */
    actionOnce(actionId: string): void;
    /**
     * Call "onActionReleased" for each entity (for internal use).
     *
     * @param {string} actionId - The identifier of the action (see input_manager).
     */
    actionReleased(actionId: string): void;
    /**
     * Add entity to the system.
     *
     * @param {number} eid - The entity's id.
     */
    bindEntity(eid: number): void;
    /**
     * Remove entity from the system.
     *
     * @param {number} eid - The entity's id.
     */
    unbindEntity(eid: number): void;
    /**
     * Checks if a given entity exists in the system.
     *
     * @param {number} eid - The entity's id.
     */
    hasEntity(eid: number): boolean;
    /**
     * Adds a component requirements.
     * When you add a component to an entity, the manager will automatically bind this entity to systems that match these components list.
     *
     * @param {string} typename - The component typename.
     */
    addRequiredComponentTypename(typename: string): void;
    /**
     * Checks if a given set of components matches the system component requirements.
     *
     * @param components - A list of component.
     */
    isMatchingComponentRequirements(components: IterableIterator<DNAComponent>): boolean;
    /**
     * Make the update loop paused.
     */
    pause(): void;
    /**
     * Make the update loop running.
     */
    resume(): void;
    /**
     * Returns the list of tags.
     */
    getTags(): Array<string>;
    /**
     * Checks if system has the given tag.
     *
     * @param {string} tag - The tag.
     */
    hasTag(tag: string): boolean;
    /**
     * Virtual method that is called when an action occurs.
     *
     * @param {string} actionId - The identifier of the action (see input_manager).
     * @param {number} eid - The entity's id.
     */
    onAction(actionId: string, eid: number): void;
    /**
     * Virtual method that is called when a specific action occurs once.
     *
     * @param {string} actionId - The identifier of the action (see input_manager).
     * @param {number} eid - The entity's id.
     */
    onActionOnce(actionId: string, eid: number): void;
    /**
     * Virtual method that is called when a specific action is released.
     *
     * @param {string} actionId - The identifier of the action (see input_manager).
     * @param {number} eid - The entity's id.
     */
    onActionReleased(actionId: string, eid: number): void;
    /**
     * Virtual method that is called before the entities update phase.
     *
     * @param {number} ts - The timestep.
     */
    onBeforeUpdate(ts: number): void;
    /**
     * Virtual method that is called for each entity during the update phase.
     *
     * @param {number} ts - The timestep.
     * @param {number} eid - The entity's id.
     */
    onEntityUpdate(ts: number, eid: number): void;
    /**
     * Virtual method that is called after the entities update phase.
     *
     * @param {number} ts - The timestep.
     */
    onAfterUpdate(ts: number): void;
    /**
     * Virtual method that is called before the entities draw phase.
     */
    onBeforeDraw(): void;
    /**
     * Virtual method that is called for each entity during the draw phase.
     *
     * @param {number} eid - The entity's id.
     */
    onEntityDraw(eid: number): void;
    /**
     * Virtual method that is called after the entities draw phase.
     */
    onAfterDraw(): void;
    /**
     * Virtual method that is called during entity binding.
     *
     * @param {number} eid - The entity's id.
     */
    onEntityBind(eid: number): void;
    /**
     * Virtual method that is called during entity unbinding.
     *
     * @param {number} eid - The entity's id.
     */
    onEntityUnbind(eid: number): void;
}
export { DNASystem };
