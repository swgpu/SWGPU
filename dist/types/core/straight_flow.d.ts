declare enum StraightFlowState {
    CANCEL = "CANCEL",
    CONTINUE = "CONTINUE"
}
/**
 * Manage a straight flow entries.
 */
declare class StraightFlow {
    entries: Array<StraightFlowEntry>;
    currentEntryIndex: number;
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
     * Push a new entry.
     *
     * @param {StraightFlowEntry} entry - The flow entry.
     */
    push(entry: StraightFlowEntry): void;
}
/**
 * An abstract flow entry.
 */
declare abstract class StraightFlowEntry {
    state: StraightFlowState | null;
    constructor();
    /**
     * Called when entry coming.
     */
    abstract onEnter(): void;
    /**
     * Called when entry is done.
     */
    abstract onDelete(): void;
    /**
     * The update method.
     */
    abstract update(ts: number): void;
    /**
     * The draw method.
     */
    abstract draw(): void;
}
export type { StraightFlowState };
export { StraightFlowEntry, StraightFlow };
