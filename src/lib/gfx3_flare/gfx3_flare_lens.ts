import { gfx3Manager } from '../gfx3/gfx3_manager';
import { gfx3TextureManager } from '../gfx3/gfx3_texture_manager';
import { UT } from '../core/utils';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { Gfx3Flare } from './gfx3_flare';

/**
 * A lens flare handler.
 */
class Gfx3FlareLens {
  spacing: number;
  flares: Array<Gfx3Flare>;
  items: Array<{texture: Gfx3Texture, scale: number}>;
  sunWorldPos: vec3;
  scaleStepFactor: number;
  maxDistanceBrightness: number;

  constructor() {
    this.spacing = 0.4;
    this.flares = [];
    this.items = [];
    this.sunWorldPos = [0, 0, 0];
    this.scaleStepFactor = 0.1;
    this.maxDistanceBrightness = 600;
  }

  /**
   * Free all resources.
   * 
   * @param {number} spacing - The space between flares
   */
  async startup(spacing: number): Promise<void> {
    const texture2 = await gfx3TextureManager.loadTexture('./textures/lens_flares/tex2.png');
    const texture3 = await gfx3TextureManager.loadTexture('./textures/lens_flares/tex3.png');
    const texture4 = await gfx3TextureManager.loadTexture('./textures/lens_flares/tex4.png');
    const texture5 = await gfx3TextureManager.loadTexture('./textures/lens_flares/tex5.png');
    const texture6 = await gfx3TextureManager.loadTexture('./textures/lens_flares/tex6.png');
    const texture7 = await gfx3TextureManager.loadTexture('./textures/lens_flares/tex7.png');
    const texture8 = await gfx3TextureManager.loadTexture('./textures/lens_flares/tex8.png');

    this.items = [
      { texture: texture6, scale: 0.5 },  { texture: texture4, scale: 0.2 },  { texture: texture2, scale: 0.1 },
      { texture: texture7, scale: 0.05 }, { texture: texture3, scale: 0.06 }, { texture: texture5, scale: 0.07 },
      { texture: texture7, scale: 0.2 },  { texture: texture3, scale: 0.07 }, { texture: texture5, scale: 0.3 },
      { texture: texture4, scale: 0.4 },  { texture: texture8, scale: 0.6 }
    ];

    this.spacing = spacing;
    this.flares = [];

    for (const item of this.items) {
      const flare = new Gfx3Flare();
      flare.setTexture(item.texture);
      flare.setOffset2DNormalized(0.5, 0.5);
      flare.setScale2D(item.scale, item.scale);
      this.flares.push(flare);
    }
  }

  /**
   * The draw function.
   */
  draw(): void {
    const currentView = gfx3Manager.getCurrentView();
    const viewportSize = currentView.getViewportSize();

    const sunPos = currentView.getScreenPosition(this.sunWorldPos[0], this.sunWorldPos[1], this.sunWorldPos[2]);
    const centerX = viewportSize[0] / 2;
    const centerY = viewportSize[1] / 2;

    const sunToCenter = UT.VEC2_SUBSTRACT([centerX, centerY], sunPos);
    const brightness = 1 - UT.VEC2_LENGTH(sunToCenter) / this.maxDistanceBrightness;
    if (brightness <= 0) {
      return;
    }

    for (let i = 0; i < this.flares.length; i++) {
      const direction = UT.VEC2_COPY(sunToCenter);
      const directionScaled = UT.VEC2_SCALE(direction, i * this.spacing);
      const flarePos = UT.VEC2_ADD(sunPos, directionScaled);
      const scale = this.items[i].scale + (i * this.scaleStepFactor);
      this.flares[i].setScale2D(scale, scale);
      this.flares[i].setPosition2D(flarePos[0], flarePos[1]);
      this.flares[i].setColor(1, 1, 1, brightness);
      this.flares[i].draw();
    }
  }

  /**
   * Set the sun position.
   * 
   * @param {number} x - The x position.
   * @param {number} y - The y position.
   * @param {number} z - The z position.
   */
  setSunWorldPosition(x: number, y: number, z: number): void {
    this.sunWorldPos = [x, y, z];
  }

  /**
   * Set the scale step factor.
   * 
   * @param {number} scaleStepFactor - The scale value.
   */
  setScaleStepFactor(scaleStepFactor: number): void {
    this.scaleStepFactor = scaleStepFactor;
  }

  /**
   * Set the maximum distance for brightness.
   * 
   * @param {number} maxDistanceBrightness - The distance max.
   */
  setMaxDistanceBrightness(maxDistanceBrightness: number): void {
    this.maxDistanceBrightness = maxDistanceBrightness;
  }
}

export { Gfx3FlareLens };