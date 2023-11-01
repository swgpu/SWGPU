import { Gfx3Mesh } from './gfx3_mesh';

/**
 * The `Gfx3MeshJSM` class is a subclass of `Gfx3Mesh` that represents a static mesh and provides
 * methods for loading and updating.
 */
class Gfx3MeshJSM extends Gfx3Mesh {
  /**
   * The constructor.
   */
  constructor() {
    super();
  }

  /**
   * The "loadFromFile" function asynchronously loads static mesh data from a json file (jsm).
   * @param {string} path - The `path` parameter is the file path.
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
  }
}

export { Gfx3MeshJSM };