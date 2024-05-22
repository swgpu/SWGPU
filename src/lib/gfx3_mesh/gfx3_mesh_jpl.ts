import { gfx3MeshRenderer } from './gfx3_mesh_renderer';
import { Gfx3Transformable } from '../gfx3/gfx3_transformable';

/**
 * A 3D point light.
 */
class Gfx3MeshJPL extends Gfx3Transformable {
  ambient: vec3;
  diffuse: vec3;
  specular: vec3;
  intensity: number;
  meshId: number;
  constant: number;
  linear: number;
  exp: number;

  constructor() {
    super();
    this.ambient = [0.3, 0.3, 0.3];
    this.diffuse = [0.7, 0.7, 0.7];
    this.specular = [1.0, 1.0, 1.0];
    this.intensity = 1.0;
    this.meshId = 0;
    this.constant = 1;
    this.linear = 0;
    this.exp = 0;
  }

  /**
   * Load asynchronously point light data from a json file (jpl).
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'JPL') {
      throw new Error('Gfx3MeshJPL::loadFromFile(): File not valid !');
    }

    this.position = json['Position'];
    this.ambient = json['AmbientColor'];
    this.diffuse = json['DiffuseColor'];
    this.specular = json['SpecularColor'];
    this.intensity = json['Intensity'];
    this.meshId = json['MeshID'];
    this.constant = json['Constant'];
    this.linear = json['Linear'];
    this.exp = json['Exp'];
  }

  /**
   * The draw function.
   */
  draw(): void {
    gfx3MeshRenderer.drawPointLight(
      this.position,
      this.ambient,
      this.diffuse,
      this.specular,
      this.intensity,
      this.meshId,
      this.constant,
      this.linear,
      this.exp
    );
  }

  /**
   * Set ambient color.
   * 
   * @param {number} r - The red channel.
   * @param {number} g - The green channel.
   * @param {number} b - The blue channel.
   */
  setAmbient(r: number, g: number, b: number): void {
    this.ambient[0] = r;
    this.ambient[1] = g;
    this.ambient[2] = b;
  }

  /**
   * Set diffuse color.
   * 
   * @param {number} r - The red channel.
   * @param {number} g - The green channel.
   * @param {number} b - The blue channel.
   */
  setDiffuse(r: number, g: number, b: number): void {
    this.diffuse[0] = r;
    this.diffuse[1] = g;
    this.diffuse[2] = b;
  }

  /**
   * Set specular color.
   * 
   * @param {number} r - The red channel.
   * @param {number} g - The green channel.
   * @param {number} b - The blue channel.
   */
  setSpecular(r: number, g: number, b: number): void {
    this.specular[0] = r;
    this.specular[1] = g;
    this.specular[2] = b;
  }

  /**
   * Set intensity value.
   * 
   * @param {number} intensity - The intensity value.
   */
  setIntensity(intensity: number): void {
    this.intensity = intensity;
  }

  /**
   * Set mesh id targeted.
   * Note: 0 affect all mesh
   * 
   * @param {number} meshId - The mesh id.
   */
  setMeshId(meshId: number): void {
    this.meshId = meshId;
  }

  /**
   * Set constant attenuation.
   * 
   * @param {number} constant - The constant value.
   */
  setConstant(constant: number): void {
    this.constant = constant;
  }

  /**
   * Set linear attenuation.
   * 
   * @param {number} linear - The linear value.
   */
  setLinear(linear: number): void {
    this.linear = linear;
  }

  /**
   * Set exp attenuation.
   * 
   * @param {number} exp - The exp value.
   */
  setExp(exp: number): void {
    this.exp = exp;
  }

  /**
   * Returns the ambient color.
   */
  getAmbient(): vec3 {
    return this.ambient;
  }

  /**
   * Returns the diffuse color.
   */
  getDiffuse(): vec3 {
    return this.diffuse;
  }

  /**
   * Returns the specular color.
   */
  getSpecular(): vec3 {
    return this.specular;
  }

  /**
   * Returns the intensity.
   */
  getIntensity(): number {
    return this.intensity;
  }

  /**
   * Returns the mesh id affected by the light.
   * Note: 0 affect all mesh
   */
  getMeshId(): number {
    return this.meshId;
  }

  /**
   * Returns the constant attenuation value.
   */
  getConstant(): number {
    return this.constant;
  }

  /**
   * Returns the linear attenuation value.
   */
  getLinear(): number {
    return this.linear;
  }

  /**
   * Returns the exponent attenuation value.
   */
  getExp(): number {
    return this.exp;
  }
}

export { Gfx3MeshJPL };