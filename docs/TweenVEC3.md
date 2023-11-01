[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [core/tween](../modules/core_tween.md) / TweenVEC3

# Class: TweenVEC3

[core/tween](../modules/core_tween.md).TweenVEC3

The `TweenVEC3` class is a shortcut subclass of "TweenAbstract" that handles tweening of vec3 values using
linear interpolation.

## Hierarchy

- `TweenAbstract`<[`vec3`](../modules/core_global.md#vec3)\>

  ↳ **`TweenVEC3`**

## Table of contents

### Methods

- [interpolate](core_tween$TweenVEC3.md#interpolate)
- [isEmpty](core_tween$TweenVEC3.md#isempty)

### Properties

- [defaultFn](core_tween$TweenVEC3.md#defaultfn)
- [fns](core_tween$TweenVEC3.md#fns)
- [times](core_tween$TweenVEC3.md#times)
- [values](core_tween$TweenVEC3.md#values)

### Constructors

- [constructor](core_tween$TweenVEC3.md#constructor)

## Methods

### interpolate

▸ **interpolate**(`t`): [`vec3`](../modules/core_global.md#vec3)

The "interpolate" function takes a time value and returns the interpolated value based on the given
times and values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `t` | `number` | t is a number representing the time at which we want to interpolate a value. |

#### Returns

[`vec3`](../modules/core_global.md#vec3)

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

• **values**: [`vec3`](../modules/core_global.md#vec3)[]

#### Inherited from

TweenAbstract.values

## Constructors

### constructor

• **new TweenVEC3**(`times?`, `values?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `times` | `number`[] | `[]` |
| `values` | [`vec3`](../modules/core_global.md#vec3)[] | `[]` |

#### Overrides

TweenAbstract&lt;vec3\&gt;.constructor
