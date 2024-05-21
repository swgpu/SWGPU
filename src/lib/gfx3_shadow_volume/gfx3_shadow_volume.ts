import { gfx3DebugRenderer } from '../gfx3/gfx3_debug_renderer';
import { gfx3ShadowVolumeRenderer } from './gfx3_shadow_volume_renderer';
import { UT } from '../core/utils';
import { Gfx3Drawable } from '../gfx3/gfx3_drawable';
import { SHADER_VERTEX_ATTR_COUNT } from './gfx3_shadow_volume_shader';

/**
 * A 3D shadow volume mesh.
 */
class Gfx3ShadowVolume extends Gfx3Drawable {
  debugEnabled: boolean;
  debugVertices: Array<number>;
  debugVertexCount: number;

  constructor() {
    super(SHADER_VERTEX_ATTR_COUNT);
    this.debugEnabled = true;
    this.debugVertices = [];
    this.debugVertexCount = 0;
  }

  /**
   * Load asynchronously shadow volume data from a json file (jsv).
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'JSV') {
      throw new Error('Gfx3ShadowVolume::loadFromFile(): File not valid !');
    }

    this.beginVertices(json['NumVertices']);

    for (let i = 0; i < json['NumVertices']; i++) {
      this.defineVertex(
        json['Vertices'][i * 3 + 0],
        json['Vertices'][i * 3 + 1],
        json['Vertices'][i * 3 + 2],
        json['ShadowFactors'][i]
      );
    }

    this.endVertices();

    for (let i = 0; i < json['NumVertices'] / 3; i++) {
      const v1 = [json['Vertices'][i * 9 + 0], json['Vertices'][i * 9 + 1], json['Vertices'][i * 9 + 2]];
      const v2 = [json['Vertices'][i * 9 + 3], json['Vertices'][i * 9 + 4], json['Vertices'][i * 9 + 5]];
      const v3 = [json['Vertices'][i * 9 + 6], json['Vertices'][i * 9 + 7], json['Vertices'][i * 9 + 8]];
      this.debugVertices.push(v1[0], v1[1], v1[2], 1, 1, 1);
      this.debugVertices.push(v2[0], v2[1], v2[2], 1, 1, 1);
      this.debugVertices.push(v1[0], v1[1], v1[2], 1, 1, 1);
      this.debugVertices.push(v3[0], v3[1], v3[2], 1, 1, 1);
      this.debugVertices.push(v2[0], v2[1], v2[2], 1, 1, 1);
      this.debugVertices.push(v3[0], v3[1], v3[2], 1, 1, 1);
      this.debugVertexCount += 6;
    }
  }

  /**
   * Load asynchronously navmesh data from a binary file (bnm).
   * 
   * @param {string} path - The file path.
   */
  async loadFromBinaryFile(path: string): Promise<void> {
    const response = await fetch(path);
    const buffer = await response.arrayBuffer();
    // const data = new Float32Array(buffer);
    // let offset = 0;

    // const numVertices = data[0];
    // offset += 1;
  }

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    super.delete();
  }

  /**
   * The draw function.
   */
  draw(): void {
    if (this.debugEnabled) {
      gfx3DebugRenderer.drawVertices(this.debugVertices, this.debugVertexCount, this.getTransformMatrix());
    }

    gfx3ShadowVolumeRenderer.drawShadowVolume(this);
  }
}

export { Gfx3ShadowVolume };