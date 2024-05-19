// import { gfx3Manager } from '../gfx3/gfx3_manager';
// import { UT } from '../core/utils';
// import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
// import { Gfx3DynamicGroup } from '../gfx3/gfx3_group';
// import { Gfx3Texture } from '../gfx3/gfx3_texture';
// import { Gfx3Mesh } from '../gfx3_mesh/gfx3_mesh';
// import { MESH_SV_VERTEX_SHADER, MESH_SV_FRAGMENT_SHADER, MESH_SV_PIPELINE_DESC } from './gfx3_mesh_sv_shader';

// interface MeshCommand {
//   mesh: Gfx3Mesh;
//   matrix: mat4;
// };

// /*
//  * Singleton mesh shadow volume renderer.
//  */
// class Gfx3MeshSVRenderer extends Gfx3RendererAbstract {
//   renderTexture: Gfx3Texture;
//   renderTextureView: GPUTextureView;
//   meshCommands: Array<MeshCommand>;
//   grp0: Gfx3DynamicGroup;
//   mvpcMatrix: Float32Array;

//   constructor() {
//     super('MESH_SV_PIPELINE', MESH_SV_VERTEX_SHADER, MESH_SV_FRAGMENT_SHADER, MESH_SV_PIPELINE_DESC);
//     this.renderTexture = gfx3Manager.createRenderingTexture('rgba16float');
//     this.renderTextureView = this.renderTexture.gpuTexture.createView();
//     this.meshCommands = [];

//     this.grp0 = gfx3Manager.createDynamicGroup('MESH_SV_PIPELINE', 0);
//     this.mvpcMatrix = this.grp0.setFloat(0, 'MVPC_MATRIX', 16);
//   }

//   /**
//    * The render function.
//    */
//   render(): void {
//     const commandEncoder = gfx3Manager.getCommandEncoder();
//     const passEncoder = commandEncoder.beginRenderPass({
//       colorAttachments: [],
//       depthStencilAttachment: {
//         view: this.depthTextureView,
//         depthClearValue: 1.0,
//         depthLoadOp: 'clear',
//         depthStoreOp: 'store',
//       },
//     });

//     passEncoder.setPipeline(this.pipeline);

//     if (this.grp0.getSize() < this.meshCommands.length) {
//       this.grp0.allocate(this.meshCommands.length);
//     }

//     this.grp0.beginWrite();

//     for (let i = 0; i < this.meshCommands.length; i++) {
//       const command = this.meshCommands[i];
//       const mMatrix = command.matrix ? command.matrix : command.mesh.getTransformMatrix();
//       this.grp0.write(0, this.lvpMatrix);
//       this.grp0.write(1, UT.MAT4_COPY(mMatrix, this.mMatrix) as Uint32Array);
//       passEncoder.setBindGroup(0, this.grp0.getBindGroup(i));
//       passEncoder.setVertexBuffer(0, gfx3Manager.getVertexBuffer(), command.mesh.getVertexSubBufferOffset(), command.mesh.getVertexSubBufferSize());
//       passEncoder.draw(command.mesh.getVertexCount());
//     }

//     this.grp0.endWrite();
//     this.meshCommands = [];

//     passEncoder.end();
//   }

//   /**
//    * Draw a mesh.
//    * 
//    * @param {Gfx3Mesh} mesh - The mesh.
//    * @param {mat4 | null} [matrix=null] - The transformation matrix.
//    */
//   drawMesh(mesh: Gfx3Mesh, matrix: mat4 | null = null): void {
//     this.meshCommands.push({ mesh: mesh, matrix: matrix });
//   }

//   /**
//    * Returns the render texture.
//    */
//   getRenderTexture(): Gfx3Texture {
//     return { gpuTexture: this.renderTexture, gpuSampler: this.renderTextureSampler };
//   }
// }

// export { Gfx3MeshSVRenderer };
// export const gfx3MeshSVRenderer = new Gfx3MeshSVRenderer();