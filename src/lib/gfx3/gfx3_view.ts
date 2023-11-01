import { UT } from '../core/utils';

enum ProjectionMode {
  PERSPECTIVE = 'PERSPECTIVE',
  ORTHOGRAPHIC = 'ORTHOGRAPHIC'
};

interface Gfx3Viewport {
  xFactor: number;
  yFactor: number;
  widthFactor: number;
  heightFactor: number;
};

/**
 * The `Gfx3View` class represents a view in a 3D graphics application, providing methods to manipulate
 * camera settings, projection mode, background color, and calculate screen positions of 3D points.
 */
class Gfx3View {
  cameraMatrix: mat4;
  clipOffset: vec2;
  viewport: Gfx3Viewport;
  projectionMode: ProjectionMode;
  perspectiveFovy: number;
  perspectiveNear: number;
  perspectiveFar: number;
  orthographicSize: number;
  orthographicDepth: number;
  bgColor: vec4;
  screenSize: vec2;

  /**
   * The constructor.
   */
  constructor() {
    this.cameraMatrix = UT.MAT4_IDENTITY();
    this.clipOffset = [0.0, 0.0];
    this.viewport = { xFactor: 0, yFactor: 0, widthFactor: 1, heightFactor: 1 };
    this.projectionMode = ProjectionMode.PERSPECTIVE;
    this.perspectiveFovy = Math.PI / 4;
    this.perspectiveNear = 0.1;
    this.perspectiveFar = 2000;
    this.orthographicSize = 1;
    this.orthographicDepth = 700;
    this.bgColor = [0.0, 0.0, 0.0, 0.0];
    this.screenSize = [0, 0];
  }

  /**
   * The "getCameraPosition" function returns the position of the camera.
   * @returns The position of camera.
   */
  getCameraPosition(): vec3 {
    return [
      this.cameraMatrix[12],
      this.cameraMatrix[13],
      this.cameraMatrix[14]
    ];
  }

  /**
   * The "getClipOffset" function returns the clip offset.
   * @returns The clip offset.
   */
  getClipOffset(): vec2 {
    return this.clipOffset;
  }

  /**
   * The "getClipOffsetX" function returns the x-coordinate of the clip offset.
   * @returns The X coordinate of clip offset.
   */
  getClipOffsetX(): number {
    return this.clipOffset[0];
  }

  /**
   * The "getClipOffsetY" function returns the y-coordinate of the clip offset.
   * @returns The Y coordinate of clip offset.
   */
  getClipOffsetY(): number {
    return this.clipOffset[1];
  }

  /**
   * The "setClipOffset" function set the clip offset with the given x and y coordinates.
   * @param {number} x - The X coordinate of the clip offset.
   * @param {number} y - The Y coordinate of the clip offset.
   */
  setClipOffset(x: number, y: number): void {
    this.clipOffset[0] = x;
    this.clipOffset[1] = y;
  }

  /**
   * The "getCameraMatrix" function returns the camera matrix.
   * @returns The camera matrix.
   */
  getCameraMatrix(): mat4 {
    return this.cameraMatrix;
  }

  /**
   * The "setCameraMatrix" function sets the camera matrix.
   * @param {mat4} cameraMatrix - The cameraMatrix parameter is a 4x4 matrix that represents the
   * transformation applied to the camera. It is typically used to define the position, orientation, and
   * scale of the camera in the scene.
   */
  setCameraMatrix(cameraMatrix: mat4): void {
    this.cameraMatrix = cameraMatrix;
  }

  /**
   * The "getViewport" function returns the viewport of the view.
   * @returns The viewport property.
   */
  getViewport(): Gfx3Viewport {
    return this.viewport;
  }

  /**
   * The "setViewport" function sets the viewport of the view.
   * @param {Gfx3Viewport} viewport - The `viewport` parameter represents
   * the dimensions and position of the viewport on canvas.
   */
  setViewport(viewport: Gfx3Viewport): void {
    this.viewport = viewport;
  }

  /**
   * The "getProjectionMode" function returns the current projection mode.
   * @returns The projection mode property.
   */
  getProjectionMode(): ProjectionMode {
    return this.projectionMode;
  }

  /**
   * The "setProjectionMode" function sets the projection mode property.
   * @param {ProjectionMode} projectionMode - The projection mode.
   */
  setProjectionMode(projectionMode: ProjectionMode): void {
    this.projectionMode = projectionMode;
  }

  /**
   * The "getPerspectiveFovy" function returns the fovy angle (perspective eye-angle).
   * @returns The fovy angle.
   */
  getPerspectiveFovy(): number {
    return this.perspectiveFovy;
  }

