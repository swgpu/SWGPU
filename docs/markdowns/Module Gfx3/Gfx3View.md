# Gfx3View

A 3D view. Used to manipulate camera, viewport, projection mode, background color and more.
## Constructors
* **new Gfx3View**(): Gfx3View   
## Methods
* **getBgColor**(): vec4   
* **getBillboardProjectionClipMatrix**(): mat4   
* **getCameraMatrix**(): mat4   
* **getCameraPosition**(): vec3   
* **getCameraViewMatrix**(): mat4   
* **getClientScreenPosition**(x: number, y: number, z: number): vec2   
  * **x**: The x world coordinate.
  * **y**: The y world coordinate.
  * **z**: The z world coordinate.
* **getClipMatrix**(): mat4   
* **getClipOffset**(): vec2   
* **getClipOffsetX**(): number   
* **getClipOffsetY**(): number   
* **getOrthographicDepth**(): number   
* **getOrthographicSize**(): number   
* **getPerspectiveFar**(): number   
* **getPerspectiveFovy**(): number   
* **getPerspectiveNear**(): number   
* **getProjectionClipMatrix**(): mat4   
* **getProjectionMatrix**(): mat4   
* **getProjectionMode**(): ProjectionMode   
* **getScreenNormalizedPosition**(x: number, y: number, z: number): vec2   
  * **x**: The x world coordinate.
  * **y**: The y world coordinate.
  * **z**: The z world coordinate.
* **getScreenNormalizedPositionZeroToOne**(x: number, y: number, z: number): vec2   
  * **x**: The x world coordinate.
  * **y**: The y world coordinate.
  * **z**: The z world coordinate.
* **getScreenPosition**(x: number, y: number, z: number): vec2   
  * **x**: The x world coordinate.
  * **y**: The y world coordinate.
  * **z**: The z world coordinate.
* **getScreenSize**(): vec2   
* **getViewProjectionClipMatrix**(): mat4   
* **getViewport**(): Gfx3Viewport   
* **getViewportClientSize**(): vec2   
* **getViewportSize**(): vec2   
* **setBgColor**(r: number, g: number, b: number, a: number): void   
  * **r**: The parameter "r" represents the red component.
  * **g**: The parameter "g" represents the green component.
  * **b**: The parameter "b" represents the blue component.
  * **a**: The parameter "a" represents the alpha value.
* **setCameraMatrix**(cameraMatrix: mat4): void   
  * **cameraMatrix**: The camera transformation matrix.
* **setClipOffset**(x: number, y: number): void   
  * **x**: The X coordinate of the clip offset.
  * **y**: The Y coordinate of the clip offset.
* **setOrthographicDepth**(orthographicDepth: number): void   
  * **orthographicDepth**: The depth of the orthographic view.
* **setOrthographicSize**(orthographicSize: number): void   
  * **orthographicSize**: Determines how much of the scene is visible within the camera's view frustum.
* **setPerspectiveFar**(perspectiveFar: number): void   
  * **perspectiveFar**: The maximum distance from the camera at which objects will be rendered.
* **setPerspectiveFovy**(perspectiveFovy: number): void   
  * **perspectiveFovy**: The fovy angle.
* **setPerspectiveNear**(perspectiveNear: number): void   
  * **perspectiveNear**: The distance to the near clipping plane of a perspective projection.
* **setProjectionMode**(projectionMode: ProjectionMode): void   
  * **projectionMode**: The projection mode.
* **setScreenSize**(width: number, height: number): void   
  * **width**: The width of the screen size.
  * **height**: The height of the screen size.
* **setViewport**(viewport: Gfx3Viewport): void   
  * **viewport**: The viewport.
