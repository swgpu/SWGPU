import { Gfx2Drawable } from './gfx2_drawable';
declare enum Gfx2RenderingMode {
    ISOMETRIC = "ISOMETRIC",
    ORTHOGRAPHIC = "ORTHOGRAPHIC"
}
/**
 * Singleton 2D graphics manager.
 */
declare class Gfx2Manager {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    drawables: Array<Gfx2Drawable>;
    mode: Gfx2RenderingMode;
    cameraTransform: mat3;
    cameraScale: vec2;
    cameraRotation: number;
    cameraPosition: vec2;
    bgColor: vec4;
    constructor();
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * Begin the render phase. Prepares the canvas for rendering.
     * Warning: You need to call this method before any draw calls.
     */
    beginRender(): void;
    /**
     * The render method.
     */
    render(): void;
    /**
     * End the render phase.
     */
    endRender(): void;
    /**
     * Add drawable to the draw list.
     *
     * @param {Gfx2Drawable} drawable - The drawable.
     */
    draw(drawable: Gfx2Drawable): void;
    /**
     * Set the renderer sorting mode.
     *
     * @param {Gfx2RenderingMode} mode - The mode.
     */
    setMode(mode: Gfx2RenderingMode): void;
    /**
     * Move the camera.
     *
     * @param {number} x - The move in x-axis direction.
     * @param {number} y - The move in y-axis direction.
     */
    moveCamera(x: number, y: number): void;
    /**
     * Sets the css filter property of the canvas.
     *
     * @param {string} filter - The filter parameter is a string that represents the CSS filter property's value.
     * It can be used to apply various visual effects to an element, such as blur, brightness, contrast,
     * grayscale, etc.
     */
    setFilter(filter: string): void;
    /**
     * Checks if the canvas element has an active filter.
     */
    hasFilter(): boolean;
    /**
     * Returns canvas-space position from the the client-space position.
     *
     * @param {number} clientX - The horizontal client coordinate.
     * @param {number} clientY - The vertical client coordinate.
     */
    findCanvasPosFromClientPos(clientX: number, clientY: number): vec2;
    /**
     * Returns the world-space position from the client-space position.
     *
     * @param {number} clientX - The horizontal client coordinate.
     * @param {number} clientY - The vertical client coordinate.
     */
    findWorldPosFromClientPos(clientX: number, clientY: number): vec2;
    /**
     * Returns the resolution width of the canvas.
     */
    getWidth(): number;
    /**
     * Returns the resolution height of the canvas.
     */
    getHeight(): number;
    /**
     * Returns the 2D rendering context of the canvas element.
     */
    getContext(): CanvasRenderingContext2D;
    /**
     * Set the camera transformation matrix (before position/rotation/scale).
     *
     * @param {mat3} cameraTransform - The transformation matrix.
     */
    setCameraTransform(cameraTransform: mat3): void;
    /**
     * Returns the camera transformation matrix.
     */
    getCameraTransform(): mat3;
    /**
     * Sets the camera position.
     *
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     */
    setCameraPosition(x: number, y: number): void;
    /**
     * Returns the camera position.
     */
    getCameraPosition(): vec2;
    /**
     * Returns the X coordinate of the camera position.
     */
    getCameraPositionX(): number;
    /**
     * Returns the Y coordinate of the camera position.
     */
    getCameraPositionY(): number;
    /**
     * Sets the camera scale.
     *
     * @param {number} x - The scale factor for the camera in the x-axis.
     * @param {number} y - The scale factor for the camera in the y-axis.
     */
    setCameraScale(x: number, y: number): void;
    /**
     * Returns the camera scale.
     */
    getCameraScale(): vec2;
    /**
     * Returns the camera scale factor on x-axis.
     */
    getCameraScaleX(): number;
    /**
     * Returns the camera scale factor on y-axis.
     */
    getCameraScaleY(): number;
    /**
     * Sets the rotation of the camera.
     *
     * @param {number} cameraRotation - The camera rotation angle in radians.
     */
    setCameraRotation(cameraRotation: number): void;
    /**
     * Returns the camera rotation angle in radians.
     */
    getCameraRotation(): number;
    /**
     * Sets the background color using the provided RGBA values (0 - 255).
     *
     * @param {number} r - The red component.
     * @param {number} g - The green component.
     * @param {number} b - The blue component.
     * @param {number} a - The alpha value.
     */
    setBgColor(r: number, g: number, b: number, a: number): void;
    /**
     * Returns the background color.
     */
    getBgColor(): vec4;
    /**
     * Returns a default HTMLImageElement.
     */
    getDefaultTexture(): HTMLImageElement;
}
export type { Gfx2RenderingMode };
export { Gfx2Manager };
export declare const gfx2Manager: Gfx2Manager;
