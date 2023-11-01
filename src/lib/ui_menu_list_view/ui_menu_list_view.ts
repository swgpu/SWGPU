import { eventManager } from '../core/event_manager';
import { ArrayCollection } from '../core/array_collection';
import { UIMenu } from '../ui_menu/ui_menu';

/**
 * The `UIMenuListView` is a class that extends UIMenu and provides functionality for
 * automaticaly update display from a datasource event-based called a "collection".
 * @typeParam T - The item type.
 */
class UIMenuListView<T> extends UIMenu {
  collection: ArrayCollection<T>;
  views: Array<T>;
  sortPredicate: (a: T, b: T) => number;
  filterPredicate: (a: T) => boolean;
  enablePredicate: (a: T) => boolean;

  /**
   * The constructor.
   * @param options - An object containing various options for configuring the behavior of the menu.
   * Nota bene: same options as for UIMenu.
   */
  constructor(options = {}) {
    super(options);
    this.collection = new ArrayCollection<T>();
    this.views = [];
    this.sortPredicate = () => 1;
    this.filterPredicate = () => true;
    this.enablePredicate = () => true;
  }

  /**
   * The "delete" function free all resources.
   * Warning: you need to call this method to free allocation for this object.
   */
  delete(): void {
    eventManager.unsubscribe(this.collection, 'E_ITEM_ADDED', this);
    eventManager.unsubscribe(this.collection, 'E_ITEM_REMOVED', this);
    super.delete();
  }

  /**
   * The "setCollection" function sets a new data-source collection.
   * @param collection - The data-source collection.
   */
  setCollection(collection: ArrayCollection<T>): void {
    eventManager.unsubscribe(this.collection, 'E_ITEM_ADDED', this);
    eventManager.unsubscribe(this.collection, 'E_ITEM_REMOVED', this);
    this.clear();

    if (collection) {
      const items = collection.getItems();
      const views = items.sort(this.sortPredicate).filter(this.filterPredicate);
      views.forEach(item => this.addItem(item, this.enablePredicate(item)));
      eventManager.subscribe(collection, 'E_ITEM_ADDED', this, this.handleItemAdded);
      eventManager.subscribe(collection, 'E_ITEM_REMOVED', this, this.handleItemRemoved);
      this.collection = collection;
      this.views = views;
    }
    else {
      this.collection = new ArrayCollection<T>();
      this.views = [];
    }
  }

  /**
   * The "addItem" function is a virtual method called when data is added to the collection.
   * It create the wanted widget item and add it to the menu.
   * Warning: please don't forget to overwrite this method otherwise list-view will stay empty ;)
   * @param {T} item - The "item" parameter is of type T, which means it can be any type. It represents
   * the item that you want to add to the data-source collection.
   * @param {boolean} [enabled=true] - The "enabled" parameter is a boolean value that determines whether
   * the item should be enabled or disabled. By default, it is set to true, meaning the item is enabled.
   * @param {number} index - The index parameter is an optional parameter that specifies the position at
   * which the item should be added in the list. If no index is provided, the item will be added at the
   * end of the list.
   */
  addItem(item: T, enabled: boolean = true, index: number = -1): void {
    // virtual method called during item add !
  }

  /**
   * The "getFocusedItem" function returns the focused data item.
   * @returns The views data associate with the focused widget item.
   */
  getFocusedItem(): T {
    return this.views[this.getFocusedWidgetIndex()];
  }

  /**
   * The "getSelectedItem" function returns the selected data item.
   * @returns The views data associate with the selected widget item.
   */
  getSelectedItem(): T {
    return this.views[this.getSelectedWidgetIndex()];
  }

  /**
   * The "setSortPredicate" function sets the sort predicate to determine the order of items.
   * @param sortPredicate - A function that takes in two parameters of type T and returns a number. This
   * function is used to determine the sorting order of the items in the list-view.
   */
  setSortPredicate(sortPredicate: (a: T, b: T) => number): void {
    if (this.collection) {
      const items = this.collection.getItems();
      this.views = items.sort(sortPredicate).filter(this.filterPredicate);

      this.clear();
      this.views.forEach(item => this.addItem(item, this.enablePredicate(item)));
    }

    this.sortPredicate = sortPredicate;
  }

  /**
   * The "setFilterPredicate" function sets a filter predicate to determine whether an item
   * should be display or hidden.
   * @param filterPredicate - The filterPredicate is a function that takes an argument of type T (the
   * generic type of the collection) and returns a boolean value. It is used to determine whether an item
   * should be included in the filtered views or not.
   */
  setFilterPredicate(filterPredicate: (a: T) => boolean): void {
    if (this.collection) {
      const items = this.collection.getItems();
      this.views = items.sort(this.sortPredicate).filter(filterPredicate);

      this.clear();
      this.views.forEach(item => this.addItem(item, this.enablePredicate(item)));
    }

    this.filterPredicate = filterPredicate;
  }

  /**
   * The "setEnablePredicate" function sets a new enable predicate to determine whether an item
   * should be enabled or disabled.
   * @param enablePredicate - A function that takes an argument of type T and returns a boolean value.
   * This function is used to determine whether an item should be enabled or disabled.
   */
  setEnablePredicate(enablePredicate: (a: T) => boolean): void {
    if (this.collection) {
      const items = this.collection.getItems();
      this.views = items.sort(this.sortPredicate).filter(this.filterPredicate);

      this.clear();
      this.views.forEach(item => this.addItem(item, enablePredicate(item)));
    }

    this.enablePredicate = enablePredicate;
  }

  /**
   * The "getViews" function returns the list of displayed item data (called as "views").
   * @returns The list of displayed item data.
   */
  getViews(): Array<T> {
    return this.views;
  }

  /**
   * The "handleItemAdded" function.
   * Update the list-view when item is added to the collection.
   */
  handleItemAdded(data: any): void {
    const items = this.collection.getItems();
    this.views = items.sort(this.sortPredicate).filter(this.filterPredicate);

    const index = this.views.indexOf(data.item);
    this.addItem(data.item, this.enablePredicate(data.item), index);
  }

  /**
   * The "handleItemRemoved" function.
   * Update the list-view when item is removed from the collection.
  */
  handleItemRemoved(data: any): void {
    const index = this.views.indexOf(data.item);
    this.removeWidget(index);

    const items = this.collection.getItems();
    this.views = items.sort(this.sortPredicate).filter(this.filterPredicate);    
  }
}

export { UIMenuListView };