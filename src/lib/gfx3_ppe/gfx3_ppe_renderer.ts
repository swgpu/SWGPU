import { gfx3Manager } from '../gfx3/gfx3_manager';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { PIPELINE_DESC, VERTEX_SHADER, FRAGMENT_SHADER, SHADER_VERTEX_ATTR_COUNT } from './gfx3_ppe_shader';

/**
 * Singleton ppe renderer.
 */
class Gfx3PPERenderer extends Gfx3RendererAbstract {
  device: GPUDevice;
  vertexBuffer: GPUBuffer;
  grp0: Gfx3StaticGroup;
  texture: Gfx3Texture;

  constructor(width: number, height: number) {
    super('PPE_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC);
    this.device = gfx3Manager.getDevice();
    this.vertexBuffer = this.device.createBuffer({ size: 6 * SHADER_VERTEX_ATTR_COUNT * 4, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC });

    this.grp0 = gfx3Manager.createStaticGroup('PPE_PIPELINE', 0);
    this.texture = this.grp0.setTexture(0, 'TEXTURE', gfx3Manager.createEmptyTexture(width, height, false, { magFilter: 'nearest', minFilter: 'nearest' }));
    this.grp0.allocate();

    this.device.queue.writeBuffer(this.vertexBuffer, 0, new Float32Array([
      -1.0, 1.0, 0.0, 0.0, // first tri -> top left
      1.0, 1.0, 1.0, 0.0, // first tri -> top right
      -1.0, -1.0, 0.0, 1.0, // first tri -> bottom left
      -1.0, -1.0, 0.0, 1.0, // second tri -> bottom left
      1.0, 1.0, 1.0, 0.0, // second tri -> top right
      1.0, -1.0, 1.0, 1.0 // second tri -> bottom right
    ]));
  }

  /**
   * The render function.
   */
  render(): void {

  }
}

export { Gfx3PPERenderer };
export const gfx3PPERenderer = new Gfx3PPERenderer();