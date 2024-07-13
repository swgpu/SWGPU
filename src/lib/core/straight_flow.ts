import { eventManager } from './event_manager';

enum StraightFlowState {
  CANCEL = 'CANCEL',
  CONTINUE = 'CONTINUE'
};

/**
 * Manage a straight flow entries.
 */
class StraightFlow {
  entries: Array<StraightFlowEntry>;
  currentEntryIndex: number;

  constructor() {
    this.entries = [];
    this.currentEntryIndex = 0;
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number) {
    if (this.currentEntryIndex >= this.entries.length) {
      return;
    }

    const currentEntry = this.entries[this.currentEntryIndex];
    currentEntry.update(ts);

    if (currentEntry.state == StraightFlowState.CONTINUE) {
      const nextEntry = this.entries[this.currentEntryIndex + 1];
      if (nextEntry) {
        nextEntry.onEnter();
        currentEntry.onDelete();
        this.currentEntryIndex++;
      }

      if (this.currentEntryIndex >= this.entries.length) {
        eventManager.emit(this, 'E_FINISHED');
      }
    }

    if (currentEntry.state == StraightFlowState.CANCEL) {
      const previousEntry = this.entries[this.currentEntryIndex - 1];
      if (previousEntry) {
        previousEntry.onEnter();
        currentEntry.onDelete();
        this.currentEntryIndex--;  
      }
    }
  }

  /**
   * The draw function.
   */
  draw() {
    const entry = this.entries[this.currentEntryIndex];
    entry.draw();
  }

  /**
   * Push a new entry.
   * 
   * @param {StraightFlowEntry} entry - The flow entry.
   */
  push(entry: StraightFlowEntry): void {
    this.entries.push(entry);
  }
}

/**
 * An abstract flow entry.
 */
abstract class StraightFlowEntry {
  state: StraightFlowState | null;

  constructor() {
    this.state = null;
  }

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