  /**
   * The "setPerspectiveFovy" function sets the fovy angle property.
   * @param {number} perspectiveFovy - The `perspectiveFovy` parameter represents
   * the field of view angle in the vertical direction for a perspective projection.
   */
  setPerspectiveFovy(perspectiveFovy: number): void {
    this.perspectiveFovy = perspectiveFovy;
  }

  /**
   * The "getPerspectiveNear" function returns the perspective near property.
   * @returns The perspective near property.
   */
  getPerspectiveNear(): number {
    return this.perspectiveNear;
  }

  /**
   * The "setPerspectiveNear" function sets the value of the perspectiveNear property.
   * @param {number} perspectiveNear - The parameter `perspectiveNear` represents the
   * distance to the near clipping plane of a perspective projection.
   */
  setPerspectiveNear(perspectiveNear: number): void {
    this.perspectiveNear = perspectiveNear;
  }

  /**
   * The "getPerspectiveFar" function returns the value of the perspectiveFar property.
   * @returns The perspective far property.
   */
  getPerspectiveFar(): number {
    return this.perspectiveFar;
  }

  /**
   * The "setPerspectiveFar" function sets the value of the perspectiveFar property.
   * @param {number} perspectiveFar - The parameter `perspectiveFar` is the far
   * clipping plane of a perspective projection. It determines the maximum distance from the camera at
   * which objects will be rendered.
   */
  setPerspectiveFar(perspectiveFar: number): void {
    this.perspectiveFar = perspectiveFar;
  }

  /**
   * The "getOrthographicSize" function returns the value of the "orthographicSize" property.
   * @returns The orthographic size property.
   */
  getOrthographicSize(): number {
    return this.orthographicSize;
  }

  /**
   * The  "setOrthographicSize" function sets the `orthographicSize` property.
   * @param {number} orthographicSize - The orthographicSize parameter is the
   * size of the orthographic camera view. It determines how much of the scene is visible within the
   * camera's view frustum.
   */
  setOrthographicSize(orthographicSize: number): void {
    this.orthographicSize = orthographicSize;
  }

  /**
   * The "getOrthographicDepth" function returns the `orthographicDepth`property.
   * @returns The orthographic depth property.
   */
  getOrthographicDepth(): number {
    return this.orthographicDepth;
  }

  /**
   * The "setOrthographicDepth" function sets the `orthographicDepth`property.
   * @param {number} orthographicDepth - The `orthographicDepth` parameter is the depth of the orthographic view.
   */
  setOrthographicDepth(orthographicDepth: number): void {
    this.orthographicDepth = orthographicDepth;
  }

  /**
   * The "getBgColor" function returns the background color.
   * @returns The `bgColor` property, which is the background color.
   */
  getBgColor(): vec4 {
    return this.bgColor;
  }

  /**
   * The "setBgColor" function sets the background color ranging from 0 to 1.
   * @param {number} r - The parameter "r" represents the red component.
   * @param {number} g - The parameter "g" represents the green component.
   * @param {number} b - The parameter "b" represents the blue component.
   * @param {number} a - The parameter "a" represents the alpha value.
   */
  setBgColor(r: number, g: number, b: number, a: number): void {
    this.bgColor[0] = r;
    this.bgColor[1] = g;
    this.bgColor[2] = b;
    this.bgColor[3] = a;
  }

  /**
   * The "getScreenSize" function returns the screen size property.
   * @returns The screen size property.
   */
  getScreenSize(): vec2 {
    return this.screenSize;
  }

  /**
   * The "setScreenSize" function sets the screen width and height property.
   * @param {number} width - The width of the screen size.
   * @param {number} height - The height of the screen size.
   */
  setScreenSize(width: number, height: number): void {
    this.screenSize[0] = width;
    this.screenSize[1] = height;
  }

  /**
   * The "getViewportSize" function calculates and returns the size of the viewport in pixels.
   * @returns The size of the viewport in pixels.
   */
  getViewportSize(): vec2 {
    const w = this.screenSize[0] * this.viewport.widthFactor;
    const h = this.screenSize[1] * this.viewport.heightFactor;
    return [w, h];
  }

  /**
   * The "getViewportClientSize" function calculates the size of the viewport in client coordinates space.
   * @returns The size of the viewport client area.
   */
  getViewportClientSize(): vec2 {
    const cw = (this.screenSize[0] * this.viewport.widthFactor) / window.devicePixelRatio;
    const ch = (this.screenSize[1] * this.viewport.heightFactor) / window.devicePixelRatio;
    return [cw, ch];
  }

