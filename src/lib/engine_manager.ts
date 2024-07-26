import JSZip from 'jszip';
import { coreManager } from './core/core_manager';
import { inputManager } from './input/input_manager';
import { gfx2Manager } from './gfx2/gfx2_manager';
import { gfx2TextureManager } from './gfx2/gfx2_texture_manager';
import { gfx3Manager } from './gfx3/gfx3_manager';
import { gfx3TextureManager } from './gfx3/gfx3_texture_manager';
import { gfx3DebugRenderer } from './gfx3/gfx3_debug_renderer';
import { gfx3MeshRenderer } from './gfx3_mesh/gfx3_mesh_renderer';
import { gfx3MeshShadowRenderer } from './gfx3_mesh/gfx3_mesh_shadow_renderer';
import { gfx3SpriteRenderer } from './gfx3_sprite/gfx3_sprite_renderer';
import { gfx3SkyboxRenderer } from './gfx3_skybox/gfx3_skybox_renderer';
import { gfx3FlareRenderer } from './gfx3_flare/gfx3_flare_renderer';
import { gfx3ParticlesRenderer } from './gfx3_particules/gfx3_particles_renderer';
import { gfx3PostRenderer } from './gfx3_post/gfx3_post_renderer';
import { gfx3ShadowVolumeRenderer } from './gfx3_shadow_volume/gfx3_shadow_volume_renderer';
import { soundManager } from './sound/sound_manager';
import { screenManager } from './screen/screen_manager';
import { uiManager } from './ui/ui_manager';
// -----------------------------------------------------------------------------------------------
import { Gfx3MeshJAM } from './gfx3_mesh/gfx3_mesh_jam';
import { Gfx3MeshJSM } from './gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3MeshOBJ } from './gfx3_mesh/gfx3_mesh_obj';
import { Gfx3PhysicsJWM } from './gfx3_physics/gfx3_physics_jwm';
import { Gfx3PhysicsJNM } from './gfx3_physics/gfx3_physics_jnm';
import { Gfx3ShadowVolume } from './gfx3_shadow_volume/gfx3_shadow_volume';
import { Gfx3MeshLight } from './gfx3_mesh/gfx3_mesh_light';
import { AIPathGraph3D } from './ai/ai_path_graph';
import { AIPathGraph2D } from './ai/ai_path_graph';
import { AIPathGrid3D } from './ai/ai_path_grid';
import { AIPathGrid2D } from './ai/ai_path_grid';
import { Motion } from './motion/motion';
import { Gfx2SpriteJSS } from './gfx2_sprite/gfx2_sprite_jss';
import { Gfx2SpriteJAS } from './gfx2_sprite/gfx2_sprite_jas';
import { Gfx2TileMap } from './gfx2_tile/gfx2_tile_map';
import { Gfx3Texture } from './gfx3/gfx3_texture';
import { Gfx3Material } from './gfx3_mesh/gfx3_mesh_material';
import { Gfx3SpriteJAS } from './gfx3_sprite/gfx3_sprite_jas';
import { Gfx3SpriteJSS } from './gfx3_sprite/gfx3_sprite_jss';
import { ScriptMachine } from './script/script_machine';
import { Sound } from './sound/sound_manager';

interface PackItem<T> {
  name: string;
  ext: string;
  object: T;
  blobUrl: string;
};

class PackItemList<T> extends Array<PackItem<T>> {
  constructor() {
    super();
  }

  get(name: string): T {
    const item = this.find(i => i.name == name);
    if (!item) {
      throw new Error('EngineManager::PackItemList::get(): item not found !');
    }
  
    return item.object;
  }
}

class Pack {
  jsc: PackItemList<ScriptMachine>;
  snd: PackItemList<Sound>;

  constructor() {
    this.jsc = new PackItemList<ScriptMachine>;
    this.snd = new PackItemList<Sound>;
  }
}

class Pack3D extends Pack {
  tex: PackItemList<Gfx3Texture>;
  mat: PackItemList<Gfx3Material>;
  jam: PackItemList<Gfx3MeshJAM>;
  jsm: PackItemList<Gfx3MeshJSM>;
  obj: PackItemList<Gfx3MeshOBJ>;
  jas: PackItemList<Gfx3SpriteJAS>;
  jss: PackItemList<Gfx3SpriteJSS>;
  jwm: PackItemList<Gfx3PhysicsJWM>;
  jnm: PackItemList<Gfx3PhysicsJNM>;
  jlm: PackItemList<Motion>;
  jsv: PackItemList<Gfx3ShadowVolume>;
  jlt: PackItemList<Gfx3MeshLight>;
  grf: PackItemList<AIPathGraph3D>;
  grd: PackItemList<AIPathGrid3D>;
  any: PackItemList<any>;

