[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [script/script\_machine](../modules/script_script_machine.md) / ScriptMachine

# Class: ScriptMachine

[script/script_machine](../modules/script_script_machine.md).ScriptMachine

The `ScriptMachine` is a class that represents a script machine for executing script blocks and commands.
It let you create your game scene scripting with methods to execute a sequences of asynchronous commands and
handle derivation story with block jumping.

## Table of contents

### Methods

- [clearCommandRegister](script_script_machine$ScriptMachine.md#clearcommandregister)
- [isEnabled](script_script_machine$ScriptMachine.md#isenabled)
- [jump](script_script_machine$ScriptMachine.md#jump)
- [loadFromFile](script_script_machine$ScriptMachine.md#loadfromfile)
- [registerCommand](script_script_machine$ScriptMachine.md#registercommand)
- [runCommand](script_script_machine$ScriptMachine.md#runcommand)
- [setEnabled](script_script_machine$ScriptMachine.md#setenabled)
- [update](script_script_machine$ScriptMachine.md#update)

### Properties

- [blocks](script_script_machine$ScriptMachine.md#blocks)
- [commandRegister](script_script_machine$ScriptMachine.md#commandregister)
- [currentBlockId](script_script_machine$ScriptMachine.md#currentblockid)
- [currentCallIndex](script_script_machine$ScriptMachine.md#currentcallindex)
- [enabled](script_script_machine$ScriptMachine.md#enabled)
- [onAfterBlockExec](script_script_machine$ScriptMachine.md#onafterblockexec)
- [onAfterCommandExec](script_script_machine$ScriptMachine.md#onaftercommandexec)
- [onBeforeBlockExec](script_script_machine$ScriptMachine.md#onbeforeblockexec)
- [onBeforeCommandExec](script_script_machine$ScriptMachine.md#onbeforecommandexec)

### Constructors

- [constructor](script_script_machine$ScriptMachine.md#constructor)

## Methods

### clearCommandRegister

▸ **clearCommandRegister**(): `void`

The "clearCommandRegister" function flush the command register.

#### Returns

`void`

___

### isEnabled

▸ **isEnabled**(): `boolean`

The "isEnabled" function returns the enabled property.

#### Returns

`boolean`

The `enabled`property.

___

### jump

▸ **jump**(`blockId`): `void`

The "jump" function sets the script machine on the specified commands block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | `string` | The `blockId` parameter is a string that represents the ID of a block. |

#### Returns

`void`

___

### loadFromFile

▸ **loadFromFile**(`path`): `Promise`<`void`\>

The "loadFromFile" function asynchronously loads script data from a json file (jsc).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The `path` parameter is the file path. |

#### Returns

`Promise`<`void`\>

___

### registerCommand

▸ **registerCommand**(`key`, `commandFunc`): `void`

The "registerCommand" function registers a command with a unique key and associates it with a
function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The `key` parameter is a string that represents the unique identifier for the command. It is used to register and retrieve the command function from the command register. |
| `commandFunc` | `Function` | The `commandFunc` parameter is a function that represents the command to be registered. It can be any valid JavaScript function that will be executed when the registered command is called. |

#### Returns

`void`

___

### runCommand

▸ **runCommand**(`key`, `args?`): `undefined` \| `string`

The "runCommand" function executes a registered command with the given key and arguments, and
returns the result.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `string` | `undefined` | A string representing the key of the command to be executed. |
| `args` | `any`[] | `[]` | An array of arguments that will be passed to the command function and coming from the script file. |

#### Returns

`undefined` \| `string`

The block identifier to jump.

___

### setEnabled

▸ **setEnabled**(`enabled`): `void`

The "setEnabled" function sets the enabled property indicating whether the script machine is enabled or
disabled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | A boolean value indicating whether the script machine is enabled or disabled. |

#### Returns

`void`

___

### update

▸ **update**(`ts`): `void`

The "update" function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The `ts` parameter stands for "timestep". |

#### Returns

`void`

## Properties

### blocks

• **blocks**: `JSCBlock`[]

___

### commandRegister

• **commandRegister**: `Map`<`string`, `Function`\>

___

### currentBlockId

• **currentBlockId**: `string`

___

### currentCallIndex

• **currentCallIndex**: `number`

___

### enabled

• **enabled**: `boolean`

___

### onAfterBlockExec

• **onAfterBlockExec**: (`block`: `JSCBlock`) => `void`

#### Type declaration

▸ (`block`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `block` | `JSCBlock` |

##### Returns

`void`

___

### onAfterCommandExec

• **onAfterCommandExec**: (`command`: `Function`) => `void`

#### Type declaration

▸ (`command`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `Function` |

##### Returns

`void`

___

### onBeforeBlockExec

• **onBeforeBlockExec**: (`block`: `JSCBlock`) => `void`

#### Type declaration

▸ (`block`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `block` | `JSCBlock` |

##### Returns

`void`

___

### onBeforeCommandExec

• **onBeforeCommandExec**: (`command`: `Function`) => `void`

#### Type declaration

▸ (`command`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `Function` |

##### Returns

`void`

## Constructors

### constructor

• **new ScriptMachine**()

The constructor.
