# Gfx2Tileset

The tileset.
## Constructors
* **new Gfx2Tileset**(): Gfx2Tileset   
## Methods
* **getAnimation**(tileId: number)   
  * **tileId**: The tile index.
* **getColumns**(): number   
* **getProperties**(tileId: number): any   
  * **tileId**: The tile index.
* **getProperty**(tileId: number, key: string): any   
  * **tileId**: The tile index.
  * **key**: The property key.
* **getSlope**(tileId: number)   
  * **tileId**: The tile index.
* **getTexture**()   
* **getTileHeight**(): number   
* **getTilePositionX**(tileId: number): number   
  * **tileId**: The tile index (start at 1).
* **getTilePositionY**(tileId: number): number   
  * **tileId**: The tile index (start at 1).
* **getTileWidth**(): number   
* **loadFromData**(data: FormatJTMTileSet): Promise   
  * **data**: The data object.
* **loadFromTexture**(texturePath: string, tileWidth: number, tileHeight: number): Promise   
  * **texturePath**: The texture path.
  * **tileWidth**: The tile width.
  * **tileHeight**: The tile height.
