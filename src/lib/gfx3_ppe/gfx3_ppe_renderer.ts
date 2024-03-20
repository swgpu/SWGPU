import { coreManager } from '../core/core_manager';
import { eventManager } from '../core/event_manager';
import { gfx3Manager } from '../gfx3/gfx3_manager';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { PIPELINE_DESC, VERTEX_SHADER, FRAGMENT_SHADER, SHADER_VERTEX_ATTR_COUNT } from './gfx3_ppe_shader';

/**
 * Singleton post-processing effects renderer.
 */
class Gfx3PPERenderer extends Gfx3RendererAbstract {
  device: GPUDevice;
  vertexBuffer: GPUBuffer;
  grp0: Gfx3StaticGroup;
  params: Float32Array;
  sourceTexture: Gfx3Texture;

  constructor() {
    super('PPE_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC);
    this.device = gfx3Manager.getDevice();
    this.vertexBuffer = this.device.createBuffer({ size: 6 * SHADER_VERTEX_ATTR_COUNT * 4, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC });

    this.grp0 = gfx3Manager.createStaticGroup('PPE_PIPELINE', 0);
    this.params = this.grp0.setFloat(0, 'PARAMS', 10);
    this.params[0] = 1.0;
    this.params[1] = gfx3Manager.getWidth();
    this.params[2] = gfx3Manager.getHeight();
    this.params[3] = 300.0;
    this.params[4] = 300.0;
    this.params[5] = 16.0;
    this.params[6] = 0.0;
    this.params[7] = 1.0;
    this.params[8] = 1.0;
    this.params[9] = 1.0;
    this.sourceTexture = this.grp0.setTexture(1, 'SOURCE_TEXTURE', gfx3Manager.createRenderingTexture());
    this.grp0.allocate();

    this.device.queue.writeBuffer(this.vertexBuffer, 0, new Float32Array([
      -1.0, 1.0, 0.0, 0.0, // first tri -> top left
      1.0, 1.0, 1.0, 0.0, // first tri -> top right
      -1.0, -1.0, 0.0, 1.0, // first tri -> bottom left
      -1.0, -1.0, 0.0, 1.0, // second tri -> bottom left
      1.0, 1.0, 1.0, 0.0, // second tri -> top right
      1.0, -1.0, 1.0, 1.0 // second tri -> bottom right
    ]));

    eventManager.subscribe(coreManager, 'E_RESIZE', this, this.$handleWindowResize);
  }

  /**
   * The render function.
   */
  render(destinationTexture: GPUTexture): void {
    const commandEncoder = gfx3Manager.getCommandEncoder();
    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: destinationTexture.createView(),
        loadOp: 'clear',
        storeOp: 'store'
      }]
    });

    passEncoder.setPipeline(this.pipeline);
    this.grp0.beginWrite();
    this.grp0.write(0, this.params);
    this.grp0.endWrite();
    passEncoder.setBindGroup(0, this.grp0.getBindGroup());
    passEncoder.setVertexBuffer(0, this.vertexBuffer);
    passEncoder.draw(6);
    passEncoder.end();
  }

  /**
   * Enable post-process effects.
   * 
   * @param {boolean} enabled - Indicating whether ppe should be enabled or disable.
   */
  setEnabled(enabled: boolean): void {
    this.params[0] = enabled ? 1.0 : 0.0;
  }

  /**
   * Set the horizontal pixelation value.
   * Low value for stronger effect.
   * 
   * @param {number} widthPixelation - The x-pixelation value.
   */
  setWidthPixelation(widthPixelation: number): void {
    this.params[3] = widthPixelation;
  }

  /**
   * Set the vertical pixelation value.
   * Low value for stronger effect.
   * 
   * @param {number} heightPixelation - The y-pixelation value.
   */
  setHeightPixelation(heightPixelation: number): void {
    this.params[4] = heightPixelation;
  }
  
  /**
   * Set the color precision.
   * It determines how much color is limited.
   * 
   * @param {number} colorPrecision - The color precision.
   */
  setColorPrecision(colorPrecision: number): void {
    this.params[5] = colorPrecision;
  }

  /**
   * Set the dither pattern.
   * You have choise between 5 different patterns (from 0 to 4).
   * 
   * @param {number} ditherPattern - The pattern index.
   */
  setDitherPattern(ditherPattern: number): void {
    this.params[6] = ditherPattern;
  }

  /**
   * Set the dither threshold.
   * It determines a threshold value from what the dither is triggered.
   * 
   * @param {number} ditherThreshold - The threshold.
   */
  setDitherThreshold(ditherThreshold: number): void {
    this.params[7] = ditherThreshold;
  }

  /**
   * Set the dither x-scale.
   * High value for strong effect.
   * 
   * @param {number} ditherScaleX - The x-scale.
   */
  setDitherScaleX(ditherScaleX: number): void {
    this.params[8] = ditherScaleX;
  }

  /**
   * Set the dither y-scale.
   * High value for strong effect.
   * 
   * @param {number} ditherScaleY - The y-scale.
   */
  setDitherScaleY(ditherScaleY: number): void {
    this.params[9] = ditherScaleY;
  }

  getEnabled(): number {
    return this.params[0];
  }

  /**
   * Return the horizontal pixelation value.
   */
  getWidthPixelation(): number {
    return this.params[3];
  }

  /**
   * Return the vertical pixelation value.
   */
  getHeightPixelation(): number {
    return this.params[4];
  }
  
  /**
   * Return the color precision.
   */
  getColorPrecision(): number {
    return this.params[5];
  }

  /**
   * Get the dither pattern.
   */
  getDitherPattern(): number {
    return this.params[6];
  }

  /**
   * Get the dither threshold.
   */
  getDitherThreshold(): number {
    return this.params[7];
  }
  /**
   * Get the dither x-scale.
   */
  getDitherScaleX(): number {
    return this.params[8];
  }

  /**
   * Get the dither y-scale.
   */
  getDitherScaleY(): number {
    return this.params[9];
  }

  /**
   * Returns the source texture.
   * Note: This instance is responsible to create the source texture used to rendering the previous pass.
   * This way, it is easy to chain multiple effects.
   */
  getSourceTexture(): GPUTexture {
    return this.sourceTexture.gpuTexture;
  }

  $handleWindowResize(): void {
    this.params[1] = gfx3Manager.getWidth();
    this.params[2] = gfx3Manager.getHeight();
    this.sourceTexture.gpuTexture.destroy();
    this.sourceTexture = this.grp0.setTexture(0, 'SOURCE_TEXTURE', gfx3Manager.createRenderingTexture());
    this.grp0.allocate();
  }
}

export { Gfx3PPERenderer };
export const gfx3PPERenderer = new Gfx3PPERenderer();