  constructor() {
    super();
    this.tex = new PackItemList<Gfx3Texture>;
    this.mat = new PackItemList<Gfx3Material>;
    this.jam = new PackItemList<Gfx3MeshJAM>;
    this.jsm = new PackItemList<Gfx3MeshJSM>;
    this.obj = new PackItemList<Gfx3MeshOBJ>;
    this.jas = new PackItemList<Gfx3SpriteJAS>;
    this.jss = new PackItemList<Gfx3SpriteJSS>;
    this.jwm = new PackItemList<Gfx3PhysicsJWM>;
    this.jnm = new PackItemList<Gfx3PhysicsJNM>;
    this.jlm = new PackItemList<Motion>;
    this.jsv = new PackItemList<Gfx3ShadowVolume>;
    this.jlt = new PackItemList<Gfx3MeshLight>;
    this.grf = new PackItemList<AIPathGraph3D>;
    this.grd = new PackItemList<AIPathGrid3D>;
    this.any = new PackItemList<any>;
  }
}

class Pack2D extends Pack {
  tex: PackItemList<ImageBitmap>;
  jss: PackItemList<Gfx2SpriteJSS>;
  jas: PackItemList<Gfx2SpriteJAS>;
  jtm: PackItemList<Gfx2TileMap>;
  jlm: PackItemList<Motion>;
  grf: PackItemList<AIPathGraph2D>;
  grd: PackItemList<AIPathGrid2D>;
  any: PackItemList<any>;

  constructor() {
    super();
    this.tex = new PackItemList<ImageBitmap>;
    this.jss = new PackItemList<Gfx2SpriteJSS>;
    this.jas = new PackItemList<Gfx2SpriteJAS>;
    this.jtm = new PackItemList<Gfx2TileMap>;
    this.jlm = new PackItemList<Motion>;
    this.grf = new PackItemList<AIPathGraph2D>;
    this.grd = new PackItemList<AIPathGrid2D>;
    this.any = new PackItemList<any>;
  }
}

/**
 * Singleton managing the main loop engine.
 */
class EngineManager {
  then: number;
  elapsedTime: number;
  frameRateFixed: boolean;
  frameRateValue: number;
  textureExts: Array<string>;

  constructor() {
    this.then = 0;
    this.elapsedTime = 0;
    this.frameRateFixed = false;
    this.frameRateValue = 60;
    this.textureExts = ['jpg', 'jpeg', 'png', 'bmp'];
  }

  /**
   * Start the engine with optional parameters and run the main loop.
   * 
   * @param {boolean} [enableScanlines=true] - Determines whether scanlines should be enabled or not.
   * @param {boolean} [showDebug=true] - Determines whether to display debug information.
   */
  startup(enableScanlines: boolean = true, showDebug: boolean = true): void {
    coreManager.enableScanlines(enableScanlines);
    gfx3DebugRenderer.setShowDebug(showDebug);
    this.run(0);
  }

  /**
   * The main loop.
   */
  run(timeStamp: number): void {
    const ts = timeStamp - this.then;
    this.then = timeStamp;

    // update phase
    if (!this.frameRateFixed || this.elapsedTime > 1000 / this.frameRateValue) {
      inputManager.update(ts);
      gfx2Manager.update(ts);
      uiManager.update(ts);
      screenManager.update(ts);
      this.elapsedTime = 0;
    }

    this.elapsedTime += ts;

    // draw phase
    gfx3Manager.beginDrawing();
    screenManager.draw();
    gfx3Manager.endDrawing();

    // 2D render phase
    gfx2Manager.beginRender();
    gfx2Manager.render();
    gfx2Manager.endRender();

    // 3D render phase
    gfx3Manager.beginRender();
    gfx3MeshShadowRenderer.render();
    gfx3ShadowVolumeRenderer.render();
    gfx3Manager.setDestinationTexture(gfx3PostRenderer.getSourceTexture());
    gfx3Manager.beginPassRender(0);
    gfx3SkyboxRenderer.render();
    gfx3DebugRenderer.render();
    gfx3MeshRenderer.render(ts);
    gfx3SpriteRenderer.render();
    gfx3ParticlesRenderer.render();
    gfx3FlareRenderer.render();
    gfx3Manager.endPassRender();
    gfx3PostRenderer.render(ts, gfx3Manager.getCurrentRenderingTexture());
    gfx3Manager.endRender();

    const fps = document.getElementById('fps');
    if (fps) fps.textContent = (1000 / ts).toFixed(2);

    const rt = document.getElementById('rt');
    if (rt) rt.textContent = (1000 / gfx3Manager.getLastRenderTime()).toFixed(2);

    requestAnimationFrame(timeStamp => this.run(timeStamp));
  }

