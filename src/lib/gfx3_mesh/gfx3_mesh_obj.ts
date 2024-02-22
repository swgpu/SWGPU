import { gfx3TextureManager } from '../gfx3/gfx3_texture_manager';
import { gfx3DebugRenderer } from '../gfx3/gfx3_debug_renderer';
import { gfx3MeshRenderer } from '../gfx3_mesh/gfx3_mesh_renderer';
import { UT } from '../core/utils';
import { Gfx3Material } from './gfx3_mesh_material';
import { Gfx3Mesh, Group } from './gfx3_mesh';
import { Gfx3BoundingBox } from '../gfx3/gfx3_bounding_box';

class OBJObject {
  name: string;
  coords: Array<number>;
  colors: Array<number>;
  texcoords: Array<number>;
  normals: Array<number>;
  lines: Array<vec3>;
  groups: Array<Group>;
  materialName: string;
  vertexCount: number;

  constructor() {
    this.name = '';
    this.coords = new Array<number>();
    this.colors = new Array<number>();
    this.texcoords = new Array<number>();
    this.normals = new Array<number>();
    this.lines = new Array<vec3>();
    this.groups = new Array<Group>();
    this.materialName = '';
    this.vertexCount = 0;
  }
}

/**
 * A 3D obj wavefront mesh object.
 * Note: In fact this mesh is composed by multiple sub-meshes, one by "object".
 * So, you can choose to manipulate them individually or together with that top-level mesh.
 *
 * OBJ Options:
 * - Multiple meshes.
 * - Optionnal Vertex Normals
 * - Optionnal Vertex Colors
 * - Smooth Groups
 *
 * MTL Options:
 * - Kd => Diffuse
 * - Ks => Specular
 * - Ns => Specularity
 * - Ke => Emissive
 * - d  => Opacity
 * - map_Kd => Albedo map
 * - map_Ns => Specularity map
 * - map_Bump => Normal map
 */
class Gfx3MeshOBJ extends Gfx3Mesh {
  coords: Array<number>;
  colors: Array<number>;
  texcoords: Array<number>;
  normals: Array<number>;
  objects: Map<string, OBJObject>;
  materials: Map<string, Gfx3Material>;
  meshes: Map<string, Gfx3Mesh>;
  debugVertices: Array<number>;
  debugVertexCount: number;

  constructor() {
    super();
    this.coords = new Array<number>();
    this.colors = new Array<number>();
    this.texcoords = new Array<number>();
    this.normals = new Array<number>();
    this.objects = new Map<string, OBJObject>();
    this.materials = new Map<string, Gfx3Material>();
    this.meshes = new Map<string, Gfx3Mesh>();
    this.debugVertices = new Array<number>();
    this.debugVertexCount = 0;
  }

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete() {
    for (const mesh of this.meshes.values()) {
      mesh.delete(true);
    }

    for (const material of this.materials.values()) {
      material.delete();
    }

    super.delete();
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    for (const mesh of this.meshes.values()) {
      mesh.update(ts);
    }
  }

  /**
   * The draw function.
   */
  draw(): void {
    for (const mesh of this.meshes.values()) {
      const transform = UT.MAT4_MULTIPLY(this.getTransformMatrix(), mesh.getTransformMatrix());
      gfx3MeshRenderer.drawMesh(mesh, transform);
    }

    if (this.debugVertexCount > 0) {
      gfx3DebugRenderer.drawVertices(this.debugVertices, this.debugVertexCount, this.getTransformMatrix());
    }
  }

  /**
   * Load asynchronously data from obj and mtl files and build the mesh.
   * 
   * @param {string} objPath - The obj file path.
   * @param {string} mtlPath - The mtl file path.
   */
  async loadFromFile(objPath: string, mtlPath: string) {
    await this.$loadMaterials(mtlPath);
    await this.$loadObjects(objPath);
    this.$build();
  }

  /**
   * Returns the vertex count.
   */
  getVertexCount(): number {
    let vertexCount = 0;
    for (const mesh of this.meshes.values()) {
      vertexCount += mesh.getVertexCount();
    }

    return vertexCount;
  }

  /**
   * Returns the vertices.
   */
  getVertices(): Array<number> {
    let vertices = new Array<number>();
    for (const mesh of this.meshes.values()) {
      vertices.concat(mesh.getVertices());
    }

    return vertices;
  }

  /**
   * Returns mesh object with the specified name, or throws an error if the object doesn't exist.
   * 
   * @param {string} name - The name.
   */
  getMesh(name: string): Gfx3Mesh {
    if (!this.meshes.has(name)) {
      throw new Error('Gfx3MeshOBJ::getMesh(): The mesh object doesn\'t exist !');
    }

    return this.meshes.get(name)!;
  }

