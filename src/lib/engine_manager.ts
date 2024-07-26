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
import { screenManager } from './screen/screen_manager';
import { uiManager } from './ui/ui_manager';
import { gfx3PostRenderer } from './gfx3_post/gfx3_post_renderer';
import { gfx3ShadowVolumeRenderer } from './gfx3_shadow_volume/gfx3_shadow_volume_renderer';
// -----------------------------------------------------------------------------------------------
import { Gfx3MeshJAM } from './gfx3_mesh/gfx3_mesh_jam';
import { Gfx3MeshJSM } from './gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3PhysicsJWM } from './gfx3_physics/gfx3_physics_jwm';
import { Gfx3PhysicsJNM } from './gfx3_physics/gfx3_physics_jnm';
import { Gfx3ShadowVolume } from './gfx3_shadow_volume/gfx3_shadow_volume';
import { Gfx3MeshLight } from './gfx3_mesh/gfx3_mesh_light';
import { AIPathGraph3D } from './ai/ai_path_graph';
import { Motion } from './motion/motion';
import { Gfx2SpriteJSS } from './gfx2_sprite/gfx2_sprite_jss';
import { Gfx2SpriteJAS } from './gfx2_sprite/gfx2_sprite_jas';
import { Gfx2TileMap } from './gfx2_tile/gfx2_tile_map';
import { AIPathGraph2D } from './ai/ai_path_graph';
import { Gfx3Texture } from './gfx3/gfx3_texture';
import { Gfx3Material } from './gfx3_mesh/gfx3_mesh_material';

interface PackItem<T> {
  name: string;
  ext: string;
  object: T;
  blobUrl: string;
};

class Pack3D {
  tex: Array<PackItem<Gfx3Texture>>;
  mat: Array<PackItem<Gfx3Material>>;
  jam: Array<PackItem<Gfx3MeshJAM>>;
  jsm: Array<PackItem<Gfx3MeshJSM>>;
  jwm: Array<PackItem<Gfx3PhysicsJWM>>;
  jnm: Array<PackItem<Gfx3PhysicsJNM>>;
  jlm: Array<PackItem<Motion>>;
  jsv: Array<PackItem<Gfx3ShadowVolume>>;
  jlt: Array<PackItem<Gfx3MeshLight>>;
  grf: Array<PackItem<AIPathGraph3D>>;
  any: Array<PackItem<any>>;

  constructor() {
    this.tex = [];
    this.mat = [];
    this.jam = [];
    this.jsm = [];
    this.jwm = [];
    this.jnm = [];
    this.jlm = [];
    this.jsv = [];
    this.jlt = [];
    this.grf = [];
    this.any = [];
  }
}

class Pack2D {
  tex: Array<PackItem<ImageBitmap>>;
  jss: Array<PackItem<Gfx2SpriteJSS>>;
  jas: Array<PackItem<Gfx2SpriteJAS>>;
  jtm: Array<PackItem<Gfx2TileMap>>;
  jlm: Array<PackItem<Motion>>;
  grf: Array<PackItem<AIPathGraph2D>>;
  any: Array<PackItem<any>>;