  /**
   * Load a 3D pack file.
   * 
   * @param {string} path - The archive file path.
   */
  async loadPack3D(path: string): Promise<Pack3D> {
    const res = await fetch(path);
    const zip = await JSZip.loadAsync(await res.blob());
    const pack = new Pack3D();

    // load textures first
    for (const entry of zip.file(/\.(jpg|jpeg|png|bmp)/)) {
      const infos = this.#getFilenameInfos(entry.name);
      const file = zip.file(entry.name);

      if (file != null && this.textureExts.indexOf(infos.ext) != -1) {
        const imageUrl = URL.createObjectURL(await file.async('blob'));
        const sampler: GPUSamplerDescriptor = {};
        let type = '';
        let is8Bit = false;

        const texFile = zip.file(infos.name + '.tex');
        if (texFile != null) {
          const json = JSON.parse(await texFile.async('string'));
          sampler.addressModeU = json['AddressModeU'];
          sampler.addressModeV = json['AddressMoveV'];
          sampler.addressModeW = json['AddressMoveW'];
          sampler.magFilter = json['MagFilter'];
          sampler.minFilter = json['MinFilter'];
          sampler.mipmapFilter = json['MipMapFilter'];
          sampler.lodMinClamp = json['LodMinClamp'];
          sampler.lodMaxClamp = json['LodMaxClamp'];
          sampler.compare = json['Compare'];
          sampler.maxAnisotropy = json['MaxAnisotropy'];
          type = json['Type'];
          is8Bit = json['Is8Bit'];
        }

        if (type == 'Mips') {
          const texture = await gfx3TextureManager.loadTextureMips(imageUrl, sampler, is8Bit, entry.name);
          pack.tex.push({ name: infos.name, ext: 'bitmap', object: texture, blobUrl: imageUrl });
        }
        else if (type == 'Cubemap') {
          const texture = await gfx3TextureManager.loadCubemapTexture(imageUrl, infos.ext, entry.name);
          pack.tex.push({ name: infos.name, ext: 'bitmap', object: texture, blobUrl: imageUrl });
        }
        else {
          const texture = await gfx3TextureManager.loadTexture(imageUrl, sampler, is8Bit, entry.name);
          pack.tex.push({ name: infos.name, ext: 'bitmap', object: texture, blobUrl: imageUrl });
        }
      }
    }

    // load all others resources
    for (const entry of zip.file(/.*/)) {
      const infos = this.#getFilenameInfos(entry.name);
      const file = zip.file(entry.name);

      if (file != null && infos.ext == 'mp3') {
        const url = URL.createObjectURL(await file.async('blob'));
        const snd = await soundManager.loadSound(url, entry.name);
        pack.snd.push({ name: infos.name, ext: 'mp3', object: snd, blobUrl: url });
      }

      if (file != null && infos.ext == 'jsc') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jsc = new ScriptMachine();
        await jsc.loadFromFile(url);
        pack.jsc.push({ name: infos.name, ext: 'jsc', object: jsc, blobUrl: url });
      }

      if (file != null && infos.ext == 'mat') {
        const url = URL.createObjectURL(await file.async('blob'));
        const mat = await Gfx3Material.createFromFile(url);
        pack.mat.push({ name: infos.name, ext: 'mat', object: mat, blobUrl: url });
      }

      if (file != null && infos.ext == 'jam') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jam = new Gfx3MeshJAM();
        await jam.loadFromFile(url);
        pack.jam.push({ name: infos.name, ext: 'jam', object: jam, blobUrl: url });
      }