  /**
   * Returns all mesh objects.
   */
  getMeshes(): IterableIterator<Gfx3Mesh> {
    return this.meshes.values();
  }

  /**
   * Returns data object with the specified name, or throws an error if the object doesn't exist.
   * 
   * @param {string} name - The name.
   */
  getObject(name: string): OBJObject {
    if (!this.objects.has(name)) {
      throw new Error('Gfx3MeshOBJ::getObject(): The object doesn\'t exist !');
    }

    return this.objects.get(name)!;
  }

  /**
   * Returns the bounding box.
   */
  getBoundingBox(): Gfx3BoundingBox {
    const boxes = new Array<Gfx3BoundingBox>();

    for (const mesh of this.meshes.values()) {
      boxes.push(mesh.getBoundingBox());
    }

    return Gfx3BoundingBox.merge(boxes);
  }

  /**
   * Returns the bounding box in the world space coordinates.
   */
  getWorldBoundingBox(): Gfx3BoundingBox {
    const boxes = new Array<Gfx3BoundingBox>();

    for (const mesh of this.meshes.values()) {
      boxes.push(mesh.getWorldBoundingBox());
    }

    return Gfx3BoundingBox.merge(boxes);
  }

  /**
   * The "$loadMaterials" function asynchronously loads materials from a specified file (mtl).
   * @param {string} path - The `path` parameter is the `mtl` file path.
   */
  async $loadMaterials(path: string) {
    const response = await fetch(path);
    const text = await response.text();
    const lines = text.split('\n');

    this.materials.clear();

    let curMat = null;
    let curMatName = null;
    path = path.split('/').slice(0, -1).join('/') + '/';

    for (const line of lines) {
      if (line.startsWith('newmtl ')) {
        curMatName = line.substring(7);
        curMat = new Gfx3Material({ lightning: true });
        this.materials.set(curMatName, curMat);
      }

      if (!curMat) {
        continue;
      }

      if (line.startsWith('Kd ')) {
        const a = line.substring(3).split(' ');
        const r = parseFloat(a[0]);
        const g = parseFloat(a[1]);
        const b = parseFloat(a[2]);
        curMat.setDiffuse(r, g, b);
      }

      if (line.startsWith('Ks ')) {
        const a = line.substring(3).split(' ');
        const r = parseFloat(a[0]);
        const g = parseFloat(a[1]);
        const b = parseFloat(a[2]);
        curMat.setSpecular(r, g, b);
      }

      if (line.startsWith('Ns ')) {
        const a = line.substring(3);;
        curMat.setSpecularity(parseFloat(a));
      }

      if (line.startsWith('d')) {
        const a = line.substring(1);
        curMat.setOpacity(parseFloat(a));
      }

      if (line.startsWith('Ke ')) {
        const a = line.substring(3).split(' ');
        const r = parseFloat(a[0]);
        const g = parseFloat(a[1]);
        const b = parseFloat(a[2]);
        curMat.setEmissive(r, g, b);
      }

      if (line.startsWith('map_Kd ')) {
        const a = line.substring(7);
        curMat.setTexture(await gfx3TextureManager.loadTexture(path + a));
      }

      if (line.startsWith('map_Ns ')) {
        const a = line.substring(7);
        curMat.setSpecularityMap(await gfx3TextureManager.loadTexture8bit(path + a));
      }

      if (line.startsWith('map_Bump ')) {
        const a = line.split(' ');
        let i = 1;

        while (a[i][0] == '-') {
          const flag = a[i].substring(1);
          if (flag == 'bm') {
            curMat.setNormalIntensity(parseFloat(a[i + 1]));
          }

          i++;
        }

        const url = a.join(' ');
        curMat.setNormalMap(await gfx3TextureManager.loadTexture(path + url));
      }
    }
  }

