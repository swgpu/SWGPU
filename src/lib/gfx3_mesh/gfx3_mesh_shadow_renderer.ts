import { gfx3Manager } from '../gfx3/gfx3_manager';
import { UT } from '../core/utils';
import { Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { Gfx3Mesh } from './gfx3_mesh';
import { MESH_SHADOW_PIPELINE_DESC, MESH_SHADOW_VERTEX_SHADER } from './gfx3_mesh_shadow_shader';

interface MeshCommand {
  mesh: Gfx3Mesh;
  matrix: mat4 | null;
};

/*
 * Singleton shadow renderer.
 */
class Gfx3MeshShadowRenderer {
  pipeline: GPURenderPipeline;
  depthTextureSize: number;
  depthTexture: GPUTexture
  depthTextureSampler: GPUSampler;
  depthTextureView: GPUTextureView;
  meshCommands: Array<MeshCommand>;
  grp0: Gfx3DynamicGroup;
  lvpMatrix: Float32Array;
  mMatrix: Float32Array;

  constructor() {
    this.pipeline = gfx3Manager.loadPipeline('MESH_SHADOW_PIPELINE', MESH_SHADOW_VERTEX_SHADER, '', MESH_SHADOW_PIPELINE_DESC);

    this.depthTextureSize = 1024.0;
    this.depthTexture = gfx3Manager.getDevice().createTexture({
      size: [this.depthTextureSize, this.depthTextureSize, 1],
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
      format: 'depth32float'
    });

    this.depthTextureView = this.depthTexture.createView();
    this.depthTextureSampler = gfx3Manager.getDevice().createSampler({ compare: 'less'});
    this.meshCommands = [];

    this.grp0 = gfx3Manager.createDynamicGroup('MESH_SHADOW_PIPELINE', 0);
    this.lvpMatrix = this.grp0.setFloat(0, 'LVP_MATRIX', 16);
    this.mMatrix = this.grp0.setFloat(1, 'M_MATRIX', 16);
  }

  /**
   * The render function.
   */
  render(): void {
    const commandEncoder = gfx3Manager.getCommandEncoder();
    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [],
      depthStencilAttachment: {
        view: this.depthTextureView,
        depthClearValue: 1.0,
        depthLoadOp: 'clear',
        depthStoreOp: 'store',
      },
    });

    passEncoder.setPipeline(this.pipeline);

    if (this.grp0.getSize() < this.meshCommands.length) {
      this.grp0.allocate(this.meshCommands.length);
    }

    this.grp0.beginWrite();

    for (let i = 0; i < this.meshCommands.length; i++) {
      const command = this.meshCommands[i];
      const mMatrix = command.matrix ? command.matrix : command.mesh.getTransformMatrix();
      this.grp0.write(0, this.lvpMatrix);
      this.grp0.write(1, UT.MAT4_COPY(mMatrix, this.mMatrix) as Uint32Array);
      passEncoder.setBindGroup(0, this.grp0.getBindGroup(i));
      passEncoder.setVertexBuffer(0, gfx3Manager.getVertexBuffer(), command.mesh.getVertexSubBufferOffset(), command.mesh.getVertexSubBufferSize());
      passEncoder.draw(command.mesh.getVertexCount());
    }

    this.grp0.endWrite();
    this.meshCommands = [];

    passEncoder.end();
  }

  /**
   * Draw a mesh.
   * 
   * @param {Gfx3Mesh} mesh - The mesh.
   * @param {mat4 | null} [matrix=null] - The transformation matrix.
   */
  drawMesh(mesh: Gfx3Mesh, matrix: mat4 | null = null): void {
    this.meshCommands.push({ mesh: mesh, matrix: matrix });
  }

  /**
   * Set a shadow projection.
   * 
   * @param {vec3} position - The position of shadow coming from.
   * @param {vec3} target - Determine the direction in which the shadow is pointing.
   * @param {number} [size=600] - Determines the size of the shadow map that will be generated.
   * @param {number} [depth=200] - Determines how far the shadow projection extends in the scene.
   */
  setShadowProjection(position: vec3, target: vec3, size: number = 600, depth: number = 200): void {
    const lightProjectionMatrix = UT.MAT4_ORTHOGRAPHIC(size, size, depth);
    const lightViewMatrix = UT.MAT4_INVERT(UT.MAT4_LOOKAT(position, target, [0, 1, 0]));
    UT.MAT4_MULTIPLY(lightProjectionMatrix, lightViewMatrix, this.lvpMatrix);
  }

  /**
   * Set the size of a the shadow map depth texture.
   * More resolution is hight, more shadow is precise.
   * 
   * @param {number} depthTextureSize - The size.
   */
  setDepthTextureSize(depthTextureSize: number): void {
    this.depthTexture = gfx3Manager.getDevice().createTexture({
      size: [depthTextureSize, depthTextureSize, 1],
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
      format: 'depth32float'
    });

    this.depthTextureView = this.depthTexture.createView();
    this.depthTextureSampler = gfx3Manager.getDevice().createSampler({ compare: 'less'});
    this.depthTextureSize = depthTextureSize;
  }

  /**
   * Returns the depth texture.
   */
  getDepthTexture(): Gfx3Texture {
    return { gpuTexture: this.depthTexture, gpuSampler: this.depthTextureSampler };
  }

  /**
   * Returns the light view projection matrix (LVP).
   */
  getLVPMatrix(): Float32Array {
    return this.lvpMatrix;
  }
}

export { Gfx3MeshShadowRenderer };
export const gfx3MeshShadowRenderer = new Gfx3MeshShadowRenderer();