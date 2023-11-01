[Haiku Engine Documentation](../README.md) / [Exports](../modules.md) / [gfx2\_map/gfx2\_map](../modules/gfx2_map_gfx2_map.md) / Gfx2Map

# Class: Gfx2Map

[gfx2_map/gfx2_map](../modules/gfx2_map_gfx2_map.md).Gfx2Map

The `Gfx2Map` class represents a map in a game and provides methods for loading map data, accessing
map properties, and manipulating map tiles.

## Table of contents

### Methods

- [findTileLayer](gfx2_map_gfx2_map$Gfx2Map.md#findtilelayer)
- [getColumns](gfx2_map_gfx2_map$Gfx2Map.md#getcolumns)
- [getHeight](gfx2_map_gfx2_map$Gfx2Map.md#getheight)
- [getLocationCol](gfx2_map_gfx2_map$Gfx2Map.md#getlocationcol)
- [getLocationRow](gfx2_map_gfx2_map$Gfx2Map.md#getlocationrow)
- [getPositionX](gfx2_map_gfx2_map$Gfx2Map.md#getpositionx)
- [getPositionY](gfx2_map_gfx2_map$Gfx2Map.md#getpositiony)
- [getRows](gfx2_map_gfx2_map$Gfx2Map.md#getrows)
- [getTileHeight](gfx2_map_gfx2_map$Gfx2Map.md#gettileheight)
- [getTileLayer](gfx2_map_gfx2_map$Gfx2Map.md#gettilelayer)
- [getTileWidth](gfx2_map_gfx2_map$Gfx2Map.md#gettilewidth)
- [getTileset](gfx2_map_gfx2_map$Gfx2Map.md#gettileset)
- [getWidth](gfx2_map_gfx2_map$Gfx2Map.md#getwidth)
- [loadFromFile](gfx2_map_gfx2_map$Gfx2Map.md#loadfromfile)

### Properties

- [columns](gfx2_map_gfx2_map$Gfx2Map.md#columns)
- [rows](gfx2_map_gfx2_map$Gfx2Map.md#rows)
- [tileHeight](gfx2_map_gfx2_map$Gfx2Map.md#tileheight)
- [tileLayers](gfx2_map_gfx2_map$Gfx2Map.md#tilelayers)
- [tileWidth](gfx2_map_gfx2_map$Gfx2Map.md#tilewidth)
- [tileset](gfx2_map_gfx2_map$Gfx2Map.md#tileset)

### Constructors

- [constructor](gfx2_map_gfx2_map$Gfx2Map.md#constructor)

## Methods

### findTileLayer

▸ **findTileLayer**(`name`): `undefined` \| `Gfx2TileLayer`

The "findTileLayer" function searches for a tile layer with a given name and returns it if found,
otherwise it returns undefined.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the tile layer that you want to find. |

#### Returns

`undefined` \| `Gfx2TileLayer`

The tile layer.

___

### getColumns

▸ **getColumns**(): `number`

The "getColumns" function returns the number of columns.

#### Returns

`number`

The number of columns.

___

### getHeight

▸ **getHeight**(): `number`

The "getHeight" function returns the map height in pixels.

#### Returns

`number`

The map height in pixels.

___

### getLocationCol

▸ **getLocationCol**(`x`): `number`

The "getLocationCol" function returns the column number of a given x-coordinate.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | The parameter `x` represents the x-coordinate of a point. |

#### Returns

`number`

The column number.

___

### getLocationRow

▸ **getLocationRow**(`y`): `number`

The "getLocationRow" function returns the row number of a given y-coordinate.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `y` | `number` | The parameter `y` represents the y-coordinate of a point. |

#### Returns

`number`

The row number.

___

### getPositionX

▸ **getPositionX**(`col`): `number`

The "getPositionX" function returns the x-coordinate position of a column on a grid.
Origin is given at the top-left corner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `col` | `number` | The parameter `col` represents the column number. |

#### Returns

`number`

The x-coordinate position.

___

### getPositionY

▸ **getPositionY**(`row`): `number`

The "getPositionY" function returns the y-coordinate position of a row on a grid.
Origin is given at the top-left corner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `row` | `number` | The parameter `row` represents the column number. |

#### Returns

`number`

The y-coordinate position.

___

### getRows

▸ **getRows**(): `number`

The "getRows" function returns the number of rows.

#### Returns

`number`

The number of rows.

___

### getTileHeight

▸ **getTileHeight**(): `number`

The "getTileHeight" function returns the height of a tile.

#### Returns

`number`

The tile height.

___

### getTileLayer

▸ **getTileLayer**(`index`): `Gfx2TileLayer`

The "getTileLayer" function returns the tile layer at the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the tile layer. |

#### Returns

`Gfx2TileLayer`

The tile layer.

___

### getTileWidth

▸ **getTileWidth**(): `number`

The "getTileWidth" function returns the width of a tile.

#### Returns

`number`

The tile width.

___

### getTileset

▸ **getTileset**(): `Gfx2Tileset`

The "getTileset" function returns the tileset.

#### Returns

`Gfx2Tileset`

The tileset.

___

### getWidth

▸ **getWidth**(): `number`

The "getWidth" function returns the width map in pixels.

#### Returns

`number`

The map width in pixels.

___

### loadFromFile

▸ **loadFromFile**(`path`): `Promise`<`void`\>

The "loadFromFile" function asynchronously loads map data from a json file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The `path` parameter is the file path. |

#### Returns

`Promise`<`void`\>

## Properties

### columns

• **columns**: `number`

___

### rows

• **rows**: `number`

___

### tileHeight

• **tileHeight**: `number`

___

### tileLayers

• **tileLayers**: `Gfx2TileLayer`[]

___

### tileWidth

• **tileWidth**: `number`

___

### tileset

• **tileset**: `Gfx2Tileset`

## Constructors

### constructor

• **new Gfx2Map**()

The constructor.
