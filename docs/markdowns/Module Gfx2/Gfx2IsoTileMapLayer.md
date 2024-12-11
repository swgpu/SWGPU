# Gfx2IsoTileMapLayer

A isometric tilemap layer drawable.
- inherit from: Gfx2Drawable
## Constructors
* **new Gfx2IsoTileMapLayer**(): Gfx2IsoTileMapLayer   
## Methods
* **getColorDebug**(): string   
* **getLineWidthDebug**(): number   
* **getTiles**()   
* **isShowDebug**(): boolean   
* **loadFromTileMap**(tilemap: Gfx2TileMap, layerIndex: number): void   
  * **tilemap**: The tilemap.
  * **layerIndex**: The index of the tilelayer.
* **onRender**(): void   
* **placeTile**(tileId: number, row: number, col: number): void   
  * **tileId**: The tile identifier.
  * **row**: The row index.
  * **col**: The col index.
* **removeTileAt**(row: number, col: number): void   
  * **row**: The row index.
  * **col**: The col index.
* **setColorDebug**(colorDebug: string): void   
  * **colorDebug**: The color.
* **setLineWidthDebug**(lineWidthDebug: number): void   
  * **lineWidthDebug**: The line width.
* **setShowDebug**(showDebug: boolean): void   
  * **showDebug**: The showDebug flag.
* **update**(ts: number): void   
  * **ts**: The timestep.
