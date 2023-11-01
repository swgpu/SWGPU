import { UT } from '../core/utils';

/**
 * The `Gfx2Manager` class is a singleton responsible for managing 2D canvas for drawing and provides
 * functions for camera manipulation and coordinate conversions.
 */
class Gfx2Manager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cameraTransform: mat3;
  cameraScale: vec2;
  cameraRotation: number;
  cameraPosition: vec2;
  bgColor: vec4;

  /**
   * The constructor.
   */
  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('CANVAS_2D')!;
    this.ctx = this.canvas.getContext('2d')!;
    this.cameraTransform = UT.MAT3_IDENTITY();
    this.cameraScale = [1, 1];
    this.cameraRotation = 0;
    this.cameraPosition = [0, 0];
    this.bgColor = [0, 0, 0, 0];

    if (!this.ctx) {
      UT.FAIL('This browser does not support canvas');
      throw new Error('Gfx2Manager::Gfx2Manager: Your browser not support 2D');
    }
  }

  /**
   * The "update" function is called during the update phase.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    if (this.canvas.width != this.canvas.clientWidth || this.canvas.height != this.canvas.clientHeight) {
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
    }
  }

  /**
   * The "beginDrawing" function prepares the canvas for drawing by restoring the context, clearing the
   * canvas, setting the background color, and applying camera transformations.
   * Warning: You need to call this method before any draw calls.
   */
  beginDrawing(): void {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = `rgba(${this.bgColor[0]}, ${this.bgColor[1]}, ${this.bgColor[2]}, ${this.bgColor[3]})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.transform(this.cameraTransform[0], this.cameraTransform[1], this.cameraTransform[3], this.cameraTransform[4], this.cameraTransform[6], this.cameraTransform[7]);
    this.ctx.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
    this.ctx.scale(this.cameraScale[0], this.cameraScale[1]);
    this.ctx.rotate(this.cameraRotation);
    this.ctx.translate(-this.cameraPosition[0], -this.cameraPosition[1]);
  }

  /**
   * The "endDrawing" function restores the previous state of the canvas context.
   */
  endDrawing() {
    this.ctx.restore();
  }

  /**
   * The "moveCamera" function move the camera.
   * @param {number} x - The move in x-axis direction.
   * @param {number} y - The move in y-axis direction.
   */
  moveCamera(x: number, y: number): void {
    this.cameraPosition[0] += x;
    this.cameraPosition[1] += y;
  }

  /**
   * The "findCanvasPosFromClientPos" function calculates the canvas position from the client's viewport position
   * @param {number} clientX - The `clientX` parameter represents the horizontal coordinate (in pixels) of
   * the mouse pointer relative to the client area of the browser window.
   * @param {number} clientY - The `clientY` parameter represents the vertical coordinate (in pixels) of
   * the mouse pointer relative to the client area of the browser window.
   * @returns an array of two numbers, representing the x and y coordinates on the canvas.
   */
  findCanvasPosFromClientPos(clientX: number, clientY: number): vec2 {
    const rect = this.canvas.getBoundingClientRect();
    const x = clientX - rect.x;
    const y = clientY - rect.y;
    return [x, y];
  }

  /**
   * The "findWorldPosFromClientPos" function calculates the world position from the client's viewport position by
   * taking care of the canvas dimensions and camera position.
   * @param {number} clientX - The clientX parameter represents the x-coordinate of the mouse or touch
   * event relative to the client area of the browser window.
   * @param {number} clientY - The `clientY` parameter represents the vertical coordinate (in pixels) of
   * the mouse pointer relative to the client area of the browser window.
   * @returns an array of two numbers, representing the x and y coordinates on the canvas.
   */
  findWorldPosFromClientPos(clientX: number, clientY: number): vec2 {
    const rect = this.canvas.getBoundingClientRect();
    const x = (clientX - rect.x) + this.cameraPosition[0] - this.canvas.width * 0.5;
    const y = (clientY - rect.y) + this.cameraPosition[1] - this.canvas.height * 0.5;
    return [x, y];
  }

  /**
   * The "getClientWidth" function returns the client width of the canvas.
   * @returns The client width of the canvas element.
   */
  getClientWidth(): number {
    return this.canvas.clientWidth;
  }

  /**
   * The "getClientHeight" function returns the client height of the canvas.
   * @returns The client height of the canvas.
   */
  getClientHeight(): number {
    return this.canvas.clientHeight;
  }

  /**
   * The "getWidth" function returns the width of the canvas.
   * @returns The width of the canvas element.
   */
  getWidth(): number {
    return this.canvas.width;
  }

  /**
   * The "getHeight" function returns the height of the canvas.
   * @returns The height of the canvas.
   */
  getHeight(): number {
    return this.canvas.height;
  }

  /**
   * The "getContext" function returns the 2D rendering context of the canvas element.
   * @returns the CanvasRenderingContext2D object.
   */
  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

  /**
   * The "setCameraTransform" function add transformation matrix to the camera (before position/rotation/scale).
   * @param {mat3} cameraTransform - The `cameraTransform` parameter is a 3x3 matrix (mat3) that represents
   * the transformation applied to the camera.
   */
  setCameraTransform(cameraTransform: mat3): void {
    this.cameraTransform = cameraTransform;
  }

  /**
   * The "getCameraTransform" function returns the transformation matrix apply to the camera.
   * @returns a mat3, which is a 3x3 matrix representing a transform matrix.
   */
  getCameraTransform(): mat3 {
    return this.cameraTransform;
  }

  /**
   * The "setCameraPosition" function sets the camera position.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   */
  setCameraPosition(x: number, y: number): void {
    this.cameraPosition[0] = x;
    this.cameraPosition[1] = y;
  }

  /**
   * The "getCameraPosition" function returns the camera position.
   * @returns The camera position.
   */
  getCameraPosition(): vec2 {
    return this.cameraPosition;
  }

  /**
   * The "getCameraPositionX" function returns the X coordinate of the camera position.
   * @returns The X position of the camera.
   */
  getCameraPositionX(): number {
    return this.cameraPosition[0];
  }

  /**
   * The "getCameraPositionY" function returns the Y coordinate of the camera position.
   * @returns The Y position of the camera.
   */
  getCameraPositionY(): number {
    return this.cameraPosition[1];
  }

  /**
   * The "setCameraScale" function sets the camera scale.
   * @param {number} x - The `x` parameter represents the scale factor for the camera in the x-axis.
   * @param {number} y - The `y` parameter represents the scale factor for the camera in the y-axis.
   */
  setCameraScale(x: number, y: number): void {
    this.cameraScale[0] = x;
    this.cameraScale[1] = y;
  }

  /**
   * The "getCameraScale" function returns the camera scale.
   * @returns The camera scale.
   */
  getCameraScale(): vec2 {
    return this.cameraScale;
  }

  /**
   * The "getCameraScaleX" function returns the camera scale factor on x-axis.
   * @returns The x-axis camera scale factor.
   */
  getCameraScaleX(): number {
    return this.cameraScale[0];
  }

  /**
   * The "getCameraScaleY" function returns the camera scale factor on y-axis.
   * @returns The y-axis camera scale factor.
   */
  getCameraScaleY(): number {
    return this.cameraScale[1];
  }

  /**
   * The "setCameraRotation" function sets the rotation of the camera.
   * @param {number} cameraRotation - The `cameraRotation` parameter is the camera rotation angle in radians.
   */
  setCameraRotation(cameraRotation: number): void {
    this.cameraRotation = cameraRotation;
  }

  /**
   * The "getCameraRotation" function returns the camera rotation angle in radians.
   * @returns The camera rotation angle in radians.
   */
  getCameraRotation(): number {
    return this.cameraRotation;
  }

  /**
   * The "setBgColor" function sets the background color using the provided RGBA values (0 - 255).
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
   * The "getBgColor" function returns the background color.
   * @returns The background color.
   */
  getBgColor(): vec4 {
    return this.bgColor;
  }

  /**
   * The "getDefaultTexture" function returns a default HTMLImageElement.
   * @returns an HTMLImageElement.
   */
  getDefaultTexture(): HTMLImageElement {
    const image = new Image();
    image.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    return image;
  }
}

export { Gfx2Manager };
export const gfx2Manager = new Gfx2Manager();