import { gfx3Manager } from '../gfx3/gfx3_manager';
import { UT } from '../core/utils';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { Gfx3StaticGroup, Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3Mesh } from './gfx3_mesh';
import { PIPELINE_DESC, VERTEX_SHADER, FRAGMENT_SHADER, MAX_POINT_LIGHTS, MAX_DECALS } from './gfx3_mesh_shader';

interface MeshCommand {
  mesh: Gfx3Mesh;
  matrix: mat4 | null;
};

/**
 * The `Gfx3MeshRenderer` class is a singleton renderer responsible to display mesh in a 3D graphics system
 * and provides methods for controlling directionnal light, point light, fog and decals.
 */
class Gfx3MeshRenderer extends Gfx3RendererAbstract {
  texturesChanged: boolean;
  meshCommands: Array<MeshCommand>;
  grp0: Gfx3StaticGroup;
  camPos: Float32Array;
  dirLight: Float32Array;
  fog: Float32Array;
  pointLightCount: Uint32Array;
  pointLights: Float32Array;
  decalCount: Uint32Array;
  decals: Float32Array;
  decalAtlas: Gfx3Texture;
  grp1: Gfx3DynamicGroup;
  meshMatrices: Float32Array;
  meshLayer: Uint32Array;

  /**
   * The constructor.
   */
  constructor() {
    super('MESH_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC);
    this.texturesChanged = false;
    this.meshCommands = [];
    this.grp0 = gfx3Manager.createStaticGroup('MESH_PIPELINE', 0);
    this.camPos = this.grp0.setFloat(0, 'CAM_POS', 3);
    this.dirLight = this.grp0.setFloat(1, 'DIR_LIGHT', 16);
    this.fog = this.grp0.setFloat(2, 'FOG', 8);
    this.pointLightCount = this.grp0.setInteger(3, 'POINT_LIGHT_COUNT', 1);
    this.pointLights = this.grp0.setFloat(4, 'POINT_LIGHTS', 20 * MAX_POINT_LIGHTS);
    this.decalCount = this.grp0.setInteger(5, 'DECAL_COUNT', 1);
    this.decals = this.grp0.setFloat(6, 'DECALS', 24 * MAX_DECALS);
    this.decalAtlas = this.grp0.setTexture(7, 'DECAL_ATLAS_TEXTURE', gfx3Manager.createTextureFromBitmap());
    this.grp1 = gfx3Manager.createDynamicGroup('MESH_PIPELINE', 1);
    this.meshMatrices = this.grp1.setFloat(0, 'MESH_MATRICES', 16 * 3);
    this.meshLayer = this.grp1.setInteger(1, 'MESH_LAYER', 1);

    this.grp1.allocate();
    this.grp0.allocate();
  }

  /**
   * The "render" function.
   */
  render(): void {
    const currentView = gfx3Manager.getCurrentView();
    const passEncoder = gfx3Manager.getPassEncoder();
    const vpcMatrix = currentView.getViewProjectionClipMatrix();
    passEncoder.setPipeline(this.pipeline);

    if (this.texturesChanged) {      
      this.grp0.setTexture(7, 'DECAL_ATLAS_TEXTURE', this.decalAtlas);
      this.grp0.allocate();
      this.texturesChanged = false;
    }

    this.grp0.beginWrite();
    this.grp0.write(0, UT.VEC3_COPY(currentView.getCameraPosition(), this.camPos) as Float32Array);
    this.grp0.write(1, this.dirLight);
    this.grp0.write(2, this.fog);
    this.grp0.write(3, this.pointLightCount);
    this.grp0.write(4, this.pointLights);
    this.grp0.write(5, this.decalCount);
    this.grp0.write(6, this.decals);
    this.grp0.endWrite();
    passEncoder.setBindGroup(0, this.grp0.getBindGroup());

    if (this.grp1.getSize() < this.meshCommands.length) {
      this.grp1.allocate(this.meshCommands.length);
    }

    this.grp1.beginWrite();

    for (let i = 0; i < this.meshCommands.length; i++) {
      const command = this.meshCommands[i];
      const mMatrix = command.matrix ? command.matrix : command.mesh.getTransformMatrix();
      this.grp1.write(0, BUILD_MESH_MATRICES(vpcMatrix, mMatrix, this.meshMatrices) as Float32Array);
      this.grp1.write(1, UT.VEC1_COPY(command.mesh.getLayer(), this.meshLayer) as Uint32Array);
      passEncoder.setBindGroup(1, this.grp1.getBindGroup(i));

      const material = command.mesh.getMaterial();
      const grp2 = material.getGroup02();
      const grp3 = material.getGroup03();
      passEncoder.setBindGroup(2, grp2.getBindGroup());
      passEncoder.setBindGroup(3, grp3.getBindGroup());

      passEncoder.setVertexBuffer(0, gfx3Manager.getVertexBuffer(), command.mesh.getVertexSubBufferOffset(), command.mesh.getVertexSubBufferSize());
      passEncoder.draw(command.mesh.getVertexCount());
    }

    this.grp1.endWrite();

    this.pointLightCount[0] = 0;
    this.pointLights.fill(0);
    this.decalCount[0] = 0;
    this.decals.fill(0);
    this.meshCommands = [];
  }

  /**
   * The "setDecalAtlas" function sets the decal texture atlas that contains all decal sprites.
   * @param {Gfx3Texture} decalAtlas - The decal texture atlas.
   */
  setDecalAtlas(decalAtlas: Gfx3Texture): void {
    this.decalAtlas = decalAtlas;
    this.texturesChanged = true;
  }

  /**
   * The "enableDirLight" function enables a directional light with specified properties.
   * @param {boolean} enabled - A boolean value indicating whether the directional light is enabled or not.
   * @param {vec3} direction - The direction of the directional light.
   * @param {vec3} ambient - The ambient color of the directional light.
   * @param {vec3} diffuse - The diffuse color of the directional light.
   * @param {vec3} specular - The specular color of the directional light.
   * @param {number} [intensity=1] - The strength or brightness of the directional light.
   */
  enableDirLight(enabled: boolean, direction: vec3, ambient: vec3, diffuse: vec3, specular: vec3, intensity: number = 1): void {
    this.dirLight[0] = direction[0];
    this.dirLight[1] = direction[1];
    this.dirLight[2] = direction[2];
    this.dirLight[3] = enabled ? 1.0 : 0.0;
    this.dirLight[4] = ambient[0];
    this.dirLight[5] = ambient[1];
    this.dirLight[6] = ambient[2];
    this.dirLight[7] = 0;
    this.dirLight[8] = diffuse[0];
    this.dirLight[9] = diffuse[1];
    this.dirLight[10] = diffuse[2];
    this.dirLight[11] = 0;
    this.dirLight[12] = specular[0];
    this.dirLight[13] = specular[1];
    this.dirLight[14] = specular[2];
    this.dirLight[15] = intensity;
  }

  /**
   * The "enableFog" function enables the fog with specified properties.
   * @param {boolean} enabled - A boolean value indicating whether the fog is enabled or not.
   * @param {vec3} color - The fog color.
   * @param {number} [near=3.0] - The distance from the camera at which the fog starts to appear.
   * @param {number} [far=15.0] - The distance from the camera at which the fog effect should start to fade out.
   */
  enableFog(enabled: boolean, color: vec3 = [0.5, 0.5, 0.5], near: number = 3.0, far: number = 15.0): void {
    this.fog[0] = enabled ? 1.0 : 0.0;
    this.fog[1] = near;
    this.fog[2] = far;
    this.fog[3] = 0;
    this.fog[4] = color[0];
    this.fog[5] = color[1];
    this.fog[6] = color[2];
    this.fog[7] = 0;
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
   * The "drawPointLight" function adds a point light with specified properties.
   * @param {vec3} position - The position of the point light in 3D space.
   * @param {vec3} ambient - The ambient color of the point light.
   * @param {vec3} diffuse - The diffuse color of the point light.
   * @param {vec3} specular - The specular color of the point light.
   * @param {number} [intensity=1] - The brightness or strength of the point light.
   * @param {number} [constant=1] - The constant parameter represents the constant attenuation factor of
   * the point light. It determines how quickly the light intensity diminishes with distance from the
   * light source. A higher constant value will result in a slower decrease in intensity.
   * @param {number} [linear=0] - The "linear" parameter represents the linear attenuation factor of the
   * point light. It determines how the intensity of the light decreases as the distance from the light
   * source increases. A higher linear value will cause the light to attenuate more quickly, resulting in
   * a shorter range of influence.
   * @param {number} [exp=0] - The "exp" parameter represents the exponent of the attenuation equation
   * for the point light.
   */
  drawPointLight(position: vec3, ambient: vec3, diffuse: vec3, specular: vec3, intensity: number = 1, constant: number = 1, linear: number = 0, exp: number = 0): void {
    const count = this.pointLightCount[0];
    if (count >= MAX_POINT_LIGHTS) {
      throw new Error('Gfx3MeshRenderer::drawPointLight(): Max point lights number exceeded !');
    }

    this.pointLights[count * 20 + 0] = position[0];
    this.pointLights[count * 20 + 1] = position[1];
    this.pointLights[count * 20 + 2] = position[2];
    this.pointLights[count * 20 + 3] = 0;
    this.pointLights[count * 20 + 4] = ambient[0];
    this.pointLights[count * 20 + 5] = ambient[1];
    this.pointLights[count * 20 + 6] = ambient[2];
    this.pointLights[count * 20 + 7] = 0;
    this.pointLights[count * 20 + 8] = diffuse[0];
    this.pointLights[count * 20 + 9] = diffuse[1];
    this.pointLights[count * 20 + 10] = diffuse[2];
    this.pointLights[count * 20 + 11] = 0;
    this.pointLights[count * 20 + 12] = specular[0];
    this.pointLights[count * 20 + 13] = specular[1];
    this.pointLights[count * 20 + 14] = specular[2];
    this.pointLights[count * 20 + 15] = 0;
    this.pointLights[count * 20 + 16] = constant;
    this.pointLights[count * 20 + 17] = linear;
    this.pointLights[count * 20 + 18] = exp;
    this.pointLights[count * 20 + 19] = intensity;
    this.pointLightCount[0]++;
  }

  /**
   * The "drawDecal" function is used to sets a decal projector and draw texture over meshes
   * with the specified layer.
   * @param {number} layer - The layer target.
   * @param {number} sx - The x-coordinate of the decal sprite in the atlas texture.
   * @param {number} sy - The y-coordinate of the decal sprite in the atlas texture.
   * @param {number} sw - The width of the decal sprite in the atlas texture.
   * @param {number} sh - The height of the decal sprite in the atlas texture.
   * @param {vec3} position - The position of projector (center).
   * @param {vec3} orientationX - The x-axis orientation of the projector.
   * @param {vec3} orientationY - The y-axis orientation of the projector.
   * @param {vec3} orientationZ - The z-axis orientation of the projector.
   * @param {vec3} size - The size (width, height, depth) of the projector.
   * @param {number} opacity - The opacity or transparency of the decal.
   */
  drawDecal(layer: number, sx: number, sy: number, sw: number, sh: number, position: vec3, orientationX: vec3, orientationY: vec3, orientationZ: vec3, size: vec3, opacity: number): void {
    const count = this.decalCount[0];
    if (count >= MAX_DECALS) {
      throw new Error('Gfx3MeshRenderer::drawDecal(): Max decals number exceeded !');
    }

    const projectorM: mat4 = [
      orientationX[0],
      orientationX[1],
      orientationX[2],
      0,
      orientationY[0],
      orientationY[1],
      orientationY[2],
      0,
      orientationZ[0],
      orientationZ[1],
      orientationZ[2],
      0,
      position[0],
      position[1],
      position[2],
      1
    ];

    const aspectRatio: vec2 = [
      sw > sh ? 1.0 : sh / sw,
      sw > sh ? sw / sh : 1.0
    ];

    const projectorV = UT.MAT4_INVERT(projectorM);
    const projectorP = UT.MAT4_ORTHOGRAPHIC(size[0], size[1], size[2]);
    const projectorVP = UT.MAT4_MULTIPLY(projectorV, projectorP);

    this.decals[count * 24 + 0] = projectorVP[0];
    this.decals[count * 24 + 1] = projectorVP[1];
    this.decals[count * 24 + 2] = projectorVP[2];
    this.decals[count * 24 + 3] = projectorVP[3];
    this.decals[count * 24 + 4] = projectorVP[4];
    this.decals[count * 24 + 5] = projectorVP[5];
    this.decals[count * 24 + 6] = projectorVP[6];
    this.decals[count * 24 + 7] = projectorVP[7];
    this.decals[count * 24 + 8] = projectorVP[8];
    this.decals[count * 24 + 9] = projectorVP[9];
    this.decals[count * 24 + 10] = projectorVP[10];
    this.decals[count * 24 + 11] = projectorVP[11];
    this.decals[count * 24 + 12] = projectorVP[12];
    this.decals[count * 24 + 13] = projectorVP[13];
    this.decals[count * 24 + 14] = projectorVP[14];
    this.decals[count * 24 + 15] = projectorVP[15];
    this.decals[count * 24 + 16] = sx / this.decalAtlas.gpuTexture.width;
    this.decals[count * 24 + 17] = sy / this.decalAtlas.gpuTexture.height;
    this.decals[count * 24 + 18] = sw / this.decalAtlas.gpuTexture.width;
    this.decals[count * 24 + 19] = sh / this.decalAtlas.gpuTexture.height;
    this.decals[count * 24 + 20] = aspectRatio[0];
    this.decals[count * 24 + 21] = aspectRatio[1];
    this.decals[count * 24 + 22] = opacity;
    this.decals[count * 24 + 23] = layer;
    this.decalCount[0]++;
  }
}

export { Gfx3MeshRenderer };
export const gfx3MeshRenderer = new Gfx3MeshRenderer();

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function BUILD_MESH_MATRICES(vpcMatrix: mat4, mMatrix: mat4, out: Float32Array): Float32Array {
  // 4x4 mvpc matrix
  UT.MAT4_MULTIPLY(vpcMatrix, mMatrix, out);
  // 4x4 model matrix
  out.set(mMatrix, 16);
  // 3x3 normal matrix
  out[32 + 0] = mMatrix[0];
  out[32 + 1] = mMatrix[1];
  out[32 + 2] = mMatrix[2];
  out[32 + 3] = 0;
  out[32 + 4] = mMatrix[4];
  out[32 + 5] = mMatrix[5];
  out[32 + 6] = mMatrix[6];
  out[32 + 7] = 0;
  out[32 + 8] = mMatrix[8];
  out[32 + 9] = mMatrix[9];
  out[32 + 10] = mMatrix[10];
  return out;
}