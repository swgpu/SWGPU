/**
 * Generic class that represents a collection of items and provides event-based features.
 * @typeParam T - The item type.
 * It emit 'E_ITEM_ADDED' with data { item, index }
 * It emit 'E_ITEM_REMOVED' with data { item, index }
 */
declare class ArrayCollection<T> {
    items: Array<T>;
    /**
     * @param items - The `items` underlying collection's data.
     */
    constructor(items?: Array<T>);
    /**
     * Returns items.
     */
    getItems(): Array<T>;
    /**
     * Adds an item.
     *
     * @param {T} item - The item.
     * @param {boolean} [emit=false] - If `emit` is set to `true`, an event with the name 'E_ITEM_ADDED' will be emitted.
     */
    push(item: T, emit?: boolean): number;
    /**
     * Remove and returns the last item.
     *
     * @param {boolean} [emit=false] - If `emit` is set to `true`, an event with the name 'E_ITEM_REMOVED' will be emitted.
     */
    pop(emit?: boolean): T | undefined;
    /**
     * Removes an item and returns its index.
     *
     * @param {T} item - The item.
     * @param {boolean} [emit=false] - If `emit` is set to `true`, an event with the name 'E_ITEM_REMOVED' will be emitted.
     */
    remove(item: T, emit?: boolean): number;
    /**
     * Removes an item at a specified index and returns the removed item.
     *
     * @param {number} index - The index.
     * @param {boolean} [emit=false] - If `emit` is set to `true`, an event with the name 'E_ITEM_REMOVED' will be emitted.
     */
    removeAt(index: number, emit?: boolean): T;
    /**
     * Checks if an item is present in the collection.
     *
     * @param {T} item - The item.
     */
    has(item: T): boolean;
    /**
     * Removes all items.
     */
    clear(): void;
}
export { ArrayCollection };
