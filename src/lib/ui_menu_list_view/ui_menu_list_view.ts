import { eventManager } from '../core/event_manager';
import { ArrayCollection } from '../core/array_collection';
import { UIMenu } from '../ui_menu/ui_menu';

/**
 * A UI widget displaying a menu that make update automatically when a datasource changed.
 * Note: It send same event than UIMenu.
 * @typeParam T - The item type.
 */
class UIMenuListView<T> extends UIMenu {
  collection: ArrayCollection<T>;
  views: Array<T>;
  sortPredicate: (a: T, b: T) => number;
  filterPredicate: (a: T) => boolean;
  enablePredicate: (a: T) => boolean;

  /**
   * @param options - Various options for configuring the behavior of the menu.
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
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    eventManager.unsubscribe(this.collection, 'E_ITEM_ADDED', this);
    eventManager.unsubscribe(this.collection, 'E_ITEM_REMOVED', this);
    super.delete();
  }

  /**
   * Set a data-source collection.
   * 
   * @param {ArrayCollection<T>} collection - The data-source collection.
   */
  setCollection(collection: ArrayCollection<T>): void {
    eventManager.unsubscribe(this.collection, 'E_ITEM_ADDED', this);
    eventManager.unsubscribe(this.collection, 'E_ITEM_REMOVED', this);
    this.clear();

    if (collection) {
      const items = collection.getItems();
      const views = items.sort(this.sortPredicate).filter(this.filterPredicate);
      views.forEach(item => this.addItem(item, this.enablePredicate(item)));
      eventManager.subscribe(collection, 'E_ITEM_ADDED', this, this.$handleItemAdded);
      eventManager.subscribe(collection, 'E_ITEM_REMOVED', this, this.$handleItemRemoved);
      this.collection = collection;
      this.views = views;
    }
    else {
      this.collection = new ArrayCollection<T>();
      this.views = [];
    }
  }

  /**
   * Virtual method called when data is added to the collection.
   * Usually, it create the wanted widget item and add it to the menu.
   * Warning: please don't forget to overwrite this method otherwise list-view will stay empty ;)
   * 
   * @param {T} item - The added item coming from the data-source collection.
   * @param {boolean} [enabled=true] - Determines whether the item should be enabled or disabled.
   * @param {number} index - The index position at which the item should be added in the list.
   */
  addItem(item: T, enabled: boolean = true, index: number = -1): void {}

  /**
   * Returns the focused data item.
   */
  getFocusedItem(): T {
    return this.views[this.getFocusedWidgetIndex()];
  }

  /**
   * Returns the selected data item.
   */
  getSelectedItem(): T {
    return this.views[this.getSelectedWidgetIndex()];
  }

  /**
   * Set the sort predicate.
   * 
   * @param sortPredicate - Determine the sorting order of the items in the list-view.
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
   * Set a filter predicate.
   * 
   * @param filterPredicate - Determine whether an item should be included in the filtered views or not.
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
   * Set a enable predicate.
   * 
   * @param enablePredicate - Determine whether an item should be enabled or disabled.
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
   * Returns the list of displayed item data (called as "views").
   */
  getViews(): Array<T> {
    return this.views;
  }

  $handleItemAdded(data: any): void {
    const items = this.collection.getItems();
    this.views = items.sort(this.sortPredicate).filter(this.filterPredicate);

    const index = this.views.indexOf(data.item);
    this.addItem(data.item, this.enablePredicate(data.item), index);
  }

  $handleItemRemoved(data: any): void {
    const index = this.views.indexOf(data.item);
    this.removeWidget(index);

    const items = this.collection.getItems();
    this.views = items.sort(this.sortPredicate).filter(this.filterPredicate);    
  }
}

export { UIMenuListView };