import { gfx3Manager } from '../gfx3/gfx3_manager';
import { UT } from '../core/utils';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3Sprite } from './gfx3_sprite';
import { PIPELINE_DESC, VERTEX_SHADER, FRAGMENT_SHADER } from './gfx3_sprite_shader';

/**
 * Singleton sprite renderer.
 */
class Gfx3SpriteRenderer extends Gfx3RendererAbstract {
  sprites: Array<Gfx3Sprite>;
  grp0: Gfx3DynamicGroup;
  mvpcMatrix: Float32Array;

  constructor() {
    super('SPRITE_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC);
    this.sprites = [];
    this.grp0 = gfx3Manager.createDynamicGroup('SPRITE_PIPELINE', 0);
    this.mvpcMatrix = this.grp0.setFloat(0, 'MVPC_MATRIX', 16);    
    this.grp0.allocate();
  }

  /**
   * The render function.
   */
  render(): void {
    const currentView = gfx3Manager.getCurrentView();
    const passEncoder = gfx3Manager.getPassEncoder();
    passEncoder.setPipeline(this.pipeline);

    if (this.grp0.getSize() < this.sprites.length) {
      this.grp0.allocate(this.sprites.length);
    }

    this.grp0.beginWrite();

    for (let i = 0; i < this.sprites.length; i++) {
      const sprite = this.sprites[i];
      if (sprite.getBillboardMode()) {
        const cameraMatrix = currentView.getCameraMatrix();
        const viewMatrix = currentView.getCameraViewMatrix();
        const pcMatrix = currentView.getProjectionClipMatrix();
        const mvMatrix = UT.MAT4_MULTIPLY(viewMatrix, sprite.getTransformMatrix());
        UT.MAT4_MULTIPLY(mvMatrix, cameraMatrix, mvMatrix);
        UT.MAT4_MULTIPLY(mvMatrix, UT.MAT4_TRANSLATE(viewMatrix[12], viewMatrix[13], viewMatrix[14]), mvMatrix);
        UT.MAT4_MULTIPLY(pcMatrix, mvMatrix, this.mvpcMatrix);
      }
      else {
        const vpcMatrix = currentView.getViewProjectionClipMatrix();
        UT.MAT4_MULTIPLY(vpcMatrix, sprite.getTransformMatrix(), this.mvpcMatrix);
      }

      this.grp0.write(0, this.mvpcMatrix);
      passEncoder.setBindGroup(0, this.grp0.getBindGroup(i));

      const grp1 = sprite.getGroup01();
      passEncoder.setBindGroup(1, grp1.getBindGroup());

      passEncoder.setVertexBuffer(0, gfx3Manager.getVertexBuffer(), sprite.getVertexSubBufferOffset(), sprite.getVertexSubBufferSize());
      passEncoder.draw(sprite.getVertexCount());
    }

    this.grp0.endWrite();
    this.sprites = [];
  }

  /**
   * Draw a sprite.
   * 
   * @param {Gfx3Sprite} sprite - The sprite.
   */
  drawSprite(sprite: Gfx3Sprite): void {
    this.sprites.push(sprite);
  }
}

export { Gfx3SpriteRenderer };
export const gfx3SpriteRenderer = new Gfx3SpriteRenderer();