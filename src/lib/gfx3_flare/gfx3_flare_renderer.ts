import { gfx3Manager } from '../gfx3/gfx3_manager';
import { UT } from '../core/utils';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup, Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3Flare } from './gfx3_flare';
import { PIPELINE_DESC, VERTEX_SHADER, FRAGMENT_SHADER } from './gfx3_flare_shader';

/**
 * Singleton flare renderer.
 * It is ideal for lens-flare effect, rain, snow or every effect on the screen focal.
 * Note: The top-left corner is at coordinates 0, 0 on the screen.
 */
class Gfx3FlareRenderer extends Gfx3RendererAbstract {
  flares: Array<Gfx3Flare>;
  grp0: Gfx3StaticGroup;
  resolution: Float32Array;
  grp1: Gfx3DynamicGroup;
  translation: Float32Array;
  scale: Float32Array;
  angle: Float32Array;
  size: Float32Array;
  offset: Float32Array;
  color: Float32Array;

  constructor() {
    super('FLARE_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC);
    this.flares = [];
    this.grp0 = gfx3Manager.createStaticGroup('FLARE_PIPELINE', 0);
    this.resolution = this.grp0.setFloat(0, 'RESOLUTION', 2);
    this.grp1 = gfx3Manager.createDynamicGroup('FLARE_PIPELINE', 1);
    this.translation = this.grp1.setFloat(0, 'TRANSLATION', 2);
    this.scale = this.grp1.setFloat(1, 'SCALE', 2);
    this.angle = this.grp1.setFloat(2, 'ANGLE', 1);
    this.size = this.grp1.setFloat(3, 'SIZE', 2);
    this.offset = this.grp1.setFloat(4, 'OFFSET', 2);
    this.color = this.grp1.setFloat(5, 'COLOR', 4);

    this.grp0.allocate();
    this.grp1.allocate();
  }

  /**
   * The render function.
   */
  render(): void {
    const currentView = gfx3Manager.getCurrentView();
    const passEncoder = gfx3Manager.getPassEncoder();
    passEncoder.setPipeline(this.pipeline);

    this.grp0.beginWrite();
    this.grp0.write(0, UT.VEC2_COPY(currentView.getViewportSize(), this.resolution) as Float32Array);
    this.grp0.endWrite();
    passEncoder.setBindGroup(0, this.grp0.getBindGroup());

    if (this.grp1.getSize() < this.flares.length) {
      this.grp1.allocate(this.flares.length);
    }

    this.grp1.beginWrite();

    for (let i = 0; i < this.flares.length; i++) {
      const flare = this.flares[i];
      this.grp1.write(0, UT.VEC2_COPY(flare.getPosition2D(), this.translation) as Float32Array);
      this.grp1.write(1, UT.VEC2_COPY(flare.getScale2D(), this.scale) as Float32Array);
      this.grp1.write(2, UT.VEC1_COPY(flare.getRotation2D(), this.angle) as Float32Array);
      this.grp1.write(3, UT.VEC2_COPY(flare.getSize2D(), this.size) as Float32Array);
      this.grp1.write(4, UT.VEC2_COPY(flare.getOffset2D(), this.offset) as Float32Array);
      this.grp1.write(5, UT.VEC4_COPY(flare.getColor(), this.color) as Float32Array);
      passEncoder.setBindGroup(1, this.grp1.getBindGroup(i));

      const grp2 = flare.getGroup02();
      passEncoder.setBindGroup(2, grp2.getBindGroup());

      passEncoder.setVertexBuffer(0, gfx3Manager.getVertexBuffer(), flare.getVertexSubBufferOffset(), flare.getVertexSubBufferSize());
      passEncoder.draw(flare.getVertexCount());
    }

    this.grp1.endWrite();
    this.flares = [];
  }

  /**
   * Draw a flare object.
   * 
   * @param {Gfx3Flare} flare - The flare object.
   */
  drawFlare(flare: Gfx3Flare): void {
    this.flares.push(flare);
  }
}

export { Gfx3FlareRenderer };
export const gfx3FlareRenderer = new Gfx3FlareRenderer();