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
   * @param {boolean} [enableScanlines=true] - Determines whether scanlines should be enabled or not.
   * @param {boolean} [showDebug=true] - Determines whether to display debug information.
   */
  startup(enableScanlines: boolean = true, showDebug: boolean = true): void {
    coreManager.enableScanlines(enableScanlines);
    gfx3DebugRenderer.setShowDebug(showDebug);
    this.run(0);
  }

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
}

export { EngineManager };
export const engineManager = new EngineManager();