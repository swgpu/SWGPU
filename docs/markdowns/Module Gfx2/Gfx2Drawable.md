# Gfx2Drawable

A 2D drawable object.
- parent of: Gfx2IsoTile, Gfx2IsoTileMapLayer, Gfx2Particles, Gfx2SpriteJAS, Gfx2SpriteJSS, Gfx2SpriteScrolling, Gfx2TileMapLayer
## Constructors
* **new Gfx2Drawable**(): Gfx2Drawable   
## Methods
* **clone**(drawable: Gfx2Drawable): Gfx2Drawable   
  * **drawable**: The copy object.
* **draw**(): void   
* **getBoundingRect**(): Gfx2BoundingRect   
* **getElevation**(): number   
* **getFlip**()   
* **getFlipX**(): boolean   
* **getFlipY**(): boolean   
* **getOffset**(): vec2   
* **getOffsetX**(): number   
* **getOffsetY**(): number   
* **getOpacity**(): number   
* **getPosition**(): vec2   
* **getPositionX**(): number   
* **getPositionY**(): number   
* **getPositionZ**(): number   
* **getRotation**(): number   
* **getScale**(): vec2   
* **getScaleX**(): number   
* **getScaleY**(): number   
* **getWorldBoundingRect**(): Gfx2BoundingRect   
* **isVisible**(): boolean   
* **onRender**(): void   
* **render**(): void   
* **rotate**(a: number): void   
  * **a**: The rotation angle to add in radians.
* **setBoundingRect**(boundingRect: Gfx2BoundingRect): void   
  * **boundingRect**: The bounding rectangle.
* **setElevation**(elevation: number): void   
  * **elevation**: The elevation value.
* **setFlipX**(x: boolean): void   
  * **x**: The x-axis flip flag.
* **setFlipY**(y: boolean): void   
  * **y**: The y-axis flip flag.
* **setOffset**(x: number, y: number): void   
  * **x**: The x-offset.
  * **y**: The y-offset.
* **setOpacity**(opacity: number): void   
  * **opacity**: The opacity value.
* **setPosition**(x: number, y: number): void   
  * **x**: The X coordinate of the position.
  * **y**: The Y coordinate of the position.
* **setPositionZ**(z: number): void   
  * **z**: The z-depth value.
* **setRotation**(rotation: number): void   
  * **rotation**: The rotation angle in radians.
* **setScale**(x: number, y: number): void   
  * **x**: The x factor in the x-axis direction.
  * **y**: The y factor in the y-axis direction.
* **setVisible**(visible: boolean): void   
  * **visible**: The visibility.
* **translate**(x: number, y: number): void   
  * **x**: The amount of translation in the x-axis direction.
  * **y**: The amount of translation in the y-axis direction.
* **update**(ts: number): void   
  * **ts**: The timestep.
* **zoom**(x: number, y: number): void   
  * **x**: The x factor in the x-axis direction.
  * **y**: The y factor in the y-axis direction.
