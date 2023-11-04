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
 * The `Gfx3MeshShadowRenderer` class is a singleton renderer responsible to display shadow in a 3D graphics system.
 */
class Gfx3MeshShadowRenderer {
  pipeline: GPURenderPipeline;
  passEncoder: GPURenderPassEncoder;
  depthTextureSize: number;
  depthTexture:GPUTexture
  depthTextureSampler:GPUSampler;
  depthTextureView:GPUTextureView;
  meshCommands: Array<MeshCommand>;
  grp0: Gfx3DynamicGroup;
  lvpMatrix: Float32Array;
  mMatrix: Float32Array;

  constructor() {
    this.pipeline = gfx3Manager.loadPipeline('MESH_SHADOW_PIPELINE', MESH_SHADOW_VERTEX_SHADER, '', MESH_SHADOW_PIPELINE_DESC);
    this.passEncoder = {} as GPURenderPassEncoder;

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
   * The "beginPassRender" function.
   * Initialize the pass.
   */
  beginPassRender(): void {
    const commandEncoder = gfx3Manager.getCommandEncoder();
    this.passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [],
      depthStencilAttachment: {
        view: this.depthTextureView,
        depthClearValue: 1.0,
        depthLoadOp: 'clear',
        depthStoreOp: 'store',
      },
    });
  }

  /**
   * The "render" function.
   */
  render(): void {
    this.passEncoder.setPipeline(this.pipeline);

    if (this.grp0.getSize() < this.meshCommands.length) {
      this.grp0.allocate(this.meshCommands.length);
    }

    this.grp0.beginWrite();

    for (let i = 0; i < this.meshCommands.length; i++) {
      const command = this.meshCommands[i];
      const mMatrix = command.matrix ? command.matrix : command.mesh.getTransformMatrix();
      this.grp0.write(0, this.lvpMatrix);
      this.grp0.write(1, UT.MAT4_COPY(mMatrix, this.mMatrix) as Uint32Array);
      this.passEncoder.setBindGroup(0, this.grp0.getBindGroup(i));
      this.passEncoder.setVertexBuffer(0, gfx3Manager.getVertexBuffer(), command.mesh.getVertexSubBufferOffset(), command.mesh.getVertexSubBufferSize());
      this.passEncoder.draw(command.mesh.getVertexCount());
    }

    this.grp0.endWrite();
    this.meshCommands = [];
  }

  /**
   * The "endPassRender" function.
   * Close the pass.
   */
  endPassRender(): void {
    this.passEncoder.end();
  }

  /**
   * The "drawMesh" function draw a mesh.
   * @param {Gfx3Mesh} mesh - The mesh.
   * @param {mat4 | null} [matrix=null] - The `matrix` parameter is an optional parameter that represents
   * a transformation 4x4 matrix.
   */
  drawMesh(mesh: Gfx3Mesh, matrix: mat4 | null = null): void {
    this.meshCommands.push({ mesh: mesh, matrix: matrix });
  }

  /**
   * The "setShadowProjection" function sets up a shadow projection matrix based on the given position, target, size, and
   * depth.
   * @param {vec3} position - The `position` parameter representing the position of the light source in the scene.
   * @param {vec3} target - The `target` parameter is used to determine the direction in which the shadow is pointing.
   * @param {number} [size=600] - The `size` parameter is used to determines the size of the shadow map that will be generated.
   * @param {number} [depth=200] - The `depth` parameter is used to determines how far the shadow projection extends in the scene.
   */
  setShadowProjection(position: vec3, target: vec3, size: number = 600, depth: number = 200): void {
    const lightProjectionMatrix = UT.MAT4_ORTHOGRAPHIC(size, size, depth);
    const lightViewMatrix = UT.MAT4_INVERT(UT.MAT4_LOOKAT(position, target, [0, 1, 0]));
    UT.MAT4_MULTIPLY(lightProjectionMatrix, lightViewMatrix, this.lvpMatrix);
  }

  /**
   * The "setDepthTextureSize" function sets the size of a the shadow map depth texture.
   * @param {number} depthTextureSize - The `depthTextureSize` parameter represents the size of the depth texture.
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
   * The "getDepthTexture" function returns the depth texture.
   * @returns The depth texture.
   */
  getDepthTexture(): Gfx3Texture {
    return { gpuTexture: this.depthTexture, gpuSampler: this.depthTextureSampler };
  }

  /**
   * The "getLVPMatrix" function returns the light view projection matrix (LVP).
   * @returns The light view projection matrix.
   */
  getLVPMatrix(): Float32Array {
    return this.lvpMatrix;
  }
}

export { Gfx3MeshShadowRenderer };
export const gfx3MeshShadowRenderer = new Gfx3MeshShadowRenderer();