# ArrayCollection

Generic class that represents a collection of items and provides event-based features.
## Constructors
* **new ArrayCollection**(items: T[]): ArrayCollection   
  * **items**: The `items` underlying collection's data.
## Methods
* **clear**(): void   
* **getItems**()   
* **has**(item: T): boolean   
  * **item**: The item.
* **pop**(emit: boolean)   
  * **emit**: If `emit` is set to `true`, an event with the name 'E_ITEM_REMOVED' will be emitted.
* **push**(item: T, emit: boolean): number   
  * **item**: The item.
  * **emit**: If `emit` is set to `true`, an event with the name 'E_ITEM_ADDED' will be emitted.
* **remove**(item: T, emit: boolean): number   
  * **item**: The item.
  * **emit**: If `emit` is set to `true`, an event with the name 'E_ITEM_REMOVED' will be emitted.
* **removeAt**(index: number, emit: boolean): T   
  * **index**: The index.
  * **emit**: If `emit` is set to `true`, an event with the name 'E_ITEM_REMOVED' will be emitted.
