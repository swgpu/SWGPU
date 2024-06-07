import { gfx3Manager } from '../gfx3/gfx3_manager';
import { gfx3MeshShadowRenderer } from './gfx3_mesh_shadow_renderer';
import { UT } from '../core/utils';
import { Gfx3RendererAbstract } from '../gfx3/gfx3_renderer_abstract';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { Gfx3StaticGroup, Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { Gfx3Mesh } from './gfx3_mesh';
import { PIPELINE_DESC, VERTEX_SHADER, FRAGMENT_SHADER, MAX_POINT_LIGHTS, MAX_SPOT_LIGHTS, MAX_DECALS } from './gfx3_mesh_shader';

interface MeshCommand {
  mesh: Gfx3Mesh;
  matrix: mat4;
};

/**
 * Singleton mesh renderer.
 */
class Gfx3MeshRenderer extends Gfx3RendererAbstract {
  shadowEnabled: boolean;
  decalAtlasChanged: boolean;
  meshCommands: Array<MeshCommand>;
  grp0: Gfx3StaticGroup;
  sceneInfos: Float32Array;
  lvpMatrix: Float32Array;
  dirLight: Float32Array;
  pointLights: Float32Array;
  spotLights: Float32Array;
  decals: Float32Array;
  fog: Float32Array;
  decalAtlas: Gfx3Texture;
  shadowMap: Gfx3Texture;
  grp1: Gfx3DynamicGroup;
  meshInfos: Float32Array;

  constructor() {
    super('MESH_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC);
    this.shadowEnabled = false;
    this.decalAtlasChanged = false;
    this.meshCommands = [];

    this.grp0 = gfx3Manager.createStaticGroup('MESH_PIPELINE', 0);
    this.sceneInfos = this.grp0.setFloat(0, 'SCENE_INFOS', 14);
    this.lvpMatrix = this.grp0.setFloat(1, 'LVP_MATRIX', 16);
    this.dirLight = this.grp0.setFloat(2, 'DIR_LIGHT', 16);
    this.pointLights = this.grp0.setFloat(3, 'POINT_LIGHTS', 20 * MAX_POINT_LIGHTS);
    this.spotLights = this.grp0.setFloat(4, 'SPOT_LIGHTS', 24 * MAX_SPOT_LIGHTS);
    this.decals = this.grp0.setFloat(5, 'DECALS', 24 * MAX_DECALS);
    this.fog = this.grp0.setFloat(6, 'FOG', 12);
    this.decalAtlas = this.grp0.setTexture(7, 'DECAL_ATLAS_TEXTURE', gfx3Manager.createTextureFromBitmap());
    this.decalAtlas = this.grp0.setSampler(8, 'DECAL_ATLAS_SAMPLER', this.decalAtlas);
    this.shadowMap = this.grp0.setTexture(9, 'SHADOW_MAP_TEXTURE', gfx3MeshShadowRenderer.getDepthTexture());
    this.shadowMap = this.grp0.setSampler(10, 'SHADOW_MAP_SAMPLER', this.shadowMap);

    this.grp1 = gfx3Manager.createDynamicGroup('MESH_PIPELINE', 1);
    this.meshInfos = this.grp1.setFloat(0, 'MESH_MATRICES', 16 * 5);

    this.grp0.allocate();
    this.grp1.allocate();
  }

  /**
   * The render function.
   */
  render(ts: number): void {
    const currentView = gfx3Manager.getCurrentView();
    const passEncoder = gfx3Manager.getPassEncoder();

    const bpcMatrix = currentView.getBillboardProjectionClipMatrix();
    const vpcMatrix = currentView.getViewProjectionClipMatrix();
    passEncoder.setPipeline(this.pipeline);

    if (this.decalAtlasChanged) {
      this.grp0.setTexture(7, 'DECAL_ATLAS_TEXTURE', this.decalAtlas);
      this.grp0.allocate();
      this.decalAtlasChanged = false;
    }

    if (this.shadowEnabled) {
      this.grp0.setTexture(9, 'SHADOW_MAP_TEXTURE', gfx3MeshShadowRenderer.getDepthTexture());
      this.grp0.allocate();
    }

    this.grp0.beginWrite();
    this.grp0.write(0, BUILD_SCENE_INFOS(currentView.getCameraPosition(), ts, this.sceneInfos));
    this.grp0.write(1, gfx3MeshShadowRenderer.getLVPMatrix());
    this.grp0.write(2, this.dirLight);
    this.grp0.write(3, this.pointLights);
    this.grp0.write(4, this.spotLights);
    this.grp0.write(5, this.decals);
    this.grp0.write(6, this.fog);
    this.grp0.endWrite();
    passEncoder.setBindGroup(0, this.grp0.getBindGroup());

    if (this.grp1.getSize() < this.meshCommands.length) {
      this.grp1.allocate(this.meshCommands.length);
    }

    this.grp1.beginWrite();

    for (let i = 0; i < this.meshCommands.length; i++) {
      const command = this.meshCommands[i];
      this.grp1.write(0, BUILD_MESH_INFOS(command.mesh.billboard ? bpcMatrix : vpcMatrix, command.matrix, command.mesh.getId(), this.meshInfos) as Float32Array);
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

    this.dirLight.fill(0);
    this.sceneInfos[7] = 0;
    this.pointLights.fill(0);
    this.sceneInfos[8] = 0;
    this.spotLights.fill(0);
    this.sceneInfos[9] = 0;
    this.decals.fill(0);
    this.meshCommands = [];
  }

  /**
   * Enable the shadowing projection.
   * 
   * @param {boolean} enabled - Indicating whether the shadow should be enabled or disabled.
   */
  enableShadow(enabled: boolean): void {
    this.shadowEnabled = enabled;
  }

  /**
   * Set the decal texture atlas.
   * 
   * @param {Gfx3Texture} decalAtlas - The decal texture atlas.
   */
  setDecalAtlas(decalAtlas: Gfx3Texture): void {
    this.decalAtlas = decalAtlas;
    this.decalAtlasChanged = true;
  }

  /**
   * Enable the fog.
   * 
   * @param {boolean} enabled - Indicating whether the fog is enabled or not.
   * @param {vec3} from - The fog origin point.
   * @param {vec3} color - The fog color.
   * @param {number} [near=3.0] - The distance from the camera at which the fog starts to appear.
   * @param {number} [far=15.0] - The distance from the camera at which the fog effect should start to fade out.
   */
  enableFog(enabled: boolean, from: vec3 = [0, 0, 0], color: vec3 = [0.5, 0.5, 0.5], near: number = 3.0, far: number = 15.0): void {
    this.fog[0] = enabled ? 1.0 : 0.0;
    this.fog[1] = near;
    this.fog[2] = far;
    this.fog[3] = 0;
    this.fog[4] = color[0];
    this.fog[5] = color[1];
    this.fog[6] = color[2];
    this.fog[7] = 0;
    this.fog[8] = from[0];
    this.fog[9] = from[1];
    this.fog[10] = from[2];
    this.fog[11] = 0;
  }

  /**
   * Draw a mesh.
   * 
   * @param {Gfx3Mesh} mesh - The mesh.
   * @param {mat4 | null} [matrix=null] - The transformation matrix.
   */
  drawMesh(mesh: Gfx3Mesh, matrix: mat4 | null = null): void {
    const meshMatrix = matrix ?? mesh.getTransformMatrix();
    this.meshCommands.push({ mesh: mesh, matrix: meshMatrix });

    if (this.shadowEnabled && mesh.getShadowCasting()) {
      gfx3MeshShadowRenderer.drawMesh(mesh, meshMatrix);
    }
  }

  /**
   * Set the ambient color.
   * 
   * @param {vec3} ambientColor - The ambient color.
   */
  setAmbientColor(ambientColor: vec3): void {
    this.sceneInfos[4] = ambientColor[0];
    this.sceneInfos[5] = ambientColor[1];
    this.sceneInfos[6] = ambientColor[2];
  }

  /**
   * Draw a directional light.
   * 
   * @param {vec3} direction - The direction.
   * @param {vec3} diffuse - The diffuse color.
   * @param {vec3} specular - The specular color.
   * @param {number} [intensity=1] - The strength or brightness.
   * @param {number} [meshId=0] - The mesh id targeted (0 affect all mesh).
   */
  drawDirLight(direction: vec3, diffuse: vec3, specular: vec3, intensity: number = 1, meshId: number = 0): void {
    this.dirLight[0] = direction[0];
    this.dirLight[1] = direction[1];
    this.dirLight[2] = direction[2];
    this.dirLight[3] = 1.0;
    this.dirLight[4] = diffuse[0];
    this.dirLight[5] = diffuse[1];
    this.dirLight[6] = diffuse[2];
    this.dirLight[7] = 0;
    this.dirLight[8] = specular[0];
    this.dirLight[9] = specular[1];
    this.dirLight[10] = specular[2];
    this.dirLight[11] = intensity;
    this.dirLight[12] = meshId;
    this.dirLight[13] = 0;
    this.dirLight[14] = 0;
    this.dirLight[15] = 0;
  }

  /**
   * Draw a point light.
   * 
   * @param {vec3} position - The position.
   * @param {vec3} diffuse - The diffuse color.
   * @param {vec3} specular - The specular color.
   * @param {number} [intensity=1] - The brightness or strength.
   * @param {number} [meshId=0] - The mesh id targeted (0 affect all mesh).
   * @param {number} [constant=1] - The constant attenuation factor of the point light.
   * @param {number} [linear=0] - The linear attenuation factor of the point light.
   * @param {number} [exp=0] - The exponent of the attenuation equation for the point light.
   */
  drawPointLight(position: vec3, diffuse: vec3, specular: vec3, intensity: number = 1, meshId: number = 0, constant: number = 1, linear: number = 0, exp: number = 0): void {
    const count = this.sceneInfos[7];
    if (count >= MAX_POINT_LIGHTS) {
      throw new Error('Gfx3MeshRenderer::drawPointLight(): Max point lights number exceeded !');
    }

    this.pointLights[count * 20 + 0] = position[0];
    this.pointLights[count * 20 + 1] = position[1];
    this.pointLights[count * 20 + 2] = position[2];
    this.pointLights[count * 20 + 3] = 0;
    this.pointLights[count * 20 + 4] = diffuse[0];
    this.pointLights[count * 20 + 5] = diffuse[1];
    this.pointLights[count * 20 + 6] = diffuse[2];
    this.pointLights[count * 20 + 7] = 0;
    this.pointLights[count * 20 + 8] = specular[0];
    this.pointLights[count * 20 + 9] = specular[1];
    this.pointLights[count * 20 + 10] = specular[2];
    this.pointLights[count * 20 + 11] = 0;
    this.pointLights[count * 20 + 12] = constant;
    this.pointLights[count * 20 + 13] = linear;
    this.pointLights[count * 20 + 14] = exp;
    this.pointLights[count * 20 + 15] = intensity;
    this.pointLights[count * 20 + 16] = meshId;
    this.pointLights[count * 20 + 17] = 0;
    this.pointLights[count * 20 + 18] = 0;
    this.pointLights[count * 20 + 19] = 0;
    this.sceneInfos[7]++;
  }

  /**
   * Draw a spot light.
   * 
   * @param {vec3} position - The position.
   * @param {vec3} direction - The direction.
   * @param {number} cutoff - The aperture angle of light.
   * @param {vec3} diffuse - The diffuse color.
   * @param {vec3} specular - The specular color.
   * @param {number} [intensity=1] - The brightness or strength.
   * @param {number} [meshId=0] - The mesh id targeted (0 affect all mesh).
   * @param {number} [constant=1] - The constant attenuation factor of the point light.
   * @param {number} [linear=0] - The linear attenuation factor of the point light.
   * @param {number} [exp=0] - The exponent of the attenuation equation for the point light.
   */
  drawSpotLight(position: vec3, direction: vec3, cutoff: number, diffuse: vec3, specular: vec3, intensity: number = 1, meshId: number = 0, constant: number = 1, linear: number = 0, exp: number = 0): void {
    const count = this.sceneInfos[8];
    if (count >= MAX_SPOT_LIGHTS) {
      throw new Error('Gfx3MeshRenderer::drawSpotLight(): Max spot lights number exceeded !');
    }

    this.spotLights[count * 24 + 0] = position[0];
    this.spotLights[count * 24 + 1] = position[1];
    this.spotLights[count * 24 + 2] = position[2];
    this.spotLights[count * 24 + 3] = 0;
    this.spotLights[count * 24 + 4] = direction[0];
    this.spotLights[count * 24 + 5] = direction[1];
    this.spotLights[count * 24 + 6] = direction[2];
    this.spotLights[count * 24 + 7] = 0;
    this.spotLights[count * 24 + 8] = diffuse[0];
    this.spotLights[count * 24 + 9] = diffuse[1];
    this.spotLights[count * 24 + 10] = diffuse[2];
    this.spotLights[count * 24 + 11] = 0;
    this.spotLights[count * 24 + 12] = specular[0];
    this.spotLights[count * 24 + 13] = specular[1];
    this.spotLights[count * 24 + 14] = specular[2];
    this.spotLights[count * 24 + 15] = 0;
    this.spotLights[count * 24 + 16] = constant;
    this.spotLights[count * 24 + 17] = linear;
    this.spotLights[count * 24 + 18] = exp;
    this.spotLights[count * 24 + 19] = intensity;
    this.spotLights[count * 24 + 20] = meshId;
    this.spotLights[count * 24 + 21] = Math.cos(cutoff);
    this.spotLights[count * 24 + 22] = 0;
    this.spotLights[count * 24 + 23] = 0;
    this.sceneInfos[8]++;
  }

  /**
   * Draw a decal.
   * 
   * @param {number} group - The group target (mesh is identified by its 'g' id component).
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
  drawDecal(group: number, sx: number, sy: number, sw: number, sh: number, position: vec3, orientationX: vec3, orientationY: vec3, orientationZ: vec3, size: vec3, opacity: number): void {
    const count = this.sceneInfos[9];
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
    this.decals[count * 24 + 23] = group;
    this.sceneInfos[9]++;
  }
}

export { Gfx3MeshRenderer };
export const gfx3MeshRenderer = new Gfx3MeshRenderer();

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function BUILD_SCENE_INFOS(camPos: vec3, ts: number, out: Float32Array): Float32Array {
  out[0] = camPos[0];
  out[1] = camPos[1];
  out[2] = camPos[2];
  out[3] = 0;
  out[10] = ts / 1000;
  out[11] += out[10];
  return out;
}

function BUILD_MESH_INFOS(vpcMatrix: mat4, mMatrix: mat4, meshId: vec4, out: Float32Array): Float32Array {
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
  out[32 + 11] = 0;
  out[32 + 12] = meshId[0];
  out[32 + 13] = meshId[1];
  out[32 + 14] = meshId[2];
  out[32 + 15] = meshId[3];
  return out;
}