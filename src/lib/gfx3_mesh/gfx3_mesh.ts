import { gfx3MeshRenderer } from './gfx3_mesh_renderer';
import { UT } from '../core/utils';
import { Gfx3Drawable } from '../gfx3/gfx3_drawable';
import { Gfx3Material } from './gfx3_mesh_material';
import { SHADER_VERTEX_ATTR_COUNT } from './gfx3_mesh_shader';

export interface Face {
  v: vec3;
  t: vec3;
  n: vec3;
  smoothGroup: number;
};

export interface Group {
  name: string;
  faces: Array<Face>;
  vertexCount: number;
};

/**
 * A 3D base mesh object.
 */
class Gfx3Mesh extends Gfx3Drawable {
  layer: number;
  shadowCasting: boolean;
  material: Gfx3Material;

  constructor() {
    super(SHADER_VERTEX_ATTR_COUNT);
    this.layer = 0;
    this.shadowCasting = false;
    this.material = new Gfx3Material({});
  }

  /**
   * Useful function takes various vertex data and returns vertices with calculated normals, tangents, and binormals in the engine format.
   * 
   * @param {number} vertexCount - The total number of vertices in the mesh.
   * @param coords - A list of vertex coordinates.
   * @param [texcoords] - A list of vertex texture coordinates.
   * @param [colors] - A list of vertex color.
   * @param [normals] - A list of vertex normal.
   * @param [groups] - A list of vertex group.
   */
  static buildVertices(vertexCount: number, coords: Array<number>, texcoords?: Array<number>, colors?: Array<number>, normals?: Array<number>, groups?: Array<Group>): Array<number> {
    const vertices = new Array<number>();
    const finalCoords = new Array<vec3>();
    const finalUVs = new Array<vec2>();
    const finalColors = new Array<vec3>();
    const finalNorms = new Array<vec3>();
    const finalTangs = new Array<vec3>();
    const finalFlips = new Array<number>();
    const finalBinorms = new Array<vec3>();
    const finalNormsByGroup = new Array<Array<vec3>>();
    const finalTangsByGroup = new Array<Array<vec3>>();

    if (!groups) {
      groups = [{ name: 'default', faces: [], vertexCount: vertexCount }];
      for (let i = 0; i < vertexCount; i += 3) {
        groups[0].faces.push({
          v: [i + 0, i + 1, i + 2],
          t: [i + 0, i + 1, i + 2],
          n: [i + 0, i + 1, i + 2],
          smoothGroup: 0
        });
      }
    }

    for (const group of groups) {
      for (const f of group.faces) {
        finalCoords.push([coords[f.v[0] * 3 + 0], coords[f.v[0] * 3 + 1], coords[f.v[0] * 3 + 2]]);
        finalCoords.push([coords[f.v[1] * 3 + 0], coords[f.v[1] * 3 + 1], coords[f.v[1] * 3 + 2]]);
        finalCoords.push([coords[f.v[2] * 3 + 0], coords[f.v[2] * 3 + 1], coords[f.v[2] * 3 + 2]]);

        if (texcoords) {
          finalUVs.push([texcoords[f.t[0] * 2 + 0], texcoords[f.t[0] * 2 + 1]]);
          finalUVs.push([texcoords[f.t[1] * 2 + 0], texcoords[f.t[1] * 2 + 1]]);
          finalUVs.push([texcoords[f.t[2] * 2 + 0], texcoords[f.t[2] * 2 + 1]]);
        }
        else {
          finalUVs.push([0.0, 0.0]);
          finalUVs.push([0.0, 0.0]);
          finalUVs.push([0.0, 0.0]);
        }

        if (colors) {
          finalColors.push([colors[f.v[0] * 3 + 0], colors[f.v[0] * 3 + 1], colors[f.v[0] * 3 + 2]]);
          finalColors.push([colors[f.v[1] * 3 + 0], colors[f.v[1] * 3 + 1], colors[f.v[1] * 3 + 2]]);
          finalColors.push([colors[f.v[2] * 3 + 0], colors[f.v[2] * 3 + 1], colors[f.v[2] * 3 + 2]]);
        }
        else {
          finalColors.push([1.0, 1.0, 1.0]);
          finalColors.push([1.0, 1.0, 1.0]);
          finalColors.push([1.0, 1.0, 1.0]);
        }

        const c01 = UT.VEC3_SUBSTRACT(finalCoords.at(-2)!, finalCoords.at(-3)!);
        const c02 = UT.VEC3_SUBSTRACT(finalCoords.at(-1)!, finalCoords.at(-3)!);
        const uv01 = UT.VEC2_SUBSTRACT(finalUVs.at(-2)!, finalUVs.at(-3)!);
        const uv02 = UT.VEC2_SUBSTRACT(finalUVs.at(-1)!, finalUVs.at(-3)!);

        if (normals) {
          finalNorms.push([normals[f.n[0] * 3 + 0], normals[f.n[0] * 3 + 1], normals[f.n[0] * 3 + 2]]);
          finalNorms.push([normals[f.n[1] * 3 + 0], normals[f.n[1] * 3 + 1], normals[f.n[1] * 3 + 2]]);
          finalNorms.push([normals[f.n[2] * 3 + 0], normals[f.n[2] * 3 + 1], normals[f.n[2] * 3 + 2]]);
        }
        else {
          const fnorm = UT.VEC3_NORMALIZE(UT.VEC3_CROSS(c01, c02));
          finalNorms.push(fnorm);
          finalNorms.push(fnorm);
          finalNorms.push(fnorm);
        }

        const ftang: vec3 = [0, 0, 0];
        const fflip = COMPUTE_FACE_TANGENT(c01, c02, uv01, uv02, ftang);
        finalFlips.push(fflip);
        finalFlips.push(fflip);
        finalFlips.push(fflip);
        finalTangs.push(ftang);
        finalTangs.push(ftang);
        finalTangs.push(ftang);

        if (f.smoothGroup) {
          finalNormsByGroup[f.smoothGroup] = finalNormsByGroup[f.smoothGroup] || [];
          finalNormsByGroup[f.smoothGroup][f.v[0]] = finalNormsByGroup[f.smoothGroup][f.v[0]] ? UT.VEC3_ADD(finalNormsByGroup[f.smoothGroup][f.v[0]], finalNorms.at(-3)!) : finalNorms.at(-3)!;
          finalNormsByGroup[f.smoothGroup][f.v[1]] = finalNormsByGroup[f.smoothGroup][f.v[1]] ? UT.VEC3_ADD(finalNormsByGroup[f.smoothGroup][f.v[1]], finalNorms.at(-2)!) : finalNorms.at(-2)!;
          finalNormsByGroup[f.smoothGroup][f.v[2]] = finalNormsByGroup[f.smoothGroup][f.v[2]] ? UT.VEC3_ADD(finalNormsByGroup[f.smoothGroup][f.v[2]], finalNorms.at(-1)!) : finalNorms.at(-1)!;
          finalTangsByGroup[f.smoothGroup] = finalTangsByGroup[f.smoothGroup] || [];
          finalTangsByGroup[f.smoothGroup][f.v[0]] = finalTangsByGroup[f.smoothGroup][f.v[0]] ? UT.VEC3_ADD(finalTangsByGroup[f.smoothGroup][f.v[0]], ftang) : ftang;
          finalTangsByGroup[f.smoothGroup][f.v[1]] = finalTangsByGroup[f.smoothGroup][f.v[1]] ? UT.VEC3_ADD(finalTangsByGroup[f.smoothGroup][f.v[1]], ftang) : ftang;
          finalTangsByGroup[f.smoothGroup][f.v[2]] = finalTangsByGroup[f.smoothGroup][f.v[2]] ? UT.VEC3_ADD(finalTangsByGroup[f.smoothGroup][f.v[2]], ftang) : ftang;
        }
      }
    }

    for (let i = 0, n = 0; i < groups.length; i++) {
      for (const f of groups[i].faces) {
        for (let j = 0; j < 3; j++) {
          if (f.smoothGroup) {
            finalNorms[n] = UT.VEC3_NORMALIZE(finalNormsByGroup[f.smoothGroup][f.v[j]]);
            finalTangs[n] = UT.VEC3_NORMALIZE(finalTangsByGroup[f.smoothGroup][f.v[j]]);
          }
  
          finalBinorms[n] = UT.VEC3_SCALE(UT.VEC3_CROSS(finalNorms[n], finalTangs[n]), finalFlips[n]);
          vertices.push(finalCoords[n][0], finalCoords[n][1], finalCoords[n][2], finalUVs[n][0], finalUVs[n][1], finalColors[n][0], finalColors[n][1], finalColors[n][2], finalNorms[n][0], finalNorms[n][1], finalNorms[n][2], finalTangs[n][0], finalTangs[n][1], finalTangs[n][2], finalBinorms[n][0], finalBinorms[n][1], finalBinorms[n][2]);
          n++;  
        }
      }
    }

    return vertices;
  }

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   *
   * @param {boolean} keepMat - Determines if the material is deleted or not.
   */
  delete(keepMat: boolean = false): void {
    if (!keepMat) {
      this.material.delete();
    }

    super.delete();
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    this.material.update(ts);
  }

