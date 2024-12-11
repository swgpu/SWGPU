# UIMenuListView

A UI widget displaying a menu that make update automatically when a datasource changed.
Note: It send same event than UIMenu.
- inherit from: UIMenu
## Constructors
* **new UIMenuListView**(options): UIMenuListView   
  * **options**: Various options for configuring the behavior of the menu.
## Methods
* **addItem**(item: T, enabled: boolean, index: number): void   
  * **item**: The added item coming from the data-source collection.
  * **enabled**: Determines whether the item should be enabled or disabled.
  * **index**: The index position at which the item should be added in the list.
* **delete**(): void   
* **getFocusedItem**(): T   
* **getSelectedItem**(): T   
* **getViews**()   
* **setCollection**(collection: ArrayCollection): void   
  * **collection**: The data-source collection.
* **setEnablePredicate**(enablePredicate): void   
  * **enablePredicate**: Determine whether an item should be enabled or disabled.
* **setFilterPredicate**(filterPredicate): void   
  * **filterPredicate**: Determine whether an item should be included in the filtered views or not.
* **setSortPredicate**(sortPredicate): void   
  * **sortPredicate**: Determine the sorting order of the items in the list-view.
