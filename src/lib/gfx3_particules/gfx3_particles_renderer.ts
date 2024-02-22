import { gfx3Manager } from '../gfx3/gfx3_manager';
import { UT } from '../core/utils';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3StaticGroup, Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3Particles } from './gfx3_particles';
import { PIPELINE_DESC, VERTEX_SHADER, FRAGMENT_SHADER } from './gfx3_particles_shader';

/**
 * Singleton particules renderer.
 */
class Gfx3ParticlesRenderer extends Gfx3RendererAbstract {
  particlesList: Array<Gfx3Particles>;
  grp0: Gfx3StaticGroup;
  vMatrix: Float32Array;
  grp1: Gfx3DynamicGroup;
  mvpcMatrix: Float32Array;

  constructor() {
    super('PARTICLES_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC);
    this.particlesList = [];
    this.grp0 = gfx3Manager.createStaticGroup('PARTICLES_PIPELINE', 0);
    this.vMatrix = this.grp0.setFloat(0, 'V_MATRIX', 16);
    this.grp1 = gfx3Manager.createDynamicGroup('PARTICLES_PIPELINE', 1);
    this.mvpcMatrix = this.grp1.setFloat(0, 'MVPC_MATRIX', 16);    
 
    this.grp0.allocate();
    this.grp1.allocate();
  }

  /**
   * The render function.
   */
  render(): void {
    const currentView = gfx3Manager.getCurrentView();
    const passEncoder = gfx3Manager.getPassEncoder();
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
      passEncoder.setBindGroup(1, this.grp1.getBindGroup(i));

      const grp2 = particles.getGroup02();
      passEncoder.setBindGroup(2, grp2.getBindGroup());

      passEncoder.setVertexBuffer(0, gfx3Manager.getVertexBuffer(), particles.getVertexSubBufferOffset(), particles.getVertexSubBufferSize());
      passEncoder.draw(particles.getVertexCount());
    }

    this.grp1.endWrite();
    this.particlesList = [];
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