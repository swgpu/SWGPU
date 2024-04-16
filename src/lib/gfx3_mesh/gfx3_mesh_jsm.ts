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

    this.beginVertices(json['NumVertices']);
    this.setVertices(Gfx3Mesh.buildVertices(json['NumVertices'], json['Vertices'], json['TextureCoords'], json['Colors'], json['Normals']));
    this.endVertices();

    this.boundingBox = Gfx3BoundingBox.createFromVertices(json['Vertices'], 3);
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