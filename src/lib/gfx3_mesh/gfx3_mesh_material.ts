import { eventManager } from '../core/event_manager';
import { gfx3TextureManager } from '../gfx3/gfx3_texture_manager';
import { gfx3Manager } from '../gfx3/gfx3_manager';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { MAT_PARAMS_VARS } from './gfx3_mesh_shader';

enum TextureTarget {
  TEXTURE = 'Texture',
  SECONDARY_TEXTURE = 'SecondaryTexture',
  DISPLACEMENT_TEXTURE = 'DisplacementTexture',
  DISSOLVE_TEXTURE = 'DissolveTexture'
};

interface MATFlipbook {
  textureTarget: TextureTarget;
  frameWidth: number;
  frameHeight: number;
  numCol: number;
  numRow: number;
  numFrames: number;
  frameDuration: number;
};

interface MATOptions {
  flipbooks?: Array<MATFlipbook>;
  id?: number;
  normalIntensity?: number;
  lightning?: boolean;
  lightGroup?: number;
  ambient?: vec3;
  diffuse?: vec3;
  specular?: vec3;
  emissive?: vec3;
  blend?: vec4;
  dissolveGlow?: vec3;
  texture?: Gfx3Texture;
  textureScrollAngle?: number;
  textureScrollRate?: number;
  textureScale?: vec2,
  textureBlendMode?: 'mul' | 'add';
  secondaryTexture?: Gfx3Texture;
  secondaryTextureScrollAngle?: number;
  secondaryTextureScrollRate?: number;
  secondaryTextureScale?: vec2;
  secondaryTextureBlendMode?: 'mul' | 'mix';
  displacementMap?: Gfx3Texture;
  displacementMapScrollAngle?: number;
  displacementMapScrollRate?: number;
  displacementMapFactor?: number;
  displacementMapScale?: vec2;
  toonLightDir?: vec3;
  diffuseMap?: Gfx3Texture;
  specularMap?: Gfx3Texture;
  emissiveMap?: Gfx3Texture;
  normalMap?: Gfx3Texture;
  envMap?: Gfx3Texture;
  toonMap?: Gfx3Texture;
  dissolveTexture?: Gfx3Texture;
  dissolveGlowRange?: number;
  dissolveGlowFalloff?: number;
  dissolveAmount?: number;
  dissolveTextureScrollAngle?: number;
  dissolveTextureScrollRate?: number;
  dissolveTextureScale?: vec2;
  decalEnabled?: boolean;
  shadowEnabled?: boolean;
  shininess?: number;
  emissiveFactor?: number;
  toonBlending?: number;
  facingAlphaBlend?: number;
  distanceAlphaBlend?: number;
  sParams?: Array<{name: string, value: number }>;
  s0Texture?: Gfx3Texture;
  s1Texture?: Gfx3Texture;
  decalGroup?: number;
  effects?: number;
};

interface Animation {
  flipbook: MATFlipbook;
  currentFrameIndex: number;
  looped: boolean;
  frameProgress: number;
  uvsIndexes: [number, number];
};

/**
 * The surface material.
 * It emit 'E_FINISHED' (on texture animation end)
 */
class Gfx3Material {
  flipbooks: Array<MATFlipbook>;
  animations: Map<TextureTarget, Animation>;
  dataChanged: boolean;
  texturesChanged: boolean;
  grp2: Gfx3StaticGroup;
  colors: Float32Array;
  params: Float32Array;
  uvs: Float32Array;
  toonLightDir: Float32Array;
  jamInfos: Float32Array;
  grp3: Gfx3StaticGroup;
  texture: Gfx3Texture;
  secondaryTexture: Gfx3Texture;
  displacementMap: Gfx3Texture;
  diffuseMap: Gfx3Texture;
  specularMap: Gfx3Texture;
  emissiveMap: Gfx3Texture;
  normalMap: Gfx3Texture;
  envMap: Gfx3Texture;
  toonMap: Gfx3Texture;
  dissolveTexture: Gfx3Texture;
  s0Texture: Gfx3Texture;
  s1Texture: Gfx3Texture;
  jamFrames: Float32Array;
  jamFramesChanged: boolean;

