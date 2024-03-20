import { UT } from '../core/utils';

/**
 * Singleton 2D graphics manager.
 */
class Gfx2Manager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cameraTransform: mat3;
  cameraScale: vec2;
  cameraRotation: number;
  cameraPosition: vec2;
  bgColor: vec4;

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
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    if (this.canvas.width != this.canvas.clientWidth || this.canvas.height != this.canvas.clientHeight) {
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
    }
  }

  /**
   * Begin the draw phase. Prepares the canvas for drawing.
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
   * End the draw phase.
   */
  endDrawing() {
    this.ctx.restore();
  }

  /**
   * Move the camera.
   * 
   * @param {number} x - The move in x-axis direction.
   * @param {number} y - The move in y-axis direction.
   */
  moveCamera(x: number, y: number): void {
    this.cameraPosition[0] += x;
    this.cameraPosition[1] += y;
  }

  /**
   * Sets the css filter property of the canvas.
   * 
   * @param {string} filter - The filter parameter is a string that represents the CSS filter property's value.
   * It can be used to apply various visual effects to an element, such as blur, brightness, contrast,
   * grayscale, etc.
   */
  setFilter(filter: string): void {
    this.canvas.style.filter = filter;
  }

  /**
   * Checks if the canvas element has an active filter.
   */
  hasFilter(): boolean {
    return this.canvas.style.filter != '' && this.canvas.style.filter != 'none';
  }

  /**
   * Returns canvas-space position from the the client-space position.
   * 
   * @param {number} clientX - The horizontal client coordinate.
   * @param {number} clientY - The vertical client coordinate.
   */
  findCanvasPosFromClientPos(clientX: number, clientY: number): vec2 {
    const rect = this.canvas.getBoundingClientRect();
    const x = clientX - rect.x;
    const y = clientY - rect.y;
    return [x, y];
  }

  /**
   * Returns the world-space position from the client-space position.
   * 
   * @param {number} clientX - The horizontal client coordinate.
   * @param {number} clientY - The vertical client coordinate.
   */
  findWorldPosFromClientPos(clientX: number, clientY: number): vec2 {
    const rect = this.canvas.getBoundingClientRect();
    const x = (clientX - rect.x) + this.cameraPosition[0] - this.canvas.width * 0.5;
    const y = (clientY - rect.y) + this.cameraPosition[1] - this.canvas.height * 0.5;
    return [x, y];
  }

  /**
   * Returns the resolution width of the canvas.
   */
  getWidth(): number {
    return this.canvas.clientWidth;
  }

  /**
   * Returns the resolution height of the canvas.
   */
  getHeight(): number {
    return this.canvas.clientHeight;
  }

  /**
   * Returns the 2D rendering context of the canvas element.
   */
  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

  /**
   * Set the camera transformation matrix (before position/rotation/scale).
   * 
   * @param {mat3} cameraTransform - The transformation matrix.
   */
  setCameraTransform(cameraTransform: mat3): void {
    this.cameraTransform = cameraTransform;
  }

  /**
   * Returns the camera transformation matrix.
   */
  getCameraTransform(): mat3 {
    return this.cameraTransform;
  }

  /**
   * Sets the camera position.
   * 
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   */
  setCameraPosition(x: number, y: number): void {
    this.cameraPosition[0] = x;
    this.cameraPosition[1] = y;
  }

  /**
   * Returns the camera position.
   */
  getCameraPosition(): vec2 {
    return this.cameraPosition;
  }

  /**
   * Returns the X coordinate of the camera position.
   */
  getCameraPositionX(): number {
    return this.cameraPosition[0];
  }

  /**
   * Returns the Y coordinate of the camera position.
   */
  getCameraPositionY(): number {
    return this.cameraPosition[1];
  }

  /**
   * Sets the camera scale.
   * 
   * @param {number} x - The scale factor for the camera in the x-axis.
   * @param {number} y - The scale factor for the camera in the y-axis.
   */
  setCameraScale(x: number, y: number): void {
    this.cameraScale[0] = x;
    this.cameraScale[1] = y;
  }

  /**
   * Returns the camera scale.
   */
  getCameraScale(): vec2 {
    return this.cameraScale;
  }

  /**
   * Returns the camera scale factor on x-axis.
   */
  getCameraScaleX(): number {
    return this.cameraScale[0];
  }

  /**
   * Returns the camera scale factor on y-axis.
   */
  getCameraScaleY(): number {
    return this.cameraScale[1];
  }

  /**
   * Sets the rotation of the camera.
   * 
   * @param {number} cameraRotation - The camera rotation angle in radians.
   */
  setCameraRotation(cameraRotation: number): void {
    this.cameraRotation = cameraRotation;
  }

  /**
   * Returns the camera rotation angle in radians.
   */
  getCameraRotation(): number {
    return this.cameraRotation;
  }

  /**
   * Sets the background color using the provided RGBA values (0 - 255).
   * 
   * @param {number} r - The red component.
   * @param {number} g - The green component.
   * @param {number} b - The blue component.
   * @param {number} a - The alpha value.
   */
  setBgColor(r: number, g: number, b: number, a: number): void {
    this.bgColor[0] = r;
    this.bgColor[1] = g;
    this.bgColor[2] = b;
    this.bgColor[3] = a;
  }

  /**
   * Returns the background color.
   */
  getBgColor(): vec4 {
    return this.bgColor;
  }

  /**
   * Returns a default HTMLImageElement.
   */
  getDefaultTexture(): HTMLImageElement {
    const image = new Image();
    image.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    return image;
  }
}

export { Gfx2Manager };
export const gfx2Manager = new Gfx2Manager();