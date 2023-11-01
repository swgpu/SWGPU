[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [core/tween](../modules/core_tween.md) / TweenNumber

# Class: TweenNumber

[core/tween](../modules/core_tween.md).TweenNumber

The `TweenNumber` class is a shortcut subclass of "TweenAbstract" that handles tweening of number values using
linear interpolation.

## Hierarchy

- `TweenAbstract`<`number`\>

  ↳ **`TweenNumber`**

## Table of contents

### Methods

- [interpolate](core_tween$TweenNumber.md#interpolate)
- [isEmpty](core_tween$TweenNumber.md#isempty)

### Properties

- [defaultFn](core_tween$TweenNumber.md#defaultfn)
- [fns](core_tween$TweenNumber.md#fns)
- [times](core_tween$TweenNumber.md#times)
- [values](core_tween$TweenNumber.md#values)

### Constructors

- [constructor](core_tween$TweenNumber.md#constructor)

## Methods

### interpolate

▸ **interpolate**(`t`): `number`

The "interpolate" function takes a time value and returns the interpolated value based on the given
times and values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `t` | `number` | t is a number representing the time at which we want to interpolate a value. |

#### Returns

`number`

The method is returing a value of type T.

#### Inherited from

TweenAbstract.interpolate

___

### isEmpty

▸ **isEmpty**(): `boolean`

The "isEmpty" function checks if the `times` and `values` arrays are empty and returns a boolean value.

#### Returns

`boolean`

A boolean value indicate is it is empty or not.

#### Inherited from

TweenAbstract.isEmpty

## Properties

### defaultFn

• **defaultFn**: `Function`

#### Inherited from

TweenAbstract.defaultFn

___

### fns

• **fns**: `Function`[]

#### Inherited from

TweenAbstract.fns

___

### times

• **times**: `number`[]

#### Inherited from

TweenAbstract.times

___

### values

• **values**: `number`[]

#### Inherited from

TweenAbstract.values

## Constructors

### constructor

• **new TweenNumber**(`times?`, `values?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `times` | `number`[] | `[]` |
| `values` | `number`[] | `[]` |

#### Overrides

TweenAbstract&lt;number\&gt;.constructor