  /**
   * @param {MATOptions} options - The options to configure the material.
   */
  constructor(options: MATOptions) {
    this.flipbooks = options.flipbooks ?? [];
    this.animations = new Map<TextureTarget, Animation>();
    this.dataChanged = true;
    this.texturesChanged = false;
    this.jamFramesChanged = false;

    this.grp2 = gfx3Manager.createStaticGroup('MESH_PIPELINE', 2);
    this.colors = this.grp2.setFloat(0, 'MAT_COLORS', 24);
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
    this.colors[16] = options.blend ? options.blend[0] : 1.0;
    this.colors[17] = options.blend ? options.blend[1] : 1.0;
    this.colors[18] = options.blend ? options.blend[2] : 1.0;
    this.colors[19] = options.blend ? options.blend[3] : 1.0;
    this.colors[20] = options.dissolveGlow ? options.dissolveGlow[0] : 1.0;
    this.colors[21] = options.dissolveGlow ? options.dissolveGlow[1] : 1.0;
    this.colors[22] = options.dissolveGlow ? options.dissolveGlow[2] : 1.0;
    this.colors[23] = 0.0;

    this.params = this.grp2.setFloat(1, 'MAT_PARAMS', 46);
    this.params[0] = options.id ?? 0;
    this.params[1] = options.normalIntensity ?? 1.0;
    this.params[2] = options.lightning ? 1.0 : 0.0;
    this.params[3] = options.texture ? 1.0 : 0.0;
    this.params[4] = options.secondaryTexture ? (options.secondaryTextureBlendMode == 'mul' ? 1.0 : 2.0) : 0.0;
    this.params[5] = options.displacementMap ? 1.0 : 0.0;
    this.params[6] = options.displacementMapFactor ?? 0.0;
    this.params[7] = options.diffuseMap ? 1.0 : 0.0;
    this.params[8] = options.specularMap ? 1.0 : 0.0;
    this.params[9] = options.emissiveMap ? 1.0 : 0.0;
    this.params[10] = options.normalMap ? 1.0 : 0.0;
    this.params[11] = options.envMap ? 1.0 : 0.0;
    this.params[12] = options.toonMap ? 1.0 : 0.0;
    this.params[13] = options.dissolveTexture ? 1.0 : 0.0;
    this.params[14] = options.dissolveGlowRange ?? 0.0;
    this.params[15] = options.dissolveGlowFalloff ?? 0.0;
    this.params[16] = options.dissolveAmount ?? 0.5;
    this.params[17] = options.decalEnabled ? 1.0 : 0.0;
    this.params[18] = options.shadowEnabled ? 1.0 : 0.0;
    this.params[19] = options.shininess ?? 0.0;
    this.params[20] = options.emissiveFactor ?? 1.0;
    this.params[21] = options.toonBlending ?? 1.0;
    this.params[22] = options.facingAlphaBlend ?? 1.0;
    this.params[23] = options.distanceAlphaBlend ?? 0.0;
    this.params[24] = options.s0Texture ? 1.0 : 0.0;
    this.params[25] = options.s1Texture ? 1.0 : 0.0;
    this.params[26] = options.textureBlendMode ? (options.textureBlendMode == 'mul' ? 1.0 : 2.0) : 1.0;
    this.params[27] = options.lightGroup ?? 0;
    this.params[28] = options.decalGroup ?? 0;
    this.params[29] = options.effects ?? 0;

    if (options.sParams) {
      for (const sParam of options.sParams) {
        const paramIndex = Object.values(MAT_PARAMS_VARS).findIndex(n => n == sParam.name);
        if (paramIndex != -1) {
          this.params[30 + paramIndex] = sParam.value ?? 0.0;
        }
      }
    }

    this.uvs = this.grp2.setFloat(2, 'MAT_UVS', 24);
    this.uvs[0] = options.textureScrollAngle ? options.textureScrollAngle : 0.0;
    this.uvs[1] = options.textureScrollRate ? options.textureScrollRate : 0.0;
    this.uvs[2] = 0.0;
    this.uvs[3] = 0.0;
    this.uvs[4] = options.textureScale ? options.textureScale[0] : 1.0;
    this.uvs[5] = options.textureScale ? options.textureScale[1] : 1.0;
    this.uvs[6] = options.secondaryTextureScrollAngle ? options.secondaryTextureScrollAngle : 0.0;
    this.uvs[7] = options.secondaryTextureScrollRate ? options.secondaryTextureScrollRate : 0.0;
    this.uvs[8] = 0.0;
    this.uvs[9] = 0.0;
    this.uvs[10] = options.secondaryTextureScale ? options.secondaryTextureScale[0] : 1.0;
    this.uvs[11] = options.secondaryTextureScale ? options.secondaryTextureScale[1] : 1.0;
    this.uvs[12] = options.displacementMapScrollAngle ? options.displacementMapScrollAngle : 0.0;
    this.uvs[13] = options.displacementMapScrollRate ? options.displacementMapScrollRate : 0.0;
    this.uvs[14] = 0.0;
    this.uvs[15] = 0.0;
    this.uvs[16] = options.displacementMapScale ? options.displacementMapScale[0] : 1.0;
    this.uvs[17] = options.displacementMapScale ? options.displacementMapScale[1] : 1.0;
    this.uvs[18] = options.dissolveTextureScrollAngle ? options.dissolveTextureScrollAngle : 0.0;
    this.uvs[19] = options.dissolveTextureScrollRate ? options.dissolveTextureScrollRate : 0.0;
    this.uvs[20] = 0.0;
    this.uvs[21] = 0.0;
    this.uvs[22] = options.dissolveTextureScale ? options.dissolveTextureScale[0] : 1.0;
    this.uvs[23] = options.dissolveTextureScale ? options.dissolveTextureScale[1] : 1.0;

    this.toonLightDir = this.grp2.setFloat(3, 'MAT_TOON_LIGHT_DIR', 3);
    this.toonLightDir[0] = options.toonLightDir ? options.toonLightDir[0] : 0.0;
    this.toonLightDir[1] = options.toonLightDir ? options.toonLightDir[1] : 0.0;
    this.toonLightDir[2] = options.toonLightDir ? options.toonLightDir[2] : 0.0;

    this.jamInfos = this.grp2.setFloat(4, 'MAT_JAM_INFOS', 7);
    this.jamInfos[0] = 0.0;
    this.jamInfos[1] = 0.0;
    this.jamInfos[2] = 0.0;
    this.jamInfos[3] = 1.0;
    this.jamInfos[4] = 0.0;
    this.jamInfos[5] = 0.0;
    this.jamInfos[6] = 0.0;

    this.grp3 = gfx3Manager.createStaticGroup('MESH_PIPELINE', 3, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST);
    this.texture = this.grp3.setTexture(0, 'MAT_TEXTURE', options.texture ?? gfx3Manager.createTextureFromBitmap());
    this.texture = this.grp3.setSampler(1, 'MAT_SAMPLER', this.texture);
    this.secondaryTexture = this.grp3.setTexture(2, 'MAT_SECONDARY_TEXTURE', options.secondaryTexture ?? gfx3Manager.createTextureFromBitmap());
    this.secondaryTexture = this.grp3.setSampler(3, 'MAT_SECONDARY_SAMPLER', this.secondaryTexture);
    this.displacementMap = this.grp3.setTexture(4, 'MAT_DISPLACEMENT_TEXTURE', options.displacementMap ?? gfx3Manager.createTextureFromBitmap());
    this.displacementMap = this.grp3.setSampler(5, 'MAT_DISPLACEMENT_SAMPLER', this.displacementMap);
    this.diffuseMap = this.grp3.setTexture(6, 'MAT_DIFFUSE_TEXTURE', options.diffuseMap ?? gfx3Manager.createTextureFromBitmap());
    this.diffuseMap = this.grp3.setSampler(7, 'MAT_DIFFUSE_SAMPLER', this.diffuseMap);
    this.specularMap = this.grp3.setTexture(8, 'MAT_SPECULAR_TEXTURE', options.specularMap ?? gfx3Manager.createTextureFromBitmap());
    this.specularMap = this.grp3.setSampler(9, 'MAT_SPECULAR_SAMPLER', this.specularMap);
    this.emissiveMap = this.grp3.setTexture(10, 'MAT_EMISSIVE_TEXTURE', options.emissiveMap ?? gfx3Manager.createTextureFromBitmap());
    this.emissiveMap = this.grp3.setSampler(11, 'MAT_EMISSIVE_SAMPLER', this.emissiveMap);
    this.normalMap = this.grp3.setTexture(12, 'MAT_NORM_TEXTURE', options.normalMap ?? gfx3Manager.createTextureFromBitmap());
    this.normalMap = this.grp3.setSampler(13, 'MAT_NORM_SAMPLER', this.normalMap);
    this.envMap = this.grp3.setTexture(14, 'MAT_ENV_MAP_TEXTURE', options.envMap ?? gfx3Manager.createCubeMapFromBitmap(), { dimension: 'cube' });
    this.envMap = this.grp3.setSampler(15, 'MAT_ENV_MAP_SAMPLER', this.envMap);
    this.toonMap = this.grp3.setTexture(16, 'MAT_TOON_TEXTURE', options.toonMap ?? gfx3Manager.createTextureFromBitmap());
    this.toonMap = this.grp3.setSampler(17, 'MAT_TOON_SAMPLER', this.toonMap);
    this.dissolveTexture = this.grp3.setTexture(18, 'MAT_DISSOLVE_TEXTURE', options.dissolveTexture ?? gfx3Manager.createTextureFromBitmap());
    this.dissolveTexture = this.grp3.setSampler(19, 'MAT_DISSOLVE_SAMPLER', this.dissolveTexture);
    this.s0Texture = this.grp3.setTexture(20, 'MAT_S0_TEXTURE', gfx3Manager.createTextureFromBitmap());
    this.s0Texture = this.grp3.setSampler(21, 'MAT_S0_SAMPLER', this.s0Texture);
    this.s1Texture = this.grp3.setTexture(22, 'MAT_S1_TEXTURE', gfx3Manager.createTextureFromBitmap());
    this.s1Texture = this.grp3.setSampler(23, 'MAT_S1_SAMPLER', this.s1Texture);
    this.jamFrames = this.grp3.setStorageFloat(24, 'MAT_JAM_FRAMES', 1);

    this.grp2.allocate();
    this.grp3.allocate();
  }

