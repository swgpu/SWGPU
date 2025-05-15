declare enum ProjectionMode {
    PERSPECTIVE = "PERSPECTIVE",
    ORTHOGRAPHIC = "ORTHOGRAPHIC"
}
interface Gfx3Viewport {
    xFactor: number;
    yFactor: number;
    widthFactor: number;
    heightFactor: number;
}
/**
 * A 3D view. Used to manipulate camera, viewport, projection mode, background color and more.
 */
declare class Gfx3View {
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
    constructor();
    /**
     * Returns the position of the camera.
     */
    getCameraPosition(): vec3;
    /**
     * Returns the clip offset.
     */
    getClipOffset(): vec2;
    /**
     * Returns the x-coordinate of the clip offset.
     */
    getClipOffsetX(): number;
    /**
     * Returns the y-coordinate of the clip offset.
     */
    getClipOffsetY(): number;
    /**
     * Set the clip offset with the given x and y coordinates.
     *
     * @param {number} x - The X coordinate of the clip offset.
     * @param {number} y - The Y coordinate of the clip offset.
     */
    setClipOffset(x: number, y: number): void;
    /**
     * Returns the camera matrix.
     */
    getCameraMatrix(): mat4;
    /**
     * Set the camera matrix.
     *
     * @param {mat4} cameraMatrix - The camera transformation matrix.
     */
    setCameraMatrix(cameraMatrix: mat4): void;
    /**
     * Returns the viewport.
     */
    getViewport(): Gfx3Viewport;
    /**
     * Set the viewport.
     *
     * @param {Gfx3Viewport} viewport - The viewport.
     */
    setViewport(viewport: Gfx3Viewport): void;
    /**
     * Returns the projection mode.
     */
    getProjectionMode(): ProjectionMode;
    /**
     * Set the projection mode.
     *
     * @param {ProjectionMode} projectionMode - The projection mode.
     */
    setProjectionMode(projectionMode: ProjectionMode): void;
    /**
     * Returns the fovy angle (perspective eye-angle).
     */
    getPerspectiveFovy(): number;
    /**
     * Set the fovy angle.
     *
     * @param {number} perspectiveFovy - The fovy angle.
     */
    setPerspectiveFovy(perspectiveFovy: number): void;
    /**
     * Returns the near limit.
     */
    getPerspectiveNear(): number;
    /**
     * Set the near limit.
     *
     * @param {number} perspectiveNear - The distance to the near clipping plane of a perspective projection.
     */
    setPerspectiveNear(perspectiveNear: number): void;
    /**
     * Returns the far limit.
     */
    getPerspectiveFar(): number;
    /**
     * Set the far limit.
     *
     * @param {number} perspectiveFar - The maximum distance from the camera at which objects will be rendered.
     */
    setPerspectiveFar(perspectiveFar: number): void;
    /**
     * Returns the orthographic size.
     */
    getOrthographicSize(): number;
    /**
     * Set orthographic size.
     *
     * @param {number} orthographicSize - Determines how much of the scene is visible within the camera's view frustum.
     */
    setOrthographicSize(orthographicSize: number): void;
    /**
     * Returns the orthographic depth.
     */
    getOrthographicDepth(): number;
    /**
     * Set orthographic depth.
     *
     * @param {number} orthographicDepth - The depth of the orthographic view.
     */
    setOrthographicDepth(orthographicDepth: number): void;
    /**
     * Returns the background color.
     */
    getBgColor(): vec4;
    /**
     * Set the background color (from 0 to 1).
     *
     * @param {number} r - The parameter "r" represents the red component.
     * @param {number} g - The parameter "g" represents the green component.
     * @param {number} b - The parameter "b" represents the blue component.
     * @param {number} a - The parameter "a" represents the alpha value.
     */
    setBgColor(r: number, g: number, b: number, a: number): void;
    /**
     * Returns the screen size.
     */
    getScreenSize(): vec2;
    /**
     * Set the screen width and height (internal use).
     * Warning: Don't change the screen size here please, use CoreManager instead.
     * It's method is automatically updated by Gfx3Manager::$handleWindowResize.
     *
     * @param {number} width - The width of the screen size.
     * @param {number} height - The height of the screen size.
     */
    setScreenSize(width: number, height: number): void;
    /**
     * Returns the size of the viewport in pixels.
     */
    getViewportSize(): vec2;
    /**
     * Returns the size of the viewport in client coordinates space.
     */
    getViewportClientSize(): vec2;
    /**
     * Returns a projection matrix.
     */
    getProjectionMatrix(): mat4;
    /**
     * Returns the clip matrix.
     */
    getClipMatrix(): mat4;
    /**
     * Returns the camera view matrix (nothing else than an inverted camera matrix).
     */
    getCameraViewMatrix(): mat4;
    /**
     * Returns the result of multiplying the clip matrix and the projection matrix.
     */
    getProjectionClipMatrix(): mat4;
    /**
     * Returns the result of multiplying the clip matrix, projection matrix, and camera view matrix together.
     */
    getViewProjectionClipMatrix(): mat4;
    /**
     * Returns the result of multiplying the clip matrix, projection matrix, and camera view matrix translation only.
     */
    getBillboardProjectionClipMatrix(): mat4;
    /**
     * Returns the screen position of a 3D point given its world coordinates.
     *
     * @param {number} x - The x world coordinate.
     * @param {number} y - The y world coordinate.
     * @param {number} z - The z world coordinate.
     */
    getScreenPosition(x: number, y: number, z: number): vec2;
    /**
     * Returns the client screen position of a 3D point given its world coordinates.
     *
     * @param {number} x - The x world coordinate.
     * @param {number} y - The y world coordinate.
     * @param {number} z - The z world coordinate.
     */
    getClientScreenPosition(x: number, y: number, z: number): vec2;
    /**
     * The normalized screen position of a 3D point given its world coordinates.
     *
     * @param {number} x - The x world coordinate.
     * @param {number} y - The y world coordinate.
     * @param {number} z - The z world coordinate.
     */
    getScreenNormalizedPosition(x: number, y: number, z: number): vec2;
    /**
     * The normalized screen position of a 3D point given its world coordinates.
     *
     * @param {number} x - The x world coordinate.
     * @param {number} y - The y world coordinate.
     * @param {number} z - The z world coordinate.
     */
    getScreenNormalizedPositionZeroToOne(x: number, y: number, z: number): vec2;
}
export type { Gfx3Viewport };
export { ProjectionMode, Gfx3View };
