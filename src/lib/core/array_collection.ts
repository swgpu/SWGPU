import { eventManager } from './event_manager';

/**
 * Generic class that represents a collection of items and provides event-based features.
 * @typeParam T - The item type.
 */
class ArrayCollection<T> {
  items: Array<T>;

  /**
   * @param items - The `items` underlying collection's data.
   */
  constructor(items: Array<T> = []) {
    this.items = items;
  }

  /**
   * Returns items.
   */
  getItems(): Array<T> {
    return this.items;
  }

  /**
   * Adds an item.
   * 
   * @param {T} item - The item.
   * @param {boolean} [emit=false] - If `emit` is set to `true`, an event with the name 'E_ITEM_ADDED' will be emitted.
   */
  push(item: T, emit: boolean = false): number {
    const length = this.items.push(item);
    if (emit) {
      eventManager.emit(this, 'E_ITEM_ADDED', { item: item, index: this.items.indexOf(item) });
    }

    return length;
  }

  /**
   * Remove and returns the last item.
   * 
   * @param {boolean} [emit=false] - If `emit` is set to `true`, an event with the name 'E_ITEM_REMOVED' will be emitted.
   */
  pop(emit: boolean = false): T | undefined {
    const item = this.items.pop();
    if (emit) {
      eventManager.emit(this, 'E_ITEM_REMOVED', { item: item, index: this.items.length });
    }

    return item;
  }

  /**
   * Removes an item and returns its index.
   * 
   * @param {T} item - The item.
   * @param {boolean} [emit=false] - If `emit` is set to `true`, an event with the name 'E_ITEM_REMOVED' will be emitted.
   */
  remove(item: T, emit: boolean = false): number {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    if (emit) {
      eventManager.emit(this, 'E_ITEM_REMOVED', { item: item, index: index });
    }

    return index;
  }

  /**
   * Removes an item at a specified index and returns the removed item.
   * 
   * @param {number} index - The index.
   * @param {boolean} [emit=false] - If `emit` is set to `true`, an event with the name 'E_ITEM_REMOVED' will be emitted.
   */
  removeAt(index: number, emit: boolean = false): T {
    const item = this.items.splice(index, 1) as T;
    if (emit) {
      eventManager.emit(this, 'E_ITEM_REMOVED', { item: item, index: index });
    }

    return item;
  }

  /**
   * Checks if an item is present in the collection.
   * 
   * @param {T} item - The item.
   */
  has(item: T): boolean {
    return this.items.indexOf(item) != -1;
  }

  /**
   * Removes all items.
   */
  clear(): void {
    while (this.items.length) {
      this.items.pop();
    }
  }
}

export { ArrayCollection };