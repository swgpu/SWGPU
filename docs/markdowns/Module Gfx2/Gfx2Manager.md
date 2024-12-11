# Gfx2Manager

Singleton 2D graphics manager.
## Constructors
* **new Gfx2Manager**(): Gfx2Manager   
## Methods
* **beginRender**(): void   
* **draw**(drawable: Gfx2Drawable): void   
  * **drawable**: The drawable.
* **endRender**(): void   
* **findCanvasPosFromClientPos**(clientX: number, clientY: number): vec2   
  * **clientX**: The horizontal client coordinate.
  * **clientY**: The vertical client coordinate.
* **findWorldPosFromClientPos**(clientX: number, clientY: number): vec2   
  * **clientX**: The horizontal client coordinate.
  * **clientY**: The vertical client coordinate.
* **getBgColor**(): vec4   
* **getCameraPosition**(): vec2   
* **getCameraPositionX**(): number   
* **getCameraPositionY**(): number   
* **getCameraRotation**(): number   
* **getCameraScale**(): vec2   
* **getCameraScaleX**(): number   
* **getCameraScaleY**(): number   
* **getCameraTransform**(): mat3   
* **getContext**(): CanvasRenderingContext2D   
* **getDefaultTexture**(): HTMLImageElement   
* **getHeight**(): number   
* **getWidth**(): number   
* **hasFilter**(): boolean   
* **moveCamera**(x: number, y: number): void   
  * **x**: The move in x-axis direction.
  * **y**: The move in y-axis direction.
* **render**(): void   
* **setBgColor**(r: number, g: number, b: number, a: number): void   
  * **r**: The red component.
  * **g**: The green component.
  * **b**: The blue component.
  * **a**: The alpha value.
* **setCameraPosition**(x: number, y: number): void   
  * **x**: The x-coordinate.
  * **y**: The y-coordinate.
* **setCameraRotation**(cameraRotation: number): void   
  * **cameraRotation**: The camera rotation angle in radians.
* **setCameraScale**(x: number, y: number): void   
  * **x**: The scale factor for the camera in the x-axis.
  * **y**: The scale factor for the camera in the y-axis.
* **setCameraTransform**(cameraTransform: mat3): void   
  * **cameraTransform**: The transformation matrix.
* **setFilter**(filter: string): void   
  * **filter**: The filter parameter is a string that represents the CSS filter property's value.
It can be used to apply various visual effects to an element, such as blur, brightness, contrast,
grayscale, etc.
* **setMode**(mode: Gfx2RenderingMode): void   
  * **mode**: The mode.
* **update**(ts: number): void   
  * **ts**: The timestep.
