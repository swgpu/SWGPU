import { eventManager } from './event_manager';

/**
 * The `ArrayCollection` class is a generic class that represents a collection of items and provides
 * event-based methods for adding, removing, and checking the presence of items in the collection.
 * @typeParam T - The item type.
 */
class ArrayCollection<T> {
  items: Array<T>;

  /**
   * The constructor.
   * @param items - The `items` underlying collection's data.
   */
  constructor(items: Array<T> = []) {
    this.items = items;
  }

  /**
   * The "getItems" function returns an array of type T.
   * @returns An array of type T.
   */
  getItems(): Array<T> {
    return this.items;
  }

  /**
   * The "push" function adds an item to the collection and emits an event if specified.
   * @param {T} item - The `item` parameter represents the item that you want to push into the `items`
   * array. It can be of any type (`T`).
   * @param {boolean} [emit=false] - The `emit` parameter is a boolean flag that determines whether an
   * event should be emitted after pushing the item to the array. If `emit` is set to `true`, an event
   * with the name 'E_ITEM_ADDED' will be emitted.
   * @returns The length of the `items` array after the `item` has been pushed into it.
   */
  push(item: T, emit: boolean = false): number {
    const length = this.items.push(item);
    if (emit) {
      eventManager.emit(this, 'E_ITEM_ADDED', { item: item, index: this.items.indexOf(item) });
    }

    return length;
  }

  /**
   * The "pop" function removes and returns the last item from the collection, and emits an event if specified.
   * @param {boolean} [emit=false] - The `emit` parameter is a boolean flag that determines whether an
   * event should be emitted when an item is removed from the list. If `emit` is set to `true`, an event
   * with the name 'E_ITEM_REMOVED' will be emitted.
   * @returns The `pop` method returns the last item from the `items` array.
   */
  pop(emit: boolean = false): T | undefined {
    const item = this.items.pop();
    if (emit) {
      eventManager.emit(this, 'E_ITEM_REMOVED', { item: item, index: this.items.length });
    }

    return item;
  }

  /**
   * The "remove" function removes an item from the collection and emits an event if specified.
   * @param {T} item - The `item` parameter is the element that you want to remove from the `items`
   * array.
   * @param {boolean} [emit=false] - The `emit` parameter is a boolean flag that determines whether an
   * event should be emitted after removing the item. If `emit` is set to `true`, an event with the name
   * 'E_ITEM_REMOVED' will be emitted.
   * @returns The index of the removed item is being returned.
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
   * The "removeAt" function removes an item at a specified index from the collection and optionally emits an
   * event.
   * @param {number} index - The index parameter specifies the position of the item to be removed from
   * the items array. It is of type number and represents the zero-based index of the item to be removed.
   * @param {boolean} [emit=false] - The `emit` parameter is a boolean value that determines whether an
   * event should be emitted after removing an item from the `items` array. If `emit` is set to `true`,
   * an event with the name 'E_ITEM_REMOVED' will be emitted.
   * @returns The `removeAt` function is returning the item that was removed from the `items` array.
   */
  removeAt(index: number, emit: boolean = false): T {
    const item = this.items.splice(index, 1) as T;
    if (emit) {
      eventManager.emit(this, 'E_ITEM_REMOVED', { item: item, index: index });
    }

    return item;
  }

  /**
   * The "has" function checks if an item is present in the collection.
   * @param {T} item - The parameter "item" is of type T, which means it can be any type. It is used to
   * check if the given item exists in the "items" array.
   * @returns The method is returning a boolean value.
   */
  has(item: T): boolean {
    return this.items.indexOf(item) != -1;
  }

  /**
   * The "clear" function removes all items from the collection.
   */
  clear(): void {
    while (this.items.length) {
      this.items.pop();
    }
  }
}

export { ArrayCollection };