  /**
   * The draw function.
   */
  draw(): void {
    gfx3MeshRenderer.drawMesh(this);
  }

  /**
   * Set the layer.
   * Mesh layer is used to easily categorized and identified group of meshes, actually it is only used for decals.
   * 
   * @param {number} layer - The layer.
   */
  setLayer(layer: number): void {
    this.layer = layer;
  }

  /**
   * Returns the layer.
   */
  getLayer(): number {
    return this.layer;
  }

  /**
   * Set the shadow casting.
   * 
   * @param {boolean} shadowCasting - Determines if object cast shadows.
   */
  setShadowCasting(shadowCasting: boolean): void {
    this.shadowCasting = shadowCasting;
  }

  /**
   * Check if shadow casting is enable or not.
   */
  getShadowCasting(): boolean {
    return this.shadowCasting;
  }

  /**
   * Set a material.
   * 
   * @param {Gfx3Material} material - The material.
   * @param {boolean} [keepMat=true] - Determines whether to keep the current material or delete it before assigning the new material.
   */
  setMaterial(material: Gfx3Material, keepMat: boolean = true): void {
    if (!keepMat) {
      this.material.delete();
    }

    this.material = material;
  }

  /**
   * Returns the material.
   */
  getMaterial(): Gfx3Material {
    return this.material;
  }