      if (file != null && infos.ext == 'bam') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jam = new Gfx3MeshJAM();
        await jam.loadFromBinaryFile(url);
        pack.jam.push({ name: infos.name, ext: 'bam', object: jam, blobUrl: url });
      }

      if (file != null && infos.ext == 'jsm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jsm = new Gfx3MeshJSM();
        await jsm.loadFromFile(url);
        pack.jsm.push({ name: infos.name, ext: 'jsm', object: jsm, blobUrl: url });
      }

      if (file != null && infos.ext == 'bsm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jsm = new Gfx3MeshJSM();
        await jsm.loadFromBinaryFile(url);
        pack.jsm.push({ name: infos.name, ext: 'bsm', object: jsm, blobUrl: url });
      }

      if (file != null && infos.ext == 'obj') {
        const url = URL.createObjectURL(await file.async('blob'));
        const mtlFile = zip.file(infos.name + '.mtl');
        if (mtlFile != null) {
          const mtlUrl = URL.createObjectURL(await mtlFile.async('blob'));
          const obj = new Gfx3MeshOBJ();
          await obj.loadFromFile(url, mtlUrl);
          pack.obj.push({ name: infos.name, ext: 'obj', object: obj, blobUrl: url });
        }
      }

      if (file != null && infos.ext == 'jas') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jas = new Gfx3SpriteJAS();
        await jas.loadFromFile(url);
        pack.jas.push({ name: infos.name, ext: 'jas', object: jas, blobUrl: url });
      }

      if (file != null && infos.ext == 'jss') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jss = new Gfx3SpriteJSS();
        await jss.loadFromFile(url);
        pack.jss.push({ name: infos.name, ext: 'jss', object: jss, blobUrl: url });
      }

      if (file != null && infos.ext == 'jwm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jwm = new Gfx3PhysicsJWM();
        await jwm.loadFromFile(url);
        pack.jwm.push({ name: infos.name, ext: 'jwm', object: jwm, blobUrl: url });
      }

      if (file != null && infos.ext == 'bwm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jwm = new Gfx3PhysicsJWM();
        await jwm.loadFromBinaryFile(url);
        pack.jwm.push({ name: infos.name, ext: 'bwm', object: jwm, blobUrl: url });
      }

      if (file != null && infos.ext == 'jnm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jnm = new Gfx3PhysicsJNM();
        await jnm.loadFromFile(url);
        pack.jnm.push({ name: infos.name, ext: 'jnm', object: jnm, blobUrl: url });
      }

      if (file != null && infos.ext == 'bnm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jnm = new Gfx3PhysicsJNM();
        await jnm.loadFromBinaryFile(url);
        pack.jnm.push({ name: infos.name, ext: 'bnm', object: jnm, blobUrl: url });
      }

      if (file != null && infos.ext == 'jlm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jlm = new Motion();
        await jlm.loadFromFile(url);
        pack.jlm.push({ name: infos.name, ext: 'jlm', object: jlm, blobUrl: url });
      }

      if (file != null && infos.ext == 'blm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jlm = new Motion();
        await jlm.loadFromBinaryFile(url);
        pack.jlm.push({ name: infos.name, ext: 'blm', object: jlm, blobUrl: url });
      }

      if (file != null && infos.ext == 'jsv') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jsv = new Gfx3ShadowVolume();
        await jsv.loadFromFile(url);
        pack.jsv.push({ name: infos.name, ext: 'jsv', object: jsv, blobUrl: url });
      }

      if (file != null && infos.ext == 'bsv') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jsv = new Gfx3ShadowVolume();
        await jsv.loadFromBinaryFile(url);
        pack.jsv.push({ name: infos.name, ext: 'bsv', object: jsv, blobUrl: url });
      }

      if (file != null && infos.ext == 'jlt') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jlt = new Gfx3MeshLight();
        await jlt.loadFromFile(url);
        pack.jlt.push({ name: infos.name, ext: 'jlt', object: jlt, blobUrl: url });
      }

      if (file != null && infos.ext == 'grf') {
        const url = URL.createObjectURL(await file.async('blob'));
        const grf = new AIPathGraph3D();
        await grf.loadFromFile(url);
        pack.grf.push({ name: infos.name, ext: 'grf', object: grf, blobUrl: url });
      }

      if (file != null && infos.ext == 'grd') {
        const url = URL.createObjectURL(await file.async('blob'));
        const grd = new AIPathGrid3D();
        await grd.loadFromFile(url);
        pack.grd.push({ name: infos.name, ext: 'grd', object: grd, blobUrl: url });
      }

      if (file != null && infos.ext == 'any') {
        const data = JSON.parse(await file.async('string'));
        pack.any.push({ name: infos.name, ext: 'any', object: data, blobUrl: '' });
      }
    }

    for (const item of [...pack.jsm, ...pack.jam]) {
      item.object.setMaterial(pack.mat.get(item.name));
    }

    return pack;
  }

  /**
   * Load a 2D pack file.
   * 
   * @param {string} path - The archive file path.
   */
  async loadPack2D(path: string): Promise<Pack2D> {
    const res = await fetch(path);
    const zip = await JSZip.loadAsync(await res.blob());
    const pack = new Pack2D();

    // load texture first
    for (const entry of zip.file(/\.(jpg|jpeg|png|bmp)/)) {
      const infos = this.#getFilenameInfos(entry.name);
      const file = zip.file(entry.name);

      if (file != null && this.textureExts.indexOf(infos.ext) != -1) {
        const url = URL.createObjectURL(await file.async('blob'));
        const tex = await gfx2TextureManager.loadTexture(url);
        pack.tex.push({ name: infos.name, ext: 'bitmap', object: tex, blobUrl: url });
      }
    }

    // load all others resources
    for (const entry of zip.file(/.*/)) {
      const infos = this.#getFilenameInfos(entry.name);
      const file = zip.file(entry.name);
      
      if (file != null && infos.ext == 'mp3') {
        const url = URL.createObjectURL(await file.async('blob'));
        const snd = await soundManager.loadSound(url, entry.name);
        pack.snd.push({ name: infos.name, ext: 'mp3', object: snd, blobUrl: url });
      }

      if (file != null && infos.ext == 'jsc') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jsc = new ScriptMachine();
        await jsc.loadFromFile(url);
        pack.jsc.push({ name: infos.name, ext: 'jsc', object: jsc, blobUrl: url });
      }

      if (file != null && infos.ext == 'jss') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jss = new Gfx2SpriteJSS();
        await jss.loadFromFile(url);
        pack.jss.push({ name: infos.name, ext: 'jss', object: jss, blobUrl: url });
      }

      if (file != null && infos.ext == 'jas') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jas = new Gfx2SpriteJAS();
        await jas.loadFromFile(url);
        pack.jas.push({ name: infos.name, ext: 'jas', object: jas, blobUrl: url });
      }

      if (file != null && infos.ext == 'jtm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jtm = new Gfx2TileMap();
        await jtm.loadFromFile(url);
        pack.jtm.push({ name: infos.name, ext: 'jtm', object: jtm, blobUrl: url });
      }

      if (file != null && infos.ext == 'jlm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jlm = new Motion();
        await jlm.loadFromFile(url);
        pack.jlm.push({ name: infos.name, ext: 'jlm', object: jlm, blobUrl: url });
      }

      if (file != null && infos.ext == 'blm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jlm = new Motion();
        await jlm.loadFromBinaryFile(url);
        pack.jlm.push({ name: infos.name, ext: 'blm', object: jlm, blobUrl: url });
      }

      if (file != null && infos.ext == 'grf') {
        const url = URL.createObjectURL(await file.async('blob'));
        const grf = new AIPathGraph2D();
        await grf.loadFromFile(url);
        pack.grf.push({ name: infos.name, ext: 'grf', object: grf, blobUrl: url });
      }

      if (file != null && infos.ext == 'grd') {
        const url = URL.createObjectURL(await file.async('blob'));
        const grd = new AIPathGrid2D();
        await grd.loadFromFile(url);
        pack.grd.push({ name: infos.name, ext: 'grd', object: grd, blobUrl: url });
      }

      if (file != null && infos.ext == 'any') {
        const data = JSON.parse(await file.async('string'));
        pack.any.push({ name: infos.name, ext: 'any', object: data, blobUrl: '' });
      }
    }

    return pack;
  }

  /**
   * Set frame rate fixed flag.
   * 
   * @param {boolean} fixed - The boolean flag.
   */
  setFrameRateFixed(fixed: boolean): void {
    this.frameRateFixed = fixed;
  }

  /**
   * The the frame rate value.
   * 
   * @param {number} value - The fps value.
   */
  setFrameRateValue(value: number): void {
    this.frameRateValue = value;
  }

  #getFilenameInfos(filename: string): { name: string, ext: string } {
    const splitname = filename.split('.');
    return {
      name: splitname.slice(0, -1).join(),
      ext: splitname.at(-1) ?? ''
    };
  }
}

export type { PackItem, PackItemList };
export { EngineManager, Pack2D, Pack3D };
export const em = new EngineManager();