  /**
   * The "$loadObjects" function asynchronously loads objects from a specified file (obj).
   * @param {string} path - The `path` parameter is the `obj` file path.
   */
  async $loadObjects(path: string): Promise<void> {
    const response = await fetch(path);
    const text = await response.text();
    const lines = text.split('\n');

    this.coords = [];
    this.colors = [];
    this.texcoords = [];
    this.normals = [];
    this.objects.clear();

    let currentGroup: Group = { name: 'default', faces: [], vertexCount: 0 };
    let currentSmoothGroup = 0;
    let currentObject = new OBJObject();
    currentObject.groups = [currentGroup];

    for (const line of lines) {
      if (line.startsWith('o ')) {
        const object = new OBJObject();
        object.name = line.substring(2);
        object.groups = [{ name: 'default', faces: [], vertexCount: 0 }];
        currentObject = object;
        currentGroup = object.groups[0];
        this.objects.set(object.name, object);
      }

      if (line.startsWith('usemtl ')) {
        currentObject.materialName = line.substring(7);
      }

      if (line.startsWith('v ')) {
        const a = line.substring(2).split(' ');
        const x = parseFloat(a[0]);
        const y = parseFloat(a[1]);
        const z = parseFloat(a[2]);
        this.coords.push(x, y, z);
        currentObject.coords.push(x, y, z);

        if (a.length > 3) {
          const r = parseFloat(a[3]);
          const g = parseFloat(a[4]);
          const b = parseFloat(a[5]);
          this.colors.push(r, g, b);
          currentObject.colors.push(r, g, b);
        }
      }

      if (line.startsWith('vt ')) {
        const a = line.substring(3).split(' ');
        const u = parseFloat(a[0]);
        const v = 1 - parseFloat(a[1]);
        this.texcoords.push(u, v);
        currentObject.texcoords.push(u, v);
      }

      if (line.startsWith('vn ')) {
        const a = line.substring(3).split(' ');
        const x = parseFloat(a[0]);
        const y = parseFloat(a[1]);
        const z = parseFloat(a[2]);
        this.normals.push(x, y, z);
        currentObject.normals.push(x, y, z);
      }

      if (line.startsWith('s ')) {
        const a = line.substring(2);
        currentSmoothGroup = parseInt(a);
      }

      if (line.startsWith('g ')) {
        const a = line.substring(2);
        const group = currentObject.groups.find(g => g.name == a);

        if (group) {
          currentGroup = group;
        }
        else {
          const newGroup: Group = { name: a, faces: [], vertexCount: 0 };
          currentObject.groups.push(newGroup);
          currentGroup = newGroup;
        }
      }

      if (line.startsWith('f ')) {
        const a = line.substring(2).split(' ');
        if (a.length > 3) {
          throw new Error('Gfx3MeshOBJ::loadObjects(): No support of quad faces !');
        }

        const va = a[0].split('/');
        const vb = a[1].split('/');
        const vc = a[2].split('/');

        currentGroup.faces.push({
          v: [parseInt(va[0]) - 1, parseInt(vb[0]) - 1, parseInt(vc[0]) - 1],
          t: [parseInt(va[1]) - 1, parseInt(vb[1]) - 1, parseInt(vc[1]) - 1],
          n: [parseInt(va[2]) - 1, parseInt(vb[2]) - 1, parseInt(vc[2]) - 1],
          smoothGroup: currentSmoothGroup
        });

        currentGroup.vertexCount += 3;
        currentObject.vertexCount += 3;
      }

      if (line.startsWith('l ')) {
        const a = line.substring(2).split(' ');
        const ax = this.coords[(parseInt(a[0]) - 1) * 3 + 0];
        const ay = this.coords[(parseInt(a[0]) - 1) * 3 + 1];
        const az = this.coords[(parseInt(a[0]) - 1) * 3 + 2];
        const bx = this.coords[(parseInt(a[1]) - 1) * 3 + 0];
        const by = this.coords[(parseInt(a[1]) - 1) * 3 + 1];
        const bz = this.coords[(parseInt(a[1]) - 1) * 3 + 2];
        currentObject.lines.push([ax, ay, az]);
        currentObject.lines.push([bx, by, bz]);
        currentObject.vertexCount += 2;
      }
    }
  }

  $build(): void {
    this.meshes.clear();
    this.debugVertices = [];
    this.debugVertexCount = 0;

    for (const object of this.objects.values()) {
      if (object.lines.length > 0) {
        for (const line of object.lines) {
          this.debugVertices.push(line[0], line[1], line[2], 1, 1, 1);
          this.debugVertexCount++;
        }
      }
      else {
        const mesh = new Gfx3Mesh();
        const material = this.materials.get(object.materialName);
        if (material) {
          mesh.setMaterial(material);
        }

        const texcoords = object.texcoords.length > 0 ? this.texcoords : undefined; // texcoords are optionnals
        const normals = object.normals.length > 0 ? this.normals : undefined; // normals are optionnals
        const colors = object.colors.length > 0 ? this.colors : undefined; // colors are optionnals

        mesh.beginVertices(object.vertexCount);
        mesh.setVertices(Gfx3Mesh.buildVertices(object.vertexCount, this.coords, texcoords, colors, normals, object.groups));
        mesh.endVertices();
        this.meshes.set(object.name, mesh);  
      }
    }
  }
}

export { Gfx3MeshOBJ };