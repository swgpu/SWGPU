import { eventManager } from '../core/event_manager.js';
import { gfx3TextureManager } from '../gfx3/gfx3_texture_manager';
import { gfx3Manager } from '../gfx3/gfx3_manager';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Texture } from '../gfx3/gfx3_texture';

interface MATFrame {
  offsetX: number;
  offsetY: number;
};

interface MATAnimation {
  name: string;
  frames: Array<MATFrame>;
  frameDuration: number;
};

interface MATOptions {
  animations?: Array<MATAnimation>;
  opacity?: number;
  normalIntensity?: number;
  lightning?: boolean;
  emissive?: vec3;
  ambient?: vec3;
  diffuse?: vec3;
  specular?: vec4;
  texture?: Gfx3Texture;
  textureScrollAngle?: number;
  textureScrollRate?: number;
  displacementMap?: Gfx3Texture;
  displacementMapScrollAngle?: number;
  displacementMapScrollRate?: number;
  displacementMapFactor?: number;
  specularityMap?: Gfx3Texture;
  normalMap?: Gfx3Texture;
  envMap?: Gfx3Texture;
  decalEnabled?: boolean;
};

/**
 * The `Gfx3Material` class represents the material of a surface and provides method for controlling
 * texture, light reflection, uv animation, texture scrolling, texture displacement, environment reflection
 * and opacity of a surface. It used the phong illumination model for a full-artistic freedom.
 */
class Gfx3Material {
  animations: Array<MATAnimation>;
  currentAnimation: MATAnimation | null;
  currentAnimationFrameIndex: number;
  looped: boolean;
  frameProgress: number;
  dataChanged: boolean;
  texturesChanged: boolean;
  textureScrollAngle: number;
  textureScrollRate: number;
  displacementMapScrollAngle: number;
  displacementMapScrollRate: number;
  grp2: Gfx3StaticGroup;
  colors: Float32Array;
  params: Float32Array;
  grp3: Gfx3StaticGroup;
  texture: Gfx3Texture;
  displacementMap: Gfx3Texture;
  specularityMap: Gfx3Texture;
  normalMap: Gfx3Texture;
  envMap: Gfx3Texture;

