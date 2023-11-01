[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [core/event\_manager](../modules/core_event_manager.md) / EventManager

# Class: EventManager

[core/event_manager](../modules/core_event_manager.md).EventManager

The `EventManager` class is a singleton for managing subscribing to and emitting events.

## Table of contents

### Methods

- [emit](core_event_manager$EventManager.md#emit)
- [subscribe](core_event_manager$EventManager.md#subscribe)
- [subscribeOnce](core_event_manager$EventManager.md#subscribeonce)
- [unsubscribe](core_event_manager$EventManager.md#unsubscribe)
- [unsubscribeAll](core_event_manager$EventManager.md#unsubscribeall)
- [wait](core_event_manager$EventManager.md#wait)

### Properties

- [subscribers](core_event_manager$EventManager.md#subscribers)

### Constructors

- [constructor](core_event_manager$EventManager.md#constructor)

## Methods

### emit

▸ **emit**(`emitter`, `type`, `data?`): `Promise`<`any`\>

The "emit" function notifies subscribers of an event and returns a promise that
resolves when all subscriber callbacks have been executed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `any` | The `emitter` parameter is an object that emits events. It could be any object. |
| `type` | `string` | The `type` parameter is a string that represents the type of event or message that you want to wait for. It is used to filter the events emitted by the `emitter` object. |
| `data` | `any` | The `data` parameter is an optional parameter of type `any` which represents the data that will be passed to the callback function of each subscriber. |

#### Returns

`Promise`<`any`\>

a Promise that resolves when all callbacks have been executed.

___

### subscribe

▸ **subscribe**(`emitter`, `type`, `listener`, `cb`): `void`

The "subscribe" function adds a new subscriber to a list of subscribers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `any` | The `emitter` parameter is an object that emits events. It could be any object. |
| `type` | `string` | The `type` parameter is a string that represents the type of event or message that you want to wait for. It is used to filter the events emitted by the `emitter` object. |
| `listener` | `any` | The `listener` parameter is the object that is subscribed to the event and usually the context of the callback function. |
| `cb` | `Function` | The `cb` parameter is a callback function that will be executed when the event is triggered. |

#### Returns

`void`

___

### subscribeOnce

▸ **subscribeOnce**(`emitter`, `type`, `listener`, `cb`): `void`

The "subscribeOnce" function adds a new subscriber to a list of subscribers and delete self after the first event trigger.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `any` | The `emitter` parameter is an object that emits events. It could be any object. |
| `type` | `string` | The `type` parameter is a string that represents the type of event or message that you want to wait for. It is used to filter the events emitted by the `emitter` object. |
| `listener` | `any` | The `listener` parameter is the object that is subscribed to the event and usually the context of the callback function. |
| `cb` | `Function` | The `cb` parameter is a callback function that will be executed when the event is triggered. |

#### Returns

`void`

___

### unsubscribe

▸ **unsubscribe**(`emitter`, `type`, `listener`): `void`

The "unsubscribe" function removes a specific listener from the list of subscribers for a given
emitter and event type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `any` | The `emitter` parameter is an object that emits events. It could be any object. |
| `type` | `string` | The `type` parameter is a string that represents the type of event or message that you want to wait for. It is used to filter the events emitted by the `emitter` object. |
| `listener` | `any` | The `listener` parameter is the object that is subscribed to the event and usually the context of the callback function. |

#### Returns

`void`

void, which means it does not return any value.

___

### unsubscribeAll

▸ **unsubscribeAll**(): `void`

The "unsubscribeAll" function clears all subscribers from the "subscribers" array.

#### Returns

`void`

___

### wait

▸ **wait**(`emitter`, `type`): `Promise`<`any`\>

The "wait" function returns a promise that resolves when a specific event is emitted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `any` | The `emitter` parameter is an object that emits events. It could be any object. |
| `type` | `string` | The `type` parameter is a string that represents the type of event or message that you want to wait for. It is used to filter the events emitted by the `emitter` object. |

#### Returns

`Promise`<`any`\>

a Promise that resolves with the data emitted by the specified emitter and event type.

## Properties

### subscribers

• **subscribers**: `EventSubscriber`[]

## Constructors

### constructor

• **new EventManager**()

The constructor.