  /**
   * The "getProjectionMatrix" function returns a projection matrix based on the current projection mode.
   * @returns The projection matrix.
   */
  getProjectionMatrix(): mat4 {
    const matrix = UT.MAT4_IDENTITY();
    const viewportWidth = this.screenSize[0] * this.viewport.widthFactor;
    const viewportHeight = this.screenSize[1] * this.viewport.heightFactor;
    const viewportAspect = viewportWidth / viewportHeight;

    if (this.projectionMode == ProjectionMode.PERSPECTIVE) {
      UT.MAT4_PERSPECTIVE(this.perspectiveFovy, viewportAspect, this.perspectiveNear, this.perspectiveFar, matrix);
    }
    else if (this.projectionMode == ProjectionMode.ORTHOGRAPHIC) {
      UT.MAT4_ORTHOGRAPHIC(this.orthographicSize, this.orthographicSize / viewportAspect, this.orthographicDepth, matrix);
    }

    return matrix;
  }

  /**
   * The "getClipMatrix" function returns a the clip matrix.
   * @returns The clip matrix.
   */
  getClipMatrix(): mat4 {
    return UT.MAT4_INVERT(UT.MAT4_TRANSLATE(this.clipOffset[0], this.clipOffset[1], 0));
  }

  /**
   * The "getCameraViewMatrix" function returns the camera view matrix (inverted camera matrix).
   * @returns The camera view matrix.
   */
  getCameraViewMatrix(): mat4 {
    return UT.MAT4_INVERT(this.cameraMatrix);
  }

  /**
   * The "getProjectionClipMatrix" function returns the result of multiplying the clip matrix and the projection matrix.
   * @returns The result of multiplying the clip matrix and the projection matrix together.
   */
  getProjectionClipMatrix(): mat4 {
    const matrix = UT.MAT4_IDENTITY();
    UT.MAT4_MULTIPLY(matrix, this.getClipMatrix(), matrix);
    UT.MAT4_MULTIPLY(matrix, this.getProjectionMatrix(), matrix);
    return matrix;
  }

  /**
   * The "getViewProjectionClipMatrix" function returns the result of multiplying the clip matrix,
   * projection matrix, and camera view matrix together.
   * @returns The result of multiplying the clip matrix, projection matrix and camera view matrix together.
   */
  getViewProjectionClipMatrix(): mat4 {
    const matrix = UT.MAT4_IDENTITY();
    UT.MAT4_MULTIPLY(matrix, this.getClipMatrix(), matrix);
    UT.MAT4_MULTIPLY(matrix, this.getProjectionMatrix(), matrix);
    UT.MAT4_MULTIPLY(matrix, this.getCameraViewMatrix(), matrix);
    return matrix;
  }

  /**
   * The "getClientScreenPosition" function calculates the client screen position of a 3D point given its world
   * coordinates.
   * @param {number} x - The x world coordinate.
   * @param {number} y - The y world coordinate.
   * @param {number} z - The z world coordinate.
   * @returns The client screen position.
   */
  getClientScreenPosition(x: number, y: number, z: number): vec2 {
    const matrix = UT.MAT4_IDENTITY();
    UT.MAT4_MULTIPLY(matrix, this.getClipMatrix(), matrix);
    UT.MAT4_MULTIPLY(matrix, this.getProjectionMatrix(), matrix);
    UT.MAT4_MULTIPLY(matrix, this.getCameraViewMatrix(), matrix);

    const pos = UT.MAT4_MULTIPLY_BY_VEC4(matrix, [x, y, z, 1]);
    const viewportClientSize = this.getViewportClientSize();

    pos[0] = pos[0] / pos[3];
    pos[1] = pos[1] / pos[3];
    pos[0] = ((pos[0] + 1.0) * viewportClientSize[0]) / (2.0);
    pos[1] = viewportClientSize[1] - ((pos[1] + 1.0) * viewportClientSize[1]) / (2.0);
    return [pos[0], pos[1]];
  }

  /**
   * The "getScreenNormalizedPosition" function calculates the normalized screen position of a 3D point given its world
   * coordinates.
   * @param {number} x - The x world coordinate.
   * @param {number} y - The y world coordinate.
   * @param {number} z - The z world coordinate.
   * @returns The normalized screen position.
   */
  getScreenNormalizedPosition(x: number, y: number, z: number): vec2 {
    const matrix = UT.MAT4_IDENTITY();
    UT.MAT4_MULTIPLY(matrix, this.getClipMatrix(), matrix);
    UT.MAT4_MULTIPLY(matrix, this.getProjectionMatrix(), matrix);
    UT.MAT4_MULTIPLY(matrix, this.getCameraViewMatrix(), matrix);

    const pos = UT.MAT4_MULTIPLY_BY_VEC4(matrix, [x, y, z, 1]);
    return [pos[0] / pos[3], pos[1] / pos[3]];
  }
}

export type { Gfx3Viewport };
export { ProjectionMode, Gfx3View };