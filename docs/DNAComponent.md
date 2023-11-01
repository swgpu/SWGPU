[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [dna/dna\_component](../modules/dna_dna_component.md) / DNAComponent

# Class: DNAComponent

[dna/dna_component](../modules/dna_dna_component.md).DNAComponent

The `DNAComponent` class represents a component in a pure ECS data-driven implementation.

## Table of contents

### Methods

- [getTypename](dna_dna_component$DNAComponent.md#gettypename)

### Properties

- [typename](dna_dna_component$DNAComponent.md#typename)

### Constructors

- [constructor](dna_dna_component$DNAComponent.md#constructor)

## Methods

### getTypename

▸ **getTypename**(): `string`

The "getTypename" function returns the typename as a string.

#### Returns

`string`

The method is returning string that represents the name of a component type.

## Properties

### typename

• **typename**: `string`

## Constructors

### constructor

• **new DNAComponent**(`typename`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typename` | `string` | The typename parameter is a string that represents the type of object being created. It is used to easily retrieve a specific component inside an entity. |