  /**
   * The constructor.
   * @param {MATOptions} options - The `options` parameter is an object that contains various properties
   * for configuring the material.
   */
  constructor(options: MATOptions) {
    this.animations = options.animations ?? [];
    this.currentAnimation = null;
    this.currentAnimationFrameIndex = 0;
    this.looped = false;
    this.frameProgress = 0;
    this.dataChanged = true;
    this.texturesChanged = false;
    this.textureScrollAngle = options.textureScrollAngle ?? 0;
    this.textureScrollRate = options.textureScrollRate ?? 0;
    this.displacementMapScrollAngle = options.displacementMapScrollAngle ?? 0;
    this.displacementMapScrollRate = options.displacementMapScrollRate ?? 0;

    this.grp2 = gfx3Manager.createStaticGroup('MESH_PIPELINE', 2);
    this.colors = this.grp2.setFloat(0, 'MAT_COLORS', 16);
    this.colors[0] = options.emissive ? options.emissive[0] : 0.0;
    this.colors[1] = options.emissive ? options.emissive[1] : 0.0;
    this.colors[2] = options.emissive ? options.emissive[2] : 0.0;
    this.colors[3] = 0.0;
    this.colors[4] = options.ambient ? options.ambient[0] : 0.5;
    this.colors[5] = options.ambient ? options.ambient[1] : 0.5;
    this.colors[6] = options.ambient ? options.ambient[2] : 0.5;
    this.colors[7] = 0.0;
    this.colors[8] = options.diffuse ? options.diffuse[0] : 1.0;
    this.colors[9] = options.diffuse ? options.diffuse[1] : 1.0;
    this.colors[10] = options.diffuse ? options.diffuse[2] : 1.0;
    this.colors[11] = 0.0;
    this.colors[12] = options.specular ? options.specular[0] : 0.0;
    this.colors[13] = options.specular ? options.specular[1] : 0.0;
    this.colors[14] = options.specular ? options.specular[2] : 0.0;
    this.colors[15] = options.specular ? options.specular[3] : 0.0;
    this.params = this.grp2.setFloat(1, 'MAT_PARAMS', 16);
    this.params[0] = options.opacity ?? 1.0;
    this.params[1] = options.normalIntensity ?? 1.0;
    this.params[2] = options.lightning ? 1.0 : 0.0;
    this.params[3] = options.texture ? 1.0 : 0.0;
    this.params[4] = options.displacementMap ? 1.0 : 0.0;
    this.params[5] = options.displacementMapFactor ?? 0.0;
    this.params[6] = options.specularityMap ? 1.0 : 0.0;
    this.params[7] = options.normalMap ? 1.0 : 0.0;
    this.params[8] = options.envMap ? 1.0 : 0.0;
    this.params[9] = options.decalEnabled ? 1.0 : 0.0;
    this.params[10] = 0.0;
    this.params[11] = 0.0;
    this.params[12] = 0.0;
    this.params[13] = 0.0;
    this.params[14] = 0.0;
    this.params[15] = 0.0;

    this.grp3 = gfx3Manager.createStaticGroup('MESH_PIPELINE', 3);
    this.texture = this.grp3.setTexture(0, 'MAT_TEXTURE', options.texture ?? gfx3Manager.createTextureFromBitmap());
    this.displacementMap = this.grp3.setTexture(2, 'MAT_DISPLACEMENT_TEXTURE', options.displacementMap ?? gfx3Manager.createTextureFromBitmap());
    this.specularityMap = this.grp3.setTexture(4, 'MAT_SPECULARITY_TEXTURE', options.specularityMap ?? gfx3Manager.createTextureFromBitmap());
    this.normalMap = this.grp3.setTexture(6, 'MAT_NORM_TEXTURE', options.normalMap ?? gfx3Manager.createTextureFromBitmap());
    this.envMap = this.grp3.setTexture(8, 'MAT_ENV_MAP_TEXTURE', options.envMap ?? gfx3Manager.createCubeMapFromBitmap(), { dimension: 'cube' });

    this.grp2.allocate();
    this.grp3.allocate();
  }

