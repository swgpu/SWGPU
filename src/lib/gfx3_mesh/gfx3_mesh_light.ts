import { gfx3MeshRenderer } from './gfx3_mesh_renderer';
import { Gfx3Transformable } from '../gfx3/gfx3_transformable';

export enum LightType {
  POINT = 'POINT',
  SPOT = 'SPOT'
};

/**
 * A 3D light.
 */
class Gfx3MeshLight extends Gfx3Transformable {
  type: LightType;
  diffuse: vec3;
  specular: vec3;
  intensity: number;
  constant: number;
  linear: number;
  exp: number;
  radius: number;
  group: number;
  /* spot */
  cutoff: number;
  direction: vec3;

  constructor() {
    super();
    this.type = LightType.POINT;
    this.diffuse = [0.7, 0.7, 0.7];
    this.specular = [1.0, 1.0, 1.0];
    this.intensity = 1.0;
    this.constant = 1;
    this.linear = 0;
    this.exp = 0;
    this.radius = 10;
    this.group = 0;
    this.cutoff = 12.5;
    this.direction = [0, -1, 0];
  }

  /**
   * Load asynchronously point light data from a json file (jlt).
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'JLT') {
      throw new Error('Gfx3MeshLight::loadFromFile(): File not valid !');
    }

    this.position = json['Position'];
    this.type = json['Type'] == 'POINT' ? LightType.POINT : LightType.SPOT;
    this.diffuse = json['DiffuseColor'];
    this.specular = json['SpecularColor'];
    this.intensity = json['Intensity'];
    this.constant = json['Constant'];
    this.linear = json['Linear'];
    this.exp = json['Exp'];
    this.radius = json['Radius'];
    this.group = json['Group'];
    this.cutoff = json['Cutoff'];
    this.direction = json['Direction'];
  }

  /**
   * The draw function.
   */
  draw(): void {
    if (this.type == LightType.POINT) {
      gfx3MeshRenderer.drawPointLight(
        this.position,
        this.diffuse,
        this.specular,
        this.intensity,
        this.group,
        this.constant,
        this.linear,
        this.exp
      );
    }
    else {
      gfx3MeshRenderer.drawSpotLight(
        this.position,
        this.direction, 
        this.cutoff,
        this.diffuse,
        this.specular,
        this.intensity,
        this.group,
        this.constant,
        this.linear,
        this.exp
      );
    }
  }

  /**
   * Set the light type.
   * 
   * @param {LightType} type - The type.
   */
  setType(type: LightType): void {
    this.type = type;
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
   * Set radius value.
   * Note: radius is not directly used by the engine but is here
   * to let you deal with it if needed.
   * 
   * @param {number} radius - The radius.
   */
  setRadius(radius: number): void {
    this.radius = radius;
  }

  /**
   * Set group light identifier.
   * Note: 0 is the default group and will affect all mesh
   * 
   * @param {number} group - The group id.
   */
  setGroup(group: number): void {
    this.group = group;
  }

  /**
   * Set the spot cutoff angle.
   * 
   * @param {number} cutoff - The cutoff angle.
   */
  setCutoff(cutoff: number): void {
    this.cutoff = cutoff;
  }

  /**
   * Set the spot direction.
   * 
   * @param {number} x - The x direction.
   * @param {number} y - The y direction.
   * @param {number} z - The z direction.
   */
  setDirection(x: number, y: number, z: number): void {
    this.direction[0] = x;
    this.direction[1] = y;
    this.direction[2] = z;
  }

  /**
   * Returns the type.
   */
  getType(): LightType {
    return this.type;
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

  /**
   * Returns the influence radius.
   */
  getRadius(): number {
    return this.radius;
  }

  /**
   * Returns the group id.
   */
  getGroup(): number {
    return this.group;
  }

  /**
   * Returns the spot cutoff angle.
   */
  getCutoff(): number {
    return this.cutoff;
  }

  /**
   * Returns the spot direction.
   */
  getDirection(): vec3 {
    return this.direction;
  }
}

export { Gfx3MeshLight };