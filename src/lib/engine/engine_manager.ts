import { coreManager } from '../core/core_manager';
import { inputManager } from '../input/input_manager';
import { gfx2Manager } from '../gfx2/gfx2_manager';
import { gfx3Manager } from '../gfx3/gfx3_manager';
import { gfx3DebugRenderer } from '../gfx3/gfx3_debug_renderer';
import { gfx3MeshRenderer } from '../gfx3_mesh/gfx3_mesh_renderer';
import { gfx3MeshShadowRenderer } from '../gfx3_mesh/gfx3_mesh_shadow_renderer';
import { gfx3SpriteRenderer } from '../gfx3_sprite/gfx3_sprite_renderer';
import { gfx3SkyboxRenderer } from '../gfx3_skybox/gfx3_skybox_renderer';
import { gfx3FlareRenderer } from '../gfx3_flare/gfx3_flare_renderer';
import { gfx3ParticlesRenderer } from '../gfx3_particules/gfx3_particles_renderer';
import { gfx3PostRenderer } from '../gfx3_post/gfx3_post_renderer';
import { gfx3ShadowVolumeRenderer } from '../gfx3_shadow_volume/gfx3_shadow_volume_renderer';
import { screenManager } from '../screen/screen_manager';
import { uiManager } from '../ui/ui_manager';
import { soundManager } from '@lib/sound/sound_manager';

enum RenderingMode {
  DIM_2D = 'DIM_2D',
  DIM_3D = 'DIM_3D',
  DIM_XD = 'DIM_XD'
};

/**
 * Singleton managing the main loop engine.
 */
class EngineManager {
  then: number;
  elapsedTime: number;
  frameRateFixed: boolean;
  frameRateValue: number;
  paused: boolean;
  lastAnimationFrameId: number;
  mode: RenderingMode;
  pauseStartTime: number;
  onBegin3DRender: Function;
  onEnd3DRender: Function;
  onBegin2DRender: Function;
  onEnd2DRender: Function;

  constructor() {
    this.then = 0;
    this.elapsedTime = 0;
    this.frameRateFixed = false;
    this.frameRateValue = 60;
    this.mode = RenderingMode.DIM_XD;
    this.paused = false;
    this.lastAnimationFrameId = 0;
    this.pauseStartTime = 0;
    this.onBegin3DRender = () => {};
    this.onEnd3DRender = () => {};
    this.onBegin2DRender = () => {};
    this.onEnd2DRender = () => {};

    document.addEventListener('visibilitychange', () => this.#handleVisibilityChange());
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
  run(timeStamp: number, state: 'pause' | 'resume' | 'normal' = 'normal'): void {
    if (state === 'pause') {
      this.pauseStartTime = timeStamp;
      cancelAnimationFrame(this.lastAnimationFrameId);
      return;
    }

    if (state === 'resume') {
      const pauseDuration = timeStamp - this.pauseStartTime;
      this.then = this.then + pauseDuration;
    }

    //
    // begin update phase
    //
    const ts = timeStamp - this.then;
    this.then = timeStamp;

    if (!this.frameRateFixed || this.elapsedTime > 1000 / this.frameRateValue) {
      inputManager.update(ts);

      if (this.mode == RenderingMode.DIM_2D || this.mode == RenderingMode.DIM_XD) {
        gfx2Manager.update(ts);
      }

      uiManager.update(ts);
      screenManager.update(ts);
      this.elapsedTime = 0;
    }

    this.elapsedTime += ts;

    //
    // begin draw phase
    //
    if (this.mode == RenderingMode.DIM_3D || this.mode == RenderingMode.DIM_XD) {
      gfx3Manager.beginDrawing();
    }

    screenManager.draw();

    if (this.mode == RenderingMode.DIM_3D || this.mode == RenderingMode.DIM_XD) {
      gfx3Manager.endDrawing();
    }

    //
    // begin 2d render phase
    //
    if (this.mode == RenderingMode.DIM_2D || this.mode == RenderingMode.DIM_XD) {
      gfx2Manager.beginRender();
      this.onBegin2DRender();
      gfx2Manager.render();
      this.onEnd2DRender();
      gfx2Manager.endRender();
     }

    //
    // begin 3d render phase
    //
    if (this.mode == RenderingMode.DIM_3D || this.mode == RenderingMode.DIM_XD) {
      gfx3Manager.beginRender();
      this.onBegin3DRender();
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
      this.onEnd3DRender();
      gfx3PostRenderer.render(ts, gfx3Manager.getCurrentRenderingTexture());
      gfx3Manager.endRender();
    }

    const fps = document.getElementById('fps');
    if (fps) {
      fps.textContent = (1000 / ts).toFixed(2);
    }

    const rt = document.getElementById('rt');
    if (rt) {
      rt.textContent = (1000 / gfx3Manager.getLastRenderTime()).toFixed(2);
    }

    this.lastAnimationFrameId = requestAnimationFrame(timeStamp => this.run(timeStamp));
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
   * Set the frame rate value.
   * 
   * @param {number} value - The fps value.
   */
  setFrameRateValue(value: number): void {
    this.frameRateValue = value;
  }

  /**
   * Set the rendering mode among 2D, 3D or 2D-3D.
   * 
   * @param {RenderingMode} renderingMode - The rendering mode value.
   */
  setRenderingMode(renderingMode: RenderingMode): void {
    this.mode = renderingMode;
  }

  /**
   * Make the update loop paused.
   */
  pause(): void {
    if (this.paused) {
      return;
    }

    this.paused = true;
    this.run(performance.now(), 'pause');
    soundManager.pause();
  }

  /**
   * Make the update loop running.
   */
  resume(): void {
    if (!this.paused) {
      return;
    }

    this.paused = false;
    this.run(performance.now(), 'resume');
    soundManager.resume();
  }

  /**
   * Set the function to call when the 3D render phase begins.
   * 
   * @param {Function} onBegin3DRender - The function to call.
   */
  setOnBegin3DRender(onBegin3DRender: Function): void {
    this.onBegin3DRender = onBegin3DRender;
  }

  /**
   * Set the function to call when the 3D render phase ends.
   * 
   * @param {Function} onEnd3DRender - The function to call.
   */
  setOnEnd3DRender(onEnd3DRender: Function): void {
    this.onEnd3DRender = onEnd3DRender;
  }

  /**
   * Set the function to call when the 2D render phase begins.
   * 
   * @param {Function} onBegin2DRender - The function to call.
   */
  setOnBegin2DRender(onBegin2DRender: Function): void {
    this.onBegin2DRender = onBegin2DRender;
  }

  /**
   * Set the function to call when the 2D render phase ends.
   * 
   * @param {Function} onEnd2DRender - The function to call.
   */
  setOnEnd2DRender(onEnd2DRender: Function): void {
    this.onEnd2DRender = onEnd2DRender;
  }

  #handleVisibilityChange() {
    if (document.hidden) {
      this.pause();
    }
    else {
      this.resume();
    }
  }
}

export { EngineManager };
export type { RenderingMode };
export const em = new EngineManager();