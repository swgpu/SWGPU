import { gfx3Manager } from '../gfx3/gfx3_manager';
import { UT } from '../core/utils';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup, Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3RenderingTexture } from '../gfx3/gfx3_texture';
import { Gfx3Particles } from './gfx3_particles';
import { PIPELINE_DESC, VERTEX_SHADER, FRAGMENT_SHADER, SHADER_INSERTS } from './gfx3_particles_shader';

/**
 * Singleton particules renderer.
 */
class Gfx3ParticlesRenderer extends Gfx3RendererAbstract {
  particlesList: Array<Gfx3Particles>;
  grp0: Gfx3StaticGroup;
  vMatrix: Float32Array;
  grp1: Gfx3DynamicGroup;
  mvpcMatrix: Float32Array;
  id: Float32Array;

  constructor() {
    super('PARTICLES_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC, SHADER_INSERTS);
    this.particlesList = [];

    this.grp0 = gfx3Manager.createStaticGroup('PARTICLES_PIPELINE', 0);
    this.vMatrix = this.grp0.setFloat(0, 'V_MATRIX', 16);

    this.grp1 = gfx3Manager.createDynamicGroup('PARTICLES_PIPELINE', 1);
    this.mvpcMatrix = this.grp1.setFloat(0, 'MVPC_MATRIX', 16);    
    this.id = this.grp1.setFloat(1, 'ID', 4);
 
    this.grp0.allocate();
    this.grp1.allocate();
  }

  /**
   * The render function.
   */
  render(destinationTexture: Gfx3RenderingTexture | null = null): void {
    const currentView = gfx3Manager.getCurrentView();
    const commandEncoder = gfx3Manager.getCommandEncoder();
    const passEncoder = destinationTexture ? commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: destinationTexture.gpuTextureView,
        loadOp: 'clear',
        storeOp: 'store'
      }]
    }) : gfx3Manager.getPassEncoder();

    const vpcMatrix = currentView.getViewProjectionClipMatrix();
    passEncoder.setPipeline(this.pipeline);

    this.grp0.beginWrite();
    this.grp0.write(0, UT.MAT4_COPY(currentView.getCameraViewMatrix(), this.vMatrix) as Float32Array);
    this.grp0.endWrite();
    passEncoder.setBindGroup(0, this.grp0.getBindGroup());

    if (this.grp1.getSize() < this.particlesList.length) {
      this.grp1.allocate(this.particlesList.length);
    }

    this.grp1.beginWrite();

    for (let i = 0; i < this.particlesList.length; i++) {
      const particles = this.particlesList[i];
      this.grp1.write(0, UT.MAT4_MULTIPLY(vpcMatrix, particles.getTransformMatrix(), this.mvpcMatrix) as Float32Array);
      this.grp1.write(1, UT.VEC4_COPY(particles.getId(), this.id) as Float32Array);
      passEncoder.setBindGroup(1, this.grp1.getBindGroup(i));

      const grp2 = particles.getGroup02();
      passEncoder.setBindGroup(2, grp2.getBindGroup());

      passEncoder.setVertexBuffer(0, gfx3Manager.getVertexBuffer(), particles.getVertexSubBufferOffset(), particles.getVertexSubBufferSize());
      passEncoder.draw(particles.getVertexCount());
    }

    this.grp1.endWrite();
    this.particlesList = [];

    if (destinationTexture) {
      passEncoder.end();
    }
  }

  /**
   * Set insertion of code in the shader.
   * This method will reload the pipeline.
   * 
   * @param {Partial<typeof SHADER_INSERTS>} data - The custom data used by the shader template.
   */
  setShaderInserts(data: Partial<typeof SHADER_INSERTS> = {}): void {
    super.reload(VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC, Object.assign(SHADER_INSERTS, data));
    this.grp0.setPipeline(this.pipeline);
    this.grp1.setPipeline(this.pipeline);
    this.grp0.allocate();
    this.grp1.allocate();
  }

  /**
   * Draw a particles.
   * 
   * @param {Gfx3Particles} particles - The particles.
   */
  drawParticles(particles: Gfx3Particles): void {
    this.particlesList.push(particles);
  }
}

export { Gfx3ParticlesRenderer };
export const gfx3ParticlesRenderer = new Gfx3ParticlesRenderer();