  /**
   * Load asynchronously data and create material from a json file (mat).
   * 
   * @param {string} path - The file path.
   * @param {string} textureDir - The textures directory.
   */
  static async createFromFile(path: string, textureDir: string = ''): Promise<Gfx3Material> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'MAT') {
      throw new Error('Gfx3Material::loadFromFile(): File not valid !');
    }

    const flipbooks = new Array<MATFlipbook>();
    for (const obj of json['Flipbooks']) {
      flipbooks.push({
        textureTarget: obj['TextureTarget'],
        frameWidth: parseInt(obj['FrameWidth']),
        frameHeight: parseInt(obj['FrameHeight']),
        numCol: parseInt(obj['NumCol']),
        numRow: parseInt(obj['NumRow']),
        numFrames: parseInt(obj['NumFrames']),
        frameDuration: parseInt(obj['FrameDuration'])
      });
    }

    const sParams = new Array<{name: string, value: number}>();
    for (const obj of json['SParams']) {
      sParams.push({
        name: obj['Name'],
        value: obj['Value']
      });
    }

    return new Gfx3Material({
      flipbooks: flipbooks,
      id: json['Id'],
      normalIntensity: json['NormalIntensity'],
      lightning: json['Lightning'],
      lightGroup: json['LightGroup'],
      emissive: json['Emissive'],
      ambient: json['Ambient'],
      diffuse: json['Diffuse'],
      specular: json['Specular'],
      blend: json['Blend'],
      dissolveGlow: json['DissolveGlow'],
      texture: json['Texture'] ? await gfx3TextureManager.loadTexture(textureDir + json['Texture']) : undefined,
      textureScrollAngle: json['TextureScrollAngle'],
      textureScrollRate: json['TextureScrollRate'],
      textureScale: json['TextureScale'],
      textureBlendMode: json['TextureBlendMode'],
      secondaryTexture: json['SecondaryTexture'] ? await gfx3TextureManager.loadTexture(textureDir + json['SecondaryTexture']) : undefined,
      secondaryTextureScrollAngle: json['SecondaryTextureScrollAngle'],
      secondaryTextureScrollRate: json['SecondaryTextureScrollRate'],
      secondaryTextureScale: json['SecondaryTextureScale'],
      secondaryTextureBlendMode: json['SecondaryTextureBlendMode'],
      displacementMap: json['DisplacementMap'] ? await gfx3TextureManager.loadTexture(textureDir + json['DisplacementMap']) : undefined,
      displacementMapScrollAngle: json['DisplacementMapScrollAngle'],
      displacementMapScrollRate: json['DisplacementMapScrollRate'],
      displacementMapScale: json['DisplacementMapScale'],
      displacementMapFactor: json['DisplacementMapFactor'],
      diffuseMap: json['DiffuseMap'] ? await gfx3TextureManager.loadTexture(textureDir + json['DiffuseMap']) : undefined,
      specularMap: json['SpecularMap'] ? await gfx3TextureManager.loadTexture(textureDir + json['SpecularMap']) : undefined,
      emissiveMap: json['EmissiveMap'] ? await gfx3TextureManager.loadTexture(textureDir + json['EmissiveMap']) : undefined,
      normalMap: json['NormalMap'] ? await gfx3TextureManager.loadTexture(textureDir + json['NormalMap']) : undefined,
      envMap: json['EnvMap'] ? await gfx3TextureManager.loadTexture(textureDir + json['EnvMap']) : undefined,
      toonMap: json['ToonMap'] ? await gfx3TextureManager.loadTexture(textureDir + json['ToonMap']): undefined,
      dissolveTexture: json['DissolveTexture'] ? await gfx3TextureManager.loadTexture(textureDir + json['DissolveTexture']): undefined,
      dissolveGlowRange: json['DissolveGlowRange'],
      dissolveGlowFalloff: json['DissolveGlowFalloff'],
      dissolveAmount: json['DissolveAmount'],
      dissolveTextureScrollAngle: json['DissolveTextureScrollAngle'],
      dissolveTextureScrollRate: json['DissolveTextureScrollRate'],
      dissolveTextureScale: json['DissolveTextureScale'],
      s0Texture: json['S0Texture'] ? await gfx3TextureManager.loadTexture(textureDir + json['S0Texture']) : undefined,
      s1Texture: json['S1Texture'] ? await gfx3TextureManager.loadTexture(textureDir + json['S1Texture']) : undefined,
      decalEnabled: json['DecalEnabled'],
      shadowEnabled: json['ShadowEnabled'],
      shininess: json['Shininess'],
      emissiveFactor: json['EmissiveFactor'],
      toonBlending: json['ToonBlending'],
      toonLightDir: json['ToonLightDir'],
      facingAlphaBlend: json['FacingAlphaBlend'],
      distanceAlphaBlend: json['DistanceAlphaBlend'],
      decalGroup: json['DecalGroup'],
      effects: json['Effects'],
      sParams: sParams
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
    for (const animation of this.animations.values()) {
      const offsetX = animation.flipbook.frameWidth * (animation.currentFrameIndex % animation.flipbook.numCol);
      const offsetY = animation.flipbook.frameHeight * Math.floor(animation.currentFrameIndex / animation.flipbook.numCol);

      this.uvs[animation.uvsIndexes[0]] = offsetX / this.texture.gpuTexture.width;
      this.uvs[animation.uvsIndexes[1]] = offsetY / this.texture.gpuTexture.height;
      this.dataChanged = true;

      if (animation.frameProgress >= animation.flipbook.frameDuration) {
        if (animation.currentFrameIndex == animation.flipbook.numFrames - 1) {
          if (animation.looped) {
            animation.currentFrameIndex = 0;
            animation.frameProgress = 0;
          }
          else {
            this.animations.delete(animation.flipbook.textureTarget);
          }

          eventManager.emit(this, 'E_FINISHED');
        }
        else {
          animation.currentFrameIndex = animation.currentFrameIndex + 1;
          animation.frameProgress = 0;
        }
      }
      else {
        animation.frameProgress += ts;
      }
    }
  }

  /**
   * Play a specific animation.
   * 
   * @param {TextureTarget} textureTarget - The name of the animated texture.
   * @param {boolean} [looped=false] - Determines whether the animation should loop or not.
   * @param {boolean} [preventSameAnimation=false] - Determines whether the same animation should be prevented from playing again.
   */
  playAnimation(textureTarget: TextureTarget, looped: boolean = false, preventSameAnimation: boolean = false): void {
    const flipbook = this.flipbooks.find(f => f.textureTarget == textureTarget);
    if (!flipbook) {
      throw new Error('Gfx3Material::playAnimation: flipbook not exist for this texture target.');
    }

    if (preventSameAnimation && this.animations.has(textureTarget)) {
      return;
    }

    this.animations.set(textureTarget, {
      flipbook: flipbook,
      currentFrameIndex: 0,
      looped: looped,
      frameProgress: 0,
      uvsIndexes: function() {
        if (flipbook.textureTarget == TextureTarget.TEXTURE) return [2, 3];
        else if (flipbook.textureTarget == TextureTarget.SECONDARY_TEXTURE) return [8, 9];
        else if (flipbook.textureTarget == TextureTarget.DISPLACEMENT_TEXTURE) return [14, 15];
        else if (flipbook.textureTarget == TextureTarget.DISSOLVE_TEXTURE) return [20, 21];
        else return [2, 3];
      } ()
    })
  }

  /**
   * Stop the specified texture animation.
   * 
   * @param {TextureTarget} textureTarget - The name of the animated texture.
   */
  stopAnimation(textureTarget: TextureTarget): void {
    const animation = this.animations.get(textureTarget);
    if (!animation) {
      throw new Error('Gfx3Material::stopAnimation: animation not found on this texture target.');
    }

    this.uvs[animation.uvsIndexes[0]] = 0.0;
    this.uvs[animation.uvsIndexes[1]] = 0.0;
    this.animations.delete(textureTarget);
    this.dataChanged = true;
  }

  /**
   * Set all vertex animations frames data as a flatten array and put in a uniform buffer.
   * Note: The user can interprete this like a break of the principle of responsability
   * and it is, but ! It is the cost to pay for compute the interpolation of frames in the GPU.
   * Optimization win against good practice for me here.
   * 
   * @param {Array<number>} frames - The flatten frames data.
   */
  setJamFrames(frames: Array<number>): void {
    this.jamFrames = this.grp3.setStorageFloat(24, 'MAT_JAM_FRAMES', frames.length);
    this.jamFrames.set(frames);
    this.grp3.allocate();
    this.jamFramesChanged = true;
  }

  /**
   * Set vertex animation frames informatives data.
   * Note: The user can interprete this like a break of the principle of responsability
   * and it is, but ! It is the cost to pay for compute the interpolation of frames in the GPU.
   * So yeah, optimization win against good practice here.
   * 
   * @param {number} frameIndexA - The current frame index.
   * @param {number} frameIndexB - The next frame index.
   * @param {boolean} isAnimated - The animated flag.
   * @param {boolean} interpolated - A flag to enable/disable interpolation between frames.
   * @param {number} frameTimeStamp - Timestamp of the last frame change.
   * @param {number} frameDuration - The frame duration.
   * @param {number} numVertices - The number of vertices in a frame.
   */
  setJamInfos(frameIndexA: number, frameIndexB: number, isAnimated: boolean, interpolated: boolean, frameTimeStamp: number, frameDuration: number, numVertices: number): void {
    this.jamInfos[0] = frameIndexA;
    this.jamInfos[1] = frameIndexB;
    this.jamInfos[2] = isAnimated ? 1.0 : 0.0;
    this.jamInfos[3] = interpolated ? 1.0 : 0.0;
    this.jamInfos[4] = frameTimeStamp;
    this.jamInfos[5] = frameDuration;
    this.jamInfos[6] = numVertices;
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
   * Set the blend color.
   * This color is multiply by the texel color.
   * 
   * @param {number} r - The red component.
   * @param {number} g - The green component.
   * @param {number} b - The blue component.
   * @param {number} a - The alpha component.
   * @param {string} blendColorMode - The color operation apply on texture.
   */
  setBlendColor(r: number, g: number, b: number, a: number, blendColorMode: 'mul' | 'add' = 'mul'): void {
    this.colors[16] = r;
    this.colors[17] = g;
    this.colors[18] = b;
    this.colors[19] = a;
    this.params[26] = blendColorMode == 'mul' ? 1.0 : 2.0;
    this.dataChanged = true;
  }

  /**
   * Set the light group identifier.
   * 
   * @param {number} group - The light group identifier.
   */
  setLightGroup(group: number): void {
    this.params[27] = group;
    this.dataChanged = true;
  }

  /**
   * Set the decal group identifier.
   * 
   * @param {number} group - The decal group identifier.
   */
  setDecalGroup(group: number): void {
    this.params[28] = group;
    this.dataChanged = true;
  }

  /**
   * Set the dissolve glow color.
   * 
   * @param {number} r - The red component.
   * @param {number} g - The green component.
   * @param {number} b - The blue component.
   */
  setDissolveGlow(r: number, g: number, b: number): void {
    this.colors[20] = r;
    this.colors[21] = g;
    this.colors[22] = b;
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
    this.uvs[0] = angle;
    this.uvs[1] = rate;
    this.params[3] = 1;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * Set the texture scrolling.
   * 
   * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
   * @param {number} [rate=0] - The scrolling rate of the texture.
   */
  setTextureScroll(angle: number = 0, rate: number = 0): void {
    this.uvs[0] = angle;
    this.uvs[1] = rate;
    this.dataChanged = true;
  }

  /**
   * Set the texture scale.
   * 
   * @param {number} x - The horizontal scale.
   * @param {number} y - The vertical scale.
   */
  setTextureScale(x: number, y: number): void {
    this.uvs[4] = x;
    this.uvs[5] = y;
    this.dataChanged = true;
  }

  /**
   * Set the secondary texture.
   * 
   * @param {Gfx3Texture} texture - The texture.
   * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
   * @param {number} [rate=0] - The scrolling rate of the texture.
   * @param {string} blendMode - The blend mode.
   */
  setSecondaryTexture(texture: Gfx3Texture, angle: number = 0, rate: number = 0, blendMode: 'mul' | 'mix' = 'mul'): void {
    this.secondaryTexture = texture;
    this.uvs[6] = angle;
    this.uvs[7] = rate;
    this.params[4] = blendMode == 'mul' ? 1 : 2;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * Set the secondary texture scrolling.
   * 
   * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
   * @param {number} [rate=0] - The scrolling rate of the texture.
   */
  setSecondaryTextureScroll(angle: number = 0, rate: number = 0): void {
    this.uvs[6] = angle;
    this.uvs[7] = rate;
    this.dataChanged = true;
  }

  /**
   * Set the secondary texture scale.
   * 
   * @param {number} x - The horizontal scale.
   * @param {number} y - The vertical scale.
   */
  setSecondaryTextureScale(x: number, y: number): void {
    this.uvs[10] = x;
    this.uvs[11] = y;
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
    this.uvs[12] = angle;
    this.uvs[13] = rate;
    this.params[5] = 1;
    this.params[6] = factor;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * Set the displacement map scrolling.
   * 
   * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
   * @param {number} [rate=0] - The scrolling rate of the texture.
   */
  setDisplacementMapScroll(angle: number = 0, rate: number = 0): void {
    this.uvs[12] = angle;
    this.uvs[13] = rate;
    this.dataChanged = true;
  }

  /**
   * Set the displacement map texture scale.
   * 
   * @param {number} x - The horizontal scale.
   * @param {number} y - The vertical scale.
   */
  setDisplacementMapScale(x: number, y: number): void {
    this.uvs[16] = x;
    this.uvs[17] = y;
    this.dataChanged = true;
  }

  /**
   * Set the diffuse texture map.
   * 
   * @param {Gfx3Texture} diffuseMap - The diffuse texture map.
   */
  setDiffuseMap(diffuseMap: Gfx3Texture): void {
    this.diffuseMap = diffuseMap;
    this.params[7] = 1;
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
    this.params[8] = 1;
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
    this.params[9] = 1;
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
    this.params[10] = 1;
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
    this.params[11] = 1;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * Set the toon texture map.
   * 
   * @param {Gfx3Texture} toonMap - The toon texture map.
   */
  setToonMap(toonMap: Gfx3Texture): void {
    this.toonMap = toonMap;
    this.params[12] = 1;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * Set the dissolve texture.
   * 
   * @param {Gfx3Texture} dissolveTexture - The dissolve texture.
   */
  setDissolveTexture(dissolveTexture: Gfx3Texture, glowRange: number, glowFalloff: number, amount: number): void {
    this.dissolveTexture = dissolveTexture;
    this.params[13] = 1;
    this.params[14] = glowRange;
    this.params[15] = glowFalloff;
    this.params[16] = amount;
    this.texturesChanged = true;
    this.dataChanged = true;
  }

  /**
   * Set the dissolve texture scrolling.
   * 
   * @param {number} [angle=0] - The angle at which the texture will be scrolled (in radians).
   * @param {number} [rate=0] - The scrolling rate of the texture.
   */
  setDissolveTextureScroll(angle: number = 0, rate: number = 0): void {
    this.uvs[18] = angle;
    this.uvs[19] = rate;
    this.dataChanged = true;
  }

  /**
   * Set the dissolve texture scale.
   * 
   * @param {number} x - The horizontal scale.
   * @param {number} y - The vertical scale.
   */
  setDissolveTextureScale(x: number, y: number): void {
    this.uvs[22] = x;
    this.uvs[23] = y;
    this.dataChanged = true;
  }

  /**
   * Set the dissolve glow range.
   * 
   * @param {number} glowRange - The dissolve glow range.
   */
  setDissolveGlowRange(glowRange: number): void {
    this.params[14] = glowRange;
    this.dataChanged = true;
  }

  /**
   * Set the dissolve glow falloff.
   * 
   * @param {number} falloff - The dissolve glow falloff.
   */
  setDissolveGlowFallOff(falloff: number): void {
    this.params[15] = falloff;
    this.dataChanged = true;
  }

  /**
   * Set the dissolve amount.
   * 
   * @param {number} amount - The dissolve amount.
   */
  setDissolveAmount(amount: number): void {
    this.params[16] = amount;
    this.dataChanged = true;
  }

  /**
   * Enable decals on the material surface.
   * 
   * @param {boolean} enabled - Indicating whether decals should be enabled or disabled.
   */
  enableDecal(enabled: boolean): void {
    this.params[17] = enabled ? 1.0 : 0.0;
    this.dataChanged = true;
  }

  /**
   * Enable shadow on the material surface.
   * 
   * @param {boolean} enabled - Indicating whether the shadow should be enabled or disabled.
   */
  enableShadow(enabled: boolean): void {
    this.params[18] = enabled ? 1.0 : 0.0;
    this.dataChanged = true;
  }

  /**
   * Set the specular shininess.
   * 
   * @param {number} shininess - The shininess/specularity value (0-1)
   */
  setShininess(shininess: number): void {
    this.params[19] = shininess;
    this.dataChanged = true;
  }

  /**
   * Set the emissive factor.
   * 
   * @param {number} emissiveFactor - The factor of emission color (0-1)
   */
  setEmissiveFactor(emissiveFactor: number): void {
    this.params[20] = emissiveFactor;
    this.dataChanged = true;
  }

  /**
   * Set the toon blending.
   * 
   * @param {boolean} toonBlending - Enable or disable the blending between texture and toon texture.
   */
  setToonBlending(toonBlending: number): void {
    this.params[21] = toonBlending;
    this.dataChanged = true;
  }

  /**
   * Set the facing alpha blend.
   * 
   * @param {boolean} facingAlphaBlend - Facing alpha blend factor.
   */
  setFacingAlphaBlend(facingAlphaBlend: number): void {
    this.params[22] = facingAlphaBlend;
    this.dataChanged = true;
  }

  /**
   * Set the distance alpha blend.
   * 
   * @param {boolean} distanceAlphaBlend - Distance alpha blend factor.
   */
  setDistanceAlphaBlend(distanceAlphaBlend: number): void {
    this.params[23] = distanceAlphaBlend;
    this.dataChanged = true;
  }

  /**
   * Set flipbook list.
   * 
   * @param {Array<MATFlipbook>} flipbooks - The flipbook list.
   */
  setFlipbooks(flipbooks: Array<MATFlipbook>): void {
    this.flipbooks = flipbooks;
  }

  /**
   * Set a custom parameter value.
   * 
   * @param {string} name - The param name.
   * @param {number} value - The param value.
   */
  setCustomParam(name: string, value: number): void {
    const paramIndex = Object.values(MAT_PARAMS_VARS).findIndex(n => n == name);
    if (paramIndex == -1) {
      throw new Error('Gfx3Material::setCustomParam(): Custom param name not found !');
    }

    this.params[30 + paramIndex] = value;
  }

  /**
   * Returns the specified custom param value.
   * 
   * @param {string} name - The param name.
   */
  getCustomParam(name: string): number {
    const paramIndex = Object.values(MAT_PARAMS_VARS).findIndex(n => n == name);
    if (paramIndex == -1) {
      throw new Error('Gfx3Material::getCustomParam(): Custom param name not found !');
    }

    return this.params[30 + paramIndex];
  }

  /**
   * Set custom textures.
   * 
   * @param {any} textures - The textures list.
   */
  setCustomTextures(textures: {0?: Gfx3Texture, 1?: Gfx3Texture }): void {
    if (textures[0]) {
      this.s0Texture = textures[0];
      this.texturesChanged = true;
    }

    if (textures[1]) {
      this.s1Texture = textures[1];
      this.texturesChanged = true;
    }

    this.params[24] = textures[0] ? 1 : 0;
    this.params[25] = textures[1] ? 1 : 0;
  }

  /**
   * Set the toon light direction.
   * 
   * @param {vec3} direction - The toon light direction.
   */
  setToonLightDirection(direction: vec3): void {
    this.toonLightDir[0] = direction[0];
    this.toonLightDir[1] = direction[1];
    this.toonLightDir[2] = direction[2];
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
      this.grp2.write(3, this.toonLightDir);
      this.grp2.write(4, this.jamInfos);
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
      this.grp3.setTexture(2, 'MAT_SECONDARY_TEXTURE', this.secondaryTexture);
      this.grp3.setTexture(4, 'MAT_DISPLACEMENT_TEXTURE', this.displacementMap);
      this.grp3.setTexture(6, 'MAT_DIFFUSE_TEXTURE', this.diffuseMap);
      this.grp3.setTexture(8, 'MAT_SPECULAR_TEXTURE', this.specularMap);
      this.grp3.setTexture(10, 'MAT_EMISSIVE_TEXTURE', this.emissiveMap);
      this.grp3.setTexture(12, 'MAT_NORM_TEXTURE', this.normalMap);
      this.grp3.setTexture(14, 'MAT_ENV_MAP_TEXTURE', this.envMap, { dimension: 'cube' });
      this.grp3.setTexture(16, 'MAT_TOON_TEXTURE', this.toonMap);
      this.grp3.setTexture(18, 'MAT_DISSOLVE_TEXTURE', this.dissolveTexture);
      this.grp3.setTexture(20, 'MAT_S0_TEXTURE', this.s0Texture);
      this.grp3.setTexture(22, 'MAT_S1_TEXTURE', this.s1Texture);
      this.grp3.allocate();
      this.texturesChanged = false;
    }

    if (this.jamFramesChanged) {
      this.grp3.beginWrite();
      this.grp3.writeStorage(0, this.jamFrames);
      this.grp3.endWrite();
      this.jamFramesChanged = false;
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
   * Returns the secondary texture.
   */
  getSecondaryTexture(): Gfx3Texture {
    return this.secondaryTexture;
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

  /**
   * Returns the toon texture map.
   */
  getToonMap(): Gfx3Texture {
    return this.toonMap;
  }

  /**
   * Returns the dissolve texture.
   */
  getDissolveTexture(): Gfx3Texture {
    return this.dissolveTexture;
  }

  /**
   * Returns the custom texture 0.
   */
  getCustomTexture0(): Gfx3Texture {
    return this.s0Texture;
  }

  /**
   * Returns the custom texture 1.
   */
  getCustomTexture1(): Gfx3Texture {
    return this.s1Texture;
  }
}

export { Gfx3Material };
export type { TextureTarget, MATFlipbook };