  constructor() {
    this.tex = [];
    this.jss = [];
    this.jas = [];
    this.jtm = [];
    this.jlm = [];
    this.grf = [];
    this.any = [];
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

  constructor() {
    this.then = 0;
    this.elapsedTime = 0;
    this.frameRateFixed = false;
    this.frameRateValue = 60;
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

    zip.forEach(async (relativePath: any, zipEntry: any) => {
      const splitname = zipEntry.name.split('.');
      const name = splitname.slice(0, -1);
      const ext = splitname.slice(-1);
      const file = zip.file(zipEntry.name);

      // load texture first
      // @todo: export tex from blender

      if (file != null && ext == 'tex') {
        const json = JSON.parse(await file.async('string'));
        const sampler: GPUSamplerDescriptor = {
          addressModeU: json['AddressModeU'],
          addressModeV: json['AddressMoveV'],
          addressModeW: json['AddressMoveW'],
          magFilter: json['MagFilter'],
          minFilter: json['MinFilter'],
          mipmapFilter: json['MipMapFilter'],
          lodMinClamp: json['LodMinClamp'],
          lodMaxClamp: json['LodMaxClamp'],
          compare: json['Compare'],
          maxAnisotropy: json['MaxAnisotropy']
        };
  
        const imageFile = zip.file(json['ImagePath']);
        const imageUrl = URL.createObjectURL(await imageFile!.async('blob'));

        if (json['Type'] == 'Mips') {
          const texture = await gfx3TextureManager.loadTextureMips(imageUrl, sampler, json['Is8Bit'], zipEntry.name);
          pack.tex.push({ name: name, ext: 'bitmap', object: texture, blobUrl: imageUrl });
        }
        else if (json['Type'] == 'CubeMap') {
          const texture = await gfx3TextureManager.loadCubemapTexture(imageUrl, json['CubeMapExt'], zipEntry.name);
          pack.tex.push({ name: name, ext: 'bitmap', object: texture, blobUrl: imageUrl });
        }
        else {
          const texture = await gfx3TextureManager.loadTexture(imageUrl, sampler, json['Is8Bit'], zipEntry.name);
          pack.tex.push({ name: name, ext: 'bitmap', object: texture, blobUrl: imageUrl });
        }
      }
    });

    zip.forEach(async (relativePath: any, zipEntry: any) => {
      const splitname = zipEntry.name.split('.');
      const name = splitname.slice(0, -1);
      const ext = splitname.slice(-1);
      const file = zip.file(zipEntry.name);
      const url = URL.createObjectURL(await file!.async('blob'));

      if (file != null && ext == 'mat') {
        const mat = await Gfx3Material.createFromFile(url);
        pack.mat.push({ name: name, ext: ext, object: mat, blobUrl: url });
      }
    });

    zip.forEach(async (relativePath: any, zipEntry: any) => {
      const splitname = zipEntry.name.split('.');
      const name = splitname.slice(0, -1);
      const ext = splitname.slice(-1);
      const file = zip.file(zipEntry.name);
      const url = URL.createObjectURL(await file!.async('blob'));
      
      if (file != null && ext == 'jam') {
        const jam = new Gfx3MeshJAM();
        await jam.loadFromFile(url);
        pack.jam.push({ name: name, ext: 'jam', object: jam, blobUrl: url });
      }

      if (file != null && ext == 'bam') {
        const jam = new Gfx3MeshJAM();
        await jam.loadFromBinaryFile(url);
        pack.jam.push({ name: name, ext: 'jam', object: jam, blobUrl: url });
      }

      if (file != null && ext == 'jsm') {
        const jsm = new Gfx3MeshJSM();
        await jsm.loadFromFile(url);
        pack.jsm.push({ name: name, ext: 'jsm', object: jsm, blobUrl: url });
      }

      if (file != null && ext == 'bsm') {
        const jsm = new Gfx3MeshJSM();
        await jsm.loadFromBinaryFile(url);
        pack.jsm.push({ name: name, ext: 'bsm', object: jsm, blobUrl: url });
      }

      if (file != null && ext == 'jwm') {
        const jwm = new Gfx3PhysicsJWM();
        await jwm.loadFromFile(url);
        pack.jwm.push({ name: name, ext: 'jwm', object: jwm, blobUrl: url });
      }

      if (file != null && ext == 'bwm') {
        const jwm = new Gfx3PhysicsJWM();
        await jwm.loadFromBinaryFile(url);
        pack.jwm.push({ name: name, ext: 'bwm', object: jwm, blobUrl: url });
      }

      if (file != null && ext == 'jnm') {
        const jnm = new Gfx3PhysicsJNM();
        await jnm.loadFromFile(url);
        pack.jnm.push({ name: name, ext: 'jnm', object: jnm, blobUrl: url });
      }

      if (file != null && ext == 'bnm') {
        const jnm = new Gfx3PhysicsJNM();
        await jnm.loadFromBinaryFile(url);
        pack.jnm.push({ name: name, ext: 'bnm', object: jnm, blobUrl: url });
      }

      if (file != null && ext == 'jlm') {
        const jlm = new Motion();
        await jlm.loadFromFile(url);
        pack.jlm.push({ name: name, ext: 'jlm', object: jlm, blobUrl: url });
      }

      if (file != null && ext == 'blm') {
        const jlm = new Motion();
        await jlm.loadFromBinaryFile(url);
        pack.jlm.push({ name: name, ext: 'blm', object: jlm, blobUrl: url });
      }

      if (file != null && ext == 'jsv') {
        const jsv = new Gfx3ShadowVolume();
        await jsv.loadFromFile(url);
        pack.jsv.push({ name: name, ext: 'jsv', object: jsv, blobUrl: url });
      }

      if (file != null && ext == 'bsv') {
        const jsv = new Gfx3ShadowVolume();
        await jsv.loadFromBinaryFile(url);
        pack.jsv.push({ name: name, ext: 'bsv', object: jsv, blobUrl: url });
      }

      if (file != null && ext == 'jlt') {
        const jlt = new Gfx3MeshLight();
        await jlt.loadFromFile(url);
        pack.jlt.push({ name: name, ext: 'jlt', object: jlt, blobUrl: url });
      }

      if (file != null && ext == 'grf') {
        const grf = new AIPathGraph3D();
        await grf.loadFromFile(url);
        pack.grf.push({ name: name, ext: 'grf', object: grf, blobUrl: url });
      }

      if (file != null && ext == 'any') {
        const data = JSON.parse(await file.async('string'));
        pack.any.push({ name: name, ext: 'any', object: data, blobUrl: url });
      }
    });

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

    zip.forEach(async (relativePath: any, zipEntry: any) => {
      const splitname = zipEntry.name.split('.');
      const name = splitname.slice(0, -1);
      const ext = splitname.slice(-1);
      const file = zip.file(zipEntry.name);
      const url = URL.createObjectURL(await file!.async('blob'));

      if (file != null && (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'bmp')) {
        const tex = await gfx2TextureManager.loadTexture(url);
        pack.tex.push({ name: name, ext: 'bitmap', object: tex, blobUrl: url });
      }
    });

    zip.forEach(async (relativePath: any, zipEntry: any) => {
      const splitname = zipEntry.name.split('.');
      const name = splitname.slice(0, -1);
      const ext = splitname.slice(-1);
      const file = zip.file(zipEntry.name);
      const url = URL.createObjectURL(await file!.async('blob'));

      if (file != null && ext == 'jss') {
        const jss = new Gfx2SpriteJSS();
        await jss.loadFromFile(url);
        pack.jss.push({ name: name, ext: 'jss', object: jss, blobUrl: url });
      }

      if (file != null && ext == 'jas') {
        const jas = new Gfx2SpriteJAS();
        await jas.loadFromFile(url);
        pack.jas.push({ name: name, ext: 'jas', object: jas, blobUrl: url });
      }

      if (file != null && ext == 'jlm') {
        const jlm = new Motion();
        await jlm.loadFromFile(url);
        pack.jlm.push({ name: name, ext: 'jlm', object: jlm, blobUrl: url });
      }

      if (file != null && ext == 'blm') {
        const jlm = new Motion();
        await jlm.loadFromBinaryFile(url);
        pack.jlm.push({ name: name, ext: 'blm', object: jlm, blobUrl: url });
      }

      if (file != null && ext == 'grf') {
        const grf = new AIPathGraph2D();
        await grf.loadFromFile(url);
        pack.grf.push({ name: name, ext: 'grf', object: grf, blobUrl: url });
      }

      if (file != null && ext == 'any') {
        const data = JSON.parse(await file.async('string'));
        pack.any.push({ name: name, ext: 'any', object: data, blobUrl: url });
      }
    });

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
}

export type { PackItem };
export { EngineManager, Pack2D, Pack3D };
export const em = new EngineManager();