import JSZip from 'jszip';
import { coreManager } from './core/core_manager';
import { inputManager } from './input/input_manager';
import { gfx2Manager } from './gfx2/gfx2_manager';
import { gfx3Manager } from './gfx3/gfx3_manager';
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
// ------------------------------------------------------------------
import { Gfx3MeshJAM } from './gfx3_mesh/gfx3_mesh_jam';
import { Gfx3MeshJSM } from './gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3PhysicsJWM } from './gfx3_physics/gfx3_physics_jwm';
import { Gfx3PhysicsJNM } from './gfx3_physics/gfx3_physics_jnm';
import { Gfx3ShadowVolume } from './gfx3_shadow_volume/gfx3_shadow_volume';
import { Gfx3MeshLight } from './gfx3_mesh/gfx3_mesh_light';
import { AIPathGraph3D } from './ai/ai_path_graph';
import { Motion } from './motion/motion';

interface PackItem<T> {
  name: string;
  ext: string;
  object: T;
};

interface Pack {
  jam: Array<PackItem<Gfx3MeshJAM>>;
  jsm: Array<PackItem<Gfx3MeshJSM>>;
  jwm: Array<PackItem<Gfx3PhysicsJWM>>;
  jnm: Array<PackItem<Gfx3PhysicsJNM>>;
  jlm: Array<PackItem<Motion>>;
  jsv: Array<PackItem<Gfx3ShadowVolume>>;
  jlt: Array<PackItem<Gfx3MeshLight>>;
  grf: Array<PackItem<AIPathGraph3D>>;
  any: Array<PackItem<any>>;
};

/**
 * Singleton managing the main loop engine.
 */
class EngineManager {
  then: number;
  elapsedTime: number;
  frameRateVariable: boolean;
  frameRateValue: number;

  constructor() {
    this.then = 0;
    this.elapsedTime = 0;
    this.frameRateVariable = true;
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
    if (this.frameRateVariable || this.elapsedTime > 1000 / this.frameRateValue) {
      inputManager.update(ts);
      gfx2Manager.update(ts);
      uiManager.update(ts);
      screenManager.update(ts);
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
   * The pack loader.
   * 
   * @param {string} path - The archive file path.
   */
  async loadPack(path: string): Promise<Pack> {
    const res = await fetch(path);
    const zip = await JSZip.loadAsync(await res.blob());
    const pack: Pack = {
      jam: [],
      jsm: [],
      jwm: [],
      jnm: [],
      jlm: [],
      jsv: [],
      jlt: [],
      grf: [],
      any: []
    };

    zip.forEach(async (relativePath: any, zipEntry: any) => {
      const ext = zipEntry.name.split('.').at(-1);
      const file = zip.file(zipEntry.name);
      
      if (file != null && ext == 'jam') {
        const jam = new Gfx3MeshJAM();
        await jam.loadFromFile(URL.createObjectURL(await file.async('blob')));
        pack.jam.push({ name: zipEntry.name, ext: ext ?? '', object: jam });
      }

      if (file != null && ext == 'bam') {
        const jam = new Gfx3MeshJAM();
        await jam.loadFromBinaryFile(URL.createObjectURL(await file.async('blob')));
        pack.jam.push({ name: zipEntry.name, ext: ext ?? '', object: jam });
      }

      if (file != null && ext == 'jsm') {
        const jsm = new Gfx3MeshJSM();
        await jsm.loadFromFile(URL.createObjectURL(await file.async('blob')));
        pack.jsm.push({ name: zipEntry.name, ext: ext ?? '', object: jsm });
      }

      if (file != null && ext == 'bsm') {
        const jsm = new Gfx3MeshJSM();
        await jsm.loadFromBinaryFile(URL.createObjectURL(await file.async('blob')));
        pack.jsm.push({ name: zipEntry.name, ext: ext ?? '', object: jsm });
      }

      if (file != null && ext == 'jwm') {
        const jwm = new Gfx3PhysicsJWM();
        await jwm.loadFromFile(URL.createObjectURL(await file.async('blob')));
        pack.jwm.push({ name: zipEntry.name, ext: ext ?? '', object: jwm });
      }

      if (file != null && ext == 'bwm') {
        const jwm = new Gfx3PhysicsJWM();
        await jwm.loadFromBinaryFile(URL.createObjectURL(await file.async('blob')));
        pack.jwm.push({ name: zipEntry.name, ext: ext ?? '', object: jwm });
      }

      if (file != null && ext == 'jnm') {
        const jnm = new Gfx3PhysicsJNM();
        await jnm.loadFromFile(URL.createObjectURL(await file.async('blob')));
        pack.jnm.push({ name: zipEntry.name, ext: ext ?? '', object: jnm });
      }

      if (file != null && ext == 'bnm') {
        const jnm = new Gfx3PhysicsJNM();
        await jnm.loadFromBinaryFile(URL.createObjectURL(await file.async('blob')));
        pack.jnm.push({ name: zipEntry.name, ext: ext ?? '', object: jnm });
      }

      if (file != null && ext == 'jlm') {
        const jlm = new Motion();
        await jlm.loadFromFile(URL.createObjectURL(await file.async('blob')));
        pack.jlm.push({ name: zipEntry.name, ext: ext ?? '', object: jlm });
      }

      if (file != null && ext == 'blm') {
        const jlm = new Motion();
        await jlm.loadFromBinaryFile(URL.createObjectURL(await file.async('blob')));
        pack.jlm.push({ name: zipEntry.name, ext: ext ?? '', object: jlm });
      }

      if (file != null && ext == 'jsv') {
        const jsv = new Gfx3ShadowVolume();
        await jsv.loadFromFile(URL.createObjectURL(await file.async('blob')));
        pack.jsv.push({ name: zipEntry.name, ext: ext ?? '', object: jsv });
      }

      if (file != null && ext == 'bsv') {
        const jsv = new Gfx3ShadowVolume();
        await jsv.loadFromBinaryFile(URL.createObjectURL(await file.async('blob')));
        pack.jsv.push({ name: zipEntry.name, ext: ext ?? '', object: jsv });
      }

      if (file != null && ext == 'jlt') {
        const jlt = new Gfx3MeshLight();
        await jlt.loadFromFile(URL.createObjectURL(await file.async('blob')));
        pack.jlt.push({ name: zipEntry.name, ext: ext ?? '', object: jlt });
      }

      if (file != null && ext == 'grf') {
        const grf = new AIPathGraph3D();
        await grf.loadFromFile(URL.createObjectURL(await file.async('blob')));
        pack.grf.push({ name: zipEntry.name, ext: ext ?? '', object: grf });
      }

      if (file != null && ext == 'any') {
        const data = JSON.parse(await file.async('string'));
        pack.any.push({ name: zipEntry.name, ext: ext ?? '', object: data });
      }
    });

    return pack;
  }
}

export type { PackItem };
export { EngineManager };
export const engineManager = new EngineManager();