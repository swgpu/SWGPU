[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [dna/dna\_manager](../modules/dna_dna_manager.md) / DNAManager

# Class: DNAManager

[dna/dna_manager](../modules/dna_dna_manager.md).DNAManager

The `DNAManager` is a singleton class responsible for managing entities and components in a pure ecs implementation, allowing for entity
creation, component addition and removal, and system updates.

## Table of contents

### Methods

- [addComponent](dna_dna_manager$DNAManager.md#addcomponent)
- [createEntity](dna_dna_manager$DNAManager.md#createentity)
- [draw](dna_dna_manager$DNAManager.md#draw)
- [findEntities](dna_dna_manager$DNAManager.md#findentities)
- [findEntity](dna_dna_manager$DNAManager.md#findentity)
- [getComponent](dna_dna_manager$DNAManager.md#getcomponent)
- [getComponents](dna_dna_manager$DNAManager.md#getcomponents)
- [hasComponent](dna_dna_manager$DNAManager.md#hascomponent)
- [hasEntity](dna_dna_manager$DNAManager.md#hasentity)
- [removeComponent](dna_dna_manager$DNAManager.md#removecomponent)
- [removeComponentIfExist](dna_dna_manager$DNAManager.md#removecomponentifexist)
- [removeEntity](dna_dna_manager$DNAManager.md#removeentity)
- [setup](dna_dna_manager$DNAManager.md#setup)
- [update](dna_dna_manager$DNAManager.md#update)

### Properties

- [entities](dna_dna_manager$DNAManager.md#entities)
- [entityIndex](dna_dna_manager$DNAManager.md#entityindex)
- [systems](dna_dna_manager$DNAManager.md#systems)

### Constructors

- [constructor](dna_dna_manager$DNAManager.md#constructor)

## Methods

### addComponent

▸ **addComponent**(`eid`, `component`): `void`

The "addComponent" function adds a DNAComponent to an entity. This entity is binded to all matching DNASystem.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eid` | `number` | The `eid` parameter is the entity's id. |
| `component` | [`DNAComponent`](dna_dna_component$DNAComponent.md) | The `component` parameter is the component to add. |

#### Returns

`void`

___

### createEntity

▸ **createEntity**(): `number`

The "createEntity" function creates a new entity and returns its uid based on a incremented global index.

#### Returns

`number`

The method returns the entity's id.

___

### draw

▸ **draw**(): `void`

The "draw" function draw all systems.

#### Returns

`void`

___

### findEntities

▸ **findEntities**(`componentTypeName`): `number`[]

The "findEntities" function takes a component typename and returns an array of entity
ids that have that component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentTypeName` | `string` | The parameter `componentTypeName` is a string that represents the name of a component type. |

#### Returns

`number`[]

The method returns an array of entity ids.

___

### findEntity

▸ **findEntity**(`componentTypeName`): `number`

The "findEntity" function retrieves the first entity that has a specific component type and returns its
entity's id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentTypeName` | `string` | The `componentTypeName` parameter is a string that represents the name of a component type. |

#### Returns

`number`

The method returns a entity's id. If no matching component is found, it returns -1.

___

### getComponent

▸ **getComponent**(`eid`, `typename`): [`DNAComponent`](dna_dna_component$DNAComponent.md)

The "getComponent" function retrieves a specific component from an entity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eid` | `number` | The `eid` parameter is the entity's id. |
| `typename` | `string` | The `typename` parameter is a string that represents the name of a component type. |

#### Returns

[`DNAComponent`](dna_dna_component$DNAComponent.md)

a DNAComponent.

___

### getComponents

▸ **getComponents**(`eid`): `Map`<`string`, [`DNAComponent`](dna_dna_component$DNAComponent.md)\>

The "getComponents" function retrieves components from an entity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eid` | `number` | The `eid` parameter is the entity's id. |

#### Returns

`Map`<`string`, [`DNAComponent`](dna_dna_component$DNAComponent.md)\>

The method returns the entity's component list.

___

### hasComponent

▸ **hasComponent**(`eid`, `typename`): `boolean`

The function checks if an entity has a specific component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eid` | `number` | The `eid` parameter is the entity's id. |
| `typename` | `string` | The `typename` parameter is a string that represents the name of a component type. |

#### Returns

`boolean`

a boolean value.

___

### hasEntity

▸ **hasEntity**(`id`): `boolean`

The "hasEntity" function checks if an entity exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | The `id` parameter is the entity's id. |

#### Returns

`boolean`

The method returns a boolean value indicating whether or not the entity exist in collection.

___

### removeComponent

▸ **removeComponent**(`eid`, `typename`): `void`

The "removeComponent" function removes a DNAComponent to an entity. This entity is unbinded from all unmatching DNASystem.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eid` | `number` | The `eid` parameter is the entity's id. |
| `typename` | `string` | The `typename` parameter is a string that represents the name of a component type. |

#### Returns

`void`

___

### removeComponentIfExist

▸ **removeComponentIfExist**(`eid`, `typename`): `boolean`

The "removeComponentIfExist" function removes a component from an entity if it exists and returns true, otherwise it returns
false.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eid` | `number` | The `eid` parameter is the entity's id. |
| `typename` | `string` | The `typename` parameter is a string that represents the name of a component type. |

#### Returns

`boolean`

a boolean value. It returns true if the component exists on the entity and is successfully
removed, and false if the component does not exist.

___

### removeEntity

▸ **removeEntity**(`eid`): `void`

The "removeEntity" function removes entity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eid` | `number` | The `eid` parameter is the entity's id. |

#### Returns

`void`

___

### setup

▸ **setup**(`systems`): `void`

The "setup" function initialize the manager and sets all systems ready to run.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `systems` | [`DNASystem`](dna_dna_system$DNASystem.md)[] | An array of DNASystem objects. |

#### Returns

`void`

___

### update

▸ **update**(`ts`): `void`

The "update" function update all systems.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The `ts` parameter stands for "timestep". |

#### Returns

`void`

## Properties

### entities

• **entities**: `Map`<`number`, `Map`<`string`, [`DNAComponent`](dna_dna_component$DNAComponent.md)\>\>

___

### entityIndex

• **entityIndex**: `number`

___

### systems

• **systems**: [`DNASystem`](dna_dna_system$DNASystem.md)[]

## Constructors

### constructor

• **new DNAManager**()

The constructor.
