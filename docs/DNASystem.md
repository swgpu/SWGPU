[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [dna/dna\_system](../modules/dna_dna_system.md) / DNASystem

# Class: DNASystem

[dna/dna_system](../modules/dna_dna_system.md).DNASystem

The `DNASystem` class is a base class that provides functionality for managing entities and their
components in a game or simulation system.

## Table of contents

### Methods

- [action](dna_dna_system$DNASystem.md#action)
- [actionOnce](dna_dna_system$DNASystem.md#actiononce)
- [addRequiredComponentTypename](dna_dna_system$DNASystem.md#addrequiredcomponenttypename)
- [bindEntity](dna_dna_system$DNASystem.md#bindentity)
- [draw](dna_dna_system$DNASystem.md#draw)
- [hasEntity](dna_dna_system$DNASystem.md#hasentity)
- [isMatchingComponentRequirements](dna_dna_system$DNASystem.md#ismatchingcomponentrequirements)
- [onAction](dna_dna_system$DNASystem.md#onaction)
- [onActionOnce](dna_dna_system$DNASystem.md#onactiononce)
- [onAfterUpdate](dna_dna_system$DNASystem.md#onafterupdate)
- [onBeforeUpdate](dna_dna_system$DNASystem.md#onbeforeupdate)
- [onEntityBind](dna_dna_system$DNASystem.md#onentitybind)
- [onEntityDraw](dna_dna_system$DNASystem.md#onentitydraw)
- [onEntityUnbind](dna_dna_system$DNASystem.md#onentityunbind)
- [onEntityUpdate](dna_dna_system$DNASystem.md#onentityupdate)
- [unbindEntity](dna_dna_system$DNASystem.md#unbindentity)
- [update](dna_dna_system$DNASystem.md#update)

### Properties

- [eids](dna_dna_system$DNASystem.md#eids)
- [requiredComponentTypenames](dna_dna_system$DNASystem.md#requiredcomponenttypenames)

### Constructors

- [constructor](dna_dna_system$DNASystem.md#constructor)

## Methods

### action

▸ **action**(`actionId`): `void`

The "action" function iterates over a list of entities and calls the virtual method `onAction` for each entity with a
given actionId.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionId` | `string` | The `actionId` parameter is a string that represents the identifier of the action to be performed (see input_manager). |

#### Returns

`void`

___

### actionOnce

▸ **actionOnce**(`actionId`): `void`

The "actionOnce" function iterates over a list of entities and calls the virtual method `onActionOnce`
for each entity with a given actionId.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionId` | `string` | The `actionId` parameter is a string that represents the identifier of the action to be performed (see input_manager). |

#### Returns

`void`

___

### addRequiredComponentTypename

▸ **addRequiredComponentTypename**(`typename`): `void`

The "addRequiredComponentTypename" function adds a typename to a set of required component
typenames, throwing an error if the typename is already present.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typename` | `string` | The `typename` parameter is a string that represents the name of a component type. |

#### Returns

`void`

___

### bindEntity

▸ **bindEntity**(`eid`): `void`

The "bindEntity" function checks if an entity already exists in the system and throws an error if it
does, otherwise it adds the entity to the system.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eid` | `number` | The `eid` parameter is the entity's id. |

#### Returns

`void`

___

### draw

▸ **draw**(): `void`

The "draw" function iterates over a collection of entities and calls the virtual method `onEntityDraw` for
each entity.

#### Returns

`void`

___

### hasEntity

▸ **hasEntity**(`eid`): `boolean`

The "hasEntity" function checks if a given entity exists in this system.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eid` | `number` | The `eid` parameter is the entity's id. |

#### Returns

`boolean`

a boolean value.

___

### isMatchingComponentRequirements

▸ **isMatchingComponentRequirements**(`components`): `boolean`

The "isMatchingComponentRequirements" function checks if a given set of components matches the required component typenames.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `components` | `IterableIterator`<[`DNAComponent`](dna_dna_component$DNAComponent.md)\> | An iterable component list. |

#### Returns

`boolean`

a boolean value.

___

### onAction

▸ **onAction**(`actionId`, `eid`): `void`

The "onAction" is a virtual method that is called when an action occurs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionId` | `string` | The `actionId` parameter is a string that represents the unique identifier of the action that occurred (see input_manager). |
| `eid` | `number` | The `eid` parameter is the entity's id. |

#### Returns

`void`

___

### onActionOnce

▸ **onActionOnce**(`actionId`, `eid`): `void`

The "onActionOnce" is a virtual method that is called when a specific action occurs once.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionId` | `string` | The `actionId` parameter is a string that represents the unique identifier of the action that occurred (see input_manager). |
| `eid` | `number` | The `eid` parameter is the entity's id. |

#### Returns

`void`

___

### onAfterUpdate

▸ **onAfterUpdate**(`ts`): `void`

The "onAfterUpdate" is a virtual method that is called after the entities update phase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The `ts` parameter stands for "timestep". |

#### Returns

`void`

___

### onBeforeUpdate

▸ **onBeforeUpdate**(`ts`): `void`

The "onBeforeUpdate" is a virtual method that is called before the entities update phase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The `ts` parameter stands for "timestep". |

#### Returns

`void`

___

### onEntityBind

▸ **onEntityBind**(`eid`): `void`

The "onEntityBind" is a virtual method that is called during entity binding.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eid` | `number` | The `eid` parameter is the entity's id. |

#### Returns

`void`

___

### onEntityDraw

▸ **onEntityDraw**(`eid`): `void`

The "onEntityDraw" is a virtual method that is called for each entity during the draw phase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eid` | `number` | The `eid` parameter is the entity's id. |

#### Returns

`void`

___

### onEntityUnbind

▸ **onEntityUnbind**(`eid`): `void`

The "onEntityUnbind" is a virtual method that is called during entity unbinding.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eid` | `number` | The `eid` parameter is the entity's id. |

#### Returns

`void`

___

### onEntityUpdate

▸ **onEntityUpdate**(`ts`, `eid`): `void`

The "onEntityUpdate" is a virtual method that is called for each entity during the update phase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The `ts` parameter stands for "timestep". |
| `eid` | `number` | The `eid` parameter is the entity's id. |

#### Returns

`void`

___

### unbindEntity

▸ **unbindEntity**(`eid`): `void`

The "unbindEntity" function unbinds an entity from the system if it exists, otherwise it throws an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eid` | `number` | The `eid` parameter is the entity's id. |

#### Returns

`void`

___

### update

▸ **update**(`ts`): `void`

The "update" function iterates over entities and calls the virtual method `onEntityUpdate` for each entity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The `ts` parameter stands for "timestep". |

#### Returns

`void`

## Properties

### eids

• **eids**: `Set`<`number`\>

___

### requiredComponentTypenames

• **requiredComponentTypenames**: `Set`<`string`\>

## Constructors

### constructor

• **new DNASystem**()

The constructor.
