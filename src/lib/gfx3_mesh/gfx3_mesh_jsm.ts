import { UT } from '../core/utils';
import { Poolable } from '../core/object_pool';
import { Gfx3BoundingBox } from '../gfx3/gfx3_bounding_box';
import { Gfx3Mesh } from './gfx3_mesh';

/**
 * A 3D static mesh.
 */
class Gfx3MeshJSM extends Gfx3Mesh implements Poolable<Gfx3MeshJSM> {
  constructor() {
    super();
  }

  /**
   * Load asynchronously static mesh data from a json file (jsm).
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'JSM') {
      throw new Error('Gfx3MeshJSM::loadFromFile(): File not valid !');
    }

    const geo = Gfx3Mesh.buildVertices(json['NumVertices'], json['Vertices'], json['TextureCoords'], json['Colors'], json['Normals']);

    this.beginVertices(json['NumVertices']);
    this.setVertices(geo.vertices);
    this.endVertices();

    this.geo = geo;
    this.boundingBox = Gfx3BoundingBox.createFromVertices(json['Vertices'], 3);
  }

  /**
   * Load asynchronously static mesh data from a binary file (bsm).
   * 
   * @param {string} path - The file path.
   */
  async loadFromBinaryFile(path: string): Promise<void> {
    const response = await fetch(path);
    const buffer = await response.arrayBuffer();
    const data = new Float32Array(buffer);
    let offset = 0;

    const header = new Int32Array(buffer);
    const numVertices = header[0];
    const numTextureCoords = header[1];
    const numNormals = header[2];
    const numColors = header[3];
    offset += 4;

    const vertices = [];
    for (let i = 0; i < numVertices * 3; i++) {
      vertices.push(data[offset]);
      offset++;
    }

    const textureCoords = [];
    for (let i = 0; i < numTextureCoords * 2; i++) {
      textureCoords.push(data[offset]);
      offset++;
    }  

    const normals = [];
    for (let i = 0; i < numNormals * 3; i++) {
      normals.push(data[offset]);
      offset++;
    }

    const colors = [];
    for (let i = 0; i < numColors * 3; i++) {
      colors.push(data[offset]);
      offset++;
    }

    this.beginVertices(numVertices);
    this.setVertices(Gfx3Mesh.buildVertices(numVertices, vertices, textureCoords, colors, normals));
    this.endVertices();

    this.boundingBox = Gfx3BoundingBox.createFromVertices(vertices, 3);
  }

  /**
   * Clone the object.
   * 
   * @param {Gfx3MeshJSM} jsm - The copy object.
   * @param {mat4} transformMatrix - The transformation matrix.
   */
  clone(jsm: Gfx3MeshJSM = new Gfx3MeshJSM(), transformMatrix: mat4 = UT.MAT4_IDENTITY()): Gfx3MeshJSM {
    super.clone(jsm, transformMatrix);
    return jsm;
  }
}

export { Gfx3MeshJSM };