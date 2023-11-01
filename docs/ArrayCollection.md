[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [core/array\_collection](../modules/core_array_collection.md) / ArrayCollection

# Class: ArrayCollection<T\>

[core/array_collection](../modules/core_array_collection.md).ArrayCollection

The `ArrayCollection` class is a generic class that represents a collection of items and provides
event-based methods for adding, removing, and checking the presence of items in the collection.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The item type. |

## Table of contents

### Methods

- [clear](core_array_collection$ArrayCollection.md#clear)
- [getItems](core_array_collection$ArrayCollection.md#getitems)
- [has](core_array_collection$ArrayCollection.md#has)
- [pop](core_array_collection$ArrayCollection.md#pop)
- [push](core_array_collection$ArrayCollection.md#push)
- [remove](core_array_collection$ArrayCollection.md#remove)
- [removeAt](core_array_collection$ArrayCollection.md#removeat)

### Properties

- [items](core_array_collection$ArrayCollection.md#items)

### Constructors

- [constructor](core_array_collection$ArrayCollection.md#constructor)

## Methods

### clear

▸ **clear**(): `void`

The "clear" function removes all items from the collection.

#### Returns

`void`

___

### getItems

▸ **getItems**(): `T`[]

The "getItems" function returns an array of type T.

#### Returns

`T`[]

An array of type T.

___

### has

▸ **has**(`item`): `boolean`

The "has" function checks if an item is present in the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `T` | The parameter "item" is of type T, which means it can be any type. It is used to check if the given item exists in the "items" array. |

#### Returns

`boolean`

The method is returning a boolean value.

___

### pop

▸ **pop**(`emit?`): `undefined` \| `T`

The "pop" function removes and returns the last item from the collection, and emits an event if specified.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `emit?` | `boolean` | `false` | The `emit` parameter is a boolean flag that determines whether an event should be emitted when an item is removed from the list. If `emit` is set to `true`, an event with the name 'E_ITEM_REMOVED' will be emitted. |

#### Returns

`undefined` \| `T`

The `pop` method returns the last item from the `items` array.

___

### push

▸ **push**(`item`, `emit?`): `number`

The "push" function adds an item to the collection and emits an event if specified.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `item` | `T` | `undefined` | The `item` parameter represents the item that you want to push into the `items` array. It can be of any type (`T`). |
| `emit?` | `boolean` | `false` | The `emit` parameter is a boolean flag that determines whether an event should be emitted after pushing the item to the array. If `emit` is set to `true`, an event with the name 'E_ITEM_ADDED' will be emitted. |

#### Returns

`number`

The length of the `items` array after the `item` has been pushed into it.

___

### remove

▸ **remove**(`item`, `emit?`): `number`

The "remove" function removes an item from the collection and emits an event if specified.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `item` | `T` | `undefined` | The `item` parameter is the element that you want to remove from the `items` array. |
| `emit?` | `boolean` | `false` | The `emit` parameter is a boolean flag that determines whether an event should be emitted after removing the item. If `emit` is set to `true`, an event with the name 'E_ITEM_REMOVED' will be emitted. |

#### Returns

`number`

The index of the removed item is being returned.

___

### removeAt

▸ **removeAt**(`index`, `emit?`): `T`

The "removeAt" function removes an item at a specified index from the collection and optionally emits an
event.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `index` | `number` | `undefined` | The index parameter specifies the position of the item to be removed from the items array. It is of type number and represents the zero-based index of the item to be removed. |
| `emit?` | `boolean` | `false` | The `emit` parameter is a boolean value that determines whether an event should be emitted after removing an item from the `items` array. If `emit` is set to `true`, an event with the name 'E_ITEM_REMOVED' will be emitted. |

#### Returns

`T`

The `removeAt` function is returning the item that was removed from the `items` array.

## Properties

### items

• **items**: `T`[]

## Constructors

### constructor

• **new ArrayCollection**<`T`\>(`items?`)

The constructor.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `items` | `T`[] | `[]` | The `items` underlying collection's data. |
