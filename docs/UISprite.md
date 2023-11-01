[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [ui\_sprite/ui\_sprite](../modules/ui_sprite_ui_sprite.md) / UISprite

# Class: UISprite

[ui_sprite/ui_sprite](../modules/ui_sprite_ui_sprite.md).UISprite

The `UISprite` is a subclass of `UIWidget` that represents a sprite with animations in the
user-interface system context.

## Hierarchy

- [`UIWidget`](ui_ui_widget$UIWidget.md)

  ↳ **`UISprite`**

## Table of contents

### Methods

- [animate](ui_sprite_ui_sprite$UISprite.md#animate)
- [appendStyles](ui_sprite_ui_sprite$UISprite.md#appendstyles)
- [delete](ui_sprite_ui_sprite$UISprite.md#delete)
- [focus](ui_sprite_ui_sprite$UISprite.md#focus)
- [getAnimations](ui_sprite_ui_sprite$UISprite.md#getanimations)
- [getCurrentAnimation](ui_sprite_ui_sprite$UISprite.md#getcurrentanimation)
- [getCurrentAnimationFrameIndex](ui_sprite_ui_sprite$UISprite.md#getcurrentanimationframeindex)
- [getId](ui_sprite_ui_sprite$UISprite.md#getid)
- [getNode](ui_sprite_ui_sprite$UISprite.md#getnode)
- [getPosition](ui_sprite_ui_sprite$UISprite.md#getposition)
- [getScreenPosition](ui_sprite_ui_sprite$UISprite.md#getscreenposition)
- [isEnabled](ui_sprite_ui_sprite$UISprite.md#isenabled)
- [isFocused](ui_sprite_ui_sprite$UISprite.md#isfocused)
- [isSelected](ui_sprite_ui_sprite$UISprite.md#isselected)
- [isVisible](ui_sprite_ui_sprite$UISprite.md#isvisible)
- [loadFromFile](ui_sprite_ui_sprite$UISprite.md#loadfromfile)
- [loadTexture](ui_sprite_ui_sprite$UISprite.md#loadtexture)
- [onAction](ui_sprite_ui_sprite$UISprite.md#onaction)
- [play](ui_sprite_ui_sprite$UISprite.md#play)
- [setAnimations](ui_sprite_ui_sprite$UISprite.md#setanimations)
- [setEnabled](ui_sprite_ui_sprite$UISprite.md#setenabled)
- [setId](ui_sprite_ui_sprite$UISprite.md#setid)
- [setPosition](ui_sprite_ui_sprite$UISprite.md#setposition)
- [setSelected](ui_sprite_ui_sprite$UISprite.md#setselected)
- [setVisible](ui_sprite_ui_sprite$UISprite.md#setvisible)
- [unfocus](ui_sprite_ui_sprite$UISprite.md#unfocus)
- [update](ui_sprite_ui_sprite$UISprite.md#update)

### Properties

- [animations](ui_sprite_ui_sprite$UISprite.md#animations)
- [className](ui_sprite_ui_sprite$UISprite.md#classname)
- [currentAnimation](ui_sprite_ui_sprite$UISprite.md#currentanimation)
- [currentAnimationFrameIndex](ui_sprite_ui_sprite$UISprite.md#currentanimationframeindex)
- [id](ui_sprite_ui_sprite$UISprite.md#id)
- [isLooped](ui_sprite_ui_sprite$UISprite.md#islooped)
- [node](ui_sprite_ui_sprite$UISprite.md#node)
- [template](ui_sprite_ui_sprite$UISprite.md#template)
- [timeElapsed](ui_sprite_ui_sprite$UISprite.md#timeelapsed)

### Constructors

- [constructor](ui_sprite_ui_sprite$UISprite.md#constructor)

## Methods

### animate

▸ **animate**(`animation`): `void`

The "animate" function trigger animation to the widget `node` HTMLElement.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `animation` | `string` | The `animation` parameter is a string that represents the name of the animation to be applied to the `node` HTMLElement. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[animate](ui_ui_widget$UIWidget.md#animate)

___

### appendStyles

▸ **appendStyles**(`styles`): `void`

The "appendStyles" function appends CSS styles to the `node` HTMLElement.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `styles` | `string` | The `styles` parameter is a string that represents CSS styles that you want to append to the `cssText` property of the `node` object. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[appendStyles](ui_ui_widget$UIWidget.md#appendstyles)

___

### delete

▸ **delete**(): `void`

The "delete" function free all resources.
Warning: you need to call this method to free allocation for this object.

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[delete](ui_ui_widget$UIWidget.md#delete)

___

### focus

▸ **focus**(): `void`

The "focus" function adds `u-focused` class to the `node` HTMLElement.
It emits a 'E_FOCUSED' event and subscribes to input action event.

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[focus](ui_ui_widget$UIWidget.md#focus)

___

### getAnimations

▸ **getAnimations**(): `JASAnimation`[]

The "getAnimations" function returns an array of animation descriptors.

#### Returns

`JASAnimation`[]

An array of animation descriptors.

___

### getCurrentAnimation

▸ **getCurrentAnimation**(): ``null`` \| `JASAnimation`

The "getCurrentAnimation" function returns the current animation or null if there is no current
animation.

#### Returns

``null`` \| `JASAnimation`

The current animation or null.

___

### getCurrentAnimationFrameIndex

▸ **getCurrentAnimationFrameIndex**(): `number`

The "getCurrentAnimationFrameIndex" function returns the current animation frame index.

#### Returns

`number`

The current animation frame index.

___

### getId

▸ **getId**(): `string`

The "getId" function returns the `ìd` property.

#### Returns

`string`

The `ìd`property.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[getId](ui_ui_widget$UIWidget.md#getid)

___

### getNode

▸ **getNode**(): `HTMLDivElement`

The "getNode" function returns the root `node` HTMLElement of the widget.

#### Returns

`HTMLDivElement`

The `node` property.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[getNode](ui_ui_widget$UIWidget.md#getnode)

___

### getPosition

▸ **getPosition**(): [`vec2`](../modules/core_global.md#vec2)

The "getPosition" function returns the relative x and y coordinates of the widget `node` HTMLElement.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The x and y coordinates of the node's position.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[getPosition](ui_ui_widget$UIWidget.md#getposition)

___

### getScreenPosition

▸ **getScreenPosition**(): [`vec2`](../modules/core_global.md#vec2)

The "getScreenPosition" function returns the left and top coordinates of the widget `node` HTMLElement on
the screen.

#### Returns

[`vec2`](../modules/core_global.md#vec2)

The screen position.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[getScreenPosition](ui_ui_widget$UIWidget.md#getscreenposition)

___

### isEnabled

▸ **isEnabled**(): `boolean`

The "isEnabled" function checks if widget is enabled or not.

#### Returns

`boolean`

A boolean value indicating if the widget is enabled or not.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[isEnabled](ui_ui_widget$UIWidget.md#isenabled)

___

### isFocused

▸ **isFocused**(): `boolean`

The "isFocused" function checks if widget is focused.

#### Returns

`boolean`

A boolean value indicating if widget is focused or not.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[isFocused](ui_ui_widget$UIWidget.md#isfocused)

___

### isSelected

▸ **isSelected**(): `boolean`

The "isSelected" function checks if widget is selected or not.

#### Returns

`boolean`

A boolean value indicating if the widget is selected or not.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[isSelected](ui_ui_widget$UIWidget.md#isselected)

___

### isVisible

▸ **isVisible**(): `boolean`

The "isVisible" function checks if the widget is visible.

#### Returns

`boolean`

A boolean value indicating if widget is visible or not.

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[isVisible](ui_ui_widget$UIWidget.md#isvisible)

___

### loadFromFile

▸ **loadFromFile**(`path`): `Promise`<`void`\>

The "loadFromFile" function asynchronously loads sprite data from a json file (jas).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The `path` parameter is the file path. |

#### Returns

`Promise`<`void`\>

___

### loadTexture

▸ **loadTexture**(`imageFile`): `Promise`<`void`\>

The "loadTexture" function asynchronously loads an spritesheet image file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `imageFile` | `string` | The `imageFile` parameter is a string that represents the file path or URL of the image that you want to load as a texture. |

#### Returns

`Promise`<`void`\>

___

### onAction

▸ **onAction**(`actionId`): `void`

The "onAction" function is a virtual method that is called when input action event is emitted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionId` | `string` | The `actionId` parameter is a string that represents the identifier of the action being performed. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[onAction](ui_ui_widget$UIWidget.md#onaction)

___

### play

▸ **play**(`animationName`, `isLooped?`, `preventSameAnimation?`): `void`

The "play" function is used to start playing a specific animation, with options for looping and
preventing the same animation from being played again.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `animationName` | `string` | `undefined` | The name of the animation to be played. |
| `isLooped` | `boolean` | `false` | - |
| `preventSameAnimation?` | `boolean` | `false` | The `preventSameAnimation` parameter is a boolean flag that determines whether the same animation should be prevented from playing again. |

#### Returns

`void`

___

### setAnimations

▸ **setAnimations**(`animations`): `void`

The "setAnimations" function sets the animations property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `animations` | `JASAnimation`[] | The `animations` parameter is an array of animation descriptors. |

#### Returns

`void`

___

### setEnabled

▸ **setEnabled**(`enabled`): `void`

The "setEnabled" function sets the enabled state flag.
It is just to expose a convenient option to the user, this flag has not effect on the UI manager.
Nota bene: toggle the `u-disabled` class on `node`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | The `enabled` parameter is a boolean value that determines whether the widget is enabled or disabled. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[setEnabled](ui_ui_widget$UIWidget.md#setenabled)

___

### setId

▸ **setId**(`id`): `void`

The "setId" function sets the id property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | A string representing the unique identifier to be set. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[setId](ui_ui_widget$UIWidget.md#setid)

___

### setPosition

▸ **setPosition**(`x`, `y`): `void`

The "setPosition" function sets the left and top position to the widget `node` HTMLElement.
Nota bene: works only if position is `absolute`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The horizontal position of the element on the page. |
| `y` | `number` | The vertical position of the element on the page. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[setPosition](ui_ui_widget$UIWidget.md#setposition)

___

### setSelected

▸ **setSelected**(`selected`): `void`

The "setSelected" function sets the selected state flag.
It is just to expose a convenient option to the user, this flag has not effect on the UI manager.
Nota bene: toggle the `u-selected` class on `node`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selected` | `boolean` | The `selected` parameter is a boolean value that indicates whether the element should be selected or not. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[setSelected](ui_ui_widget$UIWidget.md#setselected)

___

### setVisible

▸ **setVisible**(`visible`): `void`

The "setVisible" function sets the visibility state.
Nota bene: toggle the `u-hidden` class on `node`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `visible` | `boolean` | The `visible` parameter is a boolean value that determines whether the element should be visible or hidden. If `visible` is true, the element will be displayed, otherwise it will be hidden. |

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[setVisible](ui_ui_widget$UIWidget.md#setvisible)

___

### unfocus

▸ **unfocus**(): `void`

The "unfocus" function removes the `u-focused` class from the `node` HTMLElement.
It emits an 'E_UNFOCUSED' event and unsubscribes the inputManager from input action event.

#### Returns

`void`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[unfocus](ui_ui_widget$UIWidget.md#unfocus)

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

#### Overrides

[UIWidget](ui_ui_widget$UIWidget.md).[update](ui_ui_widget$UIWidget.md#update)

## Properties

### animations

• **animations**: `JASAnimation`[]

___

### className

• **className**: `string`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[className](ui_ui_widget$UIWidget.md#classname)

___

### currentAnimation

• **currentAnimation**: ``null`` \| `JASAnimation`

___

### currentAnimationFrameIndex

• **currentAnimationFrameIndex**: `number`

___

### id

• **id**: `string`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[id](ui_ui_widget$UIWidget.md#id)

___

### isLooped

• **isLooped**: `boolean`

___

### node

• **node**: `HTMLDivElement`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[node](ui_ui_widget$UIWidget.md#node)

___

### template

• **template**: `string`

#### Inherited from

[UIWidget](ui_ui_widget$UIWidget.md).[template](ui_ui_widget$UIWidget.md#template)

___

### timeElapsed

• **timeElapsed**: `number`

## Constructors

### constructor

• **new UISprite**(`options?`)

The constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | An object containing optionnal className override. |
| `options.className?` | `string` | - |

#### Overrides

[UIWidget](ui_ui_widget$UIWidget.md).[constructor](ui_ui_widget$UIWidget.md#constructor)
