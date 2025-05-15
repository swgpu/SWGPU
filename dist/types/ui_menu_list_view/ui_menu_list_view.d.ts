import { ArrayCollection } from '../core/array_collection';
import { UIMenu } from '../ui_menu/ui_menu';
/**
 * A UI widget displaying a menu that make update automatically when a datasource changed.
 * Note: It send same event than UIMenu.
 * @typeParam T - The item type.
 */
declare class UIMenuListView<T> extends UIMenu {
    #private;
    collection: ArrayCollection<T>;
    views: Array<T>;
    sortPredicate: (a: T, b: T) => number;
    filterPredicate: (a: T) => boolean;
    enablePredicate: (a: T) => boolean;
    /**
     * @param options - Various options for configuring the behavior of the menu.
     */
    constructor(options?: {});
    /**
     * Free all resources.
     * Warning: You need to call this method to free allocation for this object.
     */
    delete(): void;
    /**
     * Set a data-source collection.
     *
     * @param {ArrayCollection<T>} collection - The data-source collection.
     */
    setCollection(collection: ArrayCollection<T>): void;
    /**
     * Virtual method called when data is added to the collection.
     * Usually, it create the wanted widget item and add it to the menu.
     * Warning: please don't forget to overwrite this method otherwise list-view will stay empty ;)
     *
     * @param {T} item - The added item coming from the data-source collection.
     * @param {boolean} [enabled=true] - Determines whether the item should be enabled or disabled.
     * @param {number} index - The index position at which the item should be added in the list.
     */
    addItem(item: T, enabled?: boolean, index?: number): void;
    /**
     * Returns the focused data item.
     */
    getFocusedItem(): T;
    /**
     * Returns the selected data item.
     */
    getSelectedItem(): T;
    /**
     * Set the sort predicate.
     *
     * @param sortPredicate - Determine the sorting order of the items in the list-view.
     */
    setSortPredicate(sortPredicate: (a: T, b: T) => number): void;
    /**
     * Set a filter predicate.
     *
     * @param filterPredicate - Determine whether an item should be included in the filtered views or not.
     */
    setFilterPredicate(filterPredicate: (a: T) => boolean): void;
    /**
     * Set a enable predicate.
     *
     * @param enablePredicate - Determine whether an item should be enabled or disabled.
     */
    setEnablePredicate(enablePredicate: (a: T) => boolean): void;
    /**
     * Returns the list of displayed item data (called as "views").
     */
    getViews(): Array<T>;
}
export { UIMenuListView };