  /**
   * Creates a clone of the mesh.
   * 
   * @param {mat4} transformMatrix - The transformation matrix.
   */
  clone(transformMatrix: mat4 = UT.MAT4_IDENTITY()): Gfx3Mesh {
    const mesh = new Gfx3Mesh();
    mesh.beginVertices(this.vertexCount);

    for (let i = 0; i < this.vertices.length; i += this.vertexStride) {
      const v = UT.MAT4_MULTIPLY_BY_VEC4(transformMatrix, UT.VEC4_CREATE(this.vertices[i + 0], this.vertices[i + 1], this.vertices[i + 2], 1.0));
      mesh.defineVertex(v[0], v[1], v[2], this.vertices[i + 3], this.vertices[i + 4], this.vertices[i + 5], this.vertices[i + 6], this.vertices[i + 7], this.vertices[i + 8], this.vertices[i + 9], this.vertices[i + 10], this.vertices[i + 11], this.vertices[i + 12], this.vertices[i + 13]);
    }

    mesh.endVertices();
    mesh.setLayer(this.layer);
    mesh.setMaterial(this.material);
    return mesh;
  }

  /**
   * Returns the material.
   */
  get mat(): Gfx3Material {
    return this.material;
  }
}

export { Gfx3Mesh };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function COMPUTE_FACE_TANGENT(v01: vec3, v02: vec3, uv01: vec2, uv02: vec2, out: vec3): number {
  const uv2xArea = ((uv01[0] * uv02[1]) - (uv01[1] * uv02[0]));
  if (Math.abs(uv2xArea) > UT.EPSILON) {
    const r = 1.0 / uv2xArea;
    const flip = uv2xArea > 0 ? 1 : -1;

    const tx = ((v01[0] * uv02[1]) - (v02[0] * uv01[1])) * r;
    const ty = ((v01[1] * uv02[1]) - (v02[1] * uv01[1])) * r;
    const tz = ((v01[2] * uv02[1]) - (v02[2] * uv01[1])) * r;

    const ftang = UT.VEC3_NORMALIZE([tx, ty, tz]);
    out[0] = ftang[0];
    out[1] = ftang[1];
    out[2] = ftang[2];
    return flip;
  }

  return -1;
}
