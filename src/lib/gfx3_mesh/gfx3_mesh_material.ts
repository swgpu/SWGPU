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
  ambient?: vec3;
  diffuse?: vec3;
  specular?: vec3;
  emissive?: vec3;
  texture?: Gfx3Texture;
  textureScrollAngle?: number;
  textureScrollRate?: number;
  displacementMap?: Gfx3Texture;
  displacementMapScrollAngle?: number;
  displacementMapScrollRate?: number;
  displacementMapFactor?: number;
  diffuseMap?: Gfx3Texture;
  specularMap?: Gfx3Texture;
  emissiveMap?: Gfx3Texture;
  normalMap?: Gfx3Texture;
  envMap?: Gfx3Texture;
  decalEnabled?: boolean;
  shadowEnabled?: boolean;
  shininess?: number;
  emissiveFactor?: number;
};

/**
 * The material of a surface.
 * It emit 'E_FINISHED' (on texture animation end)
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
  uvs: Float32Array;
  grp3: Gfx3StaticGroup;
  texture: Gfx3Texture;
  displacementMap: Gfx3Texture;
  diffuseMap: Gfx3Texture;
  specularMap: Gfx3Texture;
  emissiveMap: Gfx3Texture;
  normalMap: Gfx3Texture;
  envMap: Gfx3Texture;

  /**
   * @param {MATOptions} options - The options to configure the material.
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
    this.colors[15] = 0.0;
    this.params = this.grp2.setFloat(1, 'MAT_PARAMS', 15);
    this.params[0] = options.opacity ?? 1.0;
    this.params[1] = options.normalIntensity ?? 1.0;
    this.params[2] = options.lightning ? 1.0 : 0.0;
    this.params[3] = options.texture ? 1.0 : 0.0;
    this.params[4] = options.displacementMap ? 1.0 : 0.0;
    this.params[5] = options.displacementMapFactor ?? 0.0;
    this.params[6] = options.diffuseMap ? 1.0 : 0.0;
    this.params[7] = options.specularMap ? 1.0 : 0.0;
    this.params[8] = options.emissiveMap ? 1.0 : 0.0;
    this.params[9] = options.normalMap ? 1.0 : 0.0;
    this.params[10] = options.envMap ? 1.0 : 0.0;
    this.params[11] = options.decalEnabled ? 1.0 : 0.0;
    this.params[12] = options.shadowEnabled ? 1.0 : 0.0;
    this.params[13] = options.shininess ?? 0.0;
    this.params[14] = options.emissiveFactor ?? 1.0;
    this.uvs = this.grp2.setFloat(2, 'MAT_UVS', 6);

    this.grp3 = gfx3Manager.createStaticGroup('MESH_PIPELINE', 3);
    this.texture = this.grp3.setTexture(0, 'MAT_TEXTURE', options.texture ?? gfx3Manager.createTextureFromBitmap());
    this.displacementMap = this.grp3.setTexture(2, 'MAT_DISPLACEMENT_TEXTURE', options.displacementMap ?? gfx3Manager.createTextureFromBitmap());
    this.diffuseMap = this.grp3.setTexture(4, 'MAT_DIFFUSE_TEXTURE', options.diffuseMap ?? gfx3Manager.createTextureFromBitmap());
    this.specularMap = this.grp3.setTexture(6, 'MAT_SPECULAR_TEXTURE', options.specularMap ?? gfx3Manager.createTextureFromBitmap());
    this.emissiveMap = this.grp3.setTexture(8, 'MAT_EMISSIVE_TEXTURE', options.emissiveMap ?? gfx3Manager.createTextureFromBitmap());
    this.normalMap = this.grp3.setTexture(10, 'MAT_NORM_TEXTURE', options.normalMap ?? gfx3Manager.createTextureFromBitmap());
    this.envMap = this.grp3.setTexture(12, 'MAT_ENV_MAP_TEXTURE', options.envMap ?? gfx3Manager.createCubeMapFromBitmap(), { dimension: 'cube' });

    this.grp2.allocate();
    this.grp3.allocate();
  }

  /**
   * Load asynchronously data and create material from a json file (mat).
   * 
   * @param {string} path - The file path.
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
      diffuseMap: json['DiffuseMap'] ? await gfx3TextureManager.loadTexture(json['DiffuseMap']) : undefined,
      specularMap: json['SpecularMap'] ? await gfx3TextureManager.loadTexture(json['SpecularMap']) : undefined,
      emissiveMap: json['EmissiveMap'] ? await gfx3TextureManager.loadTexture(json['EmissiveMap']) : undefined,
      normalMap: json['NormalMap'] ? await gfx3TextureManager.loadTexture(json['NormalMap']) : undefined,
      envMap: json['EnvMap'] ? await gfx3TextureManager.loadTexture(json['EnvMap']) : undefined,
      decalEnabled: json['DecalEnabled'],
      shadowEnabled: json['ShadowEnabled'],
      shininess: json['Shininess'],
      emissiveFactor: json['EmissiveFactor']
    });
  }

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    this.grp2.delete();
    this.grp3.delete();
  }

  /**
   * The update function.
   */
  update(ts: number): void {
    if (this.textureScrollRate != 0) {
      this.uvs[0] += Math.cos(this.textureScrollAngle) * this.textureScrollRate * (ts / 1000);
      this.uvs[1] += Math.sin(this.textureScrollAngle) * this.textureScrollRate * (ts / 1000);
      this.dataChanged = true;
    }

    if (this.displacementMapScrollRate != 0) {
      this.uvs[4] += Math.cos(this.displacementMapScrollAngle) * this.displacementMapScrollRate * (ts / 1000);
      this.uvs[5] += Math.sin(this.displacementMapScrollAngle) * this.displacementMapScrollRate * (ts / 1000);
      this.dataChanged = true;
    }

    if (!this.currentAnimation) {
      return;
    }

    const currentFrame = this.currentAnimation.frames[this.currentAnimationFrameIndex];
    this.uvs[2] = currentFrame.offsetX / this.texture.gpuTexture.width;
    this.uvs[3] = currentFrame.offsetY / this.texture.gpuTexture.height;
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
   * Play a specific animation.
   * 
   * @param {string} animationName - The name of the animation to be played.
   * @param {boolean} [looped=false] - Determines whether the animation should loop or not.
   * @param {boolean} [preventSameAnimation=false] - Determines whether the same animation should be prevented from playing again.
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
   * Stop animation and set current animation to null.
   */
  resetAnimation(): void {
    this.currentAnimation = null;
    this.uvs[2] = 0.0;
    this.uvs[3] = 0.0;
    this.dataChanged = true;
  }

  /**
   * Sets the opacity value.
   * 
   * @param {number} opacity - The opacity (from 0 to 1).
   */
  setOpacity(opacity: number): void {
    this.params[0] = opacity;
    this.dataChanged = true;
  }

  /**
   * Set the normal bumping intensity.
   * 
   * @param {number} normalIntensity - The normal intensity.
   */
  setNormalIntensity(normalIntensity: number): void {
    this.params[1] = normalIntensity;
    this.dataChanged = true;
  }

  /**
   * Set the lightning flag.
   * 
   * @param {boolean} lightning - Indicates if light is applied or not to the material.
   */
  setLightning(lightning: boolean): void {
    this.params[2] = lightning ? 1.0 : 0.0;
    this.dataChanged = true;
  }

  /**
   * Set the emissive color.
   * It is the color that the object emit.
   * 
   * @param {number} r - The red component.
   * @param {number} g - The green component.
   * @param {number} b - The blue component.
   * @param {number} a - The emissive factor.
   */
  setEmissive(r: number, g: number, b: number, a: number): void {
    this.colors[0] = r;
    this.colors[1] = g;
    this.colors[2] = b;
    this.colors[3] = a;
    this.dataChanged = true;
  }

  /**
   * Set the ambient color (see phong).
   * It is the color of the object on it's shadow parts.
   * 
   * @param {number} r - The red component.
   * @param {number} g - The green component.
   * @param {number} b - The blue component.
   */
  setAmbient(r: number, g: number, b: number): void {
    this.colors[4] = r;
    this.colors[5] = g;
    this.colors[6] = b;
    this.dataChanged = true;
  }

  /**
   * Set the diffuse color (see phong).
   * It is the color of the object on it's lightning parts.
   * 
   * @param {number} r - The red component.
   * @param {number} g - The green component.
   * @param {number} b - The blue component.
   */
  setDiffuse(r: number, g: number, b: number): void {
    this.colors[8] = r;
    this.colors[9] = g;
    this.colors[10] = b;
    this.dataChanged = true;
  }

  /**
   * Set the specular color (see phong).
   * It is the color of the object on it's lightning and eye-oriented parts.
   * 
   * @param {number} r - The red component.
   * @param {number} g - The green component.
   * @param {number} b - The blue component.
   */
  setSpecular(r: number, g: number, b: number): void {
    this.colors[12] = r;
    this.colors[13] = g;
    this.colors[14] = b;
    this.dataChanged = true;
  }

  /**
   * Set the specular intensity.
   * It determines how much light is reflected off the surface (from 0 to 1).
   * 
   * @param {number} specularity - The level of specularity or shininess.
   */
  setSpecularity(specularity: number): void {
    this.colors[15] = specularity;
    this.dataChanged = true;
  }

  /**
   * Set the texture.
   * 
   * @param {Gfx3Texture} texture - The texture.
   * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
   * @param {number} [rate=0] - The scrolling rate of the texture.
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
   * Set the displacement texture map.
   * It is used to displace pixels of the texture base. It is ideal for water shallow effect, magma etc...
   * 1. White pixel of this texture force pixel of the albedo texture to move in the top-left direction.
   * 2. Grey don't move pixels.
   * 3. Black pixel of this texture force pixel of the albedo texture to move in the bottom-right direction.
   * 
   * @param {Gfx3Texture} displacementMap - The displacement map texture.
   * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
   * @param {number} [rate=0] - The scrolling rate of the texture.
   * @param {number} [factor=0] - The strength or intensity of the displacement effect.
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
   * Set the diffuse texture map.
   * 
   * @param {Gfx3Texture} diffuseMap - The diffuse texture map.
   */
  setDiffuseMap(diffuseMap: Gfx3Texture): void {
    this.diffuseMap = diffuseMap;
    this.params[6] = 1;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * Set the specular texture map.
   * 
   * @param {Gfx3Texture} specularMap - The specular texture map.
   */
  setSpecularMap(specularMap: Gfx3Texture): void {
    this.specularMap = specularMap;
    this.params[7] = 1;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * Set the emissive texture map.
   * 
   * @param {Gfx3Texture} emissiveMap - The emissive texture map.
   */
  setEmissiveMap(emissiveMap: Gfx3Texture): void {
    this.emissiveMap = emissiveMap;
    this.params[8] = 1;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * Set a normal texture map.
   * 
   * @param {Gfx3Texture} normalMap - The normal texture map.
   */
  setNormalMap(normalMap: Gfx3Texture): void {
    this.normalMap = normalMap;
    this.params[9] = 1;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * Set the environment texture map.
   * 
   * @param {Gfx3Texture} envMap - The env texture map.
   */
  setEnvMap(envMap: Gfx3Texture): void {
    this.envMap = envMap;
    this.params[10] = 1;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * Enable decals on the material surface.
   * 
   * @param {boolean} enabled - Indicating whether decals should be enabled or disabled.
   */
  enableDecal(enabled: boolean): void {
    this.params[11] = enabled ? 1.0 : 0.0;
    this.dataChanged = true;
  }

  /**
   * Enable shadow on the material surface.
   * 
   * @param {boolean} enabled - Indicating whether the shadow should be enabled or disabled.
   */
  enableShadow(enabled: boolean): void {
    this.params[12] = enabled ? 1.0 : 0.0;
    this.dataChanged = true;
  }

  /**
   * Set the specular shininess.
   * 
   * @param {number} shininess - The shininess/specularity value (0-1)
   */
  setShininess(shininess: number): void {
    this.params[13] = shininess;
    this.dataChanged = true;
  }

  /**
   * Set the emissive factor.
   * 
   * @param {number} emissiveFactor - The factor of emission color (0-1)
   */
  setEmissiveFactor(emissiveFactor: number): void {
    this.params[14] = emissiveFactor;
    this.dataChanged = true;
  }

  /**
   * Returns the bindgroup(2).
   */
  getGroup02(): Gfx3StaticGroup {
    if (this.dataChanged) {
      this.grp2.beginWrite();
      this.grp2.write(0, this.colors);
      this.grp2.write(1, this.params);
      this.grp2.write(2, this.uvs);
      this.grp2.endWrite();
      this.dataChanged = false;
    }

    return this.grp2;
  }

  /**
   * Returns the bingroup(3).
   */
  getGroup03(): Gfx3StaticGroup {
    if (this.texturesChanged) {
      this.grp3.setTexture(0, 'MAT_TEXTURE', this.texture);
      this.grp3.setTexture(2, 'MAT_DISPLACEMENT_TEXTURE', this.displacementMap);
      this.grp3.setTexture(4, 'MAT_DIFFUSE_TEXTURE', this.diffuseMap);
      this.grp3.setTexture(6, 'MAT_SPECULAR_TEXTURE', this.specularMap);
      this.grp3.setTexture(8, 'MAT_EMISSIVE_TEXTURE', this.emissiveMap);
      this.grp3.setTexture(10, 'MAT_NORM_TEXTURE', this.normalMap);
      this.grp3.setTexture(12, 'MAT_ENV_MAP_TEXTURE', this.envMap, { dimension: 'cube' });
      this.grp3.allocate();
      this.texturesChanged = false;
    }

    return this.grp3;
  }
 
  /**
   * Returns the albedo texture.
   */
  getTexture(): Gfx3Texture {
    return this.texture;
  }

  /**
   * Returns the displacement texture map.
   */
  getDisplacementMap(): Gfx3Texture {
    return this.displacementMap;
  }

  /**
   * Returns the diffuse texture map.
   */
  getDiffuseMap(): Gfx3Texture {
    return this.diffuseMap;
  }

  /**
   * Returns the specularity texture map.
   */
  getSpecularMap(): Gfx3Texture {
    return this.specularMap;
  }

  /**
   * Returns the emissive texture map.
   */
  getEmissiveMap(): Gfx3Texture {
    return this.emissiveMap;
  }

  /**
   * Returns the normal texture map.
   */
  getNormalMap(): Gfx3Texture {
    return this.normalMap;
  }

  /**
   * Returns the environment texture map.
   */
  getEnvMap(): Gfx3Texture {
    return this.envMap;
  }
}

export { Gfx3Material };