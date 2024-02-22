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
 * A 3D view. Used to manipulate camera, viewport, projection mode, background color and more.
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
   * Returns the position of the camera.
   */
  getCameraPosition(): vec3 {
    return [
      this.cameraMatrix[12],
      this.cameraMatrix[13],
      this.cameraMatrix[14]
    ];
  }

  /**
   * Returns the clip offset.
   */
  getClipOffset(): vec2 {
    return this.clipOffset;
  }

  /**
   * Returns the x-coordinate of the clip offset.
   */
  getClipOffsetX(): number {
    return this.clipOffset[0];
  }

  /**
   * Returns the y-coordinate of the clip offset.
   */
  getClipOffsetY(): number {
    return this.clipOffset[1];
  }

  /**
   * Set the clip offset with the given x and y coordinates.
   * 
   * @param {number} x - The X coordinate of the clip offset.
   * @param {number} y - The Y coordinate of the clip offset.
   */
  setClipOffset(x: number, y: number): void {
    this.clipOffset[0] = x;
    this.clipOffset[1] = y;
  }

  /**
   * Returns the camera matrix.
   */
  getCameraMatrix(): mat4 {
    return this.cameraMatrix;
  }

  /**
   * Set the camera matrix.
   * 
   * @param {mat4} cameraMatrix - The camera transformation matrix.
   */
  setCameraMatrix(cameraMatrix: mat4): void {
    this.cameraMatrix = cameraMatrix;
  }

  /**
   * Returns the viewport.
   */
  getViewport(): Gfx3Viewport {
    return this.viewport;
  }

  /**
   * Set the viewport.
   * 
   * @param {Gfx3Viewport} viewport - The viewport.
   */
  setViewport(viewport: Gfx3Viewport): void {
    this.viewport = viewport;
  }

  /**
   * Returns the projection mode.
   */
  getProjectionMode(): ProjectionMode {
    return this.projectionMode;
  }

  /**
   * Set the projection mode.
   * 
   * @param {ProjectionMode} projectionMode - The projection mode.
   */
  setProjectionMode(projectionMode: ProjectionMode): void {
    this.projectionMode = projectionMode;
  }

  /**
   * Returns the fovy angle (perspective eye-angle).
   */
  getPerspectiveFovy(): number {
    return this.perspectiveFovy;
  }

  /**
   * Set the fovy angle.
   * 
   * @param {number} perspectiveFovy - The fovy angle.
   */
  setPerspectiveFovy(perspectiveFovy: number): void {
    this.perspectiveFovy = perspectiveFovy;
  }

  /**
   * Returns the near limit.
   */
  getPerspectiveNear(): number {
    return this.perspectiveNear;
  }

  /**
   * Set the near limit.
   * 
   * @param {number} perspectiveNear - The distance to the near clipping plane of a perspective projection.
   */
  setPerspectiveNear(perspectiveNear: number): void {
    this.perspectiveNear = perspectiveNear;
  }

  /**
   * Returns the far limit.
   */
  getPerspectiveFar(): number {
    return this.perspectiveFar;
  }

  /**
   * Set the far limit.
   * 
   * @param {number} perspectiveFar - The maximum distance from the camera at which objects will be rendered.
   */
  setPerspectiveFar(perspectiveFar: number): void {
    this.perspectiveFar = perspectiveFar;
  }

  /**
   * Returns the orthographic size.
   */
  getOrthographicSize(): number {
    return this.orthographicSize;
  }

  /**
   * Set orthographic size.
   * 
   * @param {number} orthographicSize - Determines how much of the scene is visible within the camera's view frustum.
   */
  setOrthographicSize(orthographicSize: number): void {
    this.orthographicSize = orthographicSize;
  }

  /**
   * Returns the orthographic depth.
   */
  getOrthographicDepth(): number {
    return this.orthographicDepth;
  }

  /**
   * Set orthographic depth.
   * 
   * @param {number} orthographicDepth - The depth of the orthographic view.
   */
  setOrthographicDepth(orthographicDepth: number): void {
    this.orthographicDepth = orthographicDepth;
  }

  /**
   * Returns the background color.
   */
  getBgColor(): vec4 {
    return this.bgColor;
  }

  /**
   * Set the background color (from 0 to 1).
   * 
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
   * Returns the screen size.
   */
  getScreenSize(): vec2 {
    return this.screenSize;
  }

  /**
   * Set the screen width and height (internal use).
   * Warning: Don't change the screen size here please, use CoreManager instead.
   * It's method is automatically updated by Gfx3Manager::$handleWindowResize.
   * 
   * @param {number} width - The width of the screen size.
   * @param {number} height - The height of the screen size.
   */
  setScreenSize(width: number, height: number): void {
    this.screenSize[0] = width;
    this.screenSize[1] = height;
  }

  /**
   * Returns the size of the viewport in pixels.
   */
  getViewportSize(): vec2 {
    const w = this.screenSize[0] * this.viewport.widthFactor;
    const h = this.screenSize[1] * this.viewport.heightFactor;
    return [w, h];
  }

  /**
   * Returns the size of the viewport in client coordinates space.
   */
  getViewportClientSize(): vec2 {
    const cw = (this.screenSize[0] * this.viewport.widthFactor) / window.devicePixelRatio;
    const ch = (this.screenSize[1] * this.viewport.heightFactor) / window.devicePixelRatio;
    return [cw, ch];
  }

  /**
   * Returns a projection matrix.
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
   * Returns the clip matrix.
   */
  getClipMatrix(): mat4 {
    return UT.MAT4_INVERT(UT.MAT4_TRANSLATE(this.clipOffset[0], this.clipOffset[1], 0));
  }

  /**
   * Returns the camera view matrix (nothing else than an inverted camera matrix).
   */
  getCameraViewMatrix(): mat4 {
    return UT.MAT4_INVERT(this.cameraMatrix);
  }

  /**
   * Returns the result of multiplying the clip matrix and the projection matrix.
   */
  getProjectionClipMatrix(): mat4 {
    const matrix = UT.MAT4_IDENTITY();
    UT.MAT4_MULTIPLY(matrix, this.getClipMatrix(), matrix);
    UT.MAT4_MULTIPLY(matrix, this.getProjectionMatrix(), matrix);
    return matrix;
  }

  /**
   * Returns the result of multiplying the clip matrix, projection matrix, and camera view matrix together.
   */
  getViewProjectionClipMatrix(): mat4 {
    const matrix = UT.MAT4_IDENTITY();
    UT.MAT4_MULTIPLY(matrix, this.getClipMatrix(), matrix);
    UT.MAT4_MULTIPLY(matrix, this.getProjectionMatrix(), matrix);
    UT.MAT4_MULTIPLY(matrix, this.getCameraViewMatrix(), matrix);
    return matrix;
  }

  /**
   * Returns the client screen position of a 3D point given its world coordinates.
   * 
   * @param {number} x - The x world coordinate.
   * @param {number} y - The y world coordinate.
   * @param {number} z - The z world coordinate.
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
   * The normalized screen position of a 3D point given its world coordinates.
   * 
   * @param {number} x - The x world coordinate.
   * @param {number} y - The y world coordinate.
   * @param {number} z - The z world coordinate.
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