  /**
   * The "createFromFile" is a static function asynchronously loads and create material from a json file (mat).
   * @param {string} path - The `path` parameter is the file path.
   */
  static async createFromFile(path: string): Promise<Gfx3Material> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'MAT') {
      throw new Error('Gfx3Material::loadFromFile(): File not valid !');
    }

    const animations = new Array<MATAnimation>();
    for (const obj of json['Animations']) {
      const animation: MATAnimation = {
        name: obj['Name'],
        frames: [],
        frameDuration: parseInt(obj['FrameDuration'])
      };

      for (const objFrame of obj['Frames']) {
        animation.frames.push({
          offsetX: objFrame['OffsetX'],
          offsetY: objFrame['OffsetY']
        });
      }

      animations.push(animation);
    }

    return new Gfx3Material({
      animations: animations,
      opacity: json['Opacity'],
      normalIntensity: json['NormalIntensity'],
      lightning: json['Lightning'],
      emissive: json['Emissive'],
      ambient: json['Ambient'],
      diffuse: json['Diffuse'],
      specular: json['Specular'],
      texture: json['Texture'] ? await gfx3TextureManager.loadTexture(json['Texture']) : undefined,
      textureScrollAngle: json['TextureScrollAngle'],
      textureScrollRate: json['TextureScrollRate'],
      displacementMap: json['DisplacementMap'] ? await gfx3TextureManager.loadTexture(json['DisplacementMap']) : undefined,
      displacementMapScrollAngle: json['DisplacementMapScrollAngle'],
      displacementMapScrollRate: json['DisplacementMapScrollRate'],
      displacementMapFactor: json['DisplacementMapFactor'],
      specularityMap: json['SpecularityMap'] ? await gfx3TextureManager.loadTexture(json['SpecularityMap']) : undefined,
      normalMap: json['NormalMap'] ? await gfx3TextureManager.loadTexture(json['NormalMap']) : undefined,
      envMap: json['EnvMap'] ? await gfx3TextureManager.loadTexture(json['EnvMap']) : undefined,
      decalEnabled: json['DecalEnabled']
    });
  }

  /**
   * The "delete" function free all resources.
   * Warning: you need to call this method to free allocation for this object.
   */
  delete(): void {
    this.grp2.destroy();
    this.grp3.destroy();
  }

  /**
   * The "update" function.
   */
  update(ts: number): void {
    if (this.textureScrollRate != 0) {
      this.params[10] += Math.cos(this.textureScrollAngle) * this.textureScrollRate * (ts / 1000);
      this.params[11] += Math.sin(this.textureScrollAngle) * this.textureScrollRate * (ts / 1000);
      this.dataChanged = true;
    }

    if (this.displacementMapScrollRate != 0) {
      this.params[14] += Math.cos(this.displacementMapScrollAngle) * this.displacementMapScrollRate * (ts / 1000);
      this.params[15] += Math.sin(this.displacementMapScrollAngle) * this.displacementMapScrollRate * (ts / 1000);
      this.dataChanged = true;
    }

    if (!this.currentAnimation) {
      return;
    }

    const currentFrame = this.currentAnimation.frames[this.currentAnimationFrameIndex];
    this.params[12] = currentFrame.offsetX / this.texture.gpuTexture.width;
    this.params[13] = currentFrame.offsetY / this.texture.gpuTexture.height;
    this.dataChanged = true;

    if (this.frameProgress >= this.currentAnimation.frameDuration) {
      if (this.currentAnimationFrameIndex == this.currentAnimation.frames.length - 1) {
        eventManager.emit(this, 'E_FINISHED');
        this.currentAnimationFrameIndex = this.looped ? 0 : this.currentAnimation.frames.length - 1;
        this.frameProgress = 0;
      }
      else {
        this.currentAnimationFrameIndex = this.currentAnimationFrameIndex + 1;
        this.frameProgress = 0;
      }
    }
    else {
      this.frameProgress += ts;
    }
  }

  /**
   * The "playAnimation" function is used to start playing a specific uv animation, with options for looping and
   * preventing the same animation from being played again.
   * @param {string} animationName - The name of the animation to be played.
   * @param {boolean} [looped=false] - The `looped` parameter is a boolean that determines whether
   * the animation should loop or not.
   * @param {boolean} [preventSameAnimation=false] - The `preventSameAnimation` parameter is a boolean
   * flag that determines whether the same animation should be prevented from playing again.
   */
  playAnimation(animationName: string, looped: boolean = false, preventSameAnimation: boolean = false): void {
    if (preventSameAnimation && this.currentAnimation && animationName == this.currentAnimation.name) {
      return;
    }

    const animation = this.animations.find(animation => animation.name == animationName);
    if (!animation) {
      throw new Error('Gfx3Material::play: animation not found.');
    }

    this.currentAnimation = animation;
    this.currentAnimationFrameIndex = 0;
    this.looped = looped;
    this.frameProgress = 0;
  }

  /**
   * The "resetAnimation" function stop animation and set current animation to null.
   */
  resetAnimation(): void {
    this.currentAnimation = null;
    this.params[12] = 0.0;
    this.params[13] = 0.0;
    this.dataChanged = true;
  }

  /**
   * The "setOpacity" function sets the opacity of the material surface.
   * @param {number} opacity - The "opacity" determines how transparent or opaque the material should be.
   * The value ranges from 0 (completely transparent) to 1 (completely opaque).
   */
  setOpacity(opacity: number): void {
    this.params[0] = opacity;
    this.dataChanged = true;
  }

  /**
   * The "setNormalIntensity" function sets the normal bumping intensity of the material surface.
   * @param {number} normalIntensity - The `normalIntensity` increase or decrease the bumping effect.
   */
  setNormalIntensity(normalIntensity: number): void {
    this.params[1] = normalIntensity;
    this.dataChanged = true;
  }

  /**
   * The "setLightning" function sets the lightning boolean flag of the material surface.
   * @param {boolean} lightning - The "lightning" parameter is a boolean value that indicates if light is applied
   * or not to the material.
   */
  setLightning(lightning: boolean): void {
    this.params[2] = lightning ? 1.0 : 0.0;
    this.dataChanged = true;
  }

  /**
   * The "setEmissive" function sets the emissive color of the material surface.
   * It is the color that the object emit.
   * @param {number} r - The parameter "r" represents the red component.
   * @param {number} g - The parameter "g" represents the green component.
   * @param {number} b - The parameter "b" represents the blue component.
   */
  setEmissive(r: number, g: number, b: number): void {
    this.colors[0] = r;
    this.colors[1] = g;
    this.colors[2] = b;
    this.dataChanged = true;
  }

  /**
   * The "setAmbient" function sets the ambient color of the material surface.
   * It is the color of the object on it's shadow parts.
   * @param {number} r - The parameter "r" represents the red component.
   * @param {number} g - The parameter "g" represents the green component.
   * @param {number} b - The parameter "b" represents the blue component.
   */
  setAmbient(r: number, g: number, b: number): void {
    this.colors[4] = r;
    this.colors[5] = g;
    this.colors[6] = b;
    this.dataChanged = true;
  }

  /**
   * The "setDiffuse" function sets the diffuse color of the material surface.
   * It is the color of the object on it's lightning parts.
   * @param {number} r - The parameter "r" represents the red component.
   * @param {number} g - The parameter "g" represents the green component.
   * @param {number} b - The parameter "b" represents the blue component.
   */
  setDiffuse(r: number, g: number, b: number): void {
    this.colors[8] = r;
    this.colors[9] = g;
    this.colors[10] = b;
    this.dataChanged = true;
  }

  /**
   * The "setSpecular" function sets the specular color of the material surface.
   * It is the color of the object on it's lightning and eye-oriented parts.
   * @param {number} r - The parameter "r" represents the red component.
   * @param {number} g - The parameter "g" represents the green component.
   * @param {number} b - The parameter "b" represents the blue component.
   */
  setSpecular(r: number, g: number, b: number): void {
    this.colors[12] = r;
    this.colors[13] = g;
    this.colors[14] = b;
    this.dataChanged = true;
  }

  /**
   * The "setSpecularity" function sets the specular intensity of the material surface.
   * It determines how much light is reflected off the surface and can range
   * from 0 (no specularity) to 1 (maximum specularity).
   * @param {number} specularity - The specularity parameter is a number that represents the level of
   * specularity or shininess of the surface.
   */
  setSpecularity(specularity: number): void {
    this.colors[15] = specularity;
    this.dataChanged = true;
  }

  /**
   * The "setTexture" function sets the texture, texture scroll angle, and texture scroll rate of the material surface.
   * @param {Gfx3Texture} texture - The texture that will be applied to the material surface.
   * @param {number} [angle=0] - The `angle` parameter represents the angle at which the texture will be
   * scrolled. It is measured in radians.
   * @param {number} [rate=0] - The `rate` is used to specify the scrolling rate of the texture.
   * It determines how fast the texture will scroll when applied to a surface.
   */
  setTexture(texture: Gfx3Texture, angle: number = 0, rate: number = 0): void {
    this.texture = texture;
    this.textureScrollAngle = angle;
    this.textureScrollRate = rate;
    this.params[3] = 1;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * The "setDisplacementMap" function sets the displacement texture map, scroll angle, scroll rate, and factor
   * for the graphics effect. It is used to displace pixels of the texture base. It is ideal for water shallow effect, magma etc...
   * 1. White pixel of this texture force pixel of the albedo texture to move in the top-left direction.
   * 2. Grey don't move pixels.
   * 3. Black pixel of this texture force pixel of the albedo texture to move in the bottom-right direction.
   * @param {Gfx3Texture} displacementMap - The displacementMap texture.
   * @param {number} [angle=0] - The `angle` parameter represents the angle at which the texture will be
   * scrolled. It is measured in radians.
   * @param {number} [rate=0] - The `rate` is used to specify the scrolling rate of the texture.
   * It determines how fast the texture will scroll when applied to a surface.
   * @param {number} [factor=0] - The `factor` parameter in the setDisplacementMap function is used to
   * control the strength or intensity of the displacement effect. It determines how much the pixels of
   * the displacement map will affect the corresponding pixels of the target image. A higher factor value
   * will result in a more pronounced displacement effect.
   */
  setDisplacementMap(displacementMap: Gfx3Texture, angle: number = 0, rate: number = 0, factor: number = 0): void {
    this.displacementMap = displacementMap;
    this.displacementMapScrollAngle = angle;
    this.displacementMapScrollRate = rate;
    this.params[4] = 1;
    this.params[5] = factor;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * The "setSpecularityMap" function sets the specularity map texture of the material surface.
   * @param {Gfx3Texture} specularityMap - The specularityMap is a texture used for
   * controlling the specularity (shininess) of a material surface.
   */
  setSpecularityMap(specularityMap: Gfx3Texture): void {
    this.specularityMap = specularityMap;
    this.params[6] = 1;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * The "setNormalMap" function sets a normal map texture of the material surface.
   * @param {Gfx3Texture} normalMap - The normalMap is a texture used for controlling
   * the texture granularity and orientations by adding normals informations on it.
   */
  setNormalMap(normalMap: Gfx3Texture): void {
    this.normalMap = normalMap;
    this.params[7] = 1;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * The "setEnvMap" function sets the environment map texture of the material surface.
   * @param {Gfx3Texture} envMap - The envMap texture is used to set the environment reflection on the material surface.
   */
  setEnvMap(envMap: Gfx3Texture): void {
    this.envMap = envMap;
    this.params[8] = 1;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * The "enableDecal" function enable decals on the material surface.
   * @param {boolean} enabled - A boolean value indicating whether the decal should be enabled or
   * disabled.
   */
  enableDecal(enabled: boolean): void {
    this.params[9] = enabled ? 1.0 : 0.0;
  }

  /**
   * The "getGroup02" function returns the static group index 2.
   * @returns The static group.
   */
  getGroup02(): Gfx3StaticGroup {
    if (this.dataChanged) {
      this.grp2.beginWrite();
      this.grp2.write(0, this.colors);
      this.grp2.write(1, this.params);
      this.grp2.endWrite();
      this.dataChanged = false;
    }

    return this.grp2;
  }

  /**
   * The "getGroup03" function returns the static group index 3.
   * @returns The static group.
   */
  getGroup03(): Gfx3StaticGroup {
    if (this.texturesChanged) {
      this.grp3.setTexture(0, 'MAT_TEXTURE', this.texture);
      this.grp3.setTexture(2, 'MAT_DISPLACEMENT_TEXTURE', this.displacementMap);
      this.grp3.setTexture(4, 'MAT_SPECULARITY_TEXTURE', this.specularityMap);
      this.grp3.setTexture(6, 'MAT_NORM_TEXTURE', this.normalMap);
      this.grp3.setTexture(8, 'MAT_ENV_MAP_TEXTURE', this.envMap, { dimension: 'cube' });
      this.grp3.allocate();
      this.texturesChanged = false;
    }

    return this.grp3;
  }
 
  /**
   * The "getTexture" function returns the albedo texture.
   * @returns The albedo texture.
   */
  getTexture(): Gfx3Texture {
    return this.texture;
  }

  /**
   * The "getDisplacementMap" function returns the displacement map texture.
   * @returns The displacement map texture.
   */
  getDisplacementMap(): Gfx3Texture {
    return this.displacementMap;
  }

  /**
   * The "getSpecularityMap" function returns the specularity map texture.
   * @returns The specularity map texture.
   */
  getSpecularityMap(): Gfx3Texture {
    return this.specularityMap;
  }

  /**
   * The "getNormalMap" function returns the normal map texture.
   * @returns The normal map texture.
   */
  getNormalMap(): Gfx3Texture {
    return this.normalMap;
  }

  /**
   * The "getEnvMap" function returns the environment map texture.
   * @returns The environment map texture.
   */
  getEnvMap(): Gfx3Texture {
    return this.envMap;
  }
}

export { Gfx3Material };