# Gfx2TileMap

The tilemap.
## Constructors
* **new Gfx2TileMap**(): Gfx2TileMap   
## Methods
* **box**(mx: number, my: number, layerIndex: number, l: number, r: number, t: number, b: number, gap: number): TileCollision   
  * **mx**: The x movement.
  * **my**: The y movement.
  * **layerIndex**: The collision index layer.
  * **l**: The left side of rectangle.
  * **r**: The right side of rectangle.
  * **t**: The top side of rectangle.
  * **b**: The bottom side of rectangle.
  * **gap**
* **findTileLayer**(name: string)   
  * **name**: The name of the tile layer.
* **getColumns**(): number   
* **getHeight**(): number   
* **getLocationCol**(x: number): number   
  * **x**: The x-coordinate.
* **getLocationFromIso**(x: number, y: number): vec2   
  * **x**: The x-coordinate.
  * **y**: The y-coordinate.
* **getLocationRow**(y: number): number   
  * **y**: The y-coordinate.
* **getPositionIso**(row: number, col: number): vec2   
  * **row**: The row index.
  * **col**: The column index.
* **getPositionX**(col: number): number   
  * **col**: The column index.
* **getPositionY**(row: number): number   
  * **row**: The row index.
* **getRows**(): number   
* **getTileHeight**(): number   
* **getTileLayer**(index: number): Gfx2TileLayer   
  * **index**: The index.
* **getTileLayers**()   
* **getTileWidth**(): number   
* **getTileset**(): Gfx2Tileset   
* **getWidth**(): number   
* **loadFromData**(json: FormatJTM): Promise   
  * **json**
* **loadFromFile**(path: string): Promise   
  * **path**: The file path.
* **loadFromSpriteFusion**(path: string, texturePath: string): Promise   
  * **path**: The file path.
  * **texturePath**: The texture file path.
* **loadFromTileKit**(path: string, textureDir: string): Promise   
  * **path**: The file path.
  * **textureDir**: The